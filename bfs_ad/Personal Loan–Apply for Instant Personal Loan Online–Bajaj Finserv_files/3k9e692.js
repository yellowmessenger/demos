try { 
	(function () {
  var  eligibleAmt = webengage.util.getCookie('_we_t_ea_', true);
  var  suid = webengage.util.getCookie('_we_t_ea_', true);
  
  if (eligibleAmt) {
    eligibleAmt = parseInt(eligibleAmt, 10);
    suid = suid ? parseInt(suid, 10) : false;
 
    webengage.screen({
      'PL_Eligibility_Amount': eligibleAmt,
      'PL_Eligibility_Session_Different': suid && suid !== webengage.util.getSessionCookie().suid
    });
  }

  function observeDomValueChange (target, callback) {

      if (!target) return;

      // create an observer instance
      var observer = new MutationObserver(function(mutations) {
        // console.log('==$value - ', target.innerHTML);
        if (typeof callback === 'function') 
          callback(target.innerHTML);
      });

      // pass in the target node, as well as the observer options
      observer.observe(target, { characterData: true, subtree : true });
  }


  observeDomValueChange(document.getElementsByClassName('eligibleAmt')[0], function (text) {
    // console.log("test");
    // webengage.reload();
    // webengage.options('reloadUserProfile', true);
    var eligibleAmt = parseInt(text.replace(new RegExp(',', 'g'), ''), 10);
    
    webengage.util.setCookie('_we_t_ea_', String(eligibleAmt), 0.020833333333333332, '/', '', '', true);
    webengage.util.setCookie('_we_t_sid_', String(webengage.util.getSessionCookie().suid), 0.020833333333333332, '/', '', '', true);

    webengage.track('PL Eligibility Button_Click',{
      'PL Eligibility_Amount': eligibleAmt
    });
    
    webengage.screen({
      'PL_Eligibility_Amount': eligibleAmt,
      'PL_Eligibility_Session_Different': false
    });

    webengage.notification.render();
  });
})();
 } catch(e) { 
 	if (e instanceof Error) { 
		var data = e.stack || e.description;
		data = (data.length > 900 ? data.substring(0, 900) : data);
	 	webengage.eLog(null, 'error', data, 'cwc-error','cwc', '3k9e692');
	 }
 }
