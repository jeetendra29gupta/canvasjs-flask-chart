document.getElementById('simple-column-chart-with-index-labels').onclick = function () {
  fetch('/api/fruits')
    .then(response => response.json())
    .then(data => {
      var dataPoints = [];
      var maxPrice = -Infinity;
      var minPrice = Infinity;
      var maxIndex = -1;
      var minIndex = -1;

      for (var fruit in data) {
        var price = data[fruit];
        dataPoints.push({
          label: fruit,
          y: price
        });

        if (price > maxPrice) {
          maxPrice = price;
          maxIndex = dataPoints.length - 1;
        }
        if (price < minPrice) {
          minPrice = price;
          minIndex = dataPoints.length - 1;
        }
      }

      if (maxIndex !== -1) {
        dataPoints[maxIndex].indexLabel = "▲ Highest  ▲";
      }
      if (minIndex !== -1) {
        dataPoints[minIndex].indexLabel = "▼ Lowest ▼";
      }
      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1",
        backgroundColor: "#fdf5e6",
        title: {
          text: "Simple Column Chart with Index Labels"
        },
        axisY: {
          includeZero: true
        },
        data: [{
          type: "column",
          indexLabelFontColor: "#5A5757",
          indexLabelFontSize: 16,
          indexLabelPlacement: "outside",
          dataPoints: dataPoints
        }]
      });
      chart.render();
    })
    .catch(error => {
      console.error('Error fetching the fruits data:', error);
    });
};


document.getElementById('multi-series-chart').onclick = function () {
  fetch('/api/usage')
    .then(response => response.json())
    .then(data => {
      var cpuDataPoints = data.cpu_usage.map(item => ({
        label: item.date,
        y: item.usage
      }));
      var memoryDataPoints = data.memory_usage.map(item => ({
        label: item.date,
        y: item.usage
      }));
      var networkDataPoints = data.network_usage.map(item => ({
        label: item.date,
        y: item.usage
      }));

      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1",
        backgroundColor: "#fdf5e6",
        title: {
          text: "Multi Series Chart"
        },
        axisY: {
          includeZero: true
        },
        legend: {
          cursor: "pointer",
          fontSize: 16,
          itemclick: toggleDataSeries
        },
        toolTip: {
          shared: true
        },
        data: [{
            type: "line",
            name: "CPU Usage",
            showInLegend: true,
            dataPoints: cpuDataPoints
          },
          {
            type: "line",
            name: "Memory Usage",
            showInLegend: true,
            dataPoints: memoryDataPoints
          },
          {
            type: "line",
            name: "Network Usage",
            showInLegend: true,
            dataPoints: networkDataPoints
          }
        ]
      });
      chart.render();

      function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        chart.render();
      }
    })
    .catch(error => {
      console.error('Error fetching the usage data:', error);
    });
};

document.getElementById('animated-pie-chart').onclick = function () {
  fetch('/api/browser-market-share')
    .then(response => response.json())
    .then(data => {
      var dataPoints = data.browsers.map(item => ({
        label: item.name,
        y: item.share
      }));

      var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1",
        backgroundColor: "#fdf5e6",
        title: {
          text: "Browser Market Share"
        },
        data: [{
          type: "pie",
          startAngle: 240,
          yValueFormatString: "##0.00\"%\"",
          indexLabel: "{label} {y}",
          dataPoints: dataPoints
        }]
      });
      chart.render();
    })
    .catch(error => {
      console.error('Error fetching the browser market share data:', error);
    });
};

document.getElementById('weekly-weather-forecast').onclick = function () {
  fetch('/api/weather-forecast')
    .then(response => response.json())
    .then(data => {
      var dataPoints = data.forecast.map(item => ({
        label: item.day,
        y: [item.min_temp, item.max_temp],
        name: item.condition
      }));

      var chart = new CanvasJS.Chart("chartContainer", {
        title: {
          text: "Weekly Weather Forecast"
        },
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1",
        backgroundColor: "#fdf5e6",
        axisY: {
          suffix: " °C",
          maximum: 40,
          gridThickness: 0
        },
        toolTip: {
          shared: true,
          content: "{name} </br> <strong>Temperature: </strong> </br> Min: {y[0]} °C, Max: {y[1]} °C"
        },
        data: [{
          type: "rangeSplineArea",
          fillOpacity: 0.1,
          color: "#91AAB1",
          indexLabelFormatter: formatter,
          dataPoints: dataPoints
        }]
      });
      chart.render();
    })
    .catch(error => {
      console.error('Error fetching the weather forecast data:', error);
    });
};

function formatter(e) {
  if (e.index === 0 && e.dataPoint.x === 0) {
    return " Min " + e.dataPoint.y[e.index] + "°" + "(" + e.dataPoint.name + ")";
  } else if (e.index == 1 && e.dataPoint.x === 0) {
    return " Max " + e.dataPoint.y[e.index] + "°" + "(" + e.dataPoint.name + ")";
  } else {
    return e.dataPoint.y[e.index] + "°" + "(" + e.dataPoint.name + ")";
  }
}