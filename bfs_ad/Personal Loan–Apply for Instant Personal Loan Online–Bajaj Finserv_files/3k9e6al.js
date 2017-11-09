try { 
	var sessionCount = webengage.util.getWebengageCookie().sc;
localStorage['customSessionCount'] = sessionCount;
/*if (!localStorage['customSessionCount']) {
	localStorage['customSessionCount'] = sessionCount;
}*/

 } catch(e) { 
 	if (e instanceof Error) { 
		var data = e.stack || e.description;
		data = (data.length > 900 ? data.substring(0, 900) : data);
	 	webengage.eLog(null, 'error', data, 'cwc-error','cwc', '3k9e6al');
	 }
 }
