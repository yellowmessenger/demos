self.addEventListener('fetch', function(event) {
    console.log('Handling fetch event for', event.request.url);
});
