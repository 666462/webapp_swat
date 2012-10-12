Raphael.fn.pieChart = function (cx, cy, r, values, colors) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
	var paths = this.set();
	var opt = this.set();
	var top_opt = this.set();
	var defaultText = "ALL";
	
	var total = 90;
	
	this.customAttributes.segment = function (x, y, r, a1, a2, params) {
		var flag = (a2 - a1) > 180,
			clr = (a2 - a1) / 360;
		a1 = (a1 % 360) * Math.PI / 180;
		a2 = (a2 % 360) * Math.PI / 180;
		
		return {
            path: [["M", x, y], ["l", r * Math.cos(a1), r * Math.sin(a1)], ["A", r, r, 0, +flag, 1, x + r * Math.cos(a2), y + r * Math.sin(a2)], ["z"]],
            "stroke-width": "0",
            "stroke-opacity": "0"
        };

	};
	
	function sector(cx, cy, r, startAngle, endAngle, params) {
		return paper.path().attr({segment: [cx, cy, r, startAngle, endAngle]}).attr(params);
    }
	
    var angle = 0,
        process = function (j) {
            var angleplus = values[j],
				color = colors[j],				
                ms = 500,
                delta = 30,
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: color});
			opt.push(p);
            angle += angleplus;
            chart.push(p);
        };
		var angle2 = 0;
		process2 = function (j) {
            var angleplus = values[j],
				color = colors[j],				
                ms = 500,
                delta = 30,
                p = sector(cx, cy, r, angle2, angle2 + angleplus, {fill: color, "fill-opacity": 0});
				
			top_opt.push(p);
			top_opt[j].hover(function () {				
                top_opt[j].stop().animate({transform: "s1.5 1.5 " + cx + " " + cy}, ms, "elastic");
                opt[j].stop().animate({transform: "s1.5 1.5 " + cx + " " + cy}, ms, "elastic");
				switch(j){
						case 0:
							title.attr({ text: "ALL" }).toFront();	  	
							break;
						case 1:
							title.attr({ text: "DEV" }).toFront();	  	
							break;
						case 2:
							title.attr({ text: "QA" }).toFront();	  	
							break;
						case 3:
							title.attr({ text: "BSA" }).toFront();	  	
							break;
						case 4:
							title.attr({ text: "SP" }).toFront();	  	
							break;
					}
				top_opt.toFront();
            },function () {
				title.attr({ text: defaultText }).toFront();
				top_opt[j].stop().animate({transform: ""}, ms, "elastic");
				opt[j].stop().animate({transform: ""}, ms, "elastic");
            });
			top_opt[j].click(function () {
				changeTeam(j);
				mask.remove();
				mask = opt[j].clone();
				mask.animate({"fill-opacity": 1});
				switch(j){
						case 0:
							defaultText = "ALL";	  	
							break;
						case 1:
							defaultText = "DEV";
							// title.attr({ text: "DEV" }).toFront();	  	
							break;
						case 2:
							defaultText = "QA";
							// title.attr({ text: "QA" }).toFront();	  	
							break;
						case 3:
							defaultText = "BSA";
							// title.attr({ text: "BSA" }).toFront();	  	
							break;
						case 4:
							defaultText = "SP";
							// title.attr({ text: "SP" }).toFront();	  	
							break;
					}
				title.attr({ text: defaultText }).toFront();
				mask.animate({segment: [cx, cy, r, 0, 90]}, ms, "bounce", function(){					
					this.stop().animate({transform: "s0.92 0.92 " + cx + " " + cy}, ms, "elastic");
					top_opt.toFront();
				});
			})
            angle2 += angleplus;
            chart.push(p);
            //chart.push(txt);
            //start += .1;
        };
		
	var ii = values.length;
    for (i = 0; i < ii; i++) {
        process(i);
    }
    mask = sector(cx, cy, r-5, 0, 90, {fill: "#C03904", "stroke-width": 0});
	for (i = 0; i < ii; i++) {
        process2(i);
    }
	chart.push(mask);
	
	var title = paper.text(25, 20, defaultText).attr({
			font: '24px BritannicBold',
			fill: '#0B1119',
		}).toFront(); 
	
    return chart;
};

$(function () {
    var values = [18,18,18,18,18];
	//var values = [];
        //labels = [];
	var color = "#C03904",
		ctrlColor = "#C03904",
		devColor = "#F23890",
		qaColor = "#FEBE00",
		bsaColor = "#30C1E3",
		spColor = "#B2D511";
	var colors = ["#C03904","#F23890","#FEBE00","#30C1E3","#B2D511"];
	
    Raphael("diagram", 200, 200).pieChart(0, 0, 65, values, colors);
});
