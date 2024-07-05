
import json


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
    response = client.delete("/employees/90")
    assert response.status_code == 404

def test_create_employee_with_missing_name(client):
    response = client.post("/employees",json={ "lastName": "a ", "middleName": " n", "email": "amm.haro@oil.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_incorrect_name(client):
    response = client.post("/employees",json={"firstName": "123a ", "lastName": "a ", "middleName": " n", "email": "amm.haro@oil.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_missing_email(client):
    response = client.post("/employees",json={"firstName": "a ", "lastName": "a ", "middleName": " n", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_email(client):
    response = client.post("/employees",json={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "amm.harooil.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_mobile_number(client):
    response = client.post("/employees",json={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "amm.harooil.com", "address": "a 1", "mobileNumber": "aaa", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_hours_per_week(client):
    response = client.post("/employees",json={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "ammara.harooil.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 50, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_employment_type(client):
    response = client.post("/employees",json={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "amm.harooil@mm.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400


def test_create_employee_with_wrong_contract_type(client):
    response = client.post("/employees",json={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "WRONG", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_department(client):
    response = client.post("/employees",json={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "WRONG", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_wrong_finish_date(client):
    response = client.post("/employees",json={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2023-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_create_employee_with_correct_values(client):
    response = client.post("/employees",json={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 201

def test_create_employee_with_correct_values(client):
    response = client.post("/employees",json={"firstName": "a ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 201

def test_update_employee_with_correct_values(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 200

def test_update_employee_with_incorrect_name(client):
    response = client.put("/employees/1",json={"firstName": "123new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_update_employee_with_incorrect_email(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammharilcom", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_update_employee_with_incorrect_address(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400


def test_update_employee_with_incorrect_mobile(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "044aaa", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400


def test_update_employee_with_incorrect_hours(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 50, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400


def test_update_employee_with_employment_type(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULLWRONG", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400


def test_update_employee_with_incorrect_contract_type(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "WRONG", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400


def test_update_employee_with_incorrect_department(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "WRONG", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400


def test_update_employee_with_incorrect_role(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " 123", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400


def test_update_employee_with_incorrect_finish_date(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2021-07-09T05:32:59.384Z"})
    assert response.status_code == 400


def test_update_employee_with_incorrect_start_date(client):
    response = client.put("/employees/1",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "some wrong format", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 400

def test_update_employee_with_incorrect_id(client):
    response = client.put("/employees/100",json={"firstName": "new name ", "lastName": "a ", "middleName": " n", "email": "ammhar@il.com", "address": "a 1", "mobileNumber": "0444444235", "hoursPerWeek": 30, "employmentType": "FULL_TIME", "contractType": "PERMANENT", "department": "ADMIN", "role": " s", "startDate": "2024-06-29T05:32:59.384Z", "finishDate": "2025-07-09T05:32:59.384Z"})
    assert response.status_code == 404

def test_delete_employee_with_incorrect_id(client):
    response = client.delete("/employees/100")
    assert response.status_code == 404

def test_delete_employee_with_correct_id(client):
    response = client.delete("/employees/1")
    assert response.status_code == 200

