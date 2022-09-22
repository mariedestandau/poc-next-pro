import { OfferAddressType, PostCollectiveOfferBodyModel } from 'apiClient/v1'
import {
  IOfferEducationalFormValues,
  parseDuration,
  serializeParticipants,
} from 'core/OfferEducational'

const disabilityCompliances = (
  accessibility: IOfferEducationalFormValues['accessibility']
): Pick<
  PostCollectiveOfferBodyModel,
  | 'audioDisabilityCompliant'
  | 'mentalDisabilityCompliant'
  | 'motorDisabilityCompliant'
  | 'visualDisabilityCompliant'
> => ({
  audioDisabilityCompliant: accessibility.audio,
  mentalDisabilityCompliant: accessibility.mental,
  motorDisabilityCompliant: accessibility.motor,
  visualDisabilityCompliant: accessibility.visual,
})

export const createCollectiveOfferPayload = (
  offer: IOfferEducationalFormValues
): PostCollectiveOfferBodyModel => ({
  offererId: offer.offererId,
  venueId: offer.venueId,
  subcategoryId: offer.subCategory,
  name: offer.title,
  bookingEmails: offer.notifications ? offer.notificationEmails : [],
  description: offer.description,
  durationMinutes: parseDuration(offer.duration),
  ...disabilityCompliances(offer.accessibility),
  students: serializeParticipants(offer.participants),
  offerVenue: offer.eventAddress,
  contactEmail: offer.email,
  contactPhone: offer.phone,
  domains: offer.domains.map(domainIdString => Number(domainIdString)),
  interventionArea:
    offer.eventAddress.addressType === OfferAddressType.OFFERER_VENUE
      ? []
      : offer.interventionArea,
})
