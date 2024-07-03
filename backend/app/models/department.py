from flask_sqlalchemy import SQLAlchemy
from app import db 

class Department(db.Model):
  __tablename__ = 'department'
  id = db.Column(db.Integer, primary_key=True,autoincrement=True)
  name = db.Column(db.String,unique=True)
  employees = db.relationship('Employee', backref='department')

  def __init__(self,name):
    self.name = name