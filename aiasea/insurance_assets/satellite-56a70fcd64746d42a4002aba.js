_satellite.pushAsyncScript(function(event, target, $variables){
  var s_ppiv, s_pph;

var handlePPVevents = function () {
    var dh = Math.max(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), Math.max(document.body.clientHeight, document.documentElement.clientHeight)),
        vph = window.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight),
        st = window.pageYOffset || (window.document.documentElement.scrollTop || window.document.body.scrollTop),
        vh = st + vph,
        pv = Math.min(Math.round(vh / dh * 100), 100),
        c1 = !!sessionStorage.getItem('aa.percentagePageViewed') ? sessionStorage.getItem('aa.percentagePageViewed') : 0,
        c2 = s_ppiv,
        c3 = s_pph,
        cv = (c1) ? c1 : (0),
        p0 = (c2) ? c2 : (pv),
        cy = (c3) ? c3 : (0);
    if (pv) {
        sessionStorage.setItem('aa.percentagePageViewed', ((pv > cv) ? pv : cv));
        s_ppiv = p0;
        s_pph = ((vh > cy) ? vh : cy);
    }
}

$(window).on('load.aa.percentagePageViewed', function() {
  sessionStorage.removeItem('aa.percentagePageViewed');
	handlePPVevents();
});
$(window).on('scroll.aa.percentagePageViewed', function () {
	handlePPVevents();
});
$(window).on('resize.aa.percentagePageViewed', function() {
	handlePPVevents();
});
});
