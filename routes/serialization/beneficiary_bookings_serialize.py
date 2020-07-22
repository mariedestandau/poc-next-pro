from typing import List, Dict

from domain.beneficiary_bookings.beneficiary_bookings import BeneficiaryBookings, BeneficiaryBooking
from domain.beneficiary_bookings.stock import Stock
from routes.serialization import serialize
from utils.human_ids import humanize


def serialize_beneficiary_bookings(beneficiary_bookings: BeneficiaryBookings) -> List:
    results = []
    for beneficiary_booking in beneficiary_bookings.bookings:
        serialized_stocks = serialize_stocks_for_beneficiary_bookings(beneficiary_booking.offerId,
                                                                      beneficiary_bookings.stocks)
        serialized_booking = serialize_benefeciary_booking(beneficiary_booking, serialized_stocks)
        results.append(serialized_booking)
    return results


def serialize_stock_for_beneficiary_booking(stock: Stock) -> Dict:
    return {
        "dateCreated": stock.dateCreated,
        "beginningDatetime": stock.beginningDatetime,
        "bookingLimitDatetime": stock.bookingLimitDatetime,
        "offerId": humanize(stock.offerId),
        "dateModified": stock.dateModified,
        "quantity": stock.quantity,
        "price": stock.price,
        "id": humanize(stock.id),
    }


def serialize_stocks_for_beneficiary_bookings(matched_offer_id: int, stocks: List[Stock]) -> List[Dict]:
    return [serialize_stock_for_beneficiary_booking(stock) for stock in stocks if stock.offerId == matched_offer_id]


def serialize_benefeciary_booking(beneficiary_booking: BeneficiaryBooking, serialized_stocks: List[Dict]) -> Dict:
    # TODO: "qrCode": 'FAKE_QR_CODE',
    dictified_booking = {
        "completedUrl": beneficiary_booking.booking_access_url,
        "isEventExpired": beneficiary_booking.is_event_expired,
        "amount": beneficiary_booking.amount,
        "cancellationDate": serialize(beneficiary_booking.cancellationDate),
        "dateCreated": serialize(beneficiary_booking.dateCreated),
        "dateUsed": serialize(beneficiary_booking.dateUsed),
        "id": humanize(beneficiary_booking.id),
        "isCancelled": beneficiary_booking.isCancelled,
        "isUsed": beneficiary_booking.isUsed,
        "quantity": beneficiary_booking.quantity,
        "recommendationId": humanize(beneficiary_booking.recommendationId),
        "stock": {
            "id": humanize(beneficiary_booking.stockId),
            "beginningDatetime": serialize(beneficiary_booking.beginningDatetime),
            "offerId": humanize(beneficiary_booking.offerId),
            "isEventExpired": beneficiary_booking.is_event_expired,
            "offer": {
                "description": beneficiary_booking.description,
                "durationMinutes": beneficiary_booking.durationMinutes,
                "extraData": beneficiary_booking.extraData,
                "isDuo": beneficiary_booking.isDuo,
                "withdrawalDetails": beneficiary_booking.withdrawalDetails,
                "id": humanize(beneficiary_booking.offerId),
                "isDigital": beneficiary_booking.is_booked_offer_digital,
                "isEvent": beneficiary_booking.is_booked_offer_event,
                "isNational": beneficiary_booking.isNational,
                "name": beneficiary_booking.name,
                "offerType": beneficiary_booking.humanized_offer_type,
                "thumb_url": '',
                "stocks": serialized_stocks,
                "venue": {
                    "id": humanize(beneficiary_booking.venueId),
                    "departementCode": beneficiary_booking.departementCode,
                },
                "venueId": humanize(beneficiary_booking.venueId),
            }
        },
        "stockId": humanize(beneficiary_booking.stockId),
        "token": beneficiary_booking.token,
        "userId": humanize(beneficiary_booking.userId),
    }
    return dictified_booking
