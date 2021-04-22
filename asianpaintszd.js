var zendesk = document.createElement('script');

zendesk.setAttribute('src','https://static.zdassets.com/ekr/snippet.js?key=90d22fd8-78bf-4e93-9c7e-31659ad2cd94');
zendesk.setAttribute('id','ze-snippet');

document.head.appendChild(zendesk);

window.addEventListener("message", function (event) {

			var ldata = {}
			try {
				event.data = JSON.parse(event.data);
				ldata = JSON.parse(event.data);
				ldata = ldata.data

			} catch (e) {
				//do nothing
			}

			if (ldata && ldata.code === 'transfer_to_agent') {
 	          window.YellowMessengerPlugin.hide();
				zE('webWidget', 'open');
				zE('webWidget', 'chat:send', "I'd like to talk with an agent, please.\nI'd like to talk with an agent, please.\nI'd like to talk with an agent, please.\nI'd like to talk with an agent, please.\nI'd like to talk with an agent, please.\nI'd like to talk with an agent, please.\nI'd like to talk with an agent, please.\nI'd like to talk with an agent, please.\nI'd like to talk with an agent, please.\nI'd like to talk with an agent, please.\n");
	}
		}, false);
