import datetime
from flask import jsonify, request
from sqlalchemy import and_, or_
from app import app
from app.models.department import Department
from app.models.employee import Employee
from app import db
import json
from flask_restful import marshal_with
from app.routes.fields_to_marshall import page_fields
from app.schemas.employee_schema import EmployeeSchema

@app.route('/employees', methods=['GET'])
@marshal_with(page_fields)
def getAllEmployees():
    PER_PAGE = 20
    args = request.args.to_dict()
    page = Employee.query.join(Department).add_columns(Employee.id,Employee.start_date,Employee.address,Employee.contract_type,Employee.email,Employee.employment_type,Employee.finish_date,Employee.first_name,Employee.last_name,Employee.hours_per_week,Employee.middle_name,Employee.role,Employee.mobile_number,Department.name,Employee.department_id)
    # set up sort order
    if args.get("sort")=="DESC":
        page = page.order_by(Employee.first_name.desc()).order_by(Employee.middle_name.desc()).order_by(Employee.last_name.desc())
    else:
        page = page.order_by(Employee.first_name.asc()).order_by(Employee.middle_name.asc()).order_by(Employee.last_name.asc())    
    # set up name filter
    name_search =f"%{args.get('name').strip()}%" 
    if len(name_search) != 0:
        print(name_search)
        page = page.filter(or_(Employee.first_name.ilike(name_search),Employee.last_name.ilike(name_search),Employee.middle_name.ilike(name_search)))
    # set up department, employementType and contractType filters
    page = page.filter(and_(Department.name.in_(args.get("department").split(",")),Employee.employment_type.in_(args.get("employmentType").split(",")),Employee.contract_type.in_(args.get("contractType").split(","))))
    return page.paginate(page=int(args.get('page', 1)),per_page=int(args.get('per_page', PER_PAGE)))


@app.route('/employees/<int:id>', methods=['DELETE'])
def deleteEmployee(id):
    count = Employee.query.filter(Employee.id==id).count()
    if count == 0:
        return jsonify({'message': f'Employee with {id} not found'}),404
    Employee.query.filter(Employee.id==id).delete()
    db.session.commit()
    return jsonify({'message': f'Employee with {id} deleted successfully'}),200



@app.route('/employees', methods=['POST'])
def createEmployee():
    count = Department.query.filter(Department.name==request.json['department']).count()
    if count == 0:
        return jsonify({'message': f'Department with {request.json["department"]} not found'}),400
    dept = Department.query.filter_by(name=request.json['department']).first()
    employee_schema = EmployeeSchema()
    errors = employee_schema.validate(data=request.json)
    if errors:
        return jsonify({'message': errors}),400
    # date validation
    try:
        finish = None
        start = datetime.datetime.strptime(request.json['startDate'][:10],'%Y-%m-%d')
        if request.json['finishDate'] is not None:
            finish =   datetime.datetime.strptime(request.json['finishDate'][:10],'%Y-%m-%d')
            if start > finish:
                return jsonify({'message': 'Finish date should be ahead of start date'}),400
    except (Exception):
        return jsonify({'message': 'Invalid date format'}),400
    mid = None
    if request.json['middleName'] is not None:
        mid = request.json['middleName'].strip().title()
    emp = Employee(request.json['address'].strip().title(),request.json['contractType'],request.json['email'].strip().lower(),request.json['employmentType'],finish,request.json['firstName'].strip().title(),request.json['hoursPerWeek'],request.json['lastName'].strip().title(),mid,request.json['mobileNumber'],start,request.json['role'].strip().title(),dept.id)    
    db.session.add(emp)
    db.session.commit()

    return jsonify({'message': f'Employee created successfully'}),201


def isNonBlankString(str):
    if len(str.strip()) < 1 or str.isnumeric():
        return False
    return True
            
@app.route('/employees/<int:id>', methods=['PUT'])
def updateEmployee(id):    
    count = Department.query.filter(Department.name==request.json['department']).count()
    if count == 0:
        return jsonify({'message': f'Department with name {request.json["department"]} not found'}),400
    count = Employee.query.filter(Employee.id==id).count()
    if count == 0:
        return jsonify({'message': f'Employee with {id} not found'}),404
    
    employeeSchema = EmployeeSchema()
    errors = employeeSchema.validate(data=request.json)
    print(errors)
    if errors:
        return jsonify({'message': errors}),400
    
    try:
        finish = None
        start = datetime.datetime.strptime(request.json['startDate'][:10],'%Y-%m-%d')
        if request.json['finishDate'] is not None:
            finish =   datetime.datetime.strptime(request.json['finishDate'][:10],'%Y-%m-%d')
            if start > finish:
                return jsonify({'message': 'Finish date should be ahead of start date'}),400
    except (Exception):
        return jsonify({'message': 'Invalid date format'}),400

    emp = Employee.query.filter_by(id=id).first()  
    emp.department_id = Department.query.filter_by(name=request.json['department']).first().id
    emp.start_date = start
    emp.finish_date=finish
    emp.address = request.json['address'].strip().title()
    emp.contract_type = request.json['contractType'] 
    emp.email = request.json['email'].strip().lower()
    emp.employment_type  =  request.json['employmentType']
    emp.first_name  = request.json['firstName'].strip().title() 
    emp.hours_per_week = request.json['hoursPerWeek']
    emp.last_name    = request.json['lastName'].strip().title()
    if request.json['middleName'] is not None:
        emp.middle_name   = request.json['middleName'].strip().title()
    emp.mobile_number =  request.json['mobileNumber']
    emp.role = request.json['role'].strip().title()
    db.session.commit()

    return jsonify({'message': f'Employee with {id} updated successfully'}),200



