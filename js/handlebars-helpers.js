Handlebars.registerHelper('friendlyName', function(name) {
	return new Handlebars.SafeString(
		String(name).replace(/GNV/,'').replace(/Conf/,'')
	);
});
Handlebars.registerHelper('friendlyTime', function(startTime) {
	return new Handlebars.SafeString(
		moment(startTime).format('LT').toLowerCase()
	);
});