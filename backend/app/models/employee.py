import enum

from flask_restful import Resource
from app import db


class Contract_Type(enum.Enum):
    CONTRACT = 'CONTRACT'
    PERMANENT = 'PERMANENT'

class Employment_Type(enum.Enum):
    FULL_TIME = 'FULL_TIME'
    PART_TIME = 'PART_TIME'

class Employee(db.Model):
  '''Employee entity'''
  __tablename__ = 'employee'
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  address = db.Column(db.String, nullable=False)
  contract_type = db.Column(db.Enum(Contract_Type)) 
  email = db.Column(db.String, nullable=False)
  employment_type  =  db.Column(db.Enum(Employment_Type))
  finish_date  = db.Column(db.DATE,nullable=False)
  first_name  = db.Column(db.String, nullable=False) 
  hours_per_week = db.Column(db.Integer, nullable=False)
  last_name    = db.Column(db.String, nullable=False)
  middle_name   = db.Column(db.String, nullable=True) 
  mobile_number =  db.Column(db.Integer, nullable=False)
  start_date = db.Column(db.DATE,nullable=False)
  role = db.Column(db.String, nullable=True)
  department_id = db.Column(db.Integer, db.ForeignKey('department.id'))
    
  def __init__(self,address,contract_type,email,employment_type,finish_date,first_name,hours_per_week,last_name,middle_name,mobile_number,start_date,role,department_id): 
    self.address = address
    self.contract_type = contract_type
    self.email = email
    self.employment_type = employment_type
    self.finish_date = finish_date
    self.first_name = first_name
    self.hours_per_week = hours_per_week
    self.last_name = last_name
    self.middle_name = middle_name
    self.mobile_number = mobile_number
    self.start_date = start_date
    self.role = role
    self.department_id = department_id
  
  def __repr__(self):
     return f"{self.id} {self.address} {self.email} {self.contract_type} {self.department_id} {self.employment_type}"
  
