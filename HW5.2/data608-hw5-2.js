Plotly.d3.csv('https://raw.githubusercontent.com/sbiguzzi/data608/main/HW5/presidents.csv', function(rows) {
	function unpack(rows, key) {
		return rows.map(function(row) { return row[key]; });
	}
	
	let pres = []
	rows.forEach(function(d) {
		if (!pres.includes(d['Name'])) {
		  pres.push(d['Name']);
		}
	});
	
	Plotly.d3
		.select('#pres-selector')
		.selectAll('option')
		.data(pres)
		.enter()
		.append('option')
		.text(function(d) {
		  return d;
		})
		.attr('value', function(d) {
		  return d;
		});
	
	
	
	function createTable(pres){
		// let headerNames = d3.keys(rows[0]);
		let headerValues = ['President Name','Height','Weight'];
		let cellValues = [];
		
		rows.forEach(function(d){
			if (d['Name']==pres){
				cellValues.push(d['Name'])
				cellValues.push(d['Height']+' in')
				cellValues.push(d['Weight']+' lbs')
			}
		});
		
		let data = [{
			type:'table',
			columnwidth: [250,100,100],
			columnorder: [0,1,2],
			header: {
				values: headerValues,
				align: "center",
				height: 35,
				line: {width: 1, color: 'rgb(50, 50, 50)'},
				fill: {color: ['rgb(0, 109, 119)']},
				font: {family: "Arial", size: 24, color: "white"}
			},
			cells: {
				values: cellValues,
				align: ["center", "center"],
				height: 30,
				line: {color: "black", width: 1},
				fill: {color: ['rgba(131, 197, 190, 0.5)']},
				font: {family: "Arial", size: 16, color: ["black"]}
			}		
		}]
			
		return {
			data: data,
			layout: {
				title: pres+" height and weight"
			}
		};
	}
		
	// get table div
	myTable = document.getElementById('table');
	
	// Plot initial table
	Plotly.newPlot(myTable, createTable('Washington'));
	
	// Update table when dropdown is triggered
	Plotly.d3.select('#pres-selector').on('change', function() {
		let fig = createTable(Plotly.d3.event.target.value);
		Plotly.react(myTable, fig);
	});	
});
