_satellite.pushAsyncScript(function(event, target, $variables){
  $(window).on('load.aa.pageLoadSpeed', function () {
  setTimeout(function () {
  	sessionStorage.setItem("aa.PageLoadSpeed", performance.timing.loadEventEnd - performance.timing.navigationStart);
  }, 0);
});

});
