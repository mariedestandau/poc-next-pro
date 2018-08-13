import pytest

from models import PcObject, Venue
from tests.conftest import clean_database
from utils.human_ids import dehumanize, humanize
from utils.test_utils import API_URL, req_with_auth, create_user, create_venue, \
    create_offerer, create_user_offerer, create_n_mixed_offers_with_same_venue, create_thing, create_event


def insert_offers_for(user, siren='123456789'):
    offerer = create_offerer(siren=siren)
    user_offerer = create_user_offerer(user, offerer)
    venue = create_venue(offerer)
    offers = create_n_mixed_offers_with_same_venue(venue, n=20)

    PcObject.check_and_save(user_offerer)
    PcObject.check_and_save(*offers)


@clean_database
@pytest.mark.standalone
def test_get_offers_are_paginated_by_chunks_of_10(app):
    # Given
    user = create_user(email='user@test.com', password='azerty123')
    insert_offers_for(user)

    # when
    response = req_with_auth(email='user@test.com', password='azerty123').get(API_URL + '/offers')

    # then
    offers = response.json()
    assert response.status_code == 200
    assert len(offers) == 10


@clean_database
@pytest.mark.standalone
def test_get_offers_is_paginated_by_default_on_page_1(app):
    # given
    user = create_user(email='user@test.com', password='azerty123')
    insert_offers_for(user)
    auth_request = req_with_auth(email='user@test.com', password='azerty123')
    offers = auth_request.get(API_URL + '/offers').json()
    first_id = dehumanize(offers[0]['id'])

    # when
    response = auth_request.get(API_URL + '/offers?page=1')

    # then
    offers = response.json()
    assert response.status_code == 200
    assert dehumanize(offers[0]['id']) == first_id


@clean_database
@pytest.mark.standalone
def test_get_offers_returns_offers_sorted_by_id_desc(app):
    # given
    user = create_user(email='user@test.com', password='azerty123')
    insert_offers_for(user)
    auth_request = req_with_auth(email='user@test.com', password='azerty123')
    response_1 = auth_request.get(API_URL + '/offers?page=1')

    # when
    response_2 = auth_request.get(API_URL + '/offers?page=2')

    # then
    offers_1 = response_1.json()
    offers_2 = response_2.json()
    assert offers_1[-1]['dateCreated'] > offers_2[0]['dateCreated']


@clean_database
@pytest.mark.standalone
def test_get_offers_is_filtered_by_given_venue_id(app):
    # given
    user = create_user(email='user@test.com', password='azerty123')
    insert_offers_for(user, siren='123456789')
    insert_offers_for(user, siren='987654321')
    auth_request = req_with_auth(email='user@test.com', password='azerty123')
    venue_id = Venue.query.first().id

    # when
    response = auth_request.get(API_URL + '/offers?venueId=' + humanize(venue_id))

    # then
    offers = response.json()
    assert response.status_code == 200
    for offer in offers:
        assert offer['venueId'] == humanize(venue_id)


@clean_database
@pytest.mark.standalone
def test_get_offers_can_be_filtered_and_paginated_at_the_same_time(app):
    # given
    user = create_user(email='user@test.com', password='azerty123')
    insert_offers_for(user, siren='987654321')
    auth_request = req_with_auth(email='user@test.com', password='azerty123')
    venue_id = Venue.query.first().id

    # when
    response = auth_request.get(API_URL + '/offers?venueId=' + humanize(venue_id) + '&page=2')

    # then
    offers = response.json()
    assert response.status_code == 200
    for offer in offers:
        assert offer['venueId'] == humanize(venue_id)


@clean_database
@pytest.mark.standalone
def test_get_offers_can_be_searched_and_filtered_and_paginated_at_the_same_time(app):
    # given
    user = create_user(email='user@test.com', password='azerty123')
    insert_offers_for(user, siren='987654321')
    auth_request = req_with_auth(email='user@test.com', password='azerty123')
    venue_id = Venue.query.first().id

    # when
    response = auth_request.get(API_URL + '/offers?venueId=' + humanize(venue_id) + '&page=1&search=Event')

    # then
    offers = response.json()
    assert response.status_code == 200
    assert len(offers) == 10
    for offer in offers:
        assert offer['venueId'] == humanize(venue_id)
        assert 'event' in offer['event']['name'].lower()


@clean_database
@pytest.mark.standalone
def test_get_offers_can_be_searched_using_multiple_search_terms(app):
    # given
    user = create_user(email='user@test.com', password='azerty123')
    insert_offers_for(user, siren='987654321')
    auth_request = req_with_auth(email='user@test.com', password='azerty123')
    venue_id = Venue.query.first().id

    # when
    response = auth_request.get(API_URL + '/offers?venueId=' + humanize(venue_id) + '&page=1&search=Event Offer')

    # then
    offers = response.json()
    assert response.status_code == 200
    assert len(offers) == 10
    assert len([o for o in offers if 'event' in o]) > 0
    assert len([o for o in offers if 'thing' in o]) > 0


@clean_database
@pytest.mark.standalone
def test_create_thing_offer(app):
    # given
    user = create_user(email='user@test.com', password='azerty123')
    offerer = create_offerer()
    user_offerer = create_user_offerer(user, offerer)
    venue = create_venue(offerer)
    thing = create_thing()
    PcObject.check_and_save(user_offerer, venue, thing)

    data = {
        'venueId': humanize(venue.id),
        'thingId': humanize(thing.id)
    }
    auth_request = req_with_auth(email='user@test.com', password='azerty123')

    # when
    response = auth_request.post(API_URL + '/offers', json=data)

    # then
    assert response.status_code == 201


@clean_database
@pytest.mark.standalone
def test_create_event_offer(app):
    # given
    user = create_user(email='user@test.com', password='azerty123')
    offerer = create_offerer()
    user_offerer = create_user_offerer(user, offerer)
    venue = create_venue(offerer)
    event = create_event()
    PcObject.check_and_save(user_offerer, venue, event)

    data = {
        'venueId': humanize(venue.id),
        'eventId': humanize(event.id)
    }
    auth_request = req_with_auth(email='user@test.com', password='azerty123')

    # when
    response = auth_request.post(API_URL + '/offers', json=data)

    # then
    assert response.status_code == 201
