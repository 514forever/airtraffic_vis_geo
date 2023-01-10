import pandas as pd
import numpy as np
from flask import Flask,render_template
app = Flask(__name__,
static_folder = '',
template_folder = '')


@app.route('/', methods=['POST', 'GET'])
@app.route('/index/', methods=['POST', 'GET'])
def index():
    return render_template('./index.html')

@app.route('/airline')
def airline():
    df = pd.read_excel("./我国各城市间航空班次数据.xlsx", usecols=['市_x', '市_y', '日航班次数'])
    from_sz = df[df['市_x'] == '深圳市'].sort_values(by="日航班次数", ascending=False)

    city_from_sz = from_sz['市_y']
    city_from_sz_list = []
    for element in city_from_sz:
        city_from_sz_list.append(element)

    value_from_sz = from_sz['日航班次数']
    value_from_sz_list = []
    for element in value_from_sz:
        value_from_sz_list.append(element)

    to_sz = df[df['市_y'] == '深圳市'].sort_values(by="日航班次数", ascending=False)
    city_to_sz = to_sz['市_x']
    city_to_sz_list = []
    for element in city_to_sz:
        city_to_sz_list.append(element)

    value_to_sz = to_sz['日航班次数']
    value_to_sz_list = []
    for element in value_to_sz:
        value_to_sz_list.append(element)

    return render_template('./airline.html', Axis_data_out=city_from_sz_list, value_data_out=value_from_sz_list
                           , Axis_data_in=city_to_sz_list, value_data_in=value_to_sz_list)


@app.route('/airport')
def airport():
    return render_template('./test.html')


if  __name__  ==  '__main__':
    from werkzeug.serving import run_simple
    run_simple('127.0.0.1', 8080, app)

