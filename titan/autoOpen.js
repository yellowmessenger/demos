try {
	setTimeout(function () {
		YellowMessengerPlugin.toggleChat();
	}, 30000);
} catch (e) {
	console.log(e, 'Er in custom script :: ');
}
