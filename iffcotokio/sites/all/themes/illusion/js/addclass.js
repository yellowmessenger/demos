jQuery('.panels-flexible-row.container-style .panels-flexible-row-inside').addClass('container');
jQuery('.panels-flexible-region.container-style .panels-flexible-region-inside').addClass('container');
jQuery('.panel-pane.container-style .pane-content').addClass('container');

// add div row for bootstrap
//jQuery('.panels-flexible-row-inside.container .panels-flexible-region').wrapAll("<div class='row' />");

//jQuery('.tp-leftarrow.tparrows').addClass('color_light icon icon_wrap_size_3 circle tr_all');
//jQuery('.tp-tp-rightarrow.tparrows').addClass('color_light icon icon_wrap_size_3 circle tr_all');

// Category
jQuery('.vr_list_type_4.color_dark.fw_light').find("span").find("a").addClass('color_dark d_inline_b');
jQuery('.vr_list_type_4.color_dark.fw_light').find("span").find("a").append('<span class="icon_wrap_size_0 circle color_grey_light_5 d_block tr_inherit f_left"><i class="icon-angle-right"></i></span>');
// Tags
jQuery('.m_right_5.m_bottom_5').find("span").find("a").addClass('r_corners button_type_2 d_block color_dark color_pink_hover fs_medium');
// Breadcumbs
jQuery('.page_title .breadcrumbs li a').addClass('color_grey_light_3 d_inline_m m_right_10');
jQuery('.page_title_2 .breadcrumbs li a').removeClass('color_grey_light_3').addClass('color_default d_inline_m m_right_10');
jQuery('.page_title_2 .breadcrumbs li i').removeClass('color_grey_light_3').addClass('color_default');

// Category
jQuery('.category-style').find('a').addClass('fs_medium color_grey');
jQuery('.tag-style').find('a').addClass('color_purple');

// Latest Tweets
jQuery('#block-twitter-block-1').find('h2').addClass('color_dark fw_light m_bottom_20');

// Newsletter
jQuery('#block-newsletter-newsletter-subscribe').find('h2').addClass('color_dark fw_light m_bottom_20');
jQuery('#block-newsletter-newsletter-subscribe .prefix').addClass('fw_light m_bottom_25');
jQuery('#block-newsletter-newsletter-subscribe #edit-newsletter-submit').addClass('fs_medium button_type_2 color_purple transparent r_corners tr_all');

// Tabbed widget
jQuery('#quicktabs-tabbed_widget_left_sidebar .quicktabs-tabs').addClass('tabs_nav type_3 hr_list d_inline_b d_md_block m_bottom_30 m_xs_bottom_20');
jQuery('#quicktabs-tabbed_widget_left_sidebar .quicktabs-tabs').find('li').addClass('f_md_none');
jQuery('#quicktabs-tabbed_widget_left_sidebar .quicktabs-tabs').find('li').addClass('f_md_none');
jQuery('#quicktabs-tabbed_widget_left_sidebar .quicktabs-tabs').find('li').find('a').addClass('color_dark d_block n_sc_hover tr_all_medium');
jQuery('#quicktabs-tabbed_widget_right_sidebar .quicktabs-tabs').addClass('tabs_nav type_3 hr_list d_inline_b d_md_block m_bottom_30 m_xs_bottom_20');
jQuery('#quicktabs-tabbed_widget_right_sidebar .quicktabs-tabs').find('li').addClass('f_md_none');
jQuery('#quicktabs-tabbed_widget_right_sidebar .quicktabs-tabs').find('li').addClass('f_md_none');
jQuery('#quicktabs-tabbed_widget_right_sidebar .quicktabs-tabs').find('li').find('a').addClass('color_dark d_block n_sc_hover tr_all_medium');

// Archive
jQuery('#block-views-archive-block').addClass('m_bottom_45 m_xs_bottom_30');
jQuery('#block-views-archive-block ul.views-summary').addClass('vr_list_type_4 color_dark fw_light');
jQuery('#block-views-archive-block ul.views-summary li').addClass('m_bottom_12');
jQuery('#block-views-archive-block ul.views-summary li a').addClass('color_dark d_inline_b');
jQuery('#block-views-archive-block ul.views-summary li a').append('<span class="icon_wrap_size_0 circle color_grey_light_5 d_block tr_inherit f_left"><i class="icon-angle-right"></i></span>');

// add icon expand for main menu
jQuery('.parent_link').append(' <i class="icon-angle-down d_inline_m"></i>');
jQuery('.child_link').append(' <i class="icon-angle-right"></i>');

var winWidth = jQuery(window).width();
/*if(winWidth < 765){		
	jQuery('.parent_link').click(function(e) {
		e.preventDefault();
	});
	jQuery('.child_link').click(function(e) {
		e.preventDefault();
	});
}*/			

// Shopping car
jQuery('#views-form-commerce-cart-form-default .delete-line-item').addClass('d_inline_b tr_all r_corners button_type_1 color_pink transparent fs_medium mini_side_offset');
jQuery('#views-form-commerce-cart-form-default #edit-submit').addClass('d_inline_b tr_all r_corners button_type_1 color_pink transparent fs_medium mini_side_offset');
jQuery('#views-form-commerce-cart-form-default #edit-checkout').addClass('d_inline_b tr_all r_corners button_type_1 color_pink transparent fs_medium mini_side_offset');
jQuery('#commerce-checkout-form-checkout #edit-continue').addClass('d_inline_b tr_all r_corners button_type_1 color_pink transparent fs_medium mini_side_offset');
jQuery('#commerce-checkout-form-checkout #edit-cancel').removeClass('checkout-cancel').addClass('d_inline_b tr_all r_corners button_type_1 color_pink transparent fs_medium mini_side_offset');
jQuery('#commerce-checkout-form-review #edit-continue').addClass('d_inline_b tr_all r_corners button_type_1 color_pink transparent fs_medium mini_side_offset');
jQuery('#commerce-checkout-form-review #edit-back').removeClass('checkout-back').addClass('d_inline_b tr_all r_corners button_type_1 color_pink transparent fs_medium mini_side_offset');

// Contact
jQuery('.form-submit').addClass('button_type_5 color_blue transparent r_corners fs_medium tr_all m_right_10 m_sm_bottom_10');

// Subscribe form footer
jQuery('#newsletter-subscribe-form #edit-email').addClass('r_corners bg_light w_full fw_light m_bottom_20');
jQuery('#newsletter-subscribe-form #edit-email').attr('value', '');
jQuery('#newsletter-subscribe-form #edit-email').attr('placeholder', 'Your email address');

// re-sort pager (next & prev)
jQuery().ready(function() {
    var prev_html = jQuery('.page-numbers.prev').html();
    var next_html = jQuery('.page-numbers.next').html();
    jQuery('.page-numbers.prev').html(next_html);
    jQuery('.page-numbers.next').html(prev_html);
});

// main menu: add current class for parents
jQuery('.main_menu a.active').parents('li').addClass('current');

// add twitter follow us button
var user_url = jQuery('footer .block-twitter-block a.u-url.profile').attr('href');
jQuery('footer .block-twitter-block').append('<a href="https://twitter.com/ShinichiMT" target="_blank" class="button_type_2 d_inline_b color_blue transparent r_corners fs_medium tr_all tw_follow">Follow Us</a>');

// Wishlist Product
//jQuery('.flag-shop .flag').html('').addClass('button_type_6 m_mxs_bottom_5 tooltip_container m_right_2 relative v_align_b d_inline_b f_md_none d_md_inline_b d_block color_dark r_corners vc_child tr_all color_purple_hover tr_all t_align_c');
//jQuery('.flag-shop .flag').append('<i class="icon-heart d_inline_m fs_large"></i><span class="d_block r_corners color_default tooltip fs_small fw_normal tr_all">Add to Wishlist</span>');

// subcribe in page Event Countdown
jQuery('#event-edit-newsletter-submit').click(function() {
    var email = jQuery('#event-edit-email').val();
    jQuery('#edit-email').val(email);
    jQuery('#edit-newsletter-submit').click();
});

// add message close button
jQuery('div.messages').append('<i class="icon-cancel close_alert_box tr_all translucent circle t_align_c message-close"></i>');

// remove * in subscribe
jQuery('fieldset#edit-mail').removeClass('required');

// Search form
jQuery('#search-404 #edit-submit').append('<i class="icon-search"></i>');