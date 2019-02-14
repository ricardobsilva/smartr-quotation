$( document ).ready(function() {

	var numberOfDays = 7;
	var baseCurrency = 'BRL';

	var currencyUsDollar = $("#usDollar");
	var currencyAudDollar = $("#audDollar");
	var currencyReal = $("#real");
	var currencyEuro = $("#euro");

	var oneWeek = $("#oneWeek");
	var oneMonth = $("#oneMonth");
	var oneYear = $("#oneYear");

	currencyUsDollar.on('click', function(){
		baseCurrency = currencyUsDollar.val();
		requestDates(numberOfDays, baseCurrency);
	});

	currencyAudDollar.on('click', function(){
		baseCurrency = currencyAudDollar.val();
		requestDates(numberOfDays, baseCurrency);
	});

	currencyReal.on('click', function(){
		baseCurrency = currencyReal.val();
		requestDates(numberOfDays, baseCurrency);
	});

	requestDates(numberOfDays, baseCurrency);

	currencyEuro.on('click', function(){
		baseCurrency = currencyEuro.val();
		requestDates(numberOfDays, baseCurrency);
	});

	oneWeek.on('click', function(){
		numberOfDays = oneWeek.val();
		requestDates(numberOfDays, baseCurrency);
	});

	oneMonth.on('click', function(){
		numberOfDays = oneMonth.val();
		requestDates(numberOfDays, baseCurrency);
	});

	oneYear.on('click', function(){
		numberOfDays = oneYear.val();
		requestDates(numberOfDays, baseCurrency);
	});

	function requestDates(numberOfDays, baseCurrency){
		$.ajax({url: "/quotations/historic_rates?number_of_days="+ numberOfDays +"&base_currency=" + baseCurrency,
						success: function(response){

			var firstCurrencyValue = [];
			var secondCurrencyValue = [];
			var thirdCurrencyValue = [];

			var legendFirstCurrencyValue;
			var legendSecondCurrencyValue;
			var legendThirdCurrencyValue;


			response.map(function(element){
				firstCurrencyValue.push({x: new Date(element.date), y: parseFloat(Object.values(element)[0].toFixed(3))});
				secondCurrencyValue.push({x: new Date(element.date), y: parseFloat(Object.values(element)[1].toFixed(3))});
				thirdCurrencyValue.push({x: new Date(element.date), y: parseFloat(Object.values(element)[2].toFixed(3))});

				legendFirstCurrencyValue = Object.keys(element)[0];
				legendSecondCurrencyValue = Object.keys(element)[1];
				legendThirdCurrencyValue = Object.keys(element)[2];
			})


			var options = {
				animationEnabled: true,
				zoomEnabled: true,
				theme: "light2",
				title:{
					text: "Compared " + baseCurrency + " with"
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
					name: legendFirstCurrencyValue,
					markerType: "circle",
					legendText: legendFirstCurrencyValue,
					xValueFormatString: "DD MMM, YYYY",
					color: "#00FA9A",
					yValueFormatString: "",
					dataPoints:
							firstCurrencyValue
				},
				{
					type: "line",
					showInLegend: true,
					name: legendSecondCurrencyValue,
					markerType: "circle",
					legendText: legendSecondCurrencyValue,
					xValueFormatString: "DD MMM, YYYY",
					color: "#F08080",
					yValueFormatString: "",
					dataPoints:
							secondCurrencyValue
				},
				{
					type: "line",
					showInLegend: true,
					name: legendThirdCurrencyValue,
					markerType: "circle",
					legendText: legendThirdCurrencyValue,
					xValueFormatString: "DD MMM, YYYY",
					color: "#FFD700",
					yValueFormatString: "",
					dataPoints:
							thirdCurrencyValue
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
