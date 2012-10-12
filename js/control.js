function y_ipad(){
	var ua = navigator.userAgent.toLowerCase();
	var s;
	s = ua.match(/iPad/i);

	if(s=="ipad")
	{
	  return true;
	}
	else{
	  return false;
	}
}
var o = {
	init: function(){	
		
		
		this.fanControl();
	},
	random: function(l, u){
		return Math.floor((Math.random()*(u-l+1))+l);
	},
	fanControl: function(){
		var r = Raphael('diagram', 200, 200),
			positionX = 0,
			positionY = 0,
			
			color = "#C03904",
			ctrlColor = "#C03904",
			alColor = "#C03904",
			devColor = "#F23890",
			qaColor = "#FEBE00",
			bsaColor = "#30C1E3",
			spColor = "#B2D511",
			
			strokeWidth = 4,
			strokeWidthW = 40,
			large = 3,
			
			transparent = .75,
			
			defaultText = "ALL"
			rad = 63,
			speed = 200,
			
			selectTeam = "All",
			
			angle = 361;
			
		var ipad = y_ipad();
		
		r.customAttributes.arc = function(angle, color, rad, start){
			var v = angle,
				alpha = v == 360 ? 359.99 : v,
				a = (start-alpha) * Math.PI/180,
				b = start * Math.PI/180,
				sx = positionX + rad * Math.cos(b),
				sy = positionY - rad * Math.sin(b),
				x = positionX + rad * Math.cos(a),
				y = positionY - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
			return { path: path, stroke: color }
		}
		
		r.customAttributes.fan = function(angle, color, rad, start){
			var v = angle,
				alpha = v == 360 ? 359.99 : v,
				a = (start-alpha) * Math.PI/180,
				b = start * Math.PI/180,
				sx = positionX + rad * Math.cos(b),
				sy = positionY - rad * Math.sin(b),
				x = positionX + rad * Math.cos(a),
				y = positionY - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y], ['L', positionX, positionY], ['Z']];
			return { path: path, fill: color, stroke: color }
		}
				
		var al = r.path().attr({ arc: [18, alColor, rad, 0], 'stroke-width': strokeWidth }),
			dev = r.path().attr({ arc: [18, devColor, rad,-18], 'stroke-width': strokeWidth }),
			qa = r.path().attr({ arc: [18, qaColor, rad, -36], 'stroke-width': strokeWidth }),
			bsa = r.path().attr({ arc: [18, bsaColor, rad, -54], 'stroke-width': strokeWidth }),
			sp = r.path().attr({ arc: [18, spColor, rad, -72], 'stroke-width': strokeWidth }),
		
			control = r.path().attr({ fan: [90, color, rad, 0], 'stroke-width': 0}).toFront(),
			
			options = r.set();
			options.push(
				dev, qa, bsa, sp,al
			);
		if(ipad) {
		
		} else {
		var title = r.text(positionX + 25, positionY + 20, defaultText).attr({
			font: '24px BritannicBold',
			fill: '#0B1119',
		}).toFront(); 
			
		var	controls = r.set();
			controls.push(
				control, title
			);
		}	
		var start = function () {				
				options.animate({ 'stroke-width': strokeWidthW }, speed, 'elastic',function(){
					options.attr({ 'stroke-width': 40});
				});
			},
			move = function (dx, dy) {
			   angle = Math.atan2 (dy, dx) * 180/Math.PI;
			   if ( angle <= 18) {
					if (al.attr('stroke-width') <= strokeWidthW){
						al.animate({ 'stroke-width': strokeWidthW*large, opacity: transparent }, speed, 'elastic');
						dev.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						qa.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						bsa.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						sp.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic'); 
						if(!ipad) title.attr({ text: "ALL" });
					}
					ctrlColor = alColor;
					selectTeam = "ALL";
			   } else if (angle > 18 && angle <= 36) {
					if (dev.attr('stroke-width') <= strokeWidthW){
						dev.animate({ 'stroke-width': strokeWidthW*large, opacity: transparent }, speed, 'elastic');
						al.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						qa.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						bsa.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						sp.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic'); 
						if(!ipad) title.attr({ text: "DEV" });
					}
					ctrlColor = devColor;
					selectTeam = "DEV";
			   } else if (angle > 36 && angle <=54) {
					if (qa.attr('stroke-width') <= strokeWidthW){
						qa.animate({ 'stroke-width': strokeWidthW*large, opacity: transparent }, speed, 'elastic');
						al.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						dev.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						bsa.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						sp.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						if(!ipad) title.attr({ text: "QA" });
					}
					ctrlColor = qaColor;
					selectTeam = "QA";
			   } else if (angle > 54 && angle <=72) {
					if (bsa.attr('stroke-width') <= strokeWidthW){
						bsa.animate({ 'stroke-width': strokeWidthW*large, opacity: transparent }, speed, 'elastic');
						al.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						dev.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						qa.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						sp.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						if(!ipad) title.attr({ text: "BSA" });
					}
					ctrlColor = bsaColor;
					selectTeam = "BSA";
			   } else if (angle > 72 && angle <= 90) {
				   if (sp.attr('stroke-width') <= strokeWidthW){
						sp.animate({ 'stroke-width': strokeWidthW*large, opacity: transparent }, speed, 'elastic');
						al.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						dev.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						bsa.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						qa.animate({ 'stroke-width': strokeWidthW, opacity: 1 }, speed, 'elastic');
						if(!ipad) title.attr({ text: "SP" });
					}
					ctrlColor = spColor;
					selectTeam = "Tech Support";
			   }
			},
			up = function () {
				if (angle != 361) {
					control.animate({ 'stroke-width': strokeWidthW, stroke: ctrlColor, fill: ctrlColor}, speed, 'elastic', function(){
						options.animate({ 'stroke-width': strokeWidth, opacity: 1 }, speed, 'elastic');
						control.animate({ 'stroke-width': 0}, speed, 'elastic', function(){
							if (selectTeam == "DEV") {
								changeTeam(1);
							} else if (selectTeam == "QA") {						
								changeTeam(2);
							} else if (selectTeam == "BSA") {						
								changeTeam(3);
							} else if (selectTeam == "Tech Support") {	
								changeTeam(4);
							} else if (selectTeam == "ALL") {	
								changeTeam(0);
							}
						});
					});
				} else {
					options.animate({ 'stroke-width': strokeWidth, opacity: 1 }, speed, 'elastic');
				}
				angle = 361; 
			};	
			control.drag(move, start, up); 	
	}
}

$(function(){ 
	o.init(); 
});
