var sliderhtml = ' ';
var sliderblockhtml = ' ';
$(document).ready(function(){
	/*Outer Html defination*/
	jQuery.fn.outerHTML = function()
	{ 
		 return $( $('<div></div>').html(this.clone()) ).html(); 
	}
	
	/*Outer Html defination*/	
});

function dualContentSlider(_id,licount)
{	
	eval("var dualsliderlicount" + _id + "= " + $("#" + _id + " ul li").size());
	if(eval("dualsliderlicount" + _id + "==" + licount))
	{
		$("#" + _id + " .buttons").hide();
	}
	else
	{
		$("#" + _id + " .buttons").show();
		contentsliderfunc(_id,licount);
	}	
}


function contentsliderfunc(_id,licount){
	if($("#" + _id).find("ul").hasClass("newsclip"))
	{
		$("#" + _id + " .buttons .prevBtn").css({"cursor" : "auto"});
		$("#" + _id + " .buttons .prevBtn").attr({"alt" : ""});
		eval("var overflowDivheight" + _id  + "=" + ($("#" + _id + " ul.newsclip li").outerHeight() + parseInt($("#" + _id + " ul.newsclip").css("padding-top").replace("px" , "")) + parseInt($("#" + _id + " ul.newsclip").css("padding-bottom").replace("px",""))));
		if(licount == 2)
		{	
			$("#" + _id + " ul").wrap("<div style='float:left;overflow:hidden;width:" + $("#" + _id + " ul li").outerWidth() +"px;height : " + eval("overflowDivheight" + _id + "*2") + "px'>");
			$("#" + _id + " ul").css("height" , ($("#" + _id + " ul li").outerHeight() * 2));
			$("#" + _id + " ul").css("width" , ($("#" + _id + " ul li").length * $("#" + _id + " ul li").outerWidth()));
			
			eval("var index1" + _id + "= 0");
			eval("var index2" + _id + "= 1");
			eval("var index" + _id + "= 0");
			eval("var width" + _id + "= " + $("#" + _id + " ul li").outerWidth());
			eval("var count" + _id + "= " + Math.round($("#" + _id + " ul li").length/2));
		}
		else
		{
			$("#" + _id + " ul").wrap("<div style='float:left;overflow:hidden;width:" + $("#" + _id + " ul li").outerWidth() +"px;height : " + eval("overflowDivheight" + _id) + "px'>");
			$("#" + _id + " ul").css("height" , ($("#" + _id + " ul li").outerHeight()));
			$("#" + _id + " ul").css("width" , ($("#" + _id + " ul li").length * $("#" + _id + " ul li").outerWidth()));
			
			eval("var index" + _id + "= 0");
			eval("var width" + _id + "= " + $("#" + _id + " ul li").outerWidth());
			eval("var count" + _id + "= " + Math.round($("#" + _id + " ul li").length));
		}
		
		if(licount == 2)
		{
			$("#" + _id + " ul li").each(function(i)
			{	
				sliderhtml = ($("#" + _id + " ul li").eq(eval("index1" + _id)).outerHTML() + $("#" + _id + " ul li").eq(eval("index2" + _id)).outerHTML());	
				eval("index1" + _id + "=" + eval("index2" + _id));
				eval("index1" + _id + "++");
				eval("index2" + _id + "=" + eval("index2" + _id) + "+ 2");
				sliderblockhtml = sliderblockhtml + ("<li style='float:left;background:none;padding:0;font-size:1em;width:"+ eval("width" + _id) +"px'><ul>" + sliderhtml + "</ul></li>");
			});
			$("#" + _id + " ul").html(sliderblockhtml);
		}
		else
		{
			$("#" + _id + " ul li").css({"float" : "left"});
		}
		
		
		/*Next Button Click*/
		$("#" + _id + " .buttons .nextBtn").click(function()
		{	
			$("#" + _id + " .buttons .prevBtn").css({"opacity" : 1});
			$("#" + _id + " .buttons .prevBtn").css({"cursor" : "pointer"});
			$("#" + _id + " .buttons .prevBtn").attr({"alt" : "Previous"});

			if(eval("index" + _id) > eval("count" + _id + "- 3"))
			{
				$(this).css({"opacity" : 0.5});
				$(this).css({"cursor" : "auto"});
				$(this).attr({"alt" : ""});
			}
			if(eval("index" + _id) > eval("count" + _id + "- 3"))
			{
				eval("index" + _id + "=" + eval("count" + _id + "-1"));
			}
			else
			{
				eval("index" + _id + "++");
			}		
			$("#" + _id + " .newsclip").stop(true,true).animate({"margin-left" : (-1) * eval("width" + _id + "*" + eval("index" + _id))});		
		});
		/*Next Button Click*/
		
		/*Previous Button Click*/
		$("#" + _id + " .buttons .prevBtn").click(function()
		{		
			$("#" + _id + " .buttons .nextBtn").css({"opacity" : 1});
			$("#" + _id + " .buttons .nextBtn").css({"cursor" : "pointer"});
			$("#" + _id + " .buttons .nextBtn").attr({"alt" : "Next"});
			
			if(eval("index" + _id) == 1)
			{
				$(this).css({"opacity" : 0.5});
				$(this).css({"cursor" : "auto"});
				$(this).attr({"alt" : ""});
			}
			if(eval("index" + _id) == 0)
			{
				eval("index" + _id + "= 0");			
			}
			else
			{
				eval("index" + _id + "--");
			}		
			$("#" + _id + " .newsclip").stop(true,true).animate({"margin-left" : (-1) * eval("width" + _id + "*" + eval("index" + _id))});	
		});
		/*Previous Button Click*/	
	}
		
}