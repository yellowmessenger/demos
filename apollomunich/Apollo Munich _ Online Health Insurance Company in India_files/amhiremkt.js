var remkt_loc_js = '';
remkt_loc_js = location.pathname;
var remkt_val={
    itemid:'',
    itemid2:'',
    pagetype:'',
    totalvalue:'',
    productpage:''
}
switch(remkt_loc_js){
     case '/' :     
     remkt_val.productpage='home';
     break;
     case '/travel-insurance-plans.aspx' :
     remkt_val.itemid='Travel Individual,Travel Family,Travel Senior Citizen,Travel Student,Travel Annual Multi Trip';
     remkt_val.productpage='offerdetail';
     break;
    case '/individual-travel-insurance-policies.aspx' :
     remkt_val.itemid='Travel Individual';
     remkt_val.productpage='offerdetail';
     break;
     case '/family-travel-insurance-policies.aspx':
     remkt_val.itemid='Travel Family';
     remkt_val.productpage='offerdetail';
     break;
     case '/senior-citizen-travel-insurance-policies.aspx':
     remkt_val.itemid='Travel Senior Citizen';
      remkt_val.productpage='offerdetail';
     break;
     case '/educare-travel-insurance-plan.aspx':
     remkt_val.itemid='Travel Student';
      remkt_val.productpage='offerdetail';
     break;
     case '/annual-multi-trip-travel-insurance-plan.aspx':
     remkt_val.itemid='Travel Annual Multi Trip';
      remkt_val.productpage='offerdetail';
     break;
     case '/buy-individual-travel-insurance-plan.aspx':
     remkt_val.itemid='Travel Individual';
     remkt_val.itemid2='Calculator';
      remkt_val.productpage='offerdetail';
     break;
     case '/buy-family-travel-insurance-plan.aspx':
     remkt_val.itemid='Travel Family';
     remkt_val.itemid2='Calculator';
      remkt_val.productpage='offerdetail';
     break;
     case '/buy-senior-citizen-travel-insurance-plan.aspx':
     remkt_val.itemid='Travel Senior Citizen';
     remkt_val.itemid2='Calculator';
      remkt_val.productpage='offerdetail';
     break;
     case '/buy-student-travel-insurance-plan.aspx':
     remkt_val.itemid='Travel Student';
     remkt_val.itemid2='Calculator';
      remkt_val.productpage='offerdetail';
     break;
     case '/buy-annual-multi-trip-travel-insurance-plan.aspx':
     remkt_val.itemid='Travel Annual Multi Trip';
     remkt_val.itemid2='Calculator';
      remkt_val.productpage='offerdetail';
     break;
}
