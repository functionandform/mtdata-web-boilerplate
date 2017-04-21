function drawCharts() {

  if(document.getElementById('chartDashboard1')) {
    new Chartist.Pie('#chartDashboard1', {
        //labels: ['Accepted', 'Recalled', 'Rejected'],
        series: [10, 1, 1]
    }, {
      // Default configuration
      labelInterpolationFnc: function(value) {
          return value;
        },
        labelDirection: 'explode',
        plugins: [
           Chartist.plugins.legend({
              legendNames: ['Accepted', 'Recalled', 'Rejected']

           })
        ]
    }, [
      // Options override for media > 400px
      ['screen and (min-width: 300px)', {
        chartPadding: 24,
        //labelOffset: 48,
      }],
      ['screen and (min-width: 374px)', {
        chartPadding: 24,
        //labelOffset: 72,
      }],
      ['screen and (min-width: 768px)', {
        chartPadding: 24,
        //labelOffset: 32,
      }],
      ['screen and (min-width: 960px)', {
        //labelOffset: 48,
        chartPadding: 24
      }],
      ['screen and (min-width: 1024px)', {
        //labelOffset: 48,
        chartPadding: 24
      }]
    ]);
  }


    if(document.getElementById('chartDemo1')) {

      new Chartist.Line('#chartDemo1', {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        series: [
          [5, 9, 7, 8, 5, 3, 5, 4]
        ]
      }, {
        low: 0,
        showArea: true
      });
    }

    if(document.getElementById('chartDemo2')) {
      new Chartist.Bar('#chartDemo2', {
        labels: ['First quarter of the year', 'Second quarter of the year', 'Third quarter of the year', 'Fourth quarter of the year'],
        series: [
          [60000, 40000, 80000, 70000],
          [40000, 30000, 70000, 65000],
          [8000, 3000, 10000, 6000]
        ]
      }, {
        seriesBarDistance: 10,
        axisX: {
          offset: 60
        },
        axisY: {
          offset: 80,
          labelInterpolationFnc: function(value) {
            return value + ' km'
          },
          scaleMinSpace: 15
        }
      });
    }

    if(document.getElementById('chartDemo3')) {
      new Chartist.Pie('#chartDemo3', {
        series: [20, 10, 30, 40]
      }, {
        donut: true,
        donutWidth: 60,
        startAngle: 270,
        total: 200,
        showLabel: false
      });
    }

    if(document.getElementById('chartDemo4')) {
        new Chartist.Bar('#chartDemo4', {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [
          [5, 4, 3, 7, 5, 10, 3],
          [3, 2, 9, 5, 4, 6, 4]
        ]
      }, {
        seriesBarDistance: 10,
        reverseData: true,
        horizontalBars: true,
        axisY: {
          offset: 70
        }
      });
    }

    /*if(document.getElementById('chartDemo5')) {
      new Chartist.Pie('#chartDemo5', {
        series: [1,5,3,6],
        labelInterpolationFnc: function(value) {
          return value
        },
        plugins: [
           Chartist.plugins.legend({
              legendNames: ['Accepted', 'Recalled', 'Rejected']

           })
        ]
      });
    }*/
    if(document.getElementById('chartDemo5')) {
    new Chartist.Pie('#chartDemo5', {
        //labels: ['Accepted', 'Recalled', 'Rejected'],
        series: [1,5,3,6]
    }, {
      // Default configuration
      labelInterpolationFnc: function(value) {
          return value;
        },
        labelDirection: 'explode',
        plugins: [
           Chartist.plugins.legend({
              legendNames: ['Item 1', 'Item 2', 'Item 3', 'Item 4']

           })
        ]
    }, [
      // Options override for media > 400px
      ['screen and (min-width: 300px)', {
        chartPadding: 24,
        //labelOffset: 48,
      }],
      ['screen and (min-width: 374px)', {
        chartPadding: 24,
        //labelOffset: 72,
      }],
      ['screen and (min-width: 768px)', {
        chartPadding: 24,
        //labelOffset: 32,
      }],
      ['screen and (min-width: 960px)', {
        //labelOffset: 48,
        chartPadding: 24
      }],
      ['screen and (min-width: 1024px)', {
        //labelOffset: 48,
        chartPadding: 24
      }]
    ]);
  }

    if(document.getElementById('chartDemo6')) {

      new Chartist.Bar('#chartDemo6', {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        series: [
          [800000, 1200000, 1400000, 1300000],
          [200000, 400000, 500000, 300000],
          [100000, 200000, 400000, 600000]
        ]
      }, {
        stackBars: true,
        axisY: {
          labelInterpolationFnc: function(value) {
            return (value / 1000) + 'k';
          }
        }
      }).on('draw', function(data) {
        if(data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 30px'
          });
        }
      });
    }
  }



  var donuts = {
  init : function () {
    this.initDonut('#donut1');
    this.initDonut('#donut2');
    this.initDonut('#donut3');
    this.initDonut('#donut4');
  },

  initDonut : function (selector) {

    var chartValue = $(selector).data('value');
    var chartSeries = [chartValue];
    var chartNew = new Chartist.Pie(selector, {
      series: chartSeries
    }, {
      startAngle: 5,
      chartPadding: 0,
      donutWidth: 8,
      donut: true,
      total: [100]
    });

    if(chartValue <= 25) {
      $(selector).addClass('value-tiny');
    } else if (chartValue <= 50) {
      $(selector).addClass('value-low');
    } else if (chartValue <= 75) {
      $(selector).addClass('value-med');
    } else {
      $(selector).addClass('value-high');
    }

    this.donutDraw(chartNew);
  },

  donutDraw : function (chart) {
    chart.on('draw', function(data) {

      if(data.type === 'label') {

        if(data.index === 0) {

          var xCenter = data.element.root().width() / 2;
          var yCenter = data.element.root().height() / 2;

          data.element.attr({
            dx: xCenter,
            dy: yCenter
          });

          var text = new Chartist.Svg('text', {
            dx: xCenter + (data.element.width()/2),
            dy: yCenter,
            'text-anchor': 'middle',
          }, 'ct-label--post').text('%');

          data.group.append(text);

          var outerPadding = 4;
          var circle = new Chartist.Svg('circle', {
            cx: xCenter,
            cy: [yCenter],
            r: xCenter - outerPadding,
            fill: 'none',
            stroke: '#262729',
            'stroke-width': 8,
            'ct:meta': data.meta,
          });

          data.element.root().append(circle, true);
        }
      }
    });
  }
}

window.donuts = donuts;