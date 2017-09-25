//	Loop
//		get Schedule
//		get CurrentTime
//		find CurrentTimeSpan
//		calculate progress
//		set current values (animate)
//		create countdown animation 

//	var currentDate = new Date();
//	var hours = timeStampString.split(':')[0];
//	var minutes = timeStampString.split(':')[1];

(function ($) {
	"use strict"

	function Bell(){
		var self = this;
		this.schedule = null;
		this.currentTime = null;

		this.getSchedule = function() {}
		this.getCurrentTime = function() {}

		this.init = function() {
			var r=[], s=[];
			if(self.schedule==null){ self.setSchedule() }

			for i in self.schedule { var r +=(
				Number(i['end'].split(':')[1]) * 60 +
				Number(i['end'].split(':')[0])
			)}
			for j in r{ var s += r - currentTime }
			
		}
		this.nextTimeSpan = function() {}

		this.timeMinutePassed = null;
		this.timeSpanChanged = null;
	}

	// ---------------------------- //

	var	$window,
		$bell;

	function bindings () {}

	$(document).ready(function () {
		// variable definitions
		$window = $(window);
		$bell = $('bell');
		bindings();
	});

})(jQuery);

