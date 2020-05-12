from datetime import datetime, timedelta
from unittest.mock import patch

from repository import repository
from scripts.deactivate_offers_during_quatantine.fetch_user_emails_for_offers import \
    fetch_user_emails_for_offers_with_max_stock_date_between_today_and_end_of_quarantine
from tests.conftest import clean_database
from tests.model_creators.generic_creators import create_offerer, create_venue, create_stock, create_user, \
    create_user_offerer
from tests.model_creators.specific_creators import create_offer_with_event_product


class FetchUserEmailsForOffersTest:
    @patch('scripts.deactivate_offers_during_quatantine.fetch_user_emails_for_offers.'
           'build_query_offers_with_max_stock_date_between_today_and_end_of_quarantine')
    def test_should_call_build_offers_query(self, stub_build_query):
        # Given
        first_day_after_quarantine = datetime(2020, 4, 16)
        today = datetime(2020, 4, 10)

        # When
        fetch_user_emails_for_offers_with_max_stock_date_between_today_and_end_of_quarantine(first_day_after_quarantine,
                                                                                             today)

        # Then
        stub_build_query.assert_called_once_with(first_day_after_quarantine, today)

    @clean_database
    def test_should_return_all_user_emails(self, app):
        # Given
        first_day_after_quarantine = datetime(2020, 4, 16)
        today = datetime(2020, 4, 10)
        tomorrow = today + timedelta(days=1)

        pro = create_user(email='john.doe@example.com')
        pro1 = create_user(email='john.rambo@example.com')

        offerer = create_offerer(siren='123456789')
        user_offerer = create_user_offerer(user=pro, offerer=offerer)
        venue = create_venue(offerer, siret='1234567899876')
        offer = create_offer_with_event_product(venue)
        stock = create_stock(offer=offer, beginning_datetime=tomorrow)

        offerer1 = create_offerer(siren='987654321')
        user_offerer1 = create_user_offerer(user=pro1, offerer=offerer1)
        venue1 = create_venue(offerer1, siret='9876543216543')
        offer1 = create_offer_with_event_product(venue1)
        stock1 = create_stock(offer=offer1, beginning_datetime=tomorrow)

        repository.save(stock1, stock, user_offerer, user_offerer1)

        # When
        pro_emails = fetch_user_emails_for_offers_with_max_stock_date_between_today_and_end_of_quarantine(
            first_day_after_quarantine,
            today)

        # Then
        assert len(pro_emails) == 2
        assert set(pro_emails) == {'john.doe@example.com', 'john.rambo@example.com'}

    @clean_database
    def test_should_return_only_pro_user_emails(self, app):
        # Given
        first_day_after_quarantine = datetime(2020, 4, 16)
        today = datetime(2020, 4, 10)
        tomorrow = today + timedelta(days=1)

        user = create_user(email='jean.dupont@example.com')
        pro = create_user(email='john.doe@example.com')
        offerer = create_offerer()
        user_offerer = create_user_offerer(user=pro, offerer=offerer)
        venue = create_venue(offerer)
        offer = create_offer_with_event_product(venue)
        stock = create_stock(offer=offer, beginning_datetime=tomorrow)

        repository.save(stock, user_offerer, user)

        # When
        pro_emails = fetch_user_emails_for_offers_with_max_stock_date_between_today_and_end_of_quarantine(
            first_day_after_quarantine,
            today)

        # Then
        assert len(pro_emails) == 1
        assert set(pro_emails) == {'john.doe@example.com'}
