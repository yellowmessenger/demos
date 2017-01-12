// uses https://github.com/umdjs/umd/blob/master/amdWeb.js

/**
 * Dependency on jQuery as 'jquery' module defined in paths
 *
 */
(function (root, factory) {
    root.ti_image_lazy_load = factory(jQuery);
        jQuery(function(){
            root.ti_image_lazy_load.init();
        });
}(this, function ($) {

    var ti_ill = function () {
        this.init();
    };

    var $window = $(window),
        placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAQMAAABIeJ9nAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjAAIAAAQAASDSLW8AAAAASUVORK5CYII=';

    ti_ill.prototype.setSrc = function (img) {

        var $img = $(img),
            src = $img.attr('data-src') || $img.attr('src'),
            srcset = $img.attr('data-srcset') || $img.attr('srcset'),
            sets = [],
            pieces = [];

        function getSrcFromSrcSet() {
            var windowWidth = $window.width(),
                retina = window.devicePixelRatio > 1;
            pieces = srcset.split(',');
            pieces.forEach(function (el) {
                var set = {}, width;
                set.src = el.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)[0];
                width = el.match(/\d{3}w/gi);
                if (width) {
                    set.width = parseInt(width[0].replace('w', '').replace(/\s/g, ''), 10);
                }
                set.retina = (el.indexOf(' 2x') > 0);
                if (windowWidth >= set.width) {
                    sets.push(set);
                }
            });
            if (sets.length > 1) {
                var widest = 0, tmpSet = [];
                sets.forEach(function (set) {
                    if (set.width > widest) {
                        widest = set.width;
                    }
                });
                sets.forEach(function (set) {
                    if (set.width >= widest) {
                        tmpSet.push(set);
                    }
                });
                sets = tmpSet;
            }
            if (sets.length === 1) {
                src = sets[0].src;
            } else {
                if (retina === true) {
                    sets.forEach(function (set) {
                        if (set.retina === true) {
                            src = set.src;
                        }
                    });
                } else {
                    sets.forEach(function (set) {
                        if (set.retina === false) {
                            src = set.src;
                        }
                    });
                }
            }

            return src;
        }

        if (srcset && srcset.length) {
            src = getSrcFromSrcSet(img);
        }

        if (src) {
            if($img.attr('src') === placeholder){
                $img.fadeOut(200, function () {
                    $img.attr('src', src);
                }).fadeIn(200);
            } else {
                $img.attr('src', src);
            }

        }
    }

    /**
     * Callback on the window.scroll event to determine if any hidden images should be loaded.
     */
    ti_ill.prototype.load = function() {
        var _this = this;
        // have to use body since the rail might be in the body when it gets
        // detached for pushdown ad relative positioning
        var images = $('body').find('img').not('[data-loaded]');
        images.each(function (i, img) {
            _this.setSrc(img);
            $(img).attr('data-loaded', 'true');
        });
    };


    ti_ill.prototype.init = function () {
        var _this = this;
        $(document).ready(function () {
            if ($window.outerWidth() > 800) {
                _this.load();
            }

            $(document).on('scroll mousewheel touchmove', 'div', function () {
                _this.load();
            });
        });
    };

    var till = new ti_ill();

    return till;
}));

if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('ti_image_lazy_load', ['jquery'], function() {
        return window.ti_image_lazy_load
    });
}
