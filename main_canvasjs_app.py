from random import random

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/fruits', methods=['GET'])
def get_fruits():
    fruits = {
        "Apple": 150,
        "Banana": 40,
        "Mango": 100,
        "Orange": 60,
        "Grapes": 80,
        "Pineapple": 90,
        "Papaya": 50,
        "Watermelon": 30,
        "Pomegranate": 120,
        "Strawberry": 200
    }
    return jsonify(fruits)


@app.route('/api/usage', methods=['GET'])
def get_usage():
    usage_data = {
        "cpu_usage": [
            {"date": "2023-10-01", "usage": 45},
            {"date": "2023-10-02", "usage": 50},
            {"date": "2023-10-03", "usage": 55},
            {"date": "2023-10-04", "usage": 60},
            {"date": "2023-10-05", "usage": 65},
            {"date": "2023-10-06", "usage": 70},
            {"date": "2023-10-07", "usage": 75},
            {"date": "2023-10-08", "usage": 80},
            {"date": "2023-10-09", "usage": 85},
            {"date": "2023-10-10", "usage": 90}
        ],
        "memory_usage": [
            {"date": "2023-10-01", "usage": 30},
            {"date": "2023-10-02", "usage": 35},
            {"date": "2023-10-03", "usage": 40},
            {"date": "2023-10-04", "usage": 45},
            {"date": "2023-10-05", "usage": 50},
            {"date": "2023-10-06", "usage": 55},
            {"date": "2023-10-07", "usage": 60},
            {"date": "2023-10-08", "usage": 65},
            {"date": "2023-10-09", "usage": 70},
            {"date": "2023-10-10", "usage": 75}
        ],
        "network_usage": [
            {"date": "2023-10-01", "usage": 100},
            {"date": "2023-10-02", "usage": 150},
            {"date": "2023-10-03", "usage": 200},
            {"date": "2023-10-04", "usage": 250},
            {"date": "2023-10-05", "usage": 300},
            {"date": "2023-10-06", "usage": 350},
            {"date": "2023-10-07", "usage": 400},
            {"date": "2023-10-08", "usage": 450},
            {"date": "2023-10-09", "usage": 500},
            {"date": "2023-10-10", "usage": 550}
        ]
    }
    return jsonify(usage_data)


@app.route('/api/browser-market-share', methods=['GET'])
def get_browser_market_share():
    market_share_data = {
        "browsers": [
            {"name": "Chrome", "share": 64.0},
            {"name": "Safari", "share": 19.0},
            {"name": "Firefox", "share": 4.0},
            {"name": "Edge", "share": 3.0},
            {"name": "Opera", "share": 2.0},
            {"name": "Others", "share": 8.0}
        ]
    }
    return jsonify(market_share_data)


@app.route('/api/weather-forecast', methods=['GET'])
def get_weather_forecast():
    weather_data = {
        "forecast": [
            {"day": "Monday", "min_temp": 15, "max_temp": 26, "condition": "rainy"},
            {"day": "Tuesday", "min_temp": 15, "max_temp": 27, "condition": "rainy"},
            {"day": "Wednesday", "min_temp": 13, "max_temp": 27, "condition": "sunny"},
            {"day": "Thursday", "min_temp": 14, "max_temp": 27, "condition": "sunny"},
            {"day": "Friday", "min_temp": 15, "max_temp": 26, "condition": "cloudy"},
            {"day": "Saturday", "min_temp": 17, "max_temp": 26, "condition": "sunny"},
            {"day": "Sunday", "min_temp": 16, "max_temp": 27, "condition": "rainy"}
        ]
    }
    return jsonify(weather_data)


@app.route('/api/column-chart', methods=['GET'])
def get_column_chart_data():
    data_points = [
        {"label": "apple", "y": 10},
        {"label": "orange", "y": 15},
        {"label": "banana", "y": 25},
        {"label": "mango", "y": 30},
        {"label": "grape", "y": 28}
    ]
    return data_points


@app.route('/api/pie-chart', methods=['GET'])
def get_pie_chart_data():
    data_points = [
        {"label": "Online Store", "y": 27},
        {"label": "Offline Store", "y": 25},
        {"label": "Discounted Sale", "y": 30},
        {"label": "B2B Channel", "y": 8},
        {"label": "Others", "y": 10}
    ]
    return data_points


@app.route('/api/line-chart', methods=['GET'])
def get_line_chart_data():
    user_data_2020 = [
        {"label": "JAN", "y": 58200},
        {"label": "FEB", "y": 59110},
        {"label": "MAR", "y": 60320},
        {"label": "APR", "y": 61440},
        {"label": "MAY", "y": 62580},
        {"label": "JUN", "y": 63190},
        {"label": "JUL", "y": 64000},
        {"label": "AUG", "y": 64290},
        {"label": "SEP", "y": 65530},
        {"label": "OCT", "y": 65300},
        {"label": "NOV", "y": 65340},
        {"label": "DEC", "y": 64530}
    ]
    user_data_2021 = [
        {"label": "JAN", "y": 65100},
        {"label": "FEB", "y": 66210},
        {"label": "MAR", "y": 66540},
        {"label": "APR", "y": 66680},
        {"label": "MAY", "y": 67500},
        {"label": "JUN", "y": 68850},
        {"label": "JUL", "y": 69000},
        {"label": "AUG", "y": 70130},
        {"label": "SEP", "y": 71050},
        {"label": "OCT", "y": 71500},
        {"label": "NOV", "y": 72110},
        {"label": "DEC", "y": 71820}
    ]
    return [user_data_2020, user_data_2021]


@app.route('/api/spline-chart', methods=['GET'])
def get_spline_chart_data():
    xstart = int(request.args.get('xstart', 0))
    ystart = int(request.args.get('ystart', 0))
    length = int(request.args.get('length', 1))

    y = ystart
    datapoints = []

    for i in range(length):
        y += round(5 + random() * (-5 - 5))
        datapoints.append({"x": xstart + i, "y": y})

    return jsonify(datapoints)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8181, debug=True)
