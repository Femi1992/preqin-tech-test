import pytest
from server import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_investors(client):
    response = client.get('/investors')
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)

def test_get_investor(client):
    response = client.get('/investor/1')
    response_data = response.get_json()
    assert response_data['investor']['investor_name'] == 'Ioo Gryffindor fund' #overkill perhaps
    assert 'investor' in response_data
    assert 'commitments' in response_data
    assert response.status_code == 200


def test_get_invalid_investor(client):
    response = client.get('/investor/100')
    assert response.status_code == 404
    assert response.get_json() == {'error': 'Investor not found'}