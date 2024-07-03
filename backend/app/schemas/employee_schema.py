import marshmallow as ma
from marshmallow import Schema, fields
from marshmallow.validate import Length, Range,Regexp

from app.models.employee import Contract_Type, Employment_Type

class EmployeeSchema(ma.Schema):
    id = fields.Int(required = False)
    address = fields.String(required=True,validate=[Length(min=2),Regexp(".*\S.*\S.*")])
    contractType = fields.Enum(Contract_Type)
    email = fields.Email(required=True)
    employmentType = fields.Enum(Employment_Type)
    finishDate = fields.DateTime(allow_none = True,required=False)
    startDate = fields.DateTime(required=True)
    firstName = fields.String(required = True,validate=Regexp(".*\S.*"))
    lastName = fields.String(required = True,validate=Regexp(".*\S.*"))
    middleName = fields.String(required=False,allow_none = True,validate=Regexp(".*\S.*"))
    role = fields.String(required = True,validate=Regexp(".*\S.*"))
    mobileNumber = fields.String(required = True,validate=Regexp("\d{8,20}"))
    hoursPerWeek = fields.Int(required = True,validate=Range(min=1,max=40))
    department =  fields.String(required = True)


