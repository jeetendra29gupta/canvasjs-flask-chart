document.getElementById('column-chart').onclick = function() {
    fetch('/api/column-chart')
        .then(response => response.json())
        .then(data => {
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
        exportEnabled: true,
        theme: "light1",
        backgroundColor: "#fdf5e6",
                title: {
                    text: "Python Column Chart"
                },
                data: [{
                    type: "column",
                    dataPoints: data
                }]
            });
            chart.render();
        })
        .catch(error => {
            console.error('Error fetching the basic chart example data:', error);
        });
};

document.getElementById('pie-chart').onclick = function() {
    fetch('/api/pie-chart')
        .then(response => response.json())
        .then(data => {
            var chart = new CanvasJS.Chart("chartContainer", {
                 animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        backgroundColor: "#fdf5e6",
                title: {
                    text: "Monthly Sales Analysis"
                },
                data: [{
                    type: "pie",
                    startAngle: -90,
                    yValueFormatString: "#,###'%'",
                    dataPoints: data
                }]
            });
            chart.render();
        })
        .catch(error => {
            console.error('Error fetching the pie chart data:', error);
        });
};

document.getElementById('line-chart').onclick = function() {
    fetch('/api/line-chart')
        .then(response => response.json())
        .then(data => {
            var user_data_2020 = data[0];
            var user_data_2021 = data[1];
//            alert(JSON.stringify(user_data_2020));
//            alert(JSON.stringify(user_data_2021));
            var chart = new CanvasJS.Chart("chartContainer", {
                 animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        backgroundColor: "#fdf5e6",
                title: {
                    text: "Website Audience Comparison"
                },
                axisX: {
                    valueFormatString: "MMM"
                },
                axisY: {
                    title: "User Count"
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    verticalAlign: "top",
                    itemclick: toggleDataSeries
                },
                data: [{
                    type: "line",
                    name: "2020",
                    showInLegend: true,
                    yValueFormatString: "#,##0",
                    dataPoints: user_data_2020
                },{
                    type: "line",
                    name: "2021",
                    showInLegend: true,
                    yValueFormatString: "#,##0",
                    dataPoints: user_data_2021
                }]
            });
            chart.render();

            function toggleDataSeries(e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }
        })
        .catch(error => {
            console.error('Error fetching the line chart data:', error);
        });
};

document.getElementById('spline-chart').onclick = function() {
    // Initial Values
    var xValue = 0;
    var yValue = 10;
    var newDataCount = 6;
    var dataPoints = [];

    var chart = new CanvasJS.Chart("chartContainer", {
       animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        backgroundColor: "#fdf5e6",
        title: {
            text: "Python Dynamic Chart"
        },
        data: [{
            type: "spline",
            dataPoints: dataPoints
        }]
    });

    updateData();

    function addData(data) {
        if (newDataCount !== 1) {
            data.forEach(function(value) {
                dataPoints.push({ x: value.x, y: parseFloat(value.y) });
                xValue++;
                yValue = parseFloat(value.y);
            });
            newDataCount = 1;
        } else {
            dataPoints.push({ x: data[0].x, y: parseFloat(data[0].y) });
            xValue++;
            yValue = parseFloat(data[0].y);
        }
        chart.render();
        setTimeout(updateData, 3000);
    }

    function updateData() {
        fetch(`/api/spline-chart?xstart=${xValue}&ystart=${yValue}&length=${newDataCount}`)
            .then(response => response.json())
            .then(addData)
            .catch(error => {
                console.error('Error fetching the spline chart data:', error);
            });
    }
};