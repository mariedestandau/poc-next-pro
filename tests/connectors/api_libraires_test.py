from unittest.mock import patch, MagicMock

import pytest

from connectors.api_libraires import ApiLibrairesException, get_stocks_from_libraires_api, is_siret_registered


class GetStocksFromLibrairesApiTest:
    @patch('connectors.api_libraires.requests.get')
    def test_should_raise_error_when_libraires_api_request_fails(self, mock_requests_get):
        # Given
        siret = '12345678912345'
        mock_requests_get.return_value = MagicMock(status_code=400)

        # When
        with pytest.raises(ApiLibrairesException) as exception:
            get_stocks_from_libraires_api(siret)

        # Then
        assert str(exception.value) == 'Error 400 when getting Libraires stocks for SIRET: 12345678912345'

    @patch('connectors.api_libraires.requests.get')
    def test_should_call_libraires_api_with_given_siret(self, mock_requests_get):
        # Given
        siret = '12345678912345'
        mock_requests_get.return_value = MagicMock(status_code=200)

        # When
        get_stocks_from_libraires_api(siret)

        # Then
        mock_requests_get.assert_called_once_with(
            'https://passculture.leslibraires.fr/stocks/12345678912345', params={'limit': '1000'})

    @patch('connectors.api_libraires.requests.get')
    def test_should_call_libraires_api_with_given_siret_and_last_processed_isbn(self, mock_requests_get):
        # Given
        siret = '12345678912345'
        last_processed_isbn = '9780199536986'
        modified_since = ''
        mock_requests_get.return_value = MagicMock(status_code=200)

        # When
        get_stocks_from_libraires_api(siret, last_processed_isbn, modified_since)

        # Then
        mock_requests_get.assert_called_once_with('https://passculture.leslibraires.fr/stocks/12345678912345',
            params={
                'limit': '1000',
                'after': last_processed_isbn
            })

    @patch('connectors.api_libraires.requests.get')
    def test_should_call_libraires_api_with_given_siret_and_last_modification_date(self, mock_requests_get):
        # Given
        siret = '12345678912345'
        last_processed_isbn = ''
        modified_since = '2019-12-16T00:00:00'
        mock_requests_get.return_value = MagicMock(status_code=200)

        # When
        get_stocks_from_libraires_api(siret, last_processed_isbn, modified_since)

        # Then
        mock_requests_get.assert_called_once_with('https://passculture.leslibraires.fr/stocks/12345678912345',
            params={
                'limit': '1000',
                'modifiedSince': modified_since
            })

    @patch('connectors.api_libraires.requests.get')
    def test_should_call_libraires_api_with_given_all_parameters(self, mock_requests_get):
        # Given
        siret = '12345678912345'
        last_processed_isbn = '9780199536986'
        modified_since = '2019-12-16T00:00:00'
        mock_requests_get.return_value = MagicMock(status_code=200)

        # When
        get_stocks_from_libraires_api(siret, last_processed_isbn, modified_since)

        # Then
        mock_requests_get.assert_called_once_with('https://passculture.leslibraires.fr/stocks/12345678912345',
            params={
                'limit': '1000',
                'after': last_processed_isbn,
                'modifiedSince': modified_since
            })

class  IsSiretRegisteredTest:
    @patch('connectors.api_libraires.requests.get')
    def test_should_call_libraires_api_with_given_siret(self, mock_requests_get):
        # Given
        siret = '12345678912345'
        mock_requests_get.return_value = MagicMock(status_code=200)

        # When
        is_siret_registered(siret)

        # Then
        mock_requests_get.assert_called_once_with(
            'https://passculture.leslibraires.fr/stocks/12345678912345')

    @patch('connectors.api_libraires.requests.get')
    def test_should_returns_true_if_api_returns_200(self, mock_requests_get):
        # Given
        siret = '12345678912345'
        mock_requests_get.return_value = MagicMock(status_code=200)

        # When
        output = is_siret_registered(siret)

        # Then
        assert output == True

    @patch('connectors.api_libraires.requests.get')
    def test_should_returns_false_when_libraires_api_request_fails(self, mock_requests_get):
        # Given
        siret = '12345678912345'
        mock_requests_get.return_value = MagicMock(status_code=400)

        # When
        output = is_siret_registered(siret)

        # Then
        assert output == False
