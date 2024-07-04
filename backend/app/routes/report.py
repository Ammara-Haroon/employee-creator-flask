import json
import pandas as pd
from flask import Response, jsonify
from matplotlib import pyplot as plt

from pandas import Series
from sqlalchemy import create_engine
import pyspark
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from app.routes import url
from app.routes import password
from app.routes import user

spark = SparkSession.builder \
    .appName("PostgreSQL Connection with PySpark")\
    .getOrCreate()


from app import app
@app.route('/report_department', methods=['GET'])
def get_report_dept():

  result_df = spark.read.format("jdbc")\
  .option("url",url)\
  .option("user",user)\
  .option("password",password)\
  .option("query",'''SELECT d.name AS department,count(*) as count FROM employee as e INNER JOIN department as d ON e.department_id=d.id GROUP BY d.id ORDER BY count''')\
  .load()
  result_df.show()

  return (result_df.toPandas().to_json(orient='records'))

@app.route('/report_employment_type', methods=['GET'])
def get_report_emp():

  result_df = spark.read.format("jdbc")\
  .option("url",url)\
  .option("user",user)\
  .option("password",password)\
  .option("query",'''SELECT e.employment_type,count(*) as count FROM employee as e GROUP BY e.employment_type ORDER BY count''')\
  .load()
  result_df.show()

  return (result_df.toPandas().to_json(orient='records'))


@app.route('/report_contract', methods=['GET'])
def get_report_contract():

  result_df = spark.read.format("jdbc")\
  .option("url",url)\
  .option("user",user)\
  .option("password",password)\
  .option("query",'''SELECT e.contract_type,count(*) as count FROM employee as e GROUP BY e.contract_type ORDER BY count''')\
  .load()
  result_df.show()

  return (result_df.toPandas().to_json(orient='records'))
