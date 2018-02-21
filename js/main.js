$(window).load(function() {
	// alert("window load occurred!");
	if (window.innerWidth < 993) {
	//  alert("Hello! I am an alert box!");
	 $(".navigator").removeClass("navbar-fixed");

}
	$("#formId").show();
	$(".main-title").show();
	$("#subscribeButton").show();
	$("#esButton").show();

	$("#videoButton").show();

 $(".button-collapse").sideNav();
	setTimeout(function(){
		Materialize.toast('Scroll Down to discover Hedger!', 3000, 'rounded');


}, 1500);
	});



$("#navHome").click(function() {
			$('html, body').animate({
			scrollTop: $("#large-header").offset().top
			}, 1500);
});


$("#navFundStructure").click(function() {
			$('html, body').animate({
			scrollTop: $("#fundStructure").offset().top
			}, 1000);
});


$("#navPlatform").click(function() {
			$('html, body').animate({
			scrollTop: $("#platform").offset().top
			}, 1500);
});




$("#navPerformance").click(function(){
	$('html, body').animate({
	scrollTop: $("#performanceData").offset().top
	}, 1500);

	});

$("#performanceButton").click(function() {
	Materialize.Toast.removeAll();
	Materialize.toast('Coming Soon', 1000, 'rounded');
	setTimeout(function() {Materialize.toast('Check out our Roadmap', 1500, 'rounded');}, 1100);

});

$("#vtButton").click(function() {
	Materialize.Toast.removeAll();
	Materialize.toast('Coming Soon', 1000, 'rounded');
	setTimeout(function() {Materialize.toast('Will be relesed after launch', 1500, 'rounded');}, 1100);

});

$("#videoButton").click(function() {
	Materialize.Toast.removeAll();
	Materialize.toast('Coming Soon', 1000, 'rounded');
	setTimeout(function() {Materialize.toast('Check out our Roadmap', 1500, 'rounded');}, 1100);

});

$("#esButton").click(function() {
	Materialize.Toast.removeAll();
	Materialize.toast('White Paper shall be launched soon', 1000, 'rounded');
	setTimeout(function() {Materialize.toast('Check out our Roadmap', 1500, 'rounded');}, 1100);

});


$("#contractButton").click(function() {
	Materialize.Toast.removeAll();
	Materialize.toast('Coming Soon', 1000, 'rounded');
	setTimeout(function() {Materialize.toast('Check out our Roadmap', 1500, 'rounded');}, 1100);

});





$("#navHomeMobile").click(function() {
			$('html, body').animate({
			scrollTop: $("#large-header").offset().top
			}, 1500);
});


$("#navFundStructureMobile").click(function() {
			$('html, body').animate({
			scrollTop: $("#fundStructure").offset().top
			}, 1000);
});


$("#navPlatformMobile").click(function() {
			$('html, body').animate({
			scrollTop: $("#platform").offset().top
			}, 1500);
});

$("#navPerformanceMobile").click(function(){
	$('html, body').animate({
	scrollTop: $("#performanceData").offset().top
	}, 1500);

	});
