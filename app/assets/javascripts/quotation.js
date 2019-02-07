$( document ).ready(function() {
	$.ajax({url: "/quotations/historic_rates", success: function(response){
    console.log(response);
    var euro = [];
		var us_dollar = [];
		var australian_dollar = [];

    for (var count in response) {
		}

		var options = {
			zoomEnabled: true,
			zoomType: "xy",
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Compared Real with"
			},
			axisX:{
			},
			axisY: {
				includeZero: true
			},
			toolTip:{
				shared:true
			},
			legend:{
				cursor:"pointer",
				verticalAlign: "bottom",
				horizontalAlign: "left",
				dockInsidePlotArea: true,
				itemclick: toogleDataSeries,
				horizontalAlign: "center",
				verticalAlign: "bottom"
			},
			data: [{
				type: "line",
				showInLegend: true,
				name: "US Dollar",
				markerType: "circle",
      	legendText: "circle",
				xValueFormatString: "DD MMM, YYYY",
				color: "#F08080",
				yValueFormatString: "",
				dataPoints:
						euro
			},
      {
        type: "line",
        showInLegend: true,
        name: "US Dollar",
        markerType: "circle",
        legendText: "circle",
        xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        yValueFormatString: "",
        dataPoints:
            us_dollar
      },
      {
        type: "line",
        showInLegend: true,
        name: "Australian Dollar",
        markerType: "circle",
        legendText: "circle",
        xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        yValueFormatString: "",
        dataPoints:
            australian_dollar
      }]
		};
		$("#chartContainer").CanvasJSChart(options);

		function toogleDataSeries(e){
			if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
				e.dataSeries.visible = false;
			} else{
				e.dataSeries.visible = true;
			}
			e.chart.render();
		}
	}});
});
