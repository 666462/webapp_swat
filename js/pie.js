Raphael.fn.pie = function (cx, cy, r, values, avalues, piecolor, labels, stroke) {
	var paper = this,
		rad = Math.PI / 180,
		ms = 500;
		pieBaseSet = this.set(),
		pieTipSet = [],
		pieHoverSet = this.set(),
		pieLegend = this.set(),
		chart = this.set();
		
		
    function sector(cx, cy, r, startAngle, endAngle, params) {
		var x1 = cx + r * Math.cos(-startAngle * rad),
			x2 = cx + r * Math.cos(-endAngle * rad),
			y1 = cy + r * Math.sin(-startAngle * rad),
			y2 = cy + r * Math.sin(-endAngle * rad);
		return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
             
    var angle = -90,
		angleStart,
		angles = [],
        pie_base = function (j) {
			angleStart = 180 * values[0] / total;
			angles[j] = angle + 90;
        	var angleplus = 360 * values[j] / total,           
				color = piecolor[j],         
                p = sector(cx, cy, r, angle - angleStart, angle - angleStart + angleplus, {fill: color, stroke: stroke, "stroke-width": stroke_width});
                		 	
            angle += angleplus;
            pieBaseSet.push(p);
            chart.push(p);			
        }
        
    var angle_tip = 0,
        pie_tip = function (j) {
        	var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle_tip + (angleplus / 2),
                
				color = piecolor[j],
				
                ms = 500,
				lineheight = 15,
				overlay_x = cx + (r/2 * 1.1) * Math.cos(-popangle * rad),
				overlay_y = cy + (r/2 * 1.1) * Math.sin(-popangle * rad),
                
                dot = paper.circle(overlay_x, overlay_y, 3).attr({fill: "none", stroke: "#fff", opacity: 0, "stroke-width": 2}),
				txt = paper.text(overlay_x, overlay_y,  labels[j]).attr({fill: "#000", stroke: "none", opacity: 0, "font-size": 12, "font-weight": "bold"}),
				num = paper.text(overlay_x, overlay_y + lineheight,  avalues[j]).attr({fill: "#000", stroke: "none", opacity: 0, "font-size": 12, "font-style": "italic"});
		 	
		 	var box_width = txt.getBBox().width,
				box_height = txt.getBBox().height + num.getBBox().height,				
				box = paper.rect(overlay_x - box_width - box_padding*2 - box_distance, overlay_y - txt.getBBox().height/2 - box_padding, box_width + box_padding*2, box_height + box_padding*2, 2).attr({fill: "#fff", stroke: color, opacity: 0, "fill-opacity": 0.65, "font-size": 12, "stroke-width": 1, "stroke-opacity": 1});
				
				txt.attr('x', overlay_x - box_width/2 - box_padding - box_distance).toFront();
				num.attr('x', overlay_x - box_width/2 - box_padding - box_distance).toFront();
			
			angle_tip += angleplus;
			pieTipSet[i] = paper.set().push(
				box, dot, txt, num
			);						        
            
            chart.push(pieTipSet[i]);
						
        }
		
    var pieMask;
    var pie_mask = function(){
    	pieMask = paper.image("images/pie_mask.png", 0, 0, 246, 246),
		handle = paper.circle(123,123,123).attr({
			fill: "#ffffff",
			opacity: 0,
			cursor: "pointer",
			"stroke-width": 10,
			stroke: "transparent"
		});
		//chart.push(pieMask);
		//chart.push(handle);
    }
        
    var angle_hover = 0,
        pie_hover = function (j) {
        	var angleplus = 360 * values[j] / total,           
				color = piecolor[j],				
                ms = 500,                
                p = sector(cx, cy, r, angle_hover, angle_hover + angleplus, {fill: color, opacity: 0, stroke: stroke, "stroke-width": stroke_width});
                		 	
            angle_hover += angleplus;
            pieHoverSet.push(p);
            chart.push(p);	
            
            pieHoverSet[j].hover(function () {				
                //pieBaseSet[j].stop().animate({transform: "s1.2 1.2 " + cx + " " + cy}, ms, "elastic");
                //pieHoverSet[j].stop().animate({transform: "s1.2 1.2 " + cx + " " + cy}, ms, "elastic");
				pieTipSet[j].attr({opacity: 1});
            },function () {
				//pieBaseSet[j].stop().animate({transform: ""}, ms, "elastic");
				//pieHoverSet[j].stop().animate({transform: ""}, ms, "elastic");
				pieTipSet[j].attr({opacity:0});
            });
        }
    
    
    var angle_legend,
        pie_legend = function (j) {
        	var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle_legend + (angleplus / 2),
           		  
				color = piecolor[j],
				
                ms = 0,
				lineheight = 15;
                            
            angle_legend += angleplus;
			var	box = paper.rect(cx-r, cy*2-5 + legend_lineheight*(j+1), legend_width, legend_width, 0).attr({fill: piecolor[j], stroke: "none", opacity: 1, "fill-opacity": 1, "stroke-width": 0});
			
			var fake_text = paper.text(cx-r+20, cy*2 + legend_lineheight*(j+1),  labels[j]).attr({fill: "#000", stroke: "none", opacity: 0, "font-size": 12, "font-weight": "bold"});
			var box_width = fake_text.getBBox().width;
			fake_text.remove()
			
			var text = paper.text(cx-r+20 + box_width/2, cy*2 + legend_lineheight*(j+1),  labels[j]).attr({fill: "#000", stroke: "none", opacity: 1, "font-size": 12, "font-weight": "bold"});
			pieLegend.push(box);
			chart.push(pieLegend);
			
        }
    
	var angleChange,
		angleTo = 0;
	var teamNum = -1;
	var angle1, angle2;
	var start = function (x, y, event) {
				var posx = (event.pageX - $('#pie').offset().left)-cx + 0.5;
				var posy = (event.pageY - $('#pie').offset().top)-cy;
				angle1 = Math.atan2 (posy, posx) * 180/Math.PI;
			},
			move = function (dx, dy, x, y, event) {				
				var	posx2 = (event.pageX - $('#pie').offset().left)-cx + 0.5 + dx,
					posy2 = (event.pageY - $('#pie').offset().top)-cy + dy;
					angle2 = Math.atan2 (posy2, posx2) * 180/Math.PI;
				//$('#console').append(dx + ',  ' + dy + ";" + angle2 + ',  ' + angle1 + "<br/>");
				if (angle2>90 && angle2<181 && angle>-181 && angle-90){
					angleChange = angle2 - angle1 - 360;
				} else if(angle>90&&angle<181&&angle2>-181&&angle2-90){
					angleChange = angle2 - angle1 + 360;
				} else {
					angleChange = angle2 - angle1;
				}
				angleTo += angleChange;
				angleTo %= 360;
				//chart.animate({transform: "R" + angleTo + ',' + cx + ',' + cy});
				chart.rotate(angleChange, cx, cy)
				//$('#console').append('<strong>' + angleTo + "</strong><br/>");
				angle1 = angle2;
				//alert(posy);
				//alert(angleChange);
				//chart.rotate(angleChange, cx, cy)
				//alert(angleChange);
			},
			up = function () {			
				//chart.rotate(angleChange, cx, cy)
				// pieMask.animate({transform: "r" + angleTo}, 1000, "<>");
				var angleToR = (angleTo<0)?(angleTo+360):angleTo;
				for(i=0; i < angles.length; i++){
					if(angleToR >= angles[i] && angleToR < angles[i+1]) {
						chart.animate({transform: "R" + (angles[i] + angles[i+1] - 2*angleStart)/2 + ',' + cx + ',' + cy}, 500);
					} else if (angleToR > angles[angles.length-1]) {
						chart.animate({transform: "R" + (angles[angles.length-1] + 360 - 2*angleStart)/2 + ',' + cx + ',' + cy}, 500);
					}
				}
			};	
	
    var total = 0,
    	stroke_width = 1,
		box_padding = 5,
		box_distance = 20,
		legend_width = 10,
		legend_lineheight = 20;
		
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        pie_base(i);
    }
    // for (i = 0; i < ii; i++) {
        // pie_tip(i);
    // }
    pie_mask();
	handle.drag(move, start, up); 
	handle.click(function (event) {
		var posx = (event.pageX - $('#pie').offset().left)-cx + 0.5;
		var posy = (event.pageY - $('#pie').offset().top)-cy;
			//angle = Math.atan2 (posy, posx) * 180/Math.PI;
		//alert(angle);
	})
    // for (i = 0; i < ii; i++) {
        // pie_hover(i);
    // }
    // for (i = 0; i < ii; i++) {
        // pie_legend(i);
    // }
    return chart;
};

$(function () {
	var values = [],
		labels = [],
		avalues = [],
		piecolor = ['#f23890','#30c1e3','#b2d511','#f07373','#5c5c5c','#febe00','#f23890','#30c1e3','#b2d511','#f07373'];
    	
    	
	/*var xmlhttp,
		xmlUrl = "data/ACIM_FUND_SECTOR_ALLOCATION.xml";
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET", xmlUrl, false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	$(xmlDoc).find('attribute').each(function(){
		avalues.push($("value", this).text());
		values.push(parseInt($("value", this).text(), 10));
		labels.push($("label", this).text());
	})*/
	
	$("tr").each(function () {
        values.push(parseInt($("th", this).text(), 10));
		avalues.push($("th", this).text());
        labels.push($("td", this).text());
    });
    //$("table").hide(); 
	
    Raphael("pie", 246, 246).pie(123, 123, 120, values, avalues, piecolor, labels, "#fff");
});
