var data;
var startHour = 8;
var endHour = 18;
var rooms = ['ChromeConf', 'FirefoxConf', 'SafariConf','ExplorerConf','GNVSeamonkeyConf','GNVSilkConf'];

Handlebars.registerHelper('barStyle', function(calendar, event) {
	var startDate = new Date(event.startTime);
	var endDate = new Date(event.endTime);
	var left = (startDate.getHours() + startDate.getMinutes()/60 - startHour) * (endHour - startHour);
	var width = (endDate.getHours() + endDate.getMinutes()/60 - startHour) * (endHour - startHour) - left;
	return new Handlebars.SafeString(
		'background-color:' + calendar.color + ';' +
		'left:' + left + '%;' + 
		'width:' + width + '%'
	);
});

function showNextEvent() {
	if(data && data.current) {
		var currentCalendar = _.find(data.calendars, { name: data.current });
		if(currentCalendar) {
			var nextEvent = _.find(currentCalendar.events, function(event){
				return new Date().getTime() < new Date(event.startTime).getTime();
			});
			if(nextEvent) {
				var ct = getTimeRemaining(nextEvent.startTime);
				//var ct = moment(nextEvent.startTime, 'LT').fromNow();
				var cts = [
					pad(ct.hours, 2), 
					pad(ct.minutes, 2), 
					pad(ct.seconds, 2)
				].join(':');
				$('.js-nextevent').html('Next event: <b>' + nextEvent.title + '</b> starts in ' + cts);
			}
		}
	}
	setTimeout(showNextEvent, 200);
}
showNextEvent();

function display(_data, _templateHtml) {
	data = {
		current: window.location.href.split('?')[1],
		calendars: _.map(rooms, function(room){
			return _.find(_data.calendars, { name: room });
		})
	};
	var template = Handlebars.compile(_templateHtml);
	$('.js-content').html(template(data));
}

Promise.all([
	$.get('https://script.google.com/macros/s/AKfycbyQIq-rdnnQidIkagf2CZGyNiFpnDN3Sqfxq5ndt7twuEN6ptc/exec'),
	$.get('template.html?'+Math.floor(Math.random()*100000))
]).done(function(values) {
	display(values[0], values[1]);
});
