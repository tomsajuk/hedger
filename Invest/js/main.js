$(window).load(function() {
	// alert("window load occurred!");
	if (window.innerWidth < 993) {
	//  alert("Hello! I am an alert box!");
	 $(".navigator").removeClass("navbar-fixed");

}

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
