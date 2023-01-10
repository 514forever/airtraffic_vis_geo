window.onload=function(){

        var ROOT_PATH = 'https://echarts.apache.org/examples';
        var chartDom = document.getElementById('relationview');
        var relationChart = echarts.init(chartDom);
        var relationOption;

        relationChart.showLoading();
        $.getJSON('test.json', function (graph) {
          relationChart.hideLoading();
          graph.nodes.forEach(function (node) {
            node.label = {
              show: node.symbolSize > 25
            };
          });
          relationOption = {
            title: {
              text: '城市航班流通TOP20',
              subtext: ' ',
              top: '5%',
              left: '5%',
              textStyle: {
                color: '#ffffff',
                fontSize: 22,
            },
            },
            tooltip: {},
            legend: [
              {
               top: '85%',
               left: '5%',
                data: graph.categories.map(function (a) {
                  return a.name;
                }),
                textStyle:{
                 color: '#ffffff',
                fontSize: 10,
                }

              },
            ],
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
              {
                name: '',
                type: 'graph',
                layout: 'circular',
                circular: {
                  rotateLabel: true
                },
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                  position: 'right',
                  formatter: '{b}'
                },
                lineStyle: {
                  color: 'source',
                  curveness: 0.3
                }
              }
            ]
          };
          relationChart.setOption(relationOption);
        });
        relationOption && relationChart.setOption( relationOption);

  }