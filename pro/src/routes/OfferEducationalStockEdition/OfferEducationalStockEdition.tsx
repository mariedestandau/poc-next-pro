import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import useActiveFeature from 'components/hooks/useActiveFeature'
import useNotification from 'components/hooks/useNotification'
import Spinner from 'components/layout/Spinner'
import {
  cancelActiveBookingsAdapter,
  DEFAULT_EAC_STOCK_FORM_VALUES,
  EducationalOfferType,
  getStockOfferAdapter,
  GetStockOfferSuccessPayload,
  Mode,
  OfferEducationalStockFormValues,
  patchIsOfferActiveAdapter,
} from 'core/OfferEducational'
import { OfferBreadcrumbStep } from 'new_components/OfferBreadcrumb'
import OfferEducationalLayout from 'new_components/OfferEducationalLayout'
import OfferEducationalStockScreen from 'screens/OfferEducationalStock'

import { getEducationalStockAdapter } from './adapters/getEducationalStockAdapter'
import patchEducationalStockAdapter from './adapters/patchEducationalStockAdapter'
import patchShadowStockIntoEducationalStockAdapter from './adapters/patchShadowStockIntoEducationalStockAdapter'
import { StockResponse } from './types'
import { extractInitialStockValues } from './utils/extractInitialStockValues'

const OfferEducationalStockEdition = (): JSX.Element => {
  const history = useHistory()
  const isShowcaseFeatureEnabled = useActiveFeature('ENABLE_EAC_SHOWCASE_OFFER')

  const [initialValues, setInitialValues] =
    useState<OfferEducationalStockFormValues>(DEFAULT_EAC_STOCK_FORM_VALUES)
  const [offer, setOffer] = useState<GetStockOfferSuccessPayload | null>(null)
  const [stock, setStock] = useState<StockResponse | null>(null)
  const [isReady, setIsReady] = useState<boolean>(false)
  const { offerId } = useParams<{ offerId: string }>()
  const notify = useNotification()

  const handleSubmitStock = async (
    offer: GetStockOfferSuccessPayload,
    values: OfferEducationalStockFormValues
  ) => {
    if (!stock) {
      return notify.error('Impossible de mettre à jour le stock.')
    }

    const stockId = stock.id

    const shouldCallTransformShadowStockIntoEducationalStockAdapter =
      isShowcaseFeatureEnabled &&
      offer.isShowcase &&
      values.educationalOfferType === EducationalOfferType.CLASSIC
    const adapter = shouldCallTransformShadowStockIntoEducationalStockAdapter
      ? patchShadowStockIntoEducationalStockAdapter
      : patchEducationalStockAdapter

    const stockResponse = await adapter({
      offer,
      stockId,
      values,
      initialValues,
    })

    if (!stockResponse.isOk) {
      return notify.error(stockResponse.message)
    }

    notify.success(stockResponse.message)
    const initialValuesFromStock = extractInitialStockValues(
      stockResponse.payload,
      offer
    )
    setInitialValues(initialValuesFromStock)
  }

  const setIsOfferActive = async (isActive: boolean) => {
    const { isOk, message } = await patchIsOfferActiveAdapter({
      isActive,
      offerId,
    })

    if (!isOk) {
      return notify.error(message)
    }

    notify.success(message)
    setIsReady(false)
  }

  const cancelActiveBookings = async () => {
    const { isOk, message } = await cancelActiveBookingsAdapter({ offerId })

    if (!isOk) {
      return notify.error(message)
    }

    notify.success(message)
    setIsReady(false)
  }

  useEffect(() => {
    if (!isReady) {
      const loadStockAndOffer = async () => {
        const [offerResponse, stockResponse] = await Promise.all([
          getStockOfferAdapter(offerId),
          getEducationalStockAdapter(offerId),
        ])
        if (!offerResponse.isOk) {
          return notify.error(offerResponse.message)
        }

        if (!offerResponse.payload.isEducational) {
          return history.push(`/offre/${offerId}/individuel/stocks`)
        }

        if (!stockResponse.isOk) {
          return notify.error(stockResponse.message)
        }
        setOffer(offerResponse.payload)
        setStock(stockResponse.payload.stock)
        const initialValuesFromStock = offerResponse.payload.isShowcase
          ? {
              ...DEFAULT_EAC_STOCK_FORM_VALUES,
              priceDetail:
                stockResponse.payload.stock?.educationalPriceDetail ?? '',
              educationalOfferType: EducationalOfferType.SHOWCASE,
            }
          : extractInitialStockValues(
              stockResponse.payload.stock,
              offerResponse.payload
            )
        setInitialValues(initialValuesFromStock)
        setIsReady(true)
      }
      loadStockAndOffer()
    }
  }, [offerId, isReady, notify, history])

  return (
    <OfferEducationalLayout
      activeStep={OfferBreadcrumbStep.STOCKS}
      isCreatingOffer={false}
      offerId={offerId}
      title="Éditer une offre"
    >
      {offer && isReady ? (
        <OfferEducationalStockScreen
          cancelActiveBookings={cancelActiveBookings}
          initialValues={initialValues}
          isShowcaseFeatureEnabled={isShowcaseFeatureEnabled}
          mode={
            stock?.isEducationalStockEditable ? Mode.EDITION : Mode.READ_ONLY
          }
          offer={offer}
          onSubmit={handleSubmitStock}
          setIsOfferActive={setIsOfferActive}
        />
      ) : (
        <Spinner />
      )}
    </OfferEducationalLayout>
  )
}

export default OfferEducationalStockEdition
