(function() {

	var iconTranslator = {
		'explorer': 'internet-explorer',
		'seamonkey': 'leaf',
		'silk': 'strikethrough'
	}

	function friendlyName(name) {
		return String(name).replace(/GNV/,'').replace(/Conf/,'');
	}

	function friendlyTime(time) {
		return moment(time).format('LT').toLowerCase();
	}

	function iconFor(string) {
		var abbrString = friendlyName(string).toLowerCase();
		abbrString = iconTranslator[abbrString] || abbrString;
		return '<i class="fa fa-'+abbrString+'"></i>';
	}

	Handlebars.registerHelper('friendlyName', function(name) {
		return new Handlebars.SafeString(friendlyName(name));
	});
	Handlebars.registerHelper('friendlyTime', function(time) {
		return new Handlebars.SafeString(friendlyTime(time));
	});
	Handlebars.registerHelper('iconFor', function(string) {
		return new Handlebars.SafeString(iconFor(string));
	});
	Handlebars.registerHelper('times', function(n, block) {
		var accum = '';
		for(var i = 0; i < n; ++i)
			accum += block.fn(i);
		return accum;
	});
	Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
		lvalue = parseFloat(lvalue);
		rvalue = parseFloat(rvalue);
			
		return {
			"+": lvalue + rvalue,
			"-": lvalue - rvalue,
			"*": lvalue * rvalue,
			"/": lvalue / rvalue,
			"%": lvalue % rvalue
		}[operator];
	});

})();