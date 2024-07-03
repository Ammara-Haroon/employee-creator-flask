import marshmallow as ma
from marshmallow import Schema, fields
from marshmallow.validate import Regexp


class DepartmentSchema(ma.Schema):
    id = fields.Int(required = False)
    name = fields.String(required = True,validate=Regexp(".*\S.*"))
   

