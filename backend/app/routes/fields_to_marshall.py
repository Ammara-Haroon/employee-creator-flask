from flask_restful import fields

employee_fields = {
    'id':fields.Integer(attribute="id"),
    'address':fields.String,
    'contractType':fields.String(attribute="contract_type"),
    'email':fields.String,
    'employmentType':fields.String(attribute="employment_type"),
    'finishDate':fields.String(attribute="finish_date"),
    'startDate':fields.String(attribute="start_date"),
    'firstName':fields.String(attribute="first_name"),
    'lastName':fields.String(attribute="last_name"),
    'middleName':fields.String(attribute="middle_name"),
    'role':fields.String,
    'mobileNumber':fields.String(attribute="mobile_number"),
    'hoursPerWeek':fields.Integer(attribute="hours_per_week"),
    'department_id':fields.Integer(attribute = "department_id"),
    'department_name':fields.String(attribute = "name") 
}

page_fields = {
    "totalPages":fields.Integer(attribute="pages"),
    "has_next":fields.Boolean(attribute="has_next"),
    "has_prev":fields.Boolean(attribute="has_prev"),   
    "content":fields.List(fields.Nested(employee_fields),attribute="items")
}

department_fields = {
    'id': fields.Integer,
    'name': fields.String,
}
