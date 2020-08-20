(function(a){a(".modal").on("shown.bs.modal",function(){var b=a(".navbar-tools li[data-contact]");
if(a(this).find(".partial-screen-modal-dialog").length<=0&&a(this).find(".modal-header .navbar-tools").length<=0){a(this).find(".modal-header button .pull-left").after('<ul class="nav navbar-tools pull-right"><li class="dropdown"></li></ul>');
if(b.length>0){a(this).find(".modal-dialog .navbar-tools .dropdown").html(b.html())
}}});
setInterval(function(){a("iframe#aemFormFrame").each(function(d,c){var e=a(c);
var b=e.contents().height();
e.height(b)
})
},1000)
})($);