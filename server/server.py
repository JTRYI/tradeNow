from requests_oauthlib import OAuth2Session
from flask import Flask, request, redirect, session, url_for, jsonify
from requests.auth import HTTPBasicAuth
from flask_cors import CORS
import requests
import urllib.parse
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

app = Flask(__name__)
CORS(app)  # Enable CORS


app.config['SESSION_TYPE'] = os.getenv('SESSION_TYPE')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

client_id = os.getenv('CLIENT_ID')
client_secret =  os.getenv('CLIENT_SECRET')

authorization_base_url = 'https://apm.tp.sandbox.fidorfzco.com/oauth/authorize'
token_url = 'https://apm.tp.sandbox.fidorfzco.com/oauth/token'
redirect_uri = 'http://localhost:5000/callback'

@app.route('/', methods=["GET"])
@app.route('/index', methods=["GET"])
def default():
    try:
        fidor = OAuth2Session(client_id, redirect_uri=redirect_uri)
        authorization_url, state = fidor.authorization_url(authorization_base_url)
        session['oauth_state'] = state
        return redirect(authorization_url)
    except KeyError:
        return redirect(url_for('default'))

@app.route("/callback", methods=["GET"])
def callback():
    try:
        fidor = OAuth2Session(client_id, state=session['oauth_state'], redirect_uri=redirect_uri)
        authorizationCode=request.args.get('code')
        body='grant_type="authorization_code&code='+authorizationCode+ \
        '&redirect_uri='+redirect_uri+'&client_id='+client_id
        auth = HTTPBasicAuth(client_id,client_secret)
        token=fidor.fetch_token(token_url,auth=auth,code=authorizationCode,body=body,method='POST')

        session['oauth_token']=token

        token_str = urllib.parse.quote(token["access_token"])
        return redirect(f'http://localhost:3000/dashboard?token={token_str}')
    except KeyError:
        return redirect(url_for('default'))

@app.route("/services", methods=['GET'])
def services():
    try:
        # Get the token from the Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({"error": "Authorization header missing"}), 401
        
        token = auth_header.split(" ")[1]

        url = 'https://api.tp.sandbox.fidorfzco.com/accounts'
        headers = {
            'Accept': "application/vnd.fidor.de;version=1;text/json",
            'Authorization': "Bearer " + token
        }
        response = requests.get(url, headers=headers)
        customers_account = response.json()
        customer_details = customers_account['data'][0]
        customer_information = customer_details['customers'][0]

        return jsonify({
            "id": customer_information["id"],
            "firstName": customer_information["first_name"],
            "lastName": customer_information["last_name"],
            "accountNo": customer_details["account_number"],
            "balance": customer_details["balance"] / 100
        })
    except KeyError:
        return jsonify({"error": "Invalid token"}), 401

@app.route("/process", methods=["POST"])
def process():
    if request.method == "POST":

        token = request.headers.get('Authorization').split(" ")[1]

        fidorID = request.json['fidorID']
        custEmail = request.json['customerEmailAdd']
        transferAmt = int(float(request.json['transferAmount']) * 100)
        transferRemarks = request.json['transferRemarks']
        transactionID = request.json['transactionID']

        url = "https://api.tp.sandbox.fidorfzco.com/internal_transfers"
        payload = {
            "account_id": fidorID,
            "receiver": custEmail,
            "external_uid": transactionID,
            "amount": transferAmt,
            "subject": transferRemarks
        }
        headers = {
            'Accept': 'application/vnd.fidor.de; version=1,text/json',
            'Authorization': "Bearer " + token,
            'Content-Type': "application/json"
        }
        response = requests.post(url, json=payload, headers=headers)
        transaction_details = response.json()

        return jsonify(transaction_details)

@app.route("/transaction_history", methods=["GET"])
def t_history():
    if request.method == "GET":
        token = session['oauth_token']
        url = "https://api.tp.sandbox.fidorfzco.com/transactions?page=1&per_page=10"
        headers = {
            'Accept': 'application/vnd.fidor.de; version=1,text/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token["access_token"]
        }
        response = requests.get(url, headers=headers)
        transaction_histories = response.json()

        return jsonify(transaction_histories)

if __name__ == '__main__':
    app.run(debug=True)
