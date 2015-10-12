var SelectorScript = {

	canReturnMultipleRecords: function () {
		return false;
	},

	canHaveChildSelectors: function () {
		return true;
	},

	canHaveLocalChildSelectors: function () {
		return true;
	},

	canCreateNewJobs: function () {
		return true;
	},
	willReturnElements: function () {
		return true;
	},
	getScript: function() {

		if(this.scriptSelector  === undefined) {
			return 'console.log("No script provided")';
		}
		else {
			return this.scriptSelector;
		}
	},

	_getData: function (parentElement) {

		var dfd = $.Deferred();

		var delay = parseInt(this.delay) || 0;
		var yourCustomJavaScriptCode = this.getScript();
		var script = document.createElement('script');
		var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
		script.appendChild(code);
		(document.body || document.head).appendChild(script);
		var elements = this.getDataElements(parentElement);
		setTimeout(function(){ dfd.resolve(jQuery.makeArray(elements)); }, delay);

		return dfd.promise();
	},

	getDataColumns: function () {
		return [];
	},

	getFeatures: function () {
		return ['delay', 'scriptSelector']
	}
};
