import { renderHook } from '@testing-library/react-hooks'

import { api } from 'apiClient/api'
import {
  GetIndividualOfferResponseModel,
  OfferStatus,
  SubcategoryIdEnum,
} from 'apiClient/v1'

import { useGetOfferIndividual } from '..'

describe('useGetOfferIndividual', () => {
  it('should return loading payload then success payload', async () => {
    const apiOffer: GetIndividualOfferResponseModel = {
      activeMediation: null,
      ageMax: null,
      ageMin: null,
      bookingEmail: null,
      conditions: null,
      dateCreated: '2022-05-18T08:25:30.991476Z',
      dateModifiedAtLastProvider: '2022-05-18T08:25:30.991481Z',
      description: 'A passionate description of product 80',
      durationMinutes: null,
      extraData: null,
      fieldsUpdated: [],
      hasBookingLimitDatetimesPassed: true,
      id: 'YA',
      isActive: true,
      isBookable: false,
      isDigital: false,
      isDuo: false,
      isEditable: true,
      isEducational: false,
      isEvent: true,
      isNational: false,
      isThing: false,
      audioDisabilityCompliant: false,
      mentalDisabilityCompliant: false,
      motorDisabilityCompliant: false,
      nonHumanizedId: 192,
      visualDisabilityCompliant: false,
      lastProvider: {
        enabledForPro: true,
        isActive: true,
        id: 'LP',
        name: 'My Last Provider',
      },
      lastProviderId: 'LP',
      mediaUrls: [],
      mediations: [
        {
          thumbUrl: 'http://my.thumb.url',
          credit: 'John Do',
          dateCreated: '01-01-2000',
          fieldsUpdated: [],
          id: 'AA',
          isActive: true,
          offerId: 'YA',
          thumbCount: 1,
        },
      ],
      name: 'Séance ciné duo',
      product: {
        ageMax: null,
        ageMin: null,
        conditions: null,
        dateModifiedAtLastProvider: '2022-05-18T08:25:30.980975Z',
        description: 'A passionate description of product 80',
        durationMinutes: null,
        extraData: null,
        fieldsUpdated: [],
        id: 'AJFA',
        idAtProviders: null,
        isGcuCompatible: true,
        isNational: false,
        lastProviderId: null,
        mediaUrls: [],
        name: 'Product 80',
        owningOffererId: null,
        thumbCount: 0,
        url: null,
      },
      productId: 'AJFA',
      stocks: [
        {
          beginningDatetime: '2022-05-23T08:25:31.009799Z',
          bookingLimitDatetime: '2022-05-23T07:25:31.009799Z',
          bookingsQuantity: 2,
          cancellationLimitDate: '2022-06-01T12:15:12.343431Z',
          dateCreated: '2022-05-18T08:25:31.015652Z',
          dateModified: '2022-05-18T08:25:31.015655Z',
          dateModifiedAtLastProvider: '2022-05-18T08:25:31.015643Z',
          fieldsUpdated: [],
          hasActivationCode: false,
          id: 'YE',
          idAtProviders: null,
          isBookable: false,
          isEventDeletable: false,
          isEventExpired: true,
          isSoftDeleted: false,
          lastProviderId: null,
          offerId: 'YA',
          price: 10,
          quantity: 1000,
          remainingQuantity: 998,
        },
      ],
      subcategoryId: SubcategoryIdEnum.SEANCE_CINE,
      thumbUrl: null,
      externalTicketOfficeUrl: null,
      url: null,
      venue: {
        address: '1 boulevard Poissonnière',
        bookingEmail: 'venue29@example.net',
        city: 'Paris',
        comment: null,
        dateCreated: '2022-05-18T08:25:30.929961Z',
        dateModifiedAtLastProvider: '2022-05-18T08:25:30.929955Z',
        departementCode: '75',
        fieldsUpdated: [],
        id: 'DY',
        idAtProviders: null,
        isVirtual: false,
        lastProviderId: null,
        latitude: 48.87004,
        longitude: 2.3785,
        managingOfferer: {
          nonHumanizedId: 1,
          address: '1 boulevard Poissonnière',
          city: 'Paris',
          dateCreated: '2022-05-18T08:25:30.891369Z',
          dateModifiedAtLastProvider: '2022-05-18T08:25:30.891364Z',
          fieldsUpdated: [],
          id: 'CU',
          idAtProviders: null,
          isActive: true,
          isValidated: true,
          lastProviderId: null,
          name: 'Le Petit Rintintin Management 6',
          postalCode: '75000',
          siren: '000000006',
          thumbCount: 0,
        },
        managingOffererId: 'CU',
        name: 'Cinéma synchro avec booking provider',
        postalCode: '75000',
        publicName: 'Cinéma synchro avec booking provider',
        siret: '00000000600029',
        thumbCount: 0,
        venueLabelId: null,
        audioDisabilityCompliant: false,
        mentalDisabilityCompliant: false,
        motorDisabilityCompliant: false,
        visualDisabilityCompliant: false,
      },
      venueId: 'DY',
      withdrawalDetails: null,
      status: OfferStatus.EXPIRED,
      withdrawalType: null,
      withdrawalDelay: null,
    }

    jest.spyOn(api, 'getOffer').mockResolvedValue(apiOffer)

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetOfferIndividual('YA')
    )
    const loadingState = result.current

    expect(loadingState.data).toBeUndefined()
    expect(loadingState.isLoading).toBe(true)
    expect(loadingState.error).toBeUndefined()

    const offerIndividual = {
      id: 'YA',
      author: '',
      bookingEmail: '',
      description: 'A passionate description of product 80',
      durationMinutes: null,
      isbn: '',
      isActive: true,
      isDuo: false,
      isEducational: false,
      accessibility: {
        none: true,
        audio: false,
        mental: false,
        motor: false,
        visual: false,
      },
      isNational: false,
      name: 'Séance ciné duo',
      isEvent: true,
      isDigital: false,
      withdrawalType: null,
      image: {
        originalUrl: 'http://my.thumb.url',
        url: 'http://my.thumb.url',
        credit: 'John Do',
      },
      musicSubType: '',
      musicType: '',
      nonHumanizedId: 192,
      offererId: 'CU',
      offererName: 'Le Petit Rintintin Management 6',
      performer: '',
      ean: '',
      showSubType: '',
      showType: '',
      stageDirector: '',
      speaker: '',
      status: OfferStatus.EXPIRED,
      subcategoryId: SubcategoryIdEnum.SEANCE_CINE,
      url: '',
      externalTicketOfficeUrl: '',
      venueId: 'DY',
      visa: '',
      withdrawalDetails: '',
      withdrawalDelay: null,
      lastProvider: {
        isActive: true,
        id: 'LP',
        name: 'My Last Provider',
      },
      lastProviderName: 'My Last Provider',
      stocks: [
        {
          beginningDatetime: '2022-05-23T08:25:31.009799Z',
          bookingLimitDatetime: '2022-05-23T07:25:31.009799Z',
          bookingsQuantity: 2,
          dateCreated: new Date('2022-05-18T08:25:31.015652Z'),
          hasActivationCode: false,
          id: 'YE',
          isEventDeletable: false,
          isEventExpired: true,
          isSoftDeleted: false,
          offerId: 'YA',
          price: 10,
          quantity: 1000,
          remainingQuantity: 998,
          activationCodesExpirationDatetime: null,
          activationCodes: [],
        },
      ],
      venue: {
        address: '1 boulevard Poissonnière',
        city: 'Paris',
        id: 'DY',
        isVirtual: false,
        name: 'Cinéma synchro avec booking provider',
        offerer: {
          id: 'CU',
          nonHumanizedId: 1,
          name: 'Le Petit Rintintin Management 6',
        },
        postalCode: '75000',
        publicName: 'Cinéma synchro avec booking provider',
        departmentCode: '75',
        accessibility: {
          none: true,
          audio: false,
          mental: false,
          motor: false,
          visual: false,
        },
      },
    }

    await waitForNextUpdate()
    expect(api.getOffer).toHaveBeenCalled()
    const updatedState = result.current
    expect(updatedState.isLoading).toBe(false)
    expect(updatedState.data).toEqual(offerIndividual)
    expect(updatedState.error).toBeUndefined()
  })
})
