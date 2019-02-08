$( document ).ready(function() {

	var numberOfDays = 7;
	requestDates(numberOfDays);

	$("#oneWeek").on('click', function(){
		var numberOfDays = $("#oneWeek").val();
		requestDates(numberOfDays);
	});

	$("#oneMonth").on('click', function(){
		var numberOfDays = $("#oneMonth").val();
		requestDates(numberOfDays);
	});

	$("#oneYear").on('click', function(){
		var numberOfDays = $("#oneYear").val();
		requestDates(numberOfDays);
	});

	function requestDates(numberOfDays){
		$.ajax({url: "/quotations/historic_rates?number_of_days="+ numberOfDays, success: function(response){
			var euro = [];
			var us_dollar = [];
			var australian_dollar = [];

			for (var count in response) {
				euro.push({x: new Date(response[count][0]), y: parseFloat(response[count][1]["EUR"].toFixed(4))});
				us_dollar.push({x: new Date(response[count][0]), y: parseFloat(response[count][1]["USD"].toFixed(4))});
				australian_dollar.push({x: new Date(response[count][0]), y: parseFloat(response[count][1]["AUD"].toFixed(4))});
			}

			var options = {
				animationEnabled: true,
				zoomEnabled: true,
				theme: "light2",
				title:{
					text: "Compared Real with"
				},
				axisY: {
				},
				axisX:{
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
					name: "Euro",
					markerType: "circle",
					legendText: "Euro",
					xValueFormatString: "DD MMM, YYYY",
					color: "#00FA9A",
					yValueFormatString: "",
					dataPoints:
							euro
				},
				{
					type: "line",
					showInLegend: true,
					name: "US Dollar",
					markerType: "circle",
					legendText: "US Dollar",
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
					legendText: "Australian Dollar",
					xValueFormatString: "DD MMM, YYYY",
					color: "#FFD700",
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
	}
});
