import datetime
from faker import Faker
import numpy
from app import db
from app.models.employee import Contract_Type, Employee, Employment_Type
from app.models.department import Department


def employee_factory():
    fake = Faker()
    now = datetime.datetime.now()
    date_created = now.strftime('%Y-%m-%d %H-%M-%S')
   
    for i in range(2,50):
        emp = Employee(fake.address(),fake.enum(Contract_Type).value,fake.email(),fake.enum(Employment_Type).value,None,fake.first_name(),numpy.random.randint(2, 40),fake.last_name(),fake.last_name(),"0444444444",datetime.datetime.now(),fake.job(),(i%3)+1)
        db.session.add(emp)
        db.session.commit()
    
def setupDefaultDepartments():
  admin = Department(name='ADMIN')
  finance = Department(name='FINANCE')
  IT = Department(name='IT')
  db.session.add(admin)
  db.session.add(finance)
  db.session.add(IT)
  db.session.commit()

