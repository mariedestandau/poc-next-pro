from datetime import datetime, timedelta

import pytest

from domain.password import RESET_PASSWORD_TOKEN_LENGTH
from models import PcObject
from models.db import db
from tests.conftest import clean_database, TestClient
from tests.test_utils import API_URL, create_user


@pytest.mark.standalone
class PostResetPassword:
    class Returns400:
        @clean_database
        def when_email_is_empty(self, app):
            # given
            data = {'email': ''}

            # when
            response = TestClient().post(API_URL + '/users/reset-password', json=data,
                                         headers={'origin': 'http://localhost:3000'})

            # then
            assert response.status_code == 400
            assert response.json()['email'] == ['L\'email renseigné est vide']

        @clean_database
        def when_email_is_missing(self, app):
            # given
            data = {}

            # when
            response = TestClient().post(API_URL + '/users/reset-password', json=data,
                                         headers={'origin': 'http://localhost:3000'})

            # then
            assert response.status_code == 400
            assert response.json()['email'] == ['L\'email est manquant']

    class Returns204:
        @clean_database
        def when_user_email_is_unknown(self, app):
            # given
            data = {'email': 'unknown.user@test.com'}

            # when
            response = TestClient().post(API_URL + '/users/reset-password', json=data,
                                         headers={'origin': 'http://localhost:3000'})

            # then
            assert response.status_code == 204

        @clean_database
        def when_email_is_known(self, app):
            # given
            data = {'email': 'bobby@test.com'}
            user = create_user(email='bobby@test.com')
            PcObject.save(user)

            # when
            response = TestClient().post(API_URL + '/users/reset-password', json=data,
                                         headers={'origin': 'http://localhost:3000'})

            # then
            db.session.refresh(user)
            assert response.status_code == 204
            assert len(user.resetPasswordToken) == RESET_PASSWORD_TOKEN_LENGTH
            now = datetime.utcnow()
            assert (now + timedelta(hours=23)) < user.resetPasswordTokenValidityLimit < (now + timedelta(hours=25))
