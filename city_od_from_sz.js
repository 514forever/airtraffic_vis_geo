var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
$.getJSON('city_od_from_sz.json', function (dataJson) {
    var chart = echarts.init(document.getElementById('depmapview'), 'dark');
    var option = {
        title: {
            top: '5%',
            left: '5%',
            text: '深圳机场流出城市航线图↗',
            textStyle: {
                color: '#ffffff',
                fontSize: 22,
            },
        },
        tooltip: {
            tirgger: 'item',

            backgroundColor: "rgba(0,0,0,0.5)",
            borderColor: "gray", //设置边框颜色
            textStyle: {
                color: "white" //设置文字颜色
            },
            formatter: function (params) {
                if (params.seriesType == "effectScatter") {
                    return '深圳 → ' + params.name + "<br />" + '当天班次: ' + params.value[2];
                } else {
                    return params.name;
                }

            }
        },
        geo: {
            map: 'china',
            roam: true,
            zoom: 1.1,
            label: {
                normal: {
                    show: true,
                    color: '#41555d'
                },
                emphasis: {
                    show: true,
                    color: '#a1afc9'
                },
            },
            itemStyle: {
                normal: {
                    areaColor: "#2b333d",
                    borderColor: "#414a5a",
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: "#031525",
                }
            }
        },
        visualMap: {
            min: 0,
            max: 150,
            calculable: true,
            range: [30, 150],
            inRange: {
                color: ['green', '#eac736', '#d94e5d']
            },

            textStyle: {
                color: "white" //设置文字颜色
            },
        },
        series: [
            {
                type: 'lines',
                coordinateSystem: 'geo',
                data: dataJson[0],
                lineStyle: {
                    normal: {
                        width: 2,
                        curveness: 0.1
                    }
                },
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                }
            },

            {
                type: 'effectScatter',
                coordinateSystem: "geo",
                roam: true,
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    emphasis: {
                        show: true,
                        position: 'top',
                        formatter: function (params) { return params['name'] }
                    }
                },

                data: dataJson[1],
                symbolSize: function (params) {
                    var ret = params[2] / 10;
                    if (ret < 1) {
                        ret = 1;
                    }
                    return ret;
                },
            }
        ]

    }
    chart.setOption(option);


});