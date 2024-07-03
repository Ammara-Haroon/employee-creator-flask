import json
from flask import jsonify, request
from app import app

class AuthResponse:
    def __init__(self,authenticated,authorities,name):
        self.authenticated = authenticated
        self.authorities = authorities
        self.name = name

@app.route('/login',methods=['POST'])
def authenticate():
    user = request.json['username']
    password = request.json['password']
    if user=="admin" and password=="password":
        auth = AuthResponse(True,["ROLE_ADMIN","ROLE_USER"],user)
        return json.dumps(auth.__dict__),200
    
    if user=="user" and password=="password":
        auth = AuthResponse(True,["ROLE_USER"],user)
        return json.dumps(auth.__dict__),200
    return jsonify("Bad Username or Password"),401
    
