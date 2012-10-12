var ONE_DAY = 24 * 60 * 60 * 1000;

function getStartDate() {
	var svgDoc = document.getElementById('calendar').contentDocument;
	var startDate = svgDoc.getElementById('startDate').childNodes[0].nodeValue;
	
	var regexp=/^([A-z]{3})[-|\.\/ ]{1}([0-1][0-9]){0,1}[-|\.\/ ]{0,1}(\d{2,4})$/;
	regexp.test(startDate);

	var month = RegExp.$1;
	var day = RegExp.$2;
	var year = RegExp.$3;

	if (!day) {
		day = '01';
	}

	var dateStr = year + '/' + month + '/' + day;
	return new Date(dateStr);
}
	
function getPreviousSat() {
	var currDate = new Date();
	currDate.setMinutes(0);
	currDate.setHours(0);
	currDate.setSeconds(0);
	var dayOfWeek = currDate.getDay();
	var dayDiff = dayOfWeek + 1;
	var lastSatDate = new Date(currDate.getTime() - dayDiff * ONE_DAY);
	return lastSatDate;
}

function getDaysDiff(startDate, targetDate) {
	var days = targetDate - startDate;
	return Math.round(days/ONE_DAY);
}

function scrollToLastSat() {
	//alert('adfasdf');
	var date = getStartDate();
	var lstSat = getPreviousSat();
	var daysDiff = getDaysDiff(date, lstSat);

	var utilsObj = document.getElementById("utils");
	utilsObj.scrollLeft = daysDiff * 22;
	var calendarObj = document.getElementById("calendar");
	calendarObj.scrollLeft = daysDiff * 22;
}