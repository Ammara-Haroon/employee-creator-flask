from flask_sqlalchemy import SQLAlchemy
import pytest
from app import app as app2
from app import db as db2
@pytest.fixture()
def app():
    app2.config.update({
        "TESTING": True,
        'SQLALCHEMY_DATABASE_URI':\
           'postgresql://postgres:raffay238@localhost:5433/test_db'
    })
    yield app2

@pytest.fixture()
def client(app):
    return app.test_client()

@pytest.fixture()
def db(app):
    yield db2(app)

@pytest.fixture()
def setUp(self):
    db.create_all()

@pytest.fixture()
def tearDown(self):
    db.session.remove()
    db.drop_all()
        
@pytest.fixture()
def runner(app):
    return app.test_cli_runner()

def test_get_employees_with_correct_args(client):
    response = client.get("/employees?page=1&per_page=20&sort=ASC&name=&department=ADMIN,FINANCE,IT&employmentType=FULL_TIME,PART_TIME&contractType=CONTRACT,PERMANENT")
    assert response.status_code == 200
    
def test_get_employees_with_incorrect_page(client):
    response = client.get("/employees?page=-1&per_page=20&sort=ASC&name=&department=ADMIN,FINANCE,IT&employmentType=FULL_TIME,PART_TIME&contractType=CONTRACT,PERMANENT")
    assert response.status_code == 400

def test_get_employees_with_missing_department_names(client):
    response = client.get("/employees?page=1&per_page=20&sort=ASC&name=&employmentType=FULL_TIME,PART_TIME&contractType=CONTRACT,PERMANENT")
    assert response.status_code == 400

def test_get_employees_with_missing_employement_type(client):
    response = client.get("/employees?page=1&per_page=20&sort=ASC&name=&department=ADMIN,FINANCE,IT&contractType=CONTRACT,PERMANENT")
    assert response.status_code == 400

def test_get_employees_with_missing_contract_type(client):
    response = client.get("/employees?page=1&per_page=20&sort=ASC&name=&department=ADMIN,FINANCE,IT&employmentType=FULL_TIME,PART_TIME")
    assert response.status_code == 400

def test_delete_employee_with_incorrect_employee_id(client):
    response = client.delete("/employees/99")
    assert response.status_code == 404

def test_create_employee_with_missing_name(client):
    response = client.post("/employees",data={ "lastName": "a ", "middleName": " n", "email": "amm.haro@oil.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_incorrect_name(client):
    response = client.post("/employees",data={"firstName": "123a ", "lastName": "a ", "middleName": " n", "email": "amm.haro@oil.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_missing_email(client):
    response = client.post("/employees",data={"firstName": "a ", "lastName": "a ", "middleName": " n", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_email(client):
    response = client.post("/employees",data={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "amm.harooil.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_mobile_number(client):
    response = client.post("/employees",data={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "amm.harooil.com", "address": "a 1", "mobileNumber": "aaa", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_hours_per_week(client):
    response = client.post("/employees",data={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "ammara.harooil.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 50, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_employment_type(client):
    response = client.post("/employees",data={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "amm.harooil@mm.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400


def test_create_employee_with_wrong_contract_type(client):
    response = client.post("/employees",data={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "WRONG", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_department(client):
    response = client.post("/employees",data={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "WRONG", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_finish_date(client):
    response = client.post("/employees",data={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2023-07-09T05:32:59.384Z"})
    assert response.status_code == 400

