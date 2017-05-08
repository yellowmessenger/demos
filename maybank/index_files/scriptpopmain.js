$(document).ready(function(){
$(".group1").colorbox({rel:'group1'});
$(".group2").colorbox({rel:'group2', transition:"fade"});
$(".group3").colorbox({rel:'group3', transition:"none", width:"75%", height:"75%"});
$(".group4").colorbox({rel:'group4', slideshow:true});
$(".ajax").colorbox();
$(".popup").colorbox({iframe:true, innerWidth:"600", innerHeight:"394"});
$(".youtube").colorbox({iframe:true, innerWidth:425, innerHeight:344});
$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
$(".inline").colorbox({inline:true, width:"50%"});
$("#various3").colorbox({iframe:true, width:"470", height:"400"});
/*$("#trade").colorbox({iframe:true, width:"670", height:"520"});*/
/*$("#various3").colorbox({iframe:true, width:"670", height:"370"});*/
/*$("#bulkpayment").colorbox({iframe:true, width:"670", height:"450"});*/
$("#bulkpayment").colorbox({iframe:true, width:"670", height:"400"});
$(".callbacks").colorbox({
onOpen:function(){ alert('onOpen: colorbox is about to open'); },
onLoad:function(){ alert('onLoad: colorbox has started to load the targeted content'); },
onComplete:function(){ alert('onComplete: colorbox has displayed the loaded content'); },
onCleanup:function(){ alert('onCleanup: colorbox has begun the close process'); },
onClosed:function(){ alert('onClosed: colorbox has completely closed'); }});
$("#M2E").click(function(){ 
$('#various3').trigger('click');});
/*$("#TradeConnex").click(function(){ 
$('#trade').trigger('click');});*/
$("#BulkPayment").click(function(){ 
$('#bulkpayment').trigger('click');});
});
