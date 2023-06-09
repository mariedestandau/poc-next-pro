import { BOOKING_STATUS } from 'core/Bookings'
import { FORMAT_DD_MM_YYYY, FORMAT_DD_MM_YYYY_HH_mm } from 'utils/date'

const BOOKING_STATUS_DISPLAY_INFORMATIONS = [
  {
    id: BOOKING_STATUS.VALIDATED,
    status: 'validé',
    label: 'Réservation validée',
    historyClassName: 'bs-history-validated',
    statusClassName: 'booking-status-validated',
    dateFormat: FORMAT_DD_MM_YYYY_HH_mm,
    svgIconFilename: 'ico-status-double-validated',
  },
  {
    id: BOOKING_STATUS.CANCELLED,
    status: 'annulé',
    label: 'Réservation annulée',
    historyClassName: 'bs-history-cancelled',
    statusClassName: 'booking-status-cancelled',
    dateFormat: FORMAT_DD_MM_YYYY_HH_mm,
    icon: 'ico-status-cancelled',
    svgIconFilename: 'ico-status-cancelled',
  },
  {
    id: BOOKING_STATUS.BOOKED,
    status: 'réservé',
    label: 'Réservé',
    historyClassName: 'bs-history-booked',
    statusClassName: 'booking-status-booked',
    dateFormat: FORMAT_DD_MM_YYYY_HH_mm,
    svgIconFilename: 'ico-status-booked',
  },
  {
    id: BOOKING_STATUS.PENDING,
    status: 'préréservé',
    label: 'Préréservé (scolaire)',
    historyClassName: 'bs-history-pending',
    statusClassName: 'booking-status-pending',
    dateFormat: FORMAT_DD_MM_YYYY_HH_mm,
    svgIconFilename: 'ico-status-pending-tag',
  },
  {
    id: BOOKING_STATUS.REIMBURSED,
    status: 'remboursé',
    label: 'Remboursée',
    historyClassName: 'bs-history-reimbursed',
    statusClassName: 'booking-status-reimbursed',
    dateFormat: FORMAT_DD_MM_YYYY,
    svgIconFilename: 'ico-status-reimbursed',
  },
  {
    id: BOOKING_STATUS.CONFIRMED,
    status: 'confirmé',
    label: 'Réservation confirmée',
    historyClassName: 'bs-history-confirmed',
    statusClassName: 'booking-status-confirmed',
    dateFormat: FORMAT_DD_MM_YYYY_HH_mm,
    svgIconFilename: 'ico-status-validated-white',
  },
]

const COLLECTIVE_BOOKING_STATUS_DISPLAY_INFORMATIONS = [
  {
    id: BOOKING_STATUS.VALIDATED,
    status: 'terminée',
    label: 'Votre évènement a eu lieu',
    statusClassName: 'booking-status-validated',
    svgIconFilename: 'ico-status-double-validated',
  },
  {
    id: BOOKING_STATUS.CANCELLED,
    status: 'annulée',
    label: 'Réservation annulée',
    statusClassName: 'booking-status-cancelled',
    icon: 'ico-status-cancelled',
    svgIconFilename: 'ico-status-cancelled',
  },
  {
    id: BOOKING_STATUS.BOOKED,
    status: 'réservée',
    label: 'Le chef d’établissement scolaire a réservé.',
    statusClassName: 'booking-status-booked',
    svgIconFilename: 'ico-status-booked',
  },
  {
    id: BOOKING_STATUS.PENDING,
    status: 'préréservée',
    label: 'L’enseignant a préréservé.',
    statusClassName: 'booking-status-pending',
    svgIconFilename: 'ico-status-pending-tag',
  },
  {
    id: BOOKING_STATUS.REIMBURSED,
    status: 'remboursée',
    label: 'La réservation a été remboursée',
    statusClassName: 'booking-status-reimbursed',
    svgIconFilename: 'ico-status-reimbursed',
  },
  {
    id: BOOKING_STATUS.CONFIRMED,
    status: 'confirmée',
    label: 'L’établissement scolaire ne peut plus annuler la réservation',
    statusClassName: 'booking-status-confirmed',
    svgIconFilename: 'ico-status-validated-white',
  },
]

export function getBookingStatusDisplayInformations(bookingStatus: string) {
  return BOOKING_STATUS_DISPLAY_INFORMATIONS.find(
    ({ id }) => bookingStatus.toLowerCase() === id
  )
}

export function getCollectiveBookingStatusDisplayInformations(
  bookingStatus: string
) {
  return COLLECTIVE_BOOKING_STATUS_DISPLAY_INFORMATIONS.find(
    ({ id }) => bookingStatus.toLowerCase() === id
  )
}
