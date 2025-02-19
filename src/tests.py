import pytest
from unittest.mock import AsyncMock, patch
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

@pytest.mark.asyncio
@patch("apis.auth.router.Database.read_from_db", new_callable=AsyncMock)
async def test_login_success(mock_read_from_db):
    # Mock data for a successful login
    mock_read_from_db.return_value = [{"id": 1, "email": "test@example.com", "passwordHash": "hashed_password"}]

    # Payload for the login request
    payload = {"email": "test@example.com", "password": "hashed_password"}

    # Making a POST request to the login endpoint
    response = client.post("/auth/login", json=payload)

    # Assertions
    assert response.status_code == 200
    assert response.json() == {
        "message": "Login successful",
        "data": [{"id": 1, "email": "test@example.com", "passwordHash": "hashed_password"}]
    }


@pytest.mark.asyncio
@patch("apis.auth.router.Database.read_from_db", new_callable=AsyncMock)
async def test_login_failure(mock_read_from_db):
    # Mock data for a failed login
    mock_read_from_db.return_value = []

    # Payload for the login request
    payload = {"email": "wrong@example.com", "password": "wrong_password"}

    # Making a POST request to the login endpoint
    response = client.post("/auth/login", json=payload)

    # Assertions
    assert response.status_code == 200
    assert response.json() == {
        "message": "Login failed",
        "data": []
    }


@pytest.mark.asyncio
@patch("apis.auth.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_litter_data_success(mock_read_from_db):
    # Mock data for a successful request
    mock_read_from_db.return_value = [("Jan", 10), ("Feb", 15)]

    # Making a GET request to the get_litter_data endpoint
    response = client.get("/dashboard/get_litter_data?year=2024")

    # Assertions
    assert response.status_code == 200
    assert response.json() == [
        {"month": "Jan", "incidents": 10},
        {"month": "Feb", "incidents": 15}
    ]


@pytest.mark.asyncio
@patch("apis.auth.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_litter_data_not_found(mock_read_from_db):
    # Mock no data found
    mock_read_from_db.return_value = []

    # Making a GET request to the get_litter_data endpoint
    response = client.get("/dashboard/get_litter_data?year=2024")

    # Assertions
    assert response.status_code == 404
    assert response.json() == {"detail": "No data found"}


@pytest.mark.asyncio
@patch("apis.auth.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_list_of_years_not_found(mock_read_from_db):
    # Mock no data found
    mock_read_from_db.return_value = []

    # Making a GET request to the get_list_of_years endpoint
    response = client.get("/dashboard/get_list_of_years")

    # Assertions
    assert response.status_code == 404
    assert response.json() == {"detail": "No data found"}


@pytest.mark.asyncio
@patch("apis.auth.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_hot_points_success(mock_read_from_db):
    # Mock data for a successful request
    mock_read_from_db.return_value = [(73.8567, 18.5204), (77.2090, 28.6139)]

    # Making a GET request to the get_hot_points endpoint
    response = client.get("/dashboard/get_hot_points")

    # Assertions
    assert response.status_code == 200
    assert response.json() == [[18.5204, 73.8567], [28.6139, 77.2090]]


@pytest.mark.asyncio
@patch("apis.auth.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_hot_points_not_found(mock_read_from_db):
    # Mock no data found
    mock_read_from_db.return_value = []

    # Making a GET request to the get_hot_points endpoint
    response = client.get("/dashboard/get_hot_points")

    # Assertions
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.asyncio
@patch("apis.reports.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_list_of_reports_success(mock_read_from_db):
    # Mock data for a successful request
    mock_read_from_db.return_value = [
        ("John Doe", "1234567890123", 24.8607, 67.0011, "Location A", 500, "Paid", 1),
        ("Jane Doe", "9876543210987", 24.8607, 67.0011, "Location B", 1000, "Unpaid", 2)
    ]

    response = client.get("/reports/get_list_of_reports?searchTerm=John&fineStatus=Paid&location=Location")

    assert response.status_code == 200
    assert response.json() == [
        {"name": "John Doe", "cnic": "1234567890123", "location": "Location A", "fine": "Rs 500", "status": "Paid", "reportid": 1},
        {"name": "Jane Doe", "cnic": "9876543210987", "location": "Location B", "fine": "Rs 1000", "status": "Unpaid", "reportid": 2}
    ]


@pytest.mark.asyncio
@patch("apis.reports.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_list_of_reports_no_data(mock_read_from_db):
    mock_read_from_db.return_value = []
    response = client.get("/reports/get_list_of_reports?searchTerm=John&fineStatus=Paid&location=Location")
    assert response.status_code == 200
    assert response.json() == [{"name": "", "cnic": "", "location": "", "fine": "", "status": "", "reportid": ""}]


@pytest.mark.asyncio
@patch("apis.reports.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_report_success(mock_read_from_db):
    mock_read_from_db.return_value = [
        ("John Doe", "1234567890123", "123 Street, City", "Location A", "10:30 AM", "2024-12-10", 500, "Littering", 3)
    ]

    response = client.get("/reports/get_report?report_id=1")

    assert response.status_code == 200
    assert response.json() == [
        {
            "offender_name": "John Doe", 
            "cnic": "1234567890123", 
            "address": "123 Street, City", 
            "location_of_offence": "Location A", 
            "time_of_offence": "10:30 AM", 
            "date_of_offence": "2024-12-10", 
            "fine_issued": "Rs 500", 
            "info_details": "Littering", 
            "total_offences": 3
        }
    ]


@pytest.mark.asyncio
@patch("apis.reports.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_report_not_found(mock_read_from_db):
    mock_read_from_db.return_value = []
    response = client.get("/reports/get_report?report_id=1")
    assert response.status_code == 200
    assert response.json() == [{
        "offender_name": "", "cnic": "", "address": "", "location_of_offence": "", 
        "time_of_offence": "", "date_of_offence": "", "fine_issued": "", "info_details": "", "total_offences": 0
    }]


@pytest.mark.asyncio
@patch("apis.reports.router.get_idcard", return_value=b"fake_image_data")
async def test_get_id_card_image_success(mock_get_idcard):
    response = client.get("/reports/get_id_card_image?cnic=1234567890123")
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/jpeg"


@pytest.mark.asyncio
@patch("apis.reports.router.get_idcard", return_value=None)
async def test_get_id_card_image_not_found(mock_get_idcard):
    response = client.get("/reports/get_id_card_image?cnic=1234567890123")
    assert response.status_code == 200
    assert response.json() == {"error": "Image not found"}


@pytest.mark.asyncio
@patch("apis.reports.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_history_data_success(mock_read_from_db):
    mock_read_from_db.return_value = [
        ("2024-12-10", "Paid"),
        ("2024-11-08", "Unpaid")
    ]
    response = client.get("/reports/get_history_data?cnic=1234567890123")
    assert response.status_code == 200
    assert response.json() == [
        {"offense_date": "2024-12-10", "fine_status": "Paid"},
        {"offense_date": "2024-11-08", "fine_status": "Unpaid"}
    ]


@pytest.mark.asyncio
@patch("apis.reports.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_history_data_no_data(mock_read_from_db):
    mock_read_from_db.return_value = []
    response = client.get("/reports/get_history_data?cnic=1234567890123")
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.asyncio
@patch("apis.reports.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_list_of_reports_db_error(mock_read_from_db):
    mock_read_from_db.side_effect = Exception("Database error")
    response = client.get("/reports/get_list_of_reports?searchTerm=John&fineStatus=Paid&location=Location")
    assert response.status_code == 500
    assert response.json() == {"detail": "Database error: Database error"}


@pytest.mark.asyncio
@patch("apis.reports.router.Database.read_from_db", new_callable=AsyncMock)
async def test_get_report_db_error(mock_read_from_db):
    mock_read_from_db.side_effect = Exception("Database error")
    response = client.get("/reports/get_report?report_id=1")
    assert response.status_code == 500
    assert response.json() == {"detail": "Database error: Database error"}