from datetime import datetime
from datetime import timedelta

from freezegun import freeze_time
import pytest

from pcapi.core.bookings import factories as booking_factories
import pcapi.core.mails.testing as mails_testing
from pcapi.core.mails.transactional.bookings.booking_cancellation_by_beneficiary import (
    get_booking_cancellation_by_beneficiary_email_data,
)
from pcapi.core.mails.transactional.bookings.booking_cancellation_by_beneficiary import (
    send_booking_cancellation_by_beneficiary_email,
)
from pcapi.core.offers.factories import EventStockFactory
from pcapi.core.offers.factories import ThingStockFactory
from pcapi.core.testing import override_features
from pcapi.core.users.factories import BeneficiaryGrant18Factory


@pytest.mark.usefixtures("db_session")
class SendMailjetBeneficiaryBookingCancellationEmailTest:
    @override_features(ENABLE_SENDINBLUE_TRANSACTIONAL_EMAILS=False)
    def test_should_called_send_email_with_valid_data(self):
        # given
        booking = booking_factories.IndividualBookingFactory()

        # when
        send_booking_cancellation_by_beneficiary_email(booking.individualBooking)

        # then
        assert len(mails_testing.outbox) == 1  # test number of emails sent
        assert mails_testing.outbox[0].sent_data["Mj-TemplateID"] == 1091464


@pytest.mark.usefixtures("db_session")
class MakeBeneficiaryBookingCancellationEmailMailjetDataTest:
    @override_features(ENABLE_SENDINBLUE_TRANSACTIONAL_EMAILS=False)
    def test_should_return_thing_data_when_booking_is_a_thing(self):
        # Given
        booking = booking_factories.CancelledIndividualBookingFactory(
            individualBooking__user=BeneficiaryGrant18Factory(email="fabien@example.com", firstName="Fabien"),
            stock=ThingStockFactory(
                price=10.2,
                beginningDatetime=datetime.now() - timedelta(days=1),
                offer__name="Test thing name",
                offer__id=123456,
            ),
        )

        # When
        email_data = get_booking_cancellation_by_beneficiary_email_data(booking.individualBooking)

        # Then
        assert email_data == {
            "Mj-TemplateID": 1091464,
            "Mj-TemplateLanguage": True,
            "Vars": {
                "can_book_again": 1,
                "event_date": "",
                "event_hour": "",
                "is_event": 0,
                "is_free_offer": 0,
                "offer_id": "AHREA",
                "offer_name": "Test thing name",
                "offer_price": "10.20",
                "user_first_name": "Fabien",
            },
        }

    @freeze_time("2019-11-26 18:29:20.891028")
    @override_features(ENABLE_SENDINBLUE_TRANSACTIONAL_EMAILS=False)
    def test_should_return_event_data_when_booking_is_an_event(self):
        # Given
        booking = booking_factories.CancelledIndividualBookingFactory(
            individualBooking__user=BeneficiaryGrant18Factory(email="fabien@example.com", firstName="Fabien"),
            stock=EventStockFactory(
                price=10.2,
                beginningDatetime=datetime.utcnow(),
                offer__name="Test event name",
                offer__id=123456,
            ),
        )

        # When
        email_data = get_booking_cancellation_by_beneficiary_email_data(booking.individualBooking)

        # Then
        assert email_data == {
            "Mj-TemplateID": 1091464,
            "Mj-TemplateLanguage": True,
            "Vars": {
                "can_book_again": 1,
                "event_date": "26 novembre 2019",
                "event_hour": "19h29",
                "is_event": 1,
                "is_free_offer": 0,
                "offer_id": "AHREA",
                "offer_name": "Test event name",
                "offer_price": "10.20",
                "user_first_name": "Fabien",
            },
        }

    @override_features(ENABLE_SENDINBLUE_TRANSACTIONAL_EMAILS=False)
    def test_should_return_is_free_offer_when_offer_price_equals_to_zero(self):
        # Given
        booking = booking_factories.CancelledIndividualBookingFactory(stock__price=0)

        # When
        email_data = get_booking_cancellation_by_beneficiary_email_data(booking.individualBooking)

        # Then
        assert email_data["Vars"]["is_free_offer"] == 1

    @override_features(ENABLE_SENDINBLUE_TRANSACTIONAL_EMAILS=False)
    def test_should_return_the_price_multiplied_by_quantity_when_it_is_a_duo_offer(self):
        # Given
        booking = booking_factories.CancelledIndividualBookingFactory(quantity=2, stock__price=10)

        # When
        email_data = get_booking_cancellation_by_beneficiary_email_data(booking.individualBooking)

        # Then
        assert email_data["Vars"]["offer_price"] == "20.00"


@pytest.mark.usefixtures("db_session")
class SendSendiblueBeneficiaryBookingCancellationEmailTest:
    @override_features(ENABLE_SENDINBLUE_TRANSACTIONAL_EMAILS=True)
    def test_should_called_send_email_with_valid_data(self):
        # given
        booking = booking_factories.IndividualBookingFactory()

        # when
        send_booking_cancellation_by_beneficiary_email(booking.individualBooking)

        # then
        assert mails_testing.outbox[0].sent_data["template"] == {
            "id_prod": 223,
            "id_not_prod": 33,
            "tags": ["jeunes_offre_annulee_jeune"],
        }
        assert mails_testing.outbox[0].sent_data["To"] == booking.individualBooking.user.email
        params_key_list = [
            "CAN_BOOK_AGAIN",
            "EVENT_DATE",
            "EVENT_HOUR",
            "IS_EVENT",
            "IS_FREE_OFFER",
            "OFFER_NAME",
            "OFFER_PRICE",
            "USER_FIRST_NAME",
            "OFFER_LINK",
        ]
        for params_key in params_key_list:
            assert params_key in mails_testing.outbox[0].sent_data["params"].keys()


@pytest.mark.usefixtures("db_session")
class MakeBeneficiaryBookingCancellationEmailSendinblueDataTest:
    @override_features(ENABLE_SENDINBLUE_TRANSACTIONAL_EMAILS=True)
    def test_should_return_thing_data_when_booking_is_a_thing(self):
        # Given
        booking = booking_factories.CancelledIndividualBookingFactory(
            individualBooking__user=BeneficiaryGrant18Factory(email="fabien@example.com", firstName="Fabien"),
            stock=ThingStockFactory(
                price=10.20,
                beginningDatetime=datetime.now() - timedelta(days=1),
                offer__name="Test thing name",
                offer__id=123456,
            ),
        )

        # When
        email_data = get_booking_cancellation_by_beneficiary_email_data(booking.individualBooking)

        # Then
        assert email_data.params == {
            "CAN_BOOK_AGAIN": True,
            "EVENT_DATE": None,
            "EVENT_HOUR": None,
            "IS_EVENT": False,
            "IS_FREE_OFFER": False,
            "OFFER_NAME": "Test thing name",
            "OFFER_PRICE": 10.20,
            "USER_FIRST_NAME": "Fabien",
            "OFFER_LINK": "https://webapp.example.com/offre/details/AHREA",
        }

    @freeze_time("2019-11-26 18:29:20.891028")
    @override_features(ENABLE_SENDINBLUE_TRANSACTIONAL_EMAILS=True)
    def test_should_return_event_data_when_booking_is_an_event(self):
        # Given
        booking = booking_factories.CancelledIndividualBookingFactory(
            individualBooking__user=BeneficiaryGrant18Factory(email="fabien@example.com", firstName="Fabien"),
            stock=EventStockFactory(
                price=10.20,
                beginningDatetime=datetime.utcnow(),
                offer__name="Test event name",
                offer__id=123456,
            ),
        )

        # When
        email_data = get_booking_cancellation_by_beneficiary_email_data(booking.individualBooking)

        # Then
        assert email_data.params == {
            "CAN_BOOK_AGAIN": True,
            "EVENT_DATE": "26 novembre 2019",
            "EVENT_HOUR": "19h29",
            "IS_EVENT": True,
            "IS_FREE_OFFER": False,
            "OFFER_NAME": "Test event name",
            "OFFER_PRICE": 10.20,
            "USER_FIRST_NAME": "Fabien",
            "OFFER_LINK": "https://webapp.example.com/offre/details/AHREA",
        }

    @override_features(ENABLE_SENDINBLUE_TRANSACTIONAL_EMAILS=True)
    def test_should_return_is_free_offer_when_offer_price_equals_to_zero(self):
        # Given
        booking = booking_factories.CancelledIndividualBookingFactory(stock__price=0)

        # When
        email_data = get_booking_cancellation_by_beneficiary_email_data(booking.individualBooking)

        # Then
        assert email_data.params["IS_FREE_OFFER"] is True

    @override_features(ENABLE_SENDINBLUE_TRANSACTIONAL_EMAILS=True)
    def test_should_return_the_price_multiplied_by_quantity_when_it_is_a_duo_offer(self):
        # Given
        booking = booking_factories.CancelledIndividualBookingFactory(quantity=2, stock__price=10)

        # When
        email_data = get_booking_cancellation_by_beneficiary_email_data(booking.individualBooking)

        # Then
        assert email_data.params["OFFER_PRICE"] == 20.00
