from flask import Flask, jsonify, render_template
import random
import time

app = Flask(__name__)

# Sample stocks data with fixed opening prices
stocks_data = [
    {"symbol": "AAPL", "opening_price": random.uniform(120, 150)},
    {"symbol": "GOOGL", "opening_price": random.uniform(1000, 2000)},
    {"symbol": "TSLA", "opening_price": random.uniform(600, 900)},
    {"symbol": "MSFT", "opening_price": random.uniform(200, 300)},
    {"symbol": "AMZN", "opening_price": random.uniform(1500, 3500)}
]

# Function to update current prices
def update_current_prices():
    for stock in stocks_data:
        # Generate a random current price based on the opening price
        change = random.uniform(-5, 5)  # Change can be -5 to 5
        stock["current_price"] = stock["opening_price"] + change  # Allow price to go below opening price
        stock["profit"] = round(stock["current_price"] - stock["opening_price"], 2)
        stock["last_updated"] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/stocks')
def get_stocks():
    update_current_prices()  # Update prices every request
    return jsonify(stocks_data)

if __name__ == '__main__':
    app.run(debug=True,port=3000)
