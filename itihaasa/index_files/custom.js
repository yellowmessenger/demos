jQuery(document).ready(function(){
	var coverflow = $("#coverflow").flipster({
	    style: 'flat',
	    spacing: -0.25,
	    loop: true,
	});
	jQuery('.nav.left').click(function(e){
		e.preventDefault();
		coverflow.flipster('prev');
	});
	jQuery('.nav.right').click(function(e){
		e.preventDefault();
		coverflow.flipster('next');
	});
	jQuery('#video-modal').on('hidden.bs.modal', function () {
		var videoURL = jQuery('#y_video').attr('src');
		jQuery("#y_video").attr("src",'');
		jQuery("#y_video").attr("src",videoURL);
	});

	jQuery('#video-modal-mumbai').on('hidden.bs.modal', function () {
		var videoURL = jQuery('#ym_video').attr('src');
		jQuery("#ym_video").attr("src",'');
		jQuery("#ym_video").attr("src",videoURL);
	});

	jQuery('#video-modal-bangalore').on('hidden.bs.modal', function () {
		var videoURL = jQuery('#yb_video').attr('src');
		jQuery("#yb_video").attr("src",'');
		jQuery("#yb_video").attr("src",videoURL);
	});
	/*jQuery('.btn-more').hover(function(e){
		e.preventDefault();
	 	jQuery('.box-description').show();
	 });*/
	jQuery(".btn-more").hover(function(e){
		
	    jQuery(this).parent().parent().find('.box-description').show();
	},function(){
	    jQuery('.box-description').hide();
	});
	jQuery(".btn-more").click(function(e){
		e.preventDefault();
	});
});