from tests.conftest import clean_database, TestClient
from unittest.mock import call, patch
from workers.bank_information_job import bank_information_job

class Post:
    class Returns202:
        @patch('routes.providers.bank_information_job.delay')
        @patch('validation.routes.providers.DEMARCHES_SIMPLIFIEES_WEBHOOK_TOKEN', "good_token")
        @clean_database
        def when_has_valid_provider_name_and_dossier_id(self, mock_add_to_redis_queue, app):
            # Given
            data = {'dossier_id': '666'}

            # When
            response = TestClient(app.test_client()).post('/providers/offerer/application_update?token=good_token', form=data)

            # Then
            assert response.status_code == 202
            assert mock_add_to_redis_queue.call_args_list == [
              call('666', 'offerer')
            ]

    class Returns400:
        @patch('routes.providers.bank_information_job.delay')
        @patch('validation.routes.providers.DEMARCHES_SIMPLIFIEES_WEBHOOK_TOKEN', "good_token")
        @clean_database
        def when_has_not_dossier_in_request_form_data(self, mock_add_to_redis_queue, app):
            # Given
            data = {'fake_key': '666'}

            # When
            response = TestClient(app.test_client()).post('/providers/offerer/application_update?token=good_token', form=data)

            # Then
            assert response.status_code == 400

        @patch('routes.providers.bank_information_job.delay')
        @patch('validation.routes.providers.DEMARCHES_SIMPLIFIEES_WEBHOOK_TOKEN', "good_token")
        @clean_database
        def when_provider_is_not_offerer_or_venue(self, mock_add_to_redis_queue, app):
            # Given
            data = {'dossier_id': '666'}

            # When
            response = TestClient(app.test_client()).post('/providers/provider_name/application_update?token=good_token', form=data)

            # Then
            assert response.status_code == 400

    class Returns403:
        @patch('routes.providers.bank_information_job.delay')
        @patch('validation.routes.providers.DEMARCHES_SIMPLIFIEES_WEBHOOK_TOKEN', "good_token")
        @clean_database
        def when_has_not_a_token_in_url_params(self, mock_add_to_redis_queue, app):
            # Given
            data = {'dossier_id': '666'}

            # When
            response = TestClient(app.test_client()).post('/providers/offerer/application_update', form=data)

            # Then
            assert response.status_code == 403

        @patch('routes.providers.bank_information_job.delay')
        @patch('validation.routes.providers.DEMARCHES_SIMPLIFIEES_WEBHOOK_TOKEN', "good_token")
        @clean_database
        def when_token_in_url_params_is_not_good(self, mock_add_to_redis_queue, app):
            # Given
            data = {'dossier_id': '666'}

            # When
            response = TestClient(app.test_client()).post('/providers/provider_name/application_update?token=ABCD', form=data)

            # Then
            assert response.status_code == 403
