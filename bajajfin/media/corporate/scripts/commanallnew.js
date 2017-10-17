var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
// Page type
var pageType = "NA";

var corporatePages = ["/", "/default.aspx",
    "/investor-relations/financial-results.aspx",
    "/investor-relations/annual-reports.aspx",
    "/investor-relations/shareholders-information.aspx",
    "/investor-relations/investor-presentation.aspx",
    "/investor-relations/quick-fact-sheet.aspx",
    "/investor-relations/stock-prices.aspx",
    "/investor-relations/unclaimed-dividend.aspx",
    "/investor-relations/miscellaneous.aspx"
];


if (corporatePages.indexOf(document.location.pathname) > -1) {
    pageType = "Corporate";
} else if (document.location.pathname.includes("business-loan-lead-form")) {
    pageType = "Lead Form"
} else if (document.location.pathname === "/finance/" || document.location.pathname === "/finance" || document.location.pathname === "/finance.apsx") {
    pageType = "Finance";
} else if (document.location.pathname === "/investment/" || document.location.pathname === "/investment" || document.location.pathname === "/investment.apsx") {
    pageType = "Investment";
} else if (document.location.pathname.includes("/finance/personal-loan/")) {
    pageType = "Personal Loan";
} else if (document.location.pathname.includes("/finance/business-loan/")) {
    pageType = "Business Loan";
} else if (document.location.pathname === "/finance/home-loan/home-and-loans.aspx") {
    pageType = "Homes and Loans";
} else if (document.location.pathname === "/finance/home-loan/apply-for-home-loan.aspx") {
    pageType = "HL Landing Page details";
} else if (document.location.pathname.includes("/finance/home-loan/")) {
    pageType = "Home Loan";
} else if (document.location.pathname.includes("/finance/emi-network/")) {
    pageType = "EMI Network";
} else if (document.location.pathname.includes("/finance/gold-loan/")) {
    pageType = "Gold Loan";
} else if (document.location.pathname.includes("/finance/loan-against-shares/")) {
    pageType = "Loan Against Shares";
} else if (document.location.pathname.includes("/finance/loan-against-fixed-deposit/")) {
    pageType = "Loan Against FD";
} else if (document.location.pathname.includes("/finance/loan-against-property/")) {
    pageType = "Loan Against Property";
} else if (document.location.pathname.includes("/finance/credit-cards/")) {
    pageType = "Credit Cards";
} else if (document.location.pathname === "/finance/offers-and-promotions.aspx" || document.location.pathname === "/finance/offers-and-promotions-view-all-products.aspx") {
    pageType = "Offers And Promotions";
} else if (document.location.pathname === "/finance/offers-and-promotions-description.aspx") {
    pageType = "Offer Details Page";
} else if (document.location.pathname === "/finance/apply-for-instant-approval.aspx") {
    pageType = "Apply For InstantApproval";
} else if (document.location.pathname === "/finance/customer-experience-team.aspx") {
    pageType = "ContactUs";
} else if (document.location.pathname === "/investment/fixed-deposit/fixed-deposit.aspx") {
    pageType = "Fixed Deposit";
} else if (document.location.pathname.includes("complaints.aspx")) {
    pageType = "Complaints";
} else if (document.location.pathname.includes("/finance/doctor-loan/")) {
    pageType = "Loan for Doctors";
} else if (document.location.pathname.includes("/finance/chartered-accountant-loan/")) {
    pageType = "Loan for CA";
} else if (document.location.pathname.includes("/finance/two-and-three-wheeler-finance/")) {
    pageType = "Two Wheeler Loan";
} else if (document.location.pathname.includes("/finance/asset-care/")) {
    pageType = "Asset Care";
} else if (document.location.pathname.includes("/finance/extended-warranty/")) {
    pageType = "Extended Warranty";
} else if (document.location.pathname === "/finance/insurance.aspx") {
    pageType = "Insurance";
} else if (document.location.pathname.includes("/finance/engineer-loan/")) {
    pageType = "Loan for Engineers";
} else if (document.location.pathname.includes("/finance/lease-rental-discounting/")) {
    pageType = "Lease Rental Discounting";
} else if (document.location.pathname.includes("/investment/mutual-funds/")) {
    pageType = "Mutual Funds";
} else if (document.location.pathname.includes("/finance/preapproved-loan-offers")) {
    pageType = "Preapproved Loan Offers";
} else if (document.location.pathname.includes("/investment")) {
    pageType = "Investment";
}
if (pageType == "NA") {
    var pageTypeSplits = document.location.pathname.split("/");
    if (pageTypeSplits.length > 0) {
        if (pageTypeSplits.length > 2) {
            pageType = pageTypeSplits[1] + " " + pageTypeSplits[2];
        } else if (pageTypeSplits.length > 1) {
            pageType = pageTypeSplits[0];
        }
    }
}

window.pcNameFrPopup = "";

// navigation Menu
var levelNumber = "0";

function subNavigationDL(a) {
    var ln = 0;
    var fullPathofMenu = [];
    var els = [];


    fullPathofMenu.push(a.innerText);

    while (a) {
        els.unshift(a);
        a = a.parentNode;
    }

    for (var i = els.length - 1; i >= 0; i--) {
        a = els[i];
        if (a.nodeName == "UL") {
            if (a.previousSibling.previousSibling.innerText != undefined) {
                fullPathofMenu.push(a.previousSibling.previousSibling.innerText);
            }

            if (a.className.includes("dropdown-menu")) {
                ln++;
            }
        }
    }

    var topMenu = document.getElementsByClassName("activesection");
    if (topMenu.length > 0) {
        fullPathofMenu.push(document.getElementsByClassName("activesection")[0].innerText);
    }

    combinedStr = "";
    for (var i = fullPathofMenu.length - 1; i >= 0; i--) {
        combinedStr += fullPathofMenu[i] + " | ";
    }

    fullPathofMenuStr = combinedStr.substring(0, combinedStr.length - 3);
    levelNumber = ln;

    if (levelNumber > 0) {
        if (isMobile) {
            if (fullPathofMenuStr.toLowerCase().includes("pay online") || fullPathofMenuStr.toLowerCase().includes("login")) {
                var lpEvent = (fullPathofMenuStr.toLowerCase().includes("login")) ? "login_click_allpages_5" : "pay_online_click_allpages_4";

                dataLayer.push({
                    'event': lpEvent,
                    'pageType': pageType.toLowerCase(),
                    'element': fullPathofMenuStr.toLowerCase()
                });
                return;
            }
        }
        dataLayer.push({
            'event': 'sub_navigation_menu_click_allpages_3',
            'pageType': pageType.toLowerCase(),
            'levelnumber': levelNumber,
            'element': fullPathofMenuStr.toLowerCase()
        });
    }
}

function topNavigationDL(a) {

    if (isMobile) {
        fullPathofMenuStr = a.innerText;
    } else {

        var fullPathofMenu = [];
        var els = [];

        fullPathofMenu.push(a.innerText);
        while (a) {
            els.unshift(a);
            a = a.parentNode;
            if (a.className.includes("top-nav")) {
                break;
            }
        }

        for (var i = els.length - 1; i >= 0; i--) {
            a = els[i];
            if (a.nodeName == "UL") {
                if (a.previousSibling.previousSibling.innerText != undefined) {
                    fullPathofMenu.push(a.previousSibling.previousSibling.innerText);
                }
            }
        }
        combinedStr = "";
        for (var i = fullPathofMenu.length - 1; i >= 0; i--) {
            combinedStr += fullPathofMenu[i] + " | ";
        }

        fullPathofMenuStr = combinedStr.substring(0, combinedStr.length - 3);
    }
    dataLayer.push({
        'event': 'top_navigation_menu_click_allpages_1',
        'pageType': pageType.toLowerCase(),
        'element': fullPathofMenuStr.toLowerCase()
    });
}

function mainNavigationDL(a) {
    var ln = 0;
    var fullPathofMenu = [];
    var els = [];

    if (a.className.includes("fa") || a.className.includes("ln") || a.className.includes("tw") || a.className.includes("yot")) {
        return;
    }

    fullPathofMenu.push(a.innerText);

    while (a) {
        els.unshift(a);
        a = a.parentNode;
    }

    for (var i = els.length - 1; i >= 0; i--) {
        a = els[i];

        if (a.nodeName == "UL") {
            if (isMobile) {
                var parNode = a.parentNode.className;
                if (parNode.includes("panel-body")) {
                    var title = a.parentNode.parentNode.parentNode.querySelectorAll(".panel-title");
                    if (title.length > 0) {
                        fullPathofMenu.push(title[0].innerText);
                        ln = ln + 2;
                    }
                }

                if (parNode.includes("accordion-toggle")) {
                    var title = a.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".panel-title");
                    if (title.length > 0) {
                        fullPathofMenu.push(title[0].innerText);
                        ln = ln + 2;
                    }
                }

                if (parNode.includes("item")) {
                    ln++;
                }
            } else {
                if (a.previousSibling.previousSibling.innerText != undefined && a.previousSibling.previousSibling.innerText != "" && a.previousSibling.previousSibling.innerText.toLowerCase() != "menu") {
                    fullPathofMenu.push(a.previousSibling.previousSibling.innerText);
                }

                if (a.className.includes("dropdown-menu")) {
                    ln++;
                }
            }
        }
    }

    if (isMobile) {
        var activeBn = document.querySelectorAll(".owl-item.synced");
        if (activeBn.length > 0) {
            fullPathofMenu.push(activeBn[0].innerText);
        }
    }

    var topMenu = document.getElementsByClassName("activesection");
    if (topMenu.length > 0) {
        fullPathofMenu.push(topMenu[0].innerText);
    }

    combinedStr = "";
    for (var i = fullPathofMenu.length - 1; i >= 0; i--) {
        combinedStr += fullPathofMenu[i] + " | ";
    }

    fullPathofMenuStr = combinedStr.substring(0, combinedStr.length - 3);
    levelNumber = ln;

    dataLayer.push({
        'event': 'menu_click_allpages_6',
        'pageType': pageType.toLowerCase(),
        'levelnumber': levelNumber,
        'element': fullPathofMenuStr.toLowerCase()
    });
}

function lpNavigationDL(a) {
    var fullPathofMenu = [];
    var els = [];

    fullPathofMenu.push(a.innerText);

    while (a) {
        els.unshift(a);
        a = a.parentNode;
    }

    for (var i = els.length - 1; i >= 0; i--) {
        a = els[i];
        if (a.nodeName == "UL") {
            if (a.previousSibling.previousSibling.innerText != undefined && a.previousSibling.previousSibling.innerText != "" && a.previousSibling.previousSibling.innerText.toLowerCase() != "menu") {
                fullPathofMenu.push(a.previousSibling.previousSibling.innerText);
            }
        }
    }

    var topMenu = document.getElementsByClassName("activesection");
    if (topMenu.length > 0) {
        fullPathofMenu.push(topMenu[0].innerText);
    }

    combinedStr = "";
    for (var i = fullPathofMenu.length - 1; i >= 0; i--) {
        combinedStr += fullPathofMenu[i] + " | ";
    }

    fullPathofMenuStr = combinedStr.substring(0, combinedStr.length - 3);

    var lpEvent = (fullPathofMenuStr.toLowerCase().includes("login")) ? "login_click_allpages_5" : "pay_online_click_allpages_4";

    dataLayer.push({
        'event': lpEvent,
        'pageType': pageType.toLowerCase(),
        'element': fullPathofMenuStr.toLowerCase()
    });
}

function footerNavigationDL(a) {

    var elementText = a.innerText;

    dataLayer.push({
        'event': 'footer_link_click_allpages_7',
        'pageType': pageType.toLowerCase(),
        'element': elementText.toLowerCase()
    });
}

function hpBannerDL(a) {
    var els = [];
    var bannerTitleElm = getSiblings(a, globalFilter);
    var bannerNumber = getBannerPos(a);
    var bannerText = "";
    if (bannerTitleElm.length > 0) {
        bannerText = bannerTitleElm[0].innerHTML;
    } else {
        var banc;
        if (a.parentNode.className.includes("carousel-caption")) {
            banc = a.parentNode.parentNode.querySelectorAll("h3");
        } else {
            banc = a.parentNode.querySelectorAll("h3");
        }
        if (banc.length > 0) {
            bannerText = banc[0].innerText;
        }
    }

    var elementText = a.innerText;
    if (elementText === "") elementText = "Banner Clicked";

    dataLayer.push({
        'event': 'banner_click_homepage_1',
        'pageType': pageType.toLowerCase(),
        'element': elementText.toLowerCase(),
        'bannernumber': bannerNumber,
        'activebannertext': bannerText.toLowerCase()
    });
}

function hpmBannerDL(a) {
    var els = [];
    var bannerText = "";
    var bannerNumber = 0;
    if (pageType.toLowerCase() == "investment" || pageType.toLowerCase() == "finance") {
        bannerText = a.closest(".col-xs-12");
        bannerNumber = getBannerPosM(bannerText);
        bannerText = bannerText.querySelectorAll("h3")[0].innerText;
    }

    if (pageType.toLowerCase() == "corporate") {
        bannerText = a.closest(".row");
        bannerNumber = getBannerPosM(bannerText);
        bannerText = bannerText.querySelectorAll("h4")[0].innerText;
    }

    var elementText = a.innerText;
    if (elementText === "") elementText = "Banner Clicked";

    dataLayer.push({
        'event': 'banner_click_homepage_1',
        'pageType': pageType.toLowerCase(),
        'element': elementText.toLowerCase(),
        'bannernumber': bannerNumber,
        'activebannertext': bannerText.toLowerCase()
    });
}

function getBannerPosM(a) {
    return getElementIndex(a);
}

function getBannerPos(a) {
    var i = 0;
    var child = "";
    var incrementby = 0;
    if (pageType === "Corporate" || pageType == "Investment") {
        child = a.closest(".carousel-inner");
        if (child === null) {
            child = a.closest(".right-side-box");
            incrementby = 2;
        }
    }
    if (pageType == "Finance") {
        child = a.closest(".banner-capation");
        if (child !== null) {
            child = child.parentNode;
        } else {
            child = a.closest(".owl-carousel");
            if (child !== null) {
                child = child.parentNode;
            } else {
                child = a.closest(".right-side-box");
                if (child !== null) {
                    child = child.parentNode;
                } else {

                    if (a.parentNode.className.includes("col-")) {
                        child = a.parentNode;
                    } else if (a.parentNode.className.includes("carousel-caption")) {
                        child = a.parentNode.parentNode;
                    }
                }
            }
        }
        incrementby = (getElementIndex(child.parentNode.parentNode.parentNode) === 1) ? 0 : 3;
    }

    i = getElementIndex(child) + incrementby;

    return i;
}

function productDL(a) {
    var productText = "";

    if (a.className.includes("pull")) return;
    if (a.className.includes("more btn") || a.className.includes("less")) {

        productText = a.innerText;
    } else {
        var product = a.parentNode.parentNode.querySelectorAll("h5");
        if (product.length > 0) {
            productText = product[0].innerText;
        }
    }

    window.pcNameFrPopup = productText;

    dataLayer.push({
        'event': 'our_products_grid_click_homepage_2',
        'pageType': pageType.toLowerCase(),
        'element': productText.toLowerCase()
    });

}

function blogDL(a) {
    var blog = a.closest(".owl-item");
    var blogTitle = "";
    var blogTitleStr = "";
    var publishDate = "";
    if (blog != null) {
        blogTitle = blog.querySelectorAll("h5");
        if (blogTitle.length > 0) {
            blogTitle = blogTitle[0].innerText.split(" ");
            for (var i = 0; i < blogTitle.length; i++) {
                blogTitleStr += blogTitle[i] + " ";
                if (i === 5) { break; }
            }

            blogTitleStr = blogTitleStr.substring(0, blogTitleStr.length - 1);
            blogTitleStr += "...";

            var activeBlogSection = document.querySelectorAll(".blogPost .active");

            if (activeBlogSection.length > 0) {
                blogTitleStr = activeBlogSection[0].innerText + " | " + blogTitleStr;
            }
        }
        publishDate = blog.querySelectorAll("div.dateVal > label");
        if (publishDate.length > 0) {
            publishDate = publishDate[0].innerText;
        }
    }

    dataLayer.push({
        'event': 'our_blog_click_homepage_3',
        'pageType': pageType.toLowerCase(),
        'element': blogTitleStr.toLowerCase(),
        'publishDate': publishDate.toLowerCase()
    });
}

function blogNavigationDL(a) {
    if (!a.className.includes("disabled")) {
        var direction = a.className.includes("owl-prev") ? "Left" : "Right";

        var activeBlogSection = document.querySelectorAll(".blogPost .active");

        if (activeBlogSection.length > 0) {
            direction = activeBlogSection[0].innerText + " | " + direction;
        }
        dataLayer.push({
            'event': 'our_blog_click_homepage_3',
            'pageType': pageType.toLowerCase(),
            'element': direction.toLowerCase()
        });
    }
}

function pcatNavigationDL(a) {
    if (!a.className.toLowerCase().includes("dropdown-toggle")) {
        var fullPathofMenu = [];
        var fullPathofMenuStr = "";
        var els = [];

        fullPathofMenu.push(a.innerText);
        TVCsetCookie("tvc_product_cat", a.innerText, "bajajfinserv.in");
        var city = document.querySelectorAll("div.citydrop button > span");
        if (city.length > 0) {
            city = city[0].innerText;
        }

        while (a) {
            els.unshift(a);
            a = a.parentNode;
        }

        for (var i = els.length - 1; i >= 0; i--) {
            a = els[i];
            if (a.nodeName == "UL") {
                if (a.previousSibling.previousSibling.innerText != undefined && a.previousSibling.previousSibling.innerText != "") {
                    fullPathofMenu.push(a.previousSibling.previousSibling.innerText);

                }
            }
        }


        var topMenu = document.getElementsByClassName("activesection");
        if (topMenu.length > 0) {
            fullPathofMenu.push(document.getElementsByClassName("activesection")[0].innerText);
        }

        combinedStr = "";
        for (var i = fullPathofMenu.length - 1; i >= 0; i--) {
            combinedStr += fullPathofMenu[i] + " | ";
        }

        fullPathofMenuStr = combinedStr.substring(0, combinedStr.length - 3);

        dataLayer.push({
            'event': 'product_category_navigation_click_OffersAndPromotions_2',
            'pageType': pageType.toLowerCase(),
            'element': fullPathofMenuStr.toLowerCase(),
            'city': city.toLowerCase()
        });
    }

}

function vsClickDL(a) {
    var elementTextStr = a.innerText;
    var productCat = TVCgetCookie("tvc_product_cat");
    var city = document.querySelectorAll("div.citydrop button > span");
    if (city.length > 0) {
        city = city[0].innerText;
    }

    dataLayer.push({
        'event': 'view_stores_click_OfferDetailsPage_2',
        'pageType': pageType.toLowerCase(),
        'element': elementTextStr.toLowerCase(),
        'productcategory': productCat.toLowerCase(),
        'city': city.toLowerCase()
    });
}

function aiaClickDL(a) {
    var elementTextStr = a.innerText;
    var productCat = TVCgetCookie("tvc_product_cat");
    var city = document.querySelectorAll("div.citydrop button > span");
    if (city.length > 0) {
        city = city[0].innerText;
    }
    var productName = document.querySelectorAll("div.productDetail > h1");

    if (productName.length > 0) {
        productName = productName[0].innerText;
    } else {
        var productName = document.querySelectorAll("div.productDetail > h2");
        if (productName.length > 0) {
            productName = productName[0].innerText;
        }
    }

    dataLayer.push({
        'event': 'apply_for_instant_approval_click_OfferDetailsPage_3',
        'pageType': pageType.toLowerCase(),
        'element': elementTextStr.toLowerCase(),
        'productcategory': productCat.toLowerCase(),
        'city': city.toLowerCase(),
        'productname': productName.toLowerCase()
    });
}


function getCCType() {
    var cardNameEls = document.querySelectorAll("div.top-slider div.change");
    for (var i = 0; i < cardNameEls.length; i++) {
        if (cardNameEls[i].style.display !== "none") {
            cardName = cardNameEls[i].getElementsByTagName("h2");
            if (cardName.length > 0) {
                return cardName[0].innerText;
            }
        }
    }
    return "";
}

function applyBtnCCDL(a, flag) {
    var cardName = getCCType();

    var eventName = "card_cta_apply_now_Credit_Card_4";
    eventName = (flag === true) ? "card_cta_apply_now_Credit_Card_4" : "card_cta_know_more_Credit_Card_5";

    dataLayer.push({
        'event': eventName.toLowerCase(),
        'pageType': pageType.toLowerCase(),
        'cardName': cardName.toLowerCase()
    });
}

function quickLinkCCDL(a) {
    var clickText = a.innerText;

    dataLayer.push({
        'event': 'card_quick_links_click_Credit_Card_8',
        'pageType': pageType.toLowerCase(),
        'clickText': clickText.toLowerCase()
    });
}

function benefitContentCCDL(a) {
    var cardName = getCCType();

    dataLayer.push({
        'event': 'card_benefit_content_click_Credit_Card_7',
        'pageType': pageType.toLowerCase(),
        'cardName': cardName.toLowerCase()
    });
}


function getElementIndex(node) {
    var prop = document.body.previousElementSibling ? 'previousElementSibling' : 'previousSibling';
    var i = 1;
    while (node = node[prop]) {++i }
    return i;
}

function getSiblings(el, filter) {
    var siblings = [];
    el = el.parentNode.firstChild;
    do { if (!filter || filter(el)) siblings.push(el); } while (el = el.nextSibling);
    return siblings;
}

// example filter function
function globalFilter(el) {
    return el.nodeName.toLowerCase() == "h3";
}

function getBreadCrum() {
    var breadcrumbStr = "";
    var breadcrumb = document.querySelectorAll(".breadcrumb li");
    for (var i = 0; i < breadcrumb.length; i++) {
        breadcrumbStr += breadcrumb[i].innerText + " | ";
    }
    return breadcrumbStr;
}

function getCCPrefCheck() {
    var checkboxes = document.querySelectorAll(".preferences-outer input");
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i]);
        }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

function getCCRange() {
    var rangeInputs = document.querySelectorAll(".calculator-outer input");
    var movedRanges = [];
    for (var i = 0; i < rangeInputs.length; i++) {
        // And stick the checked ones onto an array...
        if (rangeInputs[i].value > 0) {
            movedRanges.push(rangeInputs[i]);
        }
    }
    return movedRanges.length > 0 ? movedRanges : null;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var TVCsetCookie = function(cname, cvalue, domain, duration) {
    var d = new Date();
    var expires = '',
        calc_duration = 0,
        set_domain;
    if (duration) {
        if (duration.minutes) {
            calc_duration = duration.minutes * 60 * 1000;
        } else if (duration.hours) {
            calc_duration = duration.hours * 60 * 60 * 1000;
        } else if (duration.days) {
            calc_duration = duration.days * 24 * 60 * 60 * 1000;
        } else if (duration.weeks) {
            calc_duration = duration.weeks * 7 * 24 * 60 * 60 * 1000;
        } else if (duration.months) {
            calc_duration = duration.months * 30 * 24 * 60 * 60 * 1000;
        } else if (duration.years) {
            calc_duration = duration.years * 365 * 24 * 60 * 60 * 1000;
        }
        d.setTime(d.getTime() + calc_duration);
        expires = "expires=" + d.toUTCString() + ';';
    }
    set_domain = domain ? domain : '.' + document.domain.replace('www.', '');
    document.cookie = cname + "=" + cvalue + ";" + expires + "domain=" + set_domain + ";path=/";
};
var TVCgetCookie = function(cname) {
    var result;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(cname) + '=([^;]*)').exec(document.cookie)) ? decodeURIComponent(result[1]) : null;
};

function bindOnPDLs() {

    var onpProductClick = document.querySelectorAll("div.dealContainer div.owl-wrapper-outer div.dealImg a");
    if (onpProductClick.length > 0) {
        for (var i = 0; i < onpProductClick.length; i++) {
            onpProductClick[i].onclick = function() {

                var productCat = this.closest("div.row");
                if (productCat) {
                    productCat = productCat.parentNode.parentNode.querySelectorAll("h2");
                    if (productCat.length > 0) {
                        productCat = productCat[0].innerText;
                    }
                }
                var city = document.querySelectorAll("div.citydrop button > span");
                if (city.length > 0) {
                    city = city[0].innerText;
                }

                var elementText = "";
                var prName = this.parentNode.parentNode.querySelectorAll(".name");
                if (prName.length > 0) {
                    elementText += prName[0].innerText + " | ";
                }

                if (elementText === "") {} {
                    elementText += productCat + " | ";
                }

                elementText += getParameterByName("ID", this.href);

                var productCatToStore = "";
                if (productCat.toLowerCase().includes("special")) {
                    productCatToStore = productCat;
                } else {
                    productCatToStore = productCat.toLowerCase().split(" offers")[0];
                }

                TVCsetCookie("tvc_product_cat", productCatToStore, "bajajfinserv.in");

                dataLayer.push({
                    'event': 'offers_grid_click_OffersAndPromotions_1',
                    'pageType': pageType.toLowerCase(),
                    'element': elementText.toLowerCase(),
                    'productcategory': productCat.toLowerCase(),
                    'city': city.toLowerCase()
                });
                return true;
            }
        }
    }


    var onpProductClick = document.querySelectorAll("div.owl-wrapper-outer div.offerimgdiv a");
    if (onpProductClick.length > 0) {
        for (var i = 0; i < onpProductClick.length; i++) {
            onpProductClick[i].onclick = function() {

                var productCat = this.closest("div.row");
                if (productCat) {
                    productCat = productCat.parentNode.parentNode.querySelectorAll("h2");
                    if (productCat.length > 0) {
                        productCat = productCat[0].innerText;
                    }
                }
                var city = document.querySelectorAll("div.citydrop button > span");
                if (city.length > 0) {
                    city = city[0].innerText;
                }

                var elementText = "";
                var prName = this.parentNode.parentNode.querySelectorAll(".name");
                if (prName.length > 0) {
                    elementText += prName[0].innerText + " | ";
                }
                elementText += getParameterByName("ID", this.href);

                var productCatToStore = "";
                if (productCat.toLowerCase().includes("special")) {
                    productCatToStore = productCat;
                } else {
                    productCatToStore = productCat.toLowerCase().split(" offers")[0];
                }

                TVCsetCookie("tvc_product_cat", productCatToStore, "bajajfinserv.in");

                dataLayer.push({
                    'event': 'offers_grid_click_OffersAndPromotions_1',
                    'pageType': pageType.toLowerCase(),
                    'element': elementText.toLowerCase(),
                    'productcategory': productCat.toLowerCase(),
                    'city': city.toLowerCase()
                });
                return true;
            }
        }
    }

    var viewMoreProdcutClick = document.querySelectorAll(".btn.viewAll.posAbs");
    if (viewMoreProdcutClick.length > 0) {
        for (var i = 0; i < viewMoreProdcutClick.length; i++) {
            viewMoreProdcutClick[i].onclick = function() {

                var productCat = this.previousElementSibling;
                if (productCat) {
                    productCat = productCat.innerText;

                }
                var city = document.querySelectorAll("div.citydrop button > span");
                if (city.length > 0) {
                    city = city[0].innerText;
                }

                var elementText = this.innerText;

                var productCatToStore = "";
                if (productCat.toLowerCase().includes("special")) {
                    productCatToStore = productCat;
                } else {
                    productCatToStore = productCat.toLowerCase().split(" offers")[0];
                }

                TVCsetCookie("tvc_product_cat", productCatToStore, "bajajfinserv.in");

                dataLayer.push({
                    'event': 'offers_grid_click_OffersAndPromotions_1',
                    'pageType': pageType.toLowerCase(),
                    'element': elementText.toLowerCase(),
                    'productcategory': productCat.toLowerCase(),
                    'city': city.toLowerCase()
                });
                return true;
            }
        }
    }
}


function bindLinkElements(selector, actionFunction) {
    var elem = document.querySelectorAll(selector);

    if (elem.length > 0) {
        var i = 0;
        for (i = 0; i < elem.length; i++) {
            elem[i].onclick = function() {
                actionFunction(this);
                return true;
            };
        }
    }
}


(function() {
    try {
        setTimeout(function() {
            var topMenus = document.querySelectorAll("ul.top-nav a");
            for (var i = 0; i < topMenus.length; i++) {
                if (!topMenus[i].href.includes("javascript")) {
                    topMenus[i].onclick = function() { topNavigationDL(this); return true; }
                }
            }

            var listofmenu = document.querySelectorAll("ul.nav.nav-centre.navbar-nav a");
            for (var i = 0; i < listofmenu.length; i++) {
                if ((!listofmenu[i].href.includes("javascript") && !listofmenu[i].href === undefined) || listofmenu[i].href.includes("http") || listofmenu[i].href.includes("asp")) {
                    listofmenu[i].onclick = function() {
                        subNavigationDL(this);
                        return true;
                    }
                }
            }

            var mainMenu = document.querySelectorAll("li.dropdown.hamb-nav.hidden-xs ul a");
            for (var i = 0; i < mainMenu.length; i++) {
                if (!mainMenu[i].href.includes("javascript")) {
                    mainMenu[i].onclick = function() { mainNavigationDL(this); return true; }
                }
            }

            var loginPayOnline = document.querySelectorAll("#nav-short a");
            for (var i = 0; i < loginPayOnline.length; i++) {
                if (!loginPayOnline[i].href.includes("javascript") && !loginPayOnline[i].href.includes("#")) {
                    loginPayOnline[i].onclick = function() { lpNavigationDL(this); return true; }
                }
            }

            var footerLinks = document.querySelectorAll("#footer-nav ul li a");
            for (var i = 0; i < footerLinks.length; i++) {
                footerLinks[i].onclick = function() { footerNavigationDL(this); return true; }
            }


            // Corporate homepage
            if (pageType == "Corporate" || pageType == "Investment") {

                if (isMobile) {
                    var hpmCarousel = document.querySelectorAll('#mob-tabs-wrap div a');
                    for (var i = 0; i < hpmCarousel.length; i++) {
                        if (hpmCarousel[i].href.includes("http")) {
                            // banner_click_homepage_1
                            hpmCarousel[i].onclick = function() { hpmBannerDL(this); return true; }
                        }
                    }


                    var invmCarousel = document.querySelectorAll('section.visible-xs.visible-sm a');
                    for (var i = 0; i < invmCarousel.length; i++) {
                        if (invmCarousel[i].href.includes("http")) {
                            // banner_click_homepage_1
                            invmCarousel[i].onclick = function() { hpmBannerDL(this); return true; }
                        }
                    }
                } else {
                    var hpCarousel = document.querySelectorAll("#home-Carousel .carousel-inner a");
                    for (var i = 0; i < hpCarousel.length; i++) {
                        if (hpCarousel[i].href.includes("http")) {
                            // banner_click_homepage_1
                            hpCarousel[i].onclick = function() { hpBannerDL(this); return true; }
                        }
                    }

                    var hpSideBanner = document.querySelectorAll("#home-slider-wrap .right-side-box a");
                    for (var i = 0; i < hpSideBanner.length; i++) {
                        if (hpSideBanner[i].href.includes("http")) {
                            // banner_click_homepage_1
                            hpSideBanner[i].onclick = function() { hpBannerDL(this); return true; }
                        }
                    }
                }
            }
            // Fin homepage
            if (pageType == "Finance") {
                var invmCarousel = document.querySelectorAll('section.visible-xs.visible-sm a');
                for (var i = 0; i < invmCarousel.length; i++) {
                    if (invmCarousel[i].href.includes("http")) {
                        // banner_click_homepage_1
                        invmCarousel[i].onclick = function() { hpmBannerDL(this); return true; }
                    }
                }
                var hpCarousel = document.querySelectorAll("#home-Carousel a");
                for (var i = 0; i < hpCarousel.length; i++) {
                    if (hpCarousel[i].href.includes("http")) {
                        // banner_click_homepage_1
                        hpCarousel[i].onclick = function() { hpBannerDL(this); return true; }
                    }
                }
            }

            if (pageType == "Corporate" || pageType == "Finance") {
                var products = document.querySelectorAll("#our-product a");
                for (var i = 0; i < products.length; i++) {
                    products[i].onclick = function() { productDL(this); return true; }
                }

                var products = document.querySelectorAll("#show-product a");
                for (var i = 0; i < products.length; i++) {
                    products[i].onclick = function() { productDL(this); return true; }
                }

                var showMore = document.querySelectorAll("#our-product");
                if (showMore.length > 0) {
                    showMore = showMore[0].nextElementSibling.querySelectorAll("a");
                    if (showMore.length > 0) {
                        showMore[0].onclick = function() { productDL(this); return true; }
                    };
                };

            }

            if (pageType == "Investment") {
                var products = document.querySelectorAll("#productCarousel a");
                for (var i = 0; i < products.length; i++) {
                    products[i].onclick = function() { productDL(this); return true; }
                }
            }

            var productSubmitButtons = document.querySelectorAll("div.modal-body form > a.prodSubmit");
            if (productSubmitButtons.length > 0) {
                for (var i = 0; i < productSubmitButtons.length; i++) {
                    productSubmitButtons[i].onclick = function() {
                        var elementText = "";
                        if (window.pcNameFrPopup != "") {
                            elementText = window.pcNameFrPopup + " | ";
                        }

                        var optRadio = this.parentNode.querySelectorAll("input");
                        for (var j = 0; j < optRadio.length; j++) {
                            if (optRadio[j] != undefined) {
                                if (optRadio[j].checked) {
                                    elementText += optRadio[j].parentNode.innerText;
                                }
                            }
                        }
                        dataLayer.push({
                            'event': 'our_products_popup_submit_homepage_4',
                            'pageType': pageType.toLowerCase(),
                            'element': elementText.toLowerCase()
                        });
                        return true;
                    }
                }
            }

            var blogInterval = setInterval(function() {
                if (document.readyState === 'complete') {
                    clearInterval(blogInterval);
                }
                var blogEles = document.querySelectorAll("#blogCarousalWrap a");
                if (blogEles.length > 0) {
                    clearInterval(blogInterval);
                    var blogCar = document.querySelectorAll("#blogCarousalWrap a");
                    for (var i = 0; i < blogCar.length; i++) {
                        if (!blogCar[i].href.includes("javascript")) {
                            blogCar[i].onclick = function() { blogDL(this); return true; }
                        }
                    }

                    var blogNavPrev = document.querySelectorAll("#blogCarousalWrap .owl-controls .owl-prev");

                    for (var i = 0; i < blogNavPrev.length; i++) {
                        blogNavPrev[i].onclick = function() { blogNavigationDL(this); return true; }
                    }

                    var blogNavNext = document.querySelectorAll("#blogCarousalWrap .owl-controls .owl-next");
                    for (var i = 0; i < blogNavNext.length; i++) {
                        blogNavNext[i].onclick = function() { blogNavigationDL(this); return true; }
                    }
                }
            }, 2000);

            // Product Page
            var submitButtonProduct = document.getElementById("Submit");
            if (submitButtonProduct) {
                submitButtonProduct.addEventListener("click", function() {
                    var errArr = document.querySelectorAll(".errorTip");
                    var flag = false;
                    for (var i = 0; i < errArr.length; i++) {
                        if (errArr[i].innerText.toLowerCase().includes("enter your valid pan")) { continue; }
                        if (errArr[i].style.display !== "none") {
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        dataLayer.push({
                            'event': 'banner_lead_submit_productpage_1',
                            'pageType': pageType.toLowerCase()
                        });
                    }
                });
            }

            var sidebarProduct = document.querySelectorAll(".sidebar-nav li a, #accordion div.panel-heading > a");
            if (sidebarProduct.length > 0) {
                for (var i = 0; i < sidebarProduct.length; i++) {

                    sidebarProduct[i].onclick = function() {
                        var elementTextStr = "";
                        elementTextStr += getBreadCrum() + this.innerText;

                        dataLayer.push({
                            'event': 'left_sidebar_click_productpage_2',
                            'pageType': pageType.toLowerCase(),
                            'element': elementTextStr.toLowerCase()
                        });

                        return true;
                    }
                }
            }

            var rightSidebarProduct = document.querySelectorAll("div.sidebar-quick-link a");
            if (rightSidebarProduct.length > 0) {
                for (var i = 0; i < rightSidebarProduct.length; i++) {

                    rightSidebarProduct[i].onclick = function() {
                        var elementTextStr = "";
                        elementTextStr += getBreadCrum() + this.innerText;

                        dataLayer.push({
                            'event': 'right_sidebar_click_productpage_3',
                            'pageType': pageType.toLowerCase(),
                            'element': elementTextStr.toLowerCase()
                        });

                        return true;
                    }
                }
            }

            var productDetailsButton = document.querySelectorAll("#tab_1 a, #collapseOne a");
            if (productDetailsButton.length > 0) {
                for (var i = 0; i < productDetailsButton.length; i++) {

                    productDetailsButton[i].onclick = function() {
                        var elementTextStr = "";
                        elementTextStr += getBreadCrum() + this.innerText;

                        dataLayer.push({
                            'event': 'product_details_click_productpage_4',
                            'pageType': pageType.toLowerCase(),
                            'element': elementTextStr.toLowerCase()
                        });

                        return true;
                    }
                }
            }

            var applyNowButtonProduct = document.querySelectorAll("#image-Carousel div.apply-btn > a");
            if (applyNowButtonProduct.length > 0) {
                for (var i = 0; i < applyNowButtonProduct.length; i++) {
                    applyNowButtonProduct[i].onclick = function() {

                        var elementTextStr = "";
                        elementTextStr += getBreadCrum() + this.innerText;

                        dataLayer.push({
                            'event': 'banner_click_productpage_5',
                            'pageType': pageType.toLowerCase(),
                            'element': elementTextStr.toLowerCase()
                        });
                        return true;
                    }
                }
            }

            var applyNowButtonProduct = document.querySelectorAll("#sectionA > ul > li > a, div.apply-btn-device.visible-xs-block.hidden-lg > a, #Gettheoffer");
            if (applyNowButtonProduct.length > 0) {
                for (var i = 0; i < applyNowButtonProduct.length; i++) {
                    applyNowButtonProduct[i].onclick = function() {

                        var elementTextStr = "";
                        elementTextStr += getBreadCrum() + this.innerText;

                        dataLayer.push({
                            'event': 'banner_click_productpage_5',
                            'pageType': pageType.toLowerCase(),
                            'element': elementTextStr.toLowerCase()
                        });
                        return true;
                    }
                }
            }

            // HL Landing Page
            var hlctaButton = document.querySelectorAll("#container div.toBegain > a, #mainContainer .btnContainer > a");
            if (hlctaButton.length > 0) {
                for (var i = 0; i < hlctaButton.length; i++) {
                    hlctaButton[i].onclick = function() {

                        var elementTextStr = "";
                        elementTextStr += this.childNodes[0].nextElementSibling.alt;
                        elementTextStr = elementTextStr.replace(/-/g, " ");

                        dataLayer.push({
                            'event': 'click_to_action_click_HL_LandingPagedetails_1',
                            'pageType': pageType.toLowerCase(),
                            'element': elementTextStr.toLowerCase()
                        });
                        return true;
                    }
                }
            }

            var hlpdButton = document.querySelectorAll("#container div.borderTop a");
            if (hlpdButton.length > 0) {
                for (var i = 0; i < hlpdButton.length; i++) {
                    hlpdButton[i].onclick = function() {

                        var elementTextStr = "";
                        elementTextStr += this.innerText;

                        dataLayer.push({
                            'event': 'product_details_click_HL_LandingPagedetails_2',
                            'pageType': pageType.toLowerCase(),
                            'element': elementTextStr.toLowerCase()
                        });

                        return true;
                    }
                }
            }

            var hlpdCtaButton = document.querySelectorAll("div.PopDetails a");
            if (hlpdCtaButton.length > 0) {
                for (var i = 0; i < hlpdCtaButton.length; i++) {
                    hlpdCtaButton[i].onclick = function() {

                        var elementTextStr = "";
                        elementTextStr += this.childNodes[0].nextElementSibling.alt;
                        elementTextStr = elementTextStr.replace(/-/g, " ");

                        dataLayer.push({
                            'event': 'product_details_cta_click_HL_LandingPagedetails_3',
                            'pageType': pageType.toLowerCase(),
                            'element': elementTextStr.toLowerCase()
                        });
                        return true;
                    }
                }
            }

            var voEmiButton = document.querySelectorAll("div.offerBtn a");
            if (voEmiButton.length > 0) {
                for (var i = 0; i < voEmiButton.length; i++) {
                    voEmiButton[i].onclick = function() {
                        var emicat = this.parentNode.parentNode.parentNode.querySelectorAll("h3");
                        if (emicat.length > 0) {
                            emicat = emicat[0].innerText;
                        }

                        dataLayer.push({
                            'event': 'view_offers_click_eminetwork_1',
                            'pageType': pageType.toLowerCase(),
                            'productcategory': emicat.toLowerCase()
                        });
                        return true;
                    }
                }
            }

            if (pageType === "Offers And Promotions") {
                intOapProductGrid = setInterval(function() {
                    var onpProductClick = document.querySelectorAll("div.dealContainer div.owl-wrapper-outer div.dealImg a");
                    if (onpProductClick.length > 0) {
                        clearInterval(intOapProductGrid);
                        bindOnPDLs();
                    }
                }, 2000);
                oapInterval = setInterval(function() {
                    var cityOffers = document.querySelectorAll("div.navbar-form.navbar-left.citydrop div.btn-group.bootstrap-select.form-control > div > ul > li > a");

                    if (cityOffers.length > 0) {
                        clearInterval(oapInterval);
                        for (var i = 0; i < cityOffers.length; i++) {
                            cityOffers[i].onclick = function() {
                                setTimeout(function() {
                                    oapProductGrid = setInterval(function() {
                                        var onpProductClick = document.querySelectorAll("div.dealContainer div.owl-wrapper-outer div.dealImg a");
                                        if (onpProductClick.length > 0) {
                                            clearInterval(oapProductGrid);
                                            bindOnPDLs();
                                        }
                                    }, 2000);
                                }, 5000);

                                return true;
                            }
                        }
                    }
                }, 2000);

                var pcatNavigation = document.querySelectorAll("#mySidenav  a");
                if (pcatNavigation.length > 0) {
                    for (var i = 0; i < pcatNavigation.length; i++) {
                        pcatNavigation[i].onclick = function() {
                            pcatNavigationDL(this);
                            return true;
                        }
                    }
                }

            }



            var vsClick = document.getElementById("btnstorelocator");
            if (vsClick) {
                vsClick.onclick = function() {
                    vsClickDL(this);
                    return true;
                }
            }

            var slClick = document.querySelectorAll("div.offer-righttop a");
            if (slClick.length > 0) {
                slClick[0].onclick = function() {
                    vsClickDL(this);
                    return true;
                }
            }

            var slClick = document.querySelectorAll("div.oap-righttop a");
            if (slClick.length > 0) {
                slClick[0].onclick = function() {
                    vsClickDL(this);
                    return true;
                }
            }

            var aiaClick = document.getElementById("btn_Instant_Approv");
            if (aiaClick) {
                aiaClick.onclick = function() {
                    aiaClickDL(this);
                    return true;
                }
            }
            var lsClick = document.querySelectorAll("#myspan > div.scheme-righttop > p > a, #myspan div.devider.clearfix.navbar-right.visible-xs a");
            if (lsClick.length > 0) {
                lsClick[0].onclick = function() {
                    vsClickDL(this);
                    return true;
                }
            }


            if (pageType === "Offer Details Page") {
                oapDetailInterval = setInterval(function() {
                    var cityOffers = document.querySelectorAll("div.navbar-form.navbar-left.citydrop div.btn-group.bootstrap-select.form-control > div > ul > li > a");
                    if (cityOffers.length > 0) {
                        clearInterval(oapDetailInterval);
                        for (var i = 0; i < cityOffers.length; i++) {
                            cityOffers[i].onclick = function() {
                                setTimeout(function() {
                                    var vsClick = document.getElementById("btnstorelocator");
                                    if (vsClick) {
                                        vsClick.onclick = function() {
                                            vsClickDL(this);
                                            return true;
                                        }
                                    }

                                    var slClick = document.querySelectorAll("div.offer-righttop a");
                                    if (slClick.length > 0) {
                                        slClick[0].onclick = function() {
                                            vsClickDL(this);
                                            return true;
                                        }
                                    }

                                    var slClick = document.querySelectorAll("div.oap-righttop a");
                                    if (slClick.length > 0) {
                                        slClick[0].onclick = function() {
                                            vsClickDL(this);
                                            return true;
                                        }
                                    }

                                    var aiaClick = document.getElementById("btn_Instant_Approv");
                                    if (aiaClick) {
                                        aiaClick.onclick = function() {
                                            aiaClickDL(this);
                                            return true;
                                        }
                                    }
                                    var lsClick = document.querySelectorAll("#myspan > div.scheme-righttop > p > a");
                                    if (lsClick.length > 0) {
                                        lsClick[0].onclick = function() {
                                            vsClickDL(this);
                                            return true;
                                        }
                                    }
                                }, 3000);
                                return true;
                            }
                        }
                    }
                }, 2000);
            }


            //CC pages
            if (pageType === "Credit Cards") {
                var ccQuickLinks = document.querySelectorAll(".quick-link .quick-menu a, #mySidenav a");
                if (ccQuickLinks.length > 0) {
                    for (var i = 0; i < ccQuickLinks.length; i++) {
                        if (ccQuickLinks[i].href != undefined) {
                            if (!ccQuickLinks[i].href.includes("javascript")) {
                                ccQuickLinks[i].onclick = function() {
                                    dataLayer.push({
                                        'event': 'quick_menu_click_Credit_Card_1',
                                        'pageType': pageType.toLowerCase(),
                                        'clickText': this.innerText.toLowerCase()
                                    });
                                    return true;
                                }
                            }
                        }
                    }

                }
            }


            var psccButton = document.querySelectorAll("div.preferences-outer > button");
            if (psccButton.length > 0) {
                for (var i = 0; i < psccButton.length; i++) {
                    psccButton[i].onclick = function() {
                        var checkBoxText = "";
                        var checkboxes = getCCPrefCheck();

                        if (checkboxes !== null) {
                            for (var i = 0; i < checkboxes.length; i++) {
                                var chkname = checkboxes[i].parentNode.parentNode.parentNode.querySelectorAll("h3");
                                if (chkname.length > 0) {
                                    checkBoxText += chkname[0].innerText + " | ";
                                }
                            }
                            checkBoxText = checkBoxText.substring(0, checkBoxText.length - 3);
                        }

                        dataLayer.push({
                            'event': 'preference_selection_Credit_Card_2',
                            'pageType': pageType.toLowerCase(),
                            'checkBoxText': checkBoxText.toLowerCase()
                        });
                        return true;
                    }
                }

            }

            var showResultClickCC = document.querySelectorAll(".calculator-outer button.first");
            if (showResultClickCC.length > 0) {
                for (var i = 0; i < showResultClickCC.length; i++) {
                    showResultClickCC[i].onclick = function() {
                        var rangeText = "";
                        var rangeInputs = getCCRange();

                        if (rangeInputs !== null) {
                            for (var i = 0; i < rangeInputs.length; i++) {
                                var rangename = rangeInputs[i].parentNode.previousElementSibling.querySelectorAll("h3");
                                if (rangename.length > 0) {
                                    rangeText += rangename[0].innerText + " | ";
                                }
                            }
                            rangeText = rangeText.substring(0, rangeText.length - 3);
                        }

                        dataLayer.push({
                            'event': 'show_result_click_Credit_Card_3',
                            'pageType': pageType,
                            'sliderText': rangeText.toLowerCase()
                        });
                        return true;
                    }
                }

            }

            var ankButton = document.querySelectorAll("#cascade-slider div.card-btns a");
            if (ankButton.length > 0) {
                for (var i = 0; i < ankButton.length; i++) {
                    ankButton[i].onclick = function() {


                        if (this.innerText.toLowerCase().includes("apply")) {
                            applyBtnCCDL(this, true);
                        } else {
                            applyBtnCCDL(this, false);
                        }

                        return true;
                    }
                }
            }

            var quickLinkCC = document.querySelectorAll(".fee-outer  a, .feeboxs a");
            if (quickLinkCC.length > 0) {
                for (var i = 0; i < quickLinkCC.length; i++) {
                    quickLinkCC[i].onclick = function() {
                        quickLinkCCDL(this);
                        return true;
                    }
                }
            }

            var benefitContentCC = document.querySelectorAll(".benefits-boxs a");
            if (benefitContentCC.length > 0) {
                for (var i = 0; i < benefitContentCC.length; i++) {
                    benefitContentCC[i].onclick = function() {
                        benefitContentCCDL(this);
                        return true;
                    }
                }
            }

            if (pageType === "Lead Form") {
                var rightLinks = document.querySelectorAll(".rightLinksBody a");
                if (rightLinks.length > 0) {
                    for (var i = 0; i < rightLinks.length; i++) {
                        rightLinks[i].onclick = function() {
                            var elementText = this.innerText;

                            dataLayer.push({
                                'event': 'right_sidebar_click_Loan_LeadForm_2',
                                'pageType': pageType.toLowerCase(),
                                'clickText': elementText.toLowerCase()
                            });
                        }
                    }
                }

                var submitButtonBL = document.querySelectorAll(".blSubmitBtn.formBtn");
                if (submitButtonBL.length > 0) {
                    submitButtonBL[0].addEventListener("click", function() {
                        var loanName = "";
                        if (document.location.pathname.includes("/finance/business-loan/")) {
                            loanName = "Business Loan";
                        }

                        dataLayer.push({
                            'event': 'lead_form_submit_Loan_LeadForm_1',
                            'pageType': pageType.toLowerCase(),
                            'loanName': loanName.toLowerCase()
                        });

                    });
                }
            }

            if (isMobile) {
                var topMenus = document.querySelectorAll("#mobile-hamb-nav .nav a");
                for (var i = 0; i < topMenus.length; i++) {
                    if (!topMenus[i].href.includes("javascript")) {
                        topMenus[i].onclick = function() { topNavigationDL(this); return true; }
                    }
                }

                var mainMenu = document.querySelectorAll(".dropdown-menu #mobile-hamb-nav .tab-content #sync4 a, #hambDropDown .dropdown-menu .tab-content #sync1 a, .dropdown-menu #mobile-hamb-nav .tab-content #sync5 a");
                for (var i = 0; i < mainMenu.length; i++) {
                    if (!mainMenu[i].href.includes("javascript") && !mainMenu[i].className.includes("panel-title")) {
                        mainMenu[i].onclick = function() { mainNavigationDL(this); return true; }
                    }
                }
            }

        }, 1500);
    } catch (err) {
        console.log(err.message);
    }
})();
