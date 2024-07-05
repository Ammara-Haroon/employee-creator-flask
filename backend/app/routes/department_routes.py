from flask import app, jsonify, request
from app.models.department import Department
from app import app,db
from flask_restful import marshal_with
from flask_validators import validate_db
from app.schemas.department_schema import DepartmentSchema
from app.routes.fields_to_marshall import department_fields

@app.route('/departments', methods=['GET'])
@marshal_with(department_fields)
def getAllDepartments():
    depts = Department.query.all()
    return depts

@app.route('/departments', methods=['POST'])
@validate_db(Department, db.session, name=['check_unique'])
def createDepartment():
    department_schema = DepartmentSchema()   
    errors = department_schema.validate(request.json)
    if errors:
        return jsonify({"message":errors}),400
    dept_name = request.json["name"].strip().upper()
    newDept = Department(dept_name)
    db.session.add(newDept)
    db.session.commit()
    return jsonify({'message': f'Department with {dept_name} added successfully'}),200



@app.route('/departments/<int:id>', methods=['DELETE'])
def deleteDepartment(id):
    count = Department.query.filter(Department.id==id).count()
    if count == 0:
        return jsonify({'message': f'Department with {id} not found'}),404
    Department.query.filter(Department.id==id).delete()
    db.session.commit()
    return jsonify({'message': f'Department with {id} deleted successfully'}),200



@validate_db(Department, db.session, name=['check_unique'])
@app.route('/departments/<int:id>', methods=['PUT'])
def updateDepartment(id):
    count = Department.query.filter(Department.id==id).count()
    if count == 0:
        return jsonify({'message': f'Department with {id} not found'}),404    
    department_schema = DepartmentSchema()   
    errors = department_schema.validate(request.json)
    if errors:
        return jsonify({"message":errors}),400
    dept_name = request.json["name"].strip().upper()
    dept_found = Department.query.filter_by(id=id).first()
    dept_found.name = dept_name.strip().upper()
    db.session.commit()
    return jsonify({'message': f'Department with {dept_name} updated successfully'}),200

