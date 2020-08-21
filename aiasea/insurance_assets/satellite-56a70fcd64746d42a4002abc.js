_satellite.pushAsyncScript(function(event, target, $variables){
  $(window).on('beforeunload.aa.previousPageName', function() {
    sessionStorage.setItem('aa.previousPage', _satellite.getVar('Page Name'));
});
});
