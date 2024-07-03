from flask import jsonify
from app import app

@app.errorhandler(Exception)          
def basic_error(e):          
    return jsonify("an error occured : " + str(e)),400   