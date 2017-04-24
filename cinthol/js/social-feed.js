jQuery(document).ready(function(t) {
    t("div.social-grid").dcSocialStream({
        feeds: {
            twitter: {
                id: '@godrejcinthol',
                intro: 'Tweeted',
			    search: 'Tweeted',
			    out: 'intro,thumb,text',
			    images: 'large',
			    retweets: false,
			    url: 'twitter.php',
			    icon: 'images/dcsns-dark/twitter.png'
            },
            facebook: {
                id: "224122304315120", 
                /* id: "445199718834455", */
                out: "intro,thumb,text,share",
				url: 'facebook.php'
            },
            youtube: {
                id: 'godrejcinthol/UCCl1RwjS_KyjTnGdNlrVeQQ',
				out: 'intro,thumb,title'
            }
        },
        rotate: {
            delay: 0
        },
        twitterId: 'GodrejCinthol',
		control: false,
		filter: true,
		ernal: true,
		wall: true,
		cache: false,
		order: 'date',
		max: 'limit',
		limit: 100,
		iconPath: 'images/dcsns-dark/',
		imagePath: 'img/',
		ug: false
    })
});
	 