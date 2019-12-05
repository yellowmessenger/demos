const links = document.querySelector(".links");
const filter = document.querySelector(".filter");

// Show animation once a button is clicked //
const liked = () => {
	links.innerHTML = "";
	links.classList.remove('links');
	filter.innerHTML = '<i class="fas fa-thumbs-up"></i>';
	filter.classList.add("rated");
	window.parent.postMessage(JSON.stringify({
                        event_code: 'ym-client-event', data: JSON.stringify({
                            event: {
                                code: "Feedback",
                                data: {
                                    feedback: 'liked'
                                }
                            }
                        })
                    }), '*');
	console.log('done')
}

const disliked = () => {
	links.innerHTML = "";
	links.classList.remove('links');
	filter.innerHTML = '<i class="fas fa-thumbs-down"></i>';
	filter.classList.add("rated");
	 window.parent.postMessage(JSON.stringify({
                        event_code: 'ym-client-event', data: JSON.stringify({
                            event: {
                                code: "Feedback",
                                data: {
                                    feedback: 'disliked'
                                }
                            }
                        })
                    }), '*');
	
}

// Reset animations to beginning //
const reset = () => {
	filter.innerHTML = "";
	filter.classList.remove("rated");
	links.innerHTML = '<a href="#" class="like-btn" onclick="liked()"><i class="fas fa-thumbs-up"></i></a> <a href="#" class="dislike-btn" onclick="disliked()"><i class="fas fa-thumbs-down"></i></a>';
	links.classList.add('links');
}
