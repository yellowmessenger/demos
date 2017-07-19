(function () {
	window.addEventListener("message", function(event){
		var event = JSON.parse(event.data);
		if(event.event_code === 'custom-event'){
			var eventData = event.data.data;
			console.log(eventData);
			// window.location.assign(window.location.protocol + '//' + window.location.host + eventData.redirect_path)
		}
	}, false);
})();