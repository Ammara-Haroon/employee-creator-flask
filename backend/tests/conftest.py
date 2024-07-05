from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
import pytest
from tests import TEST_DB_URI 
from app import create_app,db
from app import app
from app.factory.factory import setupDefaultDepartments



@pytest.fixture(scope="session")
def client():
  ctx = app.test_request_context()
  ctx.push()
  setupDefaultDepartments()
  print(db.engine.url)
  yield app.test_client()
  db.session.remove()
  db.drop_all()

  ctx.pop()
  
 
@pytest.fixture(scope="session")
def ma(app):
  ma = Marshmallow(app)
  yield(ma)

