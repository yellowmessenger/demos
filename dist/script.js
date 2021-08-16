// Display feedback after rating 
$('.rating__input').on('click', function() {
  var rating = this['value'];
		$('.rating__label').removeClass('active');
  $(this).siblings('.rating__label').addClass('active');
  $('.feedback').css('display', "block");
});
