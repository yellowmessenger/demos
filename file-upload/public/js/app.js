

let origins = window.location.ancestorOrigins;
console.log(window.origin, "origin");
console.log(window.location, "location");

// if (!(origins && origins.length > 0 && Array.from(origins).some(val => val.includes("app.yellowmessenger.com")))) {
//     window.location.replace("/404")
// }

$(document).ready(function () {
    $("#file").on('change', function () {
        console.log('submitting form...');
        this.form.submit();
        $("#file").attr('disabled', 'disabled');
    })
});
