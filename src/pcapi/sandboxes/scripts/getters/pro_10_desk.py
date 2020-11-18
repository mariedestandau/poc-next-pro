from pcapi.core.bookings.models import Booking
from pcapi.core.offers.models import Offer
from pcapi.core.offers.models import StockSQLEntity
from pcapi.models import VenueSQLEntity
from pcapi.models.user_sql_entity import UserSQLEntity
from pcapi.repository.user_queries import filter_users_with_at_least_one_validated_offerer_validated_user_offerer
from pcapi.sandboxes.scripts.utils.helpers import get_booking_helper
from pcapi.sandboxes.scripts.utils.helpers import get_offer_helper
from pcapi.sandboxes.scripts.utils.helpers import get_offerer_helper
from pcapi.sandboxes.scripts.utils.helpers import get_pro_helper
from pcapi.sandboxes.scripts.utils.helpers import get_venue_helper


def get_existing_pro_validated_user_with_validated_offerer_with_validated_user_offerer_with_thing_offer_with_stock_with_not_used_booking():
    query = UserSQLEntity.query.filter(UserSQLEntity.validationToken == None)
    query = filter_users_with_at_least_one_validated_offerer_validated_user_offerer(query)
    query = query.join(VenueSQLEntity).filter(VenueSQLEntity.offers.any(~Offer.stocks.any()))
    query = query.join(Offer).join(StockSQLEntity).filter(StockSQLEntity.bookings.any(Booking.isUsed == False))
    user = query.first()

    for uo in user.UserOfferers:
        if uo.validationToken == None and uo.offerer.validationToken == None:
            for venue in uo.offerer.managedVenues:
                for offer in venue.offers:
                    if offer.isThing:
                        for stock in offer.stocks:
                            if stock.bookings:
                                for booking in stock.bookings:
                                    if not booking.isUsed:
                                        return {
                                            "booking": get_booking_helper(booking),
                                            "offer": get_offer_helper(offer),
                                            "offerer": get_offerer_helper(uo.offerer),
                                            "user": get_pro_helper(user),
                                            "venue": get_venue_helper(venue),
                                        }
