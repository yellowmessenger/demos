BRANDSETTINGS = {
    expandNavigation: true, // should be set per page
    tabNavigation: true, // should be set per page
    formChangeValidation: true, // should only be set on recipe search page - will run the form no change validation on a page
    hasSortByFilter: true, // should only be set on pages that have a sort by
    hasFAQ: true,
    autoRotate: true,
    rotationTime: 7000,
    /* 
      Available carousel types:
      'background-layer' - will absolutely position the image under the carousel image copy text. Essentiallly, acting as a background image.
    */
    carouselType: 'background-layer',
    indicatorWidth: '119', // pixel value for slide-style indicator width
    indicatorDisplayMax: 4, // required for indicatorType slides -- number of slides to display in slide-style indicator before needing to scroll left/right
    heightEqualized: false
};

window.onload = function() {
    $(document).ready(function() {
        $('#dalMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now - Knorr Chef Dal Masala']);
        });

        $('#chanaMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now - Knorr chef Chana Masala']);
        });

        $('#royalVegetableMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now - Knorr Chef Royal Vegetable Masala']);
        });

        $('#sambarMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now - Knorr Chef Sambar Masala']);
        });

        $('#pavBhajiMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now - Knorr Chef Pav Bhaji Masala']);
        });

        $('#meatMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now - Knorr Chef Meat Masala']);
        });

        $('#chickenMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now - Knorr Chef Chicken Masala']);
        });

        $('#biryaniMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now - Knorr Chef Biryani Masala']);
        });
        $('#EasyToCookChineseChilliGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Chinese Knorr Easy To Cook Chinese Chilli']);
        });
        $('#EasyToCookChineseManchurianGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Chinese Knorr Easy To Cook Chinese Manchurian']);
        });
        $('#EasyToCookChineseNoodlesFriedRiceGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Chinese Knorr Easy To Cook Chinese Noodles/Fried Rice']);
        });
        $('#EasyToCookChineseFriedRiceGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Chinese Knorr Easy To Cook Chinese Fried Rice']);
        });
        $('#EasyToCookChineseSchezuanGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Chinese Knorr Easy To Cook Chinese Schezuan']);
        });
        $('#EasyToCookDalMakhaniGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Indian Knorr Easy To Cook Dal Makhani']);
        });
        $('#EasyToCookHyderabadiBiryaniGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Indian Knorr Easy To Cook Hyderabadi Biryani']);
        });
        $('#EasyToCookPaneerButterMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Indian Knorr Easy To Cook Paneer Butter Masala']);
        });
        $('#EasyToCookPunjabiChanaMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Indian Knorr Easy To Cook Punjabi Chana Masala']);
        });
        $('#EasyToCookPunjabiChickenCurryGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Indian Knorr Easy To Cook Punjabi Chicken Curry']);
        });
        $('#EasyToCookItalianPastaRedSauceGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Italian Knorr Easy To Cook Italian Pasta Red Sauce']);
        });
        $('#EasyToCookItalianPastaWhiteSauceGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Italian Knorr Easy To Cook Italian Pasta White Sauce']);
        });
        $('#ClassicThickTomatoSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Classic Thick Tomato Soup']);
        });
        $('#MexicanTomatoCornSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Mexican Tomato Corn Soup']);
        });
        $('#ClassicMixedVegetableSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Classic Mixed Vegetable Soup']);
        });
        $('#ThaiVegetableSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Thai Vegetable Soup']);
        });
        $('#SanghaiHotAndSourChickenSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Sanghai Hot And Sour Chicken Soup']);
        });
        $('#ChineseHotandSourVegetableSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Chinese Hot & Sour Vegetable Soup']);
        });
        $('#ChineseSweetCornVegetableSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Chinese Sweet Corn Vegetable Soup']);
        });
        $('#ClassicChickenDeliteSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Classic Chicken Delite Soup']);
        });
        $('#HongKongManchowNoodleSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Hong Kong Manchow Noodle Soup']);
        });
        $('#ItalianMushroomSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Italian Mushroom Soup']);
        });
        $('#ChineseSweetCornChickenSoupGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Soups Knorr Chinese Sweet Corn Chicken Soup']);
        });
        $('#SoupyNoodlesMastMasalaGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Noodles Knorr Soupy Noodles Mast Masala']);
        });
        $('#ChineseSchezwanNoodlesGA').click(function(){
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Noodles Knorr Chinese Schezwan Noodles']);
        });
        $('#ChineseHotAndSpicyNoodlesGA').click(function(){
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Noodles Knorr Chinese Hot and Spicy Noodles']);
        });
        $('#CupASoupsTomatoChatpataGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Cup-A-Soups Tomato Chatpata']);
        });
        $('#CupASoupsMixedVegetableGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Cup-A-Soups Mixed Vegetable']);
        });
        $('#CupASoupsSweetCornVegGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Cup-A-Soups Sweet Corn Veg']);
        });
        $('#CupASoupsManchowVegGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Cup-A-Soups Manchow Veg']);
        });
        $('#CupASoupsHotandSourVegGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Cup-A-Soups Hot & Sour Veg']);
        });
        $('#CupASoupsChickenDeliteGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Cup-A-Soups Chicken Delite']);
        });
        $('#CupASoupsSweetCornChickenGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Cup-A-Soups Sweet Corn Chicken']);
        });
        $('#TawaChatpataGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now- Knorr Tawa Chatpata']);
        });
        $('#ChineseChowGA').click(function() { /*Need to be corrected in CMS*/
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Chinese Chow']);
        });
        $('#ChickenMasaledarGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Chicken Masaledar']);
        });
        $('#ChickenChilliGarlicGA').click(function() {
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Chicken Chilli Garlic']);
        });
        // Code Added for New Products
        $('#chanaMasalaChotaGA').click(function(){
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr chef Chana Masala Chota Pack']);
        });

        $('#sambarMasalaChotaGA').click(function(){
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Chef Sambar Masala Chota Pack']);
        });

        $('#pavBhajiMasalaChotaGA').click(function(){
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Chef Pav Bhaji Masala Chota Pack']);
        });

        $('#meatMasalaChotaGA').click(function(){
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Chef Meat Masala Chota Pack']);
        });

        $('#chickenMasalaChotaGA').click(function(){
            UDM.evq.push(['trackEvent', 'Custom', 'Click to Action', 'Buy now-Knorr Chef Chicken Masala Chota Pack']);
        });
    });
}
