import { useFormikContext } from 'formik'
import React from 'react'

import ActionsBarSticky from 'components/ActionsBarSticky'
import FormLayout from 'components/FormLayout'
import useCurrentUser from 'hooks/useCurrentUser'
import { ButtonLink, SubmitButton } from 'ui-kit'
import { ButtonVariant } from 'ui-kit/Button/types'

import useNewOfferCreationJourney from '../../../hooks/useNewOfferCreationJourney'
import { IVenueFormValues } from '../types'

export interface IVenueFormActionBarProps {
  offererId: string
  isCreatingVenue: boolean
}

const VenueFormActionBar = ({
  offererId,
  isCreatingVenue,
}: IVenueFormActionBarProps) => {
  const { currentUser } = useCurrentUser()
  const { isSubmitting } = useFormikContext<IVenueFormValues>()

  const newOfferCreation = useNewOfferCreationJourney()

  return (
    <FormLayout.Actions>
      <ActionsBarSticky>
        <ActionsBarSticky.Left>
          <ButtonLink
            variant={ButtonVariant.SECONDARY}
            link={{
              to: currentUser.isAdmin ? `/structures/${offererId}` : '/accueil',
              isExternal: false,
            }}
          >
            Annuler et quitter
          </ButtonLink>
        </ActionsBarSticky.Left>
        <ActionsBarSticky.Right>
          <SubmitButton isLoading={isSubmitting}>
            Enregistrer et
            {isCreatingVenue
              ? newOfferCreation
                ? ' créer le lieu'
                : ' continuer'
              : ' quitter'}
          </SubmitButton>
        </ActionsBarSticky.Right>
      </ActionsBarSticky>
    </FormLayout.Actions>
  )
}

export default VenueFormActionBar
