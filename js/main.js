// JavaScript Document
var Calendar, AsOfDate, nameCount;
var Utility_dev, Utility_qa, Utility_bsa, Utility_sp, Utility_all;
var name_dev_html, name_qa_html, name_bsa_html, name_sp_html, name_all_html;
var ie = (function () {
    var undef, v = 3, div = document.createElement('div');

    while (
        div.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->',
        div.getElementsByTagName('i')[0]
    );
    return v > 4 ? v : undef;
}());

window.addEventListener('SVGLoad', function() {
	$('#gantt').css('background','none');
}, false)

function changeTeam(index) {
	//alert(index);	
	switch(index){
		case 0:
			fillUtils(Utility_all);
			fillNameTable(name_all_html);	  	
		  break;
		case 1:	
			fillUtils(Utility_dev);
			fillNameTable(name_dev_html);
		  break;
		case 2:
			fillUtils(Utility_qa);
			fillNameTable(name_qa_html);
		  break;
		case 3:
			fillUtils(Utility_bsa);
			fillNameTable(name_bsa_html);
		  break;
		case 4:
			fillUtils(Utility_sp);
			fillNameTable(name_sp_html);;
		default:
		  //code to be executed if n is different from case 1 and 2
		  break;
	}
	document.getElementById('utils').scrollTop = 0;
	utilScroll();
}

var ipad = (function y_ipad(){
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
}())


function fillNameTable(nameData){
	$('#resource .name').html(nameData);
	nameCount = $('tr').length;
	if(ipad) {
		if(nameCount > 24)	$('tr:last-child').remove();
	} else {
	//nameCount = $('tr').length;
//	$('.name').height(nameCount*22-6);
		if(nameCount > 24) $('tr:last-child td').css({'height': '16px', 'border-bottom': 'none'});
	}
}

function fillUtils(utilData) {
	$('#resource .utils').html(utilData);
	//scrollToLastSat();
}

function fillNameTable2(nameData){
	$('#project .name').html(nameData);
	nameCount = $('tr').length;
	if(ipad) {
		if(nameCount > 24)	$('tr:last-child').remove();
	} else {
	//nameCount = $('tr').length;
//	$('.name').height(nameCount*22-6);
		if(nameCount > 24) $('tr:last-child td').css({'height': '16px', 'border-bottom': 'none'});
	}
}

function fillUtils2(utilData) {
	$('#project .utils').html(utilData);
	//scrollToLastSat();
}

$(function(){ 
	if ( ie < 9 ) {
	   //$('#gantt').children().css('visibility', 'hidden');
	   $('#gantt').css('background','url("images/loading_icon.gif") no-repeat scroll 100px 150px #FFFFFF');
	}
	$.ajax({
	  url: 'data/name_dev.html',
	  success: function(data) {
		name_dev_html = data;
	  }
	});
	$.ajax({
	  url: 'data/name_qa.html',
	  success: function(data) {
		name_qa_html = data;
	  }
	});
	$.ajax({
	  url: 'data/name_bsa.html',
	  success: function(data) {
		name_bsa_html = data;
	  }
	});
	$.ajax({
	  url: 'data/name_sp.html',
	  success: function(data) {
		name_sp_html = data;
	  }
	});
	$.ajax({
	  url: 'data/name_all.html',
	  success: function(data) {
		name_all_html = data;
		fillNameTable(name_all_html);
		fillNameTable2(name_all_html);
	  }
	});
	$.ajax({
	  url: 'svg/CalendarHeader.xml',
	  dataType: 'text',
	  success: function(data) {
		Calendar = data;
		$('.calendar').html(Calendar);
	  }
	});
	$.ajax({
	  url: 'svg/Utility_dev.xml',
	  dataType: 'text',
	  success: function(data) {
		Utility_dev = data;
	  }
	});
	$.ajax({
	  url: 'svg/Utility_qa.xml',
	  dataType: 'text',
	  success: function(data) {
		Utility_qa = data;
	  }
	});
	$.ajax({
	  url: 'svg/Utility_bsa.xml',
	  dataType: 'text',
	  success: function(data) {
		Utility_bsa = data;
	  }
	});
	$.ajax({
	  url: 'svg/Utility_sp.xml',
	  dataType: 'text',
	  success: function(data) {
		Utility_sp = data;		
	  }
	});
	$.ajax({
	  url: 'svg/Utility_all.xml',
	  dataType: 'text',
	  success: function(data) {
		Utility_all = data;
		fillUtils(Utility_all);
		fillUtils2(Utility_all);
	  }
	});
	$.ajax({
	  url: 'svg/AsOfDate.xml',
	  dataType: 'text',
	  success: function(data) {
		AsOfDate = data;
		$('.asofdate').html(AsOfDate);
	  }
	});
	if (ipad) {
		$("head").append('<script type="text/javascript" src="js/control.js"></script>');
	} else {
		$("head").append('<script type="text/javascript" src="js/control_pc.js"></script>');
	}
	//if(ipad){
		//$('.slideBtn').css('visibility', 'visible');
	//}
	
	$('#resource .slideBtn').click(function(e){	
		//alert($('#resource').width());
		e.preventDefault();
		if($(this).hasClass('open')){
			$('.content').not('#resource').fadeOut(function() {
				$('#resource #gantt').css('visibility', 'visible');
				$('#resource .slideBtnWrapper').addClass('line');				
				$('#resource .section_right').animate({
					width: "739px",
				}, 300, 'swing',function() {
					$('#resource .slideBtn').removeClass('open').addClass('close');
					
				});
			});			
		} else if($(this).hasClass('close')){		
			$('#resource .section_right').animate({
				width: "1px",
			}, 300, 'swing', function() {
				$('#resource #gantt').css('visibility', 'hidden');
				$('#resource .slideBtnWrapper').removeClass('line');
				$('#resource .slideBtn').removeClass('close').addClass('open');
				$('.content').not('#resource').fadeIn(
				300, function() {
				})
			});
		}		
	})
	
	$('#project .slideBtn').click(function(e){
		e.preventDefault();
		if($(this).hasClass('open')){				
			$('.content').not('#project').fadeOut(
			300, function() {
				$('#project').animate({
					left: "0px"
				},300, 'swing',function() {
					$('#project #gantt').css('visibility', 'visible');
					$('#project .slideBtnWrapper').addClass('line');				
					$('#project .section_right').animate({
						width: "739px",
					}, 300, 'swing',function() {
						$('#project .slideBtn').removeClass('open').addClass('close');
						
					});
				})
				
			});			
		} else if($(this).hasClass('close')){		
			$('#project .section_right').animate({
				width: "1px",
			}, 300, 'swing', function() {
				$('#project #gantt').css('visibility', 'hidden');
				$('#project .slideBtnWrapper').removeClass('line');
				$('#project .slideBtn').removeClass('close').addClass('open');
				$('#project').animate({
					left: "337px"
				},300, 'swing',function() {					
					$('.content').not('#project').fadeIn(
					300, function() {					
					})
				})				
			});		
		}		
	})
		
	var utilsScroll = false, namesScroll = false;
	
	$(".utils").scroll(function(e){
		utilsScroll = false;
		if(namesScroll == false) {
			utilsScroll = true;
			utilScroll();
		}		
		namesScroll = false;
	})
	
	$(".nameTable").scroll(function(e){
		namesScroll = false;
		if(utilsScroll == false) {
			namesScroll = true;
			nameScroll();
		}
		utilsScroll = false
		
	})	
	
	/* $('.navi a').click(function(e){
		e.preventDefault();
		if($(this).hasClass('current')){
			$($(this).attr('href')+' .slideBtn.close').trigger('click');
			$(this).removeClass('current');
		} else {
			//$($(this).attr('href')).siblings('.content').find('.close').trigger('click');
			$($(this).attr('href')+' .slideBtn.open').trigger('click');
			$(this).addClass('current').siblings().removeClass('current');
		}		
	}) */
});

function nameScroll() {
	var scrollMax = 611;
	if(document.getElementById('nameTable').scrollTop <= scrollMax)document.getElementById('utils').scrollTop = document.getElementById('nameTable').scrollTop; else document.getElementById('nameTable').scrollTop = scrollMax;
}

function utilScroll() {
	document.getElementById('calendar').scrollLeft =document.getElementById('utils').scrollLeft; document.getElementById('nameTable').scrollTop = document.getElementById('utils').scrollTop;
}