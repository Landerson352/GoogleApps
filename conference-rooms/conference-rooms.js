var startHour = 8.5;
var endHour = 17.5;
var rooms = ['ChromeConf', 'FirefoxConf', 'SafariConf','ExplorerConf','GNVSeamonkeyConf','GNVSilkConf'];

Handlebars.registerHelper('barStyle', function(calendar, event) {
	var startDate = new Date(event.startTime);
	var endDate = new Date(event.endTime);
	var left = (startDate.getHours() + startDate.getMinutes()/60 - startHour) * (endHour - startHour);
	var width = (endDate.getHours() + endDate.getMinutes()/60 - startHour) * (endHour - startHour) - left;
	console.log(left);
	return new Handlebars.SafeString(
		'background-color:' + calendar.color + ';' +
		'left:' + left + '%;' + 
		'width:' + width + '%'
	);
});

function display(_data, _templateHtml) {
	var data = {
		calendars: _.map(rooms, function(room){
			return _.find(_data.calendars, { name: room });
		})
	};
	var template = Handlebars.compile(_templateHtml);
	$('.js-content').html(template(data));
}

Promise.all([
	$.get('https://script.google.com/macros/s/AKfycbyQIq-rdnnQidIkagf2CZGyNiFpnDN3Sqfxq5ndt7twuEN6ptc/exec'),
	$.get('template.html')
]).done(function(values) {
	display(values[0], values[1]);
});
