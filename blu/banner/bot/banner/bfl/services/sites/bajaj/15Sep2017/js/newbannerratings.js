 /* Banner Ratings js changes made in classes starts*/
                                                                                                                                                 
 $(document).ready(function(){var parentname=$('#parentname').val();var productName=parentname;$.ajax({crossDomain:true,url:"/RatingService/getRatingCount/"+ productName,type:"GET",dataType:"json",data:{productName:productName},contentType:"application/json",success:function(response){console.log(1);var count1=0;var count2=0;var count3=0;var count4=0;var count5=0;$('.v1_rate').empty();for(var i in response){count1=response[0];count2=response[1];count3=response[2];count4=response[3];count5=response[4];}
TotalNumberofRatings=count1+ count2+ count3                   
+ count4+ count5;TotalNumberofFiveRatings=count5*5;TotalNumberofFourRatings=count4*4;TotalNumberofThreeRatings=count3*3;TotalNumberofTwoRatings=count2*2;TotalNumberofOneRatings=count1*1;SumofAllRatings=TotalNumberofFiveRatings
+ TotalNumberofFourRatings
+ TotalNumberofThreeRatings                     
+ TotalNumberofTwoRatings
+ TotalNumberofOneRatings;Average=SumofAllRatings/TotalNumberofRatings;var averageRating=Average.toFixed(1);if(averageRating!="NaN"){$('.v1_ratedtl').html("- "+
averageRating+" / 5"+"<a  href='#;'>"+ TotalNumberofRatings+" Reviews </a>");}                             
var bannerRatings=Math.round(averageRating);var bannerRating="";if(bannerRatings==1){bannerRating="<i class='glyphicon glyphicon-star'>";}
if(bannerRatings==2){bannerRating="<i class='glyphicon glyphicon-star'></i><i class='glyphicon glyphicon-star'></i>";}
if(bannerRatings==3){bannerRating="<i class='glyphicon glyphicon-star'></i><i class='glyphicon glyphicon-star'></i><i class='glyphicon glyphicon-star'></i>";}
if(bannerRatings==4){bannerRating="<i class='glyphicon glyphicon-star'></i><i class='glyphicon glyphicon-star'></i><i class='glyphicon glyphicon-star'></i><i class='glyphicon glyphicon-star'></i>";}
if(bannerRatings==5){bannerRating="<i class='glyphicon glyphicon-star'></i><i class='glyphicon glyphicon-star'></i><i class='glyphicon glyphicon-star'></i><i class='glyphicon glyphicon-star'></i><i class='glyphicon glyphicon-star'></i>";}
$('.v1_rate').append(bannerRating);},error:function(errorThrown){}});}); 
 /* Banner Ratings js changes made in classes starts*/