var s1 = new AppMeasurement("Test");
_satellite.getVar('JQuery cookie plugin');

if(_satellite.settings.isStaging)
{  s1.account="apmutestsuite";
}
else
{
s1.account ="apmuprodsuite";
}
s_account=s1.account;

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s1.visitorNamespace="apollomunich";
s1.trackingServer="apollomunich.sc.omtrdc.net";
/*
/*
s1.trackingServer="apollomunich.sc.omtrdc.net";

s1.account = "apmuprodsuite";
  //s1.account = "apmutestsuite";
if(_satellite.settings.isStaging=="true")
  s1.account = "apmutestsuite"; //s1.account = "apmutestsuite";
/*
{
  s1.account = "apmutestsuite";
}
else if(location.host.match(/^(?:demo)\.?xerago.com/))
{
	s1.account = "apmutestsuite";
}
else
{
	s1.account = "apmudevsuite";	
//s1.account = "apmutestsuite";
}
*/
s1.prop21="code From DTM";

/* ***************************** Configuration Section ************************** */

SC_timezone = '+5:30';
s1.charSet = "UTF-8";
s1.trackDownloadLinks = true;
s1.trackExternalLinks = true;
s1.trackInlineStats = true;
s1.currencyCode = "INR";
s1.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s1.linkInternalFilters = "javascript:,www.apollomunichinsurance.com,renewal.apollomunichinsurance.com,amhi.in,uat.apollomunichinsurance.com,renewaluat.apollomunichinsurance.com,lp.apollomunichinsurance.com" //optional: add your internal domain here
s1.linkLeaveQueryString = false;
s1.mobile = true;
s1.linkTrackVars = "prop21";
s1.linkTrackEvents = "None";

/* ***************************** Marketing Cloud Configuration Section ************************** */
//s1.visitor = Visitor.getInstance("D1E9741F578C7C917F000101@AdobeOrg");
/* ***************************** Marketing Cloud Configuration Section ************************** */

/* ***************************** End of Configuration Section ************************** */




 /******************************PAGENAME.JS FILE**********************************************/
var SC_Location = location.host.split('.').slice(1).toString().replace(/,/g, '.') + location.pathname;
var SC_Search_String = location.href.split('.').slice(1).toString().replace(/,/g, '.');
var SC_PageName = '';

switch (SC_Location) {
    /*Faqs and Blogs*/

    case 'apollomunichinsurance.com/blog.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:BlogHome';
        break;
    case 'apollomunichinsurance.com/blog/10-things-to-consider-before-buying-health-insurance.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:10ThingsToConsiderBeforeBuyHealthInsurance';
        break;
    case 'apollomunichinsurance.com/blog/6-ways-yoga-can-help-you-deal-with-stress-of-the-corporate-life.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:6WaysYogaHelpWithStressOfCorporateLife';
        break;
    case 'apollomunichinsurance.com/blog/7-things-you-need-for-your-next-family-vacation-abroad.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:7ThingsWeNeedForFamilyVacationAbroad';
        break;
    case 'apollomunichinsurance.com/blog/8-ways-to-save-money-on-your-next-foreign-holiday.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:8WaysSaveMoneyNextForeignHoliday';
        break;
    case 'apollomunichinsurance.com/blog/Apollo-Munich-a-great-place-to-work-in-India-6th-year-in-a-row.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:ApolloMunichGreatPlaceToWork6YearInRow';
        break;
    case 'apollomunichinsurance.com/blog/benefits-of-yoga-for-expecting-mothers.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:YogaExpectingMothers';
        break;
    case 'apollomunichinsurance.com/blog/buying-health-insurance-do-dont.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:BuyHealthInsuranceDosDonts';
        break;
    case 'apollomunichinsurance.com/blog/category/health-insurance.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:HealthInsurance';
        break;
    case 'apollomunichinsurance.com/blog/category/travel-insurance.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:TravelInsurance';
        break;
    case 'apollomunichinsurance.com/blog/common-health-insurance-myths-part-1.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:HealthInsuranceMythsPart1';
        break;
    case 'apollomunichinsurance.com/blog/employee-assistance-programs-can-be-key-productivity-drivers-do-you-now-how.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:EmployeeAssistancePrograms';
        break;
    case 'apollomunichinsurance.com/blog/five-things-you-must-carry-on-your-next-business-trip-abroad.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:5ThingsOnNextBusinessTrip';
        break;
    case 'apollomunichinsurance.com/blog/health-insurance-and-life-insurance-and-why-we-need-both.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:WhyWeNeedBothHealthAndLifeInsurance';
        break;
    case 'apollomunichinsurance.com/blog/my-ordeal-with-dreadful-dengue.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:OrdealWithDreadfulDengue';
        break;
    case 'apollomunichinsurance.com/blog/overseas-travel-insurance-perfect-gateway-to-tension-free-holidays.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:OverseasTravelInsuranceTensionFreeHolidays';
        break;
    case 'apollomunichinsurance.com/blog/should-you-buy-a-travel-insurance-for-your-next-trip-abroad.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:ShouldBuyTravelInsuranceForNextTripAbroad';
        break;
    case 'apollomunichinsurance.com/blog/the-major-healthcare-challenges-in-India.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:MajorHealthCareChallengesIndia';
        break;
    case 'apollomunichinsurance.com/blog/top-health-concerns-during-monsoons-in-India.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:TopHealthConcernsMonsoonsIndia';
        break;
    case 'apollomunichinsurance.com/blog/travel-insurance-myths-decoded.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:TravelInsuranceMythsDecoded';
        break;
    case 'apollomunichinsurance.com/blog/what-is-covered-by-a-senior-citizen-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CoverSeniorCitizenPlan';
        break;
    case 'apollomunichinsurance.com/blog/what-makes-a-great-workplace.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:WhatMakesGreatWorkPlace';
        break;
    case 'apollomunichinsurance.com/blog/what-you-need-to-know-about-group-health-insurance.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:NeedToKnowAboutGroupHealthInsurance';
        break;
    case 'apollomunichinsurance.com/blog/why-every-woman-needs-a-separate-health-cover.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:EveryWomanNeedsSeparateHealthCover';
        break;
    case 'apollomunichinsurance.com/blog/why-investing-in-a-health-plan-before-you-turn-35-will-be-the-best-decision-you-will-ever-take-in-life.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:HealthInsuranceInvestBefore35Age';
        break;
    case 'apollomunichinsurance.com/blog/why-taking-travel-insurance-a-necessity-part-1.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:WhyTravelInsurancePart1';
        break;
    case 'apollomunichinsurance.com/blog/why-taking-travel-insurance-a-necessity-part-2.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:WhyTravelInsurancePart2';
        break;
    case 'apollomunichinsurance.com/blog/yoga-for-children.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:YogaForChildren';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Cancellation-queries.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:CancellationQueries';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Claim-queries.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:ClaimQueries';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Contacting-Apollo-Munich.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:Contact';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Modifying-the-policy.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:ModifyingPolicy';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Renewal-benefits.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:RenewalBenefits';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Renewals.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:Renewals';
        break;
    case 'apollomunichinsurance.com/Support/Faq/General-Queries/How-do-I-find-out-which-Hospitals-are-part-of-a-gi.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:GeneralQueries:HospitalInsuranceNetwork';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Claim-queries/How-do-I-find-out-which-Hospitals-are-part-of-a-gi.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:HospitalInsuranceNetwork';
        break;
    case 'apollomunichinsurance.com/blog/how-much-tax-do-you-save-through-health-insurance.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:TaxSaveThroughHealthInsurance';
        break;
    case 'apollomunichinsurance.com/blog/five-reasons-your-corporate-health-insurance-plan-may-not-be-sufficient.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:5ReasonsCorporateInsuranceNotSufficient';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/Is-cashless-facility-available-across-all-hospital.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:CashlessFacility';
        break;
    case 'apollomunichinsurance.com/blog/6-ways-yoga-can-help-you-deal-with-corporate-life.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:6WaysYogaHelpDealWithCorporateLife';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/Why-should-I-buy-a-critical-illness-cover.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:CriticalIllnessCover';
        break;
    case 'apollomunichinsurance.com/support/faq/after-sales-queries/modifying-the-policy/how-can-i-increase-decrease-my-sum-insured.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:IncreaseDecreaseSumAssured';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Modifying-the-policy/What-are-the-changes-that-can-be-done-during-the-m.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:ChangesMidTermPolicy';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/Are-all-the-major-corporate-hospitals-on-the-netwo.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:MajorCorporateHospitals';
        break;
    case 'apollomunichinsurance.com/blog/how-did-Apollo-Munich-Health-Insurance-develop-its-bestselling-product.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:DevelopItsBestSellingProduct';
        break;
    case 'apollomunichinsurance.com/Support/Faq/General-Queries/How-does-one-get-reimbursements-in-case-of-treatme.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:GeneralQueries:TreatmentOnNonNetworkHospitals';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/What-do-you-mean-by-pre-existing-disease-or-condit.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:PreExistingDisease';
        break;
    case 'apollomunichinsurance.com/blog/common-health-insurance-myths-part-2.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:HealthInsuranceMythsPart2';
        break;
    case 'apollomunichinsurance.com/Support/Faq/General-Queries/How-does-one-get-reimbursement-for-pre-and-post-ho.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:GeneralQueries:PrePostHospitalizationNetwork';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Claim-queries/How-will-the-payment-of-claim-be-made-in-case-of-a.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:ReimbursementClaim';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Claim-queries/Where-can-I-find-details-on-the-claims-process.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:DetailsOnClaims';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Modifying-the-policy/Can-the-insured-add-Critical-Illness-Rider-in-the.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:CriticalIllnessRider';
        break;
    case 'apollomunichinsurance.com/Support/Faq/General-Queries/Are-there-any-charges-by-the-hospital,-which-are-n.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:GeneralQueries:ReimbursementQuery';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/If-I-avail-cashless-facility,-will-you-pay-the-ent.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:PayEnt';
        break;
    case 'apollomunichinsurance.com/blog/what-makes-Optima-Restore-special.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:OptimaRestoreSpecial';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/What-do-you-mean-by-Pre-and-Post-hospitalization.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:PrePostHospitalization';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/Who-is-our-Health-TPA.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:HealthTpa';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Renewals/Is-there-a-grace-period-available-for-renewal-post.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:GracePeriodForRenewal';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Cancellation-queries/Can-I-cancel-my-policy-immediately-after-policy-is.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:CancelPolicyAfterIssue';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Modifying-the-policy/test2.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:AddRemoveMemberExistingPolicy';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Renewals/How-can-I-renew-my-policy-online.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:RenewPolicyOnline';
        break;
    case 'apollomunichinsurance.com/Support/Faq/General-Queries/How-will-the-payment-of-claim-be-made.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:GeneralQueries:PaymentClaimMade';
        break;
    case 'apollomunichinsurance.com/Support/Faq/General-Queries/Is-Health-check-up-covered-under-this-policy.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:GeneralQueries:HealthCheckQuery';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/Do-you-offer-individual-policies-and-group-policie.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:OfferIndividualGroupPolicies';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/What-is-a-waiting-period.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:WaitingPeriod';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/Why-should-I-buy-Overseas-Travel-Insurance.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:BuyOverseasTravelInsurance';
        break;
    case 'apollomunichinsurance.com/Support/Faq/General-Queries/How-to-make-intimation.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:GeneralQueries:MakeIntimation';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/Do-I-have-to-undergo-any-medical-examination.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:UndergoMedicalExamination';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/What-is-the-procedure-for-availing-cashless-benefi.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:AvailingCashlessBenefits';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/What-is-a-Family-Floater-plan.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:FamilyFloaterPlan';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/What-is-the-basic-difference-between-individual-an.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:Difference';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/Who-pays-for-the-medical-examination.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PreSales:PayMedicalExamination';
        break;
    case 'apollomunichinsurance.com/blog/things-you-need-to-know-about-cancer.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:ThingsAboutCancer';
        break;
    case 'apollomunichinsurance.com/Blog/Travel-Insurance/May-2016.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:TravelInsurance:May2016';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Contacting-Apollo-Munich/How-can-I-contact-Apollo-Munich.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:ContactHow';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Renewal-benefits/If-insured-has-changed-his-plan-in-the-subsequent.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:QueryOnWaitingPeriod';
        break;
    case 'apollomunichinsurance.com/Support/Faq/After-Sales-Queries/Renewals/Will-my-premium-change-at-the-time-of-renewal.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:PostSalesQueries:PremiumChangeAtRenewal';
        break;
    case 'apollomunichinsurance.com/Support/Faq/General-Queries/What-are-the-benefits-of-your-health-card.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:GeneralQueries:HealthCardBenefits';
        break;
    case 'apollomunichinsurance.com/Support/Faq/Pre-Sales-Queries/What-is-Co-Payment.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:CustomerService:CoPayment';
        break;
    case 'apollomunichinsurance.com/Blog/Travel-Insurance/June-2016/6-Ways-Yoga-Can-Help-You-Deal-With-Corporate-Life.aspx':
        SC_PageName = 'AMHI:FaqsAndBlogs:TravelInsurance:June2016';
        break;

        /*Health Insurance*/

    case 'apollomunichinsurance.com/':
        SC_PageName = 'AMHI:Home';
        break;
    case 'apollomunichinsurance.com/about-dengue-care-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Details:Individual:DengueCare';
        break;
    case 'apollomunichinsurance.com/about-energy-health-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Details:Individual:Energy';
        break;
    case 'apollomunichinsurance.com/about-maxima-health-insurance-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Details:Individual:Maxima';
        break;
    case 'apollomunichinsurance.com/about-optima-cash.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Details:Individual:OptimaCash';
        break;
    case 'apollomunichinsurance.com/about-optima-plus.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Details:Individual:OptimaPlus';
        break;
    case 'apollomunichinsurance.com/about-optima-restore-floater.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Details:Family:OptimaRestore';
        break;
    case 'apollomunichinsurance.com/about-optima-restore-individual.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Details:Individual:OptimaRestore';
        break;
    case 'apollomunichinsurance.com/about-optima-super-family-health-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Details:Family:OptimaSuper';
        break;
    case 'apollomunichinsurance.com/about-optima-super-individual-health-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Details:Individual:OptimaSuper';
        break;
    case 'apollomunichinsurance.com/about-optima-vital-individual-health-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Details:Individual:OptimaVital';
        break;
    case 'apollomunichinsurance.com/apollo-munich-diabetes-plan-energy.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:Energy';
        break;
    case 'apollomunichinsurance.com/buy-family-health-insurance-plans.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Buy:Family';
        break;
    case 'apollomunichinsurance.com/buy-health-insurance-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Buy:Plans';
        break;
    case 'apollomunichinsurance.com/buy-individual-health-insurance-plans.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Buy:Individual';
        break;
    case 'apollomunichinsurance.com/buyonline/buy-online-login.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Buy:Login';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Login.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Buy:Login';
        break;
    case 'apollomunichinsurance.com/buyonline/Online-Renewal.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Buy:Renewal';
        break;
    case 'apollomunichinsurance.com/dengue-care-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:DengueCare';
        break;
    case 'apollomunichinsurance.com/dengue-care-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Individual:DengueCare';
        break;
    case 'apollomunichinsurance.com/exclusive-family-health-insurance.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Family:EasyExclusive';
        break;
    case 'apollomunichinsurance.com/exclusive-individual-health-insurance.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:EasyExclusive';
        break;
    case 'apollomunichinsurance.com/family-easy-health-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Family:Floater:Standard';
        break;
    case 'apollomunichinsurance.com/family-health-insurance-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Family';
        break;
    case 'apollomunichinsurance.com/family-health-insurance-plans.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Family:PlansComparison';
        break;
    case 'apollomunichinsurance.com/family-optima-super-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Family:OptimaSuperFloater';
        break;
    case 'apollomunichinsurance.com/health-family-exclusive-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Family:Exclusive';
        break;
    case 'apollomunichinsurance.com/health-family-premium-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Family:EasyPremium';
        break;
    case 'apollomunichinsurance.com/health-family-standard-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Family:EasyStandard';
        break;
    case 'apollomunichinsurance.com/health-individual-exclusive-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:Exclusive';
        break;
    case 'apollomunichinsurance.com/health-individual-premium-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:EasyPremium';
        break;
    case 'apollomunichinsurance.com/health-individual-standard-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:EasyStandard';
        break;
    case 'apollomunichinsurance.com/health-insurance-plans.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans';
        break;
    case 'apollomunichinsurance.com/individual-easy-health-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Individual:Standard';
        break;
    case 'apollomunichinsurance.com/individual-health-insurance-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual';
        break;
    case 'apollomunichinsurance.com/individual-health-insurance-policies.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:Comparison';
        break;
    case 'apollomunichinsurance.com/individual-optima-super-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Individual:OptimaSuper';
        break;
    case 'apollomunichinsurance.com/individual-optima-vital-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Individual:OptimaVital';
        break;
    case 'apollomunichinsurance.com/maxima-health-insurance-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:Maxima';
        break;
    case 'apollomunichinsurance.com/maxima-health-plan-premium-details.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:Maxima:Premium';
        break;
    case 'apollomunichinsurance.com/optima-cash.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:OptimaCash';
        break;
    case 'apollomunichinsurance.com/optima-cash-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Individual:OptimaCash:Premium';
        break;
    case 'apollomunichinsurance.com/optima-plus.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:OptimaPlus';
        break;
    case 'apollomunichinsurance.com/optima-plus-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Individual:OptimaPlus';
        break;
    case 'apollomunichinsurance.com/optima-restore-family-floater.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Family:OptimaRestore';
        break;
    case 'apollomunichinsurance.com/optima-restore-floater-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Family:OptimaRestoreFloater';
        break;
    case 'apollomunichinsurance.com/optima-restore-individual.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:OptimaRestore';
        break;
    case 'apollomunichinsurance.com/optima-restore-individual-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Individual:OptimaRestore';
        break;
    case 'apollomunichinsurance.com/optima-senior.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:OptimaSenior';
        break;
    case 'apollomunichinsurance.com/optima-super-family-health-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Family:OptimaSuper';
        break;
    case 'apollomunichinsurance.com/optima-super-individual-health-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:OptimaSuper';
        break;
    case 'apollomunichinsurance.com/optima-vital-individual-health-plan.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:OptimaVital';
        break;
    case 'apollomunichinsurance.com/premium-family-health-insurance.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Family:Premium';
        break;
    case 'apollomunichinsurance.com/premium-individual-health-insurance.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:Premium';
        break;
    case 'apollomunichinsurance.com/standard-family-health-insurance.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Family:Standard';
        break;
    case 'apollomunichinsurance.com/standard-individual-health-insurance.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Individual:Standard';
        break;
    case 'apollomunichinsurance.com/Plans/Health-Insurance/Seniors/Senior-Head.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Plans:Senior:SeniorHead';
        break;
    case 'apollomunichinsurance.com/why-health-insurance.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:WhyHealthInsurance';
        break;
    case 'apollomunichinsurance.com/buyonline/Payment-Options.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:PaymentOptions';
        break;
    case 'apollomunichinsurance.com/buyonline/Crossell-Nominee.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:CrossellNominee';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Dashboard.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Dashboard';
        break;
    case 'apollomunichinsurance.com/buyonline/BuyOnline-Proposal-Summary.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:ProposalSummary';
        break;
    case 'apollomunichinsurance.com/apollo_google/apollo_detail_thanks.asp':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:DetailsThanks';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Payment-Options.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:HealthInsurance:PaymentOptions';
        break;
    case 'apollomunichinsurance.com/buyonline/BuyOnline-Proposal-Details.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Form:ProposalDetails';
        break;
    case 'apollomunichinsurance.com/health_insurance_for_family.asp':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Form:Family:InsuredMembers';
        break;
    case 'apollomunichinsurance.com/buyonline/BuyOnline-InsuredFamily-Members-Details.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Family:InsuredMemberDetails';
        break;
    case 'apollomunichinsurance.com/buyonline/GetUserDetails.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:GetUserDetails';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Create-Proposal.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:CreateProposal';
        break;
    case 'apollomunichinsurance.com/apollo_google_lp.asp':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Form:ApolloGoogleIP';
        break;
	case 'apollomunichinsurance.com/what_we_offers.asp':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Form:WhatWeOffer';
        break;
	case 'apollomunichinsurance.com/health-insurance.asp':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Form:HealthInsuranceLP';
        break;	
    case 'apollomunichinsurance.com/buyonline/GetUserDetails-Thanks.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:GetUserDetailsThanks';
        break;
    case 'apollomunichinsurance.com/buyonline/BuyOnline-Thanks.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Thanks';
        break;
    case 'apollomunichinsurance.com/buyonline/Policy-Expired.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:PolicyExpired';
        break;
    case 'apollomunichinsurance.com/buyonline/BuyOnline-InsuredMembers-Details.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:InsuredMembersDetails';
        break;
    case 'apollomunichinsurance.com/Buyonline/Buy-Online-ChangePassword.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:ChangePassword';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Optima-Restore-Family-Calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Calculator:Family:OptimaRestore';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-User-Details.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:UserDetails';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Individual-Calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Calculator:Individual';
        break;
    case 'apollomunichinsurance.com/buyonline/Crossell-Cancelled.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:CrossellCancelled';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Optima-Restore-Individual-Calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Individual:Calculator:OptimaRestore';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Family-Calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Calculator:Family';
        break;
    case 'apollomunichinsurance.com/buyonline/Optima-Proposal-Details.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:OptimaProposalDetails';
        break;
    case 'apollomunichinsurance.com/Buyonline/terms.htm':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Terms';
        break;
    case 'apollomunichinsurance.com/buyonline/Optima-Proposal-Summary.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:OptimaProposalSummary';
        break;
    case 'apollomunichinsurance.com/buyonline/Optima-InsuredMembers-Details.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:OptimaInsuredMembersDetails';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Product.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Product';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Optima-Super-Family-Calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Calculator:Family:OptimaSuper';
        break;
    case 'apollomunichinsurance.com/tax-saving.asp':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Form:TaxSaving';
        break;	
	case 'apollomunichinsurance.com/new/tax-saving.asp':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Form:New:TaxSaving';
        break;
	case 'apollomunichinsurance.com/new/health_insurance_for_family.asp':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Form:New:Family:InsuredMembers';
        break;
	case 'apollomunichinsurance.com/new/what_we_offers.asp':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Form:New:WhatWeOffer';
        break;
	case 'apollomunichinsurance.com/new/apollo_google_lp.asp':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Form:New:ApolloGoogleIP';
        break;
    case 'apollomunichinsurance.com/buyonline/BuyOnline-PrePolicy-Check.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:PrePolicyCheck';
        break;
    case 'apollomunichinsurance.com/buyonline/Refer-Friend-Thanks.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:ReferFriendThanks';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Optima-Cash-Calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Calculator:OptimaCash';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Optima-Vital-Individual-Calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Calculator:Individual:OptimaVital';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Inconvenience.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Inconvenience';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Optima-Plus-Calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Calculator:OptimaPlus';
        break;
    case 'apollomunichinsurance.com/buyonline/index.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Index';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Payment-Options-Notifiaction.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:PaymentOptionsNotifiaction';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Dengue-Calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Calculator:Dengue';
        break;
    case 'apollomunichinsurance.com/buyonline/IVR-Dashboard.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:IVRDashboard';
        break;
    case 'apollomunichinsurance.com/buyonline/BuyOnline-CustomerService.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:CustomerService';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-Optima-Super-Individual-Calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Calculator:Individual:OptimaSuper';
        break;
    case 'apollomunichinsurance.com/Buyonline/Dengue-Thanks.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:DengueThanks';
        break;
    case 'apollomunichinsurance.com/buyonline/Policy-Cancelled.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:PolicyCancelled';
        break;
    case 'apollomunichinsurance.com/buyonline/Buy-Online-IVR-Login.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:IVRLogin';
        break;
    case 'apollomunichinsurance.com/portability-reminder-thankyou.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:PortabilityReminderThanks';
        break;
    case 'apollomunichinsurance.com/Plans/Health-Insurance/Family/Family-Head.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:FamilyHead';
        break;
    case 'apollomunichinsurance.com/Plans/Health-Insurance/Individual/Individual-3.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:IndividualHead';
        break;
    case 'apollomunichinsurance.com/buy-a-plan/portability.aspx':
        SC_PageName = 'AMHI:HealthInsurance:LoginPortal:Portability';
        break;

        /*Personal Accident*/
    case 'apollomunichinsurance.com/buyonline/calc-Online-IPA-ind.html':
        SC_PageName = 'AMHI:PersonalAccident:Calculator:Individual';
        break;

    case 'apollomunichinsurance.com/individual-personal-accident-plan.aspx':
        SC_PageName = 'AMHI:PersonalAccident:Plans:Individual';
        break;

    case 'apollomunichinsurance.com/personal-accident-insurance-plans.aspx':
        SC_PageName = 'AMHI:PersonalAccident:Plans';
        break;

    case 'apollomunichinsurance.com/personal-accident-premium-calculator.aspx':
        SC_PageName = 'AMHI:PersonalAccident:Calculator';
        break;

    case 'apollomunichinsurance.com/personal-accident-premium-premium-calculator.aspx':
        SC_PageName = 'AMHI:PersonalAccident:Calculator:Premium';
        break;

    case 'apollomunichinsurance.com/personal-accident-standard-premium-calculator.aspx':
        SC_PageName = 'AMHI:PersonalAccident:Calculator:Standard';
        break;

    case 'apollomunichinsurance.com/premium-individual-accident-insurance.aspx':
        SC_PageName = 'AMHI:PersonalAccident:Details:Individual:Premium';
        break;

    case 'apollomunichinsurance.com/premium-individual-accident-insurance-plan.aspx':
        SC_PageName = 'AMHI:PersonalAccident:Plans:Individual:Premium';
        break;

    case 'apollomunichinsurance.com/standard-individual-accident-insurance.aspx':
        SC_PageName = 'AMHI:PersonalAccident:Details:Individual:Standard';
        break;

    case 'apollomunichinsurance.com/standard-individual-accident-insurance-plan.aspx':
        SC_PageName = 'AMHI:PersonalAccident:Plans:Individual:Standard';
        break;

    case 'apollomunichinsurance.com/buyonline/BuyOnline-IPA-InsuredMembers-Details.aspx':
        SC_PageName = 'AMHI:PersonalAccident:LoginPortal:InsuredMembersDetails';
        break;

    case 'apollomunichinsurance.com/buyonline/Buy-Online-IPA-Calculator.aspx':
        SC_PageName = 'AMHI:PersonalAccident:LoginPortal:Calculator';
        break;

        /*Travel Insurance*/

    case 'apollomunichinsurance.com/about-educare-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Details:Educare';
        break;

    case 'apollomunichinsurance.com/annual-multi-trip-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:MultiTrip:Annual';
        break;
    case 'apollomunichinsurance.com/annual-multi-trip-travel-insurance-plan-comparison.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:MultiTrip:AnnualComparison';
        break;
    case 'apollomunichinsurance.com/buy-annual-multi-trip-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Buy:MultiTrip';
        break;
    case 'apollomunichinsurance.com/buy-family-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Buy:Family:Travel';
        break;
    case 'apollomunichinsurance.com/buy-individual-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Buy:Individual:Travel';
        break;
    case 'apollomunichinsurance.com/buy-senior-citizen-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Buy:SeniorCitizen';
        break;
    case 'apollomunichinsurance.com/buy-travel-insurance-plans.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Buy:Plans';
        break;
    case 'apollomunichinsurance.com/educare-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:Educare';
        break;
    case 'apollomunichinsurance.com/family-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:Family';
        break;
    case 'apollomunichinsurance.com/family-travel-insurance-plan-comparision.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:Family:Comparison';
        break;
    case 'apollomunichinsurance.com/family-travel-insurance-policies.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:Family:Policies';
        break;
    case 'apollomunichinsurance.com/individual-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:Individual';
        break;
    case 'apollomunichinsurance.com/individual-travel-insurance-plan-comparision.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:Individual:Comparison';
        break;
    case 'apollomunichinsurance.com/individual-travel-insurance-policies.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:Individual:Policies';
        break;
    case 'apollomunichinsurance.com/senior-citizen-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:SeniorCitizen';
        break;
    case 'apollomunichinsurance.com/senior-citizen-travel-insurance-plans-comparison.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:SeniorCitizen:Comparison';
        break;
    case 'apollomunichinsurance.com/senior-citizen-travel-insurance-policies.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans:SeniorCitizen:Policies';
        break;
    case 'apollomunichinsurance.com/travel-insurance-plans.aspx':
        SC_PageName = 'AMHI:TravelInsurance:Plans';
        break;
    case 'apollomunichinsurance.com/travel/Trvl-Proposal-Details.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:ProposalDetails';
        break;
    case 'apollomunichinsurance.com/travel/Travl-Proposal_Summary.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:ProposalSummary';
        break;
    case 'apollomunichinsurance.com/travel/Travl-Insurance-Members-Details.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:InsuranceMembersDetails';
        break;
    case 'apollomunichinsurance.com/travel/Travl-Nominee-Details.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:NomineeDetails';
        break;
    case 'apollomunichinsurance.com/travel/Trvl-Paymant-Option.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:PaymantOption';
        break;
    case 'apollomunichinsurance.com/travel/Trvl-Create-Proposal.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:CreateProposal';
        break;
    case 'apollomunichinsurance.com/Travel/Travl_Online_Payment_Thanks.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:PaymentThanks';
        break;
    case 'apollomunichinsurance.com/travel/buy-individual-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:Buy:Individual';
        break;
    case 'apollomunichinsurance.com/travel/buy-family-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:Buy:Family';
        break;
    case 'apollomunichinsurance.com/travel/Trvl-Referral.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:Referral';
        break;
    case 'apollomunichinsurance.com/travel/buy-annual-multi-trip-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:Buy:MultiTrip';
        break;
    case 'apollomunichinsurance.com/travel/buy-senior-citizen-travel-insurance-plan.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:Buy:SeniorCitizen';
        break;
    case 'apollomunichinsurance.com/travel/Travel-CustomerService.aspx':
        SC_PageName = 'AMHI:TravelInsurance:LoginPortal:Buy:CustomerService';
        break;

        /*About US*/

    case 'apollomunichinsurance.com/aboutus.aspx':
        SC_PageName = 'AMHI:AboutUs:Home';
        break;
    case 'apollomunichinsurance.com/aboutus/campaigns.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns';
        break;
    case 'apollomunichinsurance.com/apollo-munich-awards.aspx':
        SC_PageName = 'AMHI:AboutUs:ApolloMunichAwards';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/4-factors-that-impacted-health-insurance-industry.aspx':
        SC_PageName = 'AMHI:AboutUs:News:4FactorsImpactedHealthInsuranceIndustryIn2013';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/Apollo-Munich-expects-to-cross-1000-crore-GWP.aspx':
        SC_PageName = 'AMHI:AboutUs:News:ExpectToCross1000CroreGWPNextfinancialYear';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/apollo-munich-eyes-25-rise-in-premium-income-this-fiscal.aspx':
        SC_PageName = 'AMHI:AboutUs:News:Eyes25RiseInPremiumIncomeThisFinancialYear';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/apollo-munich-healthy-profits-from-unhealthy-people.aspx':
        SC_PageName = 'AMHI:AboutUs:News:HealthyProfitsFromUnhealthyPeople';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/apollo-munich-launches-top-up-plan-that-can-be-renewed-to-a-comprehensive-health-cover.aspx':
        SC_PageName = 'AMHI:AboutUs:News:LaunchesTopupPlanForHealthCover';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/apollo-munich-launches-two-new-insurance-plans.aspx':
        SC_PageName = 'AMHI:AboutUs:News:LaunchesTwoNewInsurancePlans';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/Apollo-Munich-to-co-sponsor-Atletico-de-Kolkata.aspx':
        SC_PageName = 'AMHI:AboutUs:News:SponsorAtleticoDeKolkata';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/apollo-munich-to-launch-new-product-for-diabetes.aspx':
        SC_PageName = 'AMHI:AboutUs:News:LaunchesNewProductForDiabetes';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/Apollo-Munich-to-spend-10-cr-on-football-centric-initiatives.aspx':
        SC_PageName = 'AMHI:AboutUs:News:ToSpend10CroreFootballInitiatives';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/decoding-health.aspx':
        SC_PageName = 'AMHI:AboutUs:News:DecodingHealth';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/health-comes-at-a-cost.aspx':
        SC_PageName = 'AMHI:AboutUs:News:HealthComesAtCost';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/I-foresee-a-trend-of-specialized-products-in-health-insurance-continuing-antony-jacob.aspx':
        SC_PageName = 'AMHI:AboutUs:News:SpecializedProducts:AntonyJacob';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/insurance-for-diabetics-first-such-policy-in-the-fray.aspx':
        SC_PageName = 'AMHI:AboutUs:News:InsuranceForDiabetics';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/leaders-cannot-be-industry-specific.aspx':
        SC_PageName = 'AMHI:AboutUs:News:LeadersCannotBeIndustrySpecific';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/New-players-must-focus-on-offering-better-service.aspx':
        SC_PageName = 'AMHI:AboutUs:News:NewPlayersFocusBetterService';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/plan-to-supplement-group-health-cover.aspx':
        SC_PageName = 'AMHI:AboutUs:News:PlanToSupplementGroupHealthCover';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/retail-business-will-be-our-focus-for-the-next-few-months.aspx':
        SC_PageName = 'AMHI:AboutUs:News:RetailBusiness:AntonyJacob';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/Sourav-Ganguly-and-Apollo-Munich-uncomplicate-football-for-children-with-special-ability-on-children.aspx':
        SC_PageName = 'AMHI:AboutUs:News:SouravGangulyAndFootBallForChildren';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/we-try-and-handhold-the-bancassurance-channel.aspx':
        SC_PageName = 'AMHI:AboutUs:News:BancassuranceChannel:AntonyJacob';
        break;
    case 'apollomunichinsurance.com/apollo-munich-in-the-news/your-path-to-easier-claims.aspx':
        SC_PageName = 'AMHI:AboutUs:News:YourPathToEasierClaims';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/logos.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:Logos';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/media-centre.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:MediaCentre';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/pressads.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:PressAds';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/ringtones.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:Ringtone';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/tvc-ads.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:TvcAds';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/tvc-ads/bengali.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:TvcAds:Bengali';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/tvc-ads/english.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:TvcAds:English';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/tvc-ads/hindi.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:TvcAds:Hindi';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/tvc-ads/tamil.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:TvcAds:Tamil';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/tvc-ads/telugu.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:TvcAds:Telugu';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/tvc-making.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:TvcMaking';
        break;
    case 'apollomunichinsurance.com/apollo-munich-media-centre.aspx':
        SC_PageName = 'AMHI:AboutUs:Media';
        break;
    case 'apollomunichinsurance.com/apollo-munich-media-centre/apollo-munich-fact-file.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:FactFile';
        break;
    case 'apollomunichinsurance.com/apollo-munich-media-centre/apollo-munich-in-the-news.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:News1';
        break;
    case 'apollomunichinsurance.com/apollo-munich-media-centre/apollo-munich-updates.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:Updates';
        break;
    case 'apollomunichinsurance.com/apollo-munich-media-centre/apollo-munich-updates/public-notice.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:Updates:PublicNotice';
        break;
    case 'apollomunichinsurance.com/apollo-munich-media-centre/spokeperson-profile.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:SpokePersonProfile';
        break;
    case 'apollomunichinsurance.com/apollo-munich-optima-restore-campaign.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore';
        break;
    case 'apollomunichinsurance.com/apollo-munich-optima-restore-campaign/pressads.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:PressAds';
        break;
    case 'apollomunichinsurance.com/apollo-munich-optima-restore-campaign/tvc-ads.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds';
        break;
    case 'apollomunichinsurance.com/apollo-munich-optima-restore-campaign/tvc-ads/2013.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2013';
        break;
    case 'apollomunichinsurance.com/apollo-munich-optima-restore-campaign/tvc-ads/2016.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016';
        break;
    case 'apollomunichinsurance.com/apollo-munich-optima-restore-campaign/tvc-ads/2016/Banana-Campaign.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Banana';
        break;
    case 'apollomunichinsurance.com/apollo-munich-optima-restore-campaign/tvc-ads/2016/Burger-Campaign.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Burger';
        break;
    case 'apollomunichinsurance.com/apollo-munich-pause-campaign.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:Pause';
        break;
    case 'apollomunichinsurance.com/apollo-munich-pause-campaign/pressads.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:Pause:PressAds';
        break;
    case 'apollomunichinsurance.com/apollo-munich-pause-campaign/tvc-ads/english.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:Pause:TvcAds:English';
        break;
    case 'apollomunichinsurance.com/apollo-munich-pause-campaign/tvc-ads/hindi.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:Pause:TvcAds:Hindi';
        break;
    case 'apollomunichinsurance.com/apollo-munich-pause-campaign-tvc-ads.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:Pause:TvcAds';
        break;
    case 'apollomunichinsurance.com/apollo-munich-press-releases.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:PressReleases';
        break;
    case 'apollomunichinsurance.com/apollo-munich-press-releases/apollo-munich-health-insurance-introduces-ENERGY.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:PressReleases:Energy';
        break;
    case 'apollomunichinsurance.com/apollo-munich-press-releases/apollo-munich-launches-optima-vital-and-optima-super.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:PressReleases:OptimaVitalSuper';
        break;
    case 'apollomunichinsurance.com/apollo-munich-press-releases/canara-bank-and-apollo-munich-health-insurance-enters-into-a-bancassurance-tie-up.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:PressReleases:BancassuranceTieUp';
        break;
    case 'apollomunichinsurance.com/apollo-munich-press-releases/canara-bank-offers-energy-the-sweetest-thing-for-people-living-with-diabetes.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:PressReleases:EnergyForDiabetes';
        break;
    case 'apollomunichinsurance.com/apollo-munich-press-releases/citibank-and-apollo-munich-to-target-over-16-million-households-with-specialized-health-insurance.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:PressReleases:16MillionHouseholds';
        break;
    case 'apollomunichinsurance.com/apollo-munich-reviews.aspx':
        SC_PageName = 'AMHI:AboutUs:Media:PressReleases:Reviews';
        break;
    case 'apollomunichinsurance.com/apollo-munich-values.aspx':
        SC_PageName = 'AMHI:AboutUs:ApolloMunichValues';
        break;
    case 'apollomunichinsurance.com/management-profile.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile';
        break;
    case 'apollomunichinsurance.com/management-profile-andrew-kielty.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:MrAndrewKielty';
        break;
    case 'apollomunichinsurance.com/management-profile-antony-jacob_6.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:MrAntonyJacob';
        break;
    case 'apollomunichinsurance.com/management-profile-bernhard-steinruecke_12.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:MrBernhardSteinruecke';
        break;
    case 'apollomunichinsurance.com/management-profile-doris-hopke.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:DrDorisHopke';
        break;
    case 'apollomunichinsurance.com/management-profile-krishnan-ramachandran_7.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:MrKrishnanRamachandran';
        break;
    case 'apollomunichinsurance.com/management-profile-mbn-rao_11.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:MrM.B.N.Rao';
        break;
    case 'apollomunichinsurance.com/management-profile-pratap-c-reddy_1.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:DrPrathapC.Reddy';
        break;
    case 'apollomunichinsurance.com/management-profile-shobana-kamineni_2.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:MsShobanaKamineni';
        break;
    case 'apollomunichinsurance.com/management-profile-sriharsha-a-achar_10.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:DrSriharshaAAchar';
        break;
    case 'apollomunichinsurance.com/management-profile-srikanth-k_9.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:MrSrikanthK';
        break;
    case 'apollomunichinsurance.com/management-profile-suneeta-reddy_3.aspx':
        SC_PageName = 'AMHI:AboutUs:ManagementProfile:MsSuneetaReddy';
        break;
    case 'apollomunichinsurance.com/our-customer-feedback.aspx':
        SC_PageName = 'AMHI:AboutUs:Testimonials';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2016/Banana-Campaign/English.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Banana:English';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2016/Banana-Campaign/Hindi.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Banana:Hindi';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2016/Banana-Campaign/Kannada.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Banana:Kannada';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2016/Banana-Campaign/Tamil.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Banana:Tamil';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2016/Banana-Campaign/Telugu.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Banana:Telugu';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2016/Burger-Campaign/English.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Burger:English';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2016/Burger-Campaign/Hindi.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Burger:Hindi';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2016/Burger-Campaign/Kannada.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Burger:Kannada';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2016/Burger-Campaign/Tamil.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Burger:Tamil';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2016/Burger-Campaign/Telugu.aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2016Burger:Telugu';
        break;
    case 'apollomunichinsurance.com/why-apollomunich-health-insurance/claims-statistics.aspx':
        SC_PageName = 'AMHI:AboutUs:Statistics';
        break;
    case 'apollomunichinsurance.com/health-insurance-our-partners/canara-bank.aspx':
        SC_PageName = 'AMHI:AboutUs:PartnersCanaraBank';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Testimonials/Akhouri-Sushant-Kumar.aspx':
        SC_PageName = 'AMHI:AboutUs:Testimonials:Akhouri';
        break;
    case 'apollomunichinsurance.com/Why-Apollo-Munich/Our-Campaigns/Optima-Restore/TVCs/2013/Benefit-(2).aspx':
        SC_PageName = 'AMHI:AboutUs:Campaigns:OptimaRestore:TvcAds:2013Benefit';
        break;

        /*Articles*/

    case 'apollomunichinsurance.com/accident-health-insurance/family-accident-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:FamilyAccident';
        break;
    case 'apollomunichinsurance.com/accident-health-insurance/group-accident-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:GroupAccident';
        break;
    case 'apollomunichinsurance.com/accident-health-insurance/individual-accident-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:IndividualAccident';
        break;
    case 'apollomunichinsurance.com/accident-health-insurance/personal-accident-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:PresonalAccident';
        break;
    case 'apollomunichinsurance.com/accident-health-insurance/travel-accident-insurance.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:TravelAccident';
        break;
    case 'apollomunichinsurance.com/accident-insurance/accident-insurance-articles-index.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:Index';
        break;
    case 'apollomunichinsurance.com/accident-insurance/a-guide-to-accident-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:Guide1';
        break;
    case 'apollomunichinsurance.com/accident-insurance/finding-correct-accident-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:FindingCorrectInsurancePolicy';
        break;
    case 'apollomunichinsurance.com/accident-insurance/personal-accident-insurance-benefits.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:PersonalAccidentBenefits';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/about-online-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:AboutHealthInsurance';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/buy-cheap-insurance-online.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:BuyCheapInsurance';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/buy-cheap-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:BuyCheapInsurancePolicy';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/buying-insurance.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:BuyingInsurance';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/buy-insurance-online-articles-index.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:BuyInsuranceArticles';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/choosing-online-health-insurance-plans.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:HowToOptForHealthInsurancePlans';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/free-health-insurance-quotes-online.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:GetYourFreeHealthInsuranceQuotes';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/get-online-insurance.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:Get';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/health-policy-protects-from-medical-concerns.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:RightHealthPolicyProtectsFromMedicalConcerns';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/instant-insurance-online.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:InstantInsurance';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/need-to-buy-overseas-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:NeedToBuyOverseasHealthInsurance';
        break;
    case 'apollomunichinsurance.com/buy-insurance-online/when-buying-online-health-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:BuyInsuranceOnline:ThingsToConsiderBuyingHealthInsurance';
        break;
    case 'apollomunichinsurance.com/corporate-health-insurance/corporate-health-insurance-index.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Corporate';
        break;
    case 'apollomunichinsurance.com/corporate-health-insurance/employee-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Employee';
        break;
    case 'apollomunichinsurance.com/corporate-health-insurance/group-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Group';
        break;
    case 'apollomunichinsurance.com/easy-domestic-travel.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:EasyDomestic';
        break;
    case 'apollomunichinsurance.com/health-care/affordable-health-care.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:AffordableHealthCare';
        break;
    case 'apollomunichinsurance.com/health-care/basic-health-care.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:BasicHealthCare';
        break;
    case 'apollomunichinsurance.com/health-care/comprehensive-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:ComprehensiveHealthCare';
        break;
    case 'apollomunichinsurance.com/health-care/good-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:GoodHealthCare';
        break;
    case 'apollomunichinsurance.com/health-care/health-care-articles-index.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:Index';
        break;
    case 'apollomunichinsurance.com/health-care/healthcare-coverage.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:Coverage';
        break;
    case 'apollomunichinsurance.com/health-care/healthcare-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:Insurance';
        break;
    case 'apollomunichinsurance.com/health-care/healthcare-plan.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:Plan';
        break;
    case 'apollomunichinsurance.com/health-care/health-medicalcare.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:HealthandMedicalCare';
        break;
    case 'apollomunichinsurance.com/health-care/innovative-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:Innovative';
        break;
    case 'apollomunichinsurance.com/health-care/personal-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:Personal';
        break;
    case 'apollomunichinsurance.com/health-care/private-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:Private';
        break;
    case 'apollomunichinsurance.com/health-care/senior-healthcare-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:SeniorInsurance';
        break;
    case 'apollomunichinsurance.com/health-care/the-best-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:Thebest';
        break;
    case 'apollomunichinsurance.com/health-care/total-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare:Total';
        break;
    case 'apollomunichinsurance.com/health-insurance/affordable-family-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:AffordableFamily';
        break;
    case 'apollomunichinsurance.com/health-insurance/affordable-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Affordable';
        break;
    case 'apollomunichinsurance.com/health-insurance/best-insurance-online.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:BestInsurance';
        break;
    case 'apollomunichinsurance.com/health-insurance/best-insurance-policy-for-kids.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:BestInsurancePolicyforKids';
        break;
    case 'apollomunichinsurance.com/health-insurance/buy-from-authorized-health-insurance-agents.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:BuyInsuranceAuthorizedAgents';
        break;
    case 'apollomunichinsurance.com/health-insurance/cheap-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Cheap';
        break;
    case 'apollomunichinsurance.com/health-insurance/find-health-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:FindPolicy';
        break;
    case 'apollomunichinsurance.com/health-insurance/get-free-individual-health-insurance-policy-quotes.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:GetFreeIndividualPolicyQuotes';
        break;
    case 'apollomunichinsurance.com/health-insurance/get-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Get';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-adviser.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Healthadviser';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-care-policy-secure-against-health-issues.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:HealthCareAgainstHealthConcerns';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-cover.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:HealthCover';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-an-emerging-market.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:IsAnEmergingMarketInIndia';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-articles-index.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Index';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-benefits.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Benefits';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-claim.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Claim';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-companies.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Companies';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-costs.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Costs';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-for-self-employed.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ForSelfEmployed';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-in-banglore-chennai-hyderabad.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ForSouthIndians';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-in-kolkata.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:OptionsInKolkataNorthEast';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-options.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Options';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-premium.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Premium';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-price.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Price';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-rate.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Rate';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-insurance-website.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Website';
        break;
    case 'apollomunichinsurance.com/health-insurance/health-safety-policies.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:HealthAndSafety';
        break;
    case 'apollomunichinsurance.com/health-insurance/indian-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Indian';
        break;
    case 'apollomunichinsurance.com/health-insurance/individual-health-coverage.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:IndividualHealthcoverage';
        break;
    case 'apollomunichinsurance.com/health-insurance/instant-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Instant';
        break;
    case 'apollomunichinsurance.com/health-insurance/insurance-health.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:InsuranceHealth';
        break;
    case 'apollomunichinsurance.com/health-insurance/international-health-insurance-plans-worth-considering.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:HowInternationalPlansIsWorthConsidering';
        break;
    case 'apollomunichinsurance.com/health-insurance/medicare-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Medicare';
        break;
    case 'apollomunichinsurance.com/health-insurance/offers-from-indian-insurance-companies.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:RichAndVariedOfferingsByIndianInsuranceCompanies';
        break;
    case 'apollomunichinsurance.com/health-insurance/online-health-insurance-policy-quotes.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:PolicyQuotes';
        break;
    case 'apollomunichinsurance.com/health-insurance/parents-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Parents';
        break;
    case 'apollomunichinsurance.com/health-insurance/private-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Private';
        break;
    case 'apollomunichinsurance.com/health-insurance/searching-best-health-insurance-company.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:BestCompanyInIndia';
        break;
    case 'apollomunichinsurance.com/health-insurance/senior-health-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:SeniorPlan';
        break;
    case 'apollomunichinsurance.com/health-insurance/visitor-health-insurnce-is-important.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:WhyVisitorMakesALotOfSense';
        break;
    case 'apollomunichinsurance.com/health-insurance/women-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:WomenPlan';
        break;
    case 'apollomunichinsurance.com/health-insurance-articles.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:Articles';
        break;
    case 'apollomunichinsurance.com/insurance/cheap-family-insurance.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:CheapFamily';
        break;
    case 'apollomunichinsurance.com/insurance/find-insurance.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:Find';
        break;
    case 'apollomunichinsurance.com/insurance/get-instant-insurance.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:GetInstant';
        break;
    case 'apollomunichinsurance.com/insurance/get-insurance.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:Get';
        break;
    case 'apollomunichinsurance.com/insurance/good-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:GoodPlan';
        break;
    case 'apollomunichinsurance.com/insurance/insurance-articles-index.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:Index';
        break;
    case 'apollomunichinsurance.com/insurance/insurance-benefits.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:Benefits';
        break;
    case 'apollomunichinsurance.com/insurance/insurance-coverage.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:Coverage';
        break;
    case 'apollomunichinsurance.com/insurance/insurance-provider.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:Provider';
        break;
    case 'apollomunichinsurance.com/insurance/top-10-insurance-companies.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:Top10Companies';
        break;
    case 'apollomunichinsurance.com/insurance-articles.aspx':
        SC_PageName = 'AMHI:Articles:Insurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/accident-insurance-assistance-during-unexpected-mishaps-of-life.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:AssistanceDuringUnexpectedMishapsOfLife';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/accident-insurance-for-those-unseen-problems.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:ForThoseUnseenProblems';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/accident-insurance-policy-to-offer-complete-coverage-after-an-accident.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:PolicyOfferCompleteCoverageAfterAnAccident';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/accident-insurance-the-right-way-to-secure-yourself.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:TheRightWaySecureYourself';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/accident-insurance-to-cope-with-the-loss.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:CopeWithLoss';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/all-about-accident-insurance.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:AllAbout';
        break;
    case 'www.apollomunichinsuranom/insurance-articles/accident-insurance/apollo-munich-ipa-individual-personal-accident-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:IndividualPersonalAccidentInsurancePlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/benefits-offered-by-apollo-munich-individual-personal-accident-insurance.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:IndividualPersonalAccidentInsuranceOffers';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/enjoy-the-beneficial-coverage-with-group-accident-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:EnjoyTheBeneficialCoverageWithGroup';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/guide-to-accident-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:Guide2';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/how-do-you-cope-after-an-accident.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:HowDoYouCopeAfterAnAccident';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/individual-personal-accident-insurance-offers-cover-to-all-medical-needs-of-a-person.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:IPAOffersCoverAllMedicalNeedsOfPerson';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/ipa-the-best-in-class-accident-insurance-product.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:TheBestInClass';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/pay-affordable-premium-to-buy-a-personal-accident-policy.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:PayAffordablePremiumToBuyPersonalAccidentPolicy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/personal-accident-insurance-accidents-are-easy-to-deal-with.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:AccidentsEasyToDealWith';
        break;
    case 'apollomunichinsurance.com/insurance-articles/accident-insurance/stay-secured-with-an-accident-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:AccidentInsurance:StaySecured';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles.aspx':
        SC_PageName = 'AMHI:Articles:General';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/are-you-in-need-of-health-insurance-for-low-income.aspx':
        SC_PageName = 'AMHI:Articles:General:NeedofHealthInsuranceLowIncome';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/are-you-wondering-where-to-buy-medical-insurance-from.aspx':
        SC_PageName = 'AMHI:Articles:General:WonderingWhereToBuyMedicalInsuranceFrom';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/benefits-you-can-enjoy-with-family-floater-insurance.aspx':
        SC_PageName = 'AMHI:Articles:General:BenefitsYouEnjoyWithFamilyFloaterInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/cashless-insurance-in-india-the-most-liked-facility.aspx':
        SC_PageName = 'AMHI:Articles:General:CashlessMostLikedFacility';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/complete-insurance-for-the-family.aspx':
        SC_PageName = 'AMHI:Articles:General:CompleteInsuranceFamily';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/different-policies-of-insurance-provide-different-kind-of-policies.aspx':
        SC_PageName = 'AMHI:Articles:General:DifferentPoliciesDifferentCoverage';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/find-an-answer-for-how-to-get-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:General:FindAnAnswerGetHealthInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/from-where-can-you-get-free-insurance-quotes.aspx':
        SC_PageName = 'AMHI:Articles:General:GetFreeInsuranceQuotes';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/get-insurance-policy-quotes-in-few-clicks-of-mouse.aspx':
        SC_PageName = 'AMHI:Articles:General:GetInsurancePolicyQuotesMouseClicks';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/gifting-peace-of-mind.aspx':
        SC_PageName = 'AMHI:Articles:General:GiftingPeaceOfMind';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/have-you-read-insurance-details-before-investing.aspx':
        SC_PageName = 'AMHI:Articles:General:HaveYouReadInsuranceDetailsBeforeInvesting';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/how-to-acquire-health-insurance-information.aspx':
        SC_PageName = 'AMHI:Articles:General:AcquireHealthInsuranceInformation';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/how-to-differentiate-amongst-the-several-health-insurance-policies.aspx':
        SC_PageName = 'AMHI:Articles:General:DifferentiateAmongstSeveralHealthInsurancePolicies';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/how-to-find-best-health-policy-for-family.aspx':
        SC_PageName = 'AMHI:Articles:General:FindBestHealthPolicyFamily';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/how-to-get-all-health-insurance-information.aspx':
        SC_PageName = 'AMHI:Articles:General:GetHealthInsuranceInformation';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/how-to-get-quotes-for-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:General:GetQuotesHealthCare';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/how-to-make-the-payment-while-buying-insurance-online.aspx':
        SC_PageName = 'AMHI:Articles:General:MakePaymentWhileBuyingInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/how-to-make-the-right-choice.aspx':
        SC_PageName = 'AMHI:Articles:General:MakeRightChoice';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/know-all-about-your-health-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:General:AboutYourHealthInsurancePolicy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/know-more-about-medical-insurance-for-senior-citizen.aspx':
        SC_PageName = 'AMHI:Articles:General:AboutMedicalInsuranceForSeniorCitizens';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/packed-and-ready-to-go.aspx':
        SC_PageName = 'AMHI:Articles:General:PackedAndReadyToGo';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/pick-the-plan-with-the-right-coverage-for-you.aspx':
        SC_PageName = 'AMHI:Articles:General:PickPlanWithRightCoverage';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/selecting-the-right-plan.aspx':
        SC_PageName = 'AMHI:Articles:General:SelectingRightPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/the-right-investment.aspx':
        SC_PageName = 'AMHI:Articles:General:RightInvestment';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/the-whole-family-can-be-covered-by-one-policy.aspx':
        SC_PageName = 'AMHI:Articles:General:WholeFamilyOnePolicy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/understanding-the-plan-and-coverage.aspx':
        SC_PageName = 'AMHI:Articles:General:UnderstandingPlanAndCoverage';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/what-are-the-benefits-offered-by-family-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:General:BenefitsOfferedByFamilyHealthInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/what-are-the-insurance-options-in-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:General:InsuranceOptionsInHealthcare';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/what-is-cashless-mediclaim.aspx':
        SC_PageName = 'AMHI:Articles:General:CashlessMediclaim';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/what-is-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:General:HealthInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/what-is-medical-insurance-for-accident.aspx':
        SC_PageName = 'AMHI:Articles:General:MedicalInsuranceForAccident';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/what-is-the-difference-between-healthcare-cost-and-health-insurance-premium.aspx':
        SC_PageName = 'AMHI:Articles:General:DifferenceBetweenHealthcareCostAndHealthInsurancePremium';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/what-is-the-role-played-by-an-accident-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:General:RolePlayedByAnAccidentInsurancePlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/which-health-insurance-is-best.aspx':
        SC_PageName = 'AMHI:Articles:General:BestHealthInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/which-is-the-best-health-insurance-plan-for-family.aspx':
        SC_PageName = 'AMHI:Articles:General:BestHealthInsurancePlanFamily';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/which-is-the-best-medical-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:General:BestMedicalInsurancePlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/why-has-medical-insurance-become-a-necessity.aspx':
        SC_PageName = 'AMHI:Articles:General:MedicalInsuranceBecomeNecessity';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/why-is-health-insurance-comparison-important.aspx':
        SC_PageName = 'AMHI:Articles:General:HealthInsuranceComparisonImportant';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/why-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:General:MedicalInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/why-understanding-the-plan-is-important.aspx':
        SC_PageName = 'AMHI:Articles:General:UnderstandingPlansImportant';
        break;
    case 'apollomunichinsurance.com/insurance-articles/general-articles/worried-about-the-quality-coverage-of-a-cheap-insurance.aspx':
        SC_PageName = 'AMHI:Articles:General:WorriedAboutQualityCoverageOfCheapInsurancePolicy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare.aspx':
        SC_PageName = 'AMHI:Articles:HealthCare';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/acquire-lifetime-health-security-with-an-affordable-healthcare-plan.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:AcquireLifetimeHealthSecurityWithAffordablePlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/additional-healthcare-coverage-with-optima-cash-a-top-up-plan.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:AdditionalCoverageOptimaCashATopupPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/cashless-hospitalization-for-easy-access-to-health.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:CashlessHospitalizationForEasyAccess';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/complete-healthcare-coverage-with-easy-health.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:CompleteCoverageWithEasyHealth';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/comprehensive-healthcare-with-maxima.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:ComprehensiveWithMaxima';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/enjoy-healthcare-coverage-with-easy-health-and-Optima-cash.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:EnjoyCoverageWithEasyHealthAndOptimaCash';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/enjoy-total-healthcare-coverage-with-reimburse.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:EnjoyTotalCoverageWithReimbursementBenefits';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/family-healthcare-plan-secures-your-dear-ones-from-health-uncertainties.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:FamilyPlanSecuresYourDearOnesFromHealthUncertainties';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/getting-healthcare-within-everyones-reach.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:GettingWithinEveryoneReach';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/healthcare-charges-are-easy-to-manage-with-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:ChargesAreEasyToManage';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/healthcare-insurance-to-keep-you-away-from-medical-anxieties.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:InsuranceToKeepYouAwayFromMedicalAnxieties';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/healthcare-plans-for-one-and-all.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:PlansForOneAll';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/healthcare-plans-should-be-made-mandatory-for-all.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:PlansShouldBeMadeMandatoryForAll';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/healthcare-with-unbelievable-benefits.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:WithUnbelievableBenefits';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/health-coverage-the-need.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:TheNeed';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/health-insurer-a-partner-in-times-of-medical-emergency.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:APartnerInTimesOfMedicalEmergency';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/how-to-get-hold-of-the-best-healthcare-plan.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:GetHoldOfBestPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/how-well-do-you-know-your-plan.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:HowWellDoYouKnowYourPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/identifying-the-best-healthcare-plan-for-quality-services.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:TheBestPlanForQualityServices';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/understanding-the-health-cover.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:Understanding';
        break;
    case 'apollomunichinsurance.com/insurance-articles/healthcare/would-you-rather-deal-with-healthcare-costs-or-health-insurance-costs.aspx':
        SC_PageName = 'AMHI:Articles:Healthcare:DealWithCostsOrHealthInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/a-blanket-to-keep-people-away-from-financial-stress.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:BlanketToKeepPeopleAwayFromFinancialStress';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/additional-services-offered-along-with-health-insurance-products.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:AdditionalServicesOfferedAlongWithProducts';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/a-gift-for-the-family.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:FloaterPlansGiftFamily';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/are-health-insurance-plans-affordable.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ArePlansAffordable';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/are-people-serious-about-healthcare-expenses.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ArePeopleSeriousAboutHealthcareExpenses';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/a-secure-family-financial-plan-with-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:SecureFamilyFinancialPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/a-variety-of-health-insurance-products.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:AVarietyOfProducts';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/basic-health-insurance-for-a-secured-future.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:BasicForSecuredFuture';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/buy-a-health-insurance-policy-to-seek-quality-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:BuyPolicyToSeekQualityHealthcare';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/buying-health-insurance!-don%E2%80%99t-focus-only-on-premium.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:BuyingDontFocusOnlyPremium';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/compare-health-insurance-plans-to-make-your-decision.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ComparePlansMakeDecision';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/comparing-health-insurance-plans.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ComparingPlans';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/comprehensive-health-insurance-coverage-by-india%E2%80%99s-first-360-degree-plan.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ComprehensiveCoverageIndiaFirst360DegreePlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/coverage-of-health-insurance-for-self-employed.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:CoverageOffOrSelfEmployed';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/different-kinds-of-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:DifferentKinds';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/do-you-have-complete-family-coverage.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:DoYouHaveCompleteFamilyCoverage';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/entrepreneurs-take-time-out-for-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:EntrepreneursTakeTimeOut';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/exclusions-of-a-health-policy.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ExclusionsHealthPolicy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/family-health-insurance-coverage-for-you-and-your-dependents.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:FamilyCoverageAndDependents';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/have-access-to-better-healthcare-with-quality-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:HaveAccessToBetterHealthcareWithQuality';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/health-insurance-company-has-a-major-role-to-play.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:CompanyHasAMajorRoleToPlay';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/health-insurance-in-the-digital-world.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:DigitalWorld';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/health-insurance-is-simple.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:IsSimple';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/health-insurance-life-made-easier.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:LifeMadeEasier';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/health-insurance-no-confusion.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:NoConfusion';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/health-insurance-plan-and-a-long-list-of-benefits.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:PlanAndBenefits';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/health-insurance-rates!-can-easily-be-afforded.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:RatesCanEasilyBeAfforded';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/help-yourself-to-health-insurance-over-the-internet.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:HelpYourselfOverInternet';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/how-to-choose-low-cost-health-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ChooseLowCostPolicy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/how-to-find-the-right-health-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:FindRightPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/insure-health-and-save-tax.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:InsureHealthAndSaveTax';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/know-about-your-health-insurance-premium.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:KnowAboutYourPremium';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/online-insurance-companies-a-boost-to-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:OnlineInsuranceCompaniesBoost';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/optima-cash-completes-your-health-coverage.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:OptimaCashCoverage';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/points-to-consider-before-buying-health-insurance-from-an-agent.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:PointsConsiderBeforeBuyingFromAgent';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/points-to-ponder-over-while-choosing-a-cheap-health-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:PointsPonderOverWhileChoosingCheapPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/points-to-remember-while-buying-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:PointsRememberWhileBuying';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/should-I-buy-health-insurance-at-later-stages-of-life.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ShouldIBuyAtLaterStagesOfLife';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/steady-growth-of-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:SteadyGrowth';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/the-causes-for-the-rejection-of-health-insurance-claims.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:CausesForRejectionOfClaims';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/the-need-to-buy-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:NeedToBuy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/the-need-to-spread-health-insurance-awareness.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:NeedToSpreadAwareness';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/the-right-investment-when-starting-your-career.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:RightInvestmentWhenStartingYourCareer';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/understanding-the-health-insurance-plan-saves-time.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:UnderstandingPlanSavesTime';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/what-are-the-characteristics-of-the-best-health-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:CharacteristicsOfBestPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/what-are-the-different-ways-to-buy-a-health-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:DifferentWaysBuyPolicy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/why-should-everyone-get-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:WhyShouldEveryoneGet';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/complete-protection-from-medical-care-costs.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:CompleteProtectionFromCosts';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/critical-illness-cover-an-additional-medical-insurance-benefit.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:CriticalIllnessCoverAdditionalBenefit';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/curtail-down-your-worries-with-medical-insurance-plans.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:CurtailDownYourWorriesWithPlans';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/easy-access-to-medical-care.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:EasyAccess';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/easy-health-the-best-medical-care-plan.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:EasyHealthBestPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/enjoy-medical-care-benefits-twice-in-a-policy-period.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:EnjoyBenefitsTwiceInPolicyPeriod';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/enjoy-medical-insurance-benefits-with-optima-restore-and-optima-plus.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:EnjoyBenefitsOptimaRestoreAndPlus';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/financial-coverage-against-medical-contingencies.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:FinancialCoverageAgainstMedicalContingencies';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/get-comprehensive-medical-care-with-india-first-360-degree-plan.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:ComprehensiveIndiaFirst360DegreePlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/health-insurers-improving-the-condition-of-medical-insurance-in-india.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:HealthInsurersImprovingConditionIndia';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/is-medical-care-for-the-family-too-expensive.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:FamilyTooExpensive';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/know-about-the-right-time-to-buy-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:KnowAboutRightTimeToBuy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/let-medical-insurance-policy-be-your-gift-to-your-family-this-time.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:LetPolicyGiftYourfamily';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/maxima-the-comprehensive-medical-coverage.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:MaximaComprehensiveMedicalCoverage';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/medical-care-india-affordable-with-medical-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:AffordableWithPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/medical-care-the-growing-need.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:GrowingNeed';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/medical-coverage-under-health-insurance-floater-plans-for-you-and-your-dependants.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:MedicalCoverageUnderHealthInsuranceFloaterPlans';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/medical-cover-a-good-gift-idea-for-loved-ones.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:GoodGiftIdeaForLovedOnes';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/medical-insurance-an-important-requirement-of-life.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:ImportantRequirementOfLife';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/medical-insurance-cost-is-it-the-only-factor-to-be-considered.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:OnlyFactorForConsideration';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/medical-plans-for-accidental-health-risks.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:AccidentalHealthRisks';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/medical-policy-offers-a-long-list-of-benefits.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:OffersLongListOfBenefits';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/overall-coverage-with-easy-health-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:OverallCoverageWithEasyHealth';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/ready-to-finance-your-medical-expenses.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:ReadyToFinanceYourMedicalExpenses';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/right-time-to-buy-medical-cover.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:RightTimeToBuyMedicalCover';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/the-need-and-significance-of-a-medical-policy-in-india.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:NeedAndSignificanceMedicalPolicyIndia';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/the-right-way-to-tackle-medical-expenses.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:RightWayToTackleMedicalExpenses';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/the-smarter-way-to-deal-with-medical-expenses.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:SmarterWayDealMedicalExpenses';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/top-up-plans-for-extra-medical-care.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:TopupPlansExtra';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/what-is-the-right-age-to-buy-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:RightAgeToBuy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/medical-insurance/why-should-a-person-buy-mediclaim-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:WhyShouldPersonBuyMediclaim';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/an-easy-way-to-get-your-medical-expenditure-financed.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:EasyWayToGetYourMedicalExpenditureFinanced';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/are-you-waiting-for-the-right-time-to-buy-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:WaitingRightTimeBuyHealthInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/benefits-of-reimbursement.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:BenefitsOfReimbursement';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/coverage-offered-by-a-mediclaim-policy.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:CoverageOffered';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/critical-illness-cover-for-people-looking-for-extra-protection.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:CriticalIllnessCoverForPeopleLookingExtraProtection';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/different-mediclaim-plans-for-different-people.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:DifferentPlansForDifferentPeople';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/does-your-mediclaim-include-critical-illness-cover.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:DoesIncludeCriticalIllnessCover';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/do-you-think-that-mediclaim-amount-is-higher-than-the-medical-care-cost.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:IsHigherThanMedicalCareCost';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/enjoy-a-secured-life-under-the-protection-of-a-medical-cover.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:EnjoySecuredLifeUnderProtectionOfMedicalCover';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/enjoy-the-best-healthcare-with-a-mediclaim-plan.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:EnjoyBestHealthcareWithPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/factors-to-be-considered-while-buying-a-mediclaim-policy.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:FactorsConsidered';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/get-mediclaim-get-additional-cover.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:GetAdditionalCover';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/get-your-family-secured-under-an-affordable-mediclaim-plan.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:FamilySecuredUnderAffordablePlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/get-your-parents-and-children-insured-in-a-single-health-plan.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:ParentsAndChildrenInsuredInSingleHealthPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/how-does-cashless-mediclaim-help.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:DoesCashlessMediclaimHelp';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/how-is-mediclaim-policy-useful-to-all.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:MediclaimPolicyUsefulToAll';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/invest-in-mediclaim-plan-of-your-choice.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:PlanOfYourChoice';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/kind-of-coverage-critical-illness-cover-offers.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:KindOfCoverageCriticalIllnessCoverOffers';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/kinds-of-mediclaim-plans.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:KindsOfPlans';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/lifetime-health-security-with-an-affordable-mediclaim-plan.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:LifetimeHealthSecurityWithAnAffordableMediclaimPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/medical-insurance-plans-for-a-healthy-future.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:PlansHealthyFuture';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/mediclaim-a-way-towards-a-secured-future.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:AwayTowardsSecuredFuture';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/mediclaim-a-wise-investment.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:WiseInvestment';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/mediclaim-for-family-is-the-best-way-to-provide-a-secured-future-to-your-dear-ones.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:FamilyBestWaytoProvideSecuredFuture';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/mediclaim-with-cashless-access.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:MediclaimWithCashlessAccess';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/modes-of-reimbursement.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:ModesOfReimbursement';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/take-care-of-your-health-With-a-best-mediclaim-plan.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:TakeCareOfHealthWithBestPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/understand-the-health-insurance-plan-before-buying.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:UnderstandHealthInsurancePlanBeforeBuying';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/understand-the-policy-well.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:UnderstandPolicyWell';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/what-all-does-a-mediclaim-policy-covers.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:WhatAllDoesMediclaimPolicyCovers';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/access-the-health-insurance-sites-to-choose-the-best-plan-in-much-less-time.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:AccessHealthInsuranceSites';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/an-easy-access-to-health-cover.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:EasyAccessToHealthCover';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/an-easy-and-safe-method.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:EasyAndSafeMethod';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/are-you-skeptical-of-online-portal-security.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:SkepticalPortalSecurity';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/a-safe-mode-of-getting-insured.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:SafeModeGettingInsured';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/benefits-of-online-insurance.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:Benefits';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/cashless-hospitalization-medical-treatment-made-easy.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:CashlessHospitalizationTreatmentMadeEasy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/choose-the-best-health-product-get-extended-coverage.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:BestHealthProduct';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/compare-the-health-products-at-easy-access.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:CompareHealthProductsEasyAccess';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/devote-a-few-minutes-and-avail-the-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:DevoteFewMinutesAvailPlanEasily';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/get-free-insurance-quotes-and-compare-the-plans-accordingly.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:GetFreeInsuranceQuotesComparePlans';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/get-instant-cover.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:GetInstantCover';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/get-online-insurance-and-save-your-time.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:GetOnlineInsuranceSaveYourTime';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/healthcare-online-unfolds-the-uncomplicated-way-to-a-quality-health-cover.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:UnfoldUncomplicatedWayQualityHealthCover';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/health-insurance-available-at-your-convenience.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:AvailableAtConvenience';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/health-insurance-online.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:HealthInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/health-insurance-providers-comes-to-you-by-online-mode.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:HealthInsuranceProvidersComesToYou';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/how-to-buy-health-insurance-online.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:BuyHealthInsuranceOnline';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/instant-health-cover-a-facility-at-your-convenience.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:InstantHealthCoverFacilityAtYourConvenience';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/instant-health-insurance-is-easy-to-get.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:InstantHealthInsuranceEasyToGet';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/it-is-easy-to-get-free-insurance-quotes.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:EasyToGetFreeInsuranceQuotes';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/know-about-your-insurer-before-purchasing-a-plan.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:KnowInsurerBeforePurchasingPlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/know-more-about-online-insurance.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:KnowMoreAbout';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/looking-for-a-good-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:GoodInsurancePlan';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/online-insurance-paves-the-way-for-easy-and-quick-renewal-of-the-policy.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:PavesWayForEasyQuickRenewal';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/online-premium-calculator-one-significant-advantages-offered-by-health-insurance-websites.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:SignificantAdvantageByWebsites';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/payment-made-easy-and-safe.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:PaymentMadeEasyAndSafe';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/purchase-health-insurance-online-a-user-friendly.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:PurchaseHealthInsuranceOnline';
        break;
    case 'apollomunichinsurance.com/insurance-articles/online-insurance/the-need-to-read-all-the-policy-details.aspx':
        SC_PageName = 'AMHI:Articles:OnlineInsurance:NeedToReadAllPolicyDetails';
        break;
    case 'apollomunichinsurance.com/insurance-articles/timely-renewal-has-a-lot-of-benefits.aspx':
        SC_PageName = 'AMHI:Articles:GeneralArticles:TimelyRenewalWithLotOfBenefits';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/air-travel-is-safer-with-a-travel-plan.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:AirTravelSafer';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/easy-travel-to-your-parents-with-love.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:EasyTravel';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/get-the-right-travel-insurance-coverage.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:RightTravelCoverage';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/non-medical-coverage-with-your-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:NonMedicalCoverage';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/reasons-why-you-should-buy-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:ReasonsWhyYouShouldBuy';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/traveling-overseas-for-the-first-time.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:TravelingOverseasForFirstTime';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/traveling-without-bothering-about-the-troubles.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:TravelingWithoutBotheringAboutTroubles';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/traveling-without-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:TravelingWithoutTravelInsurance';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/travel-insurance-a-must-when-traveling-to-meet-loved-ones.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:WhenTravelingToMeetLovedOnes';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/travel-insurance-complete-protection.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:CompleteProtection';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/travel-insurance-travel-fearlessly.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:TravelFearless';
        break;
    case 'apollomunichinsurance.com/insurance-articles/travel-insurance/travel-insurance-your-passport-to-a-stress-free-trip.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:FreeTrip';
        break;
    case 'apollomunichinsurance.com/insurance-policy/cheap-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:CheapInsurancePolicy';
        break;
    case 'apollomunichinsurance.com/insurance-policy/good-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:GoodInsurancePolicy';
        break;
    case 'apollomunichinsurance.com/insurance-policy/insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:InsurancePolicy';
        break;
    case 'apollomunichinsurance.com/insurance-policy/insurance-policy-articles-index.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:Articles';
        break;
    case 'apollomunichinsurance.com/insurance-policy/insurance-policy-details.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:Details';
        break;
    case 'apollomunichinsurance.com/insurance-policy/insurance-policy-for-women.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:ForWomen';
        break;
    case 'apollomunichinsurance.com/insurance-policy/insurance-policy-information.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:Information';
        break;
    case 'apollomunichinsurance.com/insurance-policy/insurance-policy-issuance.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:Issuance';
        break;
    case 'apollomunichinsurance.com/insurance-policy/policy-coverage.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:Coverage';
        break;
    case 'apollomunichinsurance.com/insurance-policy/policy-procedure.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:Procedure';
        break;
    case 'apollomunichinsurance.com/insurance-policy/the-best-insurance-policy.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:BestPolicy';
        break;
    case 'apollomunichinsurance.com/insurance-policy/types-of-insurance-policies.aspx':
        SC_PageName = 'AMHI:Articles:InsurancePolicy:Types';
        break;
    case 'apollomunichinsurance.com/Knots-are-good-for-ships,-not-for-your-breasts-Plan-a-check-now!.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:ReplyToHighMedicalExpenses';
        break;
    case 'apollomunichinsurance.com/medical-care/best-medical-care.aspx':
        SC_PageName = 'AMHI:Articles:MedicalCare:BestMedicalCare';
        break;
    case 'apollomunichinsurance.com/medical-care/family-medical-care.aspx':
        SC_PageName = 'AMHI:Articles:MedicalCare:FamilyMedicalCare';
        break;
    case 'apollomunichinsurance.com/medical-care/medical-care-articles-index.aspx':
        SC_PageName = 'AMHI:Articles:MedicalCare:Articles';
        break;
    case 'apollomunichinsurance.com/medical-care/medical-care-company.aspx':
        SC_PageName = 'AMHI:Articles:MedicalCare:Company';
        break;
    case 'apollomunichinsurance.com/medical-care/medical-care-india.aspx':
        SC_PageName = 'AMHI:Articles:MedicalCare:India';
        break;
    case 'apollomunichinsurance.com/medical-care/medical-care-services.aspx':
        SC_PageName = 'AMHI:Articles:MedicalCare:Services';
        break;
    case 'apollomunichinsurance.com/medical-care/medical-healthcare.aspx':
        SC_PageName = 'AMHI:Articles:MedicalCare:MedicalHealth';
        break;
    case 'apollomunichinsurance.com/medical-care/online-medical-care.aspx':
        SC_PageName = 'AMHI:Articles:MedicalCare:Online';
        break;
    case 'apollomunichinsurance.com/medical-insurance/a-basic-guide-to-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:BasicGuideToMedicalInsurance';
        break;
    case 'apollomunichinsurance.com/medical-insurance/basic-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:BasicMedicalInsurance';
        break;
    case 'apollomunichinsurance.com/medical-insurance/features-of-medical-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:FeaturesOfMedicalHealthInsurance';
        break;
    case 'apollomunichinsurance.com/medical-insurance/get-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:GetMedicalInsurance';
        break;
    case 'apollomunichinsurance.com/medical-insurance/good-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:GoodMedicalInsurance';
        break;
    case 'apollomunichinsurance.com/medical-insurance/instant-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:InstantMedicalInsurance';
        break;
    case 'apollomunichinsurance.com/medical-insurance/insurance-medical.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:Insurance';
        break;
    case 'apollomunichinsurance.com/medical-insurance/know-your-mediclaim-policy-well.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:KnowYourMediclaimPolicyWell';
        break;
    case 'apollomunichinsurance.com/medical-insurance/low-cost-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:LowCostMedicalInsurance';
        break;
    case 'apollomunichinsurance.com/medical-insurance/medical-benefits.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:MedicalBenefits';
        break;
    case 'apollomunichinsurance.com/medical-insurance/medical-insurance-articles-index.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:Articles';
        break;
    case 'apollomunichinsurance.com/medical-insurance/medical-insurance-cover.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:Cover';
        break;
    case 'apollomunichinsurance.com/medical-insurance/medical-insurance-information.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:Information';
        break;
    case 'apollomunichinsurance.com/medical-insurance/medical-insurance-premium.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:Premium';
        break;
    case 'apollomunichinsurance.com/medical-insurance/medical-plans.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:MedicalPlans';
        break;
    case 'apollomunichinsurance.com/medical-insurance/mediclaim-policy-and-cashless-service.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:MediclaimPolicyAndCashlessService';
        break;
    case 'apollomunichinsurance.com/medical-insurance/online-medical-insurance-policy-quotes.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:PolicyQuotes';
        break;
    case 'apollomunichinsurance.com/medical-insurance/private-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:Private';
        break;
    case 'apollomunichinsurance.com/medical-insurance/top-10-medical-insurance.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:Top10Policies';
        break;
    case 'apollomunichinsurance.com/medical-insurance/understanding-medical-insurance-cover.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:UnderstandPolicyFeatures';
        break;
    case 'apollomunichinsurance.com/medical-insurance/understand-medical-insurance-policy-features.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:UnderstandCover';
        break;
    case 'apollomunichinsurance.com/medical-insurance/whats-a-mediclaim-insurance-plan.aspx':
        SC_PageName = 'AMHI:Articles:MedicalInsurance:MediclaimInsurancePlan';
        break;
    case 'apollomunichinsurance.com/mediclaim/cashless-mediclaim.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:CashlessMediclaim';
        break;
    case 'apollomunichinsurance.com/mediclaim/cheapest-mediclaim-policy.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:CheapestMediclaimPolicy';
        break;
    case 'apollomunichinsurance.com/mediclaim/mediclaim-articles-index.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:Articles';
        break;
    case 'apollomunichinsurance.com/mediclaim/mediclaim-family.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:Family';
        break;
    case 'apollomunichinsurance.com/mediclaim/mediclaim-policies-in-india.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:PoliciesInIndia';
        break;
    case 'apollomunichinsurance.com/mediclaim/mediclaim-premium.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:Premium';
        break;
    case 'apollomunichinsurance.com/personal-health-insurance/children-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:ChildrenHealthInsurance';
        break;
    case 'apollomunichinsurance.com/personal-health-insurance/family-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:FamilyHealthInsurance';
        break;
    case 'apollomunichinsurance.com/personal-health-insurance/individual-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:IndividualHealthInsurance';
        break;
    case 'apollomunichinsurance.com/personal-health-insurance/personal-health-insurance-index.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:PersonalHealthInsurance';
        break;
    case 'apollomunichinsurance.com/Sitemap/Health-Insurance-Articles/Insurance/Insurance-Guide.aspx':
        SC_PageName = 'AMHI:Articles:Insurance:InsuranceGuide';
        break;
    case 'apollomunichinsurance.com/Sitemap/Insurance-Articles/Health-Insurance/Coverage-of-a-Health-Insurance-Plan.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:CoverageHealthInsurancePlan';
        break;
    case 'apollomunichinsurance.com/travel-insurance/airline-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:Airline';
        break;
    case 'apollomunichinsurance.com/travel-insurance/Annual-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:Annual';
        break;
    case 'apollomunichinsurance.com/travel-insurance/corporate-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:Corporate';
        break;
    case 'apollomunichinsurance.com/travel-insurance/domestic-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:Domestic';
        break;
    case 'apollomunichinsurance.com/travel-insurance/family-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:Family';
        break;
    case 'apollomunichinsurance.com/travel-insurance/group-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:Group';
        break;
    case 'apollomunichinsurance.com/travel-insurance/indian-city-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:IndianCity';
        break;
    case 'apollomunichinsurance.com/travel-insurance/individual-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:Individual';
        break;
    case 'apollomunichinsurance.com/travel-insurance/multi-trip-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:MultiTrip';
        break;
    case 'apollomunichinsurance.com/travel-insurance/overseas-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:Overseas';
        break;
    case 'apollomunichinsurance.com/travel-insurance/short-term-travel-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:ShortTerm';
        break;
    case 'apollomunichinsurance.com/travel-insurance-india/need-of-travel-insurance-services.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:NeedOfServices';
        break;
    case 'apollomunichinsurance.com/travel-insurance-india/purchase-from-travel-insurance-agent.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:PurchaseFromAgent';
        break;
    case 'apollomunichinsurance.com/travel-insurance-india/reassurance-offered-by-travel-insurance-plans.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:ReassuranceOfferedByPlans';
        break;
    case 'apollomunichinsurance.com/travel-insurance-india/sourcing-right-travel-insurance-quote.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:SourcingRightQuote';
        break;
    case 'apollomunichinsurance.com/travel-insurance-india/travel-insurance-articles-index.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:Articles';
        break;
    case 'apollomunichinsurance.com/travel-insurance-india/travel-insurance-for-pre-travel-arrangements.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:ComponentOfPreTravelArrangements';
        break;
    case 'apollomunichinsurance.com/travel-insurance-india/when-buying-travel-health-insurance.aspx':
        SC_PageName = 'AMHI:Articles:TravelInsurance:LookForWhenBuying';
        break;
    case 'apollomunichinsurance.com/insurance-articles/mediclaim/lifelong-renewal-an-added-advantage.aspx':
        SC_PageName = 'AMHI:Articles:Mediclaim:LifeLongRenewalAddedAdvantage';
        break;
    case 'apollomunichinsurance.com/insurance-articles/health-insurance/health-insurance-a-prudent-investment.aspx':
        SC_PageName = 'AMHI:Articles:HealthInsurance:PrudentInvestment';
        break;

        /*Services*/

    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medanta-The-Global-Health-Private-Limited/4983.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedantaGlobalHealth4983';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Manipal-Hospital---Airport-Road/618.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ManipalAirportRoad618';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ovum-Hospitals---A-Unit-of-Neonatal-Care-and-Research-Institute-Pvt-Ltd/1239.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ovum1239';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Holy-Family-Hospital/5048.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HolyFamily5048';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kailash-Hospital-and-Heart-Institute/5111.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KailashHeartInstitute5111';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Manipal-Hospital---Airport-Road/2334.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ManipalAirportRoad2334';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hiranandani-Healthcare-Pvt-Ltd/1233.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisHiranandaniHealthcare1233';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ozone-Multispeciality-Hospital/1762.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:OzoneMultispeciality1762';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aakash-Hospital/3321.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Aakash3321';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Health-Management-(North)-Ltd/4993.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisHealthManagementNorth4993';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kanpur-Medical-Centre-Pvt-Ltd/4880.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KanpurMedicalCentre4880';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rainbow-Super-Speciality-Hospital-For-Women-and-Children/4030.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RainbowSuperSpeciality4030';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital/49.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Fortis49';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mata-Chanan-Devi-Hospital/2930.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MataChananDevi2930';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ozone-Multispeciality-Hospital/1787.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:OzoneMultispeciality1787';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bombay-Hospital-and-Medical-Research-Centre/5107.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BombayMedicalResearchCentre5107';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/ILS-Hospitals,-Saltlake/4256.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ILSSaltlake4256';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Narayana-Hrudayaloya-Pvt-Ltd/2036.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NarayanaHrudayaloya2036';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sir-Ganga-Ram-Hospital/4209.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SirGangaRam4209';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Gleneagles-Hospital/24.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloGleneagles24';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/ASG-Hospital-Pvt-Ltd/2644.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ASG2644';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chaitanya-Hospital/1252.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Chaitanya1252';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Challa-Hospital/10.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Challa10';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Eye-Foundation-Limited/2492.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:EyeFoundation2492';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Hayat-Hospital/971.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Hayat971';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Inlaks-and-Budhrani-Hospital/3017.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:InlaksAndBudhrani3017';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lilavati-Hospital-and-Research-Centre/2809.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LilavatiResearchCentre2809';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medanta-The-Global-Health-Private-Limited/584.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedantaGlobalHealth584';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medica-Superspeciality-Hospital/4985.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedicaSuperspeciality4985';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Pancham-Hospitals-Pvt-Ltd/1108.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Pancham1108';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Paras-HMRI-Hospital/1008.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ParasHMRI1008';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals---Greams-Road/3197.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloGreamsRoad3197';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Artemis-Medicare-Services-Pvt-Ltd/3163.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ArtemisMedicareServices3163';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ayushman-Hospital/2347.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ayushman2347';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bombay-Hospital-and-Medical-Research-Centre/5130.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BombayMedicalResearchCentre5130';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospital---Gurgaon/4459.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsiaGurgaon4459';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospital/3684.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsia3684';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fernandez-Hospital-Private-Limited/2994.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Fernandez2994';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospitals-Ltd/3238.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Fortis3238';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Greater-Kailash-Hospital-Pvt-Ltd/2233.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GreaterKailash2233';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Indraprastha-Apollo-Hospital/572.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:IndraprasthaApollo572';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Koshys-Hospital/2371.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Koshys2371';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mittal-Hospital-and-Research-Centre/3786.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MittalResearchCentre3786';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Moolchand-Hospital/5441.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Moolchand5441';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aayush-Hospital/1499.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Aayush1499';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Cardle-royale-/4510.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloCardleRoyale4510';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospital---Bangalore/2332.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsiaBangalore2332';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Eye-Q-Super-Speciality-Eye-Hospital---Bhiwani/824.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:EyeQSuperSpecialityEyeBhiwani824';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Maharaja-Agrasen-Hospital/5056.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaharajaAgrasen5056';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medanta-The-Global-Health-Private-Limited/5128.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedantaGlobalHealth5128';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sirish-Hospital/3295.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sirish3295';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/A-R-Hospital-Pvt-Ltd/3761.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AR3761';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aashlok-Hospital-(Fortis-Health-Management-East-Ltd)/2076.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AashlokFortisHealthManagementEast2076';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aditya-Birla-Memorial-Hospital/3031.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AdityaBirlaMemorial3031';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ananya-Hospital-Pvt-Ltd/3204.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ananya3204';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apex-Hospital/3073.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Apex3073';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Cardle-royale/4717.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloCardleRoyale4717';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Cardle-royale/5105.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloCardleRoyale5105';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Arvind-Hospital/51.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Arvind51';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bses-Mg-Hospital/3238.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BsesMg3238';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Cardinal-Gracias-Memorial-Hospital-Trust/4549.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CardinalGraciasMemorialTrust4549';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chinmaya-Mission-Hospital/2520.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChinmayaMission2520';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/CHL-Healthcare-Pvt-Ltd/959.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CHLHealthcare959';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Citizens-Hospitals/2252.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Citizens2252';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospital---Kolkata/4447.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsiaKolkata4447';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dr-D-L-Hiranandani-Hospital/1939.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DrDLHiranandani1939';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dr-Gupta-Nursing-Home-and-Hospital/2479.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DrGuptaNursingHome2479';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dr-Kirpekar-Utkarsha-Hospital-Pvt-Ltd/1544.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DrKirpekarUtkarsha1544';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/GNRC-Hospitals/3989.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GNRC3989';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Gopi-Krishna-Hospital/4908.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GopiKrishna4908';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/ILS-Hospitals,-Agartala/4520.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ILSAgartala4520';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/ILS-Hospitals,-Saltlake/2850.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ILSSaltlake2850';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Inamdar-Hospital/5044.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Inamdar5044';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jupiter-Lifeline-Hospitals-Ltd/4517.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JupiterLifeline4517';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Khetarpal-Hospital/910.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Khetarpal910';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kokilaben-Dhirubhai-Ambani-Hospital-and-Medical-Research-Institute/607.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KokilabenDhirubhaiAmbaniMedicalResearch607';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Koshys-Hospital/2324.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Koshys2324';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Krishna-Institute-of-Medical-Sciences-Ltd/2664.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KrishnaMedicalSciences2664';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lakshmi-Hospital/1701.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Lakshmi1701';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lilavati-Hospital-and-Research-Centre/614.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LilavatiResearchCentre614';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Little-Stars-Childrens-Hospital/4708.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LittleStarsChildrens4708';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Manipal-Hospital---Airport-Road/2381.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ManipalAirportRoad2381';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-super-speciality-hospital/2354.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxSuperSpeciality2354';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Maxcare-Hospital(A-Unit-of-Kakatiyan-Medical-Service-Pvt-Ltd)/1264.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxcareUnitKakatiyanMedicalService1264';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medanta-Indore-(A-unit-of-Global-Health-Pvt-Ltd)/1495.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedantaIndoreUnitOfGlobalHealth1495';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Metro-MAS-Heart-Care-and-Multispeciality-Hospital/2125.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MetroMASHeartCareAndMultispeciality2125';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Moolchand-Hospital/3944.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Moolchand3944';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Narayana-Multispeciality-Hospital/205.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NarayanaMultispeciality205';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ortho-RAB-Hospital/1884.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:OrthoRAB1884';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Phoenix-Hospital-Pvt-Ltd/4274.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Phoenix4274';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Primus-Super-Speciality-Hospital/3143.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PrimusSuperSpeciality3143';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Priya-Poly-Clinic/880.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PriyaPolyClinic880';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/PVS-Hospital/3031.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PVS3031';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rabindranath-Thakur-Diagnostic-and-Medical-Care-Centre/3233.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RabindranathThakurDiagnosticMedicalCareCentre3233';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rutu-General-Hospital/2126.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RutuGeneral2126';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shanbhag-Nursing-Home/2046.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShanbhagNursingHome2046';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shri-Hospital/4265.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Shri4265';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shubham-Hospital/4623.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Shubham4623';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Star-Hospitals/450.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Star450';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sterling-Hospital/786.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sterling786';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vasan-Eye-Care-Hospital---Visakhapatnam/5062.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VasanEyeCareVisakhapatnam5062';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yashoda-Super-Speciality-Hospital---Nehru-Nagar/3394.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:YashodaSuperSpecialityNehruNagar3394';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Zenith-Hospital/1149.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Zenith1149';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Zenith-Hospital/4271.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Zenith4271';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Amri-Clinic/21.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AmriClinic21';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Rajshree-Hospitals-Pvt-Ltd/4115.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloRajshree4115';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Spectra-Hsopitals/980.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloSpectra980';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aster-CMI-Hospital/1781.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AsterCMI1781';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/B-L-Kapur-Memorial-Hospital/3004.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BLKapurMemorial3004';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhagirathi-Neotia-Women-and-Child-Care/55.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BhagirathiNeotiaWomenChildCare55';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Christian-Medical-College/1460.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChristianMedicalCollege1460';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Cims-Hospital-Private-Limted/5051.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Cims5051';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/City-Nursing-Home-/3144.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CityNursingHome3144';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospitals-Pvt-Ltd-Whitefield/1961.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsiaWhitefield1961';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Continental-Hospitals/1407.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Continental1407';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Cradle-Calicut-Maternity-Care-Pvt-Ltd/4091.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CradleCalicutMaternityCare4091';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Delhi-Hospital-and-Maternity-Home/1381.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DelhiMaternityHome1381';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dental-Care-Centre/4348.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DentalCareCentre4348';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Eye-Q-Super-Speciality-Eye-Hospital---Muzaffar-nagar/827.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:EyeQSuperSpecialityEyeMuzaffarNagar827';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-C-Doc-Health-Care-Ltd/2499.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisCDocHealthCare2499';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital---Bannerghatta-Road/1721.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisBannerghattaRoad1721';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital---Mohali/5014.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisMohali5014';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Harsha-Hospitals/2960.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Harsha2960';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Holy-Family-Hospital/4985.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HolyFamily4985';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Indraprastha-Hospital-and-Trauma-Centre/1340.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:IndraprasthaTraumaCentre1340';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/J-P-Hospital/2843.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JP2843';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jehangir-Hospital/3245.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Jehangir3245';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jupiter-Lifeline-Hospitals-Ltd/5153.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JupiterLifeline5153';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kamineni-Hospital-Pvt-Ltd/188.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kamineni188';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lalitha-Super-Specialty-Hospital-Pvt-Ltd/704.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LalithaSuperSpecialty704';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Madhuraj-Hospital-Pvt-Ltd/4023.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Madhuraj4023';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Metro-Multispeciality-Hospital/4180.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MetroMultispeciality4180';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Narayana-Hrudayalaya-MMI-Hospital/2131.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NarayanaHrudayalayaMMI2131';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/New-Life-Hospital/1461.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NewLife1461';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Orchid-Hospital/728.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Orchid728';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Pindari-Hospital/3790.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Pindari3790';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Prashant-Memorial-Charitable-Hospital/4059.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PrashantMemorialCharitable4059';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shroff-Eye-Centre/269.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShroffEyeCentre269';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Sankaradeva-Nethralaya/1473.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriSankaradevaNethralaya1473';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Thakral-Nursing-Home/2852.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ThakralNursingHome2852';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Abhay-Institute-of-Medical-Sciences/1516.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AbhayInstituteMedicalSciences';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ajanta-Hospital-and-IVF-Centre-Pvt-Ltd/2086.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AjantaIVFCentre2086';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Amar-Leela-Hospital-Pvt-Ltd/4726.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AmarLeela4726';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/AMRI-Hospital-Mukundapur/855.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AMRIMukundapur855';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/AMRI-Hospital-Ltd/2674.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AMRI2674';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Cardle-royale-/758.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloCardleRoyale758';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospital-Noida/571.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloNoida571';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospital,-Bilaspur/1916.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloBilaspur1916';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals---Bannerghatta-Road/620.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloBannerghattaRoad620';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals---Jubilee-Hills/16.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloJubileeHills16';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals/1215.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Apollo1215';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Koramangla-Cradle-Pvt-Ltd/4216.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloKoramanglaCradle4216';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Spectra-Hsopitals/978.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloSpectra978';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apple-Hospital/2630.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Apple2630';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Archana-Hospitals-Private-Limited/3035.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Archana3035';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Arneja-Institute-Of-Cardiology-PvtLtd/3836.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ArnejaInstituteOfCardiology3836';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Arunodaya-Hospital/2373.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Arunodaya2373';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bgs-Global-Hospital/14.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BgsGlobal14';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Brijlal-Hospital-And-Research-Centre/4083.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BrijlalResearchCentre4083';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Centre-For-Sight---Kukatpally/1671.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CentreForSightKukatpally1671';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chettinad-Super-Speciality-Hospital/4066.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChettinadSuperSpeciality4066';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chinmayi-Hospital/4926.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Chinmayi4926';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ciigma-Hospital/4338.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ciigma4338';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Coastal-Care-Hospital/671.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CoastalCare671';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Credence-Hospital-(P)-Ltd/184.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Credence184';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Durga-Nursing-Home-and-Research-Centre/4303.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DurgaNursingHomeAndResearchCentre4303';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Escorts-Hospital-and-Research-Centre/4474.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisEscortsResearchCentre4474';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Flt-Lt-Rajan-Dhall-Hospital/43.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisFltLtRajanDhall43';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital---Mulund-Goregaon-Link-Road/4465.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisMulundGoregaonLinkRoad4465';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital/3692.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Fortis3692';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Memorial-Research-Institute/4227.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisMemorialResearchInstitute4227';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Goyal-Hospital/4902.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Goyal4902';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Harley-Rram-Nursing-Home/2611.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HarleyRramNursingHome2611';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Harsha-Hospital/591.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Harsha591';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Hayat-Hospital/952.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Hayat952';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Hindu-Mission-Hospital/226.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HinduMission226';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Hinduja-Healthcare-Private-Limited/5109.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HindujaHealthcare5109';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Hosmat-Hospital-Pvt-Ltd/1740.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Hosmat1740';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Hosmat-Hospital-Pvt-Ltd/1809.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Hosmat1809';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jaipur-Hospital/3986.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Jaipur3986';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Joshi-Multi-Speciality-Hospital/643.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JoshiMultiSpeciality643';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kamala-Hospital/1880.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kamala1880';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kamala-Nehru-Memorial-Hospital/2796.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KamalaNehruMemorial2796';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kanungo-Institute-of-Diabetes-Specialities-Pvt-Ltd/2502.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KanungoInstituteDiabetesSpecialities2502';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kohinoor-Hospital/2731.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kohinoor2731';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kovai-Medical-Centre-and-Hospital-Ltd/3302.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KovaiMedicalCentre3302';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lavekar-Hospital/4103.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Lavekar4103';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lifeline-Hospital-and-Heart-Centre/982.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LifelineHeartCentre982';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Little-Flower-Hospital-and-Research-Centre/155.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LittleFlowerResearchCentre155';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mandav-Hospital/938.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Mandav938';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-super-speciality-hospital/4388.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxSuperSpeciality4388';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Mehta-Children's-Hospitals-Private-Limited/2807.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: MehtaChildrens2807';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Mehta-Children's-Hospitals-Private-Limited/4210.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: MehtaChildrens4210';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Motherhood-(Unit-of-Rhea-Healthcare)/2454.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MotherhoodRheaHealthcare2454';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Motherhood-Hospital(A-Unit-of-Rhea-Healthcare-Pvt-Ltd)/2758.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MotherhoodRheaHealthcare2758';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nims-Hospital/4030.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Nims4030';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Omni-Hospitals/769.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ozone769';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Orchid-Hospital/4594.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ozone4594';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Orchid-Medical-Centre-Pvt-Ltd/4131.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:OrchidMedicalCentre4131';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ozone-Hospitals/3997.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ozone3997';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Poona-Hospital-and-Research-Centre/5471.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PoonaResearchCentre5471';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Pragathi-Hospital/1500.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Pragathi1500';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rg-Stone-Urology-And-Laparoscopy-Hospital/3886.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RgStoneUrologyLaparoscopy3886';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rg-Stone-Urology-And-Laparoscopy-Hospital/3887.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RgStoneUrologyLaparoscopy3887';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rourkela-Lifeline-Pvt-Limited/4719.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RourkelaLifeline4719';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/S-S-Hospital/2183.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SS2183';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sahyadri-Ram-Krishna-Speciality-Hospital/4108.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SahyadriRamKrishnaSpeciality4108';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sai-Snehdeep-Hospital/997.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SaiSnehdeep997';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sailee-Hospital/4232.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sailee4232';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Saket-Medicare-and-Research-Centre-Pvt-Ltd/2888.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SaketMedicareResearchCentre2888';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sakra-World-Hospital(A-Unit-of-Takshasila-Operatiing-Private-Limited)/2761.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SakraWorld2761';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sanjivani-Surgical-And-Maternity-Hospital/933.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SanjivaniSurgicalAndMaternity933';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Santokba-Durlabhji-Memorial-Hospital-Cum-Medical-Research-Institute/2390.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SantokbaDurlabhjiMemorialResearchInstitute2390';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Santosh-Hospital/1275.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Santosh1275';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shanti-Memorial-Hospital/116.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShantiMemorial116';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shree-Balaji-Multy-Speciality-Hospital/1872.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShreeBalajiMultySpeciality1872';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shreeya-Hospital/845.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Shreeya845';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shri-KM-Memorial-Jain-Heart-And-General-Hospital-Sikar/1273.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShriKMMemorialJainHeartAndGeneralSikar1273';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Siddhartha-Hospital/2212.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Siddhartha2212';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/St-Isabel's-Hospital/1737.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: StIsabels1737';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sterling-Hospital/817.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sterling817';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sukhmani-Hospital/3819.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sukhmani3819';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sundaram-Medical-Foundation/5041.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SundaramMedicalFoundation5041';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sunshine-Hospitals/3783.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sunshine3783';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Swami-Bhooma-Nand-Hospital/1891.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SwamiBhoomaNand1891';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Swarnee-Medicare-Hospital/1635.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SwarneeMedicare1635';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vadapalani-Multi-Speciality-Hospital/1094.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VadapalaniMultiSpeciality1094';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vasan-Eye-Care-Hospital---Kurnool/2887.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VasanEyeCareKurnool2887';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vivekananda-Polyclinic-and-Institute-Of-Medical-Sciences/5047.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VivekanandaPolyclinicInstituteMedicalSciences5047';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aarogya-Hospital/1648.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Aarogya1648';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aarogya-Hospital/2212.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Aarogya2212';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aarogyam-Multi-Speciality-Hospital-and-ICCU/1505.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AarogyamMultiSpecialityICCU1505';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aaxis-Super-Speciality-Hospital/4330.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AaxisSuperSpeciality4330';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/ABC-Hospitals/4279.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ABC4279';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Accord-Multispeciality-Hospital/70.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AccordMultispeciality70';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Acharya-Tulsi-Jain-Hospital/575.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AcharyaTulsiJain575';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aditya-Hospital/26.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Aditya26';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/AL---Arif-Hospital/2203.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ALArif2203';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/American-Oncology-Institute/4676.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AmericanOncologyInstitute4676';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Anand-Hospital-Multispeciality/1288.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AnandMultispeciality1288';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ananthapuri-Hospitals-And-Research-Institute/951.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AnanthapuriResearchInstitute951';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ankur-Nursing-Home/4651.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AnkurNursingHome4651';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Annamalai-Hospital/3654.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Annamalai3654';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apex-Hospital-and-Trauma-Centre/2459.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApexandTraumaCentre2459';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-First-Med-Hospital/3277.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloFirstMed3277';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Gleneagles-Heart-Centre/23.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloGleneaglesHeartCentre23';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospital-Enterprises-Limited/3273.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloEnterprises3273';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals---Greams-Road/2414.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloGreamsRoad2414';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Spectra-Hospital-(unit-of-Apollo-Speciality-Hospitals-Pvt-Ltd)/1520.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloSpectra1520';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Spectra-Hsopitals/5140.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloSpectra5140';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aravind-Eye-Hospital/941.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AravindEye941';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Arihant-Eye-Care-Centre/2650.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ArihantEyeCareCentre2650';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Artemis-Medicare-Services-Pvt-Ltd/3185.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ArtemisMedicareServices3185';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Arunodaya-Clinic/929.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ArunodayaClinic929';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aryan-Hospital-Private-Ltd/3019.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Aryan3019';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Astha-Hospital/1729.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Astha1729';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Atlanta-Mediworld-Multispeciality-Hospital-and-Research-Centre-(Unit-of-R-R-M-Services)/1987.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AtlantaMediWorldMultispecialityResearchCentre1987';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/B-L-Kapur-Memorial-Hospital/4946.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BLKapurMemorial4946';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/B-M-Shah-Hospital-and-Medical-Research-Centre/2037.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BMShahMedicalResearchCentre2037';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Baby-Memorial-Hospital-Ltd/950.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BabyMemorial950';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bangalore-Baptist-Hospital/1741.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BangaloreBaptist1741';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bansal-Hospital/2627.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bansal2627';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Basavatarakam-Indo-American-Cancer-Hospital-And-Research-Institute/4980.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BasavatarakamIndoAmericanCancerResearch4980';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bethany-Hospital/4711.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bethany4711';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhagirathi-Neotia-Women-and-Child-Care/3976.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BhagirathiNeotiaWomenAndChildCare3976';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhandare-Hospital/5118.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bhandare5118';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bharathi-Hospitals/706.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bharathi706';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhargava-Hospital/4936.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bhargava4936';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhartiya-Arogya-Nidhi-Sheth-KC-Parikh-General-Hospital/1742.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BhartiyaArogyaNidhiShethKCParikhGeneral1742';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Brahm-Shakti-Hospital/2729.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BrahmShakti2729';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/C-N-R-Nursing-Home/2726.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CNRNursingHome2726';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Care-Hospital---Visakhapatnam/86.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CareVisakhapatnam86';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chaitanya-Eye-Hospital/4467.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChaitanyaEye4467';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chaudry-Medical-and-Maternity-Hospital/1675.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChaudryMedicalAndMaternity1675';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chirayu-Hospital/1863.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Chirayu1863';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Choithram-Hospital-and-Research-Centre/2187.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChoithramResearchCentre2187';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospital---Ghaziabad/5065.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsiaGhaziabad5065';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospital---Kolkata/4298.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsiaKolkata4298';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Continental-Hospitals/2154.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Continental2154';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Cradle-Calicut-Maternity-Care-Pvt-Ltd/751.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CradleCalicutMaternityCare751';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dataram-Hospital/1922.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Dataram1922';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Deenanath-Mangeshkar-Hospital-and-Research-Centre/3293.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DeenanathMangeshkarResearchCentre3293';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Delhi-Ent-Hospital/4475.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DelhiEnt4475';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Delhi-Ent-Hospital/4964.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DelhiEnt4964';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Divya-Prastha-Hospital/761.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DivyaPrastha761';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dr-Bhanushali-Hospital/4191.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DrBhanushali4191';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dr-Goyal-Children-and-General-Hospital/4055.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DrGoyalChildrenAndGeneral4055';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Dr-Zamindar's-Microsurgical-Eye-Centre/4281.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: DrZamindarsMicrosurgicalEyeCentre4281';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Femina-Women's-Hospital/2796.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: FeminaWomens2796';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fernandez-Hospital-Pvt-Ltd/2993.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Fernandez2993';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Forrd-Hospital-Ca-Unit-Of-Nova-Hospital/4021.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ForrdCaUnitOfNova4021';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Escorts-Hospital-and-Research-Centre/3788.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisEscortsResearchCentre3788';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital---Kalyan-(W)/110.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisKalyanW110';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital---Kolkata/5067.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisKolkata5067';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital/3710.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Fortis3710';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital/4432.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Fortis4432';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospitals-Ltd/2965.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Fortis2965';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Memorial-Research-Institute/4216.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisMemorialResearchInstitute4216';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Memorial-Research-Institute/4224.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisMemorialResearchInstitute4224';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortuna-Women-and-Orthocare-Hospital/1383.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortunaWomenOrthocare1383';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/G-B-R-Super-Speciality-Hospital/2226.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GBRSuperSpeciality2226';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/G-B-R-Super-Speciality-Hospital/2431.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GBRSuperSpeciality2431';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/G-Kuppusamy-Naidu-Memorial-Hospital/1855.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GKuppusamyNaiduMemorial1855';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Geetanjali-Hospital/1652.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Geetanjali1652';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Geeth-Ragunath-Hospital/3995.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GeethRagunath3995';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Global-Speciality-Hospital/3041.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GlobalSpeciality3041';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Globus-Hospital-(A-unit-of-Hospital-Infotech-Pvt-Ltd)/1513.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Globus1513';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Gokul-Newtech-Medicare-Pvt-Ltd/1958.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GokulNewtechMedicare1958';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Gokuldas-Hospitals-Pvt-Ltd/2643.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Gokuldas2643';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Grace-And-Compassion-Hospital/1575.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GraceAndCompassion1575';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Greenview-Medical-Center/136.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GreenviewMedicalCenter136';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Guardian-Multi-Speciality-Hospital/2188.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GuardianMultiSpeciality2188';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Gupta-Nursing-Home-and-Laparoscopy-Centre/4312.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GuptaNursingHomeAndLaproscopyCentre4312';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Harsha-Hospitals/2689.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Harsha2689';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Hemraj-Jain-Hospital-and-Maternity-Home/2296.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HemrajJainMaternityHome2296';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Holy-Cross-Hospital/5076.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HolyCross5076';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Holy-Family-Hospital/5070.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HolyFamily5070';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Hyderabad-Kidney-and-Laproscopic-Centre/92.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HyderabadKidneyAndLaproscopyCentre92';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Indira-Gandhi--Co--Operative-Hospital/865.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:IndiraGandhiCoOperative865';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Indraprastha-Apollo-Hospital/577.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:IndraprasthaApollo577';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Indraprastha-Medical-Corporation-Limited/4376.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:IndraprasthaMedicalCorporation4376';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Indus-Hospital/3472.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Indus3472';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Isha-Hospital/4672.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Isha4672';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jaypee-Hospital-(-A-unit-of-Jaypee-Healthcare-Ltd)/1406.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Jaypee1406';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jeevan-Anmol-Hospital/4436.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JeevanAnmol4436';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jeevan-Jyoti-Hospital/4261.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JeevanJyoti4261';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jeevan-Jyoti-Nursing-Home/733.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JeevanJyotiNursingHome733';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jehangir-Hospital/2972.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Jehangir2972';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jupiter-Lifeline-Hospitals-Ltd/3802.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JupiterLifeline3802';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/K-E-M-Hospital/3704.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KEM3704';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/K-E-M-Hospital/4607.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KEM4607';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/K-K-Hospital-and-Kidney-Centre/1669.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KKKidneyCentre1669';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kailash-Hospital-Ltd/1229.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kailash1229';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kalinga-Hospital-Ltd/134.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kalinga134';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kalyan-Metro-Multispeciality-Hospital-Pvt-Ltd/1718.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KalyanMetroMultispeciality1718';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kamineni-Hospital-Pvt-Ltd/4441.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kamineni4441';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Khanna-Hospital/1413.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Khanna1413';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Khetarpal-Nursing-Home/4053.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KhetarpalNursingHome4053';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kids-Clinic-India-Pvt-Ltd/2461.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KidsClinicIndia2461';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/KMC-Hospital/3185.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KMC3185';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/KMC-Hospital/3255.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KMC3255';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kokilaben-Dhirubhai-Ambani-Hospital-and-Medical-Research-Institute/2802.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KokilabenDhirubhaiAmbaniMedicalResearch2802';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kovai-Medical-Centre-and-Hospital-Ltd/3832.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KovaiMedicalCentre3832';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kulwanti-Hospitals-and-Research-Centre/4545.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KulwantiResearchCentre4545';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Laksh-Hospital/2940.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Laksh2940';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lakshmi-Hospital/4119.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Lakshmi4119';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lalita-Memorial-Hospital-Pvt-Ltd/4306.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LalitaMemorial4306';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lalita-Memorial-Hospital-Pvt-Ltd/88.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LalitaMemorial88';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lifeline-Institute-Of-Medical-Sciences/4526.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LifelineInstituteMedicalSciences4526';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lotus-Hospital/4235.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Lotus4235';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lourde-Hospital/2287.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Lourde2287';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/M-A-R-Hospitals/1882.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MAR1882';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/M-L-Hospital/1031.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ML1031';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/M-P-Birla-Hospital-And-Priyanmvada-Birla-Cancer-Research-Institute/2982.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MPBirlaPriyanvadaBirlaCancerResearchInstitute2982';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/M-R-Hospitals/1707.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MR1707';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/M-S-Ramaiah-Memorial-Hospital/2331.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MSRamaiahMemorial2331';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Madhumani-Nursing-Home/2103.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MadhumaniNursingHome2103';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Madhuraj-Hospital-Pvt-Ltd/4349.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Madhuraj4349';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mahalakshmi-Hospitals/1885.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Mahalakshmi1885';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Maharaja-Agrasen-Hospital/5078.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaharajaAgrasen5078';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mahavir-Hospital-and-Research-Centre/2451.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MahavirResearchCentre2451';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mahavir-Multispeciality-Hospital/3056.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MahavirMultispeciality3056';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mamatha-Medicare-Private-Limited/3492.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MamathaMedicare3492';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Manipal-Hospital---Airport-Road/656.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ManipalAirportRoad656';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Manipal-Hospital/2327.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Manipal2327';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Manipal-Super-Speciality-Hospital/615.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ManipalSuperSpeciality615';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Matrix-Hospital/700.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Matrix700';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Super-Speciality-Hospital-Dehradun/1261.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxSuperSpecialityDehradun1261';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-super-speciality-hospital/5077.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxSuperspeciality5077';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Maxivision-Laser-Centre-(P)-Ltd---Benz-Circle/3090.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxivisionLaserCentre3090';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/May-Flower-for-Women-and-Children-(A-unit-of-Sri-Sai-Balaji-Hospital-for-Women-and-Childrens-Pvt-Ltd)/1774.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MayFlowerForWomenAndChildren1774';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medi---Square-Hospital-Pvt-Ltd/3756.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MediSquare3756';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medica-Hospitals-Private-Limited-KGMH/2781.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedicareKGMH2781';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medicare-Hospital-Foundation/1189.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedicareFoundation1189';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medihope-Hospitals-and-Research-Centre-Pvt-Ltd/3095.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedihopeResearchCentre3095';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mediland-Nursing-Home/4187.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedilNursingHome4187';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medipoint-Hospitals-Pvt-Ltd/3829.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Medipoint3829';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medipoint-Hospitals-Pvt-Ltd/5007.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Medipoint5007';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Meenakshi-Mission-Hospital-and-Research-Centre/249.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MeenakshiMissionResearchCentre249';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mehkar-Multyspeciality-Hospital/2185.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MehkarMultyspeciality2185';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/MGM-Hospital-and-Research-Centre,-CBD-Belapur/4659.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MGMResearchCentreCBDBelapur4659';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/MGM-Medical-College-and-Hospital/2844.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MGMMedicalCollege2844';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/MGM-New-Bobay-Hospital/956.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MGMNewBobay956';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mission-Hospital/2502.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Mission2502';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mohan-Hospital-and-Heart-Centre/563.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MohanHeartCentre563';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Moraya-Multispeciality-Hospital/2940.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MorayaMultispeciality2940';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Motherhood-(Unit-of-Rhea-Healthcare)/1472.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Motherhood1472';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Motherhood-Hospital(A-Unit-of-Rhea-Healthcare-Pvt-Ltd)/2672.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Motherhood2672';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Muthoot-Life-Brigade-(Muthoot-Pappachan-Medicare-Pvt-Ltd)/1551.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MuthootLifeBrigade1551';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nagesh-Hospital/2831.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Nagesh2831';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Narayana-Hrudayaloya-Pvt-Ltd/212.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NarayanaHrudayaloya212';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nazar-Kanwar-Surana-Hospital/4118.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NazarKanwarSurana4118';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Noble-Care-Hospital/4057.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NobleCare4057';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Noida-Orthopaedic-Centre/116.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NoidaOrthopaedicCentre116';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Northex-Stone-Clinic/5002.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NorthexStoneClinic5002';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Omni-R-K-Hospital(A-Unit-of-Incor-Hospitals-Vizag-Pvt-Ltd)/1172.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:OmniRKA1172';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Oxygen-Hospital---Alwal/4096.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:OxygenAlwal4096';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ozone-Multispeciality-Hospital/1860.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:OzoneMultispeciality1860';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Paavan-Hospital/2160.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Paavan2160';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Panacea-Hospital-Pvt-Ltd/2325.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Panacea2325';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Param-Multispeciality-Hospital/2606.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ParamMultispeciality2606';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Paras-HMRI-Hospital/2506.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ParasHMRI2506';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Parkar-Hospital-Research-Institute-Pvt-Ltd/2590.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ParkarResearchInstitute2590';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Parvathi-Multispeciality-Hospital/2998.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ParvathiMultispeciality2998';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/PD-Hinduja-National-Hospital-and-Medical-Research-Centre/2815.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PDHindujaNationalMedicalResearchCentre2815';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Peerless-Hospitex-Hospital-And-Research-Center-Ltd/4128.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PeerlessResearchCenter4128';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Poona-Hospital-and-Research-Centre/189.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PoonaResearchCentre189';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Prachin-Healthcare-Hospital/3113.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PrachinHealthcare3113';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Pramoda-Hospital-/907.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Pramoda907';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Prem-Hospital-and-Research-Centre/1924.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PremResearchCentre1924';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Primus-Super-Speciality-Hospital/109.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PrimusSuperSpeciality109';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/PVS-Memorial-Hospital/1687.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PVSMemorial1687';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rajagiri-Hospital/1843.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Rajagiri1843';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rakshita-Nursing-Home/4619.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RakshitaNursingHome4619';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ramakrishna-Care-Hospital/89.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RamakrishnaCare89';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rashmi-Nursing-Home/1768.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RashmiNursingHome1768';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Regency-Hospital-Ltd/4241.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Regency4241';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rohini-Medicare-Pvt-Ltd-/908.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RohiniMedicare908';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/S-S-Hospital/2209.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SS2209';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sai-Nethralayam-Laser-Centre/1885.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SaiNethralayamLaserCentre1885';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sal-Hospital-And-Medical-Institute/4106.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SalMedicalInstitute4106';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Samarpan-Multispeciality-Hospital/3002.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SamarpanMultispeciality3002';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sanjeevani-Hospital-and-Medical-Research-Institute/4977.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SanjeevaniMedicalResearchInstitute4977';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Saraf'S-Diagnostic-Centre/3590.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: SarafsDiagnosticCentre3590';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sevarth-Sansthan-Seth-Bimal-Kumar-Jain-Trauma-and-Physiotherapy-Dharmarth-Samiti/1651.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SevarthSansthanSethBimalKumarJain1651';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Seventh-Day-Adventist-Hospital/1702.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SeventhDayAdventist1702';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shree-Krishna-Hospital/1587.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShreeKrishna1587';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shree-Narayan-Hospital/958.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShreeNarayan958';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shri-Siddhivinayak-Heart-Hospital/2051.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShriSiddhivinayakHeart2051';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shrinath-Medicity-(A-Multi-Super-Speciality-Hospital)/1604.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShrinathMedicity1604';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Simhans-Hospital/2564.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Simhans2564';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Snehalatha-Hospitals/1580.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Snehalatha1580';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Soni-Manipal-Hospital-(-A-Unit-of-Manipal-Hospitals-(Jaipur)-Pvt-Ltd)/4949.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SoniManipal4949';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Devi-Hospital/1927.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriDevi1927';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Ramachandra-Medical-Centre/204.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriRamachandraMedicalCentre204';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Sai-Hospital/2122.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriSai2122';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Star-Hospital-Pvt-Ltd/1948.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Star1948';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sterling-Hospital/819.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sterling819';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sudha-Hospital/1310.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sudha1310';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sudha-Hospital/4152.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sudha4152';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sunrise-Hospital(A-Unit-of-Trinity-Sunrise-Healthcare-Pvt-Ltd)/3916.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sunrise3916';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Thane-Health-Care-Hospitals/445.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ThaneHealthCare445';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/The-Apollo-Clinic-(Apollo-Health-and-Lifestyle-Ltd)/422.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloClinicHealthAndLifestyle422';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Tilak-Hospital/2187.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Tilak2187';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Trilochan-Netralaya/1049.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:TrilochanNetralaya1049';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Uma-Medical-Related-Institute-(P)-Ltd/2700.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:UmaMedicalRelatedInstitute2700';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Varanasi-Hospital-And-Medical-Research-Centre/4350.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VaranasiMedicalResearchCentre4350';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vasan-Eye-Care-Hospital---Ranchi/4304.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VasanEyeCareRanchi4304';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vasan-Eye-Care-Hospital---Vijayawada/651.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VasanEyeCareVijayawada651';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vidyasagar-Hospital/1451.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Vidyasagar1451';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vijay-Hospital/1307.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Vijay1307';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vijaya-Hospital/1612.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Vijaya1612';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vijaya-Nursing-Home/38.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VijayaNursingHome38';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vydehi-Institute-of-Medical-Sciences-And-Research-Bangalore/1817.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VydehiMedicalSciencesAndResearchBangalore1817';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yash-Hospital/2657.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Yash2657';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yashoda-Super-Speciality-Hospital/1730.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:YashodaSuperSpeciality1730';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yashoda-Super-Speciality-Hospital/3772.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:YashodaSuperSpeciality3772';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yatharth-Wellness-Hospital-and-Trauma-Centre/613.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:YatharthWellnessAndTraumaCentre613';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yatharth-Wellness-Superspecility-Hospital-and-Heart-Centre/2921.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:YatharthWellnessSuperspecialityHeartCentre2921';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yenepoya-Hospital/2967.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Yenepoya2967';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Zeus-Gastro-Institute-and-Research-Centre/1850.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ZeusGastroInstituteAndResearchCentre1850';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/A-R-Hospital-Pvt-Ltd/540.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AR540';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aakar-Hospital/808.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Aakar808';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aashray-Urology-Institute/62.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AashrayUrologyInstitute62';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aaxis-Super-Speciality-Hospital/2966.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AaxisSuperSpeciality2966';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Adarsha-Hospital(Unit-of-Adarsha-Shathavahana-Medicare-Pvt-Ltd)/1326.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Adarsha1326';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aditya-Birla-Memorial-Hospital/3307.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AdityaBirlaMemorial3307';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aditya-Medical-Park/2810.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AdityaMedicalPark2810';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Adiva-Hospitals-Pvt-Ltd/4217.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Adiva4217';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Agadi-Hospital-and-Research-Centre/1165.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AgadiResearchCentre1165';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Agarwal-Maternity-and-General-Hospital---Pune/3319.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AgarwalMaternityAndGeneralPune3319';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Agra-Heart-Centre/5092.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AgraHeartCentre5092';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Agra-Heart-Centre/588.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AgraHeartCentre588';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/AIMS-Hospital-and-Research-Center/746.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AIMSResearchCenter746';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aiswarya-Hospital/1273.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Aiswarya1273';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Akar-Hospital/4170.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Akar4170';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Akshar-Children-Hospital/4196.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AksharChildren4196';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Alchemist-Hospital-Ltd/176.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Alchemist176';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Amar-Hospital/1534.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Amar1534';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Amar-Hospital/896.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Amar896';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/AMRI-Hospitals-Dhakuria(A-Unit-of-AMRI-Hospitals-Ltd)/3046.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AMRIDhakuria3046';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Amrit-Hospital/1628.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Amrit1628';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Amrita-Institute-Of-Medical-Science-And-Research-Institute/4991.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AmritaInstituteOfMedicalScienceAndResearch4991';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Amruta-Surgical-And-Maternity-Home/3076.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AmrutaSurgicalAndMaternityHome3076';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Amrutha-Nursing-Home/1758.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AmruthaNursingHome1758';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Anand-Hospital-Multispeciality/1284.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AnandMultispeciality1284';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Anil-Baghi-Hospital/1936.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AnilBaghi1936';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Anjakha-Hospital/4003.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Anjakha4003';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ankura-Medical-and-Research-Centre-Pvt-Ltd/4509.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AnkuraMedicalAndResearchCentre4509';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Anupama-Hospital/546.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Anupama546';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Anvitha-Hospital/3190.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Anvitha3190';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apex-Hospital-(Unit-Of-Choudhary-Medicare-Hospital-Pvt-Ltd)/4232.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Apex4232';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apex-Hospitals-(P)-Ltd/4659.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Apex4659';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Bangalore-Cradle-Limited/1299.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloBangaloreCradle1299';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Bgs-Hospitals/5480.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloBgs5480';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-BSR-Hospital/4525.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloBSR4525';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Cardle-royale/4710.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloCardleRoyale4710';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospital-(A-unit-of-Apollo-Hospital-Enterprises-Ltd)/1499.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Apollo1499';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals---Bannerghatta-Road/660.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloBannerghattaRoad660';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals---Greams-Road/3323.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloGreamsRoad3323';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals---Hyderguda/76.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloHyderguda76';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals-Enterprise-Ltd/4986.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloEnterprise4986';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals/2450.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Apollo2450';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Hospitals/3665.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Apollo3665';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Pharmacy/5365.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloPharmacy5365';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Reach-Hospital/2948.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloReach2948';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Reach-Hospital/3065.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloReach3065';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Speciality-Hospital/635.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloSpeciality635';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Speciality-Hospital/683.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloSpeciality683';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Speciality-Hospitals/5027.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloSpeciality5027';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Speciality-Hospitals/882.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloSpeciality882';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apollo-Spectra-Hsopitals/2797.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ApolloSpectraHsopitals2797';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Apple-Hospital/1698.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Apple1698';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aravind-Eye-Hospital/945.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AravindEye945';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Archana-Hospitals-Private-Limited/2649.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Archana2649';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Artemis-Health-Institute/2808.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ArtemisHealthInstitute2808';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Artemis-Health-Institute/4192.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ArtemisHealthInstitute4192';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Arun-Hospital-Pvt-Ltd/2678.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Arun2678';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aryan-Hospital-Private-Ltd/2826.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Aryan2826';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Asarfi-Hospital-Limited/1010.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Asarfi1010';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/ASG-Hospital-Private-Limited/2105.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ASG2105';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ashirwad-Heart-Hospital/1072.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AshirwadHeart1072';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ashtvinayak-Hospital/928.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ashtvinayak928';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ashwani-Hospital/3158.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ashwani3158';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Asian-Institute-Of-Medical-Sciences/3125.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AsianInstituteOfMedicalSciences3125';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Asian-Institute-Of-Medical-Sciences/4997.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AsianInstituteOfMedicalSciences4997';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Asian-Institute-Of-Medical-Sciences/624.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AsianInstituteOfMedicalSciences624';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aster-Eye-Care/5113.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AsterEyeCare5113';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Athreya-Hospital/2862.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Athreya2862';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Aurbindo-Medical-Research-Centre/2249.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AurbindoMedicalResearchCentre2249';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Axon-Speciality-Hospital/4629.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AxonSpeciality4629';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ayushman-Hospital-and-Trauma-Centre/4934.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:AyushmanTraumaCentre4934';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/B-M-Orthopaedic-Hospital/3171.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BMOrthopaedic3171';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/B-N-Agarwal-Memorial-Hospital/1135.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BNAgarwalMemorial1135';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Baksi-Orthopaedics-Trauma-and-Rehabilitation-Centre-Pvt-Ltd/2636.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BaksiOrthopaedicsTraumaAndRehabilitation2636';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bangalore-Baptist-Hospital/3690.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BangaloreBaptist3690';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bangalore-West-Lions-Superspecilaity-Eye-Hospital/4455.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BangaloreWestLionsSuperspecilaityEye4455';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bansal-Hospital/2261.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bansal2261';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Baps-Yogiji-Maharaj-Hospital/3193.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BapsYogijiMaharaj3193';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Batra-Hospital-and-Medical-Research-Centre/1232.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BatraMedicalResearchCentre1232';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Behala-Balananda-Brahmachari-Hospital-and-Research-Centre/3483.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BehalaBalanandaBrahmachariResearchCentre3483';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Behala-Balananda-Brahmachari-Hospital-and-Research-Centre/3802.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BehalaBalanandaBrahmachariResearchCentre3802';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhagirathi-Neotia-Women-and-Child-Care/38837.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BhagirathiNeotiaWomenAndChildCare38837';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhagwan-Mahaveer-Jain-Hospital/2812.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BhagwanMahaveerJain2812';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhagwan-Mahaveer-Jain-Hospital/4215.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BhagwanMahaveerJain4215';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhagwati-Health-Care-Pvt-Ltd/4532.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BhagwatiHealthCare4532';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhagwati-Hospital/4443.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bhagwati4443';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhaktivedanta-Hospital/3939.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bhaktivedanta3939';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bharathi-Hospitals/4248.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bharathi4248';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bharti-Hospital/2078.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bharti2078';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhatia-Hospital/2656.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bhatia2656';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhide-Hospital/4457.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Bhide4457';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bhima-Shankar-Multi-Speciality-Hospital-Pvt-Ltd/2192.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BhimaShankarMultiSpeciality2192';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/BHS-Lakeview-Hospital/4221.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BHSLakeview4221';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Birmole-Hospital/843.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Birmole843';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Bloom-Healthcare/1277.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BloomHealthcare1277';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/BRS-Hospital/3173.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:BRS3173';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/C-V-R-Hospital/2211.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CVR2211';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Centre-For-Sight---Dwarka/3932.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CentreForSightDwarka3932';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Centre-For-Sight---Dwarka/906.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CentreForSightDwarka906';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Centre-For-Sight-Moradabad/3926.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CentreForSightMoradabad3926';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Centre-For-Sight/5033.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CentreForSight5033';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chaitanya-Eye-Hospital/4668.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChaitanyaEye4668';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chaitanya-Hospital/2747.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Chaitanya2747';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chaitanya-Hospital/4861.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Chaitanya4861';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Charnock-Hospitals-Pvt-Ltd/3156.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Charnock3156';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chavan-Hospital/730.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Chavan730';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chaya-Super-Speciality-Hospital/1711.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChayaSuperSpeciality1711';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chikitsa-Ent-Hospital/981.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChikitsaEnt981';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chinmaya-Mission-Hospital/2550.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChinmayaMission2550';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chinmaya-Narayana-Super-Specialty--Centre/4212.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChinmayaNarayanaSuperSpecialtyCentre4212';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Chord-Road-Hospital-Pvt-Ltd/2040.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChordRoad2040';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Christian-Medical-College/1716.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChristianMedicalCollege1716';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Christian-Mission-Hospital/4994.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ChristianMission4994';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Citizens-Eye-and-Health-Care/1791.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CitizensEyeAndHealthCare1791';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/City-Central-Hospital-(P)-Ltd---Davangere/2263.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CityCentralDavangere2263';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/City-Nursing-Home-(P)-Ltd/4142.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CityNursingHome4142';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospital---Ghaziabad/5043.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsiaGhaziabad5043';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospital---Patiala/5035.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsiaPatiala5035';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospital/636.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsia636';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Columbia-Asia-Hospitals-Pvt-Ltd-Whitefield/2053.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ColumbiaAsiaWhitefield2053';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Cosmopolitan-Hospital/3832.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Cosmopolitan3832';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Criticare-Superspeciality-Hospital/726.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CriticareSuperspeciality726';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Currae-Specialty-Hospital(A-unit-of-Patni-Healthcare-Ltd)/1866.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CurraeSpecialty1866';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Currae-Specialty-Hospital(A-unit-of-Patni-Healthcare-Ltd)/2197.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:CurraeSpecialty2197';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Delhi-Heart-and-Lung-Institute/5025.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DelhiHeartAndLungInstitute5025';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Deshmukh-Hospital/916.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Deshmukh916';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dhameliya-Kidney-Hospital-and-Lithotripsy-Centre/4177.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DhameliyaKidneyAndLithotripsyCentre4177';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dhanashree-Hospital/764.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Dhanashree764';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Disha-Phaci-And-Lasik-Day-Care/2871.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DishaPhaciAndLasikDayCare2871';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dispur-Hospitals-Pvt-Ltd/1898.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Dispur1898';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Divine-Heart-and-Multispeciality-Hospital/4469.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DivineHeartAndMultispeciality4469';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Divine-Heart-and-Multispeciality-Hospital/93.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DivineHeartAndMultispeciality93';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dm-Eye-Institute/756.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DmEyeInstitute756';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/DM-WIMS-Hospital/752.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DMWIMS752';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/DMC-Hospital-and-Trauma-Centre/2231.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DMCTraumaCentre2231';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Dr-Agarwal's-Eye-Hospital-Ltd---Krishnagiri/4073.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: DrAgarwalsEyeKrishnagiri4073';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Dr-Rao's-Ent-Super-Speciality-Hospital/4627.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: DrRaosEntSuperSpeciality4627';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dr-Sunil-Shah-Eye-Hospital/3815.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DrSunilShahEye3815';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Dreamland-Nursing-Home/19.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:DreamlandNursingHome19';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Durga-Hospital/2984.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Durga2984';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ebenezer-Hospital/5088.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ebenezer5088';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Elite-Hospital-Limited/637.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Elite637';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Elite-Multispeciality-Hospital-Pvt-Ltd/1700.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:EliteMultispeciality1700';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Emerald-Multi-Specialty-Hospital/1605.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:EmeraldMultiSpecialty1605';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ernakulam-Medical-Centre/1492.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ErnakulamMedicalCentre1492';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Escorts-Heart-Institute-and-Research-Centre-Ltd/5013.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:EscortsHeartInstituteAndResearchCentre5013';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Eswari-Nursing-Home/687.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:EswariNursingHome687';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Felix-Hospital/1555.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Felix1555';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Flt-Lt-Rajan-Dhall-Hospital/5177.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisFltLtRajanDhall5177';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Health-Management-(North)-Ltd/620.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisHealthManagementNorth620';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital---Bannerghatta-Road/1790.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisBannerghattaRoad1790';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital---Kolkata/635.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisKolkata635';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospital/3970.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Fortis3970';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Hospitals-Ltd/3842.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Fortis3842';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortis-Malar-Hospital/471.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortisMalar471';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Fortune-Medcare-Hospital/2217.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FortuneMedcare2217';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Frontier-Lifeline-Pvt-Ltd/4518.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:FrontierLifeline4518';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/G-Kuppusamy-Naidu-Memorial-Hospital/1757.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GKuppusamyNaiduMemorial1757';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Galaxy-Hospital-(Galaxy-Life-Care-Services-Pvt-Ltd)/1895.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GalaxyLifeCareServices1895';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ganga-Nursing-Home/3852.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GangaNursingHome3852';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Geeta-Hospital/4116.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Geeta4116';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Global-5-Health-Care/776.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Global5HealthCare776';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Gopinath-Hospital-Pvt-Ltd/1648.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Gopinath1648';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Gore-Eye-Hospital/1171.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GoreEye1171';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Grace-And-Compassion-Hospital/1548.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GraceAndCompassion1548';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Gupta-Nursing-Home-and-Laparoscopy-Centre/151.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:GuptaNursingHomeAndLaparoscopyCentre151';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/H-K-Nursing-Home/2938.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HKNursingHome2938';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/HCG-Cancer-centre/2145.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HCGCancercentre2145';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/HCG-Multi-Speciality-Hospital-And-HCG-Cancer-Centre/4107.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HCGMultiSpecialityCancerCentre4107';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Healing-Hands-Hospital/5409.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HealingHands5409';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Health-Point-Nursing-Home/1521.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HealthPointNursingHome1521';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Heritage-Health-Care/3893.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:HeritageHealthCare3893';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Himagiri-Hospitals-Pvr-Ltd/967.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Himagiri967';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Hope-Hospital/2360.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Hope2360';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Icare-Eye-Hospital-and-Post-Graduate-Institute/38.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:IcareEyeAndPostGraduateInstitute38';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/ICON-Hospitals/1157.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ICON1157';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/ILS-Hospital,-Dumdum/723.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ILSDumdum723';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Indian-Spinal-Injuries-Centre/5034.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:IndianSpinalInjuriesCentre5034';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Indorewala-Ent-Hospital,-Dnb-Institution-and-Research-Centre/3787.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:IndorewalaEntDnbInstitutionAndResearchCentre3787';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Indraprastha-Apollo-Hospital/3145.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:IndraprasthaApollo3145';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Institute-of-Medical-Science-and-Sum-Hospital/1581.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:InstituteOfMedicalScience1581';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Institute-of-Medical-Science-and-Sum-Hospital/1618.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:InstituteOfMedicalScience1618';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jabalpur-Hospital-Research-Centre/3883.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JabalpurResearchCentre3883';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jaswant-Rai-Speciality-Hospital/4079.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JaswantRaiSpeciality4079';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jawahar-Eye-and-Ent-Hospital-And-Laser-Centre/5026.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JawaharEyeEntLaserCentre5026';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jawahar-Trauma-Centre/2958.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JawaharTraumaCentre2958';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jaypee-Hospital-(-A-unit-of-Jaypee-Healthcare-Ltd)/1387.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Jaypee1387';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jaypee-Hospital-(-A-unit-of-Jaypee-Healthcare-Ltd)/2001.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Jaypee2001';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jeevan-Hospital-and-stone-Centre/3871.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JeevanStoneCentre3871';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jeevan-Jyoti-Hospital/4337.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JeevanJyoti4337';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Jeevandeep-Hospital-and-Research-Centre/3099.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:JeevandeepResearchCentre3099';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Joy-Hospitals-Pvt-Ltd/2969.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Joy2969';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/K-K-R-Ent-Hospital-and-Research-Institute-Pvt-Ltd/4087.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KKREntResearchInstitute4087';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kalra-Hospital/5134.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kalra5134';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kalyan-Metro-Multispeciality-Hospital-Pvt-Ltd/1462.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KalyanMetroMultispeciality1462';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kalyan-Metro-Multispeciality-Hospital-Pvt-Ltd/1682.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KalyanMetroMultispeciality1682';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kamakshi-Hospital/821.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kamakshi821';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kamla-Eye-Clinic/2903.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KamlaEyeClinic2903';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Kapoor's-Kidney-Urostone-Centre-Pvt-Ltd/4296.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: KapoorsKidneyUrostoneCentre4296';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kasturba-Hospital/1403.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kasturba1403';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kauvery-Hospital/3195.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kauvery3195';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/KIMS-AL-Shifa-Healthcare-Pvt-Ltd/2519.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KIMSALShifaHealthcare2519';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/KIMS-Ramkrishna-Care-Hospital-(A-unit-of-KIMS-Superspeciality-Hospital-Pvt-Ltd)/1918.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KIMSRamkrishnaCare1918';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/KIMS-Ramkrishna-Care-Hospital-(A-unit-of-KIMS-Superspeciality-Hospital-Pvt-Ltd)/1948.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KIMSRamkrishnaCare1948';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kolmet-Hospital/2516.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Kolmet2516';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kosmos-Superspeciality-Hospital/4223.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KosmosSuperspeciality4223';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kosmos-Superspeciality-Hospital/679.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KosmosSuperspeciality679';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Kota-Heart-Institute/4224.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:KotaHeartInstitute4224';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Laxmi-Health-Care-Centre-and-ICCU/2788.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LaxmiHealthCareCentreAndICCU2788';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Laxmi-Narasimha-Hospital/1214.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LaxmiNarasimha1214';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Life-Care-Hospital(-A-Unit-of-Karunashraya-Medical-and-Research-Centre-Pvt-Ltd)/998.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LifeCare998';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lifecare-Multispeciality-Hospital/2272.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LifecareMultispeciality2272';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lifeline-Hospital/4531.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Lifeline4531';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Little-Flower-Hospital-and-Research-Centre/227.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LittleFlowerResearchCentre227';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Lotus-Children's-Hospital/2841.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals:LotusChildrens2841';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lourdes-Hospital/3553.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Lourdes3553';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lucknow-Healthcity-Trauma-Center-and-Super-Speciality-Hospital-Pvt-Ltd/1664.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LucknowHealthcityTraumaAndSuperSpeciality1664';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Lucknow-Healthcity-Trauma-Center-and-Super-Speciality-Hospital-Pvt-Ltd/1677.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:LucknowHealthcityTraumaAndSuperSpeciality1677';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/M-S-Ramaiah-Memorial-Hospital/2378.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MSRamaiahMemorial2378';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Madhulok-Hospital/1847.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Madhulok1847';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Maharishi-Dayanand-Hospital-and-Medical-Research-Centre/1548.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaharishiDayanandMedicalResearchCentre1548';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mahatma-Gandhi-Hospital/2915.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MahatmaGandhi2915';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Majumder-Millennium-Nursing-Home-and-Reliable-Diagnostic-Centre-Pvt-Ltd/128.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MajumderMillenniumNursingHome128';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mallya-Hospital/1735.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Mallya1735';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mallya-Hospital/3712.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Mallya3712';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Manipal-Northside-Hospital/3187.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ManipalNorthside3187';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Marina-Medical-Centre-Pvt-Ltd/68.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MarinaMedicalCentre68';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Marudhar-Hospital/4507.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Marudhar4507';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mary-Queens-Mission-Hospital/184.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaryQueensMission184';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Balaji-Hospital/3713.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxBalaji3713';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Balaji-Hospital/3797.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxBalaji3797';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Devki-Devi-Heart-and-Vascular-Institute/3477.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxDevkiDeviHeartAndVascularInstitute3477';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Hospital---Gurgaon/3793.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxGurgaon3793';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Hospital---Noida/259.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxNoida259';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Hospital---Pitampura/3794.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxPitampura3794';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Hospital/3715.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Max3715';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Hospital/3717.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Max3717';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Hospital/3734.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Max3734';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Super-Speciality-Hospital,-Mohali/2670.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxSuperSpecilaityMohali2670';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Super-Speciality-Hospital/2491.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxSuperSpecilaity2491';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Super-Specilaity-Hospital/3796.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxSuperSpecilaity3796';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Max-Superspeciality-Surgical-Hospital/2243.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MaxSuperspecialitySurgical2243';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mayom-Hospital/5046.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Mayom5046';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medical-Trust-Hospital/1251.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedicalTrust1251';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medical-Trust-Hospital/2746.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedicalTrust2746';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medicare-Clinic-(I)-Ltd/454.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedicareClinicI454';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medihope-Hospitals-and-Research-Centre-Pvt-Ltd/1107.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedihopeResearchCentre1107';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medilife-Multispeciality-Hospital-and-ICU/1013.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedilifeMultispecialityICU1013';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medistar-Hospital-Pvt-Ltd/5049.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Medistar5049';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mediview-Clinics-And-Hospitex/1118.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MediviewClinicsAndHospitex1118';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Medstar-Speciality-Hospital-/2073.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MedstarSpeciality2073';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Meenakshi-Mission-Hospital-and-Research-Centre/3542.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MeenakshiMissionResearchCentre3542';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Meerut-Kidney-Hospital-Pvt-Ltd/5094.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MeerutKidney5094';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Metro-Heart-Institute/2878.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MetroHeartInstitute2878';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Metro-Life-Line-Hospital/3092.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MetroLifeLine3092';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Metro-MAS-Heart-Care-and-Multispeciality-Hospital/1582.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MetroMASHeartCareAndMultispeciality1582';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mewar-Hospital-Pvt-Ltd/1424.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Mewar1424';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Mewar-Hospital-Pvt-Ltd/2076.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Mewar2076';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Miracles-Mediclinic-(Arvind-Medicare-Private-Limited)/3259.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:MiraclesMediclinicArvindMedicare3259';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Moon-Hospital-Pvt-Ltd/889.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Moon889';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Mother's-Speciality-Hospital/1773.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: MothersSpeciality1773';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Motherhood-(Unit-of-Rhea-Healthcare)/1442.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Motherhood1442';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Motherhood-(Unit-of-Rhea-Healthcare)/2453.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Motherhood2453';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Moulana-Hospital/3139.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Moulana3139';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/N-C-Jindal-Institute-of-Medical-Care-and-Research/1547.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NCJindalInstituteMedicalCareAndResearch1547';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/N-K-Chatterjee-Memorial-Maternity-Cum-Nursing-Home/3382.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NKChatterjeeMemorialMaternityNursingHome3382';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/N-M-Wadia-Institute-of-Cardiology/2641.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NMWadiaInstituteCardiology2641';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nalluri-Nursing-Home/969.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NalluriNursingHome969';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nankem-Hospital/5054.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Nankem5054';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Narayana-Hrudayalaya-Private-Limited/604.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NarayanaHrudayalaya604';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Narayana-Nethralaya/1792.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NarayanaNethralaya1792';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Narayana-Nethralaya/3741.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NarayanaNethralaya3741';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nemcare-Hospital/1421.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Nemcare1421';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nemcare-Hospital/2073.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Nemcare2073';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Neo-Hospital/1861.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Neo1861';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Neoretina-Eye-Care-Institue/3128.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NeoretinaEyeCareInstitue3128';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nephroplus-Kidney-Care-Centre---Sai-Hospital/4083.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NephroplusKidneyCareCentreSai4083';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nephroplus-Kidney-Care-Centre---Sunflag-Superspeciality-Hospital/4084.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NephroplusKidneyCareAndSuperSpeciality4084';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/New-Vision-Laser-Centers-(Rajkot)-Pvt-Ltd-(A-Subsidiary-of-New-Delhi-Centre-For-Sight-Ltd)/1662.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NewVisionLaserCentersRajkot1662';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/NH-Brahmananda-Narayana-Multispeciality-Hospital/1034.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NHBrahmanandaNarayanaMultispeciality1034';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nikhil-Multi-Speciality-Hospital/4877.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NikhilMultiSpeciality4877';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Niramaya-Hospitals-Pvt-Ltd/3863.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Niramaya3863';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Nirman-Orthopaedics-Pvt-Ltd/4222.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:NirmanOrthopaedics4222';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Noble-Hospital-Pvt-Ltd/3728.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Noble3728';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Noble-Hospital-Pvt-Ltd/5053.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Noble5053';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Omni-Hospital/3820.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Omni3820';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Omni-Hospital/4295.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Omni4295';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Orthonova-Hospital/3205.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Orthonova3205';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Oscar-Super-Speciality-Hospital-and-Trauma-Center-Pvt-Ltd/1600.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:OscarSuperSpecialityTraumaCenter1600';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/P-D-Hinduja-Sindhi-Hospital/4451.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PDHindujaSindhi4451';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Panacea-Hospital-Pvt-Ltd/3750.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Panacea3750';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Paras-Hospital/3993.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Paras3993';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Parmar-Nursing-Home/4052.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ParmarNursingHome4052';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Patanjali-Hospital-Pvt-Ltd/1349.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Patanjali1349';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Patel-Hospital/1097.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Patel1097';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/People-Tree-Hospital/1689.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PeopleTree1689';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ponmalligai-Hospital-Pvt-Ltd/2753.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Ponmalligai2753';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Poona-Hospital-and-Research-Centre/3753.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PoonaResearchCentre3753';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ppm-Medical-Research-And-Trauma-Centre-(P)-Ltd/4076.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PpmMedicalResearchAndTraumaCentre4076';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Prakruti-Hospital/4550.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Prakruti4550';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Pratiksha-Hospital/2193.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Pratiksha2193';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Prem-Hospital-and-Research-Centre/1346.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PremResearchCentre1346';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Prem-Hospital-and-Research-Centre/1890.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PremResearchCentre1890';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Priya-Nursing-Home/3180.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PriyaNursingHome3180';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Priyadarshi-Hospitals-and-Hospital-and-Research-Centre-Private-Limited/4736.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PriyadarshiResearchCentre4736';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Prof-D-Ramakotaiah-Children's-Hospital/1946.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: ProfDRamakotaiahChildrens1946';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Pulikkal-Medical-Foundation-Owners-of-Medical-Trust-Hospital/1819.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PulikkalMedicalFoundationOwnersMedicalTrust1819';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Pushpanjali-Hospital/1549.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Pushpanjali1549';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Pushpawati-Singhania-Research-Institute-For-Liver,-Renal-and-Digestive-Diseases/226.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:PushpawatiSinghaniaResearchInstitute226';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/R-G-Stone-Urology-and-Laparoscopy-Hospital/3294.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RGStoneUrologyAndLaproscopy3294';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Raghava-Hospital/5220.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Raghava5220';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Raghavendra-Hospitals/1329.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Raghavendra1329';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Rainbow-Children's-Medicare-Pvt-Ltd/714.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: RainbowChildrensMedicare714';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/Rainbow-Children's-Medicare-Pvt-Ltd/3340.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: RainbowChildrensMedicare3340';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rainbow-Super-Speciality-Hospital-For-Women-and-Children/4014.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RainbowSuperSpecialityForWomenAndChildren4014';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rajalakshmi-Multispeciality-Hospital/5303.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RajalakshmiMultispeciality5303';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rajiv-Gandhi-Cancer-Institute-and-Research-Centre(A-Unit-of-Indraprastha-Cancer-Society-and-Research-Centre)/2663.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RajivGandhiCancerInstituteAndResearchCentre2663';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rajshekar-Multi-Speciality-Hospital-Pvt-Ltd/3471.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RajshekarMultiSpeciality3471';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Raksha-Hospitals/1443.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Raksha1443';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rakshita-Nursing-Home/2853.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RakshitaNursingHome2853';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rama-Atray-Memorial-Eye-Hospital/1661.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RamaAtrayMemorialEye1661';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rama-Hospital-and-Research-Centre/983.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RamaResearchCentre983';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rg-Stone-Urology-and-Laparoscopy-Hospital/3391.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RGStoneUrologyAndLaproscopy3391';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rg-Stone-Urology-And-Laparoscopy-Hospital/3910.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RGStoneUrologyAndLaproscopy3910';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/RG-Stone-Urology-And-Laparoscopy-Hospital/4169.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RGStoneUrologyAndLaproscopy4169';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rockland-Hospitals-Limited/4093.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Rockland4093';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Rohit-Eye-Hospital-and-Child-Care-Centre/3081.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RohitEyeAndChildCareCentre3081';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ruban-Emergency-Hospital/3082.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RubanEmergency3082';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ruby-Hall-Clinic/3387.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RubyHallClinic3387';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Ruby-Hall-Clinic/4649.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:RubyHallClinic4649';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/S-N-R-Hospital/1802.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SNR1802';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sagar-Apollo-Hospitals/4343.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SagarApollo4343';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sagar-Hospitals/3239.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sagar3239';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sahai-Hospital-and-Research-Centre/3549.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SahaiResearchCentre3549';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sahara-Hospital/3900.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sahara3900';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sahyadri-Hospital---Bopodi/1122.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SahyadriBopodi1122';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sahyadri-Narayana-Multispeciality-Hospital/1222.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SahyadriNarayanaMultispeciality1222';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sahyadri-Speciality-Hospital/1325.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SahyadriSpeciality1325';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sai-Anurag-Hospitals/4733.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SaiAnurag4733';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sai-Krishna-Hi-Tech-Hospital-and-Research-Institute/3195.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SaiKrishnaHiTechResearchInstitute3195';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Saifee-Hospital/1150.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Saifee1150';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Saket-Medicare-and-Research-Centre-Pvt-Ltd/2787.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SaketMedicareAndResearchCentre2787';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sakra-World-Hospital(A-Unit-of-Takshasila-Operatiing-Private-Limited)/2675.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SakraWorld2675';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Samal-Care-Pvt-Ltd/2800.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SamalCare2800';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sanjana-Orthopaedic-Hospital/3938.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SanjanaOrthopaedic3938';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sanjeevini-Hospital/1502.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sanjeevini1502';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sankara-Nethralaya-(A-Unit-Of-Medical-Research-Foundation)/633.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SankaraNethralaya633';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sarathi-Multispeciality-Hospital-Pvt-Ltd/222.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SarathiMultispeciality222';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Saroj-Super-Speciality-Hospital/2346.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SarojSuperSpeciality2346';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sarvodaya-Hospital-and-Research-Centre/2809.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SarvodayaResearchCentre2809';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sarvodaya-Hospital-and-Research-Centre/3025.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SarvodayaResearchCentre3025';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sarvodaya-Hospital/3026.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sarvodaya3026';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sarvodaya-Hospital/71.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sarvodaya71';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Seven-Eleven-Hospital/2585.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SevenEleven2585';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Seven-Hill-Health-Care-Pvt-Ltd/2659.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SevenHillsHealthCare2659';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Seven-Hills-Health-Care-Pvt-Ltd/123.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SevenHillsHealthCare123';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shakti-Hospital/3919.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Shakti3919';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shalby-Ltd/5127.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Shalby5127';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shanti-Hospital/4137.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Shanti4137';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sharda-Hospital/3397.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sharda3397';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shija-Hospital-and-Research-Institute-Pvt-Ltd/2458.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShijaResearchInstitute2458';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shree-Balaji-Hospital/1769.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShreeBalaji1769';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shree-Giriraj-Multispeciality-Hospital/639.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShreeGirirajMultispeciality639';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shree-Mahavir-Health-and-Medical/682.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShreeMahavirHealthAndMedical682';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shree-Narayana-Hospital/4207.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShreeNarayana4207';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shreedevi-Hospital/2862.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Shreedevi2862';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shri-Chandra-Hospital/2021.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShriChandra2021';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shri-Chandra-Hospital/2166.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShriChandra2166';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shri-Daya-Dutt-Vashist-Hospital/2760.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShriDayaDuttVashist2760';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shriram-Care-Hospital/2625.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShriramCare2625';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shroff-Eye-Centre/465.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ShroffEyeCentre465';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Shubham-Hospital/777.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Shubham777';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sibia-Healthcare-Pvt-Ltd/3297.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SibiaHealthcare3297';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Siddham-ENT-Center/2932.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SiddhamENTCenter2932';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sitaram-Bhartia-Institute-of-Science-and-Research/3746.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SitaramBhartiaInstituteOfScienceAndResearch3746';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sparsh-Malhotra-Hospital/1619.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SparshMalhotra1619';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sravani-Hospital/2598.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sravani2598';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sree-Hospital/1353.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sree1353';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Aurobindo-Seva-Kendra/3133.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriAurobindoSevaKendra3133';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Laxmi-Hospital/1556.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriLaxmi1556';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Laxmi-Hospital/1583.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriLaxmi1583';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Parvathi-Surgical-Nursing-Home-And-Diabetic-Care-Centre/599.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriParvathiSurgicalNursingHome599';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Ramachandra-Medical-Centre/1767.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriRamachandraMedicalCentre1767';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Ramachandra-Medical-Centre/1836.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriRamachandraMedicalCentre1836';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Ramachandra-Medical-Centre/3765.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriRamachandraMedicalCentre3765';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Sai-Speciality-Hospital/2717.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriSaiSpeciality2717';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Shankara-Cancer-Hospital-and-Ressearch-Centre/1219.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriShankaraCancerandRessearchCentre1219';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sri-Sri-Holistic-Hospitals/1054.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SriSriHolistic1054';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Srinivasa-Hospital/173.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Srinivasa173';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/SRM-Speciality-Hospital/2594.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SRMSpeciality2594';
        break;
    case "apollomunichinsurance.com/apollo-munich-network-hospitals/St-John's-Medical-College-Hospital/31.aspx":
        SC_PageName = 'AMHI:Services: NetworkHospitals: StJohnsMedicalCollege31';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Star-Hospital-Pvt-Ltd/1980.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Star1980';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sterling-Divinelire-Hospital/784.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SterlingDivinelire784';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sterling-Divinelire-Hospital/815.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SterlingDivinelire815';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sterling-Hospital/4691.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sterling4691';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Subam-Speciality-Hospital/1450.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SubamSpeciality1450';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sujata-Birla-Hospital-And-Medical-Research-Centre/826.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SujataBirlaMedicalResearchCentre826';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sukhda-Multispeciality-Hospital-(A-unit-of-Vandam-Healthcare)/1512.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SukhdaMultispeciality1512';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Suman-Hospital-(Surgical-Laproscopic-Resarch-Centre)/1517.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SumanSurgicalLaproscopicResarchCentre1517';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sumitra-Hospital/4593.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Sumitra4593';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Sunshine-Heart-Institute/3996.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SunshineHeartInstitute3996';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Supraja-Hospitals(A-Unit-of-Sai-Sravan-Healthcare-Pvt-Ltd)/1081.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Supraja1081';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Surana-Hospital-And-Pesearch-Centre/4536.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SuranaPesearchCentre4536';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Surya-Multispeciality-Hospital/4669.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SuryaMultispeciality4669';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Swami-Rama-Himalayan-University/1921.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:SwamiRamaHimalayanUniversity1921';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Swatantra-Hospitals-Pvt-Ltd/1221.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Swatantra1221';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Swatantra-Hospitals-Pvt-Ltd/2780.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Swatantra2780';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Tarawati-Super-Speciality-Hospital/2728.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:TarawatiSuperSpeciality2728';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Thunga-Hospital-Pvt-Ltd/3461.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Thunga3461';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Titan-Hospital/4147.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Titan4147';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Trisha-Trauma-Centre-and-ICU/1278.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:TrishaTraumaCentreandICU1278';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Tulip-Hospitals-Pvt-Ltd/5102.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Tulip5102';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Udayagiri-Multi-Speciality-Hospital/4481.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:UdayagiriMultiSpeciality4481';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Udyan-Hospital-(A-unit-of-IGIMS-Pvt-Ltd)/1779.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Udyan1779';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/United-Hospital/1792.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:United1792';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vaatsalaya-Life-Hospital/1815.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VaatsalayaLife1815';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Valencia-Emergency-and-Criti-Care-Hospital/4285.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ValenciaEmergencyCritiCare4285';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Varun-Trauma-and-Burn-Center-Pvt-Ltd/1205.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VarunTraumaAndBurnCenter1205';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vasan-Eye-Care-Hospital---Kanpur/2891.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VasanEyeCareKanpur2891';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vasan-Eye-Care-Hospital---Vellore/587.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VasanEyeCareVellore587';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Venkataeswara-Hospitals/1594.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Venkataeswara1594';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vikas-Hospital-Pvt-Ltd/3901.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Vikram3901';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vikram-Hospital-Bengaluru-Pvt-Ltd/5131.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VikramBengaluru5131';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vinayaka-Mission-Hospital/108.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VinayakaMission108';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Visakha-Ent-Hospital/39.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VisionEnt39';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Vision-Eye-Hospital/837.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:VisionEye837';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Woodlands-Multispeciality-Hospital-Ltd/2519.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:WoodlandsMultispeciality2519';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yashoda-Hospital(-A-Unit-Of-Yashoda-Healthcare-Services-Pvt-Ltd)/1728.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Yashoda1728';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yashoda-Super-Speciality-Hospital---Kaushambi/3294.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:YashodaSuperSpecialityKaushambi3294';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yashoda-Super-Speciality-Hospital---Kaushambi/4889.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:YashodaSuperSpecialityKaushambi4889';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yashoda-Super-Speciality-Hospital---Nehru-Nagar/145.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:YashodaSuperSpecialityNehruNagar145';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yashomati-Hospitals-Pvt-Ltd/609.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Yashomati609';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Yenepoya-Hospital/3240.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Yenepoya3240';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Zenith-Super-Specialist-Hospital/919.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ZenithSuperSpecialist919';
        break;
    case 'apollomunichinsurance.com/apollo-munich-network-hospitals/Zydus-Hospitals-and-Healthcare-Research--Pvt-Ltd/3903.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:ZydusHealthcareResearch';
        break;
    case 'apollomunichinsurance.com/our-hospital-network.aspx/index.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Index';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Bharti-Medicare-Private-Limited)/39.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic39';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic/62.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic62';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Super-Religare-Laboratories-Ltd/17.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:SuperReligareLaboratories17';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Lynx-Healthplus-Services-Pvt-Ltd)/55.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic55';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(The-Wellness-Clinic)/57.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic57';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic/73.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic73';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Super-Religare-Laboratories-Ltd/16.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:SuperReligareLaboratories16';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Apollo-Day-Care-Surgery(Apollo-Health-and-Lifestyle-Ltd)/8.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:ApolloDayCareSurgery8';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Apollo-Health-and-Lifestyle-Ltd)/49.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic49';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Apollo-Hospitals/1.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Apollos1';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Artemis-Health-Institute/4.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:ArtemisHealthInstitute4';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Super-Religare-Laboratories-Ltd/9.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:SuperReligareLaboratories9';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/N-M-Virani-Wockhardt-Hospital/2.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:NMViraniWockhardt2';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Super-Religare-Laboratories-Ltd/22.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:SuperReligareLaboratories22';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Super-Religare-Laboratories-Ltd/26.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:SuperReligareLaboratories26';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(One-World-Impex-Pvt-Ltd)/54.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic54';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(One-World-Impex-Pvt-Ltd)/56.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic56';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Sanjeevani-Health-Lifestyle-Pvt-Ltd)/69.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic69';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic/83.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic83';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Miracles-Mediclinic-(Arvind-Medicare-Private-Limited)/6.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:MiraclesMediclinic6';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Super-Religare-Laboratories-Ltd/20.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:SuperReligareLaboratories20';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Apollo-Health-and-Lifestyle-Ltd)/47.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic47';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Apollo-Health-and-Lifestyle-Ltd)/60.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic60';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Apollo-Health-and-Lifestyle-Ltd)/68.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic68';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Osler-Diagnostics-Private-Limited/5.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:OslerDiagnostics';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Super-Religare-Laboratories-Ltd/11.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:SuperReligareLaboratories11';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/Super-Religare-Laboratories-Ltd/12.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:SuperReligareLaboratories12';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Apollo-Health-and-Lifestyle-Ltd)/31.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic31';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Apollo-Health-and-Lifestyle-Ltd)/33.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic33';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Apollo-Health-and-Lifestyle-Ltd)/44.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic34';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic-(Maskara-Finvest-Pvt-Ltd)/66.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic44';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic(Apollo-health-and-Lifestyle-Limited)/65.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic65';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic/74.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic74';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic/75.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic75';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic/76.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic76';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic/77.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic77';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic/78.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic78';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic/79.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic79';
        break;
    case 'apollomunichinsurance.com/MHC-Diagnostic-Centers/The-Apollo-Clinic/80.aspx':
        SC_PageName = 'AMHI:Services:DiagnosticCenters:Clinic80';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Home';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Bangalore-Jayanagar.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:BangaloreJayaNagar';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/central-processing-center.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:CentralProcessingCenter';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/chennai.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Chennai';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Chennai-Adyar.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:ChennaiAdyar';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/chennai-ashoknagar.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:ChennaiAshokNagar';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/cochin.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Cochin';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/delhi.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Delhi';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/delhi-bhikaji-cama-place.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:DelhiBhikajiCamaPlace';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/delhi-janak-puri.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:DelhiJanakPuri';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/gurgaon.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Gurgoan';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/hyderabad.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Hyderabad';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/mumbai-andheri-east.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:MumbaiAndheriEast';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/kolkata-elgin-road.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:KolkataElginRoad';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/kolkata.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Kolkata';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/noida.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Noida';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/bhubaneswar.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Bhubaneswar';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/delhi-laxminagar.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:DelhiLaxminagar';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/jaipur.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Jaipur';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/pune.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Pune';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/bihar-patna-branch.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:BiharPatnaBranch';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/gujarat-ahemdabad.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:GujuratAhemdabad';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/navi-mumbai.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:NaviMumbai';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/chandigarh.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Chandigrah';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/mumbai-thane.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:MumbaiThane';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Kanpur.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Kanpur';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/bangalore.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Bangalore';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/assam-guwahati.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:AssamGuwahati';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/hyderabad-secundrabad.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:HyderabadSecunderabad';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/delhi-pitampura.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:DelhiPitampura';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/lucknow.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Lucknow';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/gurgaon-14-sector.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Gurgoan14Sector';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/coimbatore.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Coimbatore';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/trivandrum.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Trivandrum';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Fort.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Fort';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Mumbai-Dadar.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:MumbaiDadar';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Surat.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Surat';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Hyderabad-Vijayawada.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:HyderabadVijayawada';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Allahbad.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Allahbad';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/andhra-pradesh-visakhapatnam.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:AndraPradeshVisakhapatnam';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Vadodara.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Vadodara';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Indore.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Indore';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/jharkhand-ranchi.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:JharkhandRanchi';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/madurai.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Madhurai';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Nagpur.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Nagpur';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/west-bengal-howrah.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:WestBengalHowrah';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Bhopal.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Bhopal';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/ludhiana.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Ludhiana';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/tamil-nadu-trichy.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:TamilnaduTirchy';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Rajkot.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Rajkot';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Mumbai-Ghatkopar.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:MumbaiGhatkopar';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Mumbai-Kalyan.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:MumbaiKalyan';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/nasik.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Nasik';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/uttaranchal-dehradun.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:UttaranchalDehradun';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/delhi-shakti-nagar.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:DelhiShaktiNagarBranch';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/hyderabad-warangal.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:HyderabadWarangal';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/maharashtra-pune.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:MaharastraPune';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/boriwali.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Boriwali';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Haryana-Karnal-Branch.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:HaryanaKarnalBranch';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/west-bengal-siliguri.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:WestBengalSiliguri';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/andhra-pradesh-hyderabad.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:AndraPradeshHyderabad';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/mysore.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Mysore';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/rajasthan-jaipur.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:RajasthanJaipur';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Jalandhar.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Jalandhar';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/chhattisgarh-raipur.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:ChhattisgarhRaipur';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/rajasthan-kota.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:RajasthanKota';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/Jodhpur.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:Jodhpur';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/karnataka-hubli.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:KarnatakaHubli';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/uttar-pradesh-varanasi.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:UttarPradeshVaranasi';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/punjab-amritsar.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:PunjabAmritsar';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/mumbai-vashi.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:MumbaiVashi';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/bihar-patna-branch-1.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:BiharPatnaBranch1';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/gujarat-moje-motera.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:GujaratMojeMotera';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/tamil-nadu-salem.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:TamilNaduSalem';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/gujarat-sabarkantha.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:GujaratSabarkantha';
        break;
    case 'apollomunichinsurance.com/health-insurance-offices/uttar-pradesh-agra.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOffices:UttarPradeshAgra';
        break;
    case 'apollomunichinsurance.com/apollo-munich-diabetes-plan-energy-downloads.aspx':
        SC_PageName = 'AMHI:Services:Downloads:DiabetesEnergyForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Dengue-Care-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:DengueCareForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Easy-Domestic-Travel-Insurance-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:EasyDomesticTravelInsuranceForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Easy-Health-Individual-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:EasyHealthIndividualForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Easy-Travel-Insurance-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:EasyTravelInsuranceForms';
        break;
    case 'apollomunichinsurance.com/Downloads-EveryDayCare-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:EveryDayCareForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Individual-Personal-Accident-Insurance-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:IndividualPersonalAccidentInsuranceForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Maxima-Health-Insurance-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:MaximaHealthInsuranceForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Optima-Cash-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:OptimaCashForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Optima-Restore-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:OptimaRestoreForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Optima-Seniors-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:OptimaSeniorsForms';
        break;
    case 'apollomunichinsurance.com/downloads-optima-super-forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:OptimaSuperForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Optima-Vital-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:OptimaVitalForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Others-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:OtherForms';
        break;
    case 'apollomunichinsurance.com/Downloads-Optima-Plus-Forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:OptimaPlusForms';
        break;
    case 'apollomunichinsurance.com/Downloads/Easy-Travel-Insurance-Policywordings.aspx':
        SC_PageName = 'AMHI:Services:Downloads:EasyTravelInsurancePolicywordings';
        break;
    case 'apollomunichinsurance.com/download-educare-forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:EducareForms';
        break;
    case 'apollomunichinsurance.com/health-insurance-forms.aspx':
        SC_PageName = 'AMHI:Services:Downloads:HealthInsuranceForms';
        break;
    case 'apollomunichinsurance.com/Public-Disclosures/2007-2008.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:20072008';
        break;
    case 'apollomunichinsurance.com/Public-Disclosures/2008-2009.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:20082009';
        break;
    case 'apollomunichinsurance.com/Public-Disclosures/2009-2010.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:20092010';
        break;
    case 'apollomunichinsurance.com/Public-Disclosures/2010-2011.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:20102011';
        break;
    case 'apollomunichinsurance.com/Public-Disclosures/2011-2012.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:20112012';
        break;
    case 'apollomunichinsurance.com/Public-Disclosures/2012-2013.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:20122013';
        break;
    case 'apollomunichinsurance.com/Public-Disclosures/2013-2014.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:20132014';
        break;
    case 'apollomunichinsurance.com/Public-Disclosures/2014-1.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:20141';
        break;
    case 'apollomunichinsurance.com/Public-Disclosures/2014-2015.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:20142015';
        break;
    case 'apollomunichinsurance.com/Public-Disclosures/Unclaimed-Amount.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:UnclaimedAmount';
        break;
    case 'apollomunichinsurance.com/Miscellanous/Public-Disclosures/2013-2014/FY-2013-14.aspx':
        SC_PageName = 'AMHI:Services:PublicDisclosures:20132014:FY201314';
        break;
    case 'apollomunichinsurance.com/Support/Customer-Service.aspx':
        SC_PageName = 'AMHI:Services:Support:CustomerService';
        break;
    case 'apollomunichinsurance.com/Support/Escalate-Thanks.aspx':
        SC_PageName = 'AMHI:Services:Support:EscalateThanks';
        break;
    case 'apollomunichinsurance.com/Support/Escalate-Your-Case.aspx':
        SC_PageName = 'AMHI:Services:Support:EscalateYourCase';
        break;
    case 'apollomunichinsurance.com/Support/Grievance-Thanks.aspx':
        SC_PageName = 'AMHI:Services:Support:GrievenceThanks';
        break;
    case 'apollomunichinsurance.com/Support/Grievence-New.aspx':
        SC_PageName = 'AMHI:Services:Support:GrievenceNew';
        break;
    case 'apollomunichinsurance.com/Support/Hospital-Details.aspx':
        SC_PageName = 'AMHI:Services:Support:HospitalDetails';
        break;
    case 'apollomunichinsurance.com/Support/Locate-our-Branches/Haryana-Gurgaon-Branch-(1).aspx':
        SC_PageName = 'AMHI:Services:LocateBranches:HealthInsuranceOffice:HaryanaGurgaonBranch1';
        break;
    case 'apollomunichinsurance.com/About/Privacy-Policy.aspx':
        SC_PageName = 'AMHI:Services:PrivatePolicy';
        break;
    case 'apollomunichinsurance.com/about-us/mbr-documents.aspx':
        SC_PageName = 'AMHI:Services:MbrDocuments';
        break;
    case 'apollomunichinsurance.com/Annual-Day.aspx':
        SC_PageName = 'AMHI:Services:AnnualDay';
        break;
    case 'apollomunichinsurance.com/apollo-hospital-group.aspx':
        SC_PageName = 'AMHI:Services:ApolloHospitalGroup';
        break;
    case 'apollomunichinsurance.com/Apollo-Munich-Culture.aspx':
        SC_PageName = 'AMHI:Services:ApolloMunichCulture';
        break;
    case 'apollomunichinsurance.com/apollo-munich-history.aspx':
        SC_PageName = 'AMHI:Services:ApolloMunichHistory';
        break;
    case 'apollomunichinsurance.com/apollo-munich-thank-you.aspx':
        SC_PageName = 'AMHI:Services:ApolloMunichThankYou';
        break;
    case 'apollomunichinsurance.com/Careers.aspx':
        SC_PageName = 'AMHI:Services:Careers:Home';
        break;
    case 'apollomunichinsurance.com/Careers/Apply-Now.aspx':
        SC_PageName = 'AMHI:Services:Careers:ApplyNow';
        break;
    case 'apollomunichinsurance.com/Careers/Recruitment.aspx':
        SC_PageName = 'AMHI:Services:Careers:Recruitment';
        break;
    case 'apollomunichinsurance.com/Children-Day.aspx':
        SC_PageName = 'AMHI:Services:ChildrenDay';
        break;
    case 'apollomunichinsurance.com/claim-procedure.aspx':
        SC_PageName = 'AMHI:Services:Claimprocedure';
        break;
    case 'apollomunichinsurance.com/contact-update.aspx':
        SC_PageName = 'AMHI:Services:ContactUpdate';
        break;
    case 'apollomunichinsurance.com/contact-update-thanks.aspx':
        SC_PageName = 'AMHI:Services:ContactUpdateThanks';
        break;
    case 'apollomunichinsurance.com/Contest-Winner-Result.aspx':
        SC_PageName = 'AMHI:Services:ContestWinnerResult';
        break;
    case 'apollomunichinsurance.com/cookie-policy.aspx':
        SC_PageName = 'AMHI:Services:CookiePolicy';
        break;
    case 'apollomunichinsurance.com/customer-insurance-services.aspx':
        SC_PageName = 'AMHI:Services:CustomerInsuranceServices';
        break;
    case 'apollomunichinsurance.com/customer-insurance-services/testimonial-thanks.aspx':
        SC_PageName = 'AMHI:Services:CustomerInsuranceServices:TestimonialThanks';
        break;
    case 'apollomunichinsurance.com/donotcall.aspx':
        SC_PageName = 'AMHI:Services:DoNotCall';
        break;
    case 'apollomunichinsurance.com/financials.aspx':
        SC_PageName = 'AMHI:Services:Financials';
        break;
    case 'apollomunichinsurance.com/fun-at-work.aspx':
        SC_PageName = 'AMHI:Services:FunAtWork';
        break;
    case 'apollomunichinsurance.com/general-queries.aspx':
        SC_PageName = 'AMHI:Services:GeneralQueries';
        break;
    case 'apollomunichinsurance.com/healthcare-customer-sms-service.aspx':
        SC_PageName = 'AMHI:Services:HealthcareCustomerSMSService';
        break;
    case 'apollomunichinsurance.com/health-centre-list.aspx':
        SC_PageName = 'AMHI:Services:HealthCentreList';
        break;
    case 'apollomunichinsurance.com/health-insurance-our-partners.aspx':
        SC_PageName = 'AMHI:Services:HealthInsuranceOurPartners';
        break;
    case 'apollomunichinsurance.com/healthline-customer-service.aspx':
        SC_PageName = 'AMHI:Services:HealthlineCustomerService';
        break;
    case 'apollomunichinsurance.com/Help-Us-Improve.aspx':
        SC_PageName = 'AMHI:Services:HelpUsImprove';
        break;
    case 'apollomunichinsurance.com/Hiring-Process.aspx':
        SC_PageName = 'AMHI:Services:HiringProcess';
        break;
    case 'apollomunichinsurance.com/Individual-Agents-Data.aspx':
        SC_PageName = 'AMHI:Services:IndividualAgentsData';
        break;
    case 'apollomunichinsurance.com/insurance-grievance-customer-services.aspx':
        SC_PageName = 'AMHI:Services:InsuranceGrievanceCustomerServices:Home';
        break;
    case 'apollomunichinsurance.com/insurance-grievance-customer-services/process-of-grievance-redressal.aspx':
        SC_PageName = 'AMHI:Services:InsuranceGrievanceCustomerServices:GrievanceRedressal';
        break;
    case 'apollomunichinsurance.com/Job-Details.aspx':
        SC_PageName = 'AMHI:Services:JobDetails';
        break;
    case 'apollomunichinsurance.com/kourier-konnect.aspx':
        SC_PageName = 'AMHI:Services:KourierKonnect';
        break;
    case 'apollomunichinsurance.com/More/Join-Us.aspx':
        SC_PageName = 'AMHI:Services:More:JoinUs';
        break;
    case 'apollomunichinsurance.com/nopayableitem.htm':
        SC_PageName = 'AMHI:Services:NoPayableItem';
        break;
    case 'apollomunichinsurance.com/portability-reminder.aspx':
        SC_PageName = 'AMHI:Services:PortabilityReminder';
        break;
    case 'apollomunichinsurance.com/Postlogin/post_login_Individual_Register.aspx':
        SC_PageName = 'AMHI:Services:LoginPortal:IndividualRegister';
        break;
    case 'apollomunichinsurance.com/pre-sales-queries.aspx':
        SC_PageName = 'AMHI:Services:PreSalesQueries';
        break;
    case 'apollomunichinsurance.com/previous-policy-details.aspx':
        SC_PageName = 'AMHI:Services:PreviousPolicyDetails';
        break;
    case 'apollomunichinsurance.com/privacy-policy.aspx':
        SC_PageName = 'AMHI:Services:PrivacyPolicy';
        break;
    case 'apollomunichinsurance.com/Refer-A-Colleague.aspx':
        SC_PageName = 'AMHI:Services:ReferAColleague';
        break;
    case 'apollomunichinsurance.com/refer-friend.aspx':
        SC_PageName = 'AMHI:Services:ReferFriend';
        break;
    case 'apollomunichinsurance.com/Request-A-Call-Back.aspx':
        SC_PageName = 'AMHI:Services:RequestACallBack';
        break;
    case 'apollomunichinsurance.com/sitemap.aspx':
        SC_PageName = 'AMHI:Services:SiteMap';
        break;
    case 'apollomunichinsurance.com/sitepages.aspx':
        SC_PageName = 'AMHI:Services:SitePages';
        break;
    case 'apollomunichinsurance.com/terms-and-conditions.aspx':
        SC_PageName = 'AMHI:Services:TermsAndConditions';
        break;
    case 'apollomunichinsurance.com/testimonial.aspx':
        SC_PageName = 'AMHI:Services:Testimonial';
        break;
    case 'apollomunichinsurance.com/What-We-Look-For.aspx':
        SC_PageName = 'AMHI:Services:WhatWeLookFor';
        break;
    case 'apollomunichinsurance.com/why-apollo-munich.aspx':
        SC_PageName = 'AMHI:Services:WhyApolloMunich';
        break;
    case 'apollomunichinsurance.com/Your-Voice-Matters.aspx':
        SC_PageName = 'AMHI:Services:YourVoiceMatters';
        break;
    case 'apollomunichinsurance.com/Quick-Links/Locate-our-Hospitals.aspx':
        SC_PageName = 'AMHI:Services:LocateOurHospitals:Home';
        break;
    case 'apollomunichinsurance.com/customer-insurance-services/thank-you.aspx':
        SC_PageName = 'AMHI:Services:CustomerInsuranceThanks';
        break;
    case 'apollomunichinsurance.com/Mailer/claim-settlement-process/index.html':
        SC_PageName = 'AMHI:Services:Mailer:ClaimSettlementProcess';
        break;
    case 'apollomunichinsurance.com/Job-Admin.aspx':
        SC_PageName = 'AMHI:Services:JobAdmin';
        break;
    case 'apollomunichinsurance.com/Quick-Links/Health-Insurance.aspx':
        SC_PageName = 'AMHI:Services:QuickLinks';
        break;
    case 'apollomunichinsurance.com/Quick-Links/Update-Your-Contact-Details.aspx':
        SC_PageName = 'AMHI:Services:QuickLinks:UpdateYourContactDetials';
        break;
    case 'apollomunichinsurance.com/healthcare-customer-email-service.aspx':
        SC_PageName = 'AMHI:Services:CustomerEmail';
        break;
    case 'apollomunichinsurance.com/our-hospital-network.aspx':
        SC_PageName = 'AMHI:Services:NetworkHospitals:Home';
        break;
    case 'apollomunichinsurance.com/search.aspx':
        SC_PageName = 'AMHI:Services:InternalSearchHome';
        break;
    case 'apollomunichinsurance.com/customer-insurance-services/thank-you-sales.aspx':
        SC_PageName = 'AMHI:Services:CustomerInsuranceSalesThanks';
        break;
    case 'apollomunichinsurance.com/educare.aspx':
        SC_PageName = 'AMHI:Services:Educare';
        break;
    case 'apollomunichinsurance.com/Annual-Day-Thanks.aspx':
        SC_PageName = 'AMHI:Services:AnnualDayThanks';
        break;
    case 'apollomunichinsurance.com/Children-Day-Thanks.aspx':
        SC_PageName = 'AMHI:Services:ChildrenDayThanks';
        break;
    case 'apollomunichinsurance.com/Refer-Friend-Thanks.aspx':
        SC_PageName = 'AMHI:Services:ReferFriend';
        break;
    case 'apollomunichinsurance.com/Thanks.aspx':
        SC_PageName = 'AMHI:Services:CareerThanks';
        break;
    case 'apollomunichinsurance.com/thank-you.aspx':
        SC_PageName = 'AMHI:Services:Thanks';
        break;
    case 'apollomunichinsurance.com/Valuable-Thanks.aspx':
        SC_PageName = 'AMHI:Services:ValuableThanks';
        break;
}

switch (SC_Search_String) {
    case 'apollomunichinsurance.com/buyonline/calc-easy-health-floater.html?source=family-easy-health-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:HealthFloater';
        break;
    case 'apollomunichinsurance.com/buyonline/calc-optima-cash.html?source=optima-cash-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:OptimaCash';
        break;
    case 'apollomunichinsurance.com/buyonline/calc-Optima-Plus.html?source=optima-plus-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:OptimaPlus';
        break;
    case 'apollomunichinsurance.com/buyonline/calc-optima-restore-individual.html?source=optima-restore-individual-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:OptimaRestoreIndividual';
        break;
    case 'apollomunichinsurance.com/buyonline/calc-Optima-Super.html?source=individual-optima-super-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:OptimaRestoreSuper';
        break;
    case 'apollomunichinsurance.com/buyonline/calc-Optima-super-floater.html?source=family-optima-super-premium-calculator.aspx':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:SuperFloater';
        break;
    case 'apollomunichinsurance.com/family-easy-health-premium-calculator.aspx?ProdId=1':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Family:Floater:Exclusive';
        break;
    case 'apollomunichinsurance.com/family-easy-health-premium-calculator.aspx?ProdId=2':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Family:Floater:Premium';
        break;
    case 'apollomunichinsurance.com/individual-easy-health-premium-calculator.aspx?ProdId=1':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Individual:Exclusive';
        break;
    case 'apollomunichinsurance.com/individual-easy-health-premium-calculator.aspx?ProdId=2':
        SC_PageName = 'AMHI:HealthInsurance:Calculator:Individual:Premium';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/ringtones.aspx?fileid=32':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:Ringtone:FusionMix';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/ringtones.aspx?fileid=33':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:Ringtone:StringMix';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/ringtones.aspx?fileid=34':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:Ringtone:RaggaeMix';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/ringtones.aspx?fileid=35':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:Ringtone:ThemeMix1';
        break;
    case 'apollomunichinsurance.com/apollo-munich-lets-uncomplicate-campaign/ringtones.aspx?fileid=36':
        SC_PageName = 'AMHI:AboutUs:Campaigns:LetsUncomplicate:Ringtone:ThemeMix2';
        break;
    case 'apollomunichinsurance.com/apollo-munich-media-centre/apollo-munich-in-the-news.aspx?page=2':
        SC_PageName = 'AMHI:AboutUs:Media:News2';
        break;
    case 'apollomunichinsurance.com/apollo-munich-media-centre/apollo-munich-in-the-news.aspx?page=3':
        SC_PageName = 'AMHI:AboutUs:Media:News3';
        break;
    case 'apollomunichinsurance.com/Careers/Apply-Now.aspx?ID=0':
        SC_PageName = 'AMHI:Services:Career:ApplyNow';
        break;
    case 'apollomunichinsurance.com/healthcare-customer-email-service.aspx?id=45':
        SC_PageName = 'AMHI:Services:CustomerEmail:ID45';
        break;
    case 'apollomunichinsurance.com/healthcare-customer-email-service.aspx?id=46':
        SC_PageName = 'AMHI:Services:CustomerEmail:ID46';
        break;
}
    


 /* ***************************** To Get Page Name ************************** */
console.log("PAGE NAME---"+SC_PageName);
s1.pageName=SC_PageName;


/* ******** To Get Channel ******** */
if (!s1.channel)
s1.channel = s1.pageName.split(":")[1];









/**************************************************************************/
/**************************************************************************/
/**************************************************************************/
/* ***************************** Plugin Section ************************** */
s1.usePlugins = true;

function s_doPlugins(s1) {
 
    /* ***************************** To Get Page Name ************************** */
    if (s1.pageName) {
        /* ******** To Get Channel ******** */
        if (!s1.channel)
            s1.channel = s1.pageName.split(":")[1];
        /* ******** To Get Channel ******** */

        /* ******** Server Name ******** */
        if (!s1.server) {
            if (location.host.match(/^(?:www|dev|uat|lp)\.?apollomunichinsurance.com/))
                s1.server = 'ApolloMunich';
            else if (location.host.match(/^(?:amhi)\.?in/))
                s1.server = 'AMHI';
            else if (location.host.match(/^(?:renewal|renewaluat)\.?apollomunichinsurance.com/))
                s1.server = 'Renewal';
            else if (location.host.match(/^(?:demo)\.?xerago.com/))
                s1.server = 'Xerago';
            else
                s1.server = 'Others';
        }
        /* ******** Server Name ******** */

        /* ******** prop1-prop5 ******** */
        if (!s1.prop1)
            s1.prop1 = s1.channelExtract(":", 3, s1.pageName).replace(/:$/, "");
        if (!s1.prop2)
            s1.prop2 = s1.channelExtract(":", 4, s1.pageName).replace(/:$/, "");
        if (!s1.prop3)
            s1.prop3 = s1.channelExtract(":", 5, s1.pageName).replace(/:$/, "");
        if (!s1.prop4)
            s1.prop4 = s1.channelExtract(":", 6, s1.pageName).replace(/:$/, "");
        if (!s1.prop5)
            s1.prop5 = s1.channelExtract(":", 7, s1.pageName).replace(/:$/, "");
        /* ******** prop1-prop5 ******** */

        /* ******** hier1 ******** */
        if (!s1.hier1)
            s1.hier1 = s1.pageName.split(':').slice(0, -1).toString().replace(/,/g, ":");
        /* ******** hier1 ******** */

        /* ******** prop7 : PageType ******** */
        if (!s1.prop7) {
            if (s1.pageName.match(':Calculator:'))
                s1.prop7 = 'Calculator';
            else if (s1.pageName.match(':Form:'))
                s1.prop7 = 'Form';
            else
                s1.prop7 = 'Static';
        }
        /* ******** prop7 : PageType ******** */

        /* ******** eVar11 And eVar12 : PageName******** */
        s1.eVar11 = s1.eVar12 = s1.pageName;
        /* ******** eVar11 And eVar12 : PageName******** */
    }

    /* ******** No Manual PageName ******** */
    if (!s1.pageName) {
        s1.pageName = location.href;
        s1.channel = 'ChannelNotDefined';
        s1.eVar11 = s1.eVar12 = s1.pageName;
    }
    /* ******** No Manual PageName ******** */

    /* ******** 404 Error ******** */
    if (s1.pageType) {
        s1.pageName = '404:' + location.href;
        s1.channel = 'Error';
        s1.eVar11 = s1.eVar12 = s1.pageName;
    }
    /* ******** 404 Error ******** */

    /* ******** Country ID ******** */
    if (!s1.prop6)
        s1.prop6 = 'India';
    /* ******** Country ID ******** */

    /* ******** prop8 : Login Domain ******** */
    if (!s1.prop8) {
        if (s1.server == 'AMHI' || s1.server == 'Renewal')
            s1.prop8 = 'PostLogin';
        else
            s1.prop8 = 'PreLogin';
    }
    /* ******** prop8 : Login Domain ******** */

    /* ******** prop9 : Time Parting - Time ******** */
    s1.prop9 = s1.getTimeParting("h", SC_timezone);
    /* ******** prop9 : Time Parting - Time ******** */

    /* ******** prop10 : Time Parting - Time ******** */
    s1.prop10 = s1.getTimeParting("d", SC_timezone);

    /* ******** prop10 : Time Parting - Time ******** */

    /* ******** prop11 : Visitor ID ******** */
    s1.prop11 = s1.Util.cookieRead('s_fid');
    /* ******** prop11 : Visitor ID ******** */

    /* ******** prop12 : Visit Number ******** */
    s1.prop12 = s1.getVisitNum('d');
    /* ******** prop12 : Visit Number ******** */

    /* ******** prop13 : New Vs Return ******** */
    s1.prop13 = s1.getNewRepeat('d');
    /* ******** prop13 : New Vs Return ******** */

    /* ******** prop17 : URL with Parameter ******** */
    s1.prop17 = location.href;
    /* ******** prop17 : URL with Parameter ******** */

    /* ******** prop18 : URL without Parameter ******** */
    s1.prop18 = location.protocol + '//' + location.hostname + location.pathname;
    /* ******** prop18 : URL without Parameter ******** */

    /* ******** prop19 : Visitor API ******** */
    s1.prop19 = (typeof(Visitor) != "undefined" ? "VisitorAPI Present" : "VisitorAPI Absent");
    /* ******** prop19 : Visitor API ******** */
	
	/* ******** prop20 : Previous Value ******** */	
		s1.prop20 = s1.getPreviousValue(s1.pageName, "s_gv_pageName", "");
	/* ******** prop20 : Previous Value ******** */	 
	
	/* ******** prop14 : Customer Vs Prospect ******** */
		var SC_Prop14 = localStorage.getItem("home.policyNumber");		
		
		if(typeof SC_Prop14 != "undefined" && SC_Prop14){			
			var SC_CusPros_Date = new Date();
			SC_CusPros_Date.setMonth(SC_CusPros_Date.getMonth() + 24);
			s1.Util.cookieWrite('s_cust_c14',SC_Prop14,SC_CusPros_Date);
		}
		
		if(s1.Util.cookieRead('s_cust_c14') !=''){
			s1.prop14='Customer';			
		}
		else{
			s1.prop14='Prospect';			
		}
		
	/* ******** prop14 : Customer Vs Prospect ******** */	

    /* ******** eVar1&eVar2 : Search String ******** */
    s1.eVar1 = s1.eVar2 = s1.Util.getQueryParam('searchtext', s1.pageURL, '&');
    s1.eVar1 = s1.getValOnce(s1.eVar1, "s_gvo_v1", 0);
    s1.eVar2 = s1.getValOnce(s1.eVar2, "s_gvo_v2", 0);

    if (s1.eVar1 || s1.eVar2)
        s1.events = s1.apl(s1.events, "event2", ",", 2);
    /* ******** eVar1&eVar2 : Search String ******** */

    /* ******** eVar3&eVar4 : Search Mode ******** */
    s1.eVar3 = s1.eVar4 = s1.Util.getQueryParam('searchmode', s1.pageURL, '&');
    s1.eVar3 = s1.getValOnce(s1.eVar3, "s_gvo_v3", 0);
    s1.eVar4 = s1.getValOnce(s1.eVar4, "s_gvo_v4", 0);

    if (s1.eVar3 || s1.eVar4)
        s1.events = s1.apl(s1.events, "event3", ",", 2);
    /* ******** eVar3&eVar4 : Search Mode ******** */

    /* ******** eVar8 And eVar9 : ICP ******** */
    s1.eVar8 = s1.eVar9 = s1.Util.getQueryParam('icid', s1.pageURL, '&');
    s1.eVar8 = s1.getValOnce(s1.eVar8, "s_gvo_v8", 0);
    s1.eVar9 = s1.getValOnce(s1.eVar9, "s_gvo_v9", 0);

    if (s1.eVar8 || s1.eVar9)
        s1.events = s1.apl(s1.events, "event6", ",", 2);
    /* ******** eVar8 And eVar9 : ICP ******** */

    /* ******** eVar10 : ECP ******** */
    s1.eVar10 = s1.Util.getQueryParam('ecp', s1.pageURL, '&');
    s1.eVar10 = s1.getValOnce(s1.eVar10, "s_gvo_v10", 0);

    if (s1.eVar10)
        s1.events = s1.apl(s1.events, "event7", ",", 2);
    /* ******** eVar10 : ECP ******** */
	
/* ******** Paid Search Campaign tracking through gclid ******** */
	
	if((location.href.indexOf('gclid')!= -1) && (location.href.indexOf('cid')!= -1)){
	 s1.campaign=s1.Util.getQueryParam('campid', s1.pageURL, '&');
	 var SC_Campaign = s1.Util.getQueryParam('cid', s1.pageURL, '&');
	 s1.campaign = s1.getValOnce(s1.campaign+':'+SC_Campaign, "s_campaign", 0);
	 if (s1.campaign)
        s1.events = s1.apl(s1.events, "event50", ",", 2);
		
	/* ******** eVar91 And eVar92 : AGID GPaid ******** */
	 s1.eVar91=s1.eVar92=s1.Util.getQueryParam('agid', s1.pageURL, '&');
	 s1.eVar91 = s1.getValOnce(s1.eVar91, "s_gvo_v91", 0);
	 s1.eVar92 = s1.getValOnce(s1.eVar92, "s_gvo_v92", 0);
	 
	 if (s1.eVar91 || s1.eVar92)
	  s1.events = s1.apl(s1.events, "event51", ",", 2);
	  
	/* ******** eVar91 And eVar92 : AGID GPaid ******** */ 
	
	/* ******** eVar93 And eVar94 : KWID GPaid ******** */
	 s1.eVar93=s1.eVar94=s1.Util.getQueryParam('kwid', s1.pageURL, '&');
	 s1.eVar93 = s1.getValOnce(s1.eVar93, "s_gvo_v93", 0);
	 s1.eVar94 = s1.getValOnce(s1.eVar94, "s_gvo_v94", 0);
	 
	 if (s1.eVar93 || s1.eVar94)
	  s1.events = s1.apl(s1.events, "event52", ",", 2);	
	/* ******** eVar93 And eVar94 : KWID GPaid ******** */ 
	}
	
	else if(location.href.indexOf('gclid')!= -1){
	 s1.campaign=s1.Util.getQueryParam('campid', s1.pageURL, '&');
	 s1.campaign = s1.getValOnce(s1.campaign, "s_campaign", 0);
	 if (s1.campaign)
        s1.events = s1.apl(s1.events, "event50", ",", 2);
		
	/* ******** eVar91 And eVar92 : AGID GPaid ******** */
	 s1.eVar91=s1.eVar92=s1.Util.getQueryParam('agid', s1.pageURL, '&');
	 s1.eVar91 = s1.getValOnce(s1.eVar91, "s_gvo_v91", 0);
	 s1.eVar92 = s1.getValOnce(s1.eVar92, "s_gvo_v92", 0);
	 
	 if (s1.eVar91 || s1.eVar92)
	  s1.events = s1.apl(s1.events, "event51", ",", 2);
	  
	/* ******** eVar91 And eVar92 : AGID GPaid ******** */ 
	
	/* ******** eVar93 And eVar94 : KWID GPaid ******** */
	 s1.eVar93=s1.eVar94=s1.Util.getQueryParam('kwid', s1.pageURL, '&');
	 s1.eVar93 = s1.getValOnce(s1.eVar93, "s_gvo_v93", 0);
	 s1.eVar94 = s1.getValOnce(s1.eVar94, "s_gvo_v94", 0);
	 
	 if (s1.eVar93 || s1.eVar94)
	  s1.events = s1.apl(s1.events, "event52", ",", 2);
	 /* ******** eVar93 And eVar94 : KWID GPaid ******** */
	  
  }
  else if(location.href.indexOf('cid')!= -1){
	 /* ******** Campaign ID : cid ******** */	
	
     s1.campaign = s1.Util.getQueryParam('cid', s1.pageURL, '&');
	 s1.campaign = s1.getValOnce(s1.campaign, "s_campaign", 0);
   
	/* ******** Campaign ID : cid ******** */
	  
  }
    /* ******** Paid Search Campaign tracking through gclid  ******** */
	
	
	/* ******** Customer ID : uid ******** */	
	
     s1.eVar19 = s1.Util.getQueryParam('uid', s1.pageURL, '&');	   
	 s1.eVar19 = s1.getValOnce(s1.eVar19, "s_customerID", 0);	
	 
	/* ******** Customer ID : uid ******** */
	
	/* ******** Policy Number : mt_policy_no ******** */	
	
    if(s1.Util.getQueryParam('mt_policy_no')!=='')
	{
		s1.eVar20 = s1.Util.getQueryParam('mt_policy_no');
	}
	else if(localStorage.getItem("home.policyNumber")!=null)
	{
		s1.eVar20=localStorage.getItem("home.policyNumber").replace (/(^")|("$)/g, '');
	}
	else
	{
		s1.eVar20='';
	}				
	 
	/* ******** Policy Number : mt_policy_no ******** */	
}

s1.doPlugins = s_doPlugins;

s1.getPreviousValue = new Function("v", "c", "el", "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el){if(s1.events){i=s1.split(el,',');j=s1.split(s1.events,',');for(x in i){for(y in j){if(i[x]==j[y]){if(s1.c_r(c)) r=s1.c_r(c);v?s1.c_w(c,v,t):s1.c_w(c,'no value',t);return r}}}}}else{if(s1.c_r(c)) r=s1.c_r(c);v?s1.c_w(c,v,t):s1.c_w(c,'no value',t);return r}");

s1.getVisitNum = new Function("tp", "c", "c2", ""
+ "var s=this,e=new Date,cval,cvisit,ct=e.getTime(),d;if(!tp){tp='m';}"
+ "if(tp=='m'||tp=='w'||tp=='d'){eo=s1.endof(tp),y=eo.getTime();e.setTi"
+ "me(y);}else {d=tp*86400000;e.setTime(ct+d);}if(!c){c='s_vnum';}if(!"
+ "c2){c2='s_invisit';}cval=s1.c_r(c);if(cval){var i=cval.indexOf('&vn="
+ "'),str=cval.substring(i+4,cval.length),k;}cvisit=s1.c_r(c2);if(cvisi"
+ "t){if(str){e.setTime(ct+1800000);s1.c_w(c2,'true',e);return str;}els"
+ "e {return 'unknown visit number';}}else {if(str){str++;k=cval.substri"
+ "ng(0,i);e.setTime(k);s1.c_w(c,k+'&vn='+str,e);e.setTime(ct+1800000);"
+ "s1.c_w(c2,'true',e);return str;}else {s1.c_w(c,e.getTime()+'&vn=1',e)"
+ ";e.setTime(ct+1800000);s1.c_w(c2,'true',e);return 1;}}");
s1.dimo = new Function("m", "y", ""
+ "var d=new Date(y,m+1,0);return d.getDate();");
s1.endof = new Function("x", ""
+ "var t=new Date;t.setHours(0);t.setMinutes(0);t.setSeconds(0);if(x=="
+ "'m'){d=s1.dimo(t.getMonth(),t.getFullYear())-t.getDate()+1;}else if("
+ "x=='w'){d=7-t.getDay();}else {d=1;}t.setDate(t.getDate()+d);return "
+ "t;");

s1.getValOnce = new Function("v", "c", "e", "var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s1.Util.cookieRead(c);if(v){a.setTime(a.getTime()+e*86400000);s1.Util.cookieWrite(c,v,e?a:0);}return v==k?'':v");

s1.getNewRepeat = new Function("d", "cn", "var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s1.Util.cookieRead(cn);if(cval.length==0){s1.Util.cookieWrite(cn,ct+'-New',e);return'New';}sval=s1.split(cval,'-');if(ct-sval[0]<30*60*1000&&sval[1]=='New'){s1.Util.cookieWrite(cn,ct+'-New',e);return'New';}else{s1.Util.cookieWrite(cn,ct+'-Repeat',e);return'Repeat';}");

s1.channelExtract = new Function("d", "p", "u", "pv", "var s=this,v='';u=u?u:(s1.pageURL?s1.pageURL:s1.wd.location);if(u=='f')u=s1.gtfs().location;u=u+'';li=u.lastIndexOf(d);if(li>0){u=u.substring(0,li);var i,n,a=s1.split(u,d),al=a.length;if(al<p){if(pv==1) p=al;else return '';}for(i=0;i<p;i++){n=a[i];v=v+n+d;}return v}return '';");

s1.apl = new Function("l", "v", "d", "u", "" + "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s1.split(l,d);for(i=0;i<a." + "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas" + "e()));}}if(!m)l=l?l+d+v:v;return l");

s1.split = new Function("l", "d", "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

s1.getTimeParting = new Function("t", "z", "y", "l", "var s=this,d,A,U,X,Z,W,B,C,D,Y;d=new Date();A=d.getFullYear();Y=U=String(A);if(s1.dstStart&&s1.dstEnd){B=s1.dstStart;C=s1.dstEnd}else{;U=U.substring(2,4);X='090801|101407|111306|121104|131003|140902|150801|161306|171205|181104|191003';X=s1.split(X,'|');for(W=0;W<=10;W++){Z=X[W].substring(0,2);if(U==Z){B=X[W].substring(2,4);C=X[W].substring(4,6)}}if(!B||!C){B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;}D=new Date('1/1/2000');if(D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}else{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new Date(C);W=new Date();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.getTimezoneOffset()*60000);W=new Date(W+(3600000*z));X=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];B=W.getHours();C=W.getMinutes();D=W.getDay();Z=X[D];U='AM';A='Weekday';X='00';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6||D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Available'}else{if(t){if(t=='h'){return W}if(t=='d'){return Z}if(t=='w'){return A}}else{return Z+', '+W}}}");

s1.getAndPersistValue=new Function("v","c","e",""+"var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("+"v)s1.c_w(c,v,e?a:0);return s1.c_r(c);");



  

  
  
  





  


/*****************************************************************************************/
/*****************************************************************************************/
/*****************************************************************************************/
/****************************************************************************************/
/*---------------------NEW LEGACY FILE-SC_calcPages1.js-----------------------------------*/
	
	var SC_Age = [];
	var SC_SumIns = [] ;
	var SC_Premium = [] ;
	var SC_Deductible = [];
	var SC_DailyCash = [];
	var SC_Critical = [];
	var SC_Relation = [];
	var SC_Income = [];
	var SC_Occupation = [];
	var SC_TTD = [];
	var SC_Calc_temp=0;
	var SC_Tenure = '';
	var SC_Base = '';
	var SC_Discounted = '';
	var SC_Gross = '';
	var SC_Members = 1;
	var i_calc = 1;
	var SC_Calc_Submit_Val='';
	var SC_Calc_BuyNow_Val='';
	var SC_Cookie_BuyNow_Val = '';
	var SC_Cookie_Submit_Val = '';
	var SC_PathName = '';
	var SC_ProductName_Calc = '';
	var SC_Cookie_ProductName_Var = '';
	var SC_eVar21 = '';
	var SC_Platinum_Plan = '';
	var SC_Profession = '';
	var SC_TravellerStay = '';
	var SC_Plan= '';
	var SC_Duration= '';
	var SC_VisaType= '';
	var SC_GeoGraphy= '';
	var SC_SumInss= '';
	var SC_FamilySize= '';
	var SC_Location = '';
	var SC_Eldest = '';
	var SC_AgeSecond = '';
	var SC_CriticalIll = '';
	
	$.cookie.json = true;
	SC_PathName = location.pathname;

	switch (SC_PathName) {
		case '/optima-restore-individual-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Optima Restore Individual';
			s1.products = 'Health Insurance Individual;Optima Restore Individual';
			break;
		case '/dengue-care-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Dengue Care';
			s1.products = 'Health Insurance;Dengue Care';
			break; 
		case '/individual-optima-vital-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Optima Vital';
			s1.products = 'Health Insurance Individual;Optima Vital';
			break; 
		case '/optima-plus-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Optima Plus';
			s1.products = 'Health Insurance Individual;Optima Plus';
			break; 
		case '/individual-optima-super-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Optima Super';
			s1.products = 'Health Insurance Individual;Optima Super';
			break; 
		case '/optima-cash-premium-calculator.aspx':	
			s1.events="event23";
			s1.eVar21= 'Optima Cash Platinum Plan';
			s1.products = 'Health Insurance Individual;Optima Cash Platinum Plan';
			break; 		
		case '/individual-easy-health-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Easy Health Individual';
			s1.products = 'Health Insurance Individual;Easy Health Individual';
			break;
		case '/personal-accident-standard-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Personal Accident Standard Plan';
			s1.products = 'Personal Accident;Personal Accident Standard Plan';
			break; 
		case '/personal-accident-premium-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Personal Accident Premium Plan';
			s1.products = 'Personal Accident;Personal Accident Premium Plan';
			break; 
		case '/buy-individual-travel-insurance-plan.aspx':			
			s1.events="event23";
			s1.eVar21= 'Easy Travel Individual';
			s1.products = 'Travel Insurance;Easy Travel Individual';
			break; 
		case '/buy-family-travel-insurance-plan.aspx':			
			s1.events="event23";
			s1.eVar21= 'Easy Travel Family';
			s1.products = 'Travel Insurance;Easy Travel Family';
			break;
		case '/buy-senior-citizen-travel-insurance-plan.aspx':			
			s1.events="event23";
			s1.eVar21= 'Easy Travel Senior';
			s1.products = 'Travel Insurance;Easy Travel Senior';
			break;
		case '/buy-annual-multi-trip-travel-insurance-plan.aspx':			
			s1.events="event23";
			s1.eVar21= 'Easy Travel Annual Multitrip';
			s1.products = 'Travel Insurance;Easy Travel Annual Multitrip';
			break;
		case '/optima-restore-floater-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Optima Restore Family Floater';
			s1.products = 'Health Insurance Family;Optima Restore Family Floater';
			break;
		case '/family-easy-health-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Easy Health Family Floater';
			s1.products = 'Health Insurance Family;Easy Health Family Floater';
			break;
		case '/family-optima-super-premium-calculator.aspx':			
			s1.events="event23";
			s1.eVar21= 'Optima Super Family Floater';	
			s1.products = 'Health Insurance Family;Optima Super Family Floater';
			break;
	}	

jQuery(window).load(function(){
	jQuery('#ifrmeh').contents().find('.memb-dig').click(function () {
		SC_Members = jQuery(this).text().trim();
	});
	
	jQuery('#ifrmeh').contents().find('#DivBuyOnline').click(function () {
		SC_Calc_Submit_Val='';
		SC_Calc_BuyNow_Val='';
        LC_whileSubmit=1;
        whileSubmit_RQ=1;
		
		s1.eVar21='';
		s1.eVar22='';
		s1.eVar23='';
		s1.eVar24='';
		s1.eVar26='';
		s1.eVar30='';
		s1.eVar31='';
		s1.eVar36='';
		s1.eVar37='';
		s1.eVar38='';
		s1.eVar39='';
		s1.eVar40='';
		s1.eVar41='';
		s1.eVar43='';
	
		/* Health Insurance Plan : Individuals */

		if(SC_PathName == '/optima-restore-individual-premium-calculator.aspx')
		{
			SC_Tenure = jQuery('#ifrmeh').contents().find('input[name="radio"][class="rbyear"]:checked').val();
			SC_Location = jQuery('#ifrmeh').contents().find('#mmrCities option:selected').text();
			
			if (SC_Tenure==1)
			{
				SC_Tenure = 'One Year';
				SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace("Rs. ", "").replace(",", "");
				SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace("Rs. ", "").replace(",", "");
			}
			else if (SC_Tenure==2)
			{
				SC_Tenure = 'Two Year';
				SC_Base = jQuery('#ifrmeh').contents().find('#netPremium2').text().replace("Rs. ", "").replace(",", "");	
				SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium2').text().replace("Rs. ", "").replace(",", "");
			}	

			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Age[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#ageGroup'+i_calc+' option:selected').text();
				SC_SumIns[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#sumInsured'+i_calc+' option:selected').text();			
				
				SC_Calc_Submit_Val+="Health Insurance Individual;Optima Restore Individual;1;;event29=1;eVar25="+SC_Age[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+",";

				SC_Calc_BuyNow_Val+="Health Insurance Individual;Optima Restore Individual;;;;eVar25="+SC_Age[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+",";
			}
				SC_Calc_Submit_Val+="Health Insurance Individual;Optima Restore Individual;;;event26="+SC_Base+"|event28="+SC_Gross;
				
				s1.linkTrackVars="";
				s1.linkTrackEvents="event25";
				s1.products=SC_Calc_BuyNow_Val;
				s1.eVar21="Optima Restore Individual";
				s1.events="event25";
				s1.eVar23=SC_Tenure;
				s1.eVar24=SC_Members;
				s1.eVar43=SC_Location;
				s1.tl(this,'o','Calculator Page Submit');	
				
				SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
				
				SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);			
				
				SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar24:s1.eVar24,eVar23:s1.eVar23,eVar43:s1.eVar43};
				$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}
		
		/* Health Insurance Plan : Dengue Care */

		else if(SC_PathName == '/dengue-care-premium-calculator.aspx')
		{
		
			SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Calc_temp = '';
			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Age[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#ageGroup'+i_calc+' option:selected').text();
				SC_SumIns[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#sumInsured'+i_calc+' option:selected').text();
				SC_Premium[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#premium'+i_calc).text().replace(",", "");
				
				SC_Calc_Submit_Val+="Health Insurance;Dengue Care;1;"+SC_Premium[SC_Calc_temp]+";event29=1;eVar25="+SC_Age[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+",";
				SC_Calc_BuyNow_Val+="Health Insurance;Dengue Care;;;;eVar25="+SC_Age[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+",";
			}
				SC_Calc_Submit_Val+="Health Insurance;Dengue Care;;;event26="+SC_Base+"|event28="+SC_Gross;
				
				s1.linkTrackVars="";
				s1.linkTrackEvents="event25";
				s1.products=SC_Calc_BuyNow_Val;
				s1.eVar21="Dengue Care";
				s1.eVar24=SC_Members;
				s1.events="event25";
				s1.tl(this,'o','Calculator Page Submit');	
				
				SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
				
				SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
				
				SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar24:s1.eVar24};
				$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}

		/* Health Insurance Plan : Optima Vital */
		
		else if(SC_PathName == '/individual-optima-vital-premium-calculator.aspx')
		{
			SC_Tenure = jQuery('#ifrmeh').contents().find('#policyTenure option:selected').text();	
			SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace("Rs. ", "").replace(",", "");
			if (SC_Tenure=="One Year")
			{
				SC_Tenure = 'One Year';
			}
			else if (SC_Tenure=="Two Years")
			{
				SC_Tenure = 'Two Year';
			}	
			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Age[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#ageGroup'+i_calc+' option:selected').text();
				SC_SumIns[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#sumInsured'+i_calc+' option:selected').text();
				SC_Premium[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#premium'+i_calc).text().replace(",", "");
				SC_Calc_Submit_Val+="Health Insurance Individual;Optima Vital;1;"+SC_Premium[SC_Calc_temp]+";event29=1;eVar25="+SC_Age[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+",";
				SC_Calc_BuyNow_Val+="Health Insurance Individual;Optima Vital;;;;eVar25="+SC_Age[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+",";
			}
				SC_Calc_Submit_Val+="Health Insurance Individual;Optima Vital;;;event26="+SC_Base+"|event28="+SC_Gross;
				
				s1.linkTrackVars="";
				s1.linkTrackEvents="event25";
				s1.products=SC_Calc_BuyNow_Val;
				s1.eVar21="Optima Vital";
				s1.events="event25";
				s1.eVar23=SC_Tenure;
				s1.eVar24=SC_Members;
				s1.tl(this,'o','Calculator Page Submit');	
				
				SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
				
				SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
				
				SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar24:s1.eVar24,eVar23:s1.eVar23};
				$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}

		/* Health Insurance Plan : Optima Plus */
		
		else if(SC_PathName == '/optima-plus-premium-calculator.aspx')
		{
			SC_Tenure = jQuery('#ifrmeh').contents().find('#policyTenure option:selected').text();	
			SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Discounted = jQuery('#ifrmeh').contents().find('#individualDiscount').text().replace("Rs. ", "").replace(",", "");
			SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace("Rs. ", "").replace(",", "");
			SC_SumInss=jQuery('#ifrmeh').contents().find('.box80>strong' ).text().replace(",", "");
			if (SC_Tenure=="One Year")
			{
				SC_Tenure = 'One Year';
			}
			else if (SC_Tenure=="Two Years")
			{
				SC_Tenure = 'Two Year';
			}	
			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Age[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#ageGroup'+i_calc+' option:selected').text();
				SC_SumIns[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#sumInsured'+i_calc+' option:selected').text();
				SC_Premium[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#premium'+i_calc).text().replace(",", "");
				
				SC_Calc_Submit_Val+="Health Insurance Individual;Optima Plus;1;"+SC_Premium[SC_Calc_temp]+";event29=1;eVar25="+SC_Age[SC_Calc_temp]+"|eVar30="+SC_SumIns[SC_Calc_temp]+",";
				SC_Calc_BuyNow_Val+="Health Insurance Individual;Optima Plus;;;;eVar25="+SC_Age[SC_Calc_temp]+"|eVar30="+SC_SumIns[SC_Calc_temp]+",";
			}
				SC_Calc_Submit_Val+="Health Insurance Individual;Optima Plus;;;event26="+SC_Base+"|event27="+SC_Discounted+"|event28="+SC_Gross;
				
				s1.linkTrackVars="";
				s1.linkTrackEvents="event25";
				s1.products=SC_Calc_BuyNow_Val;
				s1.eVar21="Optima Plus";
				s1.eVar23=SC_Tenure;
				s1.eVar24=SC_Members;
				s1.eVar26=SC_SumInss;
				s1.events="event25";
				s1.tl(this,'o','Calculator Page Submit');	
				
				SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
				
				SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
				
				SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar24:s1.eVar24,eVar23:s1.eVar23,eVar26:s1.eVar26};
				$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}

		/* Health Insurance Plan : Optima Super */
		
		else if(SC_PathName == '/individual-optima-super-premium-calculator.aspx')
		{
			SC_Tenure = jQuery('#ifrmeh').contents().find('#policyTenure option:selected').text();	
			SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Discounted = jQuery('#ifrmeh').contents().find('#individualDiscount').text().replace("Rs. ", "").replace(",", "");
			SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace("Rs. ", "").replace(",", "");
			if (SC_Tenure=="One Year")
			{
				SC_Tenure = 'One Year';
			}
			else if (SC_Tenure=="Two Years")
			{
				SC_Tenure = 'Two Year';
			}	
			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Age[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#ageGroup'+i_calc+' option:selected').text();
				SC_SumIns[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#sumInsured'+i_calc+' option:selected').text();
				SC_Premium[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#premium'+i_calc).text().replace(",", "");
				SC_Deductible[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#Sum'+i_calc+' option:selected').text();
				
				SC_Calc_Submit_Val+="Health Insurance Individual;Optima Super;1;"+SC_Premium[SC_Calc_temp]+";event29=1;eVar25="+SC_Age[SC_Calc_temp]+"|eVar30="+SC_SumIns[SC_Calc_temp]+",";
				SC_Calc_BuyNow_Val+="Health Insurance Individual;Optima Super;;;;eVar25="+SC_Age[SC_Calc_temp]+"|eVar26="+SC_Deductible[SC_Calc_temp]+"|eVar30="+SC_SumIns[SC_Calc_temp]+",";
			}
				SC_Calc_Submit_Val+="Health Insurance Individual;Optima Super;;;event26="+SC_Base+"|event27="+SC_Discounted+"|event28="+SC_Gross;
				
				s1.linkTrackVars="";
				s1.linkTrackEvents="event25";
				s1.products=SC_Calc_BuyNow_Val;
				s1.eVar21="Optima Super";
				s1.events="event25";
				s1.eVar23=SC_Tenure;
				s1.eVar24=SC_Members;
				s1.tl(this,'o','Calculator Page Submit');	
				
				SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
				
				SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
				
				SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar24:s1.eVar24,eVar23:s1.eVar23};
				$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}

		/* Health Insurance Plan : Optima Cash Platinum Plan */
		
		else if(SC_PathName == '/optima-cash-premium-calculator.aspx')
		{
			SC_Tenure = jQuery('#ifrmeh').contents().find('#plandesc').text()[0];
			if(SC_Tenure=='1')
			{
				SC_Tenure="One Year";
			}
			else
			{
				SC_Tenure="Two Year";
			}
			
			SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Discounted = jQuery('#ifrmeh').contents().find('#OnlineDiscount').text().replace("Rs. ", "").replace(",", "");
			SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace("Rs. ", "").replace(",", "");
			
			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Age[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#ageGroup'+i_calc+' option:selected').text();
				
				SC_Premium[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#premium'+i_calc).text().replace(",", "");
				SC_DailyCash[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#dailyCash'+i_calc+' option:selected').text();			
				SC_Calc_Submit_Val+="Health Insurance Individual;Optima Cash Platinum Plan;1;"+SC_Premium[SC_Calc_temp]+";event29=1;eVar25="+SC_Age[SC_Calc_temp]+"|eVar29="+SC_DailyCash[SC_Calc_temp]+",";
				SC_Calc_BuyNow_Val+="Health Insurance Individual;Optima Cash Platinum Plan;;;;eVar25="+SC_Age[SC_Calc_temp]+"|eVar29="+SC_DailyCash[SC_Calc_temp]+",";
			}
				SC_Calc_Submit_Val+="Health Insurance Individual;Optima Cash Platinum Plan;;;event26="+SC_Base+"|event27="+SC_Discounted+"|event28="+SC_Gross;
				
				s1.linkTrackVars="";
				s1.linkTrackEvents="event25";
				s1.products=SC_Calc_BuyNow_Val;
				s1.eVar21="Optima Cash Platinum Plan";
				s1.events="event25";
				s1.eVar23=SC_Tenure;
				s1.eVar24=SC_Members;
				s1.tl(this,'o','Calculator Page Submit');	
				
				SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
				
				SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
				
				SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar24:s1.eVar24,eVar23:s1.eVar23};
				$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}

		/* Health Insurance Plan : Easy Health Individual */
		
		else if(SC_PathName == '/individual-easy-health-premium-calculator.aspx')
		{
			SC_Tenure = jQuery('#ifrmeh').contents().find('#policyTenure option:selected').text();	
			SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Platinum_Plan = jQuery('#ifrmeh').contents().find('.top_sec_tab .active').text();
			SC_Location = jQuery('#ifrmeh').contents().find('#mmrCities option:selected').text();		
			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Age[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#ageGroup'+i_calc+' option:selected').text();
				SC_SumIns[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#sumInsured'+i_calc+' option:selected').text();
				SC_Premium[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#premium'+i_calc).text().replace(",", "");
				SC_Critical[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#criticalRider'+i_calc+' option:selected').text();			
				
				SC_Calc_Submit_Val+="Health Insurance Individual;Easy Health Individual;1;"+SC_Premium[SC_Calc_temp]+";event29=1;eVar25="+SC_Age[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+"|eVar27="+SC_Critical[SC_Calc_temp]+",";
				
				SC_Calc_BuyNow_Val+="Health Insurance Individual;Easy Health Individual;;;;eVar25="+SC_Age[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+"|eVar27="+SC_Critical[SC_Calc_temp]+",";
			}
				SC_Calc_Submit_Val+="Health Insurance Individual;Easy Health Individual;;;event26="+SC_Base+"|event28="+SC_Gross;
				
				s1.linkTrackVars="";
				s1.linkTrackEvents="event25";
				s1.products=SC_Calc_BuyNow_Val;
				s1.eVar21="Easy Health Individual";
				s1.events="event25";
				s1.eVar23=SC_Tenure;
				s1.eVar22=SC_Platinum_Plan;
				s1.eVar24=SC_Members;
				s1.eVar43=SC_Location;
				s1.tl(this,'o','Calculator Page Submit');	
				
				SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
				
				SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
				
				SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar22:s1.eVar22,eVar24:s1.eVar24,eVar23:s1.eVar23,eVar43:s1.eVar43};
				$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}
		
		/* Personal Accident : Standard Plan */
		
		else if(SC_PathName == '/personal-accident-standard-premium-calculator.aspx')
		{
			SC_Profession = jQuery('#ifrmeh').contents().find('#profPol option:selected').text();
				if(SC_Profession=='Salaried')
				{
					SC_Profession='Salaried';
				}
				else if(SC_Profession=='Self Employed')
				{
					SC_Profession='Self Employed';
				}
				
			SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Discounted = jQuery('#ifrmeh').contents().find('#individualDiscount').text().replace("Rs. ", "").replace(",", "");
			SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Platinum_Plan = jQuery('#ifrmeh').contents().find('.top_sec_tab .active').text();
			
				if(SC_Platinum_Plan=='Standard ')
				{
					SC_Platinum_Plan='Standard';
				}
				else if(SC_Platinum_Plan=='Premium')
				{
					SC_Platinum_Plan='Premium';
				}
			
			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Relation[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#relationShip'+i_calc+' option:selected').text();			
				SC_Income[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#income'+i_calc+' option:selected').text();			
				SC_SumIns[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#sumInsured'+i_calc+' option:selected').text();			
				SC_Occupation[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#Occup'+i_calc+' option:selected').text();
				SC_TTD[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#criticalRider'+i_calc+' option:selected').text();
				SC_Premium[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#premium'+i_calc).text().replace(",", "");
				
				SC_Calc_Submit_Val+="Personal Accident;Personal Accident Standard Plan;1;"+SC_Premium[SC_Calc_temp]+";event29=1;eVar32="+SC_Relation[SC_Calc_temp]+"|eVar33="+SC_Income[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+"|eVar34="+SC_Occupation[SC_Calc_temp]+"|eVar35="+SC_TTD[SC_Calc_temp]+",";
				
				SC_Calc_BuyNow_Val+="Personal Accident;Personal Accident Standard Plan;;;;eVar32="+SC_Relation[SC_Calc_temp]+"|eVar33="+SC_Income[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+"|eVar34="+SC_Occupation[SC_Calc_temp]+"|eVar35="+SC_TTD[SC_Calc_temp]+",";
				
			}
				SC_Calc_Submit_Val+="Personal Accident;Personal Accident Standard Plan;;;event26="+SC_Base+"|event27="+SC_Discounted+"|event28="+SC_Gross;
				
				s1.linkTrackVars="";
				s1.linkTrackEvents="event25";
				s1.products=SC_Calc_BuyNow_Val;
				s1.eVar21="Personal Accident Standard Plan";
				s1.eVar24=SC_Members;
				s1.eVar31=SC_Profession;
				s1.eVar22=SC_Platinum_Plan;				
				s1.events="event25";
				s1.tl(this,'o','Calculator Page Submit');	
				
				SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
				
				SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
				
				SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar22:s1.eVar22,eVar24:s1.eVar24,eVar31:s1.eVar31};
				$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}

		/* Personal Accident : Premium Plan */
		
		else if(SC_PathName == '/personal-accident-premium-premium-calculator.aspx')
		{
			SC_Profession = jQuery('#ifrmeh').contents().find('#profPol option:selected').text();
				if(SC_Profession=='Salaried')
				{
					SC_Profession='Salaried';
				}
				else if(SC_Profession=='Self Employed')
				{
					SC_Profession='Self Employed';
				}
			SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Discounted = jQuery('#ifrmeh').contents().find('#individualDiscount').text().replace("Rs. ", "").replace(",", "");
			SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace("Rs. ", "").replace(",", "");
			SC_Platinum_Plan = jQuery('#ifrmeh').contents().find('.top_sec_tab .active').text();
				if(SC_Platinum_Plan=='Standard ')
				{
					SC_Platinum_Plan='Standard';
				}
				else if(SC_Platinum_Plan=='Premium')
				{
					SC_Platinum_Plan='Premium';
				}
				
			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Relation[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#relationShip'+i_calc+' option:selected').text();			
				SC_Income[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#income'+i_calc+' option:selected').text();			
				SC_SumIns[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#sumInsured'+i_calc+' option:selected').text();			
				SC_Occupation[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#Occup'+i_calc+' option:selected').text();
				SC_TTD[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#criticalRider'+i_calc+' option:selected').text();
				SC_Premium[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#premium'+i_calc).text().replace(",", "");				
				
				SC_Calc_Submit_Val+="Personal Accident;Personal Accident Premium Plan;1;"+SC_Premium[SC_Calc_temp]+";event29=1;eVar32="+SC_Relation[SC_Calc_temp]+"|eVar33="+SC_Income[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+"|eVar34="+SC_Occupation[SC_Calc_temp]+"|eVar35="+SC_TTD[SC_Calc_temp]+",";
				
				SC_Calc_BuyNow_Val+="Personal Accident;Personal Accident Premium Plan;;;;eVar32="+SC_Relation[SC_Calc_temp]+"|eVar33="+SC_Income[SC_Calc_temp]+"|eVar26="+SC_SumIns[SC_Calc_temp]+"|eVar34="+SC_Occupation[SC_Calc_temp]+"|eVar35="+SC_TTD[SC_Calc_temp]+",";
			}
				SC_Calc_Submit_Val+="Personal Accident;Personal Accident Premium Plan;;;event26="+SC_Base+"|event27="+SC_Discounted+"|event28="+SC_Gross;
				
				s1.linkTrackVars="";
				s1.linkTrackEvents="event25";
				s1.products=SC_Calc_BuyNow_Val;
				s1.eVar21="Personal Accident Premium Plan";
				s1.eVar22=SC_Platinum_Plan;
				s1.eVar24=SC_Members;
				s1.eVar31=SC_Profession;
				s1.events="event25";
				s1.tl(this,'o','Calculator Page Submit');	
				
				SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
				
				SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
				$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
				
				SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar22:s1.eVar22,eVar24:s1.eVar24,eVar31:s1.eVar31};
				$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}
		
		/* Travel Insurance - Easy Travel Individual */
		
		else if(SC_PathName == '/buy-individual-travel-insurance-plan.aspx')
		{
			SC_TravellerStay = jQuery('#ifrmeh').contents().find('input[name="GroupIndia"]:checked').val();
			if(SC_TravellerStay == 'rdoBtnIndYes')
			{
				SC_TravellerStay = 'Yes';
			}
			else
			{
				SC_TravellerStay = 'No';
			}
			
			SC_Plan = jQuery('#ifrmeh').contents().find('#plan1 option:selected').text().replace(',', '');
			SC_Duration = jQuery('#ifrmeh').contents().find('#PlanDays').text();
			SC_VisaType = jQuery('#ifrmeh').contents().find('#DDVisaType option:selected').text();
			SC_GeoGraphy = jQuery('#ifrmeh').contents().find('#geography1 option:selected').text();		
			SC_SumInss = jQuery('#ifrmeh').contents().find('#sum1').text();		
			SC_Base = jQuery('#ifrmeh').contents().find('#Basepremium').text();		
			SC_Gross = jQuery('#ifrmeh').contents().find('#premium1').text();		
				
			SC_Calc_Submit_Val="Travel Insurance;Easy Travel Individual;1;;event29=1,";
				
			SC_Calc_BuyNow_Val="Travel Insurance;Easy Travel Individual";

			SC_Calc_Submit_Val+="Travel Insurance;Easy Travel Individual;;;event26="+SC_Base+"|event28="+SC_Gross;	
			
			s1.linkTrackVars="";
			s1.linkTrackEvents="event25";
			s1.products=SC_Calc_BuyNow_Val;
			s1.eVar21="Easy Travel Individual";
			s1.eVar36=SC_TravellerStay;
			s1.eVar37=SC_Plan;
			s1.eVar38=SC_Duration;
			s1.eVar40=SC_GeoGraphy;
			s1.eVar26=SC_SumInss;
			s1.eVar39=SC_VisaType;			
			s1.events="event25";
			s1.tl(this,'o','Calculator Page Submit');	
			
			SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
			
			SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
			
			SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar26:s1.eVar26,eVar36:s1.eVar36,eVar37:s1.eVar37,eVar38:s1.eVar38,eVar39:s1.eVar39,eVar40:s1.eVar40};
			$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}

		/* Travel Insurance - Easy Travel Family */

		else if(SC_PathName == '/buy-family-travel-insurance-plan.aspx')
		{
			SC_TravellerStay = jQuery('#ifrmeh').contents().find('input[name="GroupIndia"]:checked').val();
			if(SC_TravellerStay == 'rdoBtnIndYes')
			{
				SC_TravellerStay = 'Yes';
			}
			else
			{
				SC_TravellerStay = 'No';
			}
			
			SC_Plan = jQuery('#ifrmeh').contents().find('#plan1 option:selected').text().replace(',', '');
			SC_Duration = jQuery('#ifrmeh').contents().find('#PlanDays').text();
			SC_VisaType = jQuery('#ifrmeh').contents().find('#DDVisaType option:selected').text();
			SC_GeoGraphy = jQuery('#ifrmeh').contents().find('#geography1 option:selected').text();		
			SC_FamilySize = jQuery('#ifrmeh').contents().find('#familySize option:selected').text();
			SC_SumInss = jQuery('#ifrmeh').contents().find('#sum1').text();		
			SC_Base = jQuery('#ifrmeh').contents().find('#Basepremium').text();
			SC_Gross = jQuery('#ifrmeh').contents().find('#premium1').text();		
				
			SC_Calc_Submit_Val="Travel Insurance;Easy Travel Family;1;;event29=1,";
				
			SC_Calc_BuyNow_Val="Travel Insurance;Easy Travel Family";		
			
			SC_Calc_Submit_Val+="Travel Insurance;Easy Travel Family;;;event26="+SC_Base+"|event28="+SC_Gross;	
			
			s1.linkTrackVars="";
			s1.linkTrackEvents="event25";
			s1.products=SC_Calc_BuyNow_Val;
			s1.eVar21="Easy Travel Family";
			s1.eVar36=SC_TravellerStay;
			s1.eVar37=SC_Plan;
			s1.eVar38=SC_Duration;
			s1.eVar39=SC_VisaType;
			s1.eVar40=SC_GeoGraphy;
			s1.eVar41=SC_FamilySize;
			s1.eVar26=SC_SumInss;			
			s1.events="event25";
			s1.tl(this,'o','Calculator Page Submit');	
			
			SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
			
			SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
			
			SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar26:s1.eVar26,eVar36:s1.eVar36,eVar37:s1.eVar37,eVar38:s1.eVar38,eVar39:s1.eVar39,eVar40:s1.eVar40,eVar41:s1.eVar41};
			$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}

		/* Travel Insurance - Easy Travel Senior Citizen */
		
		else if(SC_PathName == '/buy-senior-citizen-travel-insurance-plan.aspx')
		{
			SC_TravellerStay = jQuery('#ifrmeh').contents().find('input[name="GroupIndia"]:checked').val();
			if(SC_TravellerStay == 'rdoBtnIndYes')
			{
				SC_TravellerStay = 'Yes';
			}
			else
			{
				SC_TravellerStay = 'No';
			}
			
			SC_Plan = jQuery('#ifrmeh').contents().find('#plan1 option:selected').text().replace(',', '');
			SC_Duration = jQuery('#ifrmeh').contents().find('#PlanDays').text();
			SC_VisaType = jQuery('#ifrmeh').contents().find('#DDVisaType option:selected').text();
			SC_GeoGraphy = jQuery('#ifrmeh').contents().find('#geography1 option:selected').text();		
			SC_SumInss = jQuery('#ifrmeh').contents().find('#sum1').text();		
			SC_Base = jQuery('#ifrmeh').contents().find('#Basepremium').text();		
			SC_Gross = jQuery('#ifrmeh').contents().find('#premium1').text();		
				
			SC_Calc_Submit_Val="Travel Insurance;Easy Travel Senior;1;;event29=1,";
				
			SC_Calc_BuyNow_Val="Travel Insurance;Easy Travel Senior";
			
			SC_Calc_Submit_Val+="Travel Insurance;Easy Travel Senior;;;event26="+SC_Base+"|event28="+SC_Gross;
			
			s1.linkTrackVars="";
			s1.linkTrackEvents="event25";
			s1.products=SC_Calc_BuyNow_Val;
			s1.eVar21="Easy Travel Senior";
			s1.eVar26=SC_SumInss;
			s1.eVar36=SC_TravellerStay;
			s1.eVar37=SC_Plan;
			s1.eVar38=SC_Duration;
			s1.eVar39=SC_VisaType;
			s1.eVar40=SC_GeoGraphy;
			s1.events="event25";
			s1.tl(this,'o','Calculator Page Submit');	
			
			SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
			
			SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
			
			SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar26:s1.eVar26,eVar36:s1.eVar36,eVar37:s1.eVar37,eVar38:s1.eVar38,eVar39:s1.eVar39,eVar40:s1.eVar40};
			$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}

		/* Travel Insurance - Easy Travel Annual Multi Trip */
		
		else if(SC_PathName == '/buy-annual-multi-trip-travel-insurance-plan.aspx')
		{
			SC_TravellerStay = jQuery('#ifrmeh').contents().find('input[name="GroupIndia"]:checked').val();
			if(SC_TravellerStay == 'rdoBtnIndYes')
			{
				SC_TravellerStay = 'Yes';
			}
			else
			{
				SC_TravellerStay = 'No';
			}
			
			SC_Plan = jQuery('#ifrmeh').contents().find('#plan1 option:selected').text().replace(',', '');		
			SC_Duration = jQuery('#ifrmeh').contents().find('#PlanDays1 option:selected').text();
			SC_VisaType = jQuery('#ifrmeh').contents().find('#DDVisaType option:selected').text();
			SC_GeoGraphy = jQuery('#ifrmeh').contents().find('#geography1 option:selected').text();		
			SC_SumInss = jQuery('#ifrmeh').contents().find('#sum1').text();		
			SC_Base = jQuery('#ifrmeh').contents().find('#Basepremium').text();		
			SC_Gross = jQuery('#ifrmeh').contents().find('#premium1').text();		
				
			SC_Calc_Submit_Val="Travel Insurance;Easy Travel Annual Multitrip;1;;event29=1,";
				
			SC_Calc_BuyNow_Val="Travel Insurance;Easy Travel Annual Multitrip";
			
			SC_Calc_Submit_Val+="Travel Insurance;Easy Travel Annual Multitrip;;;event26="+SC_Base+"|event28="+SC_Gross;
			
			s1.linkTrackVars="";
			s1.linkTrackEvents="event25";
			s1.products=SC_Calc_BuyNow_Val;
			s1.eVar21="Travel Insurance Annual Multi Trip";
			s1.eVar26=SC_SumInss;
			s1.eVar36=SC_TravellerStay;
			s1.eVar37=SC_Plan;
			s1.eVar38=SC_Duration;
			s1.eVar39=SC_VisaType;
			s1.eVar40=SC_GeoGraphy;
			s1.events="event25";
			s1.tl(this,'o','Calculator Page Submit');	
			
			SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
			
			SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
			
			SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar26:s1.eVar26,eVar36:s1.eVar36,eVar37:s1.eVar37,eVar38:s1.eVar38,eVar39:s1.eVar39,eVar40:s1.eVar40};
			$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}
		
		/* Health Insurance : Family - Optima Restore Family Floater */
		
		else if(SC_PathName == '/optima-restore-floater-premium-calculator.aspx')
		{
			SC_Tenure = jQuery('#ifrmeh').contents().find('input[name="radio"][class="rbyear"]:checked').val();
			SC_Location = jQuery('#ifrmeh').contents().find('#mmrCities option:selected').text();		
			SC_FamilySize = jQuery('#ifrmeh').contents().find('#familySize option:selected').text();
			SC_SumInss = jQuery('#ifrmeh').contents().find('#sumInsured option:selected').text();	
			SC_Members = 2;
			SC_Calc_temp = '';
			SC_Members = jQuery('#ifrmeh').contents().find('#familySize option:selected').text().split('');
			SC_Members = parseInt(SC_Members[0]) + parseInt(SC_Members[10]);
			
			if (SC_Tenure==1)
			{
				SC_Tenure = 'One Year';
				SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace(',', '');	
				SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace(',', '');	
			}
			else if (SC_Tenure==2)
			{
				SC_Tenure = 'Two Year';
				SC_Base = jQuery('#ifrmeh').contents().find('#netPremium2').text().replace(',', '');	
				SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium2').text().replace(',', '');	
			}	
			
			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Age[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#ageGroup'+i_calc+' option:selected').text();

				SC_Calc_Submit_Val+="Health Insurance Family;Optima Restore Family Floater;1;"+";event29=1;eVar25="+SC_Age[SC_Calc_temp]+",";
			
				SC_Calc_BuyNow_Val+="Health Insurance Family;Optima Restore Family Floater;;;;"+"eVar25="+SC_Age[SC_Calc_temp]+",";
			}
			
			SC_Calc_Submit_Val+="Health Insurance Family;Optima Restore Family Floater;;;event26="+SC_Base+"|event28="+SC_Gross;
			
			s1.linkTrackVars="";
			s1.linkTrackEvents="event25";
			s1.products=SC_Calc_BuyNow_Val;
			s1.events="event25";
			s1.eVar21="Optima Restore Family Floater";
			s1.eVar23 = SC_Tenure;
			s1.eVar26 = SC_SumInss;
			s1.eVar41 = SC_FamilySize;
			s1.eVar43 = SC_Location;
			s1.tl(this,'o','Calculator Page Submit');
			
			SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
			
			SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
			
			SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar23:s1.eVar23,eVar26:s1.eVar26,eVar41:s1.eVar41,eVar43:s1.eVar43};
			$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}
		
		/* Health Insurance : Family - Easy Health Family Floater */

		else if(SC_PathName == '/family-easy-health-premium-calculator.aspx')
		{
			
			SC_Tenure = jQuery('#ifrmeh').contents().find('input[name="radio"][class="rbyear"]:checked').val();
			SC_Location = jQuery('#ifrmeh').contents().find('#mmrCities option:selected').text();		
			SC_FamilySize = jQuery('#ifrmeh').contents().find('#familySize option:selected').text();
			SC_SumInss = jQuery('#ifrmeh').contents().find('#sumInsured option:selected').text();	
			SC_Members = 2;
			SC_Calc_temp = '';
			SC_Members = jQuery('#ifrmeh').contents().find('#familySize option:selected').text().split('');
			SC_Members = parseInt(SC_Members[0]) + parseInt(SC_Members[10]);
			
			SC_CriticalIll = jQuery('#ifrmeh').contents().find('#criticalIllness option:selected').text();
			SC_Platinum_Plan = jQuery('#ifrmeh').contents().find('.top_sec_tab .active').text().trim();
			
			if (SC_Tenure==1)
			{
				SC_Tenure = 'One Year';
				SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace(',', '');	
				SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace(',', '');	
			}
			else if (SC_Tenure==2)
			{
				SC_Tenure = 'Two Year';
				SC_Base = jQuery('#ifrmeh').contents().find('#netPremium2').text().replace(',', '');	
				SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium2').text().replace(',', '');	
			}			
			for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Age[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#ageGroup'+i_calc+' option:selected').text();

				SC_Calc_Submit_Val+="Health Insurance Family;Easy Health Family Floater;1;"+";event29=1;eVar25="+SC_Age[SC_Calc_temp]+",";
			
				SC_Calc_BuyNow_Val+="Health Insurance Family;Easy Health Family Floater;;;;"+"eVar25="+SC_Age[SC_Calc_temp]+",";
			}			
			SC_Calc_Submit_Val+="Health Insurance Family;Easy Health Family Floater;;;event26="+SC_Base+"|event28="+SC_Gross;			
			
			s1.linkTrackVars="";
			s1.linkTrackEvents="event25";
			s1.products=SC_Calc_BuyNow_Val;
			s1.eVar21="Easy Health Family Floater";
			s1.events="event25";
			s1.eVar22 = SC_Platinum_Plan;
			s1.eVar23 = SC_Tenure;
			s1.eVar26 = SC_SumInss;	
			s1.eVar27 = SC_CriticalIll;
			s1.eVar41 = SC_FamilySize;
			s1.eVar43 = SC_Location;
			s1.tl(this,'o','Calculator Page Submit');
			
			SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
			
			SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);
			
			SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar22:s1.eVar22,eVar23:s1.eVar23,eVar26:s1.eVar26,eVar27:s1.eVar27,eVar41:s1.eVar41,eVar43:s1.eVar43};
			$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}
		
		/* Health Insurance : Family - Optima Super Family Floater */

		else if(SC_PathName == '/family-optima-super-premium-calculator.aspx')
		{
			SC_Tenure = jQuery('#ifrmeh').contents().find('#policyTenure option:selected').text();		
			SC_FamilySize = jQuery('#ifrmeh').contents().find('#familySize option:selected').text();
			SC_SumInss = jQuery('#ifrmeh').contents().find('#sumInsured option:selected').text();
			SC_Deductibles = jQuery('#ifrmeh').contents().find('#deductible option:selected').text();
			SC_Base = jQuery('#ifrmeh').contents().find('#netPremium').text().replace(',', '');	
			SC_Gross = jQuery('#ifrmeh').contents().find('#grossPremium').text().replace(',', '');	
			
			if (SC_Tenure=="One Year")
			{
				SC_Tenure = 'One Year';				
			}
			else if (SC_Tenure=="Two Years")
			{
				SC_Tenure = 'Two Year';				
			}	
			SC_Members = 2;
			SC_Calc_temp = '';
			SC_Members = jQuery('#ifrmeh').contents().find('#familySize option:selected').text().split('');
			SC_Members = parseInt(SC_Members[0]) + parseInt(SC_Members[10]);
			
				for(i_calc=1;i_calc<=SC_Members;i_calc++)
			{
				SC_Calc_temp=i_calc-1;
				SC_Age[SC_Calc_temp] = jQuery('#ifrmeh').contents().find('#ageGroup'+i_calc+' option:selected').text();

				SC_Calc_Submit_Val+="Health Insurance Family;Optima Super Family Floater;1;"+";event29=1;eVar25="+SC_Age[SC_Calc_temp]+",";
			
				SC_Calc_BuyNow_Val+="Health Insurance Family;Optima Super Family Floater;;;;"+"eVar25="+SC_Age[SC_Calc_temp]+",";
			}
			
			SC_Calc_Submit_Val+="Health Insurance Family;Optima Super Family Floater;;;event26="+SC_Base+"|event28="+SC_Gross;
		
			s1.linkTrackVars="";
			s1.linkTrackEvents="event25";
			s1.products=SC_Calc_BuyNow_Val;
			s1.eVar21="Optima Super Family Floater";
			s1.events="event25";
			s1.eVar23 = SC_Tenure;
			s1.eVar26 = SC_SumInss;
			s1.eVar30 = SC_Deductibles;
			s1.eVar41 = SC_FamilySize;			
			s1.tl(this,'o','Calculator Page Submit');
			
			SC_Cookie_Submit_Val = {prod_Cal:SC_Calc_Submit_Val};		
			$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',SC_Cookie_Submit_Val);
			
			SC_Cookie_BuyNow_Val = {prod_Cal:SC_Calc_BuyNow_Val};
			$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',SC_Cookie_BuyNow_Val);		
			
			SC_Cookie_ProductName_Var = {eVar21:s1.eVar21,eVar23:s1.eVar23,eVar26:s1.eVar26,eVar30:s1.eVar30,eVar41:s1.eVar41};
			$.cookie('SC_Cookie_ProductName_Calc',SC_Cookie_ProductName_Var);
		}
	});
});





















/*-------------------------------NEW LEGACY FILE-SC_StepwiseSwitch.js------------------------*/

var SC_Calc_Stepwise = location.pathname;
var SC_Flags = 0;
var whileSubmit_Calc = '';
var AbandonedField_Calc = '';
var SC_Flag_Calc_Input = '';
var SC_CalcPage_Abd='';
switch (SC_Calc_Stepwise) {

	/*HEALTH INSURANCE PLANS Individual : OptimaRestore|Vital|Plus|Super|EasyHealth|PersonalAccident|Family*/
	case '/buyonline/BuyOnline-Proposal-Details.aspx':
	$.cookie.json = true;
	SC_CalcPage_Abd=5;
	if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
		if(typeof(JsonData_eVar.eVar21)!=='undefined'){
			s1.linkTrackVars="";
			s1.products=JsonData_Product.prod_Cal;
			s1.eVar13="Proposal Form";
			s1.eVar14="Acquistion";
			s1.eVar15="General";
			s1.events="event30";		
			SC_eVars_Cookie();
		}
	}
	break;
	
	/*HEALTH INSURANCE PLANS Individual : OptimaRestore|Vital|Plus|Super|EasyHealth|PersonalAccident|Family - Step 1*/
	case '/buyonline/BuyOnline-InsuredMembers-Details.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event12";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		}
	break;
	
	/*HEALTH INSURANCE PLANS Individual : OptimaRestore|Vital|Plus|Super|EasyHealth|PersonalAccident|Family - Step 2*/
	case '/buyonline/BuyOnline-Proposal-Summary.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event13";		
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();				
			}
		}
	break;
	
	/*Payment Page*/
	
	case '/buyonline/Buy-Online-Payment-Options.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event14";		
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();				
			}
		}
	break;
	
	/*HEALTH INSURANCE PLANS Individual : DengueCare|OptimaCashPlatinum*/
	case '/buyonline/Optima-Proposal-Details.aspx':
	$.cookie.json = true;
	SC_CalcPage_Abd=5;
	if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
		if(typeof(JsonData_eVar.eVar21)!=='undefined'){
			s1.linkTrackVars="";
			s1.eVar13="Proposal Form";
			s1.eVar14="Acquistion";
			s1.eVar15="General";
			s1.events="event30";
			SC_eVars_Cookie();
			s1.products=JsonData_Product.prod_Cal;			
		}
	}
	break;
	
	/*HEALTH INSURANCE PLANS Individual : DengueCare|OptimaCashPlatinum - Step 1*/
	case '/buyonline/Optima-InsuredMembers-Details.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event12";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		}
	break;
	
	/*HEALTH INSURANCE PLANS Individual : DengueCare|OptimaCashPlatinum - Step 2*/
	case '/buyonline/BuyOnline-Proposal-Details.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event13";		
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();				
			}
		}
	break;
	
	/*HEALTH INSURANCE PLANS Individual : DengueCare|OptimaCashPlatinum - Step 3*/
	case '/buyonline/Optima-Proposal-Summary.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event14";		
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();				
			}
		}
	break;
	
	/*PersonalAccient :  Standard|Premium - Step 1*/
	case '/buyonline/BuyOnline-IPA-InsuredMembers-Details.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event12";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		}
	break;
	
	/*HEALTH INSURANCE PLANS Family : OptimaRestore|Super|Easy - Step 2*/
	case '/buyonline/BuyOnline-InsuredFamily-Members-Details.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event12";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		}
	break;
	
	/*TravelInsurance - Individual|Family|Annual|Multi*/
	case '/travel/Trvl-Proposal-Details.aspx':
	$.cookie.json = true;
	SC_CalcPage_Abd=5;
	if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
		if(typeof(JsonData_eVar.eVar21)!=='undefined'){
			s1.linkTrackVars="";
			s1.eVar13="Proposal Form";
			s1.eVar14="Acquistion";
			s1.eVar15="General";
			s1.events="event30";
			SC_eVars_Cookie();
			s1.products=JsonData_Product.prod_Cal;
			
            
		}
	}
	break;
	
	/*TravelInsurance - Individual|Family|Annual|Multi : Step 1*/
	case '/travel/Travl-Insurance-Members-Details.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event12";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		}
	break;
	
	/*TravelInsurance - Individual|Family|Annual|Multi : Step 2*/
	case '/travel/Travl-Nominee-Details.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event13";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		}
	break;
	
	/*TravelInsurance - Individual|Family|Annual|Multi : Step 3*/
	case '/travel/Travl-Proposal_Summary.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event14";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		}
	break;
	
	/*TravelInsurance - Individual|Family|Annual|Multi : Step 4*/
	case '/travel/Trvl-Paymant-Option.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event15";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		}
	break;
	
	/*Technical Error Page*/
	case '/buyonline/BuyOnline-Tech-Error.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event21";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',null);
		$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',null);
		$.cookie('SC_Cookie_ProductName_Calc',null);
		}
	break;
	
	/*Technical Error Page : Travel Insurance*/
	case '/Travel/Travel-Error.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
		if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event21";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',null);
		$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',null);
		$.cookie('SC_Cookie_ProductName_Calc',null);
		}
	break;
	
	/*Dashboard Page*/
	case '/buyonline/Buy-Online-Dashboard.aspx':
		$.cookie.json = true;
		SC_CalcPage_Abd=5;
	 	if($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined'){
		JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
		JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			if(typeof(JsonData_eVar.eVar21)!=='undefined'){
				s1.products=JsonData_Product.prod_Cal;
				s1.events="event31";
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";
				SC_eVars_Cookie();
			}
		$.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc',null);
		$.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc',null);
		$.cookie('SC_Cookie_ProductName_Calc',null);
		}		
	break;
}

jQuery(window).load(function(){
	$('input[type=text],select').click(function(){
		SC_Flag_Calc_Input = 5;
		if(SC_Calc_Stepwise=="/buyonline/BuyOnline-Proposal-Details.aspx" && SC_Flags==0 && $.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined')
		{
			JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
			JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			
			if(typeof(JsonData_eVar.eVar21)!=='undefined')
			{
				s1.linkTrackVars="";			
				s1.linkTrackEvents="event11";
				s1.events="event11";		
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";	
				SC_eVars_Cookie();
				s1.products=JsonData_Product.prod_Cal;
				s1.tl(this,'o','Lead Starts');
				SC_Flags++;
			}
		}
		
		else if(SC_Calc_Stepwise=="/buyonline/Optima-Proposal-Details.aspx" && SC_Flags==0 && $.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined')
		{
			JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
			JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			
			if(typeof(JsonData_eVar.eVar21)!=='undefined')
			{
				s1.linkTrackVars="";			
				s1.linkTrackEvents="event11";
				s1.events="event11";		
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";	
				SC_eVars_Cookie();
				s1.products=JsonData_Product.prod_Cal;
				s1.tl(this,'o','Lead Starts');
				SC_Flags++;
			}
		}
		
		else if(SC_Calc_Stepwise=="/travel/Trvl-Proposal-Details.aspx" && SC_Flags==0 && $.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc')!=null && typeof($.cookie('SC_ApolloMunichHealthInsurance_Submit_Calc'))!=='undefined')
		{
			JsonData_eVar = $.cookie('SC_Cookie_ProductName_Calc');
			JsonData_Product = $.cookie('SC_ApolloMunichHealthInsurance_BuyNow_Calc');
			
			if(typeof(JsonData_eVar.eVar21)!=='undefined')
			{
				s1.linkTrackVars="";			
				s1.linkTrackEvents="event11";
				s1.events="event11";		
				s1.eVar13="Proposal Form";
				s1.eVar14="Acquisition";
				s1.eVar15="General";	
				SC_eVars_Cookie();
				s1.products=JsonData_Product.prod_Cal;
				s1.tl(this,'o','Lead Starts');
				SC_Flags++;
			}
		}
	});
});

function SC_eVars_Cookie()
{
	$.cookie.json = true;
	s1.eVar21='';
	s1.eVar22='';
	s1.eVar23='';
	s1.eVar24='';
	s1.eVar26='';
	s1.eVar30='';
	s1.eVar31='';
	s1.eVar36='';
	s1.eVar37='';
	s1.eVar38='';
	s1.eVar39='';
	s1.eVar40='';
	s1.eVar41='';
	s1.eVar43='';

	if($.cookie('SC_Cookie_ProductName_Calc')!=null && typeof($.cookie('SC_Cookie_ProductName_Calc'))!=='undefined'){
	JsonData = $.cookie('SC_Cookie_ProductName_Calc');

	if(typeof(JsonData.eVar21)!=='undefined'){
	s1.eVar21=JsonData.eVar21;
	}
	if(typeof(JsonData.eVar22)!=='undefined'){
	s1.eVar22=JsonData.eVar22;
	}
	if(typeof(JsonData.eVar23)!=='undefined'){
	s1.eVar23=JsonData.eVar23;
	}
	if(typeof(JsonData.eVar24)!=='undefined'){
	s1.eVar24=JsonData.eVar24;
	}
	if(typeof(JsonData.eVar26)!=='undefined'){
	s1.eVar26=JsonData.eVar26;
	}
	if(typeof(JsonData.eVar27)!=='undefined'){
	s1.eVar27=JsonData.eVar27;
	}
	if(typeof(JsonData.eVar30)!=='undefined'){
	s1.eVar30=JsonData.eVar30;
	}
	if(typeof(JsonData.eVar31)!=='undefined'){
	s1.eVar31=JsonData.eVar31;
	}
	if(typeof(JsonData.eVar36)!=='undefined'){
	s1.eVar36=JsonData.eVar36;
	}
	if(typeof(JsonData.eVar37)!=='undefined'){
	s1.eVar37=JsonData.eVar37;
	}
	if(typeof(JsonData.eVar38)!=='undefined'){
	s1.eVar38=JsonData.eVar38;
	}
	if(typeof(JsonData.eVar39)!=='undefined'){
	s1.eVar39=JsonData.eVar39;
	}
	if(typeof(JsonData.eVar40)!=='undefined'){
	s1.eVar40=JsonData.eVar40;
	}
	if(typeof(JsonData.eVar41)!=='undefined'){
	s1.eVar41=JsonData.eVar41;
	}
	if(typeof(JsonData.eVar43)!=='undefined'){
	s1.eVar43=JsonData.eVar43;
	}
	//$.cookie('SC_Cookie_ProductName_Calc',null);
	}
}

jQuery('input[type=image]').click(function(){
	whileSubmit_Calc=1;
});

jQuery("input,select").focusin(function(){  
		AbandonedField_Calc = $(this).attr("name");  
})
jQuery("body").on("change", "select", function(){  
		AbandonedField_Calc = $(this).attr("name");
});


jQuery(window).load(function(){
	window.onbeforeunload = function () {
		if(whileSubmit_Calc!=1 && SC_Flag_Calc_Input==5 && SC_CalcPage_Abd==5){
			s1.linkTrackVars='prop15,events';
			s1.linkTrackEvents="event8" ;
			s1.events = "event8";
			if(AbandonedField_Calc!="")
			{
				s1.prop15=s1.pageName+':'+AbandonedField_Calc;
				s1.tl(this,'o','Form Abandonment');			
			}
		}
	};	
});






<!-- Site Catalyst Code Start : Request Call Back Click -->
jQuery('.button_Leave_Details').click(function(){
 s1.eVar5='RequestCallBackPopup';
 s1.eVar6='RequestCallBackPopup';
 s1.linkTrackVars='';
 s1.linkTrackEvents='event4';
 s1.events="event4";
 s1.eVar15=s1.pageName;
s1.tl(this,'o','Popup Clicks');
 s1.eVar5='';s1.events='';
});
<!-- Site Catalyst Code End : Request Call Back Click -->

       <!-- Site Catalyst Code Start : Live Chat -->	
 
          jQuery("body").on("click",'#chatimage',function(){
 s1.eVar5='LiveChat';
 s1.eVar6='LiveChat';
 s1.linkTrackVars='';
 s1.linkTrackEvents='event4';
 s1.events="event4";
 s1.eVar15=s1.pageName;
s1.tl(this,'o','LiveChat Clicks');
 s1.eVar5='';s1.events='';
});
  
var SC_Flag_LC=0;
jQuery('body').find('.gmg_chat').contents().on('click','.gmg_prechat_form',function () {
 if(SC_Flag_LC==0)
{
 s1.linkTrackVars='';
 s1.linkTrackEvents='event11';
 s1.events="event11";
 s1.eVar13="Live Chat";
 s1.eVar14='Acquisition';
 s1.eVar15=s1.pageName;
s1.tl(this,'o','LeadStarts');
SC_Flag_LC++;
}
});

jQuery('body').find('.gmg_chat').contents().on('click','.gmg_chat_form',function () {
 if(SC_Flag_LC==0)
{
 s1.linkTrackVars='';
 s1.linkTrackEvents='event11';
 s1.events="event11";
 s1.eVar13="Live Chat";
 s1.eVar14='Acquisition';
 s1.eVar15=s1.pageName;
s1.tl(this,'o','LeadStarts');
SC_Flag_LC++;
var SC_Flag_LC_Input= 5;
}
});  
function SC_LiveChat(){
 s1.linkTrackVars='';    
 s1.linkTrackEvents='event22';
 s1.events='event22';
s1.tl(this,'o','Lead Submit');
 LC_whileSubmit=1;

 s1.linkTrackVars='';
 s1.linkTrackEvents='event20';
 s1.events='event20';
s1.tl(this,'o','Lead Complete');
}
    
var LC_PageName;
jQuery(function(){
 LC_PageName=s1.pageName;
});
var LC_AbandonedField="";
var LC_whileSubmit=0;
jQuery("input,select").focusin(function(){
 LC_AbandonedField= $(this).attr("name");
});
  
jQuery("body").on("change", "select", function(){  
 LC_AbandonedField= $(this).attr("name");
});
jQuery(window).load(function(){
 window.onbeforeunload= function () {
 if(LC_whileSubmit!=1 && SC_Flag_LC_Input==5){
 s1.linkTrackVars='prop15,events';
 s1.linkTrackEvents="event8" ;
 s1.events= "event8";
 if(LC_AbandonedField!="")
{
 s1.prop15='Live Chat:'+ LC_AbandonedField;
s1.tl(this,'o','Form Abandonment');  
}
}
};
});
    <!-- Site Catalyst Code End : Live Chat -->
    
    <!-- Site Catalyst Code Start : Request call back Right Nav -->
    var SC_Flag_RN=0;
var PageName_RQ;
jQuery(function(){
 PageName_RQ=s1.pageName;
})
var AbandonedField_RQ="";
var SC_Flag_RQN_Input='';
var whileSubmit_RQ=0;
jQuery("input,select").focusin(function(){  
 AbandonedField_RQ= $(this).prev('label').attr("for");
});
jQuery("body").on("change", "select", function(){  
 AbandonedField_RQ= $(this).attr("name");
});

jQuery(".vishnu1").click(function(){
 if(SC_Flag_RN==0){
 s1.linkTrackVars='';
 s1.linkTrackEvents='event11';
 s1.events="event11";
 s1.eVar13='Request A Call Back Right Navigation';
 s1.eVar14='Acquisition';
 s1.eVar15=s1.pageName;
s1.tl(this,'o','LeadStarts');
SC_Flag_RN++;
 SC_Flag_RQN_Input=5;
}
});

jQuery(window).load(function(){
 window.onbeforeunload= function () {
 if(whileSubmit_RQ!=1 && SC_Flag_RQN_Input==5){
 s1.linkTrackVars='prop15,events';
 s1.linkTrackEvents="event8" ;
 s1.events= "event8";
 if(AbandonedField_RQ!="")
{
 s1.prop15='Request A Call Back Right Navigation:'+AbandonedField_RQ;
s1.tl(this,'o','Form Abandonment');
}
}
};
});

var SC_Cookie_Variable,SC_Cookie_Data;
function SC_Code_Thank_Function_RQ(){
 s1.linkTrackVars='';
 s1.linkTrackEvents='event22';
 s1.events='event22';
s1.tl(this,'o','LeadSubmit');
 SC_Cookie_Variable= {event:"event20",eVar13:s1.eVar13,eVar14:s1.eVar14,eVar15:s1.eVar15};
sessionStorage.setItem("SC_ApolloMunichHealthInsurance", JSON.stringify(SC_Cookie_Variable));
 whileSubmit_RQ=1;
}
    <!-- Site Catalyst Code End : Request Call back Right Nav -->  

/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s1.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.4.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.4.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var p=k.AppMeasurement.Pb;p||(p=null);var n=k,m,s;try{for(m=n.parent,s=n.location;m&&m.location&&s&&""+m.location!=""+s&&n.location&&""+m.location!=""+n.location&&m.location.host==s1.host;)n=m,m=n.parent}catch(u){}a.F=function(a){try{console.log(a)}catch(b){}};a.Ma=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.wb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ea&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ea=0<d?c.substring(d):c}return a.Ea};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.wb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.L=[];a.ia=function(c,b,d){if(a.Fa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);
if(g&&"prerender"==g){if(!a.ja)for(a.ja=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ja=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.L.push({m:c,a:b,t:e}),a.ja||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.xa();0<a.L.length;){d=a.L.shift();if(b&&!d.t&&d.t>c){a.L.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));
break}a.Fa=1;a[d.m].apply(a,d.a);a.Fa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ia("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.P,(h=a.lightTrackVars)&&(h=","+h+","+a.na.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,
a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Nb,f=a[e].Mb));h&&(h=","+h+","+a.H.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",h,l,k,q,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,
m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.r(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),q=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Ma(q)&&("prop"==k?h="c"+q:"eVar"==k?h="v"+
q:"list"==k?h="l"+q:"hier"==k&&(h="h"+q,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.zb=function(){var c="",b,d,f,e,g,h,l,k,q="",m="",n=e="";if(a.lightProfileID)b=a.P,(q=a.lightTrackVars)&&(q=","+q+","+a.na.join(",")+",");else{b=a.g;if(a.pe||a.linkType)q=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(q=a[e].Nb,m=a[e].Mb));q&&(q=","+q+","+a.H.join(",")+",");m&&(m=","+m+",",q&&(q+=
",events,"));a.events2&&(n+=(""!=n?",":"")+a.events2)}if(a.visitor&&a.visitor.getCustomerIDs){e=p;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&n?(g=n,n=
""):"marketingCloudOrgID"==e&&a.visitor&&(g=a.visitor.marketingCloudOrgID));if(g&&(!q||0<=q.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e=
"aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e=
"cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;
case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":n&&(g+=(""!=g?",":"")+n);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],q,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e=
"mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],q,e));g="";break;default:a.Ma(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Sb||"undefined"!=""+a.Ib&&"HTML"!=
(""+a.Ib).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Ia=function(a){var b=k.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,
1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.M=function(c){var b=a.D(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Ia(c),e)?{id:e.substring(0,100),type:g}:0};a.Qb=function(c){for(var b=
a.D(c),d=a.M(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.M(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Hb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,h;a.oa=1;d||(a.oa=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.M(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.M(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:
"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.oa=1;!e&&d&&(e=a.Ia(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,q=0,n;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(n=g[h])&&l.substring(l.length-(n.length+1))=="."+n&&(f="d");if(a.trackExternalLinks&&
!f&&(l=e.toLowerCase(),a.La(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=0;h<g.length;h++)n=g[h],0<=l.indexOf(n)&&(q=1);q?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=
k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Ab=function(){var c=a.oa,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):
0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");a.e=a.r("c",h)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],
g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),h--);a.cookieWrite("s_sq",e)}}}return c};a.Bb=function(){if(!a.Lb){var c=new Date,b=n.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",p="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&
(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.Rb(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
p=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=p;a.homepage=m;a.Lb=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.eb=function(){return d.ib};d.jb=function(b){if(d.ib=b)a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
{get:d.eb,set:d.jb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.ia(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Db=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,
c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.R=function(c,b){var d,f,e,g,h,l;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(l in a[g])h[l]||(h[l]=a[g][l]);a[g]=h}};a.Va=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Aa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.vb=function(a){var b,d,f,e,g,h=0,l,k="",m="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(l=b.substring(d+
1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&l)))){if((a=l.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?k+=(k?"&":"")+e:m+=(m?"&":"")+e;k&&m?l=k+"&"+m:m=""}d=253-(l.length-m.length)-
b.length;a=b+(0<d?g.substring(0,d):"")+"?"+l}return a};a.ab=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ea=!1;a.J=!1;a.lb=function(){a.J=!0;a.j()};a.ca=!1;a.V=!1;a.hb=function(c){a.marketingCloudVisitorID=c;a.V=!0;a.j()};a.fa=!1;a.W=!1;a.mb=
function(c){a.visitorOptedOut=c;a.W=!0;a.j()};a.Z=!1;a.S=!1;a.Xa=function(c){a.analyticsVisitorID=c;a.S=!0;a.j()};a.ba=!1;a.U=!1;a.Za=function(c){a.audienceManagerLocationHint=c;a.U=!0;a.j()};a.aa=!1;a.T=!1;a.Ya=function(c){a.audienceManagerBlob=c;a.T=!0;a.j()};a.$a=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.da=!1;a.I=!1;a.xa=function(){a.I=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.ea||a.J||(a.ab(a.lb)?a.J=
!0:a.ea=!0);if(a.ea&&!a.J)return!1;b&&b.isAllowed()&&(a.ca||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||(a.ca=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.hb]),a.marketingCloudVisitorID&&(a.V=!0)),a.fa||a.visitorOptedOut||!b.isOptedOut||(a.fa=!0,a.visitorOptedOut=b.isOptedOut([a,a.mb]),a.visitorOptedOut!=p&&(a.W=!0)),a.Z||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Z=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Xa]),a.analyticsVisitorID&&(a.S=!0)),a.ba||
a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.ba=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,a.Za]),a.audienceManagerLocationHint&&(a.U=!0)),a.aa||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.aa=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ya]),a.audienceManagerBlob&&(a.T=!0)),c=a.ca&&!a.V&&!a.marketingCloudVisitorID,b=a.Z&&!a.S&&!a.analyticsVisitorID,d=a.ba&&!a.U&&!a.audienceManagerLocationHint,f=a.aa&&!a.T&&!a.audienceManagerBlob,
e=a.fa&&!a.W,c=c||b||d||f||e?!1:!0);a.da||a.I||(a.$a(a.xa)?a.I=!0:a.da=!0);a.da&&!a.I&&(c=!1);return c};a.o=p;a.u=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.qb=c;f.pb=b;f.nb=d;a.o==p&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.kb(),a.o!=p))for(;0<a.o.length;)c=a.o.shift(),c.pb.apply(c.qb,c.nb)};a.kb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.fb=function(c){var b,d,f=p,e=p;if(!a.isReadyToTrack()){b=[];if(c!=p)for(d in f=
{},c)f[d]=c[d];e={};a.Va(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.xb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+
Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState());a.p("_s");a.fb(c)||(b&&a.R(b),c&&(d={},a.Va(d,0),a.R(c)),a.Db()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.xb()),a.Hb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||
(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Wa||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:n.document.referrer),a.Wa=1,a.referrer=a.vb(a.referrer),a.p("_g")),a.Ab()&&!a.abort&&(a.visitor&&!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),
a.Bb(),g+=a.zb(),a.Gb(e,g),a.p("_t"),a.referrer=""))),c&&a.R(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.za=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.za.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPreTrackCallback")};a.cb=function(c){a.wa(a.za,
c)};a.ya=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.ya.push([c,b]):a.debugTracking&&a.F("DEBUG: Non function type passed to registerPostTrackCallback")};a.bb=function(c){a.wa(a.ya,c)};a.wa=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1];e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.F(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=
c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=
void 0};a.tagContainerMarker="";a.Gb=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",h=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(h||(h=a.account,f=h.indexOf(","),0<=f&&(h=h.substring(0,f)),h=h.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=h+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks;d+=
f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Kb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.cb(d);a.tb(d);a.ka()};a.Ua=/{(%?)(.*?)(%?)}/;a.Ob=RegExp(a.Ua.source,"g");a.ub=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.Ob),e=0;e<f.length;++e){var g=
f[e],h=g.match(a.Ua),k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.yb());d.c=d.c.replace(g,a.escape(k))}}};a.yb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,
b){return(Array(a+1).join(0)+b).slice(-a)};a.ta={};a.doPostbacks=function(c){if("object"==typeof c)if(a.ub(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,
3)&&(a.ta[d.id]=new Image,a.ta[d.id].alt="",a.ta[d.id].src=d.c)}};a.tb=function(c){a.i||a.Cb();a.i.push(c);a.ma=a.C();a.Sa()};a.Cb=function(){a.i=a.Eb();a.i||(a.i=[])};a.Eb=function(){var c,b;if(a.ra()){try{(b=k.localStorage.getItem(a.pa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.ra=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ja=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ka=function(){if(a.q&&(a.B&&a.B.complete&&a.B.G&&a.B.va(),
a.q))return;a.Ka=p;if(a.qa)a.ma>a.O&&a.Qa(a.i),a.ua(500);else{var c=a.ob();if(0<c)a.ua(c);else if(c=a.Ga())a.q=1,a.Fb(c),a.Jb(c)}};a.ua=function(c){a.Ka||(c||(c=0),a.Ka=setTimeout(a.ka,c))};a.ob=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Pa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ga=function(){if(0<a.i.length)return a.i.shift()};a.Fb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+=
"\n\t"+a.unescape(c[d]);a.F(b)}};a.gb=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Y=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Y=!0,a.X=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.X=function(a){return k.$.parseJSON(a)},a.Y=!0):a.X=function(){return null};a.Jb=function(c){var b,d,f;a.gb()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==typeof XDomainRequest||(b=
new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Y?b.Ba=!0:b=0));!b&&a.Ta&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||
(b.abort=function(){b.src=p}));b.Da=function(){try{b.G&&(clearTimeout(b.G),b.G=0)}catch(a){}};b.onload=b.va=function(){a.bb(c);b.Da();a.sb();a.ga();a.q=0;a.ka();if(b.Ba){b.Ba=!1;try{a.doPostbacks(a.X(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ha=function(){b.Da();(a.trackOffline||a.qa)&&a.q&&a.i.unshift(a.rb);a.q=0;a.ma>a.O&&a.Qa(a.i);a.ga();a.ua(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.va():b.Ha())};a.Pa=a.C();if(1==d||2==d){var e=c.indexOf("?");f=c.substring(0,
e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Na)try{f.removeChild(a.Na)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Na=a.B}b.G=setTimeout(function(){b.G&&(b.complete?b.va():(a.trackOffline&&b.abort&&b.abort(),b.Ha()))},5E3);a.rb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.K||a.A)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=
250),a.ha=setTimeout(a.ga,a.forcedLinkTrackingTimeout)};a.sb=function(){if(a.ra()&&!(a.Oa>a.O))try{k.localStorage.removeItem(a.pa()),a.Oa=a.C()}catch(c){}};a.Qa=function(c){if(a.ra()){a.Sa();try{k.localStorage.setItem(a.pa(),k.JSON.stringify(c)),a.O=a.C()}catch(b){}}};a.Sa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ga()}};a.forceOffline=function(){a.qa=!0};a.forceOnline=function(){a.qa=!1};a.pa=function(){return a.offlineFilename+
"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.La=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Kb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.R(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=
typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>
e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}}};a.H="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.na="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.P=a.na.slice(0);a.Aa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.P.push("prop"+m)),a.g.push("eVar"+m),a.P.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");a.g=a.g.concat(m);a.H=a.H.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.Pa=0;a.ma=0;a.O=0;a.Oa=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Ta=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Ta=!0}}catch(x){}a.ga=function(){a.ha&&(k.clearTimeout(a.ha),a.ha=p);a.l&&a.K&&a.l.dispatchEvent(a.K);a.A&&("function"==typeof a.A?a.A():
a.l&&a.l.href&&(a.d.location=a.l.href));a.l=a.K=a.A=0};a.Ra=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ca)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.Ca=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.N&&a.N==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||
a.clickObject.parentNode))a.clickObject=0;else{var h=a.N=a.clickObject;a.la&&(clearTimeout(a.la),a.la=0);a.la=setTimeout(function(){a.N==h&&(a.N=0)},1E4);f=a.Ja();a.track();if(f<a.Ja()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.La(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.K=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Ca=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ra,30)};a.Ra();r?a.setAccount(r):a.F("Error, missing Report Suite ID in AppMeasurement initialization");a.loadModule("ActivityMap")}
function s_gi(r){var a,k=window.s_c_il,p,n,m=r.split(","),s,u,t=0;if(k)for(p=0;!t&&p<k.length;){a=k[p];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(n=a.account?a.account:a.oun,n=a.allAccounts?a.allAccounts:n.split(","),s=0;s<m.length;s++)for(u=0;u<n.length;u++)m[s]==n[u]&&(t=1);p++}t||(a=new AppMeasurement(r));return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,p,n;if(a)for(k=0;k<a.length;k++)p=a[k],n=s_gi(p.oun),n.setAccount(p.un),n.setTagContainer(p.tagContainerName);r.s_giq=0}s_pgicq();
