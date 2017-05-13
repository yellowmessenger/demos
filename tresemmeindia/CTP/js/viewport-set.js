// Store the meta element
var viewport_meta = document.querySelector("meta[name=viewport]")
// Define our viewport meta values
var viewports = {
        // default: viewport_meta.getAttribute('content'),
        landscape: 'width=960'
    };
// Change the viewport value based on screen.width
var viewport_set = function() {
        if ( screen.width >= 768 )
            viewport_meta.setAttribute( 'content', viewports.landscape );        
    }
// Set the correct viewport value on page load
viewport_set();

// Set the correct viewport after device orientation change or resize
window.onresize = function() { 
    viewport_set(); 
}