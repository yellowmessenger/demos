(function (window){
    var startOffset = Date.now ? Date.now() : +(new Date)
        , performance = window.performance || {}
        , _entries = []
        , _marksIndex = {}
        , _filterEntries = function (key, value){
            var n = _entries.length, result = [];
            for (var i = 0; i < n; i++ ){
                if (_entries[i][key] == value){
                    result.push(_entries[i]);
                }
            }
            return  result;
        }
        , _clearEntries = function (type, name){
            var i = _entries.length, entry;
            while(i--){
                entry = _entries[i];
                if( entry.entryType == type && (name === void 0 || entry.name == name) ){
                    _entries.splice(i, 1);
                }
            }
        };

    if( !performance.now ){
        performance.now = performance.webkitNow || performance.mozNow || performance.msNow || function (){
            return (Date.now ? Date.now() : +(new Date)) - startOffset;
        };
    }


    if( !performance.mark ){
        performance.mark = performance.webkitMark || function (name){
            var mark = {
                name: name,
                entryType: 'mark',
                startTime: performance.now(),
                duration: 0
            };
            _entries.push(mark);
            _marksIndex[name] = mark;
        };
    }


    if( !performance.measure ){
        performance.measure = performance.webkitMeasure || function (name, startMark, endMark){
            startMark	= _marksIndex[startMark].startTime;
            endMark		= _marksIndex[endMark].startTime;

            _entries.push({
                name:			name
                , entryType:	'measure'
                , startTime:	startMark
                , duration:		endMark - startMark
            });
        };
    }


    if( !performance.getEntriesByType ){
        performance.getEntriesByType = performance.webkitGetEntriesByType || function (type){
            return _filterEntries('entryType', type);
        };
    }


    if( !performance.getEntriesByName ){
        performance.getEntriesByName = performance.webkitGetEntriesByName || function (name){
            return _filterEntries('name', name);
        };
    }


    if( !performance.clearMarks ){
        performance.clearMarks = performance.webkitClearMarks || function (name){
            _clearEntries('mark', name);
        };
    }


    if( !performance.clearMeasures ){
        performance.clearMeasures = performance.webkitClearMeasures || function (name){
            _clearEntries('measure', name);
        };
    }


    // exports
    window.performance = performance;

    if( typeof define === 'function' && (define.amd || define.ajs) ){
        define('performance', [], function (){ return performance });
    }
})(window);

/*
 * Copyright (c) 2011, Yahoo! Inc.  All rights reserved.
 * Copyright (c) 2012, Log-Normal, Inc.  All rights reserved.
 * Copyright (c) 2014, SOASTA, Inc. All rights reserved.
 * Copyrights licensed under the BSD License. See the accompanying LICENSE.txt file for terms.
 */

/**
 \file boomerang.js
 boomerang measures various performance characteristics of your user's browsing
 experience and beacons it back to your server.

 \details
 To use this you'll need a web site, lots of users and the ability to do
 something with the data you collect.  How you collect the data is up to
 you, but we have a few ideas.
 */

/*eslint-env browser*/
/*global BOOMR:true, BOOMR_start:true, BOOMR_lstart:true, console:false*/
/*eslint no-mixed-spaces-and-tabs:[2, true], console:0, camelcase:0, strict:0, quotes:[2, "double", "avoid-escape"], new-cap:0*/
/*eslint space-infix-ops:0, no-console:0, no-delete-var:0, no-space-before-semi:0, no-multi-spaces:1, space-unary-ops: 0, key-spacing: 0, dot-notation: [2, {"allowKeywords": false }]*/

// Measure the time the script started
// This has to be global so that we don't wait for the entire
// BOOMR function to download and execute before measuring the
// time.  We also declare it without `var` so that we can later
// `delete` it.  This is the only way that works on Internet Explorer
BOOMR_start = new Date().getTime();

/**
 Check the value of document.domain and fix it if incorrect.
 This function is run at the top of boomerang, and then whenever
 init() is called.  If boomerang is running within an iframe, this
 function checks to see if it can access elements in the parent
 iframe.  If not, it will fudge around with document.domain until
 it finds a value that works.

 This allows customers to change the value of document.domain at
 any point within their page's load process, and we will adapt to
 it.
 */
function BOOMR_check_doc_domain(domain) {
    /*eslint no-unused-vars:0*/
    var test;

    // If domain is not passed in, then this is a global call
    // domain is only passed in if we call ourselves, so we
    // skip the frame check at that point
    if(!domain) {
        // If we're running in the main window, then we don't need this
        if(window.parent === window || !document.getElementById("boomr-if-as")) {
            return;// true;	// nothing to do
        }

        domain = document.domain;
    }

    if(domain.indexOf(".") === -1) {
        return;// false;	// not okay, but we did our best
    }

    // 1. Test without setting document.domain
    try {
        test = window.parent.document;
        return;// test !== undefined;	// all okay
    }
        // 2. Test with document.domain
    catch(err) {
        document.domain = domain;
    }
    try {
        test = window.parent.document;
        return;// test !== undefined;	// all okay
    }
        // 3. Strip off leading part and try again
    catch(err) {
        domain = domain.replace(/^[\w\-]+\./, "");
    }

    BOOMR_check_doc_domain(domain);
}

BOOMR_check_doc_domain();


// beaconing section
// the parameter is the window
(function(w) {

    var impl, boomr, d, myurl, createCustomEvent, dispatchEvent, visibilityState, visibilityChange;

// This is the only block where we use document without the w. qualifier
    if(w.parent !== w
        && document.getElementById("boomr-if-as")
        && document.getElementById("boomr-if-as").nodeName.toLowerCase() === "script") {
        w = w.parent;
        myurl = document.getElementById("boomr-if-as").src;
    }

    d = w.document;

// Short namespace because I don't want to keep typing BOOMERANG
    if(!w.BOOMR) { w.BOOMR = {}; }
    BOOMR = w.BOOMR;
// don't allow this code to be included twice
    if(BOOMR.version) {
        return;
    }

    BOOMR.version = "0.9";
    BOOMR.window = w;

    if (!BOOMR.plugins) { BOOMR.plugins = {}; }

// CustomEvent proxy for IE9 & 10 from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
    (function() {
        try {
            if (new w.CustomEvent("CustomEvent") !== undefined) {
                createCustomEvent = function (e_name, params) {
                    return new w.CustomEvent(e_name, params);
                };
            }
        }
        catch(ignore) {
        }

        try {
            if (!createCustomEvent && d.createEvent && d.createEvent( "CustomEvent" )) {
                createCustomEvent = function (e_name, params) {
                    var evt = d.createEvent( "CustomEvent" );
                    params = params || { cancelable: false, bubbles: false };
                    evt.initCustomEvent( e_name, params.bubbles, params.cancelable, params.detail );

                    return evt;
                };
            }
        }
        catch(ignore) {
        }

        if (!createCustomEvent && d.createEventObject) {
            createCustomEvent = function (e_name, params) {
                var evt = d.createEventObject();
                evt.type = evt.propertyName = e_name;
                evt.detail = params.detail;

                return evt;
            };
        }

        if(!createCustomEvent) {
            createCustomEvent = function() { return undefined; };
        }
    }());

    /**
     dispatch a custom event to the browser
     @param e_name	The custom event name that consumers can subscribe to
     @param e_data	Any data passed to subscribers of the custom event via the `event.detail` property
     @param async	By default, custom events are dispatched immediately.
     Set to true if the event should be dispatched once the browser has finished its current
     JavaScript execution.
     */
    dispatchEvent = function(e_name, e_data, async) {
        var ev = createCustomEvent(e_name, {"detail": e_data});
        if (!ev) {
            return;
        }

        function dispatch() {
            if(d.dispatchEvent) {
                d.dispatchEvent(ev);
            }
            else if(d.fireEvent) {
                d.fireEvent("onpropertychange", ev);
            }
        }

        if(async) {
            BOOMR.setImmediate(dispatch);
        }
        else {
            dispatch();
        }
    };

// visibilitychange is useful to detect if the page loaded through prerender
// or if the page never became visible
// http://www.w3.org/TR/2011/WD-page-visibility-20110602/
// http://www.nczonline.net/blog/2011/08/09/introduction-to-the-page-visibility-api/
// https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API

// Set the name of the hidden property and the change event for visibility
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
        visibilityState = "visibilityState";
        visibilityChange = "visibilitychange";
    }
    else if (typeof document.mozHidden !== "undefined") {
        visibilityState = "mozVisibilityState";
        visibilityChange = "mozvisibilitychange";
    }
    else if (typeof document.msHidden !== "undefined") {
        visibilityState = "msVisibilityState";
        visibilityChange = "msvisibilitychange";
    }
    else if (typeof document.webkitHidden !== "undefined") {
        visibilityState = "webkitVisibilityState";
        visibilityChange = "webkitvisibilitychange";
    }


// impl is a private object not reachable from outside the BOOMR object
// users can set properties by passing in to the init() method
    impl = {
        // properties
        beacon_url: "",
        // beacon request method, either GET, POST or AUTO. AUTO will check the
        // request size then use GET if the request URL is less than 2000 chars
        // otherwise it will fall back to a POST request.
        beacon_type: "AUTO",
        // strip out everything except last two parts of hostname.
        // This doesn't work well for domains that end with a country tld,
        // but we allow the developer to override site_domain for that.
        // You can disable all cookies by setting site_domain to a falsy value
        site_domain: w.location.hostname.
            replace(/.*?([^.]+\.[^.]+)\.?$/, "$1").
            toLowerCase(),
        //! User's ip address determined on the server.  Used for the BA cookie
        user_ip: "",

        strip_query_string: false,

        onloadfired: false,

        handlers_attached: false,
        events: {
            "page_ready": [],
            "page_unload": [],
            "before_unload": [],
            "dom_loaded": [],
            "visibility_changed": [],
            "before_beacon": [],
            "onbeacon": [],
            "xhr_load": [],
            "click": [],
            "form_submit": []
        },

        public_events: {
            "before_beacon": "onBeforeBoomerangBeacon",
            "onbeacon": "onBoomerangBeacon",
            "onboomerangloaded": "onBoomerangLoaded"
        },

        vars: {},

        errors: {},

        disabled_plugins: {},

        xb_handler: function(type) {
            return function(ev) {
                var target;
                if (!ev) { ev = w.event; }
                if (ev.target) { target = ev.target; }
                else if (ev.srcElement) { target = ev.srcElement; }
                if (target.nodeType === 3) {// defeat Safari bug
                    target = target.parentNode;
                }

                // don't capture events on flash objects
                // because of context slowdowns in PepperFlash
                if(target && target.nodeName.toUpperCase() === "OBJECT" && target.type === "application/x-shockwave-flash") {
                    return;
                }
                impl.fireEvent(type, target);
            };
        },

        fireEvent: function(e_name, data) {
            var i, handler, handlers;

            e_name = e_name.toLowerCase();

            if(!this.events.hasOwnProperty(e_name)) {
                return false;
            }

            if (this.public_events.hasOwnProperty(e_name)) {
                dispatchEvent(this.public_events[e_name], data);
            }

            handlers = this.events[e_name];

            for(i=0; i<handlers.length; i++) {
                try {
                    handler = handlers[i];
                    handler.fn.call(handler.scope, data, handler.cb_data);
                }
                catch(err) {
                    BOOMR.addError(err, "fireEvent." + e_name + "<" + i + ">");
                }
            }

            return true;
        }
    };


// We create a boomr object and then copy all its properties to BOOMR so that
// we don't overwrite anything additional that was added to BOOMR before this
// was called... for example, a plugin.
    boomr = {
        t_lstart: null,
        t_start: BOOMR_start,
        t_end: null,

        url: myurl,

        // Utility functions
        utils: {
            objectToString: function(o, separator, nest_level) {
                var value = [], k;

                if(!o || typeof o !== "object") {
                    return o;
                }
                if(separator === undefined) {
                    separator="\n\t";
                }
                if(!nest_level) {
                    nest_level=0;
                }

                if (Object.prototype.toString.call(o) === "[object Array]") {
                    for(k=0; k<o.length; k++) {
                        if (nest_level > 0 && o[k] !== null && typeof o[k] === "object") {
                            value.push(
                                this.objectToString(
                                    o[k],
                                    separator + (separator === "\n\t" ? "\t" : ""),
                                    nest_level-1
                                )
                            );
                        }
                        else {
                            if (separator === "&") {
                                value.push(encodeURIComponent(o[k]));
                            }
                            else {
                                value.push(o[k]);
                            }
                        }
                    }
                    separator = ",";
                }
                else {
                    for(k in o) {
                        if(Object.prototype.hasOwnProperty.call(o, k)) {
                            if (nest_level > 0 && o[k] !== null && typeof o[k] === "object") {
                                value.push(encodeURIComponent(k) + "=" +
                                    this.objectToString(
                                        o[k],
                                        separator + (separator === "\n\t" ? "\t" : ""),
                                        nest_level-1
                                    )
                                );
                            }
                            else {
                                if (separator === "&") {
                                    value.push(encodeURIComponent(k) + "=" + encodeURIComponent(o[k]));
                                }
                                else {
                                    value.push(k + "=" + o[k]);
                                }
                            }
                        }
                    }
                }

                return value.join(separator);
            },

            getCookie: function(name) {
                if(!name) {
                    return null;
                }

                name = " " + name + "=";

                var i, cookies;
                cookies = " " + d.cookie + ";";
                if ( (i=cookies.indexOf(name)) >= 0 ) {
                    i += name.length;
                    cookies = cookies.substring(i, cookies.indexOf(";", i));
                    return cookies;
                }

                return null;
            },

            setCookie: function(name, subcookies, max_age) {
                var value, nameval, savedval, c, exp;

                if(!name || !impl.site_domain) {
                    BOOMR.debug("No cookie name or site domain: " + name + "/" + impl.site_domain);
                    return false;
                }

                value = this.objectToString(subcookies, "&");
                nameval = name + "=" + value;

                c = [nameval, "path=/", "domain=" + impl.site_domain];
                if(max_age) {
                    exp = new Date();
                    exp.setTime(exp.getTime() + max_age*1000);
                    exp = exp.toGMTString();
                    c.push("expires=" + exp);
                }

                if ( nameval.length < 500 ) {
                    d.cookie = c.join("; ");
                    // confirm cookie was set (could be blocked by user's settings, etc.)
                    savedval = this.getCookie(name);
                    if(value === savedval) {
                        return true;
                    }
                    BOOMR.warn("Saved cookie value doesn't match what we tried to set:\n" + value + "\n" + savedval);
                }
                else {
                    BOOMR.warn("Cookie too long: " + nameval.length + " " + nameval);
                }

                return false;
            },

            getSubCookies: function(cookie) {
                var cookies_a,
                    i, l, kv,
                    gotcookies=false,
                    cookies={};

                if(!cookie) {
                    return null;
                }

                if(typeof cookie !== "string") {
                    BOOMR.debug("TypeError: cookie is not a string: " + typeof cookie);
                    return null;
                }

                cookies_a = cookie.split("&");

                for(i=0, l=cookies_a.length; i<l; i++) {
                    kv = cookies_a[i].split("=");
                    if(kv[0]) {
                        kv.push("");	// just in case there's no value
                        cookies[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
                        gotcookies=true;
                    }
                }

                return gotcookies ? cookies : null;
            },

            removeCookie: function(name) {
                return this.setCookie(name, {}, -86400);
            },

            cleanupURL: function(url) {
                if (!url) {
                    return "";
                }
                if(impl.strip_query_string) {
                    return url.replace(/\?.*/, "?qs-redacted");
                }
                return url;
            },

            hashQueryString: function(url, stripHash) {
                if(!url) {
                    return url;
                }
                if(!url.match) {
                    BOOMR.addError("TypeError: Not a string", "hashQueryString", typeof url);
                    return "";
                }
                if(url.match(/^\/\//)) {
                    url = location.protocol + url;
                }
                if(!url.match(/^(https?|file):/)) {
                    BOOMR.error("Passed in URL is invalid: " + url);
                    return "";
                }
                if(stripHash) {
                    url = url.replace(/#.*/, "");
                }
                if(!BOOMR.utils.MD5) {
                    return url;
                }
                return url.replace(/\?([^#]*)/, function(m0, m1) { return "?" + (m1.length > 10 ? BOOMR.utils.MD5(m1) : m1); });
            },

            pluginConfig: function(o, config, plugin_name, properties) {
                var i, props=0;

                if(!config || !config[plugin_name]) {
                    return false;
                }

                for(i=0; i<properties.length; i++) {
                    if(config[plugin_name][properties[i]] !== undefined) {
                        o[properties[i]] = config[plugin_name][properties[i]];
                        props++;
                    }
                }

                return (props>0);
            },

            /**
             Add a MutationObserver for a given element and terminate after `timeout`ms.
             @param el		DOM element to watch for mutations
             @param config		MutationObserverInit object (https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit)
             @param timeout		Number of milliseconds of no mutations after which the observer should be automatically disconnected
             If set to a falsy value, the observer will wait indefinitely for Mutations.
             @param callback	Callback function to call either on timeout or if mutations are detected.  The signature of this method is:
             function(mutations, callback_data)
             Where:
             mutations is the list of mutations detected by the observer or `undefined` if the observer timed out
             callback_data is the passed in `callback_data` parameter without modifications

             The callback function may return a falsy value to disconnect the observer after it returns, or a truthy value to
             keep watching for mutations. If the return value is numeric and greater than 0, then this will be the new timeout
             if it is boolean instead, then the timeout will not fire any more so the caller MUST call disconnect() at some point
             @param callback_data	Any data to be passed to the callback function as its second parameter
             @param callback_ctx	An object that represents the `this` object of the `callback` method.  Leave unset the callback function is not a method of an object

             @returns	- `null` if a MutationObserver could not be created OR
             - An object containing the observer and the timer object:
             { observer: <MutationObserver>, timer: <Timeout Timer if any> }

             The caller can use this to disconnect the observer at any point by calling `retval.observer.disconnect()`
             Note that the caller should first check to see if `retval.observer` is set before calling `disconnect()` as it may
             have been cleared automatically.
             */
            addObserver: function(el, config, timeout, callback, callback_data, callback_ctx) {
                var o = {observer: null, timer: null};

                if(!window.MutationObserver || !callback || !el) {
                    return null;
                }

                function done(mutations) {
                    var run_again=false;

                    if(o.timer) {
                        clearTimeout(o.timer);
                        o.timer = null;
                    }

                    if(callback) {
                        run_again = callback.call(callback_ctx, mutations, callback_data);

                        if(!run_again) {
                            callback = null;
                        }
                    }

                    if(!run_again && o.observer) {
                        o.observer.disconnect();
                        o.observer = null;
                    }

                    if(typeof run_again === "number" && run_again > 0) {
                        o.timer = setTimeout(done, run_again);
                    }
                }

                o.observer = new MutationObserver(done);

                if(timeout) {
                    o.timer = setTimeout(done, o.timeout);
                }

                o.observer.observe(el, config);

                return o;
            },

            addListener: function(el, type, fn) {
                if (el.addEventListener) {
                    el.addEventListener(type, fn, false);
                } else if (el.attachEvent) {
                    el.attachEvent( "on" + type, fn );
                }
            },

            removeListener: function (el, type, fn) {
                if (el.removeEventListener) {
                    el.removeEventListener(type, fn, false);
                } else if (el.detachEvent) {
                    el.detachEvent("on" + type, fn);
                }
            },

            pushVars: function (form, vars, prefix) {
                var k, i, l=0, input;

                for(k in vars) {
                    if(vars.hasOwnProperty(k)) {
                        if(Object.prototype.toString.call(vars[k]) === "[object Array]") {
                            for(i = 0; i < vars[k].length; ++i) {
                                l += BOOMR.utils.pushVars(form, vars[k][i], k + "[" + i + "]");
                            }
                        } else {
                            input = document.createElement("input");
                            input.type = "hidden";	// we need `hidden` to preserve newlines. see commit message for more details
                            input.name = (prefix ? (prefix + "[" + k + "]") : k);
                            input.value = (vars[k]===undefined || vars[k]===null ? "" : vars[k]);

                            form.appendChild(input);

                            l += encodeURIComponent(input.name).length + encodeURIComponent(input.value).length + 2;
                        }
                    }
                }

                return l;
            },

            sendData: function (form, method) {
                var input  = document.createElement("input"),
                    urls = [ impl.beacon_url ];

                form.method = method;
                form.id = "beacon_form";

                // TODO: Determine if we want to send as JSON
                //if (window.JSON) {
                //	form.innerHTML = "";
                //	form.enctype = "text/plain";
                //	input.name = "data";
                //	input.value = JSON.stringify(impl.vars);
                //	form.appendChild(input);
                //} else {
                form.enctype = "application/x-www-form-urlencoded";
                //}

                if(impl.secondary_beacons && impl.secondary_beacons.length) {
                    urls.push.apply(urls, impl.secondary_beacons);
                }


                function remove(id) {
                    var el = document.getElementById(id);
                    if (el) {
                        el.parentNode.removeChild(el);
                    }
                }

                function submit() {
                    /*eslint-disable no-script-url*/
                    var iframe,
                        name = "boomerang_post-" + encodeURIComponent(form.action) + "-" + Math.random();

                    // ref: http://terminalapp.net/submitting-a-form-with-target-set-to-a-script-generated-iframe-on-ie/
                    try {
                        iframe = document.createElement('<iframe name="' + name + '">');	// IE <= 8
                    }
                    catch (ignore) {
                        iframe = document.createElement("iframe");				// everything else
                    }

                    form.action = urls.shift();
                    form.target = iframe.name = iframe.id = name;
                    iframe.style.display = form.style.display = "none";
                    iframe.src="javascript:false";

                    remove(iframe.id);
                    remove(form.id);

                    document.body.appendChild(iframe);
                    document.body.appendChild(form);

                    form.submit();

                    if (urls.length) {
                        BOOMR.setImmediate(submit);
                    }

                    setTimeout(function() { remove(iframe.id); }, 10000);
                }

                submit();
            }
        },

        init: function(config) {
            var i, k,
                properties = ["beacon_url", "beacon_type", "site_domain", "user_ip", "strip_query_string", "secondary_beacons"];

            BOOMR_check_doc_domain();

            if(!config) {
                config = {};
            }

            for(i=0; i<properties.length; i++) {
                if(config[properties[i]] !== undefined) {
                    impl[properties[i]] = config[properties[i]];
                }
            }

            if(config.log !== undefined) {
                this.log = config.log;
            }
            if(!this.log) {
                this.log = function(/* m,l,s */) {};
            }

            for(k in this.plugins) {
                if(this.plugins.hasOwnProperty(k)) {
                    // config[plugin].enabled has been set to false
                    if( config[k]
                        && config[k].hasOwnProperty("enabled")
                        && config[k].enabled === false
                    ) {
                        impl.disabled_plugins[k] = 1;
                        continue;
                    }

                    // plugin was previously disabled
                    if(impl.disabled_plugins[k]) {

                        // and has not been explicitly re-enabled
                        if( !config[k]
                            || !config[k].hasOwnProperty("enabled")
                            || config[k].enabled !== true
                        ) {
                            continue;
                        }

                        // plugin is now enabled
                        delete impl.disabled_plugins[k];
                    }

                    // plugin exists and has an init method
                    if(typeof this.plugins[k].init === "function") {
                        try {
                            this.plugins[k].init(config);
                        }
                        catch(err) {
                            BOOMR.addError(err, k + ".init");
                        }
                    }
                }
            }

            if(impl.handlers_attached) {
                return this;
            }

            // The developer can override onload by setting autorun to false
            if(!impl.onloadfired && (config.autorun === undefined || config.autorun !== false)) {
                if(d.readyState && d.readyState === "complete") {
                    BOOMR.loadedLate = true;
                    this.setImmediate(BOOMR.page_ready, null, null, BOOMR);
                }
                else {
                    if(w.onpagehide || w.onpagehide === null) {
                        BOOMR.utils.addListener(w, "pageshow", BOOMR.page_ready);
                    }
                    else {
                        BOOMR.utils.addListener(w, "load", BOOMR.page_ready);
                    }
                }
            }

            BOOMR.utils.addListener(w, "DOMContentLoaded", function() { impl.fireEvent("dom_loaded"); });

            (function() {
                var forms, iterator;
                if(visibilityChange !== undefined) {
                    BOOMR.utils.addListener(d, visibilityChange, function() { impl.fireEvent("visibility_changed"); });

                    // record the last time each visibility state occurred
                    BOOMR.subscribe("visibility_changed", function() {
                        BOOMR.lastVisibilityEvent[BOOMR.visibilityState()] = BOOMR.now();
                    });
                }

                BOOMR.utils.addListener(d, "mouseup", impl.xb_handler("click"));

                forms = d.getElementsByTagName("form");
                for(iterator = 0; iterator < forms.length; iterator++) {
                    BOOMR.utils.addListener(forms[iterator], "submit", impl.xb_handler("form_submit"));
                }

                if(!w.onpagehide && w.onpagehide !== null) {
                    // This must be the last one to fire
                    // We only clear w on browsers that don't support onpagehide because
                    // those that do are new enough to not have memory leak problems of
                    // some older browsers
                    BOOMR.utils.addListener(w, "unload", function() { BOOMR.window=w=null; });
                }
            }());

            impl.handlers_attached = true;
            return this;
        },

        // The page dev calls this method when they determine the page is usable.
        // Only call this if autorun is explicitly set to false
        page_ready: function(ev) {
            if (!ev) { ev = w.event; }
            if (!ev) { ev = { name: "load" }; }
            if(impl.onloadfired) {
                return this;
            }
            impl.fireEvent("page_ready", ev);
            impl.onloadfired = true;
            return this;
        },

        setImmediate: function(fn, data, cb_data, cb_scope) {
            var cb = function() {
                fn.call(cb_scope || null, data, cb_data || {});
                cb=null;
            };

            if(w.setImmediate) {
                w.setImmediate(cb);
            }
            else if(w.msSetImmediate) {
                w.msSetImmediate(cb);
            }
            else if(w.webkitSetImmediate) {
                w.webkitSetImmediate(cb);
            }
            else if(w.mozSetImmediate) {
                w.mozSetImmediate(cb);
            }
            else {
                setTimeout(cb, 10);
            }
        },

        now: (function() {
            try {
                if("performance" in window && window.performance && window.performance.now) {
                    return function() {
                        return Math.round(window.performance.now() + window.performance.timing.navigationStart);
                    };
                }
            }
            catch(ignore) { }
            return Date.now || function() { return new Date().getTime(); };
        }()),

        visibilityState: ( visibilityState === undefined ? function() { return "visible"; } : function() { return d[visibilityState]; } ),

        lastVisibilityEvent: {},

        subscribe: function(e_name, fn, cb_data, cb_scope) {
            var i, handler, ev, unload_handler;

            e_name = e_name.toLowerCase();

            if(!impl.events.hasOwnProperty(e_name)) {
                return this;
            }

            ev = impl.events[e_name];

            // don't allow a handler to be attached more than once to the same event
            for(i=0; i<ev.length; i++) {
                handler = ev[i];
                if(handler && handler.fn === fn && handler.cb_data === cb_data && handler.scope === cb_scope) {
                    return this;
                }
            }
            ev.push({ "fn": fn, "cb_data": cb_data || {}, "scope": cb_scope || null });

            // attaching to page_ready after onload fires, so call soon
            if(e_name === "page_ready" && impl.onloadfired) {
                this.setImmediate(fn, null, cb_data, cb_scope);
            }

            // Attach unload handlers directly to the window.onunload and
            // window.onbeforeunload events. The first of the two to fire will clear
            // fn so that the second doesn't fire. We do this because technically
            // onbeforeunload is the right event to fire, but all browsers don't
            // support it.  This allows us to fall back to onunload when onbeforeunload
            // isn't implemented
            if(e_name === "page_unload" || e_name === "before_unload") {
                unload_handler = function(evt) {
                    if(fn) {
                        fn.call(cb_scope, evt || w.event, cb_data);
                    }
                };

                if(e_name === "page_unload") {
                    // pagehide is for iOS devices
                    // see http://www.webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/
                    if(w.onpagehide || w.onpagehide === null) {
                        BOOMR.utils.addListener(w, "pagehide", unload_handler);
                    }
                    else {
                        BOOMR.utils.addListener(w, "unload", unload_handler);
                    }
                }
                BOOMR.utils.addListener(w, "beforeunload", unload_handler);
            }

            return this;
        },

        addError: function(err, src, extra) {
            var str;
            if (typeof err !== "string") {
                str = String(err);
                if(str.match(/^\[object/)) {
                    str = err.name + ": " + (err.description || err.message).replace(/\r\n$/, "");
                }
                err = str;
            }
            if (src !== undefined) {
                err = "[" + src + ":" + BOOMR.now() + "] " + err;
            }
            if (extra) {
                err += ":: " + extra;
            }

            if (impl.errors[err]) {
                impl.errors[err]++;
            }
            else {
                impl.errors[err] = 1;
            }
        },

        addVar: function(name, value) {
            if(typeof name === "string") {
                impl.vars[name] = value;
            }
            else if(typeof name === "object") {
                var o = name, k;
                for(k in o) {
                    if(o.hasOwnProperty(k)) {
                        impl.vars[k] = o[k];
                    }
                }
            }
            return this;
        },

        removeVar: function(arg0) {
            var i, params;
            if(!arguments.length) {
                return this;
            }

            if(arguments.length === 1
                && Object.prototype.toString.apply(arg0) === "[object Array]") {
                params = arg0;
            }
            else {
                params = arguments;
            }

            for(i=0; i<params.length; i++) {
                if(impl.vars.hasOwnProperty(params[i])) {
                    delete impl.vars[params[i]];
                }
            }

            return this;
        },
        clearAllVars: function() {
            impl.vars = null;
        },

        hasVar: function(name) {
            return impl.vars.hasOwnProperty(name);
        },

        requestStart: function(name) {
            var t_start = BOOMR.now();
            BOOMR.plugins.RT.startTimer("xhr_" + name, t_start);

            return {
                loaded: function(data) {
                    BOOMR.responseEnd(name, t_start, data);
                }
            };
        },

        responseEnd: function(name, t_start, data) {
            if(typeof name === "object" && name.url) {
                impl.fireEvent("xhr_load", name);
            }
            else {
                BOOMR.plugins.RT.startTimer("xhr_" + name, t_start);
                impl.fireEvent("xhr_load", {
                    "name": "xhr_" + name,
                    "data": data
                });
            }
        },

        sendBeacon: function() {
            var k, form, furl, img, length, errors=[];

            BOOMR.debug("Checking if we can send beacon");

            // At this point someone is ready to send the beacon.  We send
            // the beacon only if all plugins have finished doing what they
            // wanted to do
            for(k in this.plugins) {
                if(this.plugins.hasOwnProperty(k)) {
                    if(impl.disabled_plugins[k]) {
                        continue;
                    }
                    if(!this.plugins[k].is_complete()) {
                        BOOMR.debug("Plugin " + k + " is not complete, deferring beacon send");
                        return false;
                    }
                }
            }

            // use d.URL instead of location.href because of a safari bug
            impl.vars.pgu = BOOMR.utils.cleanupURL(d.URL.replace(/#.*/, ""));
            if(!impl.vars.u) {
                impl.vars.u = impl.vars.pgu;
            }

            if(impl.vars.pgu === impl.vars.u) {
                delete impl.vars.pgu;
            }

            impl.vars.v = BOOMR.version;

            if(BOOMR.visibilityState()) {
                impl.vars["vis.st"] = BOOMR.visibilityState();
                if(BOOMR.lastVisibilityEvent.visible) {
                    impl.vars["vis.lv"] = BOOMR.now() - BOOMR.lastVisibilityEvent.visible;
                }
                if(BOOMR.lastVisibilityEvent.hidden) {
                    impl.vars["vis.lh"] = BOOMR.now() - BOOMR.lastVisibilityEvent.hidden;
                }
            }

            if(w !== window) {
                impl.vars["if"] = "";
            }

            for (k in impl.errors) {
                if (impl.errors.hasOwnProperty(k)) {
                    errors.push(k + (impl.errors[k] > 1 ? " (*" + impl.errors[k] + ")" : ""));
                }
            }

            if(errors.length > 0) {
                impl.vars.errors = errors.join("\n");
            }

            impl.errors = {};

            // If we reach here, all plugins have completed
            impl.fireEvent("before_beacon", impl.vars);

            // Don't send a beacon if no beacon_url has been set
            // you would do this if you want to do some fancy beacon handling
            // in the `before_beacon` event instead of a simple GET request
            BOOMR.debug("Ready to send beacon: " + BOOMR.utils.objectToString(impl.vars));
            if(!impl.beacon_url) {
                BOOMR.debug("No beacon URL, so skipping.");
                return true;
            }

            form = document.createElement("form");
            length = BOOMR.utils.pushVars(form, impl.vars);

            // If we reach here, we've transferred all vars to the beacon URL.
            impl.fireEvent("onbeacon", impl.vars);

            if(!length) {
                // do not make the request if there is no data
                return this;
            }

            // using 2000 here as a de facto maximum URL length based on:
            // http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers
            BOOMR.utils.sendData(form, impl.beacon_type === "AUTO" ? (length > 2000 ? "POST" : "GET") : "POST");

            return true;
        }

    };

    delete BOOMR_start;

    if(typeof BOOMR_lstart === "number") {
        boomr.t_lstart = BOOMR_lstart;
        delete BOOMR_lstart;
    }
    else if(typeof BOOMR.window.BOOMR_lstart === "number") {
        boomr.t_lstart = BOOMR.window.BOOMR_lstart;
    }

    (function() {
        var make_logger;

        if(typeof console === "object" && console.log !== undefined) {
            boomr.log = function(m, l, s) { console.log(s + ": [" + l + "] " + m); };
        }

        make_logger = function(l) {
            return function(m, s) {
                this.log(m, l, "boomerang" + (s?"."+s:""));
                return this;
            };
        };

        boomr.debug = make_logger("debug");
        boomr.info = make_logger("info");
        boomr.warn = make_logger("warn");
        boomr.error = make_logger("error");
    }());


    (function() {
        var ident;
        for(ident in boomr) {
            if(boomr.hasOwnProperty(ident)) {
                BOOMR[ident] = boomr[ident];
            }
        }
        if (!BOOMR.xhr_excludes) {
            //! URLs to exclude from automatic XHR instrumentation
            BOOMR.xhr_excludes={};
        }

    }());

    dispatchEvent("onBoomerangLoaded", { "BOOMR": BOOMR }, true );

}(window));

/*
 * Copyright (c), Buddy Brewer.
 */

/**
 \file navtiming.js
 Plugin to collect metrics from the W3C Navigation Timing API. For more information about Navigation Timing,
 see: http://www.w3.org/TR/navigation-timing/
 */

(function() {

// First make sure BOOMR is actually defined.  It's possible that your plugin is loaded before boomerang, in which case
// you'll need this.
    BOOMR = BOOMR || {};
    BOOMR.plugins = BOOMR.plugins || {};
    if (BOOMR.plugins.NavigationTiming) {
        return;
    }

// A private object to encapsulate all your implementation details
    var impl = {
        complete: false,
        xhr_done: function(edata) {
            var w = BOOMR.window, res, data = {}, k;

            if (!edata) {
                return;
            }

            if (edata.data) {
                edata = edata.data;
            }

            if (edata.url && w.performance && w.performance.getEntriesByName) {
                res = w.performance.getEntriesByName(edata.url);
                if(res && res.length > 0) {
                    res = res[0];

                    data = {
                        nt_red_st: res.redirectStart,
                        nt_red_end: res.redirectEnd,
                        nt_fet_st: res.fetchStart,
                        nt_dns_st: res.domainLookupStart,
                        nt_dns_end: res.domainLookupEnd,
                        nt_con_st: res.connectStart,
                        nt_con_end: res.connectEnd,
                        nt_req_st: res.requestStart,
                        nt_res_st: res.responseStart,
                        nt_res_end: res.responseEnd
                    };
                    if (res.secureConnectionStart) {
                        // secureConnectionStart is OPTIONAL in the spec
                        data.nt_ssl_st = res.secureConnectionStart;
                    }

                    for(k in data) {
                        if (data.hasOwnProperty(k) && data[k]) {
                            data[k] += w.performance.timing.navigationStart;
                        }
                    }

                }
            }

            if (edata.timing) {
                res = edata.timing;
                if (!data.nt_req_st) {
                    data.nt_req_st = res.requestStart;
                }
                if (!data.nt_res_st) {
                    data.nt_res_st = res.responseStart;
                }
                if (!data.nt_res_end) {
                    data.nt_res_end = res.responseEnd;
                }
                data.nt_domint = res.domInteractive;
                data.nt_domcomp = res.domComplete;
                data.nt_load_st = res.loadEventEnd;
                data.nt_load_end = res.loadEventEnd;
            }

            for(k in data) {
                if (data.hasOwnProperty(k) && !data[k]) {
                    delete data[k];
                }
            }

            BOOMR.addVar(data);

            try { impl.addedVars.push.apply(impl.addedVars, Object.keys(data)); } catch(ignore) {}

            this.complete = true;
            BOOMR.sendBeacon();
        },

        done: function() {
            var w = BOOMR.window, p, pn, pt, data;
            if(this.complete) {
                return this;
            }

            impl.addedVars = [];

            p = w.performance || w.msPerformance || w.webkitPerformance || w.mozPerformance;
            if(p && p.timing && p.navigation) {
                BOOMR.info("This user agent supports NavigationTiming.", "nt");
                pn = p.navigation;
                pt = p.timing;
                data = {
                    nt_red_cnt: pn.redirectCount,
                    nt_nav_type: pn.type,
                    nt_nav_st: pt.navigationStart,
                    nt_red_st: pt.redirectStart,
                    nt_red_end: pt.redirectEnd,
                    nt_fet_st: pt.fetchStart,
                    nt_dns_st: pt.domainLookupStart,
                    nt_dns_end: pt.domainLookupEnd,
                    nt_con_st: pt.connectStart,
                    nt_con_end: pt.connectEnd,
                    nt_req_st: pt.requestStart,
                    nt_res_st: pt.responseStart,
                    nt_res_end: pt.responseEnd,
                    nt_domloading: pt.domLoading,
                    nt_domint: pt.domInteractive,
                    nt_domcontloaded_st: pt.domContentLoadedEventStart,
                    nt_domcontloaded_end: pt.domContentLoadedEventEnd,
                    nt_domcomp: pt.domComplete,
                    nt_load_st: pt.loadEventStart,
                    nt_load_end: pt.loadEventEnd,
                    nt_unload_st: pt.unloadEventStart,
                    nt_unload_end: pt.unloadEventEnd
                };
                if (pt.secureConnectionStart) {
                    // secureConnectionStart is OPTIONAL in the spec
                    data.nt_ssl_st = pt.secureConnectionStart;
                }
                if (pt.msFirstPaint) {
                    // msFirstPaint is IE9+ http://msdn.microsoft.com/en-us/library/ff974719
                    data.nt_first_paint = pt.msFirstPaint;
                }

                BOOMR.addVar(data);

                try { impl.addedVars.push.apply(impl.addedVars, Object.keys(data)); } catch(ignore) {}
            }

            // XXX Inconsistency warning.  msFirstPaint above is in milliseconds while
            //     firstPaintTime below is in seconds.microseconds.  The server needs to deal with this.

            // This is Chrome only, so will not overwrite nt_first_paint above
            if(w.chrome && w.chrome.loadTimes) {
                pt = w.chrome.loadTimes();
                if(pt) {
                    data = {
                        nt_spdy: (pt.wasFetchedViaSpdy?1:0),
                        nt_cinf: pt.connectionInfo,
                        nt_first_paint: pt.firstPaintTime
                    };

                    BOOMR.addVar(data);

                    try { impl.addedVars.push.apply(impl.addedVars, Object.keys(data)); } catch(ignore) {}
                }
            }

            this.complete = true;
            BOOMR.sendBeacon();
        },

        clear: function(vars) {
            if (impl.addedVars && impl.addedVars.length > 0) {
                BOOMR.removeVar(impl.addedVars);
                impl.addedVars = [];
            }
            this.complete = false;
        }
    };

    BOOMR.plugins.NavigationTiming = {
        init: function() {
            if (!impl.initialized) {
                // we'll fire on whichever happens first
                BOOMR.subscribe("page_ready", impl.done, null, impl);
                BOOMR.subscribe("xhr_load", impl.xhr_done, null, impl);
               // BOOMR.subscribe("before_unload", impl.done, null, impl);
                BOOMR.subscribe("onbeacon", impl.clear, null, impl);

                impl.initialized = true;
            }
            return this;
        },

        is_complete: function() {
            return impl.complete;
        }
    };

}());
/*
 * Copyright (c) 2011, Yahoo! Inc.  All rights reserved.
 * Copyright (c) 2012, Log-Normal, Inc.  All rights reserved.
 * Copyrights licensed under the BSD License. See the accompanying LICENSE.txt file for terms.
 */

// This is the Round Trip Time plugin.  Abbreviated to RT
// the parameter is the window
(function(w) {

    /*eslint no-underscore-dangle:0*/

    var d=w.document, impl;

    BOOMR = BOOMR || {};
    BOOMR.plugins = BOOMR.plugins || {};
    if (BOOMR.plugins.RT) {
        return;
    }

// private object
    impl = {
        onloadfired: false,	//! Set when the page_ready event fires
        //  Use this to determine if unload fires before onload
        unloadfired: false,	//! Set when the first unload event fires
        //  Use this to make sure we don't beacon twice for beforeunload and unload
        visiblefired: false,	//! Set when page becomes visible (Chrome/IE)
        //  Use this to determine if user bailed without opening the tab
        initialized: false,	//! Set when init has completed to prevent double initialization
        complete: false,	//! Set when this plugin has completed

        timers: {},		//! Custom timers that the developer can use
        // Format for each timer is { start: XXX, end: YYY, delta: YYY-XXX }
        cookie: "RT",		//! Name of the cookie that stores the start time and referrer
        cookie_exp: 600,	//! Cookie expiry in seconds
        strict_referrer: true,	//! By default, don't beacon if referrers don't match.
        // If set to false, beacon both referrer values and let
        // the back end decide

        navigationType: 0,	// Navigation Type from the NavTiming API.  We mainly care if this was BACK_FORWARD
        // since cookie time will be incorrect in that case
        navigationStart: undefined,
        responseStart: undefined,
        t_start: undefined,	// t_start that came off the cookie
        cached_t_start: undefined,	// cached value of t_start once we know its real value
        t_fb_approx: undefined,	// approximate first byte time for browsers that don't support navtiming
        r: undefined,		// referrer from the cookie
        r2: undefined,		// referrer from document.referer

        // These timers are added directly as beacon variables
        basic_timers: { t_done: 1, t_resp: 1, t_page: 1},

        // Vars that were added to the beacon that we can remove after beaconing
        addedVars: [],

        /**
         * Merge new cookie `params` onto current cookie, and set `timer` param on cookie to current timestamp
         * @param params object containing keys & values to merge onto current cookie.  A value of `undefined`
         *		 will remove the key from the cookie
         * @param timer  string key name that will be set to the current timestamp on the cookie
         *
         * @returns true if the cookie was updated, false if the cookie could not be set for any reason
         */
        updateCookie: function(params, timer) {
            var t_end, t_start, subcookies, k;

            // Disable use of RT cookie by setting its name to a falsy value
            if(!this.cookie) {
                return false;
            }

            subcookies = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie)) || {};

            if (typeof params === "object") {
                for(k in params) {
                    if(params.hasOwnProperty(k)) {
                        if (params[k] === undefined ) {
                            if (subcookies.hasOwnProperty(k)) {
                                delete subcookies[k];
                            }
                        }
                        else {
                            if (k==="nu" || k==="r") {
                                params[k] = BOOMR.utils.hashQueryString(params[k], true);
                            }

                            subcookies[k] = params[k];
                        }
                    }
                }
            }

            t_start = BOOMR.now();

            if(timer) {
                subcookies[timer] = t_start;
            }

            BOOMR.debug("Setting cookie (timer=" + timer + ")\n" + BOOMR.utils.objectToString(subcookies), "rt");
            if(!BOOMR.utils.setCookie(this.cookie, subcookies, this.cookie_exp)) {
                BOOMR.error("cannot set start cookie", "rt");
                return false;
            }

            t_end = BOOMR.now();
            if(t_end - t_start > 50) {
                // It took > 50ms to set the cookie
                // The user Most likely has cookie prompting turned on so
                // t_start won't be the actual unload time
                // We bail at this point since we can't reliably tell t_done
                BOOMR.utils.removeCookie(this.cookie);

                // at some point we may want to log this info on the server side
                BOOMR.error("took more than 50ms to set cookie... aborting: "
                + t_start + " -> " + t_end, "rt");
            }

            return true;
        },

        /**
         * Read initial values from cookie and clear out cookie values it cares about after reading.
         * This makes sure that other pages (eg: loaded in new tabs) do not get an invalid cookie time.
         * This method should only be called from init, and may be called more than once.
         *
         * Request start time is the greater of last page beforeunload or last click time
         * If start time came from a click, we check that the clicked URL matches the current URL
         * If it came from a beforeunload, we check that cookie referrer matches document.referrer
         *
         * If we had a pageHide time or unload time, we use that as a proxy for first byte on non-navtiming
         * browsers.
         */
        initFromCookie: function() {
            var url, subcookies;
            subcookies = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie));

            if(!subcookies) {
                return;
            }

            subcookies.s = Math.max(+subcookies.ul||0, +subcookies.cl||0);

            BOOMR.debug("Read from cookie " + BOOMR.utils.objectToString(subcookies), "rt");

            // If we have a start time, and either a referrer, or a clicked on URL,
            // we check if the start time is usable
            if(subcookies.s && (subcookies.r || subcookies.nu)) {
                this.r = subcookies.r;
                url = BOOMR.utils.hashQueryString(d.URL, true);

                // Either the URL of the page setting the cookie needs to match document.referrer
                BOOMR.debug(this.r + " =?= " + this.r2, "rt");

                // Or the start timer was no more than 15ms after a click or form submit
                // and the URL clicked or submitted to matches the current page's URL
                // (note the start timer may be later than click if both click and beforeunload fired
                // on the previous page)
                BOOMR.debug(subcookies.s + " <? " + (+subcookies.cl+15), "rt");
                BOOMR.debug(subcookies.nu + " =?= " + url, "rt");

                if (!this.strict_referrer ||
                    (subcookies.nu && subcookies.nu === url && subcookies.s < +subcookies.cl + 15) ||
                    (subcookies.s === +subcookies.ul && this.r === this.r2)
                ) {
                    this.t_start = subcookies.s;

                    // additionally, if we have a pagehide, or unload event, that's a proxy
                    // for the first byte of the current page, so use that wisely
                    if(+subcookies.hd > subcookies.s) {
                        this.t_fb_approx = parseInt(subcookies.hd, 10);
                    }
                }
                else {
                    this.t_start = this.t_fb_approx = undefined;
                }
            }

            // Now that we've pulled out the timers, we'll clear them so they don't pollute future calls
            this.updateCookie({
                s: undefined,	// start timer
                r: undefined,	// referrer
                nu: undefined,	// clicked url
                ul: undefined,	// onbeforeunload time
                cl: undefined,	// onclick time
                hd: undefined	// onunload or onpagehide time
            });
        },

        /**
         * Figure out how long boomerang and config.js took to load using resource timing if available, or built in timestamps
         */
        getBoomerangTimings: function() {
            var res, k, urls, url, startTime, data;

            function trimTiming(time, st) {
                // strip from microseconds to milliseconds only
                var timeMs = Math.round(time ? time : 0),
                    startTimeMs = Math.round(st ? st : 0);

                timeMs = (timeMs === 0 ? 0 : (timeMs - startTimeMs));

                return timeMs ? timeMs : "";
            }

            if(BOOMR.t_start) {
                // How long does it take Boomerang to load up and execute (fb to lb)?
                BOOMR.plugins.RT.startTimer("boomerang", BOOMR.t_start);
                BOOMR.plugins.RT.endTimer("boomerang", BOOMR.t_end);	// t_end === null defaults to current time

                // How long did it take from page request to boomerang fb?
                BOOMR.plugins.RT.endTimer("boomr_fb", BOOMR.t_start);

                if(BOOMR.t_lstart) {
                    // when did the boomerang loader start loading boomerang on the page?
                    BOOMR.plugins.RT.endTimer("boomr_ld", BOOMR.t_lstart);
                    // What was the network latency for boomerang (request to first byte)?
                    BOOMR.plugins.RT.setTimer("boomr_lat", BOOMR.t_start - BOOMR.t_lstart);
                }
            }

            // use window and not w because we want the inner iframe
            try
            {
                if (window.performance && window.performance.getEntriesByName) {
                    urls = { "rt.bmr": BOOMR.url };

                    for(url in urls) {
                        if(urls.hasOwnProperty(url) && urls[url]) {
                            res = window.performance.getEntriesByName(urls[url]);
                            if(!res || res.length === 0) {
                                continue;
                            }
                            res = res[0];

                            startTime = trimTiming(res.startTime, 0);
                            data = [
                                startTime,
                                trimTiming(res.responseEnd, startTime),
                                trimTiming(res.responseStart, startTime),
                                trimTiming(res.requestStart, startTime),
                                trimTiming(res.connectEnd, startTime),
                                trimTiming(res.secureConnectionStart, startTime),
                                trimTiming(res.connectStart, startTime),
                                trimTiming(res.domainLookupEnd, startTime),
                                trimTiming(res.domainLookupStart, startTime),
                                trimTiming(res.redirectEnd, startTime),
                                trimTiming(res.redirectStart, startTime)
                            ].join(",").replace(/,+$/, "");

                            BOOMR.addVar(url, data);
                            impl.addedVars.push(url);
                        }
                    }
                }
            }
            catch(e)
            {
                BOOMR.addError(e, "rt.getBoomerangTimings");
            }
        },

        /**
         * Check if we're in a prerender state, and if we are, set additional timers.
         * In Chrome/IE, a prerender state is when a page is completely rendered in an in-memory buffer, before
         * a user requests that page.  We do not beacon at this point because the user has not shown intent
         * to view the page.  If the user opens the page, the visibility state changes to visible, and we
         * fire the beacon at that point, including any timing details for prerendering.
         *
         * Sets the `t_load` timer to the actual value of page load time (request initiated by browser to onload)
         *
         * @returns true if this is a prerender state, false if not (or not supported)
         */
        checkPreRender: function() {
            if(BOOMR.visibilityState() !== "prerender") {
                return false;
            }

            // This means that onload fired through a pre-render.  We'll capture this
            // time, but wait for t_done until after the page has become either visible
            // or hidden (ie, it moved out of the pre-render state)
            // http://code.google.com/chrome/whitepapers/pagevisibility.html
            // http://www.w3.org/TR/2011/WD-page-visibility-20110602/
            // http://code.google.com/chrome/whitepapers/prerender.html

            BOOMR.plugins.RT.startTimer("t_load", this.navigationStart);
            BOOMR.plugins.RT.endTimer("t_load");					// this will measure actual onload time for a prerendered page
            BOOMR.plugins.RT.startTimer("t_prerender", this.navigationStart);
            BOOMR.plugins.RT.startTimer("t_postrender");				// time from prerender to visible or hidden

            return true;
        },

        /**
         * Initialise timers from the NavigationTiming API.  This method looks at various sources for
         * Navigation Timing, and also patches around bugs in various browser implementations.
         * It sets the beacon parameter `rt.start` to the source of the timer
         */
        initFromNavTiming: function() {
            var ti, p, source;

            if(this.navigationStart) {
                return;
            }

            // Get start time from WebTiming API see:
            // https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html
            // http://blogs.msdn.com/b/ie/archive/2010/06/28/measuring-web-page-performance.aspx
            // http://blog.chromium.org/2010/07/do-you-know-how-slow-your-web-page-is.html
            p = w.performance || w.msPerformance || w.webkitPerformance || w.mozPerformance;

            if(p && p.navigation) {
                this.navigationType = p.navigation.type;
            }

            if(p && p.timing) {
                ti = p.timing;
            }
            else if(w.chrome && w.chrome.csi && w.chrome.csi().startE) {
                // Older versions of chrome also have a timing API that's sort of documented here:
                // http://ecmanaut.blogspot.com/2010/06/google-bom-feature-ms-since-pageload.html
                // source here:
                // http://src.chromium.org/viewvc/chrome/trunk/src/chrome/renderer/loadtimes_extension_bindings.cc?view=markup
                ti = {
                    navigationStart: w.chrome.csi().startE
                };
                source = "csi";
            }
            else if(w.gtbExternal && w.gtbExternal.startE()) {
                // The Google Toolbar exposes navigation start time similar to old versions of chrome
                // This would work for any browser that has the google toolbar installed
                ti = {
                    navigationStart: w.gtbExternal.startE()
                };
                source = "gtb";
            }

            if(ti) {
                // Always use navigationStart since it falls back to fetchStart (not with redirects)
                // If not set, we leave t_start alone so that timers that depend
                // on it don't get sent back.  Never use requestStart since if
                // the first request fails and the browser retries, it will contain
                // the value for the new request.
                BOOMR.addVar("rt.start", source || "navigation");
                this.navigationStart = ti.navigationStart || ti.fetchStart || undefined;
                this.responseStart = ti.responseStart || undefined;

                // bug in Firefox 7 & 8 https://bugzilla.mozilla.org/show_bug.cgi?id=691547
                if(navigator.userAgent.match(/Firefox\/[78]\./)) {
                    this.navigationStart = ti.unloadEventStart || ti.fetchStart || undefined;
                }
            }
            else {
                BOOMR.warn("This browser doesn't support the WebTiming API", "rt");
            }

            return;
        },

        /**
         * Validate that the time we think is the load time is correct.  This can be wrong if boomerang was loaded
         * after onload, so in that case, if navigation timing is available, we use that instead.
         */
        validateLoadTimestamp: function(t_now, data) {
            var t_done = t_now;

            // xhr beacon with detailed timing information
            if (data && data.timing && data.timing.loadEventEnd) {
                t_done = data.timing.loadEventEnd;
            }
            // Boomerang loaded late and...
            else if (BOOMR.loadedLate) {
                // We have navigation timing,
                if(w.performance && w.performance.timing) {
                    // and boomerang loaded after onload fired
                    if(w.performance.timing.loadEventStart && w.performance.timing.loadEventStart < BOOMR.t_end) {
                        t_done = w.performance.timing.loadEventStart;
                    }
                }
                // We don't have navigation timing,
                else {
                    // So we'll just use the time when boomerang was added to the page
                    // Assuming that this means boomerang was added in onload
                    t_done = BOOMR.t_lstart || BOOMR.t_start || t_now;
                }
            }

            return t_done;
        },

        /**
         * Set timers appropriate at page load time.  This method should be called from done() only when
         * the page_ready event fires.  It sets the following timer values:
         *		- t_resp:	time from request start to first byte
         *		- t_page:	time from first byte to load
         *		- t_postrender	time from prerender state to visible state
         *		- t_prerender	time from navigation start to visible state
         *
         * @param ename  The Event name that initiated this control flow
         * @param t_done The timestamp when the done() method was called
         * @param data   Event data passed in from the caller.  For xhr beacons, this may contain detailed timing information
         *
         * @returns true if timers were set, false if we're in a prerender state, caller should abort on false.
         */
        setPageLoadTimers: function(ename, t_done, data) {
            var t_resp_start;

            if(ename !== "xhr") {
                impl.initFromCookie();
                impl.initFromNavTiming();

                if(impl.checkPreRender()) {
                    return false;
                }
            }

            if(ename === "xhr") {
                if(data && data.timing) {
                    // Use details from xhr object to figure out resp latency and page time
                    // t_resp will use the cookie if available or fallback to NavTiming
                    t_resp_start = data.timing.responseStart;
                }
            }
            else if(impl.responseStart) {
                // Use NavTiming API to figure out resp latency and page time
                // t_resp will use the cookie if available or fallback to NavTiming
                t_resp_start = impl.responseStart;
            }
            else if(impl.timers.hasOwnProperty("t_page")) {
                // If the dev has already started t_page timer, we can end it now as well
                BOOMR.plugins.RT.endTimer("t_page");
            }
            else if(impl.t_fb_approx) {
                // If we have an approximate first byte time from the cookie, use it
                t_resp_start = impl.t_fb_approx;
            }

            if (t_resp_start) {
                BOOMR.plugins.RT.endTimer("t_resp", t_resp_start);

                if(impl.timers.t_load) {	// t_load is the actual time load completed if using prerender
                    BOOMR.plugins.RT.setTimer("t_page", impl.timers.t_load.end - t_resp_start);
                }
                else {
                    BOOMR.plugins.RT.setTimer("t_page", t_done - t_resp_start);
                }
            }

            // If a prerender timer was started, we can end it now as well
            if(impl.timers.hasOwnProperty("t_postrender")) {
                BOOMR.plugins.RT.endTimer("t_postrender");
                BOOMR.plugins.RT.endTimer("t_prerender");
            }

            return true;
        },

        /**
         * Writes a bunch of timestamps onto the beacon that help in request tracing on the server
         * 	- rt.tstart: The value of t_start that we determined was appropriate
         *	- rt.cstart: The value of t_start from the cookie if different from rt.tstart
         *	- rt.bstart: The timestamp when boomerang started
         *	- rt.end:    The timestamp when the t_done timer ended
         *
         * @param t_start The value of t_start that we plan to use
         */
        setSupportingTimestamps: function(t_start) {
            if (t_start) {
                BOOMR.addVar("rt.tstart", t_start);
            }
            if(typeof impl.t_start === "number" && impl.t_start !== t_start) {
                BOOMR.addVar("rt.cstart", impl.t_start);
            }
            BOOMR.addVar("rt.bstart", BOOMR.t_start);
            if (BOOMR.t_lstart) {
                BOOMR.addVar("rt.blstart", BOOMR.t_lstart);
            }
            BOOMR.addVar("rt.end", impl.timers.t_done.end);	// don't just use t_done because dev may have called endTimer before we did
        },

        /**
         * Determines the best value to use for t_start.
         * If called from an xhr call, then use the start time for that call
         * Else, If we have navigation timing, use that
         * Else, If we have a cookie time, and this isn't the result of a BACK button, use the cookie time
         * Else, if we have a cached timestamp from an earlier call, use that
         * Else, give up
         *
         * @param ename	The event name that resulted in this call. Special consideration for "xhr"
         * @param data  Data passed in from the event caller. If the event name is "xhr",
         *              this should contain the page group name for the xhr call in an attribute called `name`
         *		and optionally, detailed timing information in a sub-object called `timing`
         *              and resource information in a sub-object called `resource`
         *
         * @returns the determined value of t_start or undefined if unknown
         */
        determineTStart: function(ename, data) {
            var t_start;
            if(ename==="xhr") {
                if(data && data.name && impl.timers[data.name]) {
                    // For xhr timers, t_start is stored in impl.timers.xhr_{page group name}
                    // and xhr.pg is set to {page group name}
                    t_start = impl.timers[data.name].start;
                }
                else if(data && data.timing && data.timing.requestStart) {
                    // For automatically instrumented xhr timers, we have detailed timing information
                    t_start = data.timing.requestStart;
                }
                BOOMR.addVar("rt.start", "manual");
            }
            else if(impl.navigationStart) {
                t_start = impl.navigationStart;
            }
            else if(impl.t_start && impl.navigationType !== 2) {
                t_start = impl.t_start;			// 2 is TYPE_BACK_FORWARD but the constant may not be defined across browsers
                BOOMR.addVar("rt.start", "cookie");	// if the user hit the back button, referrer will match, and cookie will match
            }						// but will have time of previous page start, so t_done will be wrong
            else if(impl.cached_t_start) {
                t_start = impl.cached_t_start;
            }
            else {
                BOOMR.addVar("rt.start", "none");
                t_start = undefined;			// force all timers to NaN state
            }

            BOOMR.debug("Got start time: " + t_start, "rt");
            impl.cached_t_start = t_start;

            return t_start;
        },

        page_ready: function(edata) {
            // we need onloadfired because it's possible to reset "impl.complete"
            // if you're measuring multiple xhr loads, but not possible to reset
            // impl.onloadfired
            this.onloadfired = true;
            BOOMR.debug("Unload called with " + BOOMR.utils.objectToString(edata) + " when onloadfired = " + this.onloadfired, "rt");
            if(!this.onloadfired) {
                
                BOOMR.plugins.RT.done(edata, "onload");
            }
        },

        check_visibility: function() {
            // we care if the page became visible at some point
            if(BOOMR.visibilityState() === "visible") {
                impl.visiblefired = true;
            }

            if(impl.visibilityState === "prerender" && BOOMR.visibilityState() !== "prerender") {
                BOOMR.plugins.RT.done(null, "visible");
            }

            impl.visibilityState = BOOMR.visibilityState();
        },

        page_unload: function(edata) {
            BOOMR.debug("Unload called with " + BOOMR.utils.objectToString(edata) + " when unloadfired = " + this.unloadfired, "rt");
            if(!this.unloadfired) {
                // run done on abort or on page_unload to measure session length
                BOOMR.plugins.RT.done(edata, "unload");
            }

            // set cookie for next page
            // We use document.URL instead of location.href because of a bug in safari 4
            // where location.href is URL decoded
            this.updateCookie({ "r": d.URL }, edata.type === "beforeunload"?"ul":"hd");

            this.unloadfired = true;
        },

        _iterable_click: function(name, element, etarget, value_cb) {
            var value;
            if(!etarget) {
                return;
            }
            BOOMR.debug(name + " called with " + etarget.nodeName, "rt");
            while(etarget && etarget.nodeName.toUpperCase() !== element) {
                etarget = etarget.parentNode;
            }
            if(etarget && etarget.nodeName.toUpperCase() === element) {
                BOOMR.debug("passing through", "rt");
                // user event, they may be going to another page
                // if this page is being opened in a different tab, then
                // our unload handler won't fire, so we need to set our
                // cookie on click or submit
                value = value_cb(etarget);
                this.updateCookie({ "nu": value }, "cl" );
                BOOMR.addVar("nu", BOOMR.utils.cleanupURL(value));
                impl.addedVars.push("nu");
            }
        },

        onclick: function(etarget) {
            impl._iterable_click("Click", "A", etarget, function(t) { return t.href; });
        },

        onsubmit: function(etarget) {
            impl._iterable_click("Submit", "FORM", etarget, function(t) {
                var v = t.getAttribute("action") || d.URL || "";
                return v.match(/\?/) ? v : v + "?";
            });
        },

        domloaded: function() {
            BOOMR.plugins.RT.endTimer("t_domloaded");
        },

        clear: function(vars) {
            if (impl.addedVars && impl.addedVars.length > 0) {
                BOOMR.removeVar(impl.addedVars);
                impl.addedVars = [];
            }
        }
    };

    BOOMR.plugins.RT = {
        // Methods

        init: function(config) {
            BOOMR.debug("init RT", "rt");
            if(w !== BOOMR.window) {
                w = BOOMR.window;
            }
            d = w.document;

            BOOMR.utils.pluginConfig(impl, config, "RT",
                ["cookie", "cookie_exp", "strict_referrer"]);

            // A beacon may be fired automatically on page load or if the page dev fires
            // it manually with their own timers.  It may not always contain a referrer
            // (eg: XHR calls).  We set default values for these cases.
            // This is done before reading from the cookie because the cookie overwrites
            // impl.r
            impl.r = impl.r2 = BOOMR.utils.hashQueryString(d.referrer, true);

            // Now pull out start time information from the cookie
            // We'll do this every time init is called, and every time we call it, it will
            // overwrite values already set (provided there are values to read out)
            impl.initFromCookie();

            // We'll get BoomerangTimings every time init is called because it could also
            // include additional timers which might happen on a subsequent init call.
            impl.getBoomerangTimings();

            // only initialize once.  we still collect config and check/set cookies
            // every time init is called, but we attach event handlers only once
            if(impl.initialized) {
                return this;
            }

            impl.complete = false;
            impl.timers = {};

            impl.check_visibility();

            BOOMR.subscribe("page_ready", impl.page_ready, null, impl);
            BOOMR.subscribe("visibility_changed", impl.check_visibility, null, impl);
            BOOMR.subscribe("page_ready", this.done, "load", this);
            BOOMR.subscribe("xhr_load", this.done, "xhr", this);
            BOOMR.subscribe("dom_loaded", impl.domloaded, null, impl);
           // BOOMR.subscribe("page_unload", impl.page_unload, null, impl);
            BOOMR.subscribe("click", impl.onclick, null, impl);
            BOOMR.subscribe("form_submit", impl.onsubmit, null, impl);
            BOOMR.subscribe("before_beacon", this.addTimersToBeacon, "beacon", this);
            BOOMR.subscribe("onbeacon", impl.clear, null, impl);

            impl.initialized = true;
            return this;
        },

        startTimer: function(timer_name, time_value) {
            if(timer_name) {
                if (timer_name === "t_page") {
                    this.endTimer("t_resp", time_value);
                }
                impl.timers[timer_name] = {start: (typeof time_value === "number" ? time_value : BOOMR.now())};
            }

            return this;
        },

        endTimer: function(timer_name, time_value) {
            if(timer_name) {
                impl.timers[timer_name] = impl.timers[timer_name] || {};
                if(impl.timers[timer_name].end === undefined) {
                    impl.timers[timer_name].end =
                        (typeof time_value === "number" ? time_value : BOOMR.now());
                }
            }

            return this;
        },

        setTimer: function(timer_name, time_delta) {
            if(timer_name) {
                impl.timers[timer_name] = { delta: time_delta };
            }

            return this;
        },

        addTimersToBeacon: function(vars, source) {
            var t_name, timer,
                t_other=[];

            for(t_name in impl.timers) {
                if(impl.timers.hasOwnProperty(t_name)) {
                    timer = impl.timers[t_name];

                    // if delta is a number, then it was set using setTimer
                    // if not, then we have to calculate it using start & end
                    if(typeof timer.delta !== "number") {
                        if(typeof timer.start !== "number") {
                            timer.start = impl.cached_t_start;
                        }
                        timer.delta = timer.end - timer.start;
                    }

                    // If the caller did not set a start time, and if there was no start cookie
                    // Or if there was no end time for this timer,
                    // then timer.delta will be NaN, in which case we discard it.
                    if(isNaN(timer.delta)) {
                        continue;
                    }

                    if(impl.basic_timers.hasOwnProperty(t_name)) {
                        BOOMR.addVar(t_name, timer.delta);
                        impl.addedVars.push(t_name);
                    }
                    else {
                        t_other.push(t_name + "|" + timer.delta);
                    }
                }
            }

            if (t_other.length) {
                BOOMR.addVar("t_other", t_other.join(","));
                impl.addedVars.push("t_other");
            }

            if (source === "beacon") {
                impl.timers = {};
                impl.complete = false;	// reset this state for the next call
            }
        },

        // Called when the page has reached a "usable" state.  This may be when the
        // onload event fires, or it could be at some other moment during/after page
        // load when the page is usable by the user
        done: function(edata, ename) {
            // try/catch just in case edata contains cross-origin data and objectToString throws a security exception
            try {
                BOOMR.debug("Called done with " + BOOMR.utils.objectToString(edata, undefined, 1) + ", " + ename, "rt");
            }
            catch(err) {
                BOOMR.debug("Called done with " + err + ", " + ename, "rt");
            }
            var t_start, t_done, t_now=BOOMR.now(),
                subresource = false;

            impl.complete = false;

            t_done = impl.validateLoadTimestamp(t_now, edata);

            if(ename==="load" || ename==="visible" || ename==="xhr") {
                if (!impl.setPageLoadTimers(ename, t_done, edata)) {
                    return this;
                }
            }

            t_start = impl.determineTStart(ename, edata);

            if(edata && edata.data) {
                edata = edata.data;
            }

            if(ename === "xhr" && edata) {
                subresource = edata.subresource;
            }

            // If the dev has already called endTimer, then this call will do nothing
            // else, it will stop the page load timer
            this.endTimer("t_done", t_done);

            // make sure old variables don't stick around
            BOOMR.removeVar(
                "t_done", "t_page", "t_resp", "t_postrender", "t_prerender", "t_load", "t_other",
                "r", "r2", "rt.tstart", "rt.cstart", "rt.bstart", "rt.end", "rt.subres", "rt.abld",
                "http.errno", "http.method", "xhr.sync"
            );

            impl.setSupportingTimestamps(t_start);

            this.addTimersToBeacon();

            BOOMR.addVar("r", BOOMR.utils.cleanupURL(impl.r));

            if(impl.r2 !== impl.r) {
                BOOMR.addVar("r2", BOOMR.utils.cleanupURL(impl.r2));
            }

            if(ename === "xhr" && edata) {
                if(edata && edata.data) {
                    edata = edata.data;
                }
            }

            if (ename === "xhr" && edata) {
                subresource = edata.subresource;

                if(edata.url) {
                    BOOMR.addVar("u", BOOMR.utils.cleanupURL(edata.url.replace(/#.*/, "")));
                    impl.addedVars.push("u");
                }

                if(edata.status && (edata.status < -1 || edata.status >= 400)) {
                    BOOMR.addVar("http.errno", edata.status);
                }

                if(edata.method && edata.method !== "GET") {
                    BOOMR.addVar("http.method", edata.method);
                }

                if(edata.headers) {
                    BOOMR.addVar("http.hdr", edata.headers);
                }

                if(edata.synchronous) {
                    BOOMR.addVar("xhr.sync", 1);
                }

                if(edata.initiator) {
                    BOOMR.addVar("http.initiator", edata.initiator);
                }

                impl.addedVars.push("http.errno", "http.method", "http.hdr", "xhr.sync", "http.initiator");
            }

            if(subresource) {
                BOOMR.addVar("rt.subres", 1);
                impl.addedVars.push("rt.subres");
            }
            impl.updateCookie();

            if(ename==="unload") {
                BOOMR.addVar("rt.quit", "");

                if(!impl.onloadfired) {
                    BOOMR.addVar("rt.abld", "");
                }

                if(!impl.visiblefired) {
                    BOOMR.addVar("rt.ntvu", "");
                }
            }

            impl.complete = true;

            BOOMR.sendBeacon();

            return this;
        },

        is_complete: function() { return impl.complete; }

    };

}(window));
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;



window.Modernizr = (function( window, document, undefined ) {

    var version = '2.6.2',

    Modernizr = {},

    enableClasses = true,

    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  = document.createElement('input')  ,

    smile = ':)',

    toString = {}.toString,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),

    ns = {'svg': 'http://www.w3.org/2000/svg'},

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, 


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
                body = document.body,
                fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
                      while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

                style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
          (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
        if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },



    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

            var isSupported = eventName in element;

        if ( !isSupported ) {
                if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

                    if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),


    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { 
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }


    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }

    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                            if (elem === false) return props[i];

                            if (is(item, 'function')){
                                return item.bind(elem || obj);
                }

                            return item;
            }
        }
        return false;
    }

    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

            if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

            } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };



    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };


    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };



    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    tests['rgba'] = function() {
        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
            setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
                setCss('background:url(https://),url(https://),red url(https://)');

            return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };



    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
                setCssAll('opacity:.55');

                    return (/^0.55$/).test(mStyle.opacity);
    };


    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
                       (str1 + '-webkit- '.split(' ').join(str2 + str1) +
                       prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

                        if ( ret && 'webkitPerspective' in docElement.style ) {

                      injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };



    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };

    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };
    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

            try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                            bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                                                    bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };


    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    function webforms() {
                                            Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
                                  attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
                            Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                                                    if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                                        bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                                                                                  (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                                                                                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                                        bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                                        bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        }
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
                                    featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    Modernizr.input || webforms();


     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
                                              return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; 
     };


    setCss('');
    modElem = inputElem = null;

    ;(function(window, document) {
        var options = window.html5 || {};

        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        var supportsHtml5Styles;

        var expando = '_html5shiv';

        var expanID = 0;

        var expandoData = {};

        var supportsUnknownElements;

      (function() {
        try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
                    supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
                        (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
        } catch(e) {
          supportsHtml5Styles = true;
          supportsUnknownElements = true;
        }

      }());        function addStyleSheet(ownerDocument, cssText) {
        var p = ownerDocument.createElement('p'),
            parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

        p.innerHTML = 'x<style>' + cssText + '</style>';
        return parent.insertBefore(p.lastChild, parent.firstChild);
      }

        function getElements() {
        var elements = html5.elements;
        return typeof elements == 'string' ? elements.split(' ') : elements;
      }

          function getExpandoData(ownerDocument) {
        var data = expandoData[ownerDocument[expando]];
        if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
        }
        return data;
      }

        function createElement(nodeName, ownerDocument, data){
        if (!ownerDocument) {
            ownerDocument = document;
        }
        if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
        }
        if (!data) {
            data = getExpandoData(ownerDocument);
        }
        var node;

        if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
        } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
        } else {
            node = data.createElem(nodeName);
        }

                                    return node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node;
      }

        function createDocumentFragment(ownerDocument, data){
        if (!ownerDocument) {
            ownerDocument = document;
        }
        if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
        }
        data = data || getExpandoData(ownerDocument);
        var clone = data.frag.cloneNode(),
            i = 0,
            elems = getElements(),
            l = elems.length;
        for(;i<l;i++){
            clone.createElement(elems[i]);
        }
        return clone;
      }

        function shivMethods(ownerDocument, data) {
        if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
        }


        ownerDocument.createElement = function(nodeName) {
                if (!html5.shivMethods) {
              return data.createElem(nodeName);
          }
          return createElement(nodeName, ownerDocument, data);
        };

        ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
          'var n=f.cloneNode(),c=n.createElement;' +
          'h.shivMethods&&(' +
                    getElements().join().replace(/\w+/g, function(nodeName) {
              data.createElem(nodeName);
              data.frag.createElement(nodeName);
              return 'c("' + nodeName + '")';
            }) +
          ');return n}'
        )(html5, data.frag);
      }        function shivDocument(ownerDocument) {
        if (!ownerDocument) {
            ownerDocument = document;
        }
        var data = getExpandoData(ownerDocument);

        if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
          data.hasCSS = !!addStyleSheet(ownerDocument,
                    'article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
                    'mark{background:#FF0;color:#000}'
          );
        }
        if (!supportsUnknownElements) {
          shivMethods(ownerDocument, data);
        }
        return ownerDocument;
      }        var html5 = {

            'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video',

            'shivCSS': (options.shivCSS !== false),

            'supportsUnknownElements': supportsUnknownElements,

            'shivMethods': (options.shivMethods !== false),

            'type': 'default',

            'shivDocument': shivDocument,

            createElement: createElement,

            createDocumentFragment: createDocumentFragment
      };        window.html5 = html5;

        shivDocument(document);

    }(this, document));

    Modernizr._version      = version;

    Modernizr._prefixes     = prefixes;
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;


    Modernizr.hasEvent      = isEventSupported;

    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };

    Modernizr.testAllProps  = testPropsAll;


    Modernizr.testStyles    = injectElementWithStyles;
    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
            return testPropsAll(prop, obj, elem);
      }
    };


    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                                                    (enableClasses ? ' js ' + classes.join(' ') : '');

    return Modernizr;

})(this, this.document);
/*yepnope1.5.4|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);
Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0));};
;
/**
 * Define missing console.log() for browsers that don't have it (IE8/IE9 and earlier, etc)
 * Prevents js errors if console.log() statements are left in deployed code.
 */
(function(){
    if (typeof(window.console) == "undefined") {
        window.console = {};
    };

    if (typeof(window.console.log) == "undefined") {
        window.console.log = function(s) {
            // do nothing
        };
    }
}());

/*!
 * jQuery JavaScript Library v1.8.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Tue Nov 13 2012 08:20:33 GMT-0500 (Eastern Standard Time)
 */
(function( window, undefined ) {
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,
	navigator = window.navigator,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Save a reference to some core methods
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

	// Used for detecting and trimming whitespace
	core_rnotwhite = /\S/,
	core_rspace = /\s+/,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	},

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context && context.nodeType ? context.ownerDocument || context : document );

					// scripts is true for back-compat
					selector = jQuery.parseHTML( match[1], doc, true );
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						this.attr.call( selector, context, true );
					}

					return jQuery.merge( this, selector );

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.8.3",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ),
			"slice", core_slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready, 1 );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ core_toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// scripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, scripts ) {
		var parsed;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			scripts = context;
			context = 0;
		}
		context = context || document;

		// Single tag
		if ( (parsed = rsingleTag.exec( data )) ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
		return jQuery.merge( [],
			(parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
	},

	parseJSON: function( data ) {
		if ( !data || typeof data !== "string") {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && core_rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var name,
			i = 0,
			length = obj.length,
			isObj = length === undefined || jQuery.isFunction( obj );

		if ( args ) {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.apply( obj[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( obj[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jQuery.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
				core_push.call( ret, arr );
			} else {
				jQuery.merge( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key,
			ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && jQuery.isFunction( value );

			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( jQuery( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}

			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
				}
			}

			chainable = 1;
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready, 1 );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.split( core_rspace ), function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
								function() {
									var returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								} :
								newDefer[ action ]
							);
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ] = list.fire
			deferred[ tuple[0] ] = list.fire;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		fragment,
		eventName,
		i,
		isSupported,
		clickFn,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Support tests won't run in some limited or non-browser environments
	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !all || !a || !all.length ) {
		return {};
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";
	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form (#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: ( document.compatMode === "CSS1Compat" ),

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", clickFn = function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent("onclick");
		div.detachEvent( "onclick", clickFn );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	input.setAttribute( "checked", "checked" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "name", "t" );

	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for ( i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, div, tds, marginDiv,
			divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// NOTE: To any future maintainer, we've window.getComputedStyle
		// because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. For more
			// info see bug #3333
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = document.createElement("div");
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			div.appendChild( marginDiv );
			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "block";
			div.style.overflow = "visible";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			container.style.zoom = 1;
		}

		// Null elements to avoid leaks in IE
		body.removeChild( container );
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	fragment.removeChild( div );
	all = a = select = opt = input = fragment = div = null;

	return support;
})();
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	deletedIds: [],

	// Remove at next major release (1.9/2.0)
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = jQuery.deletedIds.pop() || jQuery.guid++;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, part, attr, name, l,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attr = elem.attributes;
					for ( l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( !name.indexOf( "data-" ) ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split( ".", 2 );
		parts[1] = parts[1] ? "." + parts[1] : "";
		part = parts[1] + "!";

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				data = this.triggerHandler( "getData" + part, [ parts[0] ] );

				// Try to fetch any internally stored data first
				if ( data === undefined && elem ) {
					data = jQuery.data( elem, key );
					data = dataAttr( elem, key, data );
				}

				return data === undefined && parts[1] ?
					this.data( parts[0] ) :
					data;
			}

			parts[1] = value;
			this.each(function() {
				var self = jQuery( this );

				self.triggerHandler( "setData" + part, parts );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + part, parts );
			});
		}, null, value, arguments.length > 1, null, false );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery.removeData( elem, type + "queue", true );
				jQuery.removeData( elem, key, true );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook, fixSpecified,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea|)$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( setClass.indexOf( " " + classNames[ c ] + " " ) < 0 ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var removes, className, elem, c, cl, i, l;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}
		if ( (value && typeof value === "string") || value === undefined ) {
			removes = ( value || "" ).split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];
				if ( elem.nodeType === 1 && elem.className ) {

					className = (" " + elem.className + " ").replace( rclass, " " );

					// loop over each item in the removal list
					for ( c = 0, cl = removes.length; c < cl; c++ ) {
						// Remove until there is nothing to remove,
						while ( className.indexOf(" " + removes[ c ] + " ") >= 0 ) {
							className = className.replace( " " + removes[ c ] + " " , " " );
						}
					}
					elem.className = value ? jQuery.trim( className ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( core_rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	// Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
	attrFn: {},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {

			attrNames = value.split( core_rspace );

			for ( ; i < attrNames.length; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.value = value + "" );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var t, tns, type, origType, namespaces, origCount,
			j, events, special, eventType, handleObj,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, "events", true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
			type = event.type || event,
			namespaces = [];

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			for ( old = elem; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old === (elem.ownerDocument || document) ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
			handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = core_slice.call( arguments ),
			run_all = !event.exclusive && !event.namespace,
			special = jQuery.event.special[ event.type ] || {},
			handlerQueue = [];

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers that should run if there are delegated events
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !(event.button && event.type === "click") ) {

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					selMatch = {};
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector;

						if ( selMatch[ sel ] === undefined ) {
							selMatch[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( selMatch[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, matches: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
		event.metaKey = !!event.metaKey;

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "_submit_attached" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "_submit_attached", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "_change_attached", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) { // && selector != null
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://sizzlejs.com/
 */
(function( window, undefined ) {

var cachedruns,
	assertGetIdNotName,
	Expr,
	getText,
	isXML,
	contains,
	compile,
	sortOrder,
	hasDuplicate,
	outermostContext,

	baseHasDuplicate = true,
	strundefined = "undefined",

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	Token = String,
	document = window.document,
	docElem = document.documentElement,
	dirruns = 0,
	done = 0,
	pop = [].pop,
	push = [].push,
	slice = [].slice,
	// Use a stripped-down indexOf if a native one is unavailable
	indexOf = [].indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	// Augment a function for special use by Sizzle
	markFunction = function( fn, value ) {
		fn[ expando ] = value == null || value;
		return fn;
	},

	createCache = function() {
		var cache = {},
			keys = [];

		return markFunction(function( key, value ) {
			// Only keep the most recent entries
			if ( keys.push( key ) > Expr.cacheLength ) {
				delete cache[ keys.shift() ];
			}

			// Retrieve with (key + " ") to avoid collision with native Object.prototype properties (see Issue #157)
			return (cache[ key + " " ] = value);
		}, cache );
	},

	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments not in parens/brackets,
	//   then attribute selectors and non-pseudos (denoted by :),
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

	// For matchExpr.POS and matchExpr.needsContext
	pos = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
		"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rnot = /^:not/,
	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"POS": new RegExp( pos, "i" ),
		"CHILD": new RegExp( "^:(only|nth|first|last)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	// Support

	// Used for testing something on an element
	assert = function( fn ) {
		var div = document.createElement("div");

		try {
			return fn( div );
		} catch (e) {
			return false;
		} finally {
			// release memory in IE
			div = null;
		}
	},

	// Check if getElementsByTagName("*") returns only elements
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem,
			results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

function Sizzle( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed, xml );
}

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

// Returns a function to use in pseudos for positionals
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
contains = Sizzle.contains = docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	docElem.compareDocumentPosition ?
	function( a, b ) {
		return b && !!( a.compareDocumentPosition( b ) & 16 );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

Sizzle.attr = function( elem, name ) {
	var val,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( (val = Expr.attrHandle[ name ]) ) {
		return val( elem );
	}
	if ( xml || assertAttributes ) {
		return elem.getAttribute( name );
	}
	val = elem.getAttributeNode( name );
	return val ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			val.specified ? val.value : null :
		null;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	// IE6/7 return a modified href
	attrHandle: assertHrefNotNormalized ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		},

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			},

		"NAME": assertUsableName && function( tag, context ) {
			if ( typeof context.getElementsByName !== strundefined ) {
				return context.getElementsByName( name );
			}
		},

		"CLASS": assertUsableClassName && function( className, context, xml ) {
			if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
				return context.getElementsByClassName( className );
			}
		}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var unquoted, excess;
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			if ( match[3] ) {
				match[2] = match[3];
			} else if ( (unquoted = match[4]) ) {
				// Only check arguments that contain a pseudo
				if ( rpseudo.test(unquoted) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					unquoted = unquoted.slice( 0, excess );
					match[0] = match[0].slice( 0, excess );
				}
				match[2] = unquoted;
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ expando ][ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem, context ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.substr( result.length - check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.substr( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				return function( elem ) {
					var node, diff,
						parent = elem.parentNode;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					if ( parent ) {
						diff = 0;
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								diff++;
								if ( elem === node ) {
									break;
								}
							}
						}
					}

					// Incorporate the offset (or cast to NaN), then check against cycle size
					diff -= last;
					return diff === first || ( diff % first === 0 && diff / first >= 0 );
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputPseudo("radio"),
		"checkbox": createInputPseudo("checkbox"),
		"file": createInputPseudo("file"),
		"password": createInputPseudo("password"),
		"image": createInputPseudo("image"),

		"submit": createButtonPseudo("submit"),
		"reset": createButtonPseudo("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		},

		// Positional types
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			for ( var i = 0; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			for ( var i = 1; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			for ( var i = argument < 0 ? argument + length : argument; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

function siblingCheck( a, b, ret ) {
	if ( a === b ) {
		return ret;
	}

	var cur = a.nextSibling;

	while ( cur ) {
		if ( cur === b ) {
			return -1;
		}

		cur = cur.nextSibling;
	}

	return 1;
}

sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	} :
	function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
[0, 0].sort( sortOrder );
baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		i = 1,
		j = 0;

	hasDuplicate = baseHasDuplicate;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ expando ][ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			tokens.push( matched = new Token( match.shift() ) );
			soFar = soFar.slice( matched.length );

			// Cast descendant combinators to space
			matched.type = match[0].replace( rtrim, " " );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {

				tokens.push( matched = new Token( match.shift() ) );
				soFar = soFar.slice( matched.length );
				matched.type = type;
				matched.matches = match;
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && combinator.dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( checkNonElements || elem.nodeType === 1  ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( !xml ) {
				var cache,
					dirkey = dirruns + " " + doneName + " ",
					cachedkey = dirkey + cachedruns;
				while ( (elem = elem[ dir ]) ) {
					if ( checkNonElements || elem.nodeType === 1 ) {
						if ( (cache = elem[ expando ]) === cachedkey ) {
							return elem.sizset;
						} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
							if ( elem.sizset ) {
								return elem;
							}
						} else {
							elem[ expando ] = cachedkey;
							if ( matcher( elem, context, xml ) ) {
								elem.sizset = true;
								return elem;
							}
							elem.sizset = false;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( checkNonElements || elem.nodeType === 1 ) {
						if ( matcher( elem, context, xml ) ) {
							return elem;
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && tokens.slice( 0, i - 1 ).join("").replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && tokens.join("")
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Nested matchers should use non-integer dirruns
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.E);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = superMatcher.el;
			}

			// Add elements passing elementMatchers directly to results
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					for ( j = 0; (matcher = elementMatchers[j]); j++ ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++superMatcher.el;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				for ( j = 0; (matcher = setMatchers[j]); j++ ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	superMatcher.el = 0;
	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ expando ][ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed, xml ) {
	var i, tokens, token, type, find,
		match = tokenize( selector ),
		j = match.length;

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && !xml &&
					Expr.relative[ tokens[1].type ] ) {

				context = Expr.find["ID"]( token.matches[0].replace( rbackslash, "" ), context, xml )[0];
				if ( !context ) {
					return results;
				}

				selector = selector.slice( tokens.shift().length );
			}

			// Fetch a seed set for right-to-left matching
			for ( i = matchExpr["POS"].test( selector ) ? -1 : tokens.length - 1; i >= 0; i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( rbackslash, "" ),
						rsibling.test( tokens[0].type ) && context.parentNode || context,
						xml
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && tokens.join("");
						if ( !selector ) {
							push.apply( results, slice.call( seed, 0 ) );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		xml,
		results,
		rsibling.test( selector )
	);
	return results;
}

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,

			// qSa(:focus) reports false when true (Chrome 21), no need to also add to buggyMatches since matches checks buggyQSA
			// A support test would require too much code (would include document ready)
			rbuggyQSA = [ ":focus" ],

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [ ":active" ],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'/>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		// rbuggyQSA always contains :focus, so no need for a length check
		rbuggyQSA = /* rbuggyQSA.length && */ new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && !rbuggyQSA.test( selector ) ) {
				var groups, i,
					old = true,
					nid = expando,
					newContext = context,
					newSelector = context.nodeType === 9 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + groups[i].join("");
					}
					newContext = rsibling.test( selector ) && context.parentNode || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							newSelector
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( "!=", pseudos );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active and :focus, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && !rbuggyQSA.test( expr ) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// Deprecated
Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Back-compat
function setFilters() {}
Expr.filters = setFilters.prototype = Expr.pseudos;
Expr.setFilters = new setFilters();

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, l, length, n, r, ret,
			self = this;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		ret = this.pushStack( "", "find", selector );

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rcheckableType = /^(?:checkbox|radio)$/,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "X<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
		}
	},

	after: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( elem.getElementsByTagName( "*" ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		if ( !isDisconnected( this[0] ) ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		}

		return this.length ?
			this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
			this;
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = [].concat.apply( [], args );

		var results, first, fragment, iNoClone,
			i = 0,
			value = args[0],
			scripts = [],
			l = this.length;

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call( this, i, table ? self.html() : undefined );
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			results = jQuery.buildFragment( args, this, scripts );
			fragment = results.fragment;
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				// Fragments from the fragment cache must always be cloned and never used in place.
				for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						i === iNoClone ?
							fragment :
							jQuery.clone( fragment, true, true )
					);
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;

			if ( scripts.length ) {
				jQuery.each( scripts, function( i, elem ) {
					if ( elem.src ) {
						if ( jQuery.ajax ) {
							jQuery.ajax({
								url: elem.src,
								type: "GET",
								dataType: "script",
								async: false,
								global: false,
								"throws": true
							});
						} else {
							jQuery.error("no ajax");
						}
					} else {
						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
					}

					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				});
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	if ( nodeName === "object" ) {
		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;

	// IE blanks contents when cloning scripts
	} else if ( nodeName === "script" && dest.text !== src.text ) {
		dest.text = src.text;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, context, scripts ) {
	var fragment, cacheable, cachehit,
		first = args[ 0 ];

	// Set context from what may come in as undefined or a jQuery collection or a node
	// Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
	// also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
	context = context || document;
	context = !context.nodeType && context[0] || context;
	context = context.ownerDocument || context;

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		// Mark cacheable and look for a hit
		cacheable = true;
		fragment = jQuery.fragments[ first ];
		cachehit = fragment !== undefined;
	}

	if ( !fragment ) {
		fragment = context.createDocumentFragment();
		jQuery.clean( args, context, fragment, scripts );

		// Update the cache, but only store false
		// unless this is a second parsing of the same content
		if ( cacheable ) {
			jQuery.fragments[ first ] = cachehit && fragment;
		}
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			l = insert.length,
			parent = this.length === 1 && this[0].parentNode;

		if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
			insert[ original ]( this[0] );
			return this;
		} else {
			for ( ; i < l; i++ ) {
				elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			clone;

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
			safe = context === document && safeFragment,
			ret = [];

		// Ensure that context is a document
		if ( !context || typeof context.createDocumentFragment === "undefined" ) {
			context = document;
		}

		// Use the already-created safe fragment if context permits
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Ensure a safe container in which to render the html
					safe = safe || createSafeFragment( context );
					div = context.createElement("div");
					safe.appendChild( div );

					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Go to html and back, then peel off extra wrappers
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					depth = wrap[0];
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						hasBody = rtbody.test(elem);
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;

					// Take out of fragment container (we need a fresh div each time)
					div.parentNode.removeChild( div );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				jQuery.merge( ret, elem );
			}
		}

		// Fix #11356: Clear elements from safeFragment
		if ( div ) {
			elem = div = safe = null;
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					fixDefaultChecked( elem );
				} else if ( typeof elem.getElementsByTagName !== "undefined" ) {
					jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
				}
			}
		}

		// Append elements to a provided document fragment
		if ( fragment ) {
			// Special handling of each script element
			handleScript = function( elem ) {
				// Check if we consider it executable
				if ( !elem.type || rscriptType.test( elem.type ) ) {
					// Detach the script and store it in the scripts array (if provided) or the fragment
					// Return truthy to indicate that it has been handled
					return scripts ?
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
						fragment.appendChild( elem );
				}
			};

			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				// Check if we're done after handling an executable script
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
					// Append to fragment and handle embedded scripts
					fragment.appendChild( elem );
					if ( typeof elem.getElementsByTagName !== "undefined" ) {
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

						// Splice the scripts into ret after their former ancestor and advance our index beyond them
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						i += jsTags.length;
					}
				}
			}
		}

		return ret;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( elem.removeAttribute ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						jQuery.deletedIds.push( id );
					}
				}
			}
		}
	}
});
// Limit scope pollution from any deprecated API
(function() {

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
	browser.webkit = true;
} else if ( browser.webkit ) {
	browser.safari = true;
}

jQuery.browser = browser;

jQuery.sub = function() {
	function jQuerySub( selector, context ) {
		return new jQuerySub.fn.init( selector, context );
	}
	jQuery.extend( true, jQuerySub, this );
	jQuerySub.superclass = this;
	jQuerySub.fn = jQuerySub.prototype = this();
	jQuerySub.fn.constructor = jQuerySub;
	jQuerySub.sub = this.sub;
	jQuerySub.fn.init = function init( selector, context ) {
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
			context = jQuerySub( context );
		}

		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	};
	jQuerySub.fn.init.prototype = jQuerySub.fn;
	var rootjQuerySub = jQuerySub(document);
	return jQuerySub;
};

})();
var curCSS, iframe, iframeDoc,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

	eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem, display,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {
			display = curCSS( elem, "display" );

			if ( !values[ index ] && display !== "none" ) {
				jQuery._data( elem, "olddisplay", display );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state, fn2 ) {
		var bool = typeof state === "boolean";

		if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
			return eventsToggle.apply( this, arguments );
		}

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, numeric, extra ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( numeric || extra !== undefined ) {
			num = parseFloat( val );
			return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: To any future maintainer, we've window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	curCSS = function( elem, name ) {
		var ret, width, minWidth, maxWidth,
			computed = window.getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	curCSS = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			// we use jQuery.css instead of curCSS here
			// because of the reliableMarginRight CSS hook!
			val += jQuery.css( elem, extra + cssExpand[ i ], true );
		}

		// From this point on we use curCSS for maximum performance (relevant in animations)
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		valueIsBorderBox = true,
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox
		)
	) + "px";
}


// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	if ( elemdisplay[ nodeName ] ) {
		return elemdisplay[ nodeName ];
	}

	var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
		display = elem.css("display");
	elem.remove();

	// If the simple way fails,
	// get element's real default display by attaching it to a temp iframe
	if ( display === "none" || display === "" ) {
		// Use the already-created iframe if possible
		iframe = document.body.appendChild(
			iframe || jQuery.extend( document.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			})
		);

		// Create a cacheable copy of the iframe document on first call.
		// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
		// document to it; WebKit & Firefox won't allow reusing the iframe document.
		if ( !iframeDoc || !iframe.createElement ) {
			iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
			iframeDoc.write("<!doctype html><html><body>");
			iframeDoc.close();
		}

		elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

		display = curCSS( elem, "display" );
		document.body.removeChild( iframe );
	}

	// Store the correct default display
	elemdisplay[ nodeName ] = display;

	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, "display" ) ) ) {
					return jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					});
				} else {
					return getWidthOrHeight( elem, name, extra );
				}
			}
		},

		set: function( elem, value, extra ) {
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
				style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						return curCSS( elem, "marginRight" );
					}
				});
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						var ret = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i,

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ],
				expanded = {};

			for ( i = 0; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rselectTextarea = /^(?:select|textarea)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
			i = 0,
			length = dataTypes.length;

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var selection,
		list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters );

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	// Don't do a request if no elements are being requested
	if ( !this.length ) {
		return this;
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// Request the remote document
	jQuery.ajax({
		url: url,

		// if "type" variable is undefined, then "GET" method will be used
		type: type,
		dataType: "html",
		data: params,
		complete: function( jqXHR, status ) {
			if ( callback ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			}
		}
	}).done(function( responseText ) {

		// Save response for use in complete callback
		response = arguments;

		// See if a selector was specified
		self.html( selector ?

			// Create a dummy div to hold the results
			jQuery("<div>")

				// inject the contents of the document in, removing the scripts
				// to avoid any 'Permission Denied' errors in IE
				.append( responseText.replace( rscript, "" ) )

				// Locate the specified elements
				.find( selector ) :

			// If not, just inject the full result
			responseText );

	});

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // ifModified key
			ifModifiedKey,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || strAbort;
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ ifModifiedKey ] = modified;
					}
					modified = jqXHR.getResponseHeader("Etag");
					if ( modified ) {
						jQuery.etag[ ifModifiedKey ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.always( tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();

		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ],
		converters = {},
		i = 0;

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
var oldCallbacks = [],
	rquestion = /\?/,
	rjsonp = /(=)\?(?=&|$)|\?\?/,
	nonce = jQuery.now();

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		data = s.data,
		url = s.url,
		hasCallback = s.jsonp !== false,
		replaceInUrl = hasCallback && rjsonp.test( url ),
		replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
			!( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
			rjsonp.test( data );

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		overwritten = window[ callbackName ];

		// Insert callback into url or form data
		if ( replaceInUrl ) {
			s.url = url.replace( rjsonp, "$1" + callbackName );
		} else if ( replaceInData ) {
			s.data = data.replace( rjsonp, "$1" + callbackName );
		} else if ( hasCallback ) {
			s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});
var xhrCallbacks,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									try {
										responses.text = xhr.responseText;
									} catch( e ) {
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback, 0 );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1,
				maxIterations = 20;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	}, 0 );
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		index = 0,
		tweenerIndex = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end, easing ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			anim: animation,
			queue: animation.opts.queue,
			elem: elem
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	var index, prop, value, length, dataShow, toggle, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( "hidden" in dataShow ) {
			hidden = dataShow.hidden;
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery.removeData( elem, "fxshow", true );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing any value as a 4th parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, false, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ||
			// special check for .toggle( handler, handler, ... )
			( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations resolve immediately
				if ( empty ) {
					anim.stop( true );
				}
			};

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.interval = 13;

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
var rroot = /^(?:body|html)$/i;

jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	if ( (body = doc.body) === elem ) {
		return jQuery.offset.bodyOffset( elem );
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== "undefined" ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	clientTop  = docElem.clientTop  || body.clientTop  || 0;
	clientLeft = docElem.clientLeft || body.clientLeft || 0;
	scrollTop  = win.pageYOffset || docElem.scrollTop;
	scrollLeft = win.pageXOffset || docElem.scrollLeft;
	return {
		top: box.top  + scrollTop  - clientTop,
		left: box.left + scrollLeft - clientLeft
	};
};

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.body;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					 top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, value, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

})( window );
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));

/**
 * jQuery LazyLoad Plugin 1.0 (requires jQuery 1.7+)
 * @author Jay Hung
 *
 * @return jQuery object
 *
 * Accepts a jQuery selected array of images with data-src attributes, and "lazy loads" the images by
 * writing the value of the img element's data-src attribute to the src attribute.
 *
 * Ignores any img elements with an existing src attribute, or with a missing data-src attribute.
 *
 * Control of when the "lazy load" occurs is called is handled outside of this function call for max flexibility.
 *
 * Example Use:
 *
 *		// Ex 1: lazy loads all images within #myContainer on window onload
 * 		$(window).load(function(){
 *			$("#myContainer img").lazyLoadImg();
 *		});
 *
 *
 *		// Ex 2: lazy loads all images within #myContainer on window scroll
 *		$(window).scroll(function(){
 *			$("#myContainer img").lazyLoadImg();
 *		});	
 *
 */
(function($) {
	$.fn.lazyLoadImg = function() {
		this.each(function(){
			if ($(this).attr("src")) return $(this);	// if image elem already has src attrib, do nothing
			
			var imgUrl = $(this).attr("data-src");		// read data-src value
			if (imgUrl != "undefined")
				$(this).attr("src", imgUrl);			// dynamically write in src attribute to image elem
			
			return $(this);								// return jQuery object for chaining
		});
	};
})($);
if (!sbweb) var sbweb = function(){
return {
params : {}
};
}();

if (!sbweb.util) sbweb.util = function() {
return {
getQueryString: function (sUrl){
var queryString;
queryString = sUrl.split("?");
if (queryString.length > 1){
console.log(queryString[1]);
return queryString[1];
}
else{
return "";
}
},
getQueryParams: function (qString){
var queryParams, tempString;
tempString = sbweb.util.getQueryString(qString);
if (tempString.length > 0){
qString = tempString;
}
queryParams = qString.split("&");
if (queryParams.length > 0){
return queryParams;
}
else{
return "";
}
},
addURLParam: function (elemIdentifier, pVariable, pValue) {
$(elemIdentifier).ready(function() {
$("body").find("a" + elemIdentifier).each(function(){
if ((this.href.indexOf("?")) < 0){
this.href = this.href + "?" + pVariable + "=" + pValue;
}
else{
this.href = this.href + "&" + pVariable + "=" + pValue;
}
});
});
},
appendToUrlParam: function(elemIdentifier, pVariable, pValue){
var urlParams, pageUrl;
$(elemIdentifier).ready(function() {
$("body").find("a" + elemIdentifier).each(function(){
urlParams = this.href.split("?");
pageUrl = urlParams[0] + "?";
urlParams = urlParams[1].split("&");
for(i = 0; i < urlParams.length; i++){
if ((urlParams[i].indexOf(pVariable + "=")) >-1){
urlParams[i] = urlParams[i] + pValue;
}
if (i > 0){
pageUrl = pageUrl + "&" + urlParams[i];
}
else{
pageUrl = pageUrl + urlParams[i];
}
}
this.href = pageUrl;
});
});
}
};
}();


if (!sbweb.util.cookies) sbweb.util.cookies = function() {
this.getExpDate = function(pDays, pHours, pMinutes) {
var expDate = new Date();
if (typeof pDays == "number" && typeof pHours == "number" && typeof pMinutes == "number") {
expDate.setDate(expDate.getDate() + parseInt(pDays));
expDate.setHours(expDate.getHours() + parseInt(pHours));
expDate.setMinutes(expDate.getMinutes() + parseInt(pMinutes));
return expDate.toGMTString();
}
}
this.getCookieValue = function(pOffset) {
var endstr = document.cookie.indexOf(";", pOffset);
if (endstr == -1) {
endstr = document.cookie.length;
}
return unescape(document.cookie.substring(pOffset, endstr));
}
return {
getCookie : function(pName) {
var arg = pName + "=";
var alen = arg.length;
var clen = document.cookie.length;
var i = 0;
while (i < clen) {
var j = i + alen;
if (document.cookie.substring(i,j) == arg) {
return(getCookieValue(j));
}
i = document.cookie.indexOf(" ", i) + 1;
if (i == 0) break;
}
return("");
},
setCookie : function(name, value, expires, path, domain, secure) {
document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires : "") + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
},
deleteCookie : function(name, path, domain) {
if (this.getCookie(name)) {
document.cookie = name + "=" + ((path) ? "; path=" + path : "") + ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
}
}
};
}();


/* propertySegmentation.js
	TODO: explain and link to the wiki, with instructions to add product and property definitions there
	TODO: explain dependencies: jquery and jquery.cookie.
	TODO: add asserts?
	TODO: Should bThrowErrors be true or false?  Starting with true, since this is new.
	                               
	This js exposes the following functions, all called through the namespace propertySegmentation
	Getters:
		propertySegmentation.getNumVisits(propertyName)
		propertySegmentation.getProductPurchased(propertyName)
		propertySegmentation.getPurchaseDate(propertyName)
		propertySegmentation.getString()
		propertySegmentation.getStringNoTimeStamp()
	Setters:
		propertySegmentation.updateVisit(propertyName)
		propertySegmentation.setProductPurchased(propertyName, productPurchased, purchaseDate)
		
	A note on dates:  The whole file uses milliseconds since 1970 as the date format, so that's what
	the client should pass in and expect to get out.  In js, you can initialize a Date object with that
	as the param, and you can get that as output by calling Date.getTime();
	
	IMPORTANT - A note on SiteCatalyst: By default, all updates will try to set the propertySegmentation string as the value
	of SiteCatalyst eVar12 (using the object s).  If you do NOT have SiteCatalyst, or for whatever reason do not
	want things that update the cookie to update SiteCatalyst as well, you must call the following line to disable it:
		propertySegmentation.disableSiteCatalyst();
*/

var propertySegmentation = new function () {
	/* Global constants */
	
	// Should we throw errors?
	var bThrowErrors = false;
	// By default, we will use sitecatalyst
	bUseSiteCatalyst = true;
	
	// Delimiters
	var gIntraPropertyDelimiter = ':';
	var gInterPropertyDelimiter = '|';

	// The name of the cookie
	var gPropertySegmentCookieName = 'propertySegments';
	// 1800000 milliseconds = 30 minutes
	var gknMillisecondsRecency = 1800000;
	// The domain to use - currently .intuit.com, so it's available across different properties
	var gDomainForCookie = '.intuit.com';
	// How long to persist the cookie - let's go with one year for now
	var gNumDaysPersistent = 365;
	// What's our max number of tracked visits
	var gknMaxVisits = 99;
	// What path to set it on - '/', so it's available on all intuit.com pages
	var gPathForCookie = '/';

	// Array locations for property information - store as constants for easy addition/modification
	var gCurrentIndex = 0;
	var gPropertyNameIndex = gCurrentIndex++;
	var gNumVisitsIndex = gCurrentIndex++;
	var gProductPurchasedIndex = gCurrentIndex++;
	var gPurchaseDateIndex = gCurrentIndex++;

	// Construct the (empty) allPropertyInfo object on which all else relies
	var gAllPropertyInfo = new allPropertyInfo();


	var gMostVisitedProperty = '';

	/****************** PUBLIC **************/
	/* Section for the functions the client will actually call */

	/* Getters */

	// Returns the number of visits a user has made to a particular property
	this.getNumVisits = function (propertyName)
	{
		try
		{
			// Always make sure the allPropertyInfo object is initiated, so we don't clobber values.
			gAllPropertyInfo.init();
			
			// Get or create this property's info
			var thisPropertyInfo = getOrCreatePropertyInfo(propertyName);
			
			// Return the number of visits
			return thisPropertyInfo.getNumVisits();
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}

	// Returns the product a user has purchased for this property, or a Null string if no product is present.
	this.getProductPurchased = function (propertyName)
	{
		try
		{
			// Always make sure the allPropertyInfo object is initiated, so we don't clobber values.
			gAllPropertyInfo.init();
			
			// Get or create this property's info
			var thisPropertyInfo = getOrCreatePropertyInfo(propertyName);
			
			// Return the product purchased
			return thisPropertyInfo.getProductPurchased();
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}

	// Returns the date when a user purchased a product for this property, or a Null string if no product/date present.
	this.getPurchaseDate = function (propertyName)
	{
		try
		{
			// Always make sure the allPropertyInfo object is initiated, so we don't clobber values.
			gAllPropertyInfo.init();
			
			// Get or create this property's info
			var thisPropertyInfo = getOrCreatePropertyInfo(propertyName);
			
			// Return the purchase date
			return thisPropertyInfo.getPurchaseDate();
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}
	
	// Gets the string representing all the property segmentation info
	this.getString = function ()
	{
		try
		{
			// Always make sure the allPropertyInfo object is initiated, so we don't clobber values.
			gAllPropertyInfo.init();
			
			// Return the allPropertyInfo string
			return gAllPropertyInfo.getString();
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}
	
	// Gets the string representing all the property segmentation info, minus the timestamp
	this.getStringNoTimeStamp = function ()
	{
		try
		{
			// Always make sure the allPropertyInfo object is initiated, so we don't clobber values.
			gAllPropertyInfo.init();
			
			// Return the allPropertyInfo string
			return gAllPropertyInfo.getStringNoTimeStamp();
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}

	// Returns property which has the most visits
	this.getMostVisitedProperty = function ()
	{
		try
		{
			// Always make sure the allPropertyInfo object is initiated, so we don't clobber values.
			gAllPropertyInfo.init();
						
			return gMostVisitedProperty;
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}
	
	/* Setters */

	// This method will indicate that the user visited the property.
	// This will increment the numVisits if the user already visited, or create the propertyInfo if they didn't.
	// Then this will write the updated info appropriate places.
	this.updateVisit = function (propertyName)
	{
		try
		{
			// Always make sure the allPropertyInfo object is initiated, so we don't clobber values.
			gAllPropertyInfo.init();
			
			// Get or create this property's info
			var thisPropertyInfo = getOrCreatePropertyInfo(propertyName);
			
			var currentTime = new Date().getTime();
			var cookieTimeStamp = gAllPropertyInfo.getTimeStamp();
			// If there's no timestamp yet, or it's more than our recency measure, then increment the visits.
			// Also, even if the timestamp doesn't imply that we should increment, if the numVisits is 0 we know that we still should.
			if (!cookieTimeStamp || (currentTime - cookieTimeStamp > gknMillisecondsRecency) || thisPropertyInfo.getNumVisits() == 0)
			{
				// Increment the visits, but only up to our stated max
				if (thisPropertyInfo.getNumVisits() < gknMaxVisits)
				{
					thisPropertyInfo.incrementVisits();
				}
			}
				
			// Update the timestamp for the full object
			gAllPropertyInfo.updateTimeStamp();
			
			// Now write the data to the appropriate places (currently the cookie and potentially sitecatalyst).
			writeSegmentationData();
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}

	// This method will indicate that the user purchased a particular product for a property.
	// Pass in a consistent product name, and add it to the wiki (listed above).
	// If you pass in purchaseDate, use milliseconds since 1970 (js Date.getTime() returns ms since 1970).
	// If you leave it blank, we'll have an empty string.
	this.setProductPurchased = function (propertyName, productPurchased, purchaseDate)
	{
		try
		{
			// Always make sure the allPropertyInfo object is initiated, so we don't clobber values.
			gAllPropertyInfo.init();
			
			// Get or create this property's info
			var thisPropertyInfo = getOrCreatePropertyInfo(propertyName);
			
			// Set the product purchased
			thisPropertyInfo.setProductPurchased(productPurchased, purchaseDate);
			
			// Update the timestamp for the full object
			gAllPropertyInfo.updateTimeStamp();
			
			// Now write back to various places.
			writeSegmentationData();
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}
	
	// This method will tell the functions not to set siteCatalyst data.
	this.disableSiteCatalyst = function () { bUseSiteCatalyst = false; }

	/****************** PRIVATE **************/
	/* Section for the functions the client will never call directly */

	/* Section for individual propertyInfo object and associated methods */

	// Constructor - creates a propertyInfo object which knows only the name of the property.
	function propertyInfo (propertyName)
	{
		try
		{
			// I don't really want any of these fields to be non-existent, since this is an array, not a map.
			// when initializing the values, numVisits is 0, productPurchased and purchaseDate are empty strings.
			this.propertyInfoArray = [/*propertyName=*/ propertyName, /*numVisits=*/ 0, /*productPurchased=*/ '', /*purchaseDate=*/ '']
			
			// starts with no relevant data
			this.hasData = false;
			
			// Method for initializing the values from a string (probably pulled from a cookie)
			this.initFromString = initPropertyInfoObjectFromString;
			
			// Getters
			this.getPropertyName = getPropertyName;
			this.getNumVisits = getNumVisitsForProperty;
			this.getProductPurchased = getProductPurchasedForProperty;
			this.getPurchaseDate = getPurchaseDateForProperty;
			
			// Setters
			this.setNumVisits = setNumVisitsForProperty;
			this.incrementVisits = incrementVisitsForProperty;
			this.setProductPurchased = setProductPurchasedForProperty;
			this.getString = getPropertyInfoString;
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}

	// Pass in a string of format "<propertyName>:<numVisits>:<productPurchased>:<purchaseDate>" to initialize
	function initPropertyInfoObjectFromString(propertyInfoString)
	{
		try
		{
			// Split the string up and load the 4 pieces into the array
			this.propertyInfoArray = propertyInfoString.split(gIntraPropertyDelimiter);
			
			// if we're initing from a string, then we should assume there's data we want to hang on to there
			this.hasData = true;
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}

	// Getters - self explanatory
	function getPropertyName() { return this.propertyInfoArray[gPropertyNameIndex]; }
	function getNumVisitsForProperty() { return this.propertyInfoArray[gNumVisitsIndex]; }
	function getProductPurchasedForProperty() { return this.propertyInfoArray[gProductPurchasedIndex]; }
	function getPurchaseDateForProperty() { return this.propertyInfoArray[gPurchaseDateIndex]; }
	function getPropertyInfoString() { return this.propertyInfoArray.join(gIntraPropertyDelimiter);  }

	// Setters
	function setNumVisitsForProperty(numVisits) 
	{ 
		this.propertyInfoArray[gNumVisitsIndex] = numVisits;
		
		// Now it has data
		this.hasData = true;
	}
	function incrementVisitsForProperty() { this.setNumVisits(Number(this.getNumVisits()) + 1); }

	// Pass in the productPurchased and the purchaseDate (formatted in milliseconds from 1970)
	// If no date is passed in, date will have (and later return) an empty string.
	function setProductPurchasedForProperty(productPurchased, purchaseDate)
	{
		try
		{
			// Set the productPurchased
			this.propertyInfoArray[gProductPurchasedIndex] = productPurchased;
			
			// If the purchaseDate isn't passed in, we'll use an empty string.
			if (!purchaseDate)
			{
				var purchaseDate = '';
			}
			
			// Set the purchase date
			this.propertyInfoArray[gPurchaseDateIndex] = purchaseDate;
			
			// Now it has data
			this.hasData = true;
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}

	/* End of individual propertyInfo object section */
	/*********************************************************************/


	/*********************************************************************/
	/* Start section for allPropertyInfo object and associated methods */

	// Constructor - creates a blank allPropertyInfo object.
	function allPropertyInfo ()
	{
		try
		{
			// Not inited yet
			this.bInited = false;
			
			// Init method
			this.init = initAllPropertyInfo;
			
			// Getters
			this.getTimeStamp = getAllPropertyInfoTimeStamp;
			this.getPropertyInfo = getPropertyInfoFromAllPropertyInfo;
			this.getString = function() { return xGetAllPropertyInfoString(this, /*kbIncludeTimeStamp = */ true); }
			this.getStringNoTimeStamp = function() { return xGetAllPropertyInfoString(this, /*kbIncludeTimeStamp = */ false); }
			
			// Setters
			this.addPropertyInfo = addPropertyInfo;
			this.updateTimeStamp = updateAllPropertyInfoTimeStamp;
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}

	// Init method for allPropertyInfo object
	function initAllPropertyInfo()
	{
		try
		{
			// Only do things if not already inited
			if (!this.bInited)
			{
				// Create the empty collection of propertyInfo objects
				// NOTE:: since this is an associative array, and that doesn't really exist in js,
				// this is implemented as an object.  Don't try to run array methods on it!
				this.allPropertyInfoObjectCollection = new Object();
				
				// Get the string from the cookie
				var allPropertyInfoString = $.cookie(gPropertySegmentCookieName);
				
				// Only do stuff if we have the string and it's non-empty
				if (allPropertyInfoString && allPropertyInfoString != '')
				{
					
					// Get an array of strings, each of which represents one property's info
					var allPropertyInfoStringArray = allPropertyInfoString.split(gInterPropertyDelimiter);
					
					// The time is the first value in the string array, which we should store and remove
					this.timeStamp = allPropertyInfoStringArray.shift();
					
					// Go through the array of individual property strings, adding them to the collection.
					// Concurrently determine property with the most visits
					var visits = 0;
					for (var i in allPropertyInfoStringArray)
					{
						
						var curVisits = allPropertyInfoStringArray[i].split(gIntraPropertyDelimiter)[1];
						if (curVisits > visits) {
							visits = curVisits;
							gMostVisitedProperty = allPropertyInfoStringArray[i].split(gIntraPropertyDelimiter)[0];
						}
						
						// Create the propertyInfo Object.  It's okay that we're not passing a propertyName, since we're
						// going to init the whole thing in a sec anyway.
						var onePropertyInfo = new propertyInfo();
						
						// Init the object with the string for that property
						onePropertyInfo.initFromString(allPropertyInfoStringArray[i]);
											
						// Add it to the allPropertyInfoObjectCollection, mapped to the propertyName.
						this.allPropertyInfoObjectCollection[onePropertyInfo.getPropertyName()] = onePropertyInfo;
					}
				}
				
				// All done
				this.bInited = true;
			}
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}

	// Get the existing timestamp
	function getAllPropertyInfoTimeStamp()
	{
		return this.timeStamp;
	}

	// Get the propertyInfo object for a particular propertyName
	function getPropertyInfoFromAllPropertyInfo(propertyName)
	{
		return this.allPropertyInfoObjectCollection[propertyName];
	}

	// Add a propertyInfo object for a particular propertyName
	function addPropertyInfo(propertyInfoObject)
	{
		this.allPropertyInfoObjectCollection[propertyInfoObject.getPropertyName()] = propertyInfoObject;
	}

	// Update the timestamp with the current time.
	function updateAllPropertyInfoTimeStamp() { this.timeStamp = new Date().getTime(); }

	// Get the string that represents allPropertyInfo.  Usually for use in setting the cookie or siteCatalyst.
	// The parameter is a boolean for whether to include the timestamp (for example, we don't in siteCatalyst)
	function xGetAllPropertyInfoString(propertySegmentationObject, kbIncludeTimeStamp)
	{
		try
		{
			var allPropertyInfoString = '';
			
			// Only include timestamp if we're told to.
			if (kbIncludeTimeStamp) allPropertyInfoString += propertySegmentationObject.timeStamp + gInterPropertyDelimiter;
			
			// What a terrible way to do this - anyone know a better one?
			bIsFirstLoop = true;
			
			// Now add the individual object strings.
			for (i in propertySegmentationObject.allPropertyInfoObjectCollection)
			{
				// We only want to add it if it actually has data
				if (propertySegmentationObject.allPropertyInfoObjectCollection[i].hasData)
				{
					// We don't want the delimiter for the first item.
					if (!bIsFirstLoop) allPropertyInfoString += gInterPropertyDelimiter;
					
					// Now it's not the first anymore.
					bIsFirstLoop = false;
					
					allPropertyInfoString += propertySegmentationObject.allPropertyInfoObjectCollection[i].getString();
				}
			}
			
			return allPropertyInfoString;
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}

	/* End section for allPropertyInfo object and associated methods */
	/*********************************************************************/

	/*********************************************************************/
	/* Start section for auxiliary methods */

	// Call to get a propertyInfoObject, or create it if it doesn't exist.
	function getOrCreatePropertyInfo(propertyName)
	{
		try
		{
			// Get the current info for this property, if any.
			var thisPropertyInfo = gAllPropertyInfo.getPropertyInfo(propertyName);
			
			// If the object doesn't already exist, create it.
			if (!thisPropertyInfo)
			{
				thisPropertyInfo = new propertyInfo(propertyName);
				gAllPropertyInfo.addPropertyInfo(thisPropertyInfo);
			}
			
			return thisPropertyInfo;
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}
	
	// Call to write all the segmentation data to the relevant storage areas.
	// Currently covers writing to the cookie and, optionally, writing to siteCatalyst.
	function writeSegmentationData()
	{
		try
		{
			// Always write the string to the cookie.
			writeSegmentationStringToCookie();
			
			// Set SiteCatalyst code if the boolean says we should.
			if (bUseSiteCatalyst)
			{
				try
				{
					if (s)
					{
						// We use eVar 12 for this.
						s.prop12 = s.eVar12 = gAllPropertyInfo.getStringNoTimeStamp();
					}
				}
				catch (err)
				{
					if (bThrowErrors) alert('Property Segmentation Error with SiteCatalyst: ' + err.message);
				}
			}
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}
		
	// Call to write the allPropertyInfo string to the cookie
	function writeSegmentationStringToCookie()
	{
		try
		{
			// Creating an object for cookie options - in this case the domain and expiration
			var cookieOptions = new Object();
			
			// See the constants above
			cookieOptions.domain = gDomainForCookie;
			cookieOptions.expires = gNumDaysPersistent;
			cookieOptions.path = gPathForCookie;
			
			// Write to the cookie
			$.cookie(gPropertySegmentCookieName, gAllPropertyInfo.getString(), cookieOptions);
		}
		catch (err)
		{
			if (bThrowErrors) alert('Property Segmentation Error: ' + err.message);
		}
	}
	
	//Find out if any site has a product owned.
	this.checkForAnyProduct = function() 
	{
		var definedProperties = new Array('QB', 'EMS', 'QBO', 'IOP', 'PSD', 'GoPay', 'IWS');
		for(i=0;i < definedProperties.length;i++){
			var site = definedProperties[i];
			if(this.getProductPurchased(''+ site + '')){
				return this.getProductPurchased(''+ site + '');
			}
		}
		return false;
	}
};
/**
 *
 * This is the beginning of an Intuit front end application infrastructure.
 * It will evolve into a highly modular library that will contain functionality
 * to handle mostly any scenario encountered within Intuit.
 *
 * Will start small within CMT and hopefully move up from there! ;)
 *
 * For details, please see Norberth
 *
 */
(function($, window, document, undefined){

    if (typeof $ === 'undefined') {
        throw 'Could not load jQuery. Please ensure jQuery has loaded before including this file.';
    }

    var Intuit = window.Intuit || {},
        $window = $(window);

    Intuit.Utils        = Intuit.Utils      || {};
    Intuit.Library      = Intuit.Library    || {};
    Intuit.Tests        = Intuit.Tests      || {};
    Intuit.EMS          = Intuit.EMS        || {};
    Intuit.AEMMode      = Intuit.AEMMode    || {};

    // caching
    //TODO: remove Intuit.$window below and other instances
    Intuit.$window      = $window;

    window.Intuit = Intuit;

    /************************************************
     * core, jQuery embedded plugins
     */

    // defers the execution of the callback until the stack is clear
    $.extend($, (function(){
        var timeoutId;
        return {
            'defer' : function (callback) {
                timeoutId = setTimeout(function(){
                    clearTimeout(timeoutId);
                    callback();
                }, 0);
                return $;
            }
        }
    })());

    // guaranteed "window load" execution, slightly delayed to prevent race conditions
    $.extend((function(){
        var components = {},
            delay = 50,
            triggered = false,
            $window = $(window);

        $window.one('load', function(){
            setTimeout(function(){
                var fn;
                triggered = true;
                for (fn in components) {
                    components[fn] && components[fn]();
                }
                // add window.load hooks
                $('body').addClass('wload');
                $window.trigger('wload');

                // automatically load any img elements marked for lazyload with class .lazy
                $(".ccontainer .lazy").lazyLoadImg();
            }, delay);
        });

        return {
            wload: function (fn) {
                triggered ? fn() : components[fn] = fn;
                return $;
            }
        };
    })());

}(jQuery, window, document));


/*
 * SimpleModal 1.4.4 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2013 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sun, Jan 20 2013 15:58:56 -0800
 */

/**
 * SimpleModal is a lightweight jQuery plugin that provides a simple
 * interface to create a modal dialog.
 *
 * The goal of SimpleModal is to provide developers with a cross-browser
 * overlay and container that will be populated with data provided to
 * SimpleModal.
 *
 * There are two ways to call SimpleModal:
 * 1) As a chained function on a jQuery object, like $('#myDiv').modal();.
 * This call would place the DOM object, #myDiv, inside a modal dialog.
 * Chaining requires a jQuery object. An optional options object can be
 * passed as a parameter.
 *
 * @example $('<div>my data</div>').modal({options});
 * @example $('#myDiv').modal({options});
 * @example jQueryObject.modal({options});
 *
 * 2) As a stand-alone function, like $.modal(data). The data parameter
 * is required and an optional options object can be passed as a second
 * parameter. This method provides more flexibility in the types of data
 * that are allowed. The data could be a DOM object, a jQuery object, HTML
 * or a string.
 *
 * @example $.modal('<div>my data</div>', {options});
 * @example $.modal('my data', {options});
 * @example $.modal($('#myDiv'), {options});
 * @example $.modal(jQueryObject, {options});
 * @example $.modal(document.getElementById('myDiv'), {options});
 *
 * A SimpleModal call can contain multiple elements, but only one modal
 * dialog can be created at a time. Which means that all of the matched
 * elements will be displayed within the modal container.
 *
 * SimpleModal internally sets the CSS needed to display the modal dialog
 * properly in all browsers, yet provides the developer with the flexibility
 * to easily control the look and feel. The styling for SimpleModal can be
 * done through external stylesheets, or through SimpleModal, using the
 * overlayCss, containerCss, and dataCss options.
 *
 * SimpleModal has been tested in the following browsers:
 * - IE 6+
 * - Firefox 2+
 * - Opera 9+
 * - Safari 3+
 * - Chrome 1+
 *
 * @name SimpleModal
 * @type jQuery
 * @requires jQuery v1.3
 * @cat Plugins/Windows and Overlays
 * @author Eric Martin (http://ericmmartin.com)
 * @version 1.4.4
 */

;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	var d = [],
		doc = $(document),
		ua = navigator.userAgent.toLowerCase(),
		wndw = $(window),
		w = [];

	var browser = {
		ieQuirks: null,
		msie: /msie/.test(ua) && !/opera/.test(ua),
		opera: /opera/.test(ua)
	};
	browser.ie6 = browser.msie && /msie 6./.test(ua) && typeof window['XMLHttpRequest'] !== 'object';
	browser.ie7 = browser.msie && /msie 7.0/.test(ua);

	/*
	 * Create and display a modal dialog.
	 *
	 * @param {string, object} data A string, jQuery object or DOM object
	 * @param {object} [options] An optional object containing options overrides
	 */
	$.modal = function (data, options) {
		return $.modal.impl.init(data, options);
	};

	/*
	 * Close the modal dialog.
	 */
	$.modal.close = function () {
		$.modal.impl.close();
	};

	/*
	 * Set focus on first or last visible input in the modal dialog. To focus on the last
	 * element, call $.modal.focus('last'). If no input elements are found, focus is placed
	 * on the data wrapper element.
	 */
	$.modal.focus = function (pos) {
		$.modal.impl.focus(pos);
	};

	/*
	 * Determine and set the dimensions of the modal dialog container.
	 * setPosition() is called if the autoPosition option is true.
	 */
	$.modal.setContainerDimensions = function () {
		$.modal.impl.setContainerDimensions();
	};

	/*
	 * Re-position the modal dialog.
	 */
	$.modal.setPosition = function () {
		$.modal.impl.setPosition();
	};

	/*
	 * Update the modal dialog. If new dimensions are passed, they will be used to determine
	 * the dimensions of the container.
	 *
	 * setContainerDimensions() is called, which in turn calls setPosition(), if enabled.
	 * Lastly, focus() is called is the focus option is true.
	 */
	$.modal.update = function (height, width) {
		$.modal.impl.update(height, width);
	};

	/*
	 * Chained function to create a modal dialog.
	 *
	 * @param {object} [options] An optional object containing options overrides
	 */
	$.fn.modal = function (options) {
		return $.modal.impl.init(this, options);
	};

	/*
	 * SimpleModal default options
	 *
	 * appendTo:		(String:'body') The jQuery selector to append the elements to. For .NET, use 'form'.
	 * focus:			(Boolean:true) Focus in the first visible, enabled element?
	 * opacity:			(Number:50) The opacity value for the overlay div, from 0 - 100
	 * overlayId:		(String:'simplemodal-overlay') The DOM element id for the overlay div
	 * overlayCss:		(Object:{}) The CSS styling for the overlay div
	 * containerId:		(String:'simplemodal-container') The DOM element id for the container div
	 * containerCss:	(Object:{}) The CSS styling for the container div
	 * dataId:			(String:'simplemodal-data') The DOM element id for the data div
	 * dataCss:			(Object:{}) The CSS styling for the data div
	 * minHeight:		(Number:null) The minimum height for the container
	 * minWidth:		(Number:null) The minimum width for the container
	 * maxHeight:		(Number:null) The maximum height for the container. If not specified, the window height is used.
	 * maxWidth:		(Number:null) The maximum width for the container. If not specified, the window width is used.
	 * autoResize:		(Boolean:false) Automatically resize the container if it exceeds the browser window dimensions?
	 * autoPosition:	(Boolean:true) Automatically position the container upon creation and on window resize?
	 * zIndex:			(Number: 1000) Starting z-index value
	 * close:			(Boolean:true) If true, closeHTML, escClose and overClose will be used if set.
	 							If false, none of them will be used.
	 * closeHTML:		(String:'<a class="modalCloseImg" title="Close"></a>') The HTML for the default close link.
								SimpleModal will automatically add the closeClass to this element.
	 * closeClass:		(String:'simplemodal-close') The CSS class used to bind to the close event
	 * escClose:		(Boolean:true) Allow Esc keypress to close the dialog?
	 * overlayClose:	(Boolean:false) Allow click on overlay to close the dialog?
	 * fixed:			(Boolean:true) If true, the container will use a fixed position. If false, it will use a
								absolute position (the dialog will scroll with the page)
	 * position:		(Array:null) Position of container [top, left]. Can be number of pixels or percentage
	 * persist:			(Boolean:false) Persist the data across modal calls? Only used for existing
								DOM elements. If true, the data will be maintained across modal calls, if false,
								the data will be reverted to its original state.
	 * modal:			(Boolean:true) User will be unable to interact with the page below the modal or tab away from the dialog.
								If false, the overlay, iframe, and certain events will be disabled allowing the user to interact
								with the page below the dialog.
	 * onOpen:			(Function:null) The callback function used in place of SimpleModal's open
	 * onShow:			(Function:null) The callback function used after the modal dialog has opened
	 * onClose:			(Function:null) The callback function used in place of SimpleModal's close
	 */
	$.modal.defaults = {
		appendTo: 'body',
		focus: true,
		opacity: 50,
		overlayId: 'simplemodal-overlay',
		overlayCss: {},
		containerId: 'simplemodal-container',
		containerCss: {},
		dataId: 'simplemodal-data',
		dataCss: {},
		minHeight: null,
		minWidth: null,
		maxHeight: null,
		maxWidth: null,
		autoResize: false,
		autoPosition: true,
		zIndex: 1000,
		close: true,
		closeHTML: '<a class="modalCloseImg" title="Close"></a>',
		closeClass: 'simplemodal-close',
		escClose: true,
		overlayClose: false,
		fixed: true,
		position: null,
		persist: false,
		modal: true,
		onOpen: null,
		onShow: null,
		onClose: null
	};

	/*
	 * Main modal object
	 * o = options
	 */
	$.modal.impl = {
		/*
		 * Contains the modal dialog elements and is the object passed
		 * back to the callback (onOpen, onShow, onClose) functions
		 */
		d: {},
		/*
		 * Initialize the modal dialog
		 */
		init: function (data, options) {
			var s = this;

			// don't allow multiple calls
			if (s.d.data) {
				return false;
			}

			// $.support.boxModel is undefined if checked earlier
			browser.ieQuirks = browser.msie && !$.support.boxModel;

			// merge defaults and user options
			s.o = $.extend({}, $.modal.defaults, options);

			// keep track of z-index
			s.zIndex = s.o.zIndex;

			// set the onClose callback flag
			s.occb = false;

			// determine how to handle the data based on its type
			if (typeof data === 'object') {
				// convert DOM object to a jQuery object
				data = data instanceof $ ? data : $(data);
				s.d.placeholder = false;

				// if the object came from the DOM, keep track of its parent
				if (data.parent().parent().size() > 0) {
					data.before($('<span></span>')
						.attr('id', 'simplemodal-placeholder')
						.css({display: 'none'}));

					s.d.placeholder = true;
					s.display = data.css('display');

					// persist changes? if not, make a clone of the element
					if (!s.o.persist) {
						s.d.orig = data.clone(true);
					}
				}
			}
			else if (typeof data === 'string' || typeof data === 'number') {
				// just insert the data as innerHTML
				data = $('<div></div>').html(data);
			}
			else {
				// unsupported data type!
				alert('SimpleModal Error: Unsupported data type: ' + typeof data);
				return s;
			}

			// create the modal overlay, container and, if necessary, iframe
			s.create(data);
			data = null;

			// display the modal dialog
			s.open();

			// useful for adding events/manipulating data in the modal dialog
			if ($.isFunction(s.o.onShow)) {
				s.o.onShow.apply(s, [s.d]);
			}

			// don't break the chain =)
			return s;
		},
		/*
		 * Create and add the modal overlay and container to the page
		 */
		create: function (data) {
			var s = this;

			// get the window properties
			s.getDimensions();

			// add an iframe to prevent select options from bleeding through
			if (s.o.modal && browser.ie6) {
				s.d.iframe = $('<iframe src="javascript:false;"></iframe>')
					.css($.extend(s.o.iframeCss, {
						display: 'none',
						// disable opacity due to modal animation
						//opacity: 0,
						position: 'fixed',
						height: w[0],
						width: w[1],
						zIndex: s.o.zIndex,
						top: 0,
						left: 0
					}))
					.appendTo(s.o.appendTo);
			}

			// create the overlay
			s.d.overlay = $('<div></div>')
				.attr('id', s.o.overlayId)
				.addClass('simplemodal-overlay')
				.css($.extend(s.o.overlayCss, {
					display: 'none',
					// disable opacity due to modal animation
					//opacity: s.o.opacity / 100,
					height: s.o.modal ? d[0] : 0,
					width: s.o.modal ? d[1] : 0,
					position: 'fixed',
					left: 0,
					top: 0,
					zIndex: s.o.zIndex + 1
				}))
				.appendTo(s.o.appendTo);

			// create the container
			s.d.container = $('<div></div>')
				.attr('id', s.o.containerId)
				.addClass('simplemodal-container')
				.css($.extend(
					{position: s.o.fixed ? 'fixed' : 'absolute'},
					s.o.containerCss,
					{display: 'none', zIndex: s.o.zIndex + 2}
				))
				.append(s.o.close && s.o.closeHTML
					? $(s.o.closeHTML).addClass(s.o.closeClass)
					: '')
				.appendTo(s.o.appendTo);

			s.d.wrap = $('<div></div>')
				.attr('tabIndex', -1)
				.addClass('simplemodal-wrap')
				.css({height: '100%', outline: 0, width: '100%'})
				.appendTo(s.d.container);

			// add styling and attributes to the data
			// append to body to get correct dimensions, then move to wrap
			s.d.data = data
				.attr('id', data.attr('id') || s.o.dataId)
				.addClass('simplemodal-data')
				.css($.extend(s.o.dataCss, {
						display: 'none'
				}))
				.appendTo('body');
			data = null;

			s.setContainerDimensions();
			s.d.data.appendTo(s.d.wrap);

			// fix issues with IE
			if (browser.ie6 || browser.ieQuirks) {
				s.fixIE();
			}
		},
		/*
		 * Bind events
		 */
		bindEvents: function () {
			var s = this;

			// bind the close event to any element with the closeClass class
			$('.' + s.o.closeClass).bind('click.simplemodal', function (e) {
				e.preventDefault();
				s.close();
			});

			// bind the overlay click to the close function, if enabled
			if (s.o.modal && s.o.close && s.o.overlayClose) {
				s.d.overlay.bind('click.simplemodal', function (e) {
					e.preventDefault();
					s.close();
				});
			}

			// bind keydown events
			doc.bind('keydown.simplemodal', function (e) {
				if (s.o.modal && e.keyCode === 9) { // TAB
					s.watchTab(e);
				}
				else if ((s.o.close && s.o.escClose) && e.keyCode === 27) { // ESC
					e.preventDefault();
					s.close();
				}
			});

			// update window size
			wndw.bind('resize.simplemodal orientationchange.simplemodal', function () {
				// redetermine the window width/height
				s.getDimensions();

				// reposition the dialog
				s.o.autoResize ? s.setContainerDimensions() : s.o.autoPosition && s.setPosition();

				if (browser.ie6 || browser.ieQuirks) {
					s.fixIE();
				}
				else if (s.o.modal) {
					// update the iframe & overlay
					s.d.iframe && s.d.iframe.css({height: w[0], width: w[1]});
					s.d.overlay.css({height: d[0], width: d[1]});
				}
			});
		},
		/*
		 * Unbind events
		 */
		unbindEvents: function () {
			$('.' + this.o.closeClass).unbind('click.simplemodal');
			doc.unbind('keydown.simplemodal');
			wndw.unbind('.simplemodal');
			this.d.overlay.unbind('click.simplemodal');
		},
		/*
		 * Fix issues in IE6 and IE7 in quirks mode
		 */
		fixIE: function () {
			var s = this, p = s.o.position;

			// simulate fixed position - adapted from BlockUI
			$.each([s.d.iframe || null, !s.o.modal ? null : s.d.overlay, s.d.container.css('position') === 'fixed' ? s.d.container : null], function (i, el) {
				if (el) {
					var bch = 'document.body.clientHeight', bcw = 'document.body.clientWidth',
						bsh = 'document.body.scrollHeight', bsl = 'document.body.scrollLeft',
						bst = 'document.body.scrollTop', bsw = 'document.body.scrollWidth',
						ch = 'document.documentElement.clientHeight', cw = 'document.documentElement.clientWidth',
						sl = 'document.documentElement.scrollLeft', st = 'document.documentElement.scrollTop',
						s = el[0].style;

					s.position = 'absolute';
					if (i < 2) {
						s.removeExpression('height');
						s.removeExpression('width');
						s.setExpression('height','' + bsh + ' > ' + bch + ' ? ' + bsh + ' : ' + bch + ' + "px"');
						s.setExpression('width','' + bsw + ' > ' + bcw + ' ? ' + bsw + ' : ' + bcw + ' + "px"');
					}
					else {
						var te, le;
						if (p && p.constructor === Array) {
							var top = p[0]
								? typeof p[0] === 'number' ? p[0].toString() : p[0].replace(/px/, '')
								: el.css('top').replace(/px/, '');
							te = top.indexOf('%') === -1
								? top + ' + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"'
								: parseInt(top.replace(/%/, '')) + ' * ((' + ch + ' || ' + bch + ') / 100) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';

							if (p[1]) {
								var left = typeof p[1] === 'number' ? p[1].toString() : p[1].replace(/px/, '');
								le = left.indexOf('%') === -1
									? left + ' + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"'
									: parseInt(left.replace(/%/, '')) + ' * ((' + cw + ' || ' + bcw + ') / 100) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
							}
						}
						else {
							te = '(' + ch + ' || ' + bch + ') / 2 - (this.offsetHeight / 2) + (t = ' + st + ' ? ' + st + ' : ' + bst + ') + "px"';
							le = '(' + cw + ' || ' + bcw + ') / 2 - (this.offsetWidth / 2) + (t = ' + sl + ' ? ' + sl + ' : ' + bsl + ') + "px"';
						}
						s.removeExpression('top');
						s.removeExpression('left');
						s.setExpression('top', te);
						s.setExpression('left', le);
					}
				}
			});
		},
		/*
		 * Place focus on the first or last visible input
		 */
		focus: function (pos) {
			var s = this, p = pos && $.inArray(pos, ['first', 'last']) !== -1 ? pos : 'first';

			// focus on dialog or the first visible/enabled input element
			var input = $(':input:enabled:visible:' + p, s.d.wrap);
			setTimeout(function () {
				input.length > 0 ? input.focus() : s.d.wrap.focus();
			}, 10);
		},
		getDimensions: function () {
			// fix a jQuery bug with determining the window height - use innerHeight if available
			var s = this,
				h = typeof window.innerHeight === 'undefined' ? wndw.height() : window.innerHeight;

			d = [doc.height(), doc.width()];
			w = [h, wndw.width()];
		},
		getVal: function (v, d) {
			return v ? (typeof v === 'number' ? v
					: v === 'auto' ? 0
					: v.indexOf('%') > 0 ? ((parseInt(v.replace(/%/, '')) / 100) * (d === 'h' ? w[0] : w[1]))
					: parseInt(v.replace(/px/, '')))
				: null;
		},
		/*
		 * Update the container. Set new dimensions, if provided.
		 * Focus, if enabled. Re-bind events.
		 */
		update: function (height, width) {
			var s = this;

			// prevent update if dialog does not exist
			if (!s.d.data) {
				return false;
			}

			// reset orig values
			s.d.origHeight = s.getVal(height, 'h');
			s.d.origWidth = s.getVal(width, 'w');

			// hide data to prevent screen flicker
			s.d.data.hide();
			height && s.d.container.css('height', height);
			width && s.d.container.css('width', width);
			s.setContainerDimensions();
			s.d.data.show();
			s.o.focus && s.focus();

			// rebind events
			s.unbindEvents();
			s.bindEvents();
		},
		setContainerDimensions: function () {
			var s = this,
				badIE = browser.ie6 || browser.ie7;

			// get the dimensions for the container and data
			var ch = s.d.origHeight ? s.d.origHeight : browser.opera ? s.d.container.height() : s.getVal(badIE ? s.d.container[0].currentStyle['height'] : s.d.container.css('height'), 'h'),
				cw = s.d.origWidth ? s.d.origWidth : browser.opera ? s.d.container.width() : s.getVal(badIE ? s.d.container[0].currentStyle['width'] : s.d.container.css('width'), 'w'),
				dh = s.d.data.outerHeight(true), dw = s.d.data.outerWidth(true);

			s.d.origHeight = s.d.origHeight || ch;
			s.d.origWidth = s.d.origWidth || cw;

			// mxoh = max option height, mxow = max option width
			var mxoh = s.o.maxHeight ? s.getVal(s.o.maxHeight, 'h') : null,
				mxow = s.o.maxWidth ? s.getVal(s.o.maxWidth, 'w') : null,
				mh = mxoh && mxoh < w[0] ? mxoh : w[0],
				mw = mxow && mxow < w[1] ? mxow : w[1];

			// moh = min option height
			var moh = s.o.minHeight ? s.getVal(s.o.minHeight, 'h') : 'auto';
			if (!ch) {
				if (!dh) {ch = moh;}
				else {
					if (dh > mh) {ch = mh;}
					else if (s.o.minHeight && moh !== 'auto' && dh < moh) {ch = moh;}
					else {ch = dh;}
				}
			}
			else {
				ch = s.o.autoResize && ch > mh ? mh : ch < moh ? moh : ch;
			}

			// mow = min option width
			var mow = s.o.minWidth ? s.getVal(s.o.minWidth, 'w') : 'auto';
			if (!cw) {
				if (!dw) {cw = mow;}
				else {
					if (dw > mw) {cw = mw;}
					else if (s.o.minWidth && mow !== 'auto' && dw < mow) {cw = mow;}
					else {cw = dw;}
				}
			}
			else {
				cw = s.o.autoResize && cw > mw ? mw : cw < mow ? mow : cw;
			}

			s.d.container.css({height: ch, width: cw});
			s.d.wrap.css({overflow: (dh > ch || dw > cw) ? 'auto' : 'visible'});
			s.o.autoPosition && s.setPosition();
		},
		setPosition: function () {
			var s = this, top, left,
				hc = (w[0]/2) - (s.d.container.outerHeight(true)/2),
				vc = (w[1]/2) - (s.d.container.outerWidth(true)/2),
				st = s.d.container.css('position') !== 'fixed' ? wndw.scrollTop() : 0;

			if (s.o.position && Object.prototype.toString.call(s.o.position) === '[object Array]') {
				top = st + (s.o.position[0] || hc);
				left = s.o.position[1] || vc;
			} else {
				top = st + hc;
				left = vc;
			}
			s.d.container.css({left: left, top: top});
		},
		watchTab: function (e) {
			var s = this;

			if ($(e.target).parents('.simplemodal-container').length > 0) {
				// save the list of inputs
				s.inputs = $(':input:enabled:visible:first, :input:enabled:visible:last', s.d.data[0]);

				// if it's the first or last tabbable element, refocus
				if ((!e.shiftKey && e.target === s.inputs[s.inputs.length -1]) ||
						(e.shiftKey && e.target === s.inputs[0]) ||
						s.inputs.length === 0) {
					e.preventDefault();
					var pos = e.shiftKey ? 'last' : 'first';
					s.focus(pos);
				}
			}
			else {
				// might be necessary when custom onShow callback is used
				e.preventDefault();
				s.focus();
			}
		},
		/*
		 * Open the modal dialog elements
		 * - Note: If you use the onOpen callback, you must "show" the
		 *         overlay and container elements manually
		 *         (the iframe will be handled by SimpleModal)
		 */
		open: function () {
			var s = this;
			// display the iframe
			s.d.iframe && s.d.iframe.show();

			if ($.isFunction(s.o.onOpen)) {
				// execute the onOpen callback
				s.o.onOpen.apply(s, [s.d]);
			}
			else {
				// display the remaining elements
				s.d.overlay.show();
				s.d.container.show();
				s.d.data.show();
			}

			s.o.focus && s.focus();

			// bind default events
			s.bindEvents();
		},
		/*
		 * Close the modal dialog
		 * - Note: If you use an onClose callback, you must remove the
		 *         overlay, container and iframe elements manually
		 *
		 * @param {boolean} external Indicates whether the call to this
		 *     function was internal or external. If it was external, the
		 *     onClose callback will be ignored
		 */
		close: function () {
			var s = this;

			// prevent close when dialog does not exist
			if (!s.d.data) {
				return false;
			}

			// remove the default events
			s.unbindEvents();

			if ($.isFunction(s.o.onClose) && !s.occb) {
				// set the onClose callback flag
				s.occb = true;

				// execute the onClose callback
				s.o.onClose.apply(s, [s.d]);
			}
			else {
				// if the data came from the DOM, put it back
				if (s.d.placeholder) {
					var ph = $('#simplemodal-placeholder');
					// save changes to the data?
					if (s.o.persist) {
						// insert the (possibly) modified data back into the DOM
						ph.replaceWith(s.d.data.removeClass('simplemodal-data').css('display', s.display));
					}
					else {
						// remove the current and insert the original,
						// unmodified data back into the DOM
						s.d.data.hide().remove();
						ph.replaceWith(s.d.orig);
					}
				}
				else {
					// otherwise, remove it
					s.d.data.hide().remove();
				}

				// remove the remaining elements
				s.d.container.hide().remove();
				s.d.overlay.hide();
				s.d.iframe && s.d.iframe.hide().remove();
				s.d.overlay.remove();

				// reset the dialog object
				s.d = {};
			}
		}
	};
}));

(function($, undefined){

    Intuit.Library.Carousel = Intuit.Carousel || {};

    /**
     * Must be available prior to DOM ready event
     *
     * @param carouselId
     * @constructor
     */
    Intuit.Library.Carousel.ReviewsCarousel = function(carouselId) {
        var $carousel = $(carouselId), init, showReviewInOverlay,
            $body = $('body');

        init = function() {
            $carousel.length && $carousel.simplerCarousel({
                auto: 10000
            });
            $carousel.on('click', '.read-more', function(e){
                e.stopPropagation();
                e.preventDefault();


                showReviewInOverlay($(e.target));
            });
        };

        showReviewInOverlay = function($target) {
            /*
             * onOpen and onClose are required to deal with some of our quirks
             */
            var content = $target.parents('.creview').clone().wrap('<div>').parent().html();
            $.modal(content, {
                onShow: function(dialog) {
                    $body.addClass('modal-open');
                    dialog.overlay.addClass('show');
                    dialog.container.addClass('show').height(dialog.data.outerHeight());
                },
                onClose: function(dialog) {
                    $body.removeClass('modal-open');
                    dialog.overlay.removeClass('show');
                    dialog.container.removeClass('show');
                    $.modal.close();
                },
                dataCss: {
                    padding: '40px 20px'
                },
                closeHTML: '<a class="modalCloseImg global-sprite simplemodal-close review" href="#" title="Close"></a>',
                escClose: true,
                overlayClose: true
            });
        };

        $(function(){
            init();
        });
    }


}(jQuery));
// update container height based on background image height
$(document).ready(function() {
    var bgImg = $(".ccontainer .bg img");
    if (bgImg.length) {
        bgImg.each(function() {
            var $this = $(this);

            $this.attr("src", $this.attr("src")); //cache fix in ie10;

        });
    }
    //add windows class for users on Windows OS to fix Frutiger font issue
    if (navigator.appVersion.indexOf("Win") != -1)
    {
        document.documentElement.className += " windows ";
    }
});

$(document).ready(function(){
    $(document).on("click",".ccta.submit-btn",function(event){
        event.preventDefault();
        if($(".cform-cvalidate").length > 0){
        	$(window).trigger('Form:Validate', this);
        } else {
            $(window).trigger('Form:Submit', this);
        }
        if($(".jqxhr").length > 0){
			$(window).trigger('Form:AJAXSubmit', this);
        }
	});
});
$(window).load(function(){

  $("body").on("click", ".toggle-disclosure", function(event){
    event.preventDefault();

    var disclosure_text = $(this).data('text'),
      disclosure_toggled_text = $(this).data('toggledText') != "" ? $(this).data('toggledText') : disclosure_text,
      disclosure_scroll_speed = 450,
      scroll_modal_top_pos = 340,
      $cmodalPage = $(".cmodal-page"),
      scroll_modal_content_to = $cmodalPage.scrollTop() == 0 ? scroll_modal_top_pos : 0,
      disclosure_container = $(this).next('.cdisclosure-content');

    $(this).text($(this).text() == disclosure_text ? disclosure_toggled_text : disclosure_text); // Toggle the Disclosure link text

    if ($cmodalPage[0]) { // Determine if the Disclosure component is used within a modal; change style, and animation
      if (disclosure_container.hasClass('show-disclosure')) {
        $cmodalPage.animate({scrollTop: 0}, disclosure_scroll_speed, function(){
          disclosure_container.removeClass("show-disclosure");
          disclosure_container.slideUp('fast');
        })
      } else {
        disclosure_container.addClass("show-disclosure");
        disclosure_container.slideDown();
      }
    } else {
      disclosure_container.toggleClass("show-disclosure");
      if (disclosure_container.hasClass("show-disclosure")) {
        disclosure_container.slideDown();
      }
      else {
        disclosure_container.slideUp('fast');
      }
    }

  })
});
(function(window) {

    var $window = $(window),
        processFormInjection = function($el) {
            var href = decodeURIComponent($el.attr('href')),
                hrefTokens = href.substring(href.indexOf('?') + 1).split('&'),
                i, htl = hrefTokens.length,
                token;
            for (i = 0; i < htl; i++) {
                token = hrefTokens[i];
                if (token.indexOf('bc=') !== -1) {
                    var bc = token.replace('bc=', '');
                }
                if (token.indexOf('successPage=') !== -1) {
                    var successPage = token.replace('successPage=', '');
                }
            }
            if (typeof bc !== 'undefined' && typeof successPage !== 'undefined') {
                var e = $.Event('modal:cta:click')
                e.bc = bc;
                e.successPage = successPage;
                window.getActiveForm().trigger(e);
                return false;
            }
        };

    $(document).ready(function() {

        // establish eStore Session so that add to cart modals work smoothly
        // TODO: Need to call this method only for pages which needs estore sesssion.

        function getLocale() {
            var str = $("html").attr('lang');
            if (str == null) {
                str = "en/us"; //if null or undefined , setting the var to "en/us"
            }
            str = str.replace("-", "/").toLowerCase().match("en+/+[a-z][a-z]");
            return str;
        }
        var thisLocaleString = getLocale();
        if (thisLocaleString == "en/us" && $("a[class*='modal'][data-href*='intuit.com/commerce/e2e/checkout/redirect_to_cart.jsp']").length > 0 ) {
            Intuit.Utils.Standard.eStoreSession();
        }

        var $body = $('body'),
            $target;

        if (typeof cachedUrl == 'undefined')
            cachedUrl = {};
        $('.preload-modal').each(
            function() {

                var subStrHref = $(this).attr("href").lastIndexOf('.');
                if (subStrHref === -1) {
                    mhref = $(this).attr("href");
                } else {
                    mhref = $(this).attr("href").slice(0, subStrHref);
                }
                var url = Intuit.Utils.Standard.cqPathForShowroom(mhref + ".html");

                if ($(this).find('.cache-modal').length > 0) {} else {

                    if (cachedUrl.hasOwnProperty(url)) {
                        $(this).append('<div class="cache-modal" style="display: none;"> </div>');

                        $(this).find('.cache-modal').append(cachedUrl[url].html());
                        // cachedUrl[url].appendTo($(this));
                    } else {
                        $(this).append('<div class="cache-modal" style="display: none;"> </div>');
                        // console.info('Requesting the URL'+url+' to cache it');
                        cachedUrl[url] = $(this).find('.cache-modal');
                        $(this).find('.cache-modal').load(url, function() {

                        });

                    }

                }
            }
        );


        $body.on('click', '.modal', function(e) {

            e.preventDefault();

            var $this = $(this),
                subStrHref,
                mhref;

            //added to workaround .html getting added twice when using RTE to make a link as modal
            subStrHref = $this.attr("href").lastIndexOf('.');
            if (subStrHref === -1) {
                mhref = $this.attr("href");
            } else {
                mhref = $this.attr("href").slice(0, subStrHref);
            }

            var url = Intuit.Utils.Standard.cqPathForShowroom(mhref);


            if(((mhref.search("\/global|\/eu|\/mx|\/za|\/ae|\/ph|\/sg|\/my|\/zh-hk|\/hk"))==-1)){
                url = Intuit.Utils.Standard.cqPathForShowroom(mhref + ".html");
            }

            var ctaId = $this.attr('id') || null,
                continue_link = null,
                dataHref = $this.attr('data-href'),
                oncloseURL = $this.attr('data-onclose-url') || null,
                $smodal;

            if (dataHref) {
                if (thisLocaleString == "en/us") {
                    dataHref = dataHref.replace(/\/commerce\/e2e\/cart\/shopping_cart\.jsp/, "/commerce/common/fragments/legal_trademark_copyright.jsp");
                }
                // add to cart using image trick
                Intuit.Utils.Standard.asyncAddToCart(dataHref);
            }

            if (!$('body').hasClass("modal-open")) {
                $('body').addClass("modal-open"); // prevent page body from scrolling
            } else {



                // Modal has already been initialized, so this a modal-to-modal
                // transition. Skip all initialization. Just reset the onclose URL
                // and load new HTML into the existing modal container.
                $smodal = $(".smodal");
                $smodal.data("oncloseURL", oncloseURL);
                //console.info('Requesting the URL'+url+' since the url not in cache');


                if ($smodal.hasClass("cloned-modal-open")) {

                    continue_link = Intuit.Utils.Standard.getContinueLink($smodal);
                    Intuit.Utils.Standard.bundleModalOnLoad($smodal);
                    $(window).trigger('modal:open');
                    return;
                }

                $smodal.load(url, function() {

                    //these functions needed to act on new modal content
                    //continue_link is deprecated now that we have onCloseURL, but older modals still need it
                    continue_link = Intuit.Utils.Standard.getContinueLink($smodal);
                    Intuit.Utils.Standard.bundleModalOnLoad($smodal);
                    $(window).trigger('modal:open');

                });
                return;
            }

            $.modal('<div class="smodal"></div>', {
                overlayClose: true,
                closeHTML: '<a class="modalCloseImg global-sprite" title="Close"></a>',
                onOpen: function(d) {
                    modalOverlay = d;
                    $smodal = $(".smodal");
                    $smodal.data("ctaId", ctaId);
                    d.overlay.width($('body').width());
                    d.overlay.height($('body').height());
            		if($(".simplemodal-container").hasClass("resp-modal")) {
                    	responsiveModalWidth(d);
            		}
                    d.overlay.show().addClass('show');
                    d.overlay.append('<div class="spinner"></div>');

                    if ($this.find('.cache-modal').length > 0) {
                        //console.info('Requesting the URL'+url+' served from cache');

                        if ($this.find('.cache-modal').html().trim().length > 0) {

                            $smodal.append($this.find('.cache-modal').html());
                        } else {
                            if (cachedUrl.hasOwnProperty(url)) {


                                $smodal.append(cachedUrl[url].html());

                            }
                        }

                        d.overlay.find('.spinner').hide();
                        d.container.show().addClass('show');
                        d.data.show();
                        $smodal.addClass("cloned-modal-open");

                        $window.trigger('resize.simplemodal');

                        //these functions needed to act on new modal content
                        //continue_link is deprecated now that we have onCloseURL, but older modals still need it
                        continue_link = Intuit.Utils.Standard.getContinueLink($smodal);
                        Intuit.Utils.Standard.bundleModalOnLoad($smodal);
                        $(window).trigger('modal:open');
                    } else {

                        //console.info('Requesting the URL'+url+' since the url not in cache');
                        $smodal.load(url,
                            function() {
                                d.overlay.find('.spinner').hide();
                                d.container.show().addClass('show');
                                d.data.show();
                                $window.trigger('resize.simplemodal');

                                //these functions needed to act on new modal content
                                //continue_link is deprecated now that we have onCloseURL, but older modals still need it
                                continue_link = Intuit.Utils.Standard.getContinueLink($smodal);
                                Intuit.Utils.Standard.bundleModalOnLoad($smodal);
                                $(window).trigger('modal:open');

                            });
                    }
					$(window).resize(function() {
                		if($(".simplemodal-container").hasClass("resp-modal")) {
                    		responsiveModalWidth(d);
                		}
					});
                },

                onClose: function(d) {
                    var destination = oncloseURL || $smodal.data("oncloseURL") || continue_link;
                    if (destination) {
                        //fixing an issue when the user clicks back after going to the oncloseURL destination (sometimes modal was still showing on back)
                        $.modal.close();
                        $body.removeClass("modal-open"); // re-enable page body scrolling
                        d.overlay.remove();
                        d.container.remove();
                        d.data.remove();
                        return window.location = destination;
                    }
                    if (Modernizr.csstransitions) {
                        d.overlay.removeClass('show');
                        d.container.removeClass('show');
                        setTimeout(function() {
                            $.modal.close();
                            $body.removeClass("modal-open"); // re-enable page body scrolling
                        }, 500);
                    } else {
                        $.modal.close();
                        $body.removeClass("modal-open"); // re-enable page body scrolling
                    }

                    d.overlay.remove();
                    d.container.remove();
                    d.data.remove();
                    d.data = null;

                }

            });

        }).on('click', '.simplemodal-overlay, .simplemodal-container', function(e) {
            $target = $(e.target);
            if ($target.hasClass('simplemodal-close') && $("#modal-xclose").length > 0) {
                $("#modal-xclose").click();
            } else if ($target.hasClass('simplemodal-overlay') && $("#modal-outclose").length > 0) {
                $("#modal-outclose").click();
            } else if ($target.is('a') && $target.parent().hasClass('ccta') && $('body').hasClass('has-form')) {
                return processFormInjection($target);
            }
        }).keyup(function(e) {
            if (e.keyCode == 27 && $("#modal-outclose").length > 0) {
                $("#modal-outclose").click();
            }
        });
    });
}(window));

function responsiveModalWidth(d) {
    if(d != undefined) {
        if ($(window).width() < 700) {
            d.container.width(parseInt($('body').width()) * 0.9);
			d.container.css("margin", "20px");
        }
        else
        {
			d.container.width("700px");
        }
    }
}

/*global Intuit, CQ */

(function($, window, document){
	//Return check to not load modal_utils.js if available already
    var $window = Intuit.$window;

    if (typeof Intuit.Utils.Modal === 'object') {
       return;
    }

    $.extend(Intuit.Utils, {

        Modal: (function() {

            var ctaContainer = {},
                shoppingCartUrl = 'http://quickbooks.intuit.com/commerce/common/fragments/legal_trademark_copyright.jsp',
                params = [];

            function inShowroom() {
                return (typeof window.Bootstrapper === 'object');
            }

            function doModalPathForShowroom(m_url) {

                // function used to reformat modal URLs when they are called directly in JavaScript.
                // When modal URLs are handled by Showroom CTA component, the ruby code does this same manipulation
                if (inShowroom()) { // if we're in Showroom, fix the modal-to-modal transition URL
                    var urlEleArray = m_url.split("/en/us");
                    if (urlEleArray && urlEleArray.length > 1) {
                        m_url = "/showroom_cms/content" + urlEleArray[1];
                    }
                }
                return  m_url;

            }

            function doEstablishEstoreSession() {
                var img = null;
                if (document.cookie.indexOf('101_INTUIT_SESSIONID') !== -1) {
                    return "cookie-exists";
                }
                try {
                    if (window._aggregate_data && window._aggregate_data['dynamic_pricing']['priorityCode']) {
                        params.push('&priorityCode='.concat(window._aggregate_data['dynamic_pricing']['priorityCode']));
                    }
                    if (params.length) {
                        shoppingCartUrl += '?'.concat(params.join('&'));
                    }

                    img = new Image();
                    img.src = shoppingCartUrl;
                } catch(err){}

                return img;
            }

            function doAsyncAddToCart(m_url) {

                var img = null;

                if (ctaContainer[m_url]) {
                    return;
                }
                try {
                    // async estore request
                    ctaContainer[m_url] = true;
                    img = new Image();
                    img.src = m_url;
                } catch (err) {}

                return  img;
            }


            function doRadioOptionClick() {
                $("[id^='radio_option']").click(function () {
                    var is_modal = $(this).attr("ismodal");

                    $('#cta-cancel').attr('href', 'javascript:$.modal.close();');

                    $('#cta-continue').removeAttr('data-onclose-url', null);

                    if (is_modal == "true") {
                        var modal_path = $(this).attr("modal_path"),
                            on_close_url = $(this).attr("on_close_url");

                        if (modal_path != "") {
                            $("#cta-continue").addClass("modal").attr("href", modal_path);
                            if (on_close_url != '') {
                                $('#cta-continue').attr('data-onclose-url', on_close_url);
                            }
                        }
                    } else {
                        var static_end_url = $(this).attr("static_end_url");
                        $("#cta-continue").removeClass("modal").attr("href", static_end_url);
                    }

                });

                return true ;

            }
            return {
                inShowroom: function () {
                    return inShowroom();
                },
                modalPathForShowroom: function(m_url) {
                    return doModalPathForShowroom(m_url);

                },
                eStoreSession: function(){
                    return doEstablishEstoreSession();
                },
                asyncAddToCart: function(m_url){
                    return doAsyncAddToCart(m_url);

                },
                radioOptionClick: function(){
                    doRadioOptionClick();
                    return;
                }
            }
        }())
    });

}(jQuery, window, document));

(function($, undefined){

    Intuit.Library.Video = window.Intuit.Library.Video || {};

}(jQuery));
function inititateoAuth(){
    window.setTimeout(Intuit.Library.Video.YouTubePlayer.authOnLoad,1);
}
(function($, window, document, undefined){
    //Return check to not load youtube.js if available already
    var $window = Intuit.$window;
    if (typeof Intuit.Library.Video.YouTubePlayer === 'object') {
        return;
    }
    $.extend(Intuit.Library.Video, {

        YouTubePlayer: (function() {

            var videos = {},
                defaults = {
                    // following are straight from the google API @ https://developers.google.com/youtube/player_parameters#showinfo
                    wmode: 'transparent',
                    showinfo: 0,
                    enablejsapi: 1,
                    fs: 1,
                    iv_load_policy: 1,
                    modestbranding: 1,
                    origin: getOrigin(),
                    rel: false,
                    //autohide: 1,
                    controls:2,
                },
                getPlayer,
                initializeApiPlayer,
                processVideoQueue,
                processOptions,
                autoInsert,
                trackVideo,
                resizeVideo,
                getResponsiveVideoSize,
                initResponsivePlayer,
                youTubePlayerAPIReady = false,
                clientId = '462124174722-4rrp80e5hdj5m3q6shphal1skv3i9j5m.apps.googleusercontent.com',
                apiKey = 'AIzaSyBjnMTlF9ou968qeDBc6LQpN860jJ0Juj0',
                scopes = 'https://www.googleapis.com/auth/youtube',
                oAuthComplete = false;

            function getOrigin () {
                return window.location.host;
            }

            function onPlayerStateChange(event) {
                setTimeout(function(){
                    switch (event.data) {
                        case YT.PlayerState.PLAYING:
                            var targetId = $(event.target.getIframe()).attr('id'), parentId, player;
                            for (parentId in videos) {
                                player = videos[parentId];
                                if (parentId !== targetId) {
                                    player.pauseVideo();
                                    player.cueVideoById(player.getVideoId(), player.getCurrentTime());
                                }
                                else if (!player.alreadyClicked) {
                                    player.alreadyClicked = true;
                                    trackVideo($('#sc-'+ player.getVideoId())[0]);
                                }
                            }
                            break;
                        case YT.PlayerState.ENDED:
                            player = event.target;
                            player.cueVideoById(player.getVideoId(), 0);
                            break;
                    }
                }, 0);
            }

            function injectVideo (containerId, options) {
                var ytPlayer, $containerId = $('#'+containerId),
                    $elems = $($containerId.parents().filter(':hidden').get().reverse()),
                    settings = {
                        opacity: 0,
                        display: 'block'
                    },
                    _settings = {
                        position: 'absolute',
                        top: -20000
                    },
                    existing = [],
                    width;

                $elems.length === 0 && (width = $containerId.width());

                $elems.each(function(index){
                    var tmp = {},
                        i;
                    for (i in settings) {
                        tmp[i] = this.style[i];
                        this.style[i] = settings[i];
                    }
                    width = $containerId.width();
                    if (index === 0) {
                        for (i in _settings) {
                            tmp[i] = this.style[i];
                            this.style[i] = _settings[i];
                        }
                    }
                    existing.push(tmp);
                    if (width) {
                        return false;
                    }
                });

                function resetStyles() {
                    $elems.each(function(index){
                        var i, comboSettings = index === 0 ? $.extend({},settings,_settings) : settings;
                        for (i in comboSettings) {
                            if (typeof existing[index] === 'undefined') {
                                return false;
                            }
                            typeof existing[index][i] !== 'undefined' && (this.style[i] = existing[index][i]);
                        }
                    });
                    $('.cvideo').find('iframe').attr('tabindex','-1');
                }

                function detectIE(){

                  var ua = window.navigator.userAgent;
                  var version = "";

                  var msie = ua.indexOf('MSIE ');
                  if (msie > -1) {
                    // IE 10 or older => return version number
                    version = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                  }

                  var msie = ua.indexOf('Trident/');
                  if (msie > -1) {
                    // IE 11 => return version number
                    var rv = ua.indexOf('rv:');
                    version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                  }

                  var msie = ua.indexOf('Edge/');
                  if (msie > -1) {
                    // IE 12 => return version number
                    version = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                  }

                  // other browser
                  if(version >= 10) {
                    return true;
                  }
                  else{
                    return false;
                  }

                }

                ytPlayer = new YT.Player(containerId, $.extend(options, {
                    width:width,
                    height:parseInt(width / (16 / 9)),
                    events: {
                        'onReady': function() {
                            resetStyles();
                        },
                        'onStateChange' : onPlayerStateChange
                    }
                }));

                YT.Player.prototype.getVideoId = function() {
                    var match = this.getVideoUrl().match(/[?&]v=([^&]+)/);
                    return match[1];
                };

                /* Added || condition for only mozilla browser , because we need to remove styles
                (opacity:0, display:block and position:absolute) from the container.
                Original conditions && document.querySelector is removed because it is checking for IE7 or lower verison, so we removed it.
                */
                if ((document.all) || ($.browser.mozilla) || (detectIE())) {
                    resetStyles();
                }

                return ytPlayer;
            }

            function getContainerId(videoId) {
                var containerId = ['video', Math.floor(Math.random() * 1000), videoId].join('_');
                if (!videos[containerId]) {
                    return containerId;
                }
                return getContainerId(videoId);
            }
            function isAlreadyAuthenticated () {
                return oAuthComplete;
            }
            function setAuthenticated (flag) {
                oAuthComplete = flag;
            }
            window.onYouTubePlayerAPIReady = function() {
                youTubePlayerAPIReady = true;
                processVideoQueue();
            };

            processVideoQueue = function() {
                if (youTubePlayerAPIReady !== true) {
                    return;
                }
                var parentContainer, options;
                for (parentContainer in videos) {
                    if ($('#'+parentContainer).length && !(videos[parentContainer] instanceof YT.Player)) {
                        options = $.extend(true, {}, defaults, videos[parentContainer]),
                            videos[parentContainer] = injectVideo(parentContainer, processOptions(options));
                    }
                }
            };

            getPlayer = function(id) {
                return videos[id];
            }
            authOnLoad = function(){

                gapi.client.setApiKey(apiKey);
                gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, function(authResult){

                    if (authResult && !authResult.error) {
                        setTimeout(function(){
                            Intuit.Library.Video.YouTubePlayer.resetAuth();
                        },authResult['expires_in']*1000);
                        setAuthenticated(true);


                        $('.youtube-like-button').each(function(){
                            var youtubeId = $(this).attr('data-youtube-id');
                            var likesObj = $(this);
                            gapi.client.load('youtube', 'v3', function() {
                                var request = gapi.client.youtube.videos.getRating({
                                    id: youtubeId
                                });

                                request.execute(function(resp) {

                                    for(var i =0;i< resp['items'].length;i++){
                                        if(resp['items'][i]['videoId'] ===  youtubeId && resp['items'][i]['rating'] === 'like'){
                                            $(likesObj).addClass('likeed-by-user');
                                        }

                                    };
                                });
                            });


                        });

                    }
                });

            }
            authenticate = function(videoId,performUpdate,immediate) {

                if(isAlreadyAuthenticated()) return performUpdate(videoId);
                gapi.client.setApiKey(apiKey);

                gapi.auth.authorize({client_id: clientId,scope: scopes, immediate: false}, function(authResult){
                    console.log(authResult);
                    if (authResult && !authResult.error) {
                        //authorizeButton.style.visibility = 'hidden';
                        //makeApiCall();


                        setTimeout(function(){
                            Intuit.Library.Video.YouTubePlayer.resetAuth();
                        },authResult['expires_in']*1000);
                        setAuthenticated(true);
                        performUpdate(videoId);
                    }
                });
            }


            updateYTLike = function(videoId){
                authenticate(videoId,function(videoId){

                    gapi.client.load('youtube', 'v3', function() {
                        var request = gapi.client.youtube.videos.rate({
                            // "mine: true" indicates that you want to retrieve the authenticated user's channel.
                            id: videoId,
                            rating: 'like'
                        });

                        request.execute(function(resp) {


                            $('.youtube-like-button').each(function(){
                                var youtubeId = $(this).attr('data-youtube-id');
                                var likesObj = $(this);
                                if(videoId === youtubeId){


                                    $.ajax({
                                        cache: false,
                                        url: "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+youtubeId+"&key="+apiKey,
                                        dataType: "json",
                                        success: function(data) {


                                            var likes = parseInt(data.items[0].statistics.likeCount);

                                            var actualVal = $(likesObj).find('.video-like-text').text();
                                            var actualValInt = parseInt(actualVal);


                                            if(likes !== 'NaN'){
                                                if(actualValInt === likes){
                                                    likes++;
                                                }
                                                $(likesObj).html('<div class="thumpsup-icon"></div><span class="video-like-text">'+formatCount(likes)+'</span>');
                                            }


                                            $(likesObj).addClass('likeed-by-user');
                                        }
                                    });

                                }
                            });
                        });
                    });
                },false);
            }

            formatCount = function(num){

                if(!num)
                    return 0;
                if(typeof num === 'undefined')
                    return 0;
                return  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            processOptions = function(options) {
                var name, value, output = {};
                output.playerVars = {};
                for (name in options) {
                    value = options[name];
                    name = name.toLowerCase();
                    value =
                        (value === true || value === 'true') ? 1 :
                            (value === false || value === 'false') ? 0 : value;

                    switch (name) {
                        case 'videoid':
                            output['videoId'] = value;
                            break;
                        default:
                            output.playerVars[name] = value;
                    }
                }
                return output;
            };

            initializeApiPlayer = function() {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/player_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            };

            autoInsert = function(options) {
                var youTube = Intuit.Library.Video.YouTubePlayer,
                    firstAutoPlay = true, scope,
                    loadoAuth = false;
                scope = (options && options['modal'])? $('.cmodal-page .cvideo'):$('.cvideo');
                scope.each(function(index){
                    //$('.cvideo').each(function(index){

                    var $this = $(this),
                        videoId = $this.attr('data-youtube-id'),
                        containerId = getContainerId(videoId),
                        hasAutoPlay = $this.attr('data-autoplay') === 'on' ? true : false,
                        hasShowLikes = $this.attr('data-showlikes') === 'true' ? true : false;

                    if(hasShowLikes && !loadoAuth)
                        loadoAuth = true;
                    // avoid video loaded twice in publisher and showroom, weird!
                    if ($this.find('iframe').length) {
                        return;
                    }


                    $this.append($('<div></div>').attr('id', containerId));

                    youTube.insert(containerId, videoId, {
                        autoPlay: firstAutoPlay && hasAutoPlay
                    });

                    hasAutoPlay && (firstAutoPlay = false);

                });
                if(loadoAuth){
                    var tag = document.createElement('script');
                    tag.src = "https://apis.google.com/js/client.js?onload=inititateoAuth";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


                    $('.youtube-like-button').on("click",function(){

                        if(!$(this).hasClass( "likeed-by-user" )){




                            var youtubeId = $(this).attr('data-youtube-id');
                            console.log(youtubeId);
                            Intuit.Library.Video.YouTubePlayer.updateLike(youtubeId);
                        }


                    });
                    var numberofviews = {};

                    $('.youtube-like-button').each(function(){
                        var youtubeId = $(this).attr('data-youtube-id');
                        var likesObj = $(this);
                        $.ajax({
                            cache: false,
                            url: "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+youtubeId+"&key="+apiKey,
                            dataType: "json",
                            success: function(data) {

                                var likes =  data.items[0].statistics.likeCount;

                                $(likesObj).html('<div class="thumpsup-icon"></div><span  class="video-like-text">'+formatCount(likes)+'</span>');
                                numberofviews[youtubeId] =data.items[0].statistics.viewCount;
                            }
                        });

                    });
                    $('.youtube-views').each(function(){
                        var youtubeId = $(this).attr('data-youtube-id');
                        var viewsObj = $(this);

                        if(typeof numberofviews[youtubeId] === 'undefined'){

                            $.ajax({
                                cache: false,
                                url: "https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+youtubeId+"&key="+apiKey,
                                dataType: "json",
                                success: function(data) {
                                    $(viewsObj).html('<span>'+formatCount(data.items[0].statistics.viewCount)+'</span>');
                                }
                            });

                        }
                        else{
                            $(viewsObj).html('<span>'+formatCount(numberofviews[youtubeId])+'</span>');
                        }
                    });



                    //authenticate('',function(vid){},true);
                }
                resizeVideo({responsive: false});
            };

            // trigger mousedown/touchend event of hidden a with sitecatalyst info
            // target is normal dom obj, but not jquery obj
            trackVideo = function(target) {
                $('body').trigger($.Event('mousedown', {target: target}));
            };

            getResponsiveVideoSize = function() {
                var winW;
                winW = $(window).innerWidth();
                // width is 80% of window width when windwo width is less than 1000px
                // otherwise fix as 800px
                // height, there's 40px padding to hold space for closing x icon
                w = parseInt(winW < 1000? winW*0.8:800);
                h = parseInt(w*9/16 + 40);
                return {width:w, height:h};
            };

            resizeVideo = function(options) {
                $(window).on('resize orientationchange', function() {
                    var videoSize;
                    if (options && options.responsive) {

                        videoSize = getResponsiveVideoSize();
                        $(".simplemodal-container.responsive-video").css({
                            width: videoSize.width,
                            height: videoSize.height
                        }).find('iframe').css({
                            width: videoSize.width,
                            height: videoSize.height
                        });
                    } else {
                        // this is only for inline video, make sure not including .cvideo.responsive-video
                        $(".cvideo").each(function () {
                            var $this = $(this), newWidth;
                            if ($this.hasClass('responsive-video')) return;

                            newWidth = $this.width();
                            $this.find('iframe').css({
                                width: newWidth,
                                height: parseInt(newWidth/(16/9))
                            });
                        });
                    }
                });
            };
            initResponsivePlayer = function() {
                $('.cvideo.responsive-video').click(function() {
                    var yvideo = $(this).find('iframe'), vid;
                    vid = yvideo.attr('id');

                    trackVideo($(this).next()[0]);

                    toggleSrc = function(vid, on) {
                        var elm = $("#" + vid), src, newSrc;
                        if (on) {
                            src = elm.attr('oldsrc')? elm.attr('oldsrc'):elm.attr('src');
                            newSrc = src.replace('autoplay=0', 'autoplay=1');
                            elm.attr('src', newSrc);
                        } else {
                            if (!elm.attr('oldsrc')) {
                                elm.attr('oldsrc', elm.attr('src'));
                            }
                            elm.attr('src', '');
                        }
                    };
                    // before open modal, set autoplay=1
                    toggleSrc(vid, true);
                    yvideo.modal({
                        onShow: function(dialog) {
                            var videoSize, w, h, winW;
                            dialog.overlay.addClass('show');

                            winW = $(window).innerWidth();
                            videoSize = getResponsiveVideoSize();
                            w = videoSize.width;
                            h = videoSize.height;
                            dialog.data.css({
                                'width': w,
                                'height': h
                            });

                            dialog.container.addClass('show responsive-video').css({
                                'width': w,
                                'left': (winW-w)*0.5,
                                'height': h,
                                'top': ($(window).height() - h)/2
                            });
                        },
                        onClose: function(dialog) {
                            dialog.overlay.removeClass('show');
                            dialog.container.removeClass('show');
                            $.modal.close();
                            // make sure to turn off video by rm src and cache it in oldsrc
                            toggleSrc(vid, false);

                        },
                        dataCss: {
                            padding: '40px 0 0',
                            backgroundColor: '#000'
                        },
                        closeHTML: '<a class="modalCloseImg global-sprite simplemodal-close" href="#" title="Close"></a>',
                        escClose: true,
                        overlayClose: true
                    });
                    resizeVideo({responsive: true});
                });
            };

            // based on custom load event, avoids race conditions
            $.wload(function() {
                autoInsert();
                initializeApiPlayer();
                initResponsivePlayer();
            });

            return {
                updateLike: function(videoId) {
                    updateYTLike(videoId);
                },
                authOnLoad: function() {
                    authOnLoad();

                },

                resetAuth: function() {

                    setAuthenticated(false);
                },

                insert: function(parentContainerEl, videoId, options) {
                    videos[parentContainerEl] = $.extend({
                        videoId:videoId
                    }, options || {});
                    return this;
                },
                play: function(parentContainerEl) {
                    var player = getPlayer(parentContainerEl);
                    player && player.playVideo();
                    return this;
                },
                pause: function(parentContainerEl) {
                    var player = getPlayer(parentContainerEl);
                    player && player.pauseVideo();
                    return this;
                },
                init: function(options) {
                    autoInsert(options);
                    processVideoQueue();
                    return this;
                }
            }
        }())
    });

}(jQuery, window, document));

/*global Intuit, CQ */
(function($, window, document){
    if (typeof Intuit.Utils.Constants === 'object') {
        return;
    }
    $.extend(Intuit.Utils, {

        Constants: (function(){

            var locale = "/en/us";
            var shoppingCartURL = location.protocol + "//quickbooks.intuit.com/commerce/common/fragments/legal_trademark_copyright.jsp";

            function setLocale(s){
				locale = s;
            }
            function setShoppingCartURL(s){
                shoppingCartURL = s;
            }

            return {
                getLocale: function () {
                    var str = $("html").attr('lang');
                    if (str == null || typeof str == "undefined") {
                        return locale; //if null or undefined , setting the var to "en/us"
                    }
          			str = str.replace("-","/").toLowerCase();
                    return str;
                },
                setLocale: function(s) {
					setLocale(s);
                },
                getShoppingCartURL: function() {
					return shoppingCartURL;
                },
				setShoppingCartURL: function(s) {
					setShoppingCartURL(s);
                }
            }
        }())
    });
}(jQuery, window, document));

/*global Intuit, CQ */
(function ($, window, document) {

  //Return check to not load standard_utils.js if available already
  var $window = Intuit.$window;
  //TODO: resolve use of $window and window
  if (typeof Intuit.Utils.Standard === 'object') {
    return;
  }
  $.extend(Intuit.Utils, {

    Standard: (function () {

      function doIsIE(agent) {
        var ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
          // IE 10 or older => return version number
          return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
          // IE 11 => return version number
          var rv = ua.indexOf('rv:');
          return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
          // Edge (IE 12+) => return version number
          return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
      }

      function doIsBrandX() {
        var isBrandX;
        var $header = $("#globalNavHeader").find(".site-header");
        if ($header.length) {
          if ($header.css('position') === 'fixed' && $header.css('zIndex') == 1010) {
            isBrandX = true;
          }
        }
        else {
          $header = $("#global-header");
          if ($header.length) {
            isBrandX = true;
          }
        }
        return isBrandX;
      }

      /**
       * Fancy setTimeout using Promises (for more readable code)
       * @param time
       * @returns {*}
       */
      function doWwait(time) {
        return $.Deferred(function (dfd) {
          setTimeout(dfd.resolve, time);
        });
      }

      function doToggleComponentBackgroundColor(editBar) {
        var highlightColor = 'rgb(173, 223, 255)';
        var $el = $($(editBar.element.dom)[0]);
        $el = $('*', $el);
        $el.each(function (index, element) {
          var $element = $(element);
          var currentColor = $element.css('backgroundColor');
          if (currentColor === highlightColor) {
            $element.css({backgroundColor: $element.data('originalBackgroundColor')});
          }
          else {
            $element.data('originalBackgroundColor', currentColor);
            $element.css({backgroundColor: highlightColor});
          }
        });
      }


      // This is part of the Rose-POC experiment
      function doCreateStaticNodesAfterDrop(path) {
        var p,
            r,
            dp = path,
            top_dp,
            fdp,
            i = dp.lastIndexOf("/container"),
            hc = "/apps/harmony/components/",
            imgs = ["QB_Pro_2016.png", "QB_Premier_2016.png", "QB_enterprise_2016.png"],
            imgname;

        if (i > 0) {
          dp = dp.slice(0, i);
        }
        //console.log('Start OrigPath=' + path + " DestPath=" + dp);
        top_dp = dp + "/container/grid_resp_0";
        p = {};
        p['sling:resourceType'] = 'harmony/components/resp/common/grid_resp';
        p['has_mobile'] = 'true';
        p['grid_type'] = 'grid-container-100';
        p['desktop_columns'] = '4-4-4';
        p['template_type'] = 'resp_temp';
        p['mobile_columns'] = '12-12-12';
        p['num_of_containers'] = '3';
        r = CQ.utils.HTTP.post(top_dp, null, p);

        for (i = 1; i <= 3; i++) {

          p = {};
          p['jcr:primaryType'] = 'nt:unstructured';
          p['sling:resourceType'] = hc + 'core/container';
          fdp = top_dp + "/cq-container" + i.toString();
          r = CQ.utils.HTTP.post(fdp, null, p);

          fdp += "/container";
          p = {};
          p['jcr:primaryType'] = 'nt:unstructured';
          p['sling:resourceType'] = 'foundation/components/parsys';
          r = CQ.utils.HTTP.post(fdp, null, p);

          p = {};
          p['sling:resourceType'] = hc + 'core/image';
          p['jcr:primaryType'] = 'nt:unstructu red';
          p['disable_image_scaling'] = 'true';
          p['fileReference'] = '/content/dam/intuit/quickbooks/lotus/' + imgs[i - 1];
          p['horizontal_align'] = 'center';
          r = CQ.utils.HTTP.post(fdp + "/image", null, p);

          imgname = imgs[i - 1];
          imgname = imgname.slice(0, imgname.lastIndexOf("."));
          p = {};
          p['sling:resourceType'] = hc + 'core/text';
          p['jcr:primaryType'] = 'nt:unstructured';
          p['textIsRich'] = 'true';
          p['text'] = '<p style="text-align: center;">More info about...</p> <h4 style="text-align: center;">' + imgname + '</h4>.\n';
          r = CQ.utils.HTTP.post(fdp + "/text", null, p);
          //console.log(r);
        }
        //console.log('End');
        CQ.Util.reload();
      }

      var excludeNodes = [
        'jcr:lastModified'
        , 'jcr:lastModifiedBy'
        , 'jcr:uuid', 'cq:lastModifiedBy'
        , 'jcr:versionHistory'
        , 'jcr:createdBy'
        , 'jcr:created'
        , 'guid'];

      //: Slice path
      function slice_nodepath(path, path_to_remove) {
        var lp,
            newpath = path;
        lp = newpath.lastIndexOf(path_to_remove);
        if (lp > 0) {
          newpath = newpath.slice(0, lp);
        }
        return newpath;
      }

      //: Copy from json src_tree into new page
      function cq_nodes_duplicate(src_tree, dest_path, new_node, params, level_one) {
        var the_value;

        //: generate the cq node path
        dest_path = dest_path + "/" + new_node;
        //: start with clean params array
        params = {};
        //: go thru the json tree nodes
        for (var the_key in src_tree) {
          the_value = src_tree[the_key];
          if (the_value === null || typeof(the_value) === "undefined") {
            console.log("Bad cq node a with node name=" + the_key);
          }
          else if (typeof(the_value) == "object") {
            //console.log("the_key="+the_key + " the_value="+the_value);
            cq_nodes_duplicate(the_value, dest_path, the_key, params, false);
          }
          else if ((!level_one) && (excludeNodes.lastIndexOf(the_key) < 0)) {
            //console.log('   p["' + the_key + '"] = "' + the_value + '"');
            params[the_key] = the_value;
          }
        }
        //: if we have params, let's duplicate the node with same properties
        if (Object.keys(params).length > 0) {
          // TODO check that node_path is not existent yet - only for first level nodes
          //var s = "";
          //for (var k in params){ s = s + '\n   p["' + k+ '"] = "' + params[k] + '"'; }
          //console.log("ADD node: '" + dest_path +  "' with " + s);
          r = CQ.utils.HTTP.post(dest_path, null, params);
          //console.log(r);
        }
      }

      //: Duplicate content from scr_path into the dest_page
      function doDuplicateNodesAfterDrop(dest_path, src_path, component_name) {
        // Note: dest_path gets truncated to 20 chars by JCR
        var url_paths = dest_path.split('/');
        var truncated_component_name = url_paths[url_paths.length - 1];

        // TODO: cq-main-container may change - based on template it was created... find the first container from the source page, get the json tree node
        var src_page = src_path + "/jcr:content/cq-main-container/container.infinity.json";
        var src_data = CQ.HTTP.get(CQ.HTTP.externalize(src_page));
        var src_tree = CQ.Util.eval(src_data);

        //: in the destination page path, backup to same level as the currently added readyrow node
        dest_path = slice_nodepath(dest_path, "/" + truncated_component_name);
        dest_path = slice_nodepath(dest_path, "/container");

        // assign component_name as a css class on the top-most container in the destination path
        CQ.utils.HTTP.post(dest_path, null, {class_name: component_name});

        //: call a recursive method to duplicate the nodes from the source
        cq_nodes_duplicate(src_tree, dest_path, "container", {}, false);

        //: reload the page
        CQ.Util.reload();
      }

      function doSetContainerBackgroundAfterDrop(/*path*/) {
        CQ.Util.reload();
      }

      // Not currently used, but it was about copying styles from the page to the RTE iframe to achieve WYSIWYG
      function doTransferStylesToRichTextIframe(rte) {
        var styleSheets = rte.iframe.ownerDocument.styleSheets;
        var iFrameHead = rte.iframe.contentDocument.head;
        for (var i = 0; i < styleSheets.length; i++) {
          // For each stylesheet in the parent document, append a clone of it to the iframe's head.
          iFrameHead.appendChild(styleSheets[i].ownerNode.cloneNode(true));
        }
      }

      var ctaContainer = {},
          params = [];
      // covers edge cases: CQ *publishing* envs (which lack a CQ object) and dev Showroom envs (which lack a Bootstrapper object)
      // TODO: our Showroom infrastructure should add a simple Intuit.showroom = true flag
      function inShowroom() {
        return (typeof window.Intuit.ShowRoomEnv === 'object');
      }

      function inNovo() {
        return (typeof window.Intuit.NovoEnv === 'object');
      }

      function doModifyDomElement(domSelector, domContent) {
        $(domSelector + "").html(domContent);
      }

      function doCQPathForShowroom(m_url) {
        // Adding env === publish condition as beginig of the function, 
        // because in case of publish mode modal url should be a cq url 
        // it should be modified .../showroom_cms/ path
        if (Intuit != null && (typeof Intuit.AEMMode === 'object') && (window.Intuit.AEMMode.env != undefined) && (window.Intuit.AEMMode.env === 'publish')) {
          return m_url;
        }
        var inSR = inShowroom(),
            thisLocaleString = Intuit.Utils.Constants.getLocale();//"/en/us";

        // function used to reformat modal URLs when they are called directly in JavaScript.
        // When modal URLs are handled by Showroom CTA component, the ruby code does this same manipulation
        if (inSR) { // if we're in Showroom, fix the modal-to-modal transition URL
          var urlEleArray = m_url.split(thisLocaleString);
          if (urlEleArray && urlEleArray.length > 1) {
            m_url = "/showroom_cms/content" + urlEleArray[1];
          }
        }
        return m_url;
      }

      function doEstablishEstoreSession() {
        var img = null;

        if (typeof window.Intuit.ShowRoomEnv !== 'object') {
          return;
        }
        var shoppingCartUrl = Intuit.Utils.Constants.getShoppingCartURL(); //TODO: Properties to add constant.js in there assets folder and setShoppingCartURL.
        if (document.cookie.indexOf('101_INTUIT_SESSIONID') !== -1) {
          if (getQueryParam("priorityCode") != "") {
            shoppingCartUrl += '?priorityCode=' + getQueryParam("priorityCode");
          }
          else {
            return "cookie-exists";
          }
        }
        try {
          if (window._aggregate_data && window._aggregate_data['dynamic_pricing']['priorityCode']) {
            params.push('&priorityCode='.concat(window._aggregate_data['dynamic_pricing']['priorityCode']));
          }
          if (params.length) {
            shoppingCartUrl += '?'.concat(params.join('&'));
          }
          else if (getQueryParam("priorityCode") != "") {
            shoppingCartUrl += '?priorityCode=' + getQueryParam("priorityCode");
          }
          else if (typeof sbweb !== "undefined" && sbweb.util.cookies.getCookie("priorityCode") != "") {
            shoppingCartUrl += '?priorityCode=' + sbweb.util.cookies.getCookie("priorityCode");
          }
          img = new Image();
          img.src = shoppingCartUrl;
        } catch (err) {
        }

        return img;
      }

      function doAsyncAddToCart(m_url) {

        var img = null;

        if (ctaContainer[m_url]) {
          return;
        }
        try {
          // async estore request
          ctaContainer[m_url] = true;
          img = new Image();
          if (sbweb.util.cookies.getCookie("priorityCode") != "") {
            m_url += '?priorityCode=' + sbweb.util.cookies.getCookie("priorityCode");
          }
          img.src = m_url;
        } catch (err) {
        }
        return img;
      }


      function doRadioOptionClick() {

        $("[id^='radio_option']").click(function () {
          var is_modal = $(this).attr("ismodal");
          var $ctaContinue = $('#cta-continue');

          $ctaContinue.removeAttr('data-onclose-url', null);
          $ctaContinue.removeAttr('data-wa-page', null);
          $ctaContinue.removeAttr('data-wa-link', null);

          if (is_modal == "true") {
            var modal_path = $(this).attr("modal_path"),
                on_close_url = $(this).attr("on_close_url"),
                modal_tracking = $(this).attr("modal_tracking");

            if (modal_path != "") {
              $ctaContinue.addClass("modal").attr("href", modal_path);
              if (on_close_url != '') {
                $ctaContinue.attr('data-onclose-url', on_close_url);
              }
              if (modal_tracking != '') {
                $ctaContinue.attr('data-wa-page', modal_tracking);
              }
            }
          } else {
            var static_end_url = $(this).attr("static_end_url");
            $ctaContinue.removeClass("modal").attr("href", static_end_url);
          }

        });
        //Added to activate CTA onload of modal/radio buttons
        $('#radio_option0').trigger('click');

        return true;

      }

      function doHandleModalLaborLaw() {
        //Added for labour law modal
        var paramName, paramValue, queryString, dropdown_title = '';

        $(".modal-labor-law").parent(".cmodal-page").css('height', 'auto');

        $(".modal-labor-law .body-container").append('<div class="message_box" style="display: none;"><label class="error_msg">Please select a state</label></div>');

        $('.modal-labor-law #static_dropdown').on('change', function () {

          paramName = $(this).attr("data-param-name");
          paramValue = $(this).val();
          dropdown_title = $('#static_dropdown option:first').val();
          if (paramName.length > 0) {
            if (paramName == 'cpcInstanceId') {
              queryString = '?' + paramName + '=' + paramValue + '&priorityCode=3896-23498541573';
            } else {
              queryString = '?' + paramName + '=' + paramValue + '&quantity=1';
            }
          } else {
            queryString = '';
          }


          if (paramValue == dropdown_title) {
            queryString = '';
          }

          $(".modal-labor-law .body-container .message_box").css("display", "none");
          $('.modal-labor-law #static_dropdown').css("border-color", "#000000");

          $('.modal-labor-law .ccta a').attr('href', function (index, value) {

            if (value == '') {
              value = '/commerce/e2e/checkout/redirect_to_cart.jsp';
            }
            else if (value.indexOf("?") != -1) {
              value = value.substring(0, value.indexOf("?"));
            }

            return value + queryString;

          });

        });

        $('.modal-labor-law .ccta a').on('click', function (event) {
          if ($(this).parents(".modal-labor-law").find("#static_dropdown")[0].selectedIndex == 0) {
            $(".modal-labor-law .body-container .message_box").css("display", "block");
            $('.modal-labor-law #static_dropdown').css("border-color", "#DC3C1E");
            event.preventDefault();
          }

        }); // labor law modal code ends

      }

      function doHandleModalFlash() {
        if ($(".cmodal-page .flash-container").length > 0) {
          $window.trigger('flash:resize');
        }
        return;
      }

      function doHandleModalVideo() {
        if ($(".cmodal-page .cvideo").length > 0) {
          $.defer(function () {
            $window.trigger('flash:resize');
            $(window).trigger('modal:open');
          });
        }
        return;
      }

      function doHandleModalCancel() {
        $('body').on('click', '#cta-cancel', function (e) {
          e.preventDefault();
          $.modal.close();
        });
        return;
      }

      function getQueryParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec((location.search).toLowerCase());
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      }

      function doHandleCostcoValidation(modalObj) {
        if ($(".cmodal-page .costco-validation").length > 0) {
          $.defer(function () {
            var productType = modalObj.data("ctaId") || "essentials";
            var cid = getQueryParam("cid");
            if (cid == "") {
              cid = "OEM-COS";
            }
            $(".cmodal-page .info-modal h2").css("display", "none");
            $("#simplemodal-container").css({"width": "550px", "height": "420px", "text-align": "center"});
            $(".cmodal-page").css({"width": "500px", "height": "inherit", "overflow-y": "hidden"});
            $(".cmodal-page .info-modal").css("padding-bottom", "0px");
            $(".cmodal-page .modal-container").css("width", "500px");
            $(".cmodal-page .costco-validation").append('<iframe src="/microsite/qbocostco/includes/costco_validation_form.jsp?CID=' + cid + '&width=440&scrolling=no&height=295&qboversion=' + productType + '" width="400" height="310" frameborder="0" z-index="1000" scrolling="no" id="dfaFrame"> </iframe>').show();
            $(".costco-validation").css({"width": "500px", "margin-top": "50px"});
          });
        }
        return;
      }

      function doModalResize() {
        //find any elements in modal that have class that starts with cmodal-resize
        //assumes this class exists with target modal width
        var target_element = $('[class*=" cmodal-resize"]');
        if (target_element.length) {
          var target_width = target_element.css("width");
          var target_padding = target_element.css("padding-left");
          var target_padding_num = target_padding.substring(0, target_padding.indexOf("px"));
          var target_width_num = target_width.substring(0, target_width.indexOf("px"));
          var cont_target_width = Number(target_width_num) + Number(2 * target_padding_num);
          var cont_width_px = "" + cont_target_width + "px";
          var cmodal_page = $('.cmodal-page');
          var cmodal_container = $('#simplemodal-container');

          cmodal_page.css("width", cont_width_px);
          cmodal_page.css("height", "auto");
          cmodal_container.css("width", cont_width_px);
        }

        return;
      }

      function doInitializeFormInModal() {
        var form = $('.cform.ws-validate');
        //Trigger Form Init only when form element is found
        if (form.length) {

          Intuit.Utils.Form.initialize(form);

          /* TODO: Need to reinvestigate webshims for Modals as its not calling call back function on first load. */
          /* Commenting the code for now untill we do above TODO for PAY1611
           webshims.polyfill('forms');
           webshims.ready('forms', function() {
           Intuit.Utils.Form.initialize(form);
           });
           */
        }
      }

      return {
        isIE: function() {
          return doIsIE();
        },
        isBrandX: function() {
          return doIsBrandX();
        },
        wait: function(time) {
          return doWwait(time);
        },
        inShowroom: function () {
          return inShowroom();
        },
        inNovo: function () {
          return inNovo();
        },
        cqPathForShowroom: function (m_url) {
          return doCQPathForShowroom(m_url);

        },
        eStoreSession: function () {
          return doEstablishEstoreSession();
        },
        asyncAddToCart: function (m_url) {
          return doAsyncAddToCart(m_url);

        },
        radioOptionClick: function () {
          doRadioOptionClick();
          return;
        },
        getContinueLink: function ($smodal) {
          $(".cmodal-page .continue a").on('click', function (e) {
            e.preventDefault();
            $.modal.close();
          });
          return $smodal.find('.continue_link a').attr('href');
        },
        bundleModalOnLoad: function ($smodal) {
          doHandleModalCancel();
          doRadioOptionClick();
          doHandleModalLaborLaw();
          doHandleModalFlash();
          doHandleModalVideo();
          doHandleCostcoValidation($smodal);
          doModalResize();
          doInitializeFormInModal();
          $smodal.resize();
          return;

        },
        modifyDomElement: function (domSelector, domContent) {
          return doModifyDomElement(domSelector, domContent);
        },
        addiOsSmartBanner: function (smartBannerAppId) {
          if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
            $('head').append("<meta name='apple-itunes-app' content='app-id=" + smartBannerAppId + ", app-argument=ios-promo'>");
          }
        },
        transferStylesToRichTextIframe: function (rte) {
          doTransferStylesToRichTextIframe(rte);
        },
        createStaticNodesAfterDrop: function (path) {
          doCreateStaticNodesAfterDrop(path);
        },
        setContainerBackgroundAfterDrop: function (path) {
          doSetContainerBackgroundAfterDrop(path);
        },
        duplicateNodesAfterDrop: function (to_path, from_path, component_name) {
          doDuplicateNodesAfterDrop(to_path, from_path, component_name);
        },
        toggleComponentBackgroundColor: function (editBar) {
          doToggleComponentBackgroundColor(editBar);
        }
      }
    }())
  });
}(jQuery, window, document));

/**
 * Accordion
 * by Anupriya Haribabu
 *
 * Lightweight accordion built on top of bootstrap3 collapse and transition plugin.
 *
 * Primary modifications include:
 *  
 *
 * Forked and modified from:
 *
 */
(function($){
	Intuit.Utils = Intuit.Utils || {};

    $.fn.caccordion = function( accEl, params ) {
        var accElement = $(accEl),
            caccElement = $(".cfeatures-accordion"),
            defaults = {
                content: false,
                chevron: false,
                togglebgcolor: false,
                swap: false,
                dchevron: "chevron-d-icon-8x12",
                rchevron: "chevron-r-icon-8x12",
                callback: false
            };
        var config = $.extend(defaults, params);
        var toggleChevron = function(e){
            if(config.chevron){
				var toggleStr = config.rchevron+" "+config.dchevron;
                $(e.target)
                    .prev('.panel-heading')
                    .find("span.indicator")
                    .toggleClass(toggleStr);
            }
        };
        var swapContent = function(e){
            if(config.content){
            	var cont = $("."+e.target.id);
            	cont.addClass('cactive').siblings('.cactive').removeClass('cactive');
            }
        }
        var toggleBgColor = function(e){
            if(config.togglebgcolor){
                var header = $(e.target).prev(),
                    aBgColor = ["bg-blue","bg-magenta","bg-white"];
				// loop through available classes, if exists add/remove additional classname 'bg-color-open'
                for (var i=0;i<aBgColor.length;i++){
                    if($(header).hasClass(aBgColor[i])){
						$(header).toggleClass(aBgColor[i]+'-open')
                    }
                }
            }
        }
        accElement.on('shown.bs.collapse', function(e){
            e.stopImmediatePropagation();
            toggleChevron(e);
            toggleBgColor(e);
            swapContent(e);
        });
        accElement.on('hidden.bs.collapse', function(e){
            e.stopImmediatePropagation();
            toggleChevron(e);
            toggleBgColor(e);
        });
        if(typeof(config.callback)==="function") {
            config.callback.call(this);
        }
        return {
        }
    }
})(jQuery);

$(document).ready(function () {

  var $quickNav = $("#mainHeader");  // cache nav container to var
  var $ftrFooter = $("#ftr-Footer"); // cache footer container to var
  var $moreIntuit = $("#moreFromIntuit"); //cache "more from intuit" drawer section
  var $body = $(document.body) // cache the body of the document


  $moreIntuit.find('a').attr('tabIndex', -1);
  $('#moreFromIntuitLink').click(function () {
    removeTabIndex($moreIntuit);
  });

  $('#closeMoreFromIntuit').click(function () {
    addTabIndex($moreIntuit);
  });


  // make skip-link work in Chrome and Safari. Without this, hitting skip link would continue in normal flow/order.
  $('.skip a').click(function () {
    $("#main").focus();
  });

  /* browser conditional rules */

  /* ie7 - 9 hacks */

  if ($.browser.msie && $.browser.version <= 9) {

    $quickNav.find('#quickNavBreadcrumbs li').not(':first-child').prepend('<span style="margin-right: 5px;"></span>'); // add ">" separator between breadcrumbs

  }

  /*/ie7 - 9 hacks */

  /* ie7 - 8 hacks */

//    if ($.browser.msie && $.browser.version <= 8 ) {


  $('#moreFromIntuitLink, #closeMoreFromIntuit').on('click', function (e) {
    e.preventDefault();
    if (!Modernizr.csstransitions) {
      if ($quickNav.hasClass('more-from-intuit-open')) {
        $("#moreFromIntuit").slideUp(200, function () {
          $quickNav.toggleClass('more-from-intuit-open');
        });

      } else {
        $("#moreFromIntuit").slideDown(200, function () {
          $quickNav.toggleClass('more-from-intuit-open');
        });
      }
    } else {
      $quickNav.toggleClass('more-from-intuit-open');
    }
  });

  /* /ie7 - 8 hacks */

  /* safari hacks */

  /* earlier than version 536 */

  (function () {

    var ua = navigator.userAgent.toLowerCase();
    var check = function (r) {
      return r.test(ua);
    };
    var isChrome = check(/chrome/);
    var isSafari = !isChrome && check(/safari/);

    if (isSafari && parseInt($.browser.version) < 536) {

      $quickNav.addClass('safari-lt-536'); // fix for defect DE4337: ensure proper alignment of property logo on Safari

    }

  })();

  /*/earlier than version 536 */

  /*/safari hacks */

  /* /browser conditional rules */

  /* ------------------------------------------------------- */

  /* custom tracking */

  (function () {

    function quickNavAnalyticsClick(el) {
      var scId = $(el).attr('data-sc');
      if (scId != undefined) {
        //navClick(scId);  // send beacon (call existing fcn from sc_header_common.js)
      }
    }

    $body.on('click', 'a', function () {
      quickNavAnalyticsClick(this);
    });

  })();


  //prevent empty search terms from being submitted
  $('#isearch').submit(function (e) {
    if ($('#search_term').val() == "" || $('#search_term').val() == "Search") {
      e.preventDefault();
    }
  });

  //this input field is no longer in the header, it is now in the "bridge" footer
  $('#search_term').focus(function () {
    if ($(this).val() == "Search this site") {
      $(this).val("");
      $(this).parent().toggleClass("with-data");
    }
  }).blur(function () {
    if ($(this).val() == "") {
      $(this).val("Search this site");
      $(this).parent().toggleClass("with-data");
    }
  });

  displayLinksOnSigninHover();
});


/* delay loading / lazy load */

/* determine if DST is in effect */

// A free script from: www.mresoftware.com
function DST(today) {
  var yr = today.getFullYear();
  var dst_start = new Date("March 14, " + yr + " 02:00:00"); // 2nd Sunday in March can't occur after the 14th
  var dst_end = new Date("November 07, " + yr + " 02:00:00"); // 1st Sunday in November can't occur after the 7th
  var day = dst_start.getDay(); // day of week of 14th
  dst_start.setDate(14 - day); // Calculate 2nd Sunday in March of this year
  day = dst_end.getDay(); // day of the week of 7th
  dst_end.setDate(7 - day); // Calculate first Sunday in November of this year
  return (today >= dst_start && today < dst_end);
}

/* /determine if DST is in effect */

$(window).load(function () {

  /* phone info - display call center open/closed */

  var d = new Date();

  // if DST is true and UTC time is between 12-24, except on Sat or Sun, or between 0-1, except on Sun or Mon |OR| DST is false and UTC time is between 13-24, except for on Sat or Sun, or between 0-2, except for Sun or Mon, add the 'open' class to the time module/s
  if (
      (  DST(d) && ( ( d.getUTCHours() >= 12 && !( d.getUTCDay() == 6 || d.getUTCDay() == 0 ) ) || ( d.getUTCHours() < 1 && !( d.getUTCDay() == 0 || d.getUTCDay() == 1 ) ) ) ) ||
      ( !DST(d) && ( ( d.getUTCHours() >= 13 && !( d.getUTCDay() == 6 || d.getUTCDay() == 0 ) ) || ( d.getUTCHours() <= 1 && !( d.getUTCDay() == 0 || d.getUTCDay() == 1 ) ) ) )
  ) {
    $('#mainHeader .call-center-status, #phoneInfoModule .call-center-status').addClass('open');
  }

  /* /phone info - call center open/closed */

  /* nav bar - highlight active primary link */
  function href_path(s, w) {
    // console.log(w+"1: " + s);
    if (s.length > 1 && s.split('//') > 1) {
      var paths = s.split('//')[1].split('?')[0].split('#')[0];
      var c = paths.indexOf("/");
      var s2 = paths.slice(c).replace(/\x2F$/, '').toLowerCase();
      // console.log(w+"2: " + s2 +"");
      return s2;
    }
    return s;
  }

  $('#mainHeader .nav-bar-top-links > a').each(function () {
    if (href_path(this.getAttribute('href'), "attr") == href_path(location.href, "location"))
    //console.log("match! " + location.href) ;
      $(this).parent().addClass('active');
  });


  /* /nav bar - highlight active primary link */


});


//make anchor links not navigable by hitting tab if more from intuit drawer is closed
function removeTabIndex(section) {
  section.find('a').removeAttr('tabindex');
  $('.intuit-logo').parent().focus();
}

function addTabIndex(section) {
  section.find('a').attr('tabindex', -1);
}
/* /delay loading / lazy load */


function GetCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function goToCartWithPriorityCode() {
  var pCode = GetCookie("priorityCode");
  host = "quickbooks.intuit.com";

  cartURL = "https://" + host + "/commerce/e2e/cart/shopping_cart.jsp?priorityCode=" + pCode;
  document.location = cartURL;
}

// added below function for displaying links on sign-in button hover for Sharable template

function displayLinksOnSigninHover() {

  $(".boiler-header .boiler-signin-container a.ctasecondary").hover(
      function () {
        $(".boiler-header .boiler-signin-container ul").addClass('signin-hover');
        $(this).css('box-shadow', '0px 3px 0px #000 20%');
        $(".boiler-header .boiler-signin-container ul").css('border-top', '3px solid #ccc');
      },
      function () {
        $(".boiler-header .boiler-signin-container ul").removeClass('signin-hover')
      }
  );

  $(".boiler-header .boiler-signin-container ul").hover(
      function () {
        $(".boiler-header .boiler-signin-container ul").addClass('signin-hover')
      },
      function () {
        $(".boiler-header .boiler-signin-container ul").removeClass('signin-hover');
        $(".boiler-header .boiler-signin-container a.ctasecondary").css('box-shadow', '0px 2px 0px #fff');
      }
  );
  if (Intuit.Utils.Standard.isBrandX()) {
    $(".global-header-resp .navhdr-cta a[class^='cta']:eq(0)").hover(
        function () {
          $(".global-header-resp .navhdr-cta ul").addClass('signin-hover').css('right', 0);
          $(this).css('box-shadow', '0px 3px 0px #000 20%');
          $(".global-header-resp .navhdr-cta ul").css('border-top', '2px solid #ccc');
        },
        function () {
          $(".global-header-resp .navhdr-cta ul").removeClass('signin-hover')
        }
    );
  } else {
    $(".global-header-resp .navhdr-cta a[class^='cta']:eq(1)").hover(
        function () {
          $(".global-header-resp .navhdr-cta ul").addClass('signin-hover').css('right', (($(".global-header-resp .ctasecondary").parent().width() - $(".global-header-resp .ctasecondary").outerWidth(true)) / 2));
          $(this).css('box-shadow', '0px 3px 0px #000 20%');
          $(".global-header-resp .navhdr-cta ul").css('border-top', '2px solid #ccc');
        },
        function () {
          $(".global-header-resp .navhdr-cta ul").removeClass('signin-hover')
        }
    );
  }

  $(".global-header-resp .navhdr-cta ul").hover(
      function () {
        $(".global-header-resp .navhdr-cta ul").addClass('signin-hover');
        $(".global-header-resp .cta-sign-in").addClass('hover');
        $(".global-header-resp .navhdr-cta .cta-container a.ctaplain").css('border-bottom', '3px solid #2b9d1b');
      },
      function () {
        $(".global-header-resp .navhdr-cta ul").removeClass('signin-hover');
        $(".global-header-resp .cta-sign-in").removeClass('hover');
        $(".global-header-resp .navhdr-cta a.has-submenu").css('box-shadow', '0px 2px 0px #fff');
        $(".global-header-resp .navhdr-cta .cta-container a.ctaplain").css('border-bottom', '');
      }
  );


  $(".global-header-resp .navhdr-cta .cta-container a.ctaplain").hover(
      function () {
        $(".global-header-resp .navhdr-cta .cta-container ul").addClass('signin-hover').css('right', ($(".global-header-resp .navhdr-cta .cta-container ul").parent().width() - $(".global-header-resp .navhdr-cta .cta-container a.ctaplain").width())).css('top', ( $(".global-header-resp .navhdr-cta .cta-container a.ctaplain").css('border-bottom-width').replace("px", "") - (($(".global-header-resp .navhdr-cta .cta-container a.ctaplain").parent().height() - $(".global-header-resp .navhdr-cta .cta-container a.ctaplain").height()) / 2)));

        $(this).css('box-shadow', '0px 3px 0px #000 20%');
        $(".global-header-resp .navhdr-cta ul").css('border-top', '2px solid #ccc');

      },
      function () {
        $(".global-header-resp .navhdr-cta ul").removeClass('signin-hover')
      }
  );

}

$(document).ready(function () {
  // set initial position based on sticky support outmost container, add a 40 px offset to show icons in blue box only
  var $headerRightColumn = $('.header-right-col');
  var container_width = $headerRightColumn.width();
  var container_position = -container_width + 40;
  // move to the right based on new position
  $headerRightColumn.css({"right": container_position});

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  // triggered by on hover, slides button out or back in
  var set_slide_position = function () {
    // get DOM object
    var that = arguments[0];

    // get the initial right position
    var initial_position = $(that).css("right");

    // get container classname
    var container = arguments[1];
    var container2 = arguments[2];

    // get content container only since blue icon width is fixed at 40px
    var content_container = $(that).find(container);
    var content_container2 = $(that).find(container2);

    // get content container width
    var content_width = $(content_container).width();
    var content_width2 = $(content_container2).width();

    // if more than one container in <li> (container2 = true), choose maxwidth container
    if (container2) {
      content_width = (content_width2 > content_width) ? content_width2 : content_width;
    }

    // set new position to animate to with offset that considers CSS 8px padding
    var content_position = content_width + 16;

    // set both content containers to same width
    $(content_container).width(content_width);
    $(content_container2).width(content_width);

    // animate appropriately
    if (initial_position == "auto" || initial_position == "0px")
      $(that).animate({"right": content_position}, 500);
    else
      $(that).animate({"right": "0px"}, 500);
  };

  if (isMobile.any()) {
    $(".phone-icon-section").on("touchstart", function (e) {
      set_slide_position(this, ".phone-icon-content", ".for-sales-content");
    });

    $(".chat-icon-section").on("touchstart", function (e) {
      set_slide_position(this, ".chat-button-container");
    });
  }
  else {
    $(".phone-icon-section").hover(function () {
      set_slide_position(this, ".phone-icon-content", ".for-sales-content");
    });

    $(".chat-icon-section").hover(function () {
      set_slide_position(this, ".chat-button-container");
    });
  }
});
$(document).ready(function () {


    var total_images = $(".cpricing-card img").length;
    var images_loaded = 0;

    if(total_images==0){
        applyPricingCardHeight();
    }

    $(".cpricing-card").find('img').each(function() {
        var fakeSrc = $(this).attr('src');
        $("<img/>").attr("src", fakeSrc).css('display', 'none').load(function() {
            images_loaded++;
            if (images_loaded >= total_images) {
                $(".cpricing-card img").show();
                applyPricingCardHeight();
            }
        });

    });

});

function applyPricingCardHeight() {

    // Loop thorugh each row(grid),
    $(".row ").each(function () {

        //Find pricing card collection from each grid
        var row_pricingcard_collection = $(this).find(".pricing-card-content").map(function () {
            return $(this).height();
        }).get();

        //Find max height for Pricing Card from each grid Collection
        maxHeight = Math.max.apply(null, row_pricingcard_collection);
        if ($(this).parents('.wizard').length <= 0)//Exclude to set height if it is inside the wizard
        {
            var pCard = $(this).find(".pricing-card-content");
            var heightSet =  pCard.attr('hasHeightStyle');
            if(heightSet && heightSet.length > 0){

            }else{
                if ($(".cq-wcm-edit").length){

                }else{
                	pCard.height(maxHeight);
                }
                pCard.attr('hasHeightStyle',true);
            }

        }


    });

    // loop through each pricing card; remove border of last content-wrapper
    $(".cpricing-card").each(function () {
        var content_wrapper = $(this).find(".content-wrapper").last().css("border", "none");
    });

}

$(function(){
    $('#form-answerxchange').on('submit', function(e){
        var $q = $('#ax-q');
        $q.length && $.trim($q.val()) == '' && e.preventDefault();
    });
});
// Modernizr for Input Field

$(document).ready(function(){

if(!Modernizr.input.placeholder){

	$('[placeholder]').focus(function() {
	  var input = $(this);
	  if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');
	  }
	}).blur(function() {
	  var input = $(this);
	  if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));
	  }
	}).blur();
	$('[placeholder]').parents('form').submit(function() {
	  $(this).find('[placeholder]').each(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
		  input.val('');
		}
	  })
	});

}


});

// Please check below files for remaning JS code 
// /etc/designs/harmony/assets/standard/js/email_capture_util.js
// /etc/designs/harmony/assets/standard/js/validator.js





function initializeHeroCarousel(slidespeed, autoslide_speed, hero_carousel_id) {
    hero_carousel_id = "#" + hero_carousel_id;

    slidespeed = Number(slidespeed);
    autoslide_speed = Number(autoslide_speed);

    $(hero_carousel_id).each(function(){
        $(this).heroCarousel
        (
            {
                clicknext : false,
                slidespeed: slidespeed,
                auto: autoslide_speed,
                infinite_carousel : true
            }
        );

    });
}


function initializeHeroCarouselWCMMode(slidespeed, autoslide_speed, hero_carousel_id) {
    hero_carousel_id = "#" + hero_carousel_id;

    slidespeed = Number(slidespeed);
    autoslide_speed = Number(autoslide_speed);

    $(hero_carousel_id).each(function(){
        $(this).heroCarousel
        (
            {
                clicknext : false,
                slidespeed: slidespeed,
                auto: autoslide_speed
            }
        );
        // simplerCarousel api info at https://github.com/jayhung/simplerCarousel
    });
}

function debouncing() {
    (function($,sr){

        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        var debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap)
                        func.apply(obj, args);
                    timeout = null;
                };

                if (timeout)
                    clearTimeout(timeout);
                else if (execAsap)
                    func.apply(obj, args);

                timeout = setTimeout(delayed, threshold || 100);
            };
        }
        // smartresize_hero
        jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })(jQuery,'smartresize_hero');

}

function set_hero_carousel_viewport(viewport_id)
{
    viewport_id = "#" + viewport_id;
    var w_width = $( window ).width(),
    e_carousel = $(viewport_id),
    e_hero,
    w_carousel = e_carousel || e_carousel.width(),
    image_size = 1600,
    hero_size = 940,
    w_hero,
    image_margin_left;

    if ((w_width < 1600) && e_carousel) {
        image_margin_left = ((image_size - w_width) / 2) * -1;
        e_carousel.width(w_width + image_margin_left * -1);
        e_carousel.css("margin-left", image_margin_left);
        if (w_width < (hero_size - 0)) {
            e_carousel.find(".content-container-hero").width(w_width);
        }
        else {
            e_carousel.find(".content-container-hero").width(hero_size);
        }
    }
    else if ((w_width > 1600) && e_carousel) {
        e_carousel.width(image_size);
        e_carousel.css("margin-left", "");
        e_carousel.find(".content-container-hero").width(hero_size);
    }
}


$(document).ready(function(){
    
    //Check if its Labour Law RSS Component Present on page
    if ($('.clabor-law').length) {

        var $laborLawStates = $('#labor_law_states');
        var $noStateDetails =  $('.no-state-details');
        var $stateMap =  $('.states-map');
        var $stateFeedContent = $('.state-feed-content');
        var $rssFailureMsg = $('.rss-fail');
        var $defaultStateFeedContent = $('.default-state-feed-content');


        $laborLawStates.change(function(){

            var $selectedState = $laborLawStates.find("option:selected");
            
            var selected_state_text = $selectedState.text();
            var selected_state_code = $selectedState.val();

            var $selectedRssData = $('*[data-state="'+ selected_state_text +'"]:lt(2)') ;
            
            //Reset Labor Law Content Visiblity
            $stateFeedContent.attr('class', 'state-feed-content state_hidden');
            
            //Update Labor Law Content
            if($selectedRssData.length){
                $noStateDetails.hide();
                $selectedRssData.addClass('state_visible').removeClass('state_hidden');
            }else{
                $noStateDetails.show();
            }
            
            //Update Map Image as per selected state
            $stateMap.attr('class', 'states-map').addClass(selected_state_text.toLowerCase().replace(/\s/g, '-'));
            
            //Trigger SiteCatalyst
            if (typeof(analyticsClick) != "undefined") {
                analyticsClick('paym_laborposter_statelaw_dropdown_'+selected_state_code); 
            }

            if(selected_state_text=='Select'){
                $noStateDetails.hide();
                $stateMap.attr('class', 'states-map');
            }
        });
        
        function getParameterByName(name){
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        //Check for Showroom Env
        if(typeof window.Intuit.ShowRoomEnv !== "undefined")
        {
            var state = getParameterByName("state");
            var state_matched = false;
            if(state != ""){
                //Set Region as per GEO IP response
                $laborLawStates.find('option').each(function(){ 
                    // Check For Matches Then Set It As Selected
                    if($(this).attr('value') == state.toUpperCase()){
                        $(this).attr('selected','selected');  
                        $laborLawStates.change();
                        state_matched = true;                  
                    } 
                });
            }

            if(state_matched == false) {
                //Get GEO IP Region Code
                $.ajax({
                    url: "/harmony_cms/get_country_and_region/"
                })
                .done(function( data ) {
                    var region_code =  data['region_code'] ;
                    if( region_code.length > 0 ){

                        //Set Region as per GEO IP response
                        $laborLawStates.find('option').each(function(){ 
                            // Check For Matches Then Set It As Selected
                            if($(this).attr('value') == region_code){
                                $(this).attr('selected','selected');  
                                $laborLawStates.change();                  
                            }   
                        });
                    }
                })
                .fail(function() {
                    //Not able to fetch GEOIP Location
                });
            }
        }

        if( $stateFeedContent.length === 0 ){ // Check if RSS Feed Content is populated
            //Default Error MSG when RSS Feed Fails
            $noStateDetails.html('Sorry, we are not able to pull the labor law changes in your state at this moment. Please visit www.dol.gov for more information.'); 
            //Error MSG when RSS Feed Fails
            $noStateDetails.html($rssFailureMsg.html());            
        }

        if( $defaultStateFeedContent.length === 0 ){ // Check if Federal content is loaded
            //Show Default Message for Federal
            $('.no-default-state-feed-content').show();            
        }

    }
});
$(document).ready(function () {
    applyPricingCardContentHeight(".pricing-card-layout .table-row .pricing-card-layout-content-wrapper");
    $(".pricing-card-layout .table-row").each(function(){ 
        $(this).find(".pricing-card-layout-content-wrapper").last().css("border-right","none"); 
    });
});

function applyPricingCardContentHeight(selector) {
    // Loop thorugh each pricing column
    var row_pricingcard_collection = $(selector).map(function () {
        return $(this).height();
    }).get();
    //Find max height for Pricing Card Content from each column
    maxHeight = Math.max.apply(null, row_pricingcard_collection);
    $(selector).each(function () {
        if ($(".cq-wcm-edit").length){
        }
        else {
            $(this).height(maxHeight);
        }
    });
}
/** Product Component Comp Chart JS changes **/
$(window).load(function(){
    $('.comp-chart-header-container .eCommerce-product-div').each(function(){
        var productDivObj = $(this);
        if(productDivObj.parent().width() <= 110 &&  productDivObj.find(".price .line-through").length > 0){
            if(productDivObj.find('.high-attention-text').html().indexOf("br") < 0){
                $(this).find('.high-attention-text').html($(this).find('.high-attention-text').html().replace('%', '%<br />'));
            }
        }
    });
    
    $('.column-size-is-large .comp-chart-header-container .eCommerce-product-div, .ccomp-table-yoy-header .cqpricing2 .eCommerce-product-div, ccomp-table-yoy-header .cqpricing .eCommerce-product-div').each(function(){
        var productDivObj = $(this);
		if(productDivObj.find(".price .line-through").length == 0){
			$(this).find('.price').css("margin-left", "0px");
        }
    });
});
function getQueryParamString(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).ready(function(){
    if(getQueryParamString("partner_uid") != "") {
        $(".eCommerce-product-div a.ctasecondary, .eCommerce-product-div .tryit-free-link-url a").each(function(){ 
            var hrefVal = $(this).attr("href"); 
            var paramSeparator = "&"; 
            if(!hrefVal.match(/\?/)) {
                paramSeparator = "?";
            }
            if(!hrefVal.match(/selfemployed/)) {
                var cidVal = getQueryParamString('cid') || getQueryParamString('CID');
                cidVal = (cidVal == "") ? "" : "&cid="+cidVal;
                hrefVal=hrefVal+paramSeparator+"partner_uid="+getQueryParamString("partner_uid")+cidVal; 
                $(this).attr("href", hrefVal);
            }  
        });
    }

    $(".tooltip").each(function(){
        setHoverTracking($(this),$(this).attr("data-tracking"));
    });
});

function setHoverTracking(obj,trackingVal){
  obj.one('mouseover',function(){
       setTimeout(function(){ 
        wa.trackLink(obj,trackingVal); 
        setHoverTracking(obj,trackingVal);
       }, 2000);
  });
}
$(document).ready(function () {

  function init() {

    if (!Intuit.Utils.Standard.inShowroom() || Intuit.Utils.Standard.inNovo()) {
      //use inShowroom function to only run when page is NOT rendered by Showroom. This includes Author edit and preview mode *and* CQ Publisher
      // take care of swapping the checkmark while in edit or preview mode.

      var chars_replace = ["\u2713", "\u2714", "\u2117", "✓", "✔", "🅿"];
      var chars_classes = ["checkmark", "checkmark_heavy", "p_block", "checkmark", "checkmark_heavy", "p_block"];

      $(".comparison-chart table td").each(function (/*e*/) {
        var _this = $(this);
        $(chars_replace).each(function (index, chr) {
          _this.addClass('iconcell');
          _this.html(_this.html().replace(chr, '<span class="' + chars_classes[index] + '"></span>'));
        });
      });
    }

    identifyTableRowType();
    paintTableRows();
    addTableEventHandlers();
  }

  init();


  function identifyTableRowType() {
    // find child nodes, strip ## from the text; add attribute identifying as child node, and hide initially
    $("td:contains('##')").each(function () {
      var childValue = $(this).html();
      childValue = childValue.replace("##", "");
      $(this).html(childValue).addClass("comp-chart-childNode");
      $(this).parent().hide().attr("data-childNode", "true");
    });

    // find parent nodes; add attribute identifying as parent node
    $("a[href*='parent']").each(function () {
      var parentNode = $(this).parent().parent();
      $(this).parent().prepend('<span class="arrow-e"></span>');
      parentNode.attr("data-parentNode", "true");
    });

    // find show more child nodes, strip ** from the text; add attribute identifying as show more child node, and hide initially
    $("td:contains('**')").each(function () {
      var showValue = $(this).html();
      showValue = showValue.replace("**", "");
      $(this).html(showValue).addClass("comp-chart-showNode");
      $(this).parent().hide().attr("data-showNode", "true");
    });

    // find show more parent nodes; add attribute identifying as show more parent node
    $("a[href*='show-more']").each(function () {
      var showMoreParentNode = $(this).parent().parent();
      $(this).parent().prepend('<span class="arrow-e"></span>');
      showMoreParentNode.attr("data-showMoreParentNode", "true");
    });
    // find show less parent nodes; add hide them
    $("a[href*='show-less']").each(function () {
      $(this).hide();
    });
  }

  function paintTableRows() {
    // paint even rows
    var alternateSwitch = false;
    $(".comparison-chart table tr:not([data-childNode])").each(function () {
      if (alternateSwitch === true) {
        $(this).addClass("alternate-bg");
        alternateSwitch = false;
      } else {
        alternateSwitch = true;
      }
      var $this = $(this);
      if ($this.attr("data-parentNode")) {
        $this.nextUntil($("tr:not([data-childNode])"), $("tr[data-childNode]")).css("background-color", $this.css("background-color"));
      }
    });
  }

  function addTableEventHandlers() {
    // Toggle child nodes of parent nodes
    $("a[href*='parent']").click(function (event) {
      event.preventDefault();
      var parentNode = $(this).parent().parent();
      $(this).parent().find('span').toggleClass("arrow-s");
      parentNode.nextUntil($("tr:not([data-childNode])"), $("tr[data-childNode]")).toggle();
    });

    // Toggle show more and show less child nodes
    $("a[href*='show-more']").click(function (event) {
      event.preventDefault();
      var parentShowNode = $(this).parent().parent();
      $(this).parent().find('span').toggleClass("arrow-s");
      $(this).hide();
      $(this).next().show();
      parentShowNode.nextUntil($("tr:not([data-showNode])"), $("tr[data-showNode]")).toggle();
    });

    // Toggle show less and show more child nodes
    $("a[href*='show-less']").click(function (event) {
      event.preventDefault();
      var parentShowLessNode = $(this).parent().parent();
      $(this).parent().find('span').removeClass("arrow-s");
      $(this).hide();
      $(this).prev().show();
      parentShowLessNode.nextUntil($("tr:not([data-showNode])"), $("tr[data-showNode]")).toggle();

    });

    // hook 'Expand All' link if found, and show South arrow when expanding parent nodes
    $("a[href*='#expand']").click(function (event) {
      event.preventDefault();
      $("a[href*='parent']").each(function () {
        var parentNode = $(this).parent();
        parentNode.find('span').addClass("arrow-s");
      });
      $("a[href*='show-more']").each(function () {
        var parentShowNode = $(this).parent();
        parentShowNode.find('span').addClass("arrow-s");
        $("a[href*='show-less']").show();
        $("a[href*='show-more']").hide();
      });
      $("tr[data-childNode]").show();
      $("tr[data-showNode]").show();
    });

    // hook 'Collapse All' link if found, and remove the South arrow when collapsing parent nodes
    $("a[href*='#collapse']").click(function (event) {
      event.preventDefault();
      $("a[href*='parent']").each(function () {
        var parentNode = $(this).parent();
        parentNode.find('span').removeClass("arrow-s");
      });
      $("a[href*='show-less']").each(function () {
        var parentShowNode = $(this).parent();
        parentShowNode.find('span').removeClass("arrow-s");
        $("a[href*='show-less']").hide();
        $("a[href*='show-more']").show();
      });
      $("tr[data-childNode]").hide();
      $("tr[data-showNode]").hide();
    });

  }

  function UpdateTableHeaders() {
    $(".comp-chart-persist-area").each(function () {
      var el = $(this),
          offset = el.offset(),
          scrollTop = $(window).scrollTop(),
          floatingHeader = $(".comp-chart-sticky-header", this);

      if ((scrollTop > offset.top) && (scrollTop < (offset.top + el.height() - floatingHeader.height() ) )) {
        floatingHeader.css({
          "visibility": "visible"
        });
      } else {
        floatingHeader.css({
          "visibility": "hidden"
        });
      }
    });
  }

  var clonedHeaderRow;

  //To enable editing of CTA button w/o scrolling down in editmode
  if (typeof(CQ) === 'undefined' || !CQ['WCM'] || (!CQ['WCM']['isEditMode'](false))) {
    //todo - find out the height of the #onPageNavResp component
	// var onpagenavHeight = ($("#onPageNavResp .desktopView").height() + $('.site-header').outerHeight()) + 'px';
    var onpagenavHeight = $("#onPageNavResp").length > 0 ? "60px" : "0";
    $(".comp-chart-persist-area").each(function () {
      clonedHeaderRow = $(".comp-chart-persist-header", this);
      clonedHeaderRow
          .before(clonedHeaderRow.clone())
          .css("width", clonedHeaderRow.width())
          // .css("top", onpagenavHeight)
          .addClass("comp-chart-sticky-header");
    });

    $(window)
        .scroll(UpdateTableHeaders)
        .trigger("scroll");
  }
  else {
    if ((CQ['WCM']) && CQ['WCM']['isEditMode'](true)) {
      return;
    }
  }

  $(window).resize(function () {
    $(".comp-chart-sticky-header").css("width", $(".comp-chart-persist-header").width())
  });

});
$(function () {
  $('.column-size-is-auto th').slice(1).wrapInner("<div>");
  $(".column-size-is-auto th span").each(function (/*index*/) {
    var thClassName = $(this).attr("class");
    $(this).parent().addClass(thClassName);
  });

  // Calculate table header height
  if ($(window).width() < 767) {
    var thWidth = 0;

    $('.autoheight .comparison-chart th div').each(function () {
      var thisW = $(this).width();
      var thisH = $(this).height();
      if (thWidth < thisW) {
        thWidth = thisW;
      }
      $(this).width(thisH + 20);
    });

    if (thWidth > 0) {
      thWidth += 40; // add padding
      $('.autoheight .comparison-chart th').height(thWidth); // apply
    }
  }
});

$(document).ready(function(){
    $('.llp-faq-head').live('click', function () {
        
        $('.llp-faq-content').removeClass('llp-faq-clicked');
        $(this).next('.llp-faq-content').addClass('llp-faq-clicked');
        
        if($('.llp-one-faq').length > 0) {
            
            $('.llp-faq-content').each(function() {
                
                $head = $(this).parent().find('.llp-faq-head');
                $content = $(this);
                $arrow = $(this).parent().find('.llp-faq-close-arrow');
                
                if(!$content.hasClass('llp-faq-clicked')) {
                    $content.slideUp("slow");
                    $head.removeClass('llp-faq-open');
                    $arrow.removeClass('llp-faq-open-arrow');
                } else {
                    $head.toggleClass('llp-faq-open');
                    $content.slideToggle('slow');
                }                
            });
            
        } else {
            $(this).next('.llp-faq-content').slideToggle('slow', function () {});
            $(this).toggleClass('llp-faq-open');
        }
        
        $(this).children('.llp-faq-close-arrow').toggleClass('llp-faq-open-arrow');
        
    });
    
    $(".hide1").click(function(){
        $(this).closest('.cfaq-section').parents().find('.llp-faq-content').slideUp('fast');
        $(this).closest('.cfaq-section').parents().find('.llp-faq-close-arrow').removeClass('llp-faq-open-arrow');
    });
    
    $(".show1").click(function(){
        $(this).closest('.cfaq-section').parents().find('.llp-faq-content').slideDown('fast');
        $(this).closest('.cfaq-section').parents().find('.llp-faq-close-arrow').addClass('llp-faq-open-arrow');
    });
    addBorderSmallDevice()
});
$(window).resize(function(){
	addBorderSmallDevice();
});
function addBorderSmallDevice() {
    // refactored css class definitions into /etc/designs/harmony/assets/utilities/faq_qa/css/faq_qa.less to enable theming - [jla, 12/14/2015]
    if ($('header').width() <= 767 ){
        // $(".cfaq-qa").last().css({"border-bottom": "1px dotted #7d7d7d"});
        $(".cfaq-qa").last().removeClass("cfaq-qa-d-bottom");
        $(".cfaq-qa").last().addClass("cfaq-qa-t-bottom");
    }
    else {
        // $(".cfaq-qa").last().css({"border-bottom": "none"});
        $(".cfaq-qa").last().removeClass("cfaq-qa-t-bottom");
        $(".cfaq-qa").last().addClass("cfaq-qa-d-bottom");
    }
}



(function (factory) {
    if (typeof WSDEBUG === 'undefined') {
        window.WSDEBUG = true;
    }
    var addAsync = function(){
        if(!window.asyncWebshims){
            window.asyncWebshims = {
                cfg: [],
                ready: []
            };
        }
    };
    var start = function(){
        if(window.jQuery){
            factory(jQuery);
            factory = function(){return window.webshims;};
        }
    };


    window.webshims = {
        setOptions: function(){
            addAsync();
            window.asyncWebshims.cfg.push(arguments);
        },

        ready: function(){
            addAsync();
            window.asyncWebshims.ready.push(arguments);
        },
        activeLang: function(lang){
            addAsync();
            window.asyncWebshims.lang = lang;
        },
        polyfill: function(features){
            addAsync();
            window.asyncWebshims.polyfill = features;
        },
        _curScript: (function(){
            var scripts, i, scriptUrl;
            //modern browsers: Chrome 29+, Firefox 4+
            var currentScript = document.currentScript;

            //in debug mode remove result to fully test fallback in all browsers
            if(WSDEBUG){
                currentScript = false;
            }
            if (!currentScript) {
                //error trick: works in Safari, Chrome, Firefox, IE 10+
                //idea found here: https://github.com/samyk/jiagra/
                try {
                    throw(new Error(''));
                } catch (e) {
                    //Safari has sourceURL
                    scriptUrl = (e.sourceURL || e.stack || '').split('\n');
                    //extract scriptUrl from stack: this is dangerous! All browsers have different string patterns (pattern can even vary between different browser versions). Help to make it bulletproof!!!
                    scriptUrl = ((scriptUrl[scriptUrl.length - 1] || scriptUrl[scriptUrl.length - 2] || '').match(/(?:fil|htt|wid|abo|app|res)(.)+/i) || [''])[0].replace(/[\:\s\(]+[\d\:\)\(\s]+$/, '');
                }

                scripts = document.scripts || document.getElementsByTagName('script');

                //get script by URL or by readyState == 'interactive' (readySate is supported in IE10-)
                //if this fails the last found script is set to the currentScript
                for (i = 0; i < scripts.length; i++) {
                    if(scripts[i].getAttribute('src')){
                        currentScript = scripts[i];
                        if (scripts[i].readyState == 'interactive' || scriptUrl == scripts[i].src) {
                            if(WSDEBUG){
                                currentScript.wsFoundCurrent = true;
                            }
                            break;
                        }
                    }
                }
            }

            return currentScript;
        })()
    };
    window.webshim = window.webshims;


    window.webshims.timer = setInterval(start, 0);
    start();

    if (typeof define === 'function' && define.amd && define.amd.jQuery) {
        define('polyfiller', ['jquery'], factory);
    }
}(function($){
    "use strict";
    var firstRun, path;
    var webshims = window.webshims;
    var DOMSUPPORT = 'dom-support';
    var special = $.event.special;
    var emptyJ = $([]);
    var Modernizr = window.Modernizr;
    var asyncWebshims = window.asyncWebshims;
    var addTest = Modernizr.addTest;
    var Object = window.Object;
    var html5 = window.html5 || {};
    var addSource = function(text){
        return text +"\n//# sourceURL="+this.url;
    };
    Modernizr.advancedObjectProperties = Modernizr.objectAccessor = Modernizr.ES5 = !!('create' in Object && 'seal' in Object);

    if(Modernizr.ES5 && !('toJSON' in Date.prototype)){
        Modernizr.ES5 = false;
    }

    clearInterval(webshims.timer);

    path = ($.support.hrefNormalized === false) ? webshims._curScript.getAttribute("src", 4) : webshims._curScript.src;
    path = path.split('?')[0].slice(0, path.lastIndexOf("/") + 1) + 'shims/';

    $.extend(webshims, {
        version: '1.12.3',
        cfg: {

            //addCacheBuster: false,
            waitReady: true,
//			extendNative: false,
            loadStyles: true,
            disableShivMethods: true,
            wsdoc: document,
            wspopover: {appendTo: 'auto', hideOnBlur: true},
            ajax: {},
            loadScript: function(src, success, fail){
                $.ajax($.extend({}, webCFG.ajax, {url: src, success: success, dataType: 'script', cache: true, global: false, dataFilter: addSource}));
            },

            basePath: path
        },
        bugs: {},
        /*
         * some data
         */
        modules: {},
        features: {},
        featureList: [],
        setOptions: function(name, opts){
            if (typeof name == 'string' && arguments.length > 1) {
                webCFG[name] = (!$.isPlainObject(opts)) ? opts : $.extend(true, webCFG[name] || {}, opts);
            } else if (typeof name == 'object') {
                $.extend(true, webCFG, name);
            }
        },
        addPolyfill: function(name, cfg){
            cfg = cfg || {};
            var feature = cfg.f || name;
            if (!webshimsFeatures[feature]) {
                webshimsFeatures[feature] = [];
                webshims.featureList.push(feature);
                webCFG[feature] = {};
            }

            if(!webshimsFeatures[feature].failedM && cfg.nM){
                $.each(cfg.nM.split(' '), function(i, name){
                    if(!(name in Modernizr)){
                        webshimsFeatures[feature].failedM = name;
                        return false;
                    }
                });
            }

            if(webshimsFeatures[feature].failedM){
                cfg.test = WSDEBUG ? function(){
                    webshims.error('webshims needs Modernizr.'+webshimsFeatures[feature].failedM + ' to implement feature: '+ feature);
                    return true;
                } : true;
            }
            webshimsFeatures[feature].push(name);
            cfg.options = $.extend(webCFG[feature], cfg.options);

            addModule(name, cfg);
            if (cfg.methodNames) {
                $.each(cfg.methodNames, function(i, methodName){
                    webshims.addMethodName(methodName);
                });
            }
        },
        polyfill: (function(){
            var loaded = {};
            return function(features){
                if(!features){
                    features = webshims.featureList;
                    WSDEBUG && webshims.warn('loading all features without specifing might be bad for performance');
                }

                if (typeof features == 'string') {
                    features = features.split(' ');
                }

                if(WSDEBUG){
                    for(var i = 0; i < features.length; i++){
                        if(loaded[features[i]]){
                            webshims.error(features[i] +' already loaded, you might want to use updatePolyfill instead? see: bit.ly/12BtXX3');
                        }
                        loaded[features[i]] = true;
                    }
                }
                return webshims._polyfill(features);
            };
        })(),
        _polyfill: function(features){
            var toLoadFeatures = [];

            firstRun();

            if($.inArray('forms', features) == -1 && $.inArray('forms-ext', features) !== -1){
                features.push('forms');
                if(WSDEBUG){
                    webshims.error('need to load forms feature to use forms-ext feature.');
                }
            }

            if (webCFG.waitReady) {
                $.readyWait++;
                onReady(features, function(){
                    $.ready(true);
                });
            }

            $.each(features, function(i, feature){
                if(!webshimsFeatures[feature]){
                    WSDEBUG && webshims.error("could not find webshims-feature (aborted): "+ feature);
                    isReady(feature, true);
                    return;
                }
                if (feature !== webshimsFeatures[feature][0]) {
                    onReady(webshimsFeatures[feature], function(){
                        isReady(feature, true);
                    });
                }
                toLoadFeatures = toLoadFeatures.concat(webshimsFeatures[feature]);
            });
            if(webCFG.loadStyles){
                loader.loadCSS('styles/shim.css');
            }
            loadList(toLoadFeatures);

        },

        /*
         * handle ready modules
         */
        reTest: (function(){
            var resList;
            var reTest = function(i, name){
                var module = modules[name];
                var readyName = name+'Ready';
                var feature;
                if(module && !module.loaded && !( (module.test && $.isFunction(module.test) ) ? module.test([]) : module.test )){
                    if(special[readyName]){
                        delete special[readyName];
                    }
                    feature = webshimsFeatures[module.f];

                    resList.push(name);
                }
            };
            return function(moduleNames){
                if(typeof moduleNames == 'string'){
                    moduleNames = moduleNames.split(' ');
                }
                resList = [];
                $.each(moduleNames, reTest);
                loadList(resList);
            };
        })(),
        isReady: function(name, _set){

            name = name + 'Ready';
            if (_set) {
                if (special[name] && special[name].add) {
                    return true;
                }

                special[name] = $.extend(special[name] || {}, {
                    add: function(details){
                        details.handler.call(this, name);
                    }
                });
                $(document).triggerHandler(name);
            }
            return !!(special[name] && special[name].add) || false;
        },
        ready: function(events, fn /*, _created*/){
            var _created = arguments[2];
            var evt = events;
            if (typeof events == 'string') {
                events = events.split(' ');
            }

            if (!_created) {
                events = $.map($.grep(events, function(evt){
                    return !isReady(evt);
                }), function(evt){
                    return evt + 'Ready';
                });
            }
            if (!events.length) {
                fn($, webshims, window, document);
                return;
            }
            var readyEv = events.shift(), readyFn = function(){
                onReady(events, fn, true);
            };

            $(document).one(readyEv, readyFn);
        },

        /*
         * basic DOM-/jQuery-Helpers
         */


        capturingEvents: function(names, _maybePrevented){
            if (!document.addEventListener) {
                return;
            }
            if (typeof names == 'string') {
                names = [names];
            }
            $.each(names, function(i, name){
                var handler = function(e){
                    e = $.event.fix(e);
                    if (_maybePrevented && webshims.capturingEventPrevented) {
                        webshims.capturingEventPrevented(e);
                    }
                    return $.event.dispatch.call(this, e);
                };
                special[name] = special[name] || {};
                if (special[name].setup || special[name].teardown) {
                    return;
                }
                $.extend(special[name], {
                    setup: function(){
                        this.addEventListener(name, handler, true);
                    },
                    teardown: function(){
                        this.removeEventListener(name, handler, true);
                    }
                });
            });
        },
        register: function(name, fn){
            var module = modules[name];
            if (!module) {
                webshims.error("can't find module: " + name);
                return;
            }
            module.loaded = true;
            var ready = function(){
                fn($, webshims, window, document, undefined, module.options);
                isReady(name, true);
            };
            if (module.d && module.d.length) {
                onReady(module.d, ready);
            } else {
                ready();
            }

        },
        c: {},
        /*
         * loader
         */
        loader: {

            addModule: function(name, ext){
                modules[name] = ext;
                ext.name = ext.name || name;
                if(!ext.c){
                    ext.c = [];
                }
                $.each(ext.c, function(i, comboname){
                    if(!webshims.c[comboname]){
                        webshims.c[comboname] = [];
                    }
                    webshims.c[comboname].push(name);
                });
            },
            loadList: (function(){

                var loadedModules = [];
                var loadScript = function(src, names){
                    if (typeof names == 'string') {
                        names = [names];
                    }
                    $.merge(loadedModules, names);
                    loader.loadScript(src, false, names);
                };

                var noNeedToLoad = function(name, list){
                    if (isReady(name) || $.inArray(name, loadedModules) != -1) {
                        return true;
                    }
                    var module = modules[name];
                    var cfg = webCFG[module.f || name] || {};
                    var supported;
                    if (module) {
                        supported = (module.test && $.isFunction(module.test)) ? module.test(list) : module.test;
                        if (supported) {
                            isReady(name, true);
                            return true;
                        } else {
                            return false;
                        }
                    }
                    return true;
                };

                var setDependencies = function(module, list){
                    if (module.d && module.d.length) {
                        var addDependency = function(i, dependency){
                            if (!noNeedToLoad(dependency, list) && $.inArray(dependency, list) == -1) {
                                list.push(dependency);
                            }
                        };
                        $.each(module.d, function(i, dependency){
                            if (modules[dependency]) {
                                if(!modules[dependency].loaded){
                                    addDependency(i, dependency);
                                }
                            }
                            else
                            if (webshimsFeatures[dependency]) {
                                $.each(webshimsFeatures[dependency], addDependency);
                                onReady(webshimsFeatures[dependency], function(){
                                    isReady(dependency, true);
                                });
                            }
                        });
                        if (!module.noAutoCallback) {
                            module.noAutoCallback = true;
                        }
                    }
                };

                return function(list, combo){
                    var module;
                    var loadCombos = [];
                    var i;
                    var len;
                    var foundCombo;
                    var loadCombo = function(j, combo){
                        foundCombo = combo;
                        $.each(webshims.c[combo], function(i, moduleName){
                            if($.inArray(moduleName, loadCombos) == -1 || $.inArray(moduleName, loadedModules) != -1){
                                foundCombo = false;
                                return false;
                            }
                        });
                        if(foundCombo){
                            loadScript('combos/'+foundCombo, webshims.c[foundCombo]);
                            return false;
                        }
                    };

                    //length of list is dynamically
                    for (i = 0; i < list.length; i++) {
                        module = modules[list[i]];
                        if (!module || noNeedToLoad(module.name, list)) {
                            if (WSDEBUG && !module) {
                                webshims.warn('could not find: ' + list[i]);
                            }
                            continue;
                        }
                        if (module.css && webCFG.loadStyles) {
                            loader.loadCSS(module.css);
                        }

                        if (module.loadInit) {
                            module.loadInit();
                        }


                        setDependencies(module, list);
                        if(!module.loaded){
                            loadCombos.push(module.name);
                        }
                        module.loaded = true;
                    }

                    for(i = 0, len = loadCombos.length; i < len; i++){
                        foundCombo = false;

                        module = loadCombos[i];

                        if($.inArray(module, loadedModules) == -1){
                            if(webCFG.debug != 'noCombo'){
                                $.each(modules[module].c, loadCombo);
                            }
                            if(!foundCombo){
                                loadScript(modules[module].src || module, module);
                            }
                        }
                    }
                };
            })(),

            makePath: function(src){
                if (src.indexOf('//') != -1 || src.indexOf('/') === 0) {
                    return src;
                }

                if (src.indexOf('.') == -1) {
                    src += '.js';
                }
                if (webCFG.addCacheBuster) {
                    src += webCFG.addCacheBuster;
                }
                return webCFG.basePath + src;
            },

            loadCSS: (function(){
                var parent, loadedSrcs = {};
                return function(src){
                    src = this.makePath(src);
                    if (loadedSrcs[src]) {
                        return;
                    }
                    parent = parent || $('link, style')[0] || $('script')[0];
                    loadedSrcs[src] = 1;
                    $('<link rel="stylesheet" />').insertBefore(parent).attr({
                        href: src
                    });
                };
            })(),

            loadScript: (function(){
                var loadedSrcs = {};
                var scriptLoader;
                return function(src, callback, name, noShimPath){
                    if(!noShimPath){
                        src = loader.makePath(src);
                    }
                    if (loadedSrcs[src]) {return;}
                    var complete = function(){

                        if (callback) {
                            callback();
                        }

                        if (name) {
                            if (typeof name == 'string') {
                                name = name.split(' ');
                            }
                            $.each(name, function(i, name){
                                if (!modules[name]) {
                                    return;
                                }
                                if (modules[name].afterLoad) {
                                    modules[name].afterLoad();
                                }
                                isReady(!modules[name].noAutoCallback ? name : name + 'FileLoaded', true);
                            });

                        }
                    };

                    loadedSrcs[src] = 1;
                    webCFG.loadScript(src, complete, $.noop);
                };
            })()
        }
    });

    /*
     * shortcuts
     */
    $.webshims = webshims;

    var webCFG = webshims.cfg;
    var webshimsFeatures = webshims.features;
    var isReady = webshims.isReady;
    var onReady = webshims.ready;
    var addPolyfill = webshims.addPolyfill;
    var modules = webshims.modules;
    var loader = webshims.loader;
    var loadList = loader.loadList;
    var addModule = loader.addModule;
    var bugs = webshims.bugs;
    var removeCombos = [];
    var importantLogs = {
        warn: 1,
        error: 1
    };

    webshims.addMethodName = function(name){
        name = name.split(':');
        var prop = name[1];
        if (name.length == 1) {
            prop = name[0];
            name = name[0];
        } else {
            name = name[0];
        }

        $.fn[name] = function(){
            return this.callProp(prop, arguments);
        };
    };
    $.fn.callProp = function(prop, args){
        var ret;
        if(!args){
            args = [];
        }
        this.each(function(){
            var fn = $.prop(this, prop);

            if (fn && fn.apply) {
                ret = fn.apply(this, args);
                if (ret !== undefined) {
                    return false;
                }
            } else {
                webshims.warn(prop+ " is not a method of "+ this);
            }
        });
        return (ret !== undefined) ? ret : this;
    };



    webshims.activeLang = (function(){
        var curLang = $('html').attr('lang') || navigator.browserLanguage || navigator.language || '';
        onReady('webshimLocalization', function(){
            webshims.activeLang(curLang);
        });
        return function(lang){
            if(lang){
                if (typeof lang == 'string' ) {
                    curLang = lang;
                } else if(typeof lang == 'object'){
                    var args = arguments;
                    var that = this;
                    onReady('webshimLocalization', function(){
                        webshims.activeLang.apply(that, args);
                    });
                }
            }
            return curLang;
        };
    })();

    webshims.errorLog = [];
    $.each(['log', 'error', 'warn', 'info'], function(i, fn){
        webshims[fn] = function(message){
            if( (importantLogs[fn] && webCFG.debug !== false) || webCFG.debug){
                webshims.errorLog.push(message);
                if(window.console && console.log){
                    console[(console[fn]) ? fn : 'log'](message);
                }
            }
        };
    });

    if(WSDEBUG){
        if(!webshims._curScript.wsFoundCurrent){
            webshims.error('Could not detect currentScript! Use basePath to set script path.');
        }
    }

    /*
     * jQuery-plugins for triggering dom updates can be also very usefull in conjunction with non-HTML5 DOM-Changes (AJAX)
     * Example:
     * $.webshims.addReady(function(context, insertedElement){
     * 		$('div.tabs', context).add(insertedElement.filter('div.tabs')).tabs();
     * });
     *
     * $.ajax({
     * 		success: function(html){
     * 			$('#main').htmlPolyfill(html);
     * 		}
     * });
     */

    (function(){
        //Overwrite DOM-Ready and implement a new ready-method
        $.isDOMReady = $.isReady;
        var onReady = function(e){

            $.isDOMReady = true;
            isReady('DOM', true);
            setTimeout(function(){
                isReady('WINDOWLOAD', true);
            }, 9999);
        };

        firstRun = function(){
            if(!firstRun.run){

                if(webCFG.debug || (!('crossDomain' in webCFG.ajax) && location.protocol.indexOf('http'))){
                    webCFG.ajax.crossDomain = true;
                }

                if($.mobile && ($.mobile.textinput || $.mobile.rangeslider || $.mobile.button)){
                    if(WSDEBUG){
                        webshims.warn('jQM textinput/rangeslider/button detected waitReady was set to false. Use webshims.ready("featurename") to script against polyfilled methods/properties');
                    }
                    if(!webCFG.readyEvt){
                        webCFG.readyEvt = 'pageinit';
                    }
                    webCFG.waitReady = false;
                }

                if (WSDEBUG && webCFG.waitReady && $.isReady) {
                    webshims.warn('Call webshims.polyfill before DOM-Ready or set waitReady to false.');
                }

                if(!$.isDOMReady && webCFG.waitReady){
                    var $Ready = $.ready;
                    $.ready = function(unwait){
                        if(unwait !== true && document.body){
                            onReady();
                            $.ready = $Ready;
                        }
                        return $Ready.apply(this, arguments);
                    };
                    $.ready.promise = $Ready.promise;
                }
                if(webCFG.readyEvt){
                    $(document).one(webCFG.readyEvt, onReady);
                } else {
                    $(onReady);
                }
            }
            firstRun.run = true;
        };

        $(window).on('load', function(){
            onReady();
            setTimeout(function(){
                isReady('WINDOWLOAD', true);
            }, 9);
        });

        var readyFns = [];
        var eachTrigger = function(){
            if(this.nodeType == 1){
                webshims.triggerDomUpdate(this);
            }
        };
        $.extend(webshims, {
            addReady: function(fn){
                var readyFn = function(context, elem){
                    webshims.ready('DOM', function(){fn(context, elem);});
                };
                readyFns.push(readyFn);

                if(webCFG.wsdoc){
                    readyFn(webCFG.wsdoc, emptyJ);
                }
            },
            triggerDomUpdate: function(context){
                if(!context || !context.nodeType){
                    if(context && context.jquery){
                        context.each(function(){
                            webshims.triggerDomUpdate(this);
                        });
                    }
                    return;
                }
                var type = context.nodeType;
                if(type != 1 && type != 9){return;}
                var elem = (context !== document) ? $(context) : emptyJ;
                $.each(readyFns, function(i, fn){
                    fn(context, elem);
                });
            }
        });

        $.fn.htmlPolyfill = function(a){
            var ret = $.fn.html.call(this,  a);
            if(ret === this && $.isDOMReady){
                this.each(eachTrigger);
            }
            return ret;
        };

        $.fn.jProp = function(){
            return this.pushStack($($.fn.prop.apply(this, arguments) || []));
        };

        $.each(['after', 'before', 'append', 'prepend', 'replaceWith'], function(i, name){
            $.fn[name+'Polyfill'] = function(a){
                a = $(a);
                $.fn[name].call(this, a);
                if($.isDOMReady){
                    a.each(eachTrigger);
                }
                return this;
            };

        });

        $.each(['insertAfter', 'insertBefore', 'appendTo', 'prependTo', 'replaceAll'], function(i, name){
            $.fn[name.replace(/[A-Z]/, function(c){return "Polyfill"+c;})] = function(){
                $.fn[name].apply(this, arguments);
                if($.isDOMReady){
                    webshims.triggerDomUpdate(this);
                }
                return this;
            };
        });

        $.fn.updatePolyfill = function(){
            if($.isDOMReady){
                webshims.triggerDomUpdate(this);
            }
            return this;
        };

        $.each(['getNativeElement', 'getShadowElement', 'getShadowFocusElement'], function(i, name){
            $.fn[name] = function(){
                return this.pushStack(this);
            };
        });

    })();


    if(WSDEBUG){
        webCFG.debug = true;
    }

    //this might be extended by ES5 shim feature
    (function(){
        var defineProperty = 'defineProperty';
        var has = Object.prototype.hasOwnProperty;
        var descProps = ['configurable', 'enumerable', 'writable'];
        var extendUndefined = function(prop){
            for(var i = 0; i < 3; i++){
                if(prop[descProps[i]] === undefined && (descProps[i] !== 'writable' || prop.value !== undefined)){
                    prop[descProps[i]] = true;
                }
            }
        };
        var extendProps = function(props){
            if(props){
                for(var i in props){
                    if(has.call(props, i)){
                        extendUndefined(props[i]);
                    }
                }
            }
        };
        if(Object.create){
            webshims.objectCreate = function(proto, props, opts){
                extendProps(props);
                var o = Object.create(proto, props);
                if(opts){
                    o.options = $.extend(true, {}, o.options  || {}, opts);
                    opts = o.options;
                }
                if(o._create && $.isFunction(o._create)){
                    o._create(opts);
                }
                return o;
            };
        }
        if(Object[defineProperty]){
            webshims[defineProperty] = function(obj, prop, desc){
                extendUndefined(desc);
                return Object[defineProperty](obj, prop, desc);
            };
        }
        if(Object.defineProperties){
            webshims.defineProperties = function(obj, props){
                extendProps(props);
                return Object.defineProperties(obj, props);
            };
        }
        webshims.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

        webshims.getPrototypeOf = Object.getPrototypeOf;
    })();




    /*
     * Start Features
     */

    /* general modules */
    /* change path $.webshims.modules[moduleName].src */


    addModule('swfmini', {
        test: function(){
            if(window.swfobject && !window.swfmini){
                window.swfmini = window.swfobject;
            }
            return ('swfmini' in window);
        },
        c: [16, 7, 2, 8, 1, 12, 19, 25, 23, 27]
    });
    modules.swfmini.test();

    addModule('sizzle', {test: $.expr.filters});
    addModule('$ajax', {test: $.ajax});
    /*
     * polyfill-Modules
     */

    // webshims lib uses a of http://github.com/kriskowal/es5-shim/ to implement
    addPolyfill('es5', {
        test: !!(Modernizr.ES5 && Function.prototype.bind),
        c: [18, 19, 25, 20, 32]
    });

    addPolyfill('dom-extend', {
        f: DOMSUPPORT,
        noAutoCallback: true,
        d: ['es5'],
        c: [16, 7, 2, 15, 30, 3, 8, 4, 9, 10, 25, 19, 20, 26, 31]
    });


    //<geolocation

    addPolyfill('geolocation', {
        test: Modernizr.geolocation,
        options: {
            destroyWrite: true
//			,confirmText: ''
        },
        d: ['json-storage'],
        c: [21],
        nM: 'geolocation'
    });
    //>

    //<canvas
    (function(){
        addPolyfill('canvas', {
            src: 'excanvas',
            test: Modernizr.canvas,
            options: {type: 'flash'}, //excanvas | flash | flashpro
            noAutoCallback: true,

            loadInit: function(){
                var type = this.options.type;
                if(type && type.indexOf('flash') !== -1 && (!modules.swfmini.test() || swfmini.hasFlashPlayerVersion('9.0.0'))){
                    this.src = type == 'flash' ? 'FlashCanvas/flashcanvas' : 'FlashCanvasPro/flashcanvas';
                }
            },
            methodNames: ['getContext'],
            d: [DOMSUPPORT],
            nM: 'canvas'
        });
    })();
    //>


    //<forms
    (function(){
        var formExtend, formOptions, formExtras;
        var fShim = 'form-shim-extend';
        var modernizrInputAttrs = Modernizr.input;
        var modernizrInputTypes = Modernizr.inputtypes;
        var formvalidation = 'formvalidation';
        var fNuAPI = 'form-number-date-api';
        var bustedValidity = false;
        var bustedWidgetUi = false;

        var initialFormTest = function(){
            var tmp, fieldset;
            if(!initialFormTest.run){
                fieldset = $('<fieldset><textarea required="" /></fieldset>')[0];
                addTest(formvalidation, !!(modernizrInputAttrs.required && modernizrInputAttrs.pattern));

                addTest('fieldsetelements', (tmp = 'elements' in fieldset));

                if(('disabled' in fieldset)){
                    if(!tmp) {
                        try {
                            if($('textarea', fieldset).is(':invalid')){
                                fieldset.disabled = true;
                                tmp = $('textarea', fieldset).is(':valid');
                            }
                        } catch(er){}
                    }
                    addTest('fieldsetdisabled', tmp);
                }

                if(Modernizr[formvalidation]){
                    bustedWidgetUi = !Modernizr.fieldsetdisabled ||!Modernizr.fieldsetelements || !('value' in document.createElement('progress')) || !('value' in document.createElement('output'));
                    bugs.bustedValidity = bustedValidity = window.opera || bustedWidgetUi || !modernizrInputAttrs.list;
                }

                formExtend = Modernizr[formvalidation] && !bustedValidity ? 'form-native-extend' : fShim;

            }
            initialFormTest.run = true;
            return false;
        };

        if(modernizrInputAttrs && modernizrInputTypes){
            initialFormTest();
        }
        document.createElement('datalist');


        webshims.validationMessages = webshims.validityMessages = {
            langSrc: 'i18n/formcfg-',
            availableLangs: ['ar', 'cs', 'el', 'es', 'fr', 'he', 'hi', 'hu', 'it', 'ja', 'lt', 'nl', 'pl', 'pt', 'pt-BR', 'pt-PT', 'ru', 'sv', 'zh-CN']
        };
        webshims.formcfg = $.extend({}, webshims.validationMessages);

        webshims.inputTypes = {};

        addPolyfill('form-core', {
            f: 'forms',
            d: ['es5'],
            test: initialFormTest,
            options: {
                placeholderType: 'value',
                messagePopover: {},
                list: {
                    popover: {
                        constrainWidth: true
                    }
                },
                iVal: {
                    sel: '.ws-validate',
                    handleBubble: 'hide',
                    recheckDelay: 400
//					,fx: 'slide'
                }
                //			,customMessages: false,
                //			overridePlaceholder: false, // might be good for IE10
                //			replaceValidationUI: false
            },
            methodNames: ['setCustomValidity','checkValidity', 'setSelectionRange'],
            c: [16, 7, 2, 8, 1, 15, 30, 3, 31],
            nM: 'input'
        });

        formOptions = webCFG.forms;

        addPolyfill('form-native-extend', {
            f: 'forms',
            test: function(toLoad){
                return !Modernizr[formvalidation] || bustedValidity  || $.inArray(fNuAPI, toLoad  || []) == -1 || modules[fNuAPI].test();
            },
            d: ['form-core', DOMSUPPORT, 'form-message'],
            c: [6, 5, 14, 29]
        });

        addPolyfill(fShim, {
            f: 'forms',
            test: function(){
                return Modernizr[formvalidation] && !bustedValidity;
            },
            d: ['form-core', DOMSUPPORT, 'sizzle'],
            c: [16, 15, 24, 28]
        });

        addPolyfill(fShim+'2', {
            f: 'forms',
            test: function(){
                return Modernizr[formvalidation] && !bustedWidgetUi;
            },
            d: [fShim],
            c: [24]
        });

        addPolyfill('form-message', {
            f: 'forms',
            test: function(toLoad){
                return !( formOptions.customMessages || !Modernizr[formvalidation] || bustedValidity || !modules[formExtend].test(toLoad) );
            },
            d: [DOMSUPPORT],
            c: [16, 7, 15, 30, 3, 8, 4, 14, 28]
        });

        formExtras = {
            noAutoCallback: true,
            options: formOptions
        };
        addModule('form-validation', $.extend({d: ['form-message', 'form-core']}, formExtras));

        addModule('form-validators', $.extend({}, formExtras));

        addPolyfill(fNuAPI, {
            f: 'forms-ext',
            options: {
                types: 'date time range number'
            },
            test: function(){
                var ret = true;
                var o = this.options;
                if(!o._types){
                    o._types = o.types.split(' ');
                }

                initialFormTest();
                $.each(o._types, function(i, name){
                    if((name in modernizrInputTypes) && !modernizrInputTypes[name]){
                        ret = false;
                        return false;
                    }
                });

                return ret;
            },
            methodNames: ['stepUp', 'stepDown'],
            d: ['forms', DOMSUPPORT],
            c: [6, 5, 18, 17, 14, 28, 29, 32, 33],
            nM: 'input inputtypes'
        });

        addModule('range-ui', {
            options: {},
            noAutoCallback: true,
            test: function(){
                return !!$.fn.rangeUI;
            },
            d: ['es5'],
            c: [6, 5, 9, 10, 18, 17, 11]
        });

        addPolyfill('form-number-date-ui', {
            f: 'forms-ext',
            test: function(){
                var o = this.options;
                initialFormTest();
                //input widgets on old androids can't be trusted
                if(bustedWidgetUi && !o.replaceUI && (/Android/i).test(navigator.userAgent)){
                    o.replaceUI = true;
                }
                return !o.replaceUI && modules[fNuAPI].test();
            },
            d: ['forms', DOMSUPPORT, fNuAPI, 'range-ui'],
            css: 'styles/forms-ext.css',
            options: {
                widgets: {
                    calculateWidth: true,
                    animate: true
                }
                //			,replaceUI: false
            },
            c: [6, 5, 9, 10, 18, 17, 11]
        });

        addPolyfill('form-datalist', {
            f: 'forms',
            test: function(){
                initialFormTest();
                return modernizrInputAttrs.list && !formOptions.fD;
            },
            d: ['form-core', DOMSUPPORT],
            c: [16, 7, 6, 2, 9, 15, 30, 31, 28, 32, 33]
        });
    })();
    //>

    //<filereader
    addPolyfill('filereader', {
        test: 'FileReader' in window,
        d: ['swfmini', DOMSUPPORT],
        c: [25, 26, 27]
//		,nM: 'filereader'
    });
    //>

    //<details
    if(!('details' in Modernizr)){
        addTest('details', function(){
            return ('open' in document.createElement('details'));
        });
    }
    addPolyfill('details', {
        test: Modernizr.details,
        d: [DOMSUPPORT],
        options: {
//			animate: false,
            text: 'Details'
        },
        c: [21, 22]
    });
    //>

    //<mediaelement
    (function(){
        webshims.mediaelement = {};
        addTest({
            texttrackapi: ('addTextTrack' in document.createElement('video')),
            // a more strict test for track including UI support: document.createElement('track').kind === 'subtitles'
            track: ('kind' in document.createElement('track'))
        });
        addPolyfill('mediaelement-core', {
            f: 'mediaelement',
            noAutoCallback: true,
            options: {
                preferFlash: false,
                vars: {},
                params: {},
                attrs: {},
                changeSWF: $.noop
            },
            methodNames: ['play', 'pause', 'canPlayType', 'mediaLoad:load'],
            d: ['swfmini'],
            c: [16, 7, 2, 8, 1, 12, 13, 19, 25, 20, 23],
            nM: 'audio video'
        });


        addPolyfill('mediaelement-jaris', {
            f: 'mediaelement',
            d: ['mediaelement-core', 'swfmini', DOMSUPPORT],
            test: function(){
                if(!Modernizr.audio || !Modernizr.video || webshims.mediaelement.loadSwf){
                    return false;
                }

                var options = this.options;
                if(options.preferFlash && !modules.swfmini.test()){
                    options.preferFlash = false;
                }
                return !( options.preferFlash && swfmini.hasFlashPlayerVersion('10.0.3') );
            },
            c: [21, 19, 25, 20]
        });

        bugs.track = !Modernizr.texttrackapi;

        addPolyfill('track', {
            options: {
                positionDisplay: true,
                override: bugs.track
            },
            test: function(){
                return !this.options.override && !bugs.track;
            },
            d: ['mediaelement', DOMSUPPORT],
            methodNames: ['addTextTrack'],
            c: [21, 12, 13, 22]
        });


        addModule('track-ui', {
            d: ['track', DOMSUPPORT]
        });

    })();
    //>


    //>removeCombos<
    addPolyfill('feature-dummy', {
        test: true,
        loaded: true,
        c: removeCombos
    });

    webshims.$ = $;
    webshims.M = Modernizr;
    window.webshims = webshims;

    webshims.callAsync = function(){
        webshims.callAsync = $.noop;
        $(document.scripts || 'script')
            .filter('[data-polyfill-cfg]')
            .each(function(){
                try {
                    webshims.setOptions( $(this).data('polyfillCfg') );
                } catch(e){
                    webshims.warn('error parsing polyfill cfg: '+e);
                }
            })
            .end()
            .filter('[data-polyfill]')
            .each(function(){
                webshims.polyfill( $.trim( $(this).data('polyfill') || '' ) );
            })
        ;
        if(asyncWebshims){
            if(asyncWebshims.cfg){
                if(!asyncWebshims.cfg.length){
                    asyncWebshims.cfg = [[asyncWebshims.cfg]];
                }
                $.each(asyncWebshims.cfg, function(i, cfg){
                    webshims.setOptions.apply(webshims, cfg);
                });
            }
            if(asyncWebshims.ready){
                $.each(asyncWebshims.ready, function(i, ready){
                    webshims.ready.apply(webshims, ready);
                });
            }
            if(asyncWebshims.lang){
                webshims.activeLang(asyncWebshims.lang);
            }
            if('polyfill' in asyncWebshims){
                webshims.polyfill(asyncWebshims.polyfill);
            }
        }
        webshims.isReady('jquery', true);
    };

    webshims.callAsync();
    return webshims;
}));

/*

 Webshims implementation for Harmony forms
 mstraka 3/5/2014

 */

webshims.setOptions('basePath', '/etc/designs/harmony/assets/form/js/shims/minified/shims/');
webshims.setOptions('waitReady',false);
webshims.setOptions('forms', {
    //show custom styleable validation bubble

    lazyCustomMessages: true,
    addValidators: true,
    //replaceValidationUI: true,

    //instant validation options
    iVal: {
        //a simple selector of your form element[s]
        "sel": ".ws-validate",
        //wether webshim should show a bubble on invalid event: "hide" | true | false
        "handleBubble": "hide",

        //selector or function to find the wrapper of the form field[s] (if there are more than one form field in the wrapper they will be handled as a group with one combined errormessage)
        //"fieldWrapper": "div.cform",//":not(span), :not(label), :not(em), :not(strong), :not(p)",

        //wether an invalid input should be re-checked while user types
        "recheckDelay": 400,

        //in case a developer has set novalidate attribute to a form element and wants the form validated on submit, this should be set to true
        "submitCheck": true,

        //the class of the errorbox, which is normally appended to the fieldWrapper
        "errorBoxClass": "field-error-box",

        //classes to adjust to your CSS/CSS-framework
        "errorMessageClass": "field-error-message",
        "errorWrapperClass": "field-error-wrapper",
        //"successWrapperClass": "ws-success",

        //show/hide effect: 'no' | 'slide' | 'fade'
        "fx": "no"
    }
});
(function($, window, document, undefined){

 function overrideAjaxValidate() {

     if (!webshims || typeof webshims.addCustomValidityRule !== 'function') {
         return;
     }


     var formCFG = webshims.cfg.forms, custMsg, dataObj = {
         ajaxvalidate: null,
         errormessagePatternMismatch: null,
         errormessageValueMissing: null
     };

      var getId = function(name){
        return document.getElementById(name) || document.getElementsByName(name);
      };

      if(window.JSON){
          webshims.addCustomValidityRule('ajaxvalidate', function(elem, val, data){

          if(!val || !data.ajaxvalidate){return;}
          var opts;

              if ( Object.prototype.toString.call(data) === '[object Object]' ) {
                  if (typeof data.ajaxvalidate === 'string') {
                      dataObj.ajaxvalidate = data.ajaxvalidate;
                  } else if (typeof data.ajaxvalidate === 'object' && typeof data.ajaxvalidate.url === 'string') {
                      dataObj.ajaxvalidate = data.ajaxvalidate.url;
                  }

                  dataObj.errormessagePatternMismatch = data.errormessagePatternMismatch;
                  dataObj.errormessageValueMissing = data.errormessageValueMissing;
              }

              data = dataObj;


          if(!data.remoteValidate){
            if(typeof data.ajaxvalidate == 'string'){
              data.ajaxvalidate = {url: data.ajaxvalidate, depends: $([])};
            } else {
              data.ajaxvalidate.depends = data.ajaxvalidate.depends ?
                $(typeof data.ajaxvalidate.depends == 'string' && data.ajaxvalidate.depends.split(' ') || data.ajaxvalidate.depends).map(getId) :
                $([])
              ;
            }

            data.ajaxvalidate.depends.on('refreshCustomValidityRules', function(){
              webshims.refreshCustomValidityRules(elem);
            });

            opts = data.ajaxvalidate;

            var remoteValidate = {
              ajaxLoading: false,
              restartAjax: false,
              message: 'async',
              cache: {},
              update: function(remoteData){
                if(this.ajaxLoading){
                  this.restartAjax = remoteData;
                } else {
                  this.restartAjax = false;
                  this.ajaxLoading = true;
                  $.ajax(
                    $.extend({}, opts, {
                      url: opts.url,
                      dataType: 'json',
                      depData: remoteData,
                      data: formCFG.fullRemoteForm || opts.fullForm ?
                        $(elem).jProp('form').serializeArray() :
                        remoteData,
                      success: this.getResponse,
                      complete: this._complete
                    })
                  );
                }
              },
              _complete: function(){
                remoteValidate.ajaxLoading = false;
                if(remoteValidate.restartAjax){
                  this.update(remoteValidate.restartAjax);
                }
                remoteValidate.restartAjax = false;
              },
              getResponse: function(data){
                var $elem = $(elem)
                  , customMessage = $elem.attr('data_custom_error');

                if(!data){
                  data = {message: '', valid: true};
                } else if(typeof data == 'string'){
                  data = JSON.parse(data);
                }

                if (data.message !== '' && customMessage) {
                  data.message = customMessage;
                }

                remoteValidate.message =  ('message' in data) ? data.message : !data.valid;
                remoteValidate.lastMessage = remoteValidate.message;
                remoteValidate.blockUpdate = true;
                $elem.triggerHandler('refreshvalidityui');
                remoteValidate.message = 'async';
                remoteValidate.blockUpdate = false;
              },
              getData: function(){
                var data;
                data = {};
                data[$.prop(elem, 'name') || $.prop(elem, 'id')] = $(elem).val();
                opts.depends.each(function(){
                  if($(this).is(':invalid')){
                    data = false;
                    return false;
                  }
                  data[$.prop(this, 'name') || $.prop(this, 'id')] = $(this).val();
                });
                return data;
              },
              getTempMessage: function(){
                var message = 'async';
                var remoteData, dataStr;
                if(!data.remoteValidate.blockUpdate){
                  remoteData = this.getData();
                  if(!remoteData){
                    message = '';
                  } else {
                    try {
                      dataStr = JSON.stringify(remoteData);
                    } catch(er){}

                    if(dataStr === this.lastString){
                      message = this.ajaxLoading ? 'async' : this.lastMessage;
                    } else {
                      this.lastString = dataStr;
                      this.lastMessage = 'async';
                      clearTimeout(data.remoteValidate.timer);
                      data.remoteValidate.timer = setTimeout(function(){
                        data.remoteValidate.update(remoteData);
                      }, 9);
                    }

                  }
                } else {
                  message = remoteValidate.message;
                }

                return message;
              }
            };
            data.remoteValidate = remoteValidate;
          }

          return data.remoteValidate.getTempMessage();

        }, 'remote error');
      }

    }


  function isCommonPassword(password) {
    var commonPasswords = {
      academia: true, academic: true, access: true, adrian: true, adrianna: true, aerobics: true, airplane: true,
      albany: true, albatross: true, albert: true, alexander: true, algebra: true, aliases: true, alicia: true, alison: true, allison: true,
      alphabet: true, amadeus: true, amanda: true, amorphous: true, analog: true, anchor: true, andrea: true, andromache: true, angela: true,
      angerine: true, animals: true, annette: true, answer: true, anthropogenic: true, anvils: true, anything: true, ariadne: true, arlene: true,
      arthur: true, asshole: true, athena: true, atmosphere: true, aztecs: true, bacchus: true, badass: true, bailey: true, banana: true, bananas: true,
      bandit: true, barbara: true, barber: true, baritone: true, bartman: true, bassoon: true, batman: true, beater: true, beauty: true, beaver: true,
      beethoven: true, beloved: true, beowulf: true, berkeley: true, berlin: true, berliner: true, betsie: true, beverly: true, bicameral: true,
      bishop: true, bradley: true, brandi: true, brandy: true, brenda: true, bridget: true, broadway: true, bumbling: true, burgess: true, camille: true,
      campanile: true, cantor: true, cardinal: true, carmen: true, carole: true, carolina: true, caroline: true, carrie: true, carson: true, cascades: true,
      castle: true, catherine: true, cayuga: true, cecily: true, celtics: true, cerulean: true, change: true, charity: true, charles: true, charming: true,
      charon: true, chemistry: true, chester: true, christina: true, christine: true, christy: true, classic: true, claudia: true, cluster: true,
      clusters: true, coffee: true, collins: true, commrades: true, computer: true, comrade: true, comrades: true, condom: true, connect: true,
      connie: true, console: true, cookie: true, cooper: true, cornelius: true, couscous: true, create: true, creation: true, creosote: true,
      cretin: true, criminal: true, cristina: true, crystal: true, cynthia: true, daemon: true, dancer: true, daniel: true, danielle: true, dapper: true,
      debbie: true, deborah: true, december: true, deluge: true, denise: true, desiree: true, desperate: true, develop: true, device: true,
      dieter: true, digital: true, discovery: true, disney: true, drought: true, duncan: true, easier: true, edinburgh: true, edwina: true, egghead: true,
      eiderdown: true, eileen: true, einstein: true, elaine: true, elanor: true, elephant: true, elizabeth: true, emerald: true, emmanuel: true,
      engine: true, engineer: true, enterprise: true, enzyme: true, erenity: true, ersatz: true, establish: true, estate: true, eternity: true,
      euclid: true, evelyn: true, extension: true, fairway: true, felicia: true, fender: true, fermat: true, ferrari: true, fidelity: true, finite: true,
      fishers: true, flakes: true, flower: true, flowers: true, foolproof: true, football: true, foresight: true, forsythe: true,
      fourier: true, friend: true, frighten: true, fungible: true, gabriel: true, gardner: true, garfield: true, george: true,
      gertrude: true, gibson: true, ginger: true, glacier: true, golfer: true, gorgeous: true, gorges: true, gosling: true, graham: true, gryphon: true,
      guitar: true, gumption: true, guntis: true, hacker: true, hamlet: true, handily: true, happening: true, harmony: true, harold: true, harvey: true,
      hawaii: true, heather: true, hebrides: true, heinlein: true, herbert: true, hiawatha: true, hibernia: true, hidden: true, homework: true,
      hutchins: true, hydrogen: true, imbroglio: true, imperial: true, include: true, ingres: true, ingress: true, ingrid: true, innocuous: true,
      internet: true, irishman: true, jackie: true, janice: true, jasmin: true, jeanne: true, jennifer: true, jessica: true, jester: true, jixian: true,
      joanne: true, johnny: true, joseph: true, joshua: true, judith: true, juggle: true, jupiter: true, karina: true, kathleen: true, kathrine: true,
      katina: true, katrina: true, kermit: true, kernel: true, kerrie: true, kimberly: true, kirkland: true, kitten: true, knight: true, krista: true,
      kristen: true, kristi: true, kristie: true, kristin: true, kristine: true, kristy: true, lambda: true, lamination: true, larkin: true, lazarus: true,
      lebesgue: true, leland: true, leslie: true, library: true, lockout: true, lorraine: true, macintosh: true, maggot: true, malcolm: true, malcom: true,
      manager: true, marietta: true, markus: true, marvin: true, master: true, maurice: true, meagan: true, melissa: true, mellon: true, memory: true,
      mercury: true, merlin: true, michael: true, michele: true, michelle: true, mickey: true, minimum: true, minsky: true, moguls: true, monica: true,
      morley: true, mozart: true, mutant: true, nepenthe: true, neptune: true, network: true, newton: true, nicole: true, nobody: true, noreen: true,
      noxious: true, nuclear: true, nutrition: true, nyquist: true, oceanography: true, ocelot: true, office: true, olivetti: true, olivia: true,
      operator: true, oracle: true, orwell: true, osiris: true, outlaw: true, oxford: true, pacific: true, painless: true, pakistan: true, pamela: true,
      papers: true, password: true, patricia: true, pencil: true, penelope: true, penguin: true, peoria: true, percolate: true, persimmon: true,
      persona: true, philip: true, phoenix: true, pierre: true, playboy: true, plover: true, plymouth: true, polynomial: true, pondering: true,
      porsche: true, poster: true, praise: true, precious: true, prelude: true, presto: true, prince: true, princeton: true,
      professor: true, profile: true, program: true, protect: true, protozoa: true, pumpkin: true, puneet: true, puppet: true, qwerty: true,
      rabbit: true, rachel: true, rachelle: true, rachmaninoff: true, rainbow: true, raindrop: true, raleigh: true, random: true, rascal: true,
      reagan: true, really: true, rebecca: true, regional: true, remote: true, ripple: true, robotics: true, rochelle: true, rochester: true, rodent: true,
      romano: true, ronald: true, rosebud: true, rosemary: true, samantha: true, sandra: true, saturn: true, scamper: true, scheme: true, school: true,
      scotty: true, secret: true, security: true, sensor: true, serenity: true, service: true, sesame: true, shannon: true, sharks: true, sharon: true,
      sheffield: true, sheldon: true, sherri: true, shirley: true, shivers: true, shuttle: true, signature: true, simple: true, simpsons: true,
      singer: true, single: true, smiles: true, smooch: true, smother: true, snatch: true, snoopy: true, socrates: true, somebody: true, sondra: true,
      sossina: true, sparrows: true, spring: true, springer: true, squires: true, stacey: true, stacie: true, stephanie: true, strangle: true,
      stratford: true, student: true, stuttgart: true, subway: true, success: true, summer: true, superstage: true, superuser: true, support: true,
      supported: true, surfer: true, susanne: true, suzanne: true, swearer: true, symmetry: true, sysadmin: true, system: true, tamara: true,
      tangerine: true, target: true, tarragon: true, taylor: true, telephone: true, temptation: true, tennis: true, terminal: true, thailand: true,
      theresa: true, tiffany: true, toggle: true, tomato: true, topography: true, tortoise: true, toyota: true, tracie: true, trails: true,
      transfer: true, trisha: true, trivial: true, trombone: true, tuttle: true, unhappy: true, unicorn: true, unknown: true, uranus: true, urchin: true,
      ursula: true, utility: true, valerie: true, vasant: true, veronica: true, vertigo: true, village: true, virgin: true, visitor: true, wargames: true,
      warren: true, weenie: true, whatever: true, whatnot: true, whiting: true, whitney: true, wholesale: true, william: true, williamsburg: true,
      willie: true, winston: true, wisconsin: true, wizard: true, wombat: true, woodwind: true, wormwood: true, wyoming: true, xmodem: true,
      yellowstone: true, yolanda: true, yosemite: true, zimmerman: true, zmodem: true,
      // additional entries
      "function": true, "public" :true, "default": true, "private": true
    };
    return commonPasswords[password] === true;
  }

  function isStringMonotonicNumericalSequence(input) {
    // Must have a value that's at least 2 characters
    if ($.trim(input) == '' || (input.length < 2)) {
      return false;
    }
    // Convert input to something that we can use
    var array = convertStringToIntArray(input);
    if (array == null) {
      return false;
    }
    var increasing;
    if (array[1] > array[0]) {
      increasing = true;
    } else if (array[0] > array[1]) {
      increasing = false;
    } else {
      return false;
    }
    // Loop through each char and see if it's still increasing/decreasing by one.
    for (var i = 0; i < array.length - 1; i++) {
      if (increasing) {
        if ((array[i + 1] - array[i]) != 1) {
          return false;
        }
      } else {
        if ((array[i] - array[i + 1]) != 1) {
          return false;
        }
      }
    }
    // If we've made it this far, then we know that the string is a monotonic sequence of numbers.
    return true;
  }

  function isStringMonotonicAlphaSequence(input) {
    // Must have a value that's at least 2 characters
    if ($.trim(input) == '' || input.length < 2) {
      return false;
    }
    var value = input.toLowerCase(),
      increasing;
    // Sequential check conducted independent of case
    if (value.charCodeAt(1) > value.charCodeAt(0)) {
      increasing = true;
    } else if (value.charCodeAt(0) > value.charCodeAt(1)) {
      increasing = false;
    } else {
      return false;
    }
    // Now check the sequence of numbers
    for (var i = 0; i < value.length - 1; i++) {
      if ((increasing && value.charCodeAt(i + 1) - value.charCodeAt(i) != 1) || (!increasing && value.charCodeAt(i) - value.charCodeAt(i + 1) != 1)) {
        return false;
      }
    }
    return true;
  }

  function convertStringToIntArray(input) {
    if ($.trim(input) == '') {
      return null;
    }
    var array = new Array();
    for (var i = 0; i < input.length; i++) {
      array[i] = parseInt(input.substring(i, i + 1));
    }
    return array;
  }

  function isLoginSubstring($pwdInput) {
    var $form = $pwdInput.parents('form'),
      $loginInput = $form.find('input.user-id');
    if ($loginInput.length) {
      var pwdValue = $pwdInput.val(),
        loginValue = $loginInput.val();
      return loginValue != '' && (pwdValue.indexOf(loginValue) !== -1 || loginValue.indexOf(pwdValue) !== -1);
    }
    return false;
  }

  $.extend(Intuit.Utils, {
    Form: (function(){

      var we, $formFields, fixedErrorBox = false, lastErrorBubble = null, nextErrorBubble = null, validationTimeout,
        showBubbleTimeout, _debounceTimeout, captchaPassed = false,
      /*
       * For questions about this webshims "fix" for the purpose of our validation, please see Norberth
       *
       * Very briefly, it's far faster and easier on the CPU & memory for all devices.
       *
       * Had a bunch of race conditions that are now eliminated due to the new way of showing error messages during validation.
       *
       */
        fixErrorBox = function() {
          fixedErrorBox === false && (function(){

            var iVal = webshims.modules['form-validation'].options.iVal;
            var errorMessageClass = iVal.errorMessageClass || (iVal.errorMessageClass = 'ws-errormessage');
            var invalidWrapperClass = iVal.errorWrapperClass || (iVal.errorWrapperClass = 'ws-invalid');
            var successWrapperClass = iVal.successWrapperClass || (iVal.successWrapperClass = 'ws-success');

            var validClass = iVal.successClass || 'user-success';
            var invalidClass = iVal.errorClass || (iVal.errorClass = 'user-error');

            var fx = {
              slide: {
                show: 'slideDown',
                hide: 'slideUp'
              },
              fade: {
                show: 'fadeIn',
                hide: 'fadeOut'
              },
              no: {
                show: 'show',
                hide: 'hide'
              }
            };

            $.extend(webshims.errorbox, {
              showError: function(elem) {
                var fieldWrapper = this.getFieldWrapper(elem);
                var box = this.get(elem, fieldWrapper), $elem = $(elem);
                var message = $elem.getErrorMessage();

                if(box.message != message){
                  if(box.stop){
                    box.stop(true, true);
                  }
                  box.html('<p class="'+ errorMessageClass +'">'+ message +'</p>');
                  box.message = message;
                  fieldWrapper.addClass(invalidWrapperClass).removeClass(successWrapperClass);
                  this.recheckInvalidInput(elem);
                }
                fieldWrapper.removeClass(successWrapperClass);
                $elem.off('.recheckvalid').trigger('aftershowerror');
                return fieldWrapper;
              },
              showBubble: function(elem) {
                clearTimeout(showBubbleTimeout);
                var fieldWrapper = this.getFieldWrapper(elem), self = this;
                showBubbleTimeout = setTimeout(function(){
                  var $elem = $(elem);
                  if ($elem.is(':valid')) {
                    return;
                  }
                  var box = self.get(elem, fieldWrapper),
                    label = fieldWrapper.find('label');

                  if(box.is('[hidden]') || box.css('display') == 'none'){
                    if(!elem.getAttribute('aria-describedby')){
                      elem.setAttribute('aria-describedby', box.prop('id'));
                      if (label.is(':visible') && !label.hasClass('visually-hidden')) {
                        label.append(box.remove());
                      }
                    }
                    box
                      .css({
                        display: 'none',
                        left: label.width()
                      })
                      .removeAttr('hidden')
                      [fx[iVal.fx].show]()
                    ;
                  }
                }, 50);
                return fieldWrapper;
              },
              hideBubble: function(elem) {
                var fieldWrapper = this.getFieldWrapper(elem);
                var box = this.get(elem, fieldWrapper);
                box
                  .attr('hidden', 'hidden')
                  [fx[iVal.fx].hide]()
                ;
                return fieldWrapper;
              },
              validateFieldValue: function(e) {
                var elem = e.target, $elem = $(elem), fieldWrapper = this.getFieldWrapper(elem);
                if (e.type == 'mouseover' && $elem.attr('type') == 'checkbox' && !fieldWrapper.hasClass(invalidWrapperClass) && !$elem.hasClass(invalidClass)) {
                  return;
                }
                if ($elem.val().length != 0 || fieldWrapper.hasClass(invalidWrapperClass) || $elem.hasClass(invalidClass)) {
                  $elem.off('refreshvalidityui').one('refreshvalidityui', function(e){
                    var validity = $.prop(elem, 'validity');
                    if (validity.valid) {
                      elem.checkValidity();
                    } else {
                      Intuit.Utils.Form.showErrorBubble($elem);
                    }
                  })
                    .trigger('refreshvalidityui');
                } else if ($elem.val().length == 0) {
                  this.resetField(e);
                }
              },
              resetField: function(e) {
                var elem = e.target, $elem = $(elem), fieldWrapper = this.getFieldWrapper(elem);
                we.reset(elem);
                $elem.trigger('resetvalidityui').removeClass(validClass).removeClass(invalidClass);
                fieldWrapper.removeClass(successWrapperClass);
                fieldWrapper.removeClass(invalidWrapperClass);
                we.hideBubble(elem);
              },
              validateFieldMatch: function(model, target) {
                var self = this;
                _debounce(function(){
                  var fieldWrapper = self.getFieldWrapper(target);
                  var $target = $(target), $model = $(model), modelValue;
                  if ($model.is(':valid')) {
                    modelValue = $.trim($model.val());
                    if (modelValue == $.trim($target.val()) && modelValue != '') {
                      fieldWrapper.addClass(successWrapperClass);
                      $target.setCustomValidity('');
                      $target.trigger('recheck-validity');
                      if ($model.attr('type') === 'email') {
                        var event = jQuery.Event('form:emailAddress:set');
                        event.emailAddress = modelValue;
                        $('body').trigger(event);
                      }
                    } else {
                      fieldWrapper.removeClass(successWrapperClass);
                      $target.setCustomValidity($target.attr('data-errormessage-pattern-mismatch') || $target.attr('data-errormessage-type-mismatch'));
                    }
                  } else {
                    fieldWrapper.removeClass(successWrapperClass);
                    $target.setCustomValidity('');
                  }
                });
              }
            });
            fixedErrorBox = true;
            we = webshims.errorbox;
            overrideAjaxValidate();
            }());
        },
        triggerValidateFieldValue = function(e) {
          fixErrorBox();
          clearTimeout(validationTimeout);
          var timeout = setTimeout(function(){
            typeof we !== 'undefined' && we.validateFieldValue(e);
          }, 0);
          if (e.type !== 'focusout' && e.type !== 'focus') {
            validationTimeout = timeout;
          }
          return false;
        },
        triggerValidateFieldMatch = function(model, target) {
          fixErrorBox();
          typeof we !== 'undefined' && we.validateFieldMatch(model, target);
        },
        showErrorBubble = function() {
          var elem = arguments[0] ? arguments[0].get(0) : null;
          var currentErrorBubble = nextErrorBubble || elem;
          if (!currentErrorBubble) {
            return;
          }
          if (typeof we !== 'undefined') {
            lastErrorBubble && lastErrorBubble !== currentErrorBubble && we.hideBubble(lastErrorBubble);
            we.showBubble(currentErrorBubble);
          }
          nextErrorBubble = null;
          lastErrorBubble = currentErrorBubble;
        },
          formVerifyCaptcha = function (eleCaptcha) {
              var responseKey= grecaptcha.getResponse(eleCaptcha.attr('widgetId')) || "";
              if(responseKey.length>0){
                  if(Intuit.Utils.Standard.inShowroom()) {
                      var url = "/harmony_cms/verify_recaptcha?captcha_response=" + responseKey;
                      $.ajax({
                          url: url,
                          async: false,
                          error: function (xhr, status, error) {
                              console.log("Staus of Error " + status);
                              console.log("Error Message " + error);
                              return false;
                          }
                      })
                          .done(function (data) {
                              if (data.status == 200) {
                                  console.log("Data 200");
                              }
                              else {
                                  console.log("Captcha did not get a successful response");
                                  return false;
                              }
                          })
                          .fail(function () {
                              console.log("Exception has been caused while Validating Captcha");
                              return false;
                          });
                  }
              }else {
                  console.log("Captcha has not been validated");
                  return false;
              }
              return true;
          },
        formSubmit = function() {
          $submitButton = $(this);
          var classBeforeSubmit = $submitButton.attr('class');
          var $form = $(this).parents('form:first');
          //boolean to open a modal after the form is submitted.
          var openFormModal = $form.hasClass('open-form-modal');
          if ($submitButton.hasClass('submitted')) {
            return false;
          }
          //openFormModal false will not submit the form. It will just open a modal.
          if ($submitButton.attr('data-modal-path') && !openFormModal) {
            var $hiddenA = $('.modal.hidden');
            if ($hiddenA.length === 0) {
              $hiddenA = $('<a></a>');
            }
            $hiddenA.attr('href', $submitButton.attr('data-modal-path')).addClass('modal hidden');
            $submitButton.parent().append($hiddenA);
            $hiddenA.click();
            subscribeToModalEvents($form);
            $submitButton.removeAttr('data-modal-path');
            return false;
          }
          $submitButton.addClass('submitted');

          //enabling the spinner after submit button clicked
          if($submitButton.hasClass('submitted')){
                $submitButton.removeClass('ctasecondary').addClass('busy-spinner');
                $submitButton.prop('disabled', true);
          }

            //Captcha to be Validated only for Showroom
            if(!captchaPassed){
                var sCaptchaResponse = $form.find('.g-recaptcha');
                if (sCaptchaResponse.length > 0) {
                    eleCaptcha = $(sCaptchaResponse[0]);
                    var tmpFlag = formVerifyCaptcha(eleCaptcha);
                    if(!tmpFlag) {
                        if(!captchaPassed){
                            grecaptcha.reset(eleCaptcha.attr('widgetId')) ;
                            alert("Captcha Verification Failed");
                        }
                        console.log("classBeforeSubmit--------------"+classBeforeSubmit);
                        $submitButton.attr('class',classBeforeSubmit);
                        $submitButton.prop('disabled', false);
                        return false;
                    }else{
                        captchaPassed = true;
                    }
                }
            }

          if ($form.hasClass('use-ajax-post')) {
            $.ajax({
              url: $form.attr('action'),
              type: "POST",
              data: $form.serialize().concat('&form_name=', $form.attr('name')),
              beforeSend: function(xhr) {
                var key = Intuit.Utils.Constants.SBGMAuthKey
                xhr.setRequestHeader(
                  'Authorization',
                  key
                );
              },
              success: function(response) {
                switch(response.status) {
                  case 'err':
                    handleFormErrors($form, response.data);
                    $submitButton.removeClass('submitted');
                    $submitButton.removeClass('submitted');
                    $submitButton.removeClass('busy-spinner').addClass('ctasecondary');
                    $submitButton.prop('disabled', false);
                    break;
                  case 'ok':
                    //open modal after the form submit is successful
                    if ($submitButton.attr('data-modal-path') && openFormModal) {
                    	var $hiddenA = $('.modal.hidden');
                        if ($hiddenA.length === 0) {
                            $hiddenA = $('<a></a>');
                        }
                        $hiddenA.attr('href', $submitButton.attr('data-modal-path')).addClass('modal hidden');
                        $submitButton.parent().append($hiddenA);
                        $hiddenA.click();
                        subscribeToModalEvents($form);
                        $submitButton.removeClass('submitted');
                        $submitButton.removeClass('busy-spinner').addClass('ctasecondary');
                        $submitButton.prop('disabled', false);
                    }
                    else
                    {
                    	var forward = response.data.forward;
                    	forward[0] !== '/' && (forward = '/' +  forward);
                    	window.location.href = forward;
                    }
                }
              },
              error: function() {
                $submitButton.removeClass('submitted');
                $submitButton.removeClass('busy-spinner').addClass('ctasecondary');
                $submitButton.prop('disabled', false);
                handleFormErrors($form, {
                  global : {
                    type : 'Unexpected Error',
                    message : "Appropriate message should go here."
                  }
                });
              }
            });
            return false;
          }
        },
        handleFormErrors = function($form, data) {
          var error = data.message;
          if (typeof error === 'undefined') {
            return;
          }
          if( Object.prototype.toString.call( error.type ) === '[object Array]' ) {
            error.type = error.type[0];
          }
          if( Object.prototype.toString.call( error.text ) === '[object Array]' ) {
            error.text = error.text[0];
          }
          $form.find('.be.errors').html('<h6>'+ error.type +'<p>'+ error.text + '</p></h6>').show();
        },
        _debounce = function(callback, interval) {
          clearTimeout(_debounceTimeout);
          _debounceTimeout = setTimeout(function() {
            callback();
          }, interval || 0);
        },
        setupPasswordField = function($pwdField, $target) {
          var lengthThreshold = 7, previousLength = 0,
            processKeyAction = function(e) {
              var password = $pwdField.val(), passwordLength = password.length,
                animate = false, visibility = 'hide', validate = false,

                isValidPassword = function() {
                  var message = '';
                  /* is password a word from the blacklist? */
                  if (e.type == 'focusout' && isCommonPassword(password)) {
                    message = 'Password is too common.';
                    validate = true;
                    /* does password have spaces? */
                  } else if (/\s|[<>;]/g.test(password)) {
                    message = 'Password cannot spaces or scripting characters such as <, > or ;.';
                    validate = true;
                  } else if (e.type == 'focusout' && passwordLength >= lengthThreshold) {
                    /* does password contain numeric of alpha sequence */
                    if (isStringMonotonicNumericalSequence(password) || isStringMonotonicAlphaSequence(password)) {
                      message = "Password cannot be an alphabetic or numeric sequence like 'abcdefg' or '1234567'.";
                      /* does password meet the requirement of at least one number and one letter? */
                    } else if (!/^.*(?=.{7,32})(?=.*\d)(?=.*[a-zA-Z]).*$/g.test(password)) {
                      message = 'The password must contain at least one letter and one number.';
                      /* is password a substring of userId or vice versa? */
                    } else if (isLoginSubstring($pwdField)) {
                      message = 'Password cannot contain your User ID.';
                    }
                  } else if (e.type == 'focusout'){
                    /* is password at least 7 characters long? */
                    message = 'Password must be at least 7 characters long.';
                  }
                  return message;
                };

              passwordLength < lengthThreshold && previousLength >= lengthThreshold && (animate = true);
              passwordLength >= lengthThreshold && previousLength < lengthThreshold && (animate = true, visibility = 'show');

              animate && $target.animate({'height': visibility}, 300, 'swing');
              $pwdField.setCustomValidity(isValidPassword());
              previousLength = passwordLength;
              validate && triggerValidateFieldValue(e);
            };

          $pwdField.on('keyup focusout', processKeyAction);
        },
        subscribeToModalEvents = function($form) {
          window.getActiveForm = function() {
            return $form;
          }
          $('body').addClass('has-form');
          $form.one('modal:cta:click', function(e){
            $('<input type="hidden">').attr({
              name: 'bc',
              value: e.bc
            }).appendTo($form);
            $('<input type="hidden">').attr({
              name: 'successPage',
              value: e.successPage
            }).appendTo($form);
            if ($form.checkValidity()) {
              $form.submit();
            }
          });
        },

        checkForCreditCard = function($form) {
          var ccard = $form.find('input.credit-card');
          ccard.length && Intuit.Utils.Form.Tokenization.init({
            formElem: $form,
            server: 'https://tokenization-sys-qydc.platform.intuit.com/v2/creditCard',
            appid: 'Intuit_APIKey intuit_apikey=akyresw4qR5A4ogWciXVfP36tPBa1vE1WB2tbE2A',
            autoGenTokenField: true,
            autoGenCardTypeField: true
          });
        };

      return {
        initialize: function(elem){
          $formFields = elem.find($('.cform input,.cform select').not(':input[type=submit], :input[type=hidden]'));
          checkForCreditCard(elem);
          this.checkClientValidation(elem);
          this.setupRevealFields();
          this.creditCardEvent(elem);
          this.triggerRadioClick(elem);
          this.addCSRFTokenToForm(elem);
        },
        checkClientValidation: function(elem){
          var val_elem = elem.find('.cform-cvalidate'),
            rules = [
              'recheck-validity', // rule used for various custom check
              'mouseenter',
              'focus',
              'focusout'
            ];

          if(val_elem.length){
            elem.on('submit', function(e){
              var $submitButton = $(this).find($('.cform input[type=submit]'));
              var ccField = $('input.credit-card');
              if (ccField.length > 0) {
                Intuit.Utils.Form.Tokenization.TokenizeCC({
                  number: ccField.val(),
                  mask: '*',
                  success: function(obj) {
                    var ccard = $('input.credit-card');
                    ccard.removeAttr('pattern').val(obj.maskedNumber);
                    formSubmit.call($submitButton);
                  },
                  error: function(err) {
                    //console.log(err.message);
                  }
                });
                return false;
              }
              else {
                return formSubmit.call($submitButton);
              }
            });
            this.validateOnRules(rules.join(' '));
          }
        },
        validateOnRules: function(rules){
          $formFields
            // prevent copy paste
            .on('copy paste', function(e){
              return false;
            })
            // validate on rules
            .on(rules, triggerValidateFieldValue);

          // special validation for userId
          var userIdField = $formFields.filter('.user-id');
          userIdField.on('keyup', function(e){
            var $target = $(e.target);
            if ($target.val().length > 0) {
              _debounce(function(){
                $target.one('refreshvalidityui', triggerValidateFieldValue).trigger('refreshCustomValidityRules');
                var $form = $target.parents('form'),
                  $pwdInput = $form.find('input[type=password]');
                $pwdInput.length && $pwdInput.trigger('keyup');
              }, 1500);
            } else {
              _debounce(function(){
                triggerValidateFieldValue(e);
              });
            }
          });

          // supress error bubbles and only show ONE at a time
          $(document.body || 'html').on('invalid change refreshvalidityui', function(e){
            var target = e.target, $target = $(target);
            $target.off('aftershowerror firstinvalid').one('aftershowerror firstinvalid', function(e) {
              nextErrorBubble === null && (nextErrorBubble = target);
              _debounce(function(){
                showErrorBubble($(e.target));
              });
            });
          })
            // subscribe userId to email field trigger
            .on('form:emailAddress:set', function(e){
              userIdField.val(e.emailAddress).trigger('keyup');
            });
        },
        showErrorBubble: function($elem){
          showErrorBubble($elem);
        },
        setupRevealFields: function(elem){
          $('.field-reveal').each(function() {
            var self = this, $this = $(this);
            if ($this.data('reveal-trigger-field')) {
              var revealTriggerField = "#" + $this.data('reveal-trigger-field'),
                $revealTriggerField = $(revealTriggerField);

              var fieldType = $revealTriggerField.attr('type');

              if (fieldType == 'password') {
                setupPasswordField($revealTriggerField, $this);
              } else {
                function revealObserve() {
                  $revealTriggerField.one('keyup change', function(e){
                    if (!$(e.target).val().length) {
                      return revealObserve();
                    }
                    $this.animate({'height':'show'}, 300, 'swing');
                  });
                }
                revealObserve();
              }

              $revealTriggerField.on('keyup change', function(e){
                $this.find('input').attr('pattern', '^'.concat($revealTriggerField.val().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),'$'));
                triggerValidateFieldMatch(e.target, $(self).find('input').get(0));
              });

              $this.on({
                keyup: function(e){
                  triggerValidateFieldMatch(revealTriggerField, e.target);
                }
              });
            }
          });
        },
        creditCardEvent: function(elem){

          var ccard = elem.find('#cardNumber');
          $(".hidden-card-image").click(function(){ccard.focus()});

          ccard.keyup(function(event) {
            var $this = $(this);
            //function to remove invalid characters and auto-format credit card number with hyphens
            if(event.which > 46) {
              $this.val(function(){
                var tempValue = $this.val().replace(/[^0-9]/g,"");
                if(tempValue.charAt(0)=="3")
                  tempValue = tempValue.substr(0,15);
                else
                  tempValue = tempValue.substr(0,16);
                var cardLength = tempValue.length;
                var hyphenIndex = 4; var count = 3;
                while((cardLength > hyphenIndex)&&(count>0))
                {
                  tempValue = tempValue.substr(0,hyphenIndex) + "-" + tempValue.substr(hyphenIndex);
                  hyphenIndex+=5;
                  count--;cardLength++;
                  if(tempValue.charAt(0)=="3")
                  {
                    $this.attr("maxlength",17);
                    if(hyphenIndex > 12)
                      hyphenIndex+=1;
                    else{
                      hyphenIndex+=2;
                      count--;
                    }
                  }
                  else
                    $this.attr("maxlength",19);
                }
                return tempValue;
              });
            }

            //Rules to validate and display the appropriate cc logo
            if($this.val().match("^4([0-9 -]{0,19})$")){
              $this.nextAll(".hidden-card-image").toggleClass("invalidCard masterCard americanExpress discover", false).addClass("visa");
            }
            else if ($this.val().match("^5[1-5]([0-9 -]{0,18})$")){
              $this.nextAll(".hidden-card-image").toggleClass("invalidCard visa americanExpress discover", false).addClass("masterCard");
            }
            else if ($this.val().match("^3[47]([0-9 -]{0,17})$")){
              $this.nextAll(".hidden-card-image").toggleClass("invalidCard visa masterCard discover", false).addClass("americanExpress");
            }
            else if ($this.val().match("^6[05]([0-9 -]{0,18})$")){
              $this.nextAll(".hidden-card-image").toggleClass("invalidCard visa masterCard americanExpress", false).addClass("discover");
            }
            else {
              $this.nextAll(".hidden-card-image").toggleClass("visa masterCard americanExpress discover", false).addClass("invalidCard");
            }
          });
        },
        triggerRadioClick: function(elem) {
          var radioBttn = elem.find("input[type='radio']");
          radioBttn.on('click', function() {
            var $this = $(this);

            //Update Form Action url on radio selection
            if ($this.attr('data-update-action-url')) {
              elem.attr('action',$this.data('update-action-url'));
            }

            // Toggle Element on radio selection
            if($this.attr('data-toggle-element')){
              elem.find("[class*='toggle-element']").hide(); //hide all other opened elements
              $("."+$this.data("toggle-element")).slideDown(); // show the element
            } else if($this.parents("[class*='toggle-element']").length == 0){
              // hide all other opened elements which do not have data-toggle-element
              elem.find("[class*='toggle-element']").hide();
            }

          });
        },
        addCSRFTokenToForm: function(elem){
          // Setting CSRF Token
          $('#authenticity_token').attr('name',$('meta[name=csrf-param]').attr('content')).val($('meta[name=csrf-token]').attr('content'));
        }
      }
    }())
  });
}(jQuery, window, document));

$(document).ready(function() {
  var form = $('.cform.ws-validate');

  //handling different path in showroom
  if (Intuit != null && (typeof Intuit.AEMMode === 'object' && Object.keys(Intuit.AEMMode).length === 0)) {
    webshims.setOptions('basePath', '/assets/harmony/assets/form/js/shims/merged/minified/shims/');
  }

  //Trigger Form Init only when form element is found
  if (form.length) {
    webshims.polyfill('forms');
    webshims.ready('forms', function() {
      Intuit.Utils.Form.initialize(form);
    });
  }
});

/**
 * @file SBM Tokenization library provide functionality to tokenize credit cards, and bank account numbers
 * @version 1.0.0
 * @author Don DeSando
 */

(function($, window, document, undefined) {
    $.extend(Intuit.Utils.Form, {
        Tokenization: (function () {
            'use strict';

            /**
             * @private
             * @default null
             */
            var sdt_token_server_url,
                sdt_simple_auth_app_id,
                cc_token_number,
                cc_number,
                cc_number_type,
                cc_number_masked,
                cc_masking_char = '*',
                form_elem,
                auto_gen_token_field,
                auto_gen_card_type_field,
                callback_success = null,
                callback_error = null;

            /**
             * Implemented typeOf to overcome the shortcomings of the native typeof operator. Example: typeof [] returns an object,
             * where typeOf([]) returns, correctly array.
             * @private
             * @function
             * @name typeOf
             * @returns {String} a string that identifies the data type of an expression.
             */
            var typeOf = function (obj) {
                return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
            },
			
			 /**
             * Creates a hidden field in the DOM
             * @private
             * @function
             * @name createHiddenField
             * @param {Object} form Form to which the hidden field will be appended.
             * @param {String} fieldName Name attribute value
             * @param {String} fieldId Id attribute value
             * @param {String} defValue Default value to populate the input with
             * @returns {Object} Returns an object; the hidden input
             */
            createHiddenField = function(form, fieldName, fieldId, defValue) {
				form instanceof jQuery ? form = form.get(0) : form = form;
				var hField = document.createElement("input");
				hField.setAttribute("type", "hidden");
				hField.setAttribute("name", fieldName);
				hField.setAttribute("id", fieldId);
				hField.setAttribute("value", defValue);
				form.appendChild(hField);
				return hField;
            },

            /**
             * getter/setter for the SDT server end point
             * @private
             * @function
             * @name setTokenServerURL
             * @param {String} url
             * @return {String} returns service end-point URL
             */
            sdtTokenizationURL = function(url) {
                if (url === undefined) {
                    return sdt_token_server_url;
                }
                else {
                    sdt_token_server_url = url;
                }
            },

            /**
             * getter/setter for the SDT application ID
             * @private
             * @function
             * @name sdtApplicationID
             * @param {String} url
             * @return {String} returns an SDT application ID
             */
            sdtApplicationID = function(appid) {
                if (appid === undefined) {
                    return sdt_simple_auth_app_id;
                }
                else {
                    sdt_simple_auth_app_id = appid;
                }
            },

            /**
             * getter/setter for the raw credit card number
             * @private
             * @function
             * @name ccNumber
             * @param {Number} number - raw credit card number
             * @returns {Number} returns raw credit card number
             */
            ccNumber = function(number) {
                if (number === undefined) {
                    return cc_number;
                }
                else {
                    cc_number = number.toString().replace(/-/g, '');
                }
            },

            /**
             * getter/setter for a generated token
             * @private
             * @function
             * @name ccTokenNumber
             * @param {Number} number - token representing the credit card number provided
             * @returns {Number} returns a token representing the credit card number provided
             */
            ccTokenNumber = function(number) {
                if (number === undefined) {
                    return cc_token_number;
                }
                else {
                    cc_token_number = number;
                }
            },

            /**
             * getter/setter tokenization masking character
             * @private
             * @function
             * @name ccMaskingChar
             * @param {String} character - Single character representing the credit card number when masked
             * @returns {String} a character to use to mask the credit card number
             */
            ccMaskingChar = function(character) {
                if (character === undefined) {
                    return cc_masking_char;
                }
                else {
                    cc_masking_char = character;
                }
            },

            /**
             * getter/setter masked credit card number
             * @private
             * @function
             * @name ccMaskedNumber
             * @param {Number} number - credit card number to mask
             * @returns {String} returns a masked version of the the credit card. Last four characters of the credit card will be visible.
             */
            ccMaskedNumber = function(number) {
                if (number === undefined) {
                    return cc_number_masked;
                }
                else {
                    var tmp = number.toString();
                    var regExp = /(\d+)(\d{4})/;
                    var results = regExp.exec(tmp);
                    cc_number_masked = results[1].toString().replace(/\d/g, ccMaskingChar()) + results[2];
                    return cc_number_masked;
                }
            },

            /**
             * setter for success callback
             * @private
             * @function
             * @name setCallbackSuccess
             * @param {Object} callback - callback to be executed upon success of tokenization
             */
            setCallbackSuccess = function(callback) {
                callback_success = callback;
            },

            /**
             * call success
             * @private
             * @function
             * @name callbackSuccess
             * @param {Object} obj - object hash to pass to callback
             */
            callbackSuccess = function(obj) {
                callback_success(obj);
            },

            /**
             * setter for error callback
             * @private
             * @function
             * @name setCallbackError
             * @param {Object} callback - callback to be executed upon error
             */
            setCallbackError = function(callback) {
                callback_error = callback;
            },

            /**
             * invoke error callback
             * @private
             * @function
             * @name callbackError
             * @param {Object} callback - callback to be executed upon error
             */
            callbackError = function(obj) {
                callback_error(obj);
            },

	       /**
             * store reference to the form
             * @private
             * @function
             * @name autoGenTokenField
             * @param {Boolean} flag - indicating if the token field should be generated
             * @returns {Boolean} flag - indicating if the token field should be generated
             */
            formElem = function(elem) {
                if (elem === undefined) {
                    return form_elem;
                }
                else {
                    form_elem = elem;
                }
            },

            /**
             * flag to indicate if the token field should be auto generated
             * @private
             * @function
             * @name autoGenTokenField
             * @param {Boolean} flag - indicating if the token field should be generated
             * @returns {Boolean} flag - indicating if the token field should be generated
             */
            autoGenTokenField = function(flag) {
                if (flag === undefined) {
                    return auto_gen_token_field;
                }
                else {
                    auto_gen_token_field = flag;
                }
            },

            /**
             * flag to indicate if the token field should be auto generated
             * @private
             * @function
             * @name autoGenTokenField
             * @param {Boolean} flag - indicating if the token field should be generated
             * @returns {Boolean} flag - indicating if the token field should be generated
             */
            autoGenCardTypeField = function(flag) {
                if (flag === undefined) {
                    return auto_gen_card_type_field;
                }
                else {
                    auto_gen_card_type_field = flag;
                }
            },

            /**
             * Creates an XMLHttpRequest object
             * @private
             * @function
             * @name createXHRObject
             * @returns {Object} XMLHttpRequest object
             */
            createXHRObject = function() {
                try {
                    return new(window.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
                }
                catch (e) {
                    handleErrorCB(e);
                }
            },

            /**
             * description goes here
             * @private
             * @function
             * @name callTokenizationService
             */
            tokenizeCreditCardNumber = function (number) {
                var jsonPayload = JSON.stringify({ cc : ccNumber() });
                var xhrO = createXHRObject();
                if (xhrO !== null) {
                    xhrO.open("POST", sdtTokenizationURL(), false);
                    xhrO.setRequestHeader("Authorization", sdtApplicationID());
                    xhrO.setRequestHeader("Content-Type", "application/json");
                    xhrO.onreadystatechange = function() {
                        if (xhrO.readyState === 4) {
                            switch (xhrO.status) {
                                case 200:
                                    var jsonResponse = JSON.parse(xhrO.responseText);
                                    ccTokenNumber(jsonResponse.ccToken);
                                    if (autoGenTokenField()) {
                							var tokenizedCCField = createHiddenField(formElem(), 'tokenizedCreditCardNumber', 'tokenizedCreditCardNumber', jsonResponse.ccToken);
                                        tokenizedCCField.value = jsonResponse.ccToken;
                                    }
                                    if (autoGenCardTypeField()) {
                							var ccCardTypeField = createHiddenField(formElem(), 'billingCreditCardType', 'billingCreditCardType', ccType());
                                        ccCardTypeField.value = ccType();
                                    }
                                    handleSuccessCB();
                                    break;
                                case 400:
                                    handleErrorCB({code: 400, message: 'Bad Request'});
                                    break;
                                case 401:
                                    handleErrorCB({code: 401, message: 'Require authorization header'});
                                    break;
                                case 404:
                                    handleErrorCB({code: 404, message: 'Data not found'});
                                    break;
                                case 500:
                                    handleErrorCB({code: 500, message: 'Internal server error'});
                                    break;
                                case 503:
                                    handleErrorCB({code: 503, message: 'SDT service is unavailable'});
                                    break;
                                default:
                            }
                        }
                    };
                    xhrO.send(jsonPayload);
                }
            },


            /**
             * description goes here
             * @private
             * @function
             * @name handleErrorCB
             */
            handleErrorCB = function (obj) {
                callbackError({
                    code: obj.code,
                    message: obj.message
                });
            },

            /**
             * description goes here
             * @private
             * @function
             * @name handleSuccessCB
             */
            handleSuccessCB = function () {
                callbackSuccess({
                    token: ccTokenNumber(),
                    maskedNumber: ccMaskedNumber(),
                    cardType: ccType()
                });
            },

            /**
             * description goes here
             * @private
             * @function
             * @name getShowroomEnvrionment
             * @returns {String} environment prefix. Example: devint.sr
             */
            getShowroomEnvrionment = function () {
                var match = location.hostname.match(/^([^\.]+)\.([^\.]+)/);
                if (match !== null && match.length > 2) {
                    if (match[2] === 'sr') {
                        switch (match[1]) {
                            case('localdev'):
                                return 'localdev.sr';
                            case('devint'):
                                return 'devint.sr';
                            case('qa'):
                                return 'qa.sr';
                            case('perf'):
                                return 'perf.sr';
                            default:
                                return 'www';
                        }
                    }
                    else {
                        return 'www';
                    }
                }
            },

            /**
             * getter for determining the credit card type in a numerical form. Propietary to QBO
             * @private
             * @function
             * @name getCreditCardType
             * @param {Number} number - credit card number to check type of
             * @returns {Number} number representing the credit card type
             */
            ccType = function (number) {
                if (number === undefined) {
                    return cc_number_type;
                }
                else {
                    var number = number.toString();
                    switch(true) {
                        case /^4([0-9 -]{0,19})$/.test(number):
                            cc_number_type = 2;
                            return 2;
                        case /^5[1-5]([0-9 -]{0,18})$/.test(number):
                            cc_number_type = 1;
                            return 1;
                        case /^3[47]([0-9 -]{0,17})$/.test(number):
                            cc_number_type = 4;
                            return 4;
                        case /^6[05]([0-9 -]{0,18})$/.test(number):
                            cc_number_type = 32;
                            return 32;
                        default:
                            return null;
                    }
                }

                 /*
                 /^(5[12345])/   		// mc
                 /^(4)/					// v
                 /^(3[47])/				// amex
                 /^(3(0[012345]|[68]))/	// diners
                 /^(2(014|149))/		// enroute
                 /^(6011)/				// discover
                 /^(3)/					// jcb
                 /^(2131|1800)/			// jcb
                 */
            };



            /***
             *
             *
             * The following is a set of Public APIs
             *
             *
             ***/

            return {

                /**
                 * description goes here
                 * @public
                 * @function
                 * @name init
                 * @param {string} init - Initialize the Tokenization module
                 */
                init: function (options) {
                    // register sdt service end-point
                    sdtTokenizationURL(options.server);
                    // register sdt app id
                    sdtApplicationID(options.appid);
                    // register success callback
                    setCallbackSuccess(options.success);
                    // register callback error
                    setCallbackError(options.error);
                    // set form reference
                    formElem(options.formElem);
                    // auto gen token flag
                    autoGenTokenField(options.autoGenTokenField);
                    // auto gen card type flag 
                    autoGenCardTypeField(options.autoGenCardTypeField);
                },


                /**
                 * description goes here
                 * @public
                 * @function
                 * @name TokenizeCC
                 * @param {Object} options - Options object
                 * @param {Function} callback -
                 * @returns {Number} Tokenized number representing the provided Credit Card number
                 */
                TokenizeCC: function (options) {
                    // register sdt service end-point
                    sdtTokenizationURL(options.server);
                    // register sdt app id
                    sdtApplicationID(options.appid);
                    // register success callback
                    setCallbackSuccess(options.success);
                    // register callback error
                    setCallbackError(options.error);
                    // store the raw cc number
                    ccNumber(options.number);
                    // store the masking character
                    ccMaskingChar(options.mask);
                    // creates a masked version of the cc number
                    ccMaskedNumber(ccNumber());
                    // set the card type
                    ccType(ccNumber());
                    // invoke the tokenization service
                    tokenizeCreditCardNumber();
                },


                /**
                 * placeholder API -- to be implemented in near future
                 * @private
                 * @function
                 * @name TokenizeBAN
                 * @param {Number} routingNumber - Bank Routing number
                 * @param {Number} accountNumber - Bank Account Number
                 * @returns {Object} JSON containing tokenizedRoutingNumber and tokenizedAccountNumber
                 */
                TokenizeBAN: function (routingNumber, accountNumber) {
                }

            };

        }())
    });
}(jQuery, window, document));

var feedbackCharLimit = 2000; //IE max GET request URL length is 2,083 chars. other browsers have higher limits. (ATG used 2000)

try {
    //track a vpv with search term and referring URL
    Intuit.Analytics.Google.Core.gaSetVirtualPageURL('/search/?searchTerm=' + _search_term + '&searchReferringURL=' + _referrer_addr, false);
}
catch(err) {
    //Do nothing.
}

$(document).ready(function(){
    $( ".search-form-query-input" ).keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13' && this.value!== ""){
            if (typeof(analyticsClick) != "undefined") {
                analyticsClick('seach-text');
            }
        }
    });
    $("#btnSendFeedback").click(function() {
        var feedbackText = $.trim($(".search-feedback-input").val());
        var searchPhrase = $.trim($("#search_term").val());
        if (isNotEmpty(feedbackText) && isNotEmpty(searchPhrase)) {
            var encodedFeedbackText = encodeURIComponent(feedbackText); //encode certain chars that would normally be recognized as special chars for URIs so that many components may be included.
            var encodedSearchPhrase = encodeURIComponent(searchPhrase);
            $.post("send_feedback", {feedback: encodedFeedbackText, search_term: encodedSearchPhrase});
        }
        else if (isNotEmpty(feedbackText)) {   //user entered feedback but no search term so prevent feedback submission
            alert("Please enter a search term");
            return false;
        }
        else {     //user entered search term but no feedback so prevent feedback submission
            alert("Please enter feedback");
            return false;
        }
    });

    $('.search-feedback-input').bind('keydown keyup', function() {
        var className = $(this).attr("class");
        limitFeedbackLength(className, feedbackCharLimit);
    });

    $('.search-form-button').unbind('click').click(function() {
        var input = $('.search-form-query-input').val();
        if (input === "") {
            alert("Please enter a valid search term and try again");
            return false;
        }
    });

});

function isNotEmpty(text) {
    return (text !== "") && (text !== null);
}

function limitFeedbackLength(className, limit) {
    var limitedArea = $('.' + className);
    if (limitedArea.val().length > limit) {
        limitedArea.val(limitedArea.val().substring(0, limit));
        $('.limit-warning').text("You have exceeded the number of characters allowed")
    }
    else {
        $('.limit-warning').text("");
    }
}

(function ($, window, document, undefined) {
    var widgetId = [];
    var $window = Intuit.$window;
    if (typeof Intuit.Utils.Captcha === 'object') {
        return;
    }
    $.extend(Intuit.Utils, {

        Captcha: (function () {

            var initializeCaptcha = function (response) {

                if ($('.g-recaptcha').length > 0) { //To execute code only if Captcha Component is included in the page
                    if (!window['___grecaptcha_cfg']) {
                        $("head").append('<script type="text/javascript" src="https://www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit" async defer></script>');
                    }
                }

            };
            var onloadCaptchaCallback = function () {

                // Renders the HTML element with id.
                $('.g-recaptcha').each(function (index) {
                    this.id = "captcha-widget" + index;
                    widgetId[index] = grecaptcha.render(this.id, {
                        'sitekey': this.getAttribute("data-sitekey"),
                        'theme': this.getAttribute("data-theme"),
                        'type': this.getAttribute("data-type"),
                        'size': this.getAttribute("data-size"),
                        'callback': function () {
                            $('.g-recaptcha')[index].setAttribute("widgetId", index);
                        },
                        'expired-callback': function () {
                            grecaptcha.reset(index) ;
                            alert("Captcha expired.");
                        }
                    });

                });

            };


            $.wload(function () {
                initializeCaptcha();
            });

            return {

                initializeCaptcha: initializeCaptcha,
                onloadCaptchaCallback: onloadCaptchaCallback

            }
        }())
    });

}(jQuery, window, document));
function onloadCaptchaCallback() {
    return Intuit.Utils.Captcha.onloadCaptchaCallback();
}


function poll(fn, callback, errback, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 50;

    (function p() {
            // If the condition is met, we're done! 
            if(fn()) {
                callback();
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(p, interval);
            }
            // Didn't match and too much time, reject!
            else {
                errback(new Error('timed out for ' + fn + ': ' + arguments));
            }
    })();
}

/**
 * Simpler Carousel
 * by Jay Hung
 *
 * https://github.com/jayhung/simplerCarousel
 *
 * Lightweight carousel component for rotating content panels.
 *
 * Primary modifications include:
 *  - added prev/next arrows to pagination controls
 *  - removed dependency on a hardcoded height being provided
 *  - modified to use event delegation for pagination
 *  - added callback capability
 *  - added click to slide next option
 *  - added swipe gesture capability (swipe events must be provided externally)
 *  - expose slide() method for hooking into
 *
 * Forked and modified from:
 *
 * Simple Carousel
 * Copyright (c) 2012 Tobias Zeising, http://www.aditu.de
 * Licensed under the MIT license
 * 
 * https://github.com/SSilence/simple.carousel
 * Version 0.3
 */
(function($){
    $.fn.simplerCarousel = function( params ) {
        var defaults = {
            auto_rotate   : false,       // auto_rotation
            auto_slide_speed: 6000,    // auto_rotation_speed
            infinite_carousel: false,  //transition from last to first slide without a 'rewind'
            is_hero_carousel: false,
            fade        : false,      // fade transition between slides
            display_pagination: true, // show pagination controls?
            current_slide: 0,         //current_slide
            slides_count: 0,          //total number of slides
            slide_speed  : 600,
            visible_slides: 1,      //number of visible slides at once
            slidesToRotate: 1,
            defaultSlide: 1,         // this is the first visible slide when the page is loaded
            clicknext   : false,     // enable click to next slide?
            swipe       : true,     // enable swipe gestures?
            auto_resize : true,   // auto-resize carousel when browser resizes?
            callback    : false     // optional callback
        };

        var config = $.extend(defaults, params);
        
        
        //######### simplerCarousel VARIABLES  #######
        var ul = $(this);
        var li = ul.children('li');
        var view = ul.parent();
        var width = 0;  // this will be set as part of calcWidths()
        var slidesToDisplay = 1;
        var displayPagination = true;
        var container = ul.parent();    // .carousel-viewport


        //######### FUNCTION add_prev_next_tracking()   #######
        var add_prev_next_tracking = function( controls, current_index) {
          if (config.is_hero_carousel) {
            controls.find("span.prev").attr("data-wa-link","carousel-prev-slide" + find_prev_next_index( current_index, -1 ));
            controls.find("span.next").attr("data-wa-link","carousel-next-slide" + find_prev_next_index( current_index, +1 ));
          }
        }//add_prev_next_tracking


        //######### FUNCTION find_prev_next_index( current_index)   #######
        var find_prev_next_index = function( current_index, direction) {
            var position = current_index + direction;
            if (position>=config.slides_count){
              position = 0;
            } 
            else if (position<0) {
              position =  config.slides_count-1;
            }  
            //console.log("current_index:" + current_index + " direction:" + direction + " position:"+position)
            return String(position+1);
        }//find_prev_next_index


        //######### FUNCTION display_play_control_position()   #######
        var display_play_control_position = function() {
            if (config.display_pagination) {
              config.pg_pos = config.current_slide;
              if (config.current_slide<0) {
                  config.pg_pos = ((config.current_slide % config.slides_count) + config.slides_count) % config.slides_count; //((-5%4)+4)%4
              } else if (config.current_slide>=config.slides_count) {
                  config.pg_pos = config.current_slide % config.slides_count;
              }
  //console.log(" pg_pos="+config.pg_pos + " current_slide="+config.current_slide + " items="+config.slides_count)
              var controls   = container.next('.carousel-controls')
              var pagination = controls.find('.carousel-pagination');
              pagination.find('li').removeClass('carousel-pagination-active')
              pagination.find('li:nth-child('+(config.pg_pos+1)+')').addClass('carousel-pagination-active');
              
              add_prev_next_tracking( controls, config.current_slide );
            }
        }//display_play_control_position



        //######### FUNCTION debounce()   #######
        var debounce = function(fun, ms_time){
            //console.log("debounce  ms_time="+ms_time)
            var timer; 
            return function(){
                clearTimeout(timer); 
                timer = setTimeout(function(){fun() }, ms_time); 
            };
        }//debounce
 


        //######### FUNCTION slide()   #######
        var slide = function(dir, click) {
 //console.log("SLIDE() current_slide="+config.current_slide+ "  dir:"+dir + "  auto_rotate:"+config.auto_rotate+ "  auto_slide_speed:"+config.auto_slide_speed);
            if (typeof click == "undefined" &  config.auto_rotate!=true){
              return;
            }
            if (dir=="next") {
                config.current_slide += config.slidesToRotate;
                if(config.current_slide>=config.slides_count)
                    config.current_slide = 0;
            } else if(dir=="prev") {
                config.current_slide -= config.slidesToRotate;
                if (config.current_slide<0)
                    config.current_slide = (slidesToDisplay==1) ? config.slides_count-1 : config.slides_count-slidesToDisplay+(slidesToDisplay-(config.slides_count%slidesToDisplay));
            } else {
              config.current_slide = dir;
            }
            
            // set and display pagination
            display_play_control_position();

            if (config.fade!=false) {
                // fade
                ul.fadeOut(config.fade, function() {
                    ul.css({marginLeft: -1.0*config.current_slide*width});
                    ul.fadeIn(config.fade);
                });
            } else {
                // slide
                ul.animate( {marginLeft: -1.0*config.current_slide*(view.width()/slidesToDisplay)}, config.slide_speed );
            }

            if(typeof click != "undefined") {
                config.auto_rotate = false;
            }
    
            if (config.auto_rotate) {
              setTimeout(function() { slide('next');}, config.auto_slide_speed);
            }
        }//slide



        //######### FUNCTION drawControls()   #######
        var drawControls = function(){
            // include pagination
            if(config.display_pagination != false && !(container.next().hasClass("carousel-controls"))) {
                // add base controls markup
                container.after('<div class="carousel-controls"><div class="carousel-controls-wrap"><ul class="carousel-pagination"></ul></div></div>');
                var controls = container.next('.carousel-controls');
                var pagination = controls.find('.carousel-pagination');
                var pagedots = pagination.find('li');
    
                pagination.before('<span class="global-sprite prev"></span>').after('<span class="global-sprite next"></span>');
                
                add_prev_next_tracking(controls, config.defaultSlide-1 )
                
                var set_active,track_link;
                // add dot for each slide + tracking + active class (if applicable)
                for(var i=0;i<config.slides_count;i++) {
                  track_link = (config.is_hero_carousel)    ? " data-wa-link=\"carousel-slide"+ (i+1) +"\" " : "";  //add tracking for hero-carousel
                  set_active = (i==(config.defaultSlide-1)) ? " class=\"carousel-pagination-active\" " : "";  //add style class, if selected
                  pagination.append('<li ' + track_link + set_active + ' ></li>');
                }

                // add event handlers
                controls
                    .on('click', '.prev', debounce(function(){ slide('prev', true); }, 270))
                    .on('click', '.next', debounce(function(){ slide('next', true); }, 270))
                    .on('click', '.carousel-pagination li', function(){ slide($(this).index(), true); });

                return true;
            }
            return false;
        }//drawControls



        //##### FUNCTION setImageHeight()   #######
        var resetImageHeight = function(){
            var index, slide,slide_ht, ht = 0, slide_all;
            slide_all = $(".hero-carousel .carousel-viewport li.slide .bg img");
            if (slide_all.size()>0){
              slide_all.each( function( index, slide ) {
//console.log(" slide #",+ index + "  prop('height')= "+ $(slide).prop('height') + " $(slide).height()=" +$(slide).height() + " img.height="+slide.height  + " img.naturalHeight="+ slide.naturalHeight +  " img.clientHeight="+ slide.clientHeight );
                slide_ht = $(slide).height();
                if (slide_ht > ht)
                  ht = slide_ht
              });//slide_all.each
              // apply height to outside div
              slide_all = $(".hero-carousel .carousel-viewport li.slide > .ccontainer");
              slide_all.each( function( index, slide ) {
                $(slide).height(ht);
              });//slide_all.each
            }
        }//resetImageHeight



        //##### FUNCTION calcWidths()   #######
        var calcWidths = function() {
            var windowWidth = $(window).width();

            if(windowWidth >= 768){ //for desktop and tablet view
                    slidesToDisplay = config.visible_slides;
            }else{
                //for mobile display only one slide
                    slidesToDisplay = 1;
            }

            // use width of our view (i.e. immediate carousel container) unless one was passed in from config
            width = config.width || (view.width()/slidesToDisplay);

            // if multiple slides shown together (i.e. 2 at a time) set width to sum of all visible slides
            if(slidesToDisplay>1) {
                width = width*slidesToDisplay;
            }

            // set width of slides container to the sum of width of all slides
            ul.css({
                'width' : config.slides_count*width,
                 marginLeft: -1.0*config.current_slide*(view.width()/slidesToDisplay)
            });

            // set widths for all slides to our calculated width
            li.each(function(i,item) {
                $(item).css({
                    'width' : (view.width()/slidesToDisplay)
                });
            });
            if(config.slides_count>slidesToDisplay){
                 if(!drawControls()){showControls();}
            }else{
                //this is to make sure that all the slides are displayed without controls.    
                slide(0,false); 
                hideControls(); 
            }

            //Reset height for hero-carousel
            if (config.is_hero_carousel) {
              resetImageHeight();
            }
        }//calcWidths



        //##### FUNCTION hideControls()   #######
        var hideControls = function(){
            container.siblings(".carousel-controls").hide();
        }//hideControls



        //##### FUNCTION showControls()   #######
        var showControls = function(){
              if(config.display_pagination != false)
                container.siblings(".carousel-controls").show();
        }//showControls
    


        ul.on('movestart', function(e) {
          // If the movestart is heading off in an upwards or downwards
          // direction, prevent it so that the browser scrolls normally.
          if ((e.distX > e.distY && e.distX < -e.distY) ||
              (e.distX < e.distY && e.distX > -e.distY)) {
              e.preventDefault();
          }
        });


        // if auto_rotate,get it started
        if (config.auto_rotate) {
           setTimeout(function() { slide('next');}, config.auto_slide_speed);
        }
  
        // if enabled, go to next slide on click when initialized
        if (config.clicknext) {
            ul.on('click',  function() { slide('next', true); });
        }


        ///#### ## MORE INITIALIZATION ###### ////////
        config.slides_count = li.length;
        //set right value for slidesToRotate variable
        if(!(config.slidesToRotate)|| (config.slidesToRotate<1) || ((config.slidesToRotate>config.slides_count))){
            config.slidesToRotate=1;
        }
        //set right value for defaultSlide variable
        if(!(config.defaultSlide)|| (config.defaultSlide<1) || (config.defaultSlide>config.slides_count)){
            config.defaultSlide=1;
        }

        if (config.infinite_carousel) {
          //move the last item before first item, just in case user click prev button
          ul.find('li:first').before(ul.find('li:last'));
          //set the default item to the correct position
          ul.css({'marginLeft' : -1 * width});
        }


        // if enabled, go to next/prev slides on swipe left/right gestures, respectively
        // note:
        //   swipe events are not provided by simplerCarousel.js and must be triggered externally.
        //   jquery.event.swipe.js by Stephen Band works rather nicely
        if (config.swipe) {
            ul
                .on('swipeleft',  function() { 
                    slide('next', true); 
                })
                .on('swiperight', function() { 
                    slide('prev', true); 
                });
        }


        // call callback after carousel init (if provided)
        if(typeof(config.callback)==="function") {
            config.callback.call(this);
        }
        
        calcWidths();   // first init for initial widths

        if (config.auto_resize) {
          // set handler to recalc widths upon resize (such as responding to device orientation changes or browser resizes in fluid designs)
          $(window).resize(function() {
              calcWidths();   // TODO: may be able to throttle or debounce this call in future
          });
        }//config.auto_resize

        //event handler when tab is active. This is required as width of the carousel is calculated based on parent container.
        //without this handler carousel width will be 0.
        $(document).on('tabActive',function(event,tabContent){
            //wait till the dom is re-rendered. calling calcWidth directly on time out is causing issue with height.
            poll(
                function() {//condition to check
                    return tabContent.find('.ccarousel').is(':visible');
                },
                function() {//success callback
                   $(window).trigger('resize');
                },
                function() {//error callback
                }
            );
        });
    
    
        // return and expose available API
        return {
            slide : slide
        }
    }//fn.simplerCarousel
})(jQuery);

// jquery.event.move
//
// 1.3.1
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){

	var // Number of pixels a pressed pointer travels before movestart
	    // event is fired.
	    threshold = 6,
	
	    add = jQuery.event.add,
	
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    // Shim for requestAnimationFrame, falling back to timer. See:
	    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    requestFrame = (function(){
	    	return (
	    		window.requestAnimationFrame ||
	    		window.webkitRequestAnimationFrame ||
	    		window.mozRequestAnimationFrame ||
	    		window.oRequestAnimationFrame ||
	    		window.msRequestAnimationFrame ||
	    		function(fn, element){
	    			return window.setTimeout(function(){
	    				fn();
	    			}, 25);
	    		}
	    	);
	    })(),
	    
	    ignoreTags = {
	    	textarea: true,
	    	input: true,
	    	select: true,
	    	button: true
	    },
	    
	    mouseevents = {
	    	move: 'mousemove',
	    	cancel: 'mouseup dragstart',
	    	end: 'mouseup'
	    },
	    
	    touchevents = {
	    	move: 'touchmove',
	    	cancel: 'touchend',
	    	end: 'touchend'
	    };


	// Constructors
	
	function Timer(fn){
		var callback = fn,
				active = false,
				running = false;
		
		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}
		
		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};
		
		this.end = function(fn) {
			var cb = callback;
			
			if (!fn) { return; }
			
			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } : 
					fn ;
				
				active = true;
			}
		};
	}


	// Functions
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function preventDefault(e) {
		e.preventDefault();
	}
	
	function preventIgnoreTags(e) {
		// Don't prevent interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }
		
		e.preventDefault();
	}

	function isLeftButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}
		
		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...
		
		i = -1;
		l = touchList.length;
		
		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, event) {
		var touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

		return touch;
	}


	// Handlers that decide when the first movestart is triggered
	
	function mousedown(e){
		var data;

		if (!isLeftButton(e)) { return; }

		data = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			timeStamp: e.timeStamp
		};

		add(document, mouseevents.move, mousemove, data);
		add(document, mouseevents.cancel, mouseend, data);
	}

	function mousemove(e){
		var data = e.data;

		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e) {
		removeMouse();
	}

	function removeMouse() {
		remove(document, mouseevents.move, mousemove);
		remove(document, mouseevents.cancel, mouseend);
	}

	function touchstart(e) {
		var touch, template;

		// Don't get in the way of interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

		touch = e.changedTouches[0];
		
		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so we must copy the data. This object acts as a template for
		// movestart, move and moveend event objects.
		template = {
			target: touch.target,
			startX: touch.pageX,
			startY: touch.pageY,
			timeStamp: e.timeStamp,
			identifier: touch.identifier
		};

		// Use the touch identifier as a namespace, so that we can later
		// remove handlers pertaining only to this touch.
		add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
		add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
	}

	function touchmove(e){
		var data = e.data,
		    touch = changedTouch(e, data);

		if (!touch) { return; }

		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e) {
		var template = e.data,
		    touch = identifiedTouch(e.changedTouches, template.identifier);

		if (!touch) { return; }

		removeTouch(template.identifier);
	}

	function removeTouch(identifier) {
		remove(document, '.' + identifier, touchmove);
		remove(document, '.' + identifier, touchend);
	}


	// Logic for deciding when to trigger a movestart.

	function checkThreshold(e, template, touch, fn) {
		var distX = touch.pageX - template.startX,
		    distY = touch.pageY - template.startY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		triggerStart(e, template, touch, distX, distY, fn);
	}

	function handled() {
		// this._handled should return false once, and after return true.
		this._handled = returnTrue;
		return false;
	}

	function flagAsHandled(e) {
		e._handled();
	}

	function triggerStart(e, template, touch, distX, distY, fn) {
		var node = template.target,
		    touches, time;

		touches = e.targetTouches;
		time = e.timeStamp - template.timeStamp;

		// Create a movestart object with some special properties that
		// are passed only to the movestart handlers.
		template.type = 'movestart';
		template.distX = distX;
		template.distY = distY;
		template.deltaX = distX;
		template.deltaY = distY;
		template.pageX = touch.pageX;
		template.pageY = touch.pageY;
		template.velocityX = distX / time;
		template.velocityY = distY / time;
		template.targetTouches = touches;
		template.finger = touches ?
			touches.length :
			1 ;

		// The _handled method is fired to tell the default movestart
		// handler that one of the move events is bound.
		template._handled = handled;
			
		// Pass the touchmove event so it can be prevented if or when
		// movestart is handled.
		template._preventTouchmoveDefault = function() {
			e.preventDefault();
		};

		// Trigger the movestart event.
		trigger(template.target, template);

		// Unbind handlers that tracked the touch or mouse up till now.
		fn(template.identifier);
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e) {
		var event = e.data.event,
		    timer = e.data.timer;

		updateEvent(event, e, e.timeStamp, timer);
	}

	function activeMouseend(e) {
		var event = e.data.event,
		    timer = e.data.timer;
		
		removeActiveMouse();

		endEvent(event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				remove(event.target, 'click', returnFalse);
			}, 0);
		});
	}

	function removeActiveMouse(event) {
		remove(document, mouseevents.move, activeMousemove);
		remove(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		updateEvent(event, touch, e.timeStamp, timer);
	}

	function activeTouchend(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(event);
		endEvent(event, timer);
	}

	function removeActiveTouch(event) {
		remove(document, '.' + event.identifier, activeTouchmove);
		remove(document, '.' + event.identifier, activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp, timer) {
		var time = timeStamp - event.timeStamp;

		event.type = 'move';
		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;
		
		// Average the velocity of the last few events using a decay
		// curve to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;

		timer.kick();
	}

	function endEvent(event, timer, fn) {
		timer.end(function(){
			event.type = 'moveend';

			trigger(event.target, event);
			
			return fn && fn();
		});
	}


	// jQuery special event definition

	function setup(data, namespaces, eventHandle) {
		// Stop the node from being dragged
		//add(this, 'dragstart.move drag.move', preventDefault);
		
		// Prevent text selection and touch interface scrolling
		//add(this, 'mousedown.move', preventIgnoreTags);
		
		// Tell movestart default handler that we've handled this
		add(this, 'movestart.move', flagAsHandled);

		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function teardown(namespaces) {
		remove(this, 'dragstart drag', preventDefault);
		remove(this, 'mousedown touchstart', preventIgnoreTags);
		remove(this, 'movestart', flagAsHandled);
		
		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function addMethod(handleObj) {
		// We're not interested in preventing defaults for handlers that
		// come from internal move or moveend bindings
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		// Stop the node from being dragged
		add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);
		
		// Prevent text selection and touch interface scrolling
		add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
	}
	
	function removeMethod(handleObj) {
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
		remove(this, 'mousedown.' + handleObj.guid);
	}
	
	jQuery.event.special.movestart = {
		setup: setup,
		teardown: teardown,
		add: addMethod,
		remove: removeMethod,

		_default: function(e) {
			var template, data;
			
			// If no move events were bound to any ancestors of this
			// target, high tail it out of here.
			if (!e._handled()) { return; }

			template = {
				target: e.target,
				startX: e.startX,
				startY: e.startY,
				pageX: e.pageX,
				pageY: e.pageY,
				distX: e.distX,
				distY: e.distY,
				deltaX: e.deltaX,
				deltaY: e.deltaY,
				velocityX: e.velocityX,
				velocityY: e.velocityY,
				timeStamp: e.timeStamp,
				identifier: e.identifier,
				targetTouches: e.targetTouches,
				finger: e.finger
			};

			data = {
				event: template,
				timer: new Timer(function(time){
					trigger(e.target, template);
				})
			};
			
			if (e.identifier === undefined) {
				// We're dealing with a mouse
				// Stop clicks from propagating during a move
				add(e.target, 'click', returnFalse);
				add(document, mouseevents.move, activeMousemove, data);
				add(document, mouseevents.end, activeMouseend, data);
			}
			else {
				// We're dealing with a touch. Stop touchmove doing
				// anything defaulty.
				//e._preventTouchmoveDefault();		// jay warning: this line prevents events captured from bubbling up!
				add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
				add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
			}
		}
	};

	jQuery.event.special.move = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.move', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.move', jQuery.noop);
		}
	};
	
	jQuery.event.special.moveend = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.moveend', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.moveend', jQuery.noop);
		}
	};

	add(document, 'mousedown.move', mousedown);
	add(document, 'touchstart.move', touchstart);

	// Make jQuery copy touch event properties over to the jQuery event
	// object, if they are not already listed. But only do the ones we
	// really need. IE7/8 do not have Array#indexOf(), but nor do they
	// have touch events, so let's assume we can ignore them.
	if (typeof Array.prototype.indexOf === 'function') {
		(function(jQuery, undefined){
			var props = ["changedTouches", "targetTouches"],
			    l = props.length;
			
			while (l--) {
				if (jQuery.event.props.indexOf(props[l]) === -1) {
					jQuery.event.props.push(props[l]);
				}
			}
		})(jQuery);
	};
});

// jQuery.event.swipe
// 0.5
// Stephen Band

// Dependencies
// jQuery.event.move 1.2

// One of swipeleft, swiperight, swipeup or swipedown is triggered on
// moveend, when the move has covered a threshold ratio of the dimension
// of the target node, or has gone really fast. Threshold and velocity
// sensitivity changed with:
//
// jQuery.event.special.swipe.settings.threshold
// jQuery.event.special.swipe.settings.sensitivity

(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){
	var add = jQuery.event.add,
	   
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    settings = {
	    	// Ratio of distance over target finger must travel to be
	    	// considered a swipe.
	    	threshold: 0.4,
	    	// Faster fingers can travel shorter distances to be considered
	    	// swipes. 'sensitivity' controls how much. Bigger is shorter.
	    	sensitivity: 6
	    };

	function moveend(e) {
		var w, h, event;

		w = e.target.offsetWidth;
		h = e.target.offsetHeight;

		// Copy over some useful properties from the move event
		event = {
			distX: e.distX,
			distY: e.distY,
			velocityX: e.velocityX,
			velocityY: e.velocityY,
			finger: e.finger
		};

		// Find out which of the four directions was swiped
		if (e.distX > e.distY) {
			if (e.distX > -e.distY) {
				if (e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
					event.type = 'swiperight';
					trigger(e.currentTarget, event);
				}
			}
			else {
				if (-e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
					event.type = 'swipeup';
					trigger(e.currentTarget, event);
				}
			}
		}
		else {
			if (e.distX > -e.distY) {
				if (e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
					event.type = 'swipedown';
					trigger(e.currentTarget, event);
				}
			}
			else {
				if (-e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
					event.type = 'swipeleft';
					trigger(e.currentTarget, event);
				}
			}
		}
	}

	function getData(node) {
		var data = jQuery.data(node, 'event_swipe');
		
		if (!data) {
			data = { count: 0 };
			jQuery.data(node, 'event_swipe', data);
		}
		
		return data;
	}

	jQuery.event.special.swipe =
	jQuery.event.special.swipeleft =
	jQuery.event.special.swiperight =
	jQuery.event.special.swipeup =
	jQuery.event.special.swipedown = {
		setup: function( data, namespaces, eventHandle ) {
			var data = getData(this);

			// If another swipe event is already setup, don't setup again.
			if (data.count++ > 0) { return; }

			add(this, 'moveend', moveend);

			return true;
		},

		teardown: function() {
			var data = getData(this);

			// If another swipe event is still setup, don't teardown.
			if (--data.count > 0) { return; }

			remove(this, 'moveend', moveend);

			return true;
		},

		settings: settings
	};
});
/**
 * Hero Carousel Plugin
 *
 */
(function($) {
    $.fn.heroCarousel = function(params) {
        var defaults = {
            auto: false, // autorotate?
            fade: false, // fade transition between slides?
            pagination: true, // show pagination controls?
            current: 0,
            pg_pos: 0,
            slidecnt: 1,
            items: 0,
            slidespeed: 600,
            visible: 1,
            clicknext: true, // enable click to next slide?
            swipe: true, // enable swipe gestures?
            autoresize: false, // auto-resize carousel when browser resizes?
            callback: false, // optional callback
            infinite_carousel: true
        };
        var config = $.extend(defaults, params);
        var ul = $(this);
        var li = ul.children('li');
        var view = ul.parent();
        var width = 0; // this will be set as part of calcWidths()

        config.item_cnt = li.length;

        var calcWidths = function() {
            // use width of our view (i.e. immediate carousel container) unless one was passed in from config
            width = config.width || view.width();

            // if multiple slides shown together (i.e. 2 at a time) set width to sum of all visible slides
            config.items = li.length;
            if (config.visible > 1) {
                width = width * config.visible;
            }

            // set width of slides container to the sum of width of all slides
            ul.css({
                'width': config.items * width
            });

            // set widths for all slides to our calculated width
            li.each(function(i, item) {
                $(item).css({
                    'width': width
                });
            });
        };
        calcWidths(); // first init for initial widths

        if (config.autoresize) {
            // set handler to recalc widths upon resize (such as responding to device orientation changes or browser resizes in fluid designs)
            $(window).resize(function() {
                calcWidths(); // TODO: may be able to throttle or debounce this call in future
            });
        }

        var container = ul.parent(); // .carousel-viewport
        var setUp_Infinite_carousel = false;

        var current_pos = function() {
            config.pg_pos = config.current;
            if (config.current < 0) {
                config.pg_pos = ((config.current % config.item_cnt) + config.item_cnt) % config.item_cnt; //((-5%4)+4)%4
            } else if (config.current >= config.item_cnt) {
                config.pg_pos = config.current % config.item_cnt;
            }

        }

        var debounce = function(fun, mil) {
            var timer;
            return function() {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fun();
                }, mil);
            };
        }

        // function for sliding the carousel
        var slide = function(dir, click) {
            if (typeof click == "undefined" & config.auto == false)
                return;

            if (dir == "next") {
                config.current += config.visible;
                if (config.current >= config.items) {
                    config.current = 0;
                }

                config.slidecnt = 1;

            } else if (dir == "prev") {
                config.current -= config.visible;
                if (config.current < 0) {
                    config.current = (config.visible == 1) ? config.items - 1 : config.items - config.visible + (config.visible - (config.items % config.visible));
                }

                config.slidecnt = -1;

            } else {

                config.slidecnt = dir - config.current;
                config.current = dir;

            }

            // set pagination
            if (config.pagination != false) {
                current_pos();
                var pagination = container.next('.carousel-controls').find('.carousel-pagination');
                pagination.find('li').removeClass('carousel-pagination-active')
                pagination.find('li:nth-child(' + (config.pg_pos + 1) + ')').addClass('carousel-pagination-active');
            }

            if (config.fade != false) {
                // fade
                ul.fadeOut(config.fade, function() {
                    ul.css({
                        marginLeft: -1.0 * config.current * width
                    });
                    ul.fadeIn(config.fade);
                });
            } else {
                // slide
                var mLeft = -1 * width;
                if (config.infinite_carousel) {
                    if (!setUp_Infinite_carousel) {
                        setUp_Infinite_carousel = true;
                        //move the last item before first item, just in case user click prev button
                        ul.find('li:first').before(ul.find('li:last'));
                        //set the default item to the correct position
                        ul.css({
                            'marginLeft': -1 * width
                        });

                    }
                    var moveslides = config.slidecnt < 0 ? -1 * config.slidecnt : config.slidecnt;
                    var animatePixLeft = parseInt(ul.css('marginLeft')) - config.slidecnt * width;
                    var litems = ul.children("li");

                    //console.log(" :: MOVE : " + config.slidecnt  + " ::  moveslides:" + moveslides + " :: aninamePix:" + animatePixLeft);

                    if (config.slidecnt > 0) { //slide forward (means animate images left)
                        ul.animate({
                            marginLeft: animatePixLeft
                        }, config.slidespeed, "linear", function() {
                            //move the last items and put after current last item
                            ul.find('li:last').after(litems.slice(0, moveslides));
                            ul.css({
                                'marginLeft': mLeft
                            });

                        });
                    } else { //slide back  (means animate images right)
                        ul.animate({
                            marginLeft: animatePixLeft
                        }, config.slidespeed, function() {
                            //move the last items and put before current first item
                            ul.find('li:first').before(litems.slice(config.item_cnt - moveslides, config.item_cnt));
                            ul.css({
                                'marginLeft': mLeft
                            });

                        });
                    }
                } else {

                    ul.animate({
                        marginLeft: -1.0 * config.current * width
                    }, config.slidespeed);
                }
            }

            if (typeof click != "undefined") {
                config.auto = false;
            }

            if (config.auto != false) {
                setTimeout(function() {
                    slide('next');
                }, config.auto);
            }
        }

        // if enabled, go to next slide on click
        if (config.clicknext) {
            ul.on('click', function() {
                slide('next', true);
            });
        }

        // if enabled, go to next/prev slides on swipe left/right gestures, respectively
        //
        // note:
        //   swipe events are not provided by heroCarouselPlugin.js and must be triggered externally.
        //   jquery.event.swipe.js by Stephen Band works rather nicely
        if (config.swipe) {
            ul
                .on('swipeleft', function() {
                    slide('next', true);
                })
                .on('swiperight', function() {
                    slide('prev', true);
                });
        }

        // include pagination
        if (config.pagination != false && !(container.next().hasClass("carousel-controls"))) {
            // add base controls markup
            container.after('<div class="carousel-controls"><div class="carousel-controls-wrap"><ul class="carousel-pagination"></ul></div></div>');
            var controls = container.next('.carousel-controls');
            var pagination = controls.find('.carousel-pagination');
            var pagedots = pagination.find('li');

            // add prev/next buttons
            pagination.before('<span class="global-sprite prev"></span>').after('<span class="global-sprite next"></span>');

            // add dot for each slide
            for (var i = 0; i < config.items; i++) {
                pagination.append(i == 0 ? '<li class="carousel-pagination-active"></li>' : '<li></li>');
            }

            // add event handlers
            controls
                .on('click', '.prev', debounce(function() {
                    slide('prev', true);
                }, 270))
                .on('click', '.next', debounce(function() {
                    slide('next', true);
                }, 270))
                .on('click', '.carousel-pagination li', function() {
                    slide($(this).index(), true);
                });
        }

        // start auto sliding
        if (config.auto != false) {
            setTimeout(function() {
                slide('next');
            }, config.auto);
        }

        // call callback after carousel init (if provided)
        if (typeof(config.callback) === "function") {
            config.callback.call(this);
        }

        // return and expose available API
        return {
            slide: slide
        }
    }
})(jQuery);

(function($, window, document, undefined){
    $.extend(Intuit.Utils, {
        Accordion: (function(){
            return {
                init: function(){
                	$('.panel-content').hide();
                    $('.panel-content').first().show();
                },
                toggleChevron: function(e){
                    e.preventDefault();
                    $(e.target)
        				.prev('.panel-heading')
        				.find("span.indicator")
        				.toggleClass('chevron-r-icon-8x12 chevron-d-icon-8x12');
                },
                swapContent: function(e){
					e.preventDefault();
                    var cont = $(".container-"+e.target.id.split('-')[1]);
            		$('.panel-content').hide();
            		cont.slideToggle("fast");
                }
            }
		}())
    });
}(jQuery, window, document));

$(document).ready(function(){
	Intuit.Utils.Accordion.init();
    $('#accordion').on('hidden.bs.collapse', function(e){
        Intuit.Utils.Accordion.toggleChevron(e);
    });
	$('#accordion').on('shown.bs.collapse', function(e){
        Intuit.Utils.Accordion.toggleChevron(e);
        Intuit.Utils.Accordion.swapContent(e);
    });
});

(function($, window, document, undefined){
    $.extend(Intuit.Utils, {
        Anim: {
			swapEelements: (function() {
				var $primaryElem, $primaryParent, $swapElem, eTop, eLeft, nTop, nLeft, nWidth; //need new name scheme

                return {
                    init: function(primaryElem, swapElem) {
						/* all this crap needs refactoring and done right for v2 */
                        swapElem.hide();

				        $primaryElem = primaryElem;
						$primaryParent = $primaryElem.parent();
						$swapElem = swapElem;

						nTop = $primaryElem.position().top;
						nLeft = $primaryElem.position().left;
						nWidth = $primaryElem.outerWidth();

						pParentWidth = $primaryParent.outerWidth();

						this.correctElemWidth($primaryElem);
						$primaryElem.show();

						this.correctElemWidth($swapElem);
						this.positionAltElem($swapElem);

						eTop = $swapElem.position().top;
						eLeft = $swapElem.position().left;
						eWidth = $swapElem.outerWidth();
                    },
                    correctElemWidth: function(elem) {
                        elem.css("width", $primaryParent.innerWidth() - (elem.outerWidth() - elem.innerWidth()));
                    },

                    positionAltElem: function(elem) {
                        elem.css({ "position" : "relative","top" : $primaryElem.position().top+"px"});
                    }

                }

			}())
		}
	});
}(jQuery, window, document));
(function ($) {

  $.tabs = function (el, options) {

    function find_tabcontent_id(thelist, class_type, method) {
      //var listToken = thelist.find(class_type).not(".tab-icons").html().replace('&amp;', '&').replace('<br>', '').replace('<br/>', '').split(/[\s,&_-]+/);
      // allow 'method' arg, defaults to 'text()' in jquery wrapper
      var meth = (method && method.toLowerCase() == 'text')? 'text' : 'html';
      var listToken = thelist.find(class_type).not(".tab-icons")[meth]();
      listToken = listToken.replace('&amp;', '');
      listToken = listToken.split(/[\s,&_-]+/);
      return (listToken instanceof Array) ? listToken.join("-").toLowerCase() : listToken;
    }

    function format_tabcontent_id(id) {
      return '[id="' + id + '"]';
    }

    var base = this;
    var $tabNavAndContent = $(el);                              //div.responsive_tabs
    var $tabTopNav = $tabNavAndContent.find("ul.tabs");        //div.responsive_tabs ul.tabs
    var $tabContent = $tabNavAndContent.find(".content-block"); //div.content-block - dynamically added div.resp-midtab-title
    //old harmony_cms gem is using class 'content-bloc' when displaying tabs, instead of 'content-block'
    if ($tabContent.length < 1) {
      $tabContent = $tabNavAndContent.find(".content-bloc");
    }
    var $tabMidNav;                                             //div.content-block > .resp-midtab-title
    var currenActiveTabContentId;
    var $activeMidTab = null;

    base.init = function () {
      base.options = $.extend({}, $.tabs.defaultOptions, options);
      $tabTopNav.addClass(base.options.tabtype);

      // Save active Tab
      currenActiveTabContentId = find_tabcontent_id($tabTopNav, "li.active p");

      if(!$tabNavAndContent.find(format_tabcontent_id(currenActiveTabContentId)).length) {
        currenActiveTabContentId = find_tabcontent_id($tabTopNav, "li.active p", 'text');
      }

      //add resp-toptab-title class to all tabs
      $tabTopNav.find(' > li').addClass('resp-toptab-title');

      // Only for Responsive Tabs, duplicate title headers right  above each .content-block > ul
      if (base.options.tabtype == "resp_tabs") {
        $tabContent.find(' > ul').before("<div class='resp-midtab-title' role='tab'><span class='chevron-r-icon-8x12'></span></div>");
        var icount = 0;
        $tabNavAndContent.find('.resp-midtab-title').each(function () {
          $(this).attr('aria-controls_tab_item-' + (icount));

          var $tabTopItem = $tabNavAndContent.find('.resp-toptab-title:eq(' + icount + ')');  //ul.tabs li.resp-toptab-title
          var $tabMidItem = $tabNavAndContent.find('.resp-midtab-title:eq(' + icount + ')');  //.content-block div.resp-midtab-title
          $tabMidItem.append($tabTopItem.html());
          $tabMidItem.data($tabTopItem.data());
          if ($tabTopItem.hasClass("active")) {
            $tabMidItem.addClass("active")
          }
          icount++;
          $tabMidItem.attr("id", "mtab_" + icount);
          //console.log(" added: " + $tabItem.html())
        }); //each
      }

      // Save this for next use
      $tabMidNav = $tabContent;

      // Respond to click on '.resp-toptab-title' and '.resp-midtab-title'items
      $tabNavAndContent.delegate(".resp-toptab-title, .resp-midtab-title", "click", function () {
        // get new tab-content id to become active
        var $newActiveTab = $(this),
            newtabContentId = find_tabcontent_id($newActiveTab, ".ctext p"),
            tab_id,
            tabIndex;

        if(!$tabContent.find(format_tabcontent_id(newtabContentId)).length) {
          newtabContentId = find_tabcontent_id($newActiveTab, ".ctext p", 'text');
        }

        //mobile-size ONLY we can hide/show same TabContent
        var isMobileSize = window.innerWidth < 767;
        if (isMobileSize && (newtabContentId == currenActiveTabContentId)) {
          var $currentTabContent = $tabContent.find(format_tabcontent_id(currenActiveTabContentId));
          if ($newActiveTab.hasClass("active")) {

            // Remove highlighting from midNav
            $activeMidTab = $tabMidNav.find(".resp-midtab-title.active");
            $activeMidTab.removeClass("active");
            $currentTabContent.slideUp('fast');
          }
          else {
            $activeMidTab = null;
            // Add highlighting to topNav
            tab_id = $newActiveTab.attr("id"); tabIndex = tab_id[tab_id.length - 1] - 1;
            // Add highlighting to midNav
            $tabMidNav.find('.resp-midtab-title:eq(' + tabIndex + ')').addClass('active');
            $currentTabContent.slideDown();
          }
        }

        //hide/show TabContent  - only one active at a time
        if (newtabContentId != currenActiveTabContentId) {

          //Removing opacity and position properties if already present.
          $tabNavAndContent.find(format_tabcontent_id(newtabContentId)).css("opacity", "").css("position", "");

          if (!isMobileSize) {
            // Fade out current content
            $tabContent.find(format_tabcontent_id(currenActiveTabContentId)).fadeOut(base.options.speed, function () {
              var selTabContent = $tabContent.find(format_tabcontent_id(newtabContentId));
              // fade-in new content on callback
              selTabContent.fadeIn(base.options.speed);

              if ($newActiveTab.hasClass('resp-midtab-title')) {
                if (!isMobileSize) {
                  $tabMidNav.find('.resp-midtab-title:eq(' + tabIndex + ')').ScrollTo();
                }
              }
              // var newHeight = $tabNavAndContent.find("#" + newtabContentId).height();
              // $tabContent.animate({height: newHeight + 20 });

            });//find
          }
          else {
            $tabContent.find(format_tabcontent_id(currenActiveTabContentId)).slideUp('fast', function(){
              $tabContent.find(format_tabcontent_id(newtabContentId)).slideDown();
            });
          }

          // Remove highlighting from topNav
          $tabTopNav.find(".resp-toptab-title.active").removeClass("active");
          // Remove highlighting from midNav
          $tabMidNav.find(".resp-midtab-title.active").removeClass("active");

          // Add highlighting to topNav
          tab_id = $newActiveTab.attr("id");
          tabIndex = tab_id[tab_id.length - 1] - 1;
          $tabTopNav.find('.resp-toptab-title:eq(' + tabIndex + ')').addClass('active');
          // Add highlighting to midNav
          $tabMidNav.find('.resp-midtab-title:eq(' + tabIndex + ')').addClass('active');

          // Save new activeTab
          currenActiveTabContentId = newtabContentId;
        }//new!=old

        // Don't behave like a regular link
        // Stop propagation and bubbling
        //return false; mstraka 7/30/12 commenting this return false out so that SiteCatalyst link tracking can work
        $(document).trigger('tabActive', [$tabContent.find(format_tabcontent_id(currenActiveTabContentId))]);
      }); //delegate-click

      // add some missing classes.  Would do it in Ruby but it's too much of a hassle (note: JSP has been updated to add the classes)
      $('.cfeatures-tabbed.responsive_tabs ul.row.tabs.resp_tabs').addClass('no-inner-gutters');
      $('.cfeatures-tabbed.responsive_tabs > .content-block').addClass('responsive_tabs');

    };//init


    // if resizing to desktop, but a tab was hidden in mobile-size, then show the corresponding tab content.
    $(window).resize(function () {
      if ((window.innerWidth >= 768) && $activeMidTab != null) {
        // Add highlighting to midNav (mobile Nav)
        $activeMidTab.addClass('active');
        $tabContent.find(format_tabcontent_id(currenActiveTabContentId)).fadeIn(0);
        $(document).trigger('tabActive', [$tabContent.find(format_tabcontent_id(currenActiveTabContentId))]);
        //Reset variable to null
        $activeMidTab = null;
      }
    });


    // Initialize
    base.init();

  };

  // Options
  $.tabs.defaultOptions = {
    "speed": 100,
    "tabtype": "std-tabs"
  };

  //Function: instatiate
  $.fn.tabs = function (options) {
    return this.each(function () {
      (new $.tabs(this, options));
    });
  };

})(jQuery);


(function($, window, document, undefined){

    $.extend(Intuit.Utils, {
        DynamicData: (function() {
            var process, dynamicPricing;

            dynamicPricing = function(obj) {
                var $toProcess = $('.dynamic-pricing');

                function formatWholeAmount(val) {
                    return '<span class="aw">'+val+'</span>';
                }

                function formatCentsAmount(val) {
                    return '<span class="ac">'+val+'</span>';
                }

                function formatSeparator(val) {
                    return '<span class="as">'+val+'</span>';
                }

                function formatCurrency(val) {
                    return '<span class="ct">'+val+'</span>';
                }

                function formatPrice(obj) {
                    var outputSalePrice = [],
                        outputRegPrice = [];
                    var salePrice = obj['salePrice'],
                        regPrice = obj['regPrice'],
                        currency = obj['currency'],
                        separator = obj['separator'];

                    var tokensSalePrice = salePrice.split(separator),
                        tokensRegPrice = regPrice.split(separator);

                    outputSalePrice.push(formatCurrency(currency));
                    outputSalePrice.push(formatWholeAmount(tokensSalePrice[0]));
                    outputSalePrice.push(formatSeparator(separator));
                    outputSalePrice.push(formatCentsAmount(tokensSalePrice[1] ? tokensSalePrice[1] : '00'));

                    return {
                        'salePrice' : outputSalePrice.join(''),
                        'regPrice' : outputRegPrice.join('')
                    }
                }

                $.each($toProcess, function(){
                    var $this = $(this), config;
                    if (obj && (config = obj[$this.attr('data-pricing-id')])) {
                        $this.html(formatPrice(config)['salePrice']).removeClass('dynamic-pricing').addClass('price');
                    } else {
                        $this.html('***').removeClass('dynamic-pricing').addClass('price');
                    }
                });
            };

            process = function(obj) {
                $.each(obj, function(key, value){
                    switch(key) {
                        case 'dynamic_pricing':
                            dynamicPricing(value);
                            break;
                    }
                });
            };

            return {
                process: function() {
                    typeof window._aggregate_data !== 'undefined' && process(window._aggregate_data)
                }
            }
        }()),
        LivePerson: (function(){
            var processed;
            return {
                processIds: function() {
                    var $this;
                    processed = [];
                    $('span.lvp-link').each(function(){
                        $this = $(this);
                        processed.push($this.attr('data-lp-id'));
                        $this.replaceWith($('<div></div>').addClass($this.attr('class')).attr('id', $this.attr('data-lp-id')).html($this.html()));
                    });
                },
                postProcessIds: function() {
                    this.processIds();
                    var i, pid, name, current = {};
                    if (typeof lpMTagConfig !== 'undefined' && lpMTagConfig.dynButton) {
                        var dynButtonSize = lpMTagConfig.dynButton.length;
                        for (i = 0; i < dynButtonSize; i++) {
                            current[lpMTagConfig.dynButton[i].pid] = true;
                        }
                        for (i in processed) {
                            pid = processed[i];
                            name = pid.replace('lpButton_','');
                            lpMTagConfig && lpMTagConfig.dynButton && !current[pid] && lpMTagConfig.dynButton.push({
                                afterStartPage: true,
                                name: name,
                                ovr: 'lpMTagConfig.db1',
                                pid: pid
                            });
                        }
                        lpMTag && lpMTag.lpSetPage();
                    }
                }
            }
        }())
    });

}(jQuery, window, document));

$(function(){
    //Intuit.Utils.DynamicData.process();
    Intuit.Utils.LivePerson.processIds();
    Intuit.$window.on('modal:open', function(){
        Intuit.Utils.LivePerson.postProcessIds();
    });
});
$(window).load(function () {
    var tabNav = $(".ctabs"),
        navTop,
        height,
        threshold = 300,
        contentDivs = [],
        stickyBar = ($('.ctabs-headings').length > 0) ? $('.ctabs-headings') : false ;

    if (tabNav.length === 0) return; 

    if(stickyBar){
    	navTop = stickyBar.offset().top,
    	height = stickyBar.height() + 45;
        $('.outer-container > .ccontainer:first-child').css('padding-bottom','140px');

    $('.ccontainer>h2:first-child').each(function(index){
    	contentDivs.push($($('.ccontainer>h2:first-child')[index]).offset().top - height);
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > navTop) {
            stickyBar.addClass('fixed');
        } else {
            stickyBar.removeClass("fixed");
        }

        var winTop = $(window).scrollTop();
          $.each( contentDivs, function(i,loc){
           if  (winTop > loc - threshold && winTop < loc + threshold ){
            $('.ctabs li')
             .removeClass('active')
             .eq(i).addClass('active');
           }
          });
    });

    tabNav.on('click', 'ul li', function (e) {
        e.preventDefault();
        var $this = $(this),
            newId = parseInt($(this).attr('id').split('_')[1], 10),
            goTo = $('.ccontainer>h2:first-child'),
            to = $(goTo[newId-1]).offset().top - height;
        $this.parent().find('li.active').removeClass('active');
        $this.toggleClass('active');
        $('html,body').animate({scrollTop:to}, 800);
    });
    }
});

$(document).ready(function() {
    if ($("#features.responsive_tabs").length>0){
	  $("#features.responsive_tabs").tabs( {"tabtype" : "resp_tabs"} ); 
    }
    else {
      $(".cfeatures-tabbed").tabs();
    }
});

(function($, window, document, undefined){
    $.extend(Intuit.Utils, {
        Flash: (function(){
            return {
                playFlash: function(){
                    var flash_container = $(".flash-container");
                        flash_container.each(function(i, val) { 
                         if ($(this).find(".cflash").hasClass("hide")){
                                $(this).find(".flash-preview") ? $(this).find(".flash-preview").addClass("hide") : "";
                                $(this).find(".cflash").removeClass("hide").addClass("show");
                        }
                    });
                },
                resizeFlash: function(){
					var media_array = ['.cmodal-page .cflash embed', '.cmodal-page .cvideo'];
                    $.each( media_array, function( index, value ){
                        if($(value).length > 0){
                            var width = $(value).width(),
                                media_object = ".cmodal-page " + value,
                                simplemodal_container = $(value).parents('.simplemodal-container');
                            simplemodal_container.css("width",width+50); 
                            $('.cmodal-page').css("width",width+50);
                            $('.cmodal-page').css("height", "auto");
                            $('.cmodal-page').css("padding", "53px 0 20px");
                        }
                    });
                }
            }
		}())
    });
}(jQuery, window, document));

$(document).ready(function(){
	$("#play-icon").click(function(){
		Intuit.Utils.Flash.playFlash();
     });
    $(window).on('flash:resize', function(){
        Intuit.Utils.Flash.resizeFlash();
        $("#play-icon").click(function(){
			Intuit.Utils.Flash.playFlash();
     	});
    });
});
$(window).on('modal:media', function(){
});


$(document).ready( function() {
	$("#footer-legal-copyright-year").html((new Date).getFullYear());
});
// Validate Email ID
function validateEmail(emailval){
    var reg = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return reg.test(emailval);
}
( function ($, window, document, undefined) {
  //Return check to not load email_capture_util.js if available already
  var $window = Intuit.$window;
  if (typeof Intuit.Utils.EmailCapture === 'object') {
    return;
  }
  $.extend(
    Intuit.Utils,
    {
      EmailCapture: ( function () {
        function doneCallback () {
          $(".email-form" ).hide();
          $(".email-success" ).removeClass("hide");
          $(".email-error" ).addClass("hide");
        }

        function addAuthCallback (xhr) {
          var key = Intuit.Utils.Constants.SBGMAuthKey
          xhr.setRequestHeader(
            'Authorization',
            key
          );
        }

        function submitCallback (event) {
          var emailAddress = $("#email-capture .email-text").attr('value');
          var emailUrl = Intuit.Utils.Constants.SBGMServiceUrl + "/v1/email/"
          event.preventDefault();
          //TODO: use this for email-capture
          //TODO: use validation privately here
          if (!validateEmail(emailAddress)) {
            $(".email-error" ).removeClass("hide");
            return;
          }
          //TODO: Give this path in dialog.
          //TODO: check latest onsuccess and error.
          $.ajax({
            type: "POST",
            url: emailUrl,
            dataType: 'json',
            data: {
              email: emailAddress
            },
            beforeSend: addAuthCallback,
            success: doneCallback,
            error: doneCallback
          })
        }

        function bindEmailSubmitButton(){
          //TODO: Don't use ID,instead use instance .
          $("#email-capture").submit(submitCallback);
        }

        $.wload(bindEmailSubmitButton);
        return {
            init: function() {
              bindEmailSubmitButton();
              return this;
            }
          }
        }())
      });
}(jQuery, window, document));

(function($, window, document, undefined){

    $.extend(Intuit.Library, {
        Cookie: (function(){
            return {

                //returns cookie value paired with 'name'
                getCookie: function(name) {
					if (document.cookie.length > 0) {
        				start_index = document.cookie.indexOf(name + "=");
				        if (start_index != -1) {
				            val_index = start_index + name.length + 1;      //   "user=michelle;id=123;type=new"
				            end_index = document.cookie.indexOf(";", val_index);
				            if (end_index == -1) end_index = document.cookie.length;
    		        			return decodeURIComponent(document.cookie.substring(val_index,end_index));
        				}
		    		}
			    	return "";
            	},


				// expects date to be in UTC format: new Date().toUTCString(). date is optional arg.
				// value has to be encoded to remove spaces, commas, and semicolons.
				// value can be "" for removeCookie().
                setCookie: function(cookieName) {
					if (name !== "") {
     				   document.cookie = name + "=" + encodeURIComponent(value) + ((date === null) ? "" : "; expires=" + date);
					}
                }, 


				//set expiration date to be in the past
                removeCookie: function(cookieName) {
                    var exp_date = (new Date().getTime()) - 1;
    				setCookie(name, "", exp_date.toUTCString());
                },

                getUUID: function() {
					return this.getCookie('sbm_intuit_id');
                }
            }
        }()) 
    });


}(jQuery, window, document));

(function($, undefined){
	$.extend(Intuit.Utils, {
        ProductSelector: (function() {
        	var mask=[], activeTab = 3, firstClick = true;
        	var blocks = $('.cproduct-selector .product-block');
        	var buildMask = function() {
        		//console.log($('.cproduct-selector .product-block').length);
        		$('.cproduct-selector .product-block').each(function(index) {
        			//console.log(index);
        			//console.log($(this).attr('data-mask'));
        			var list = $(this).attr('data-mask').split('-');
        			$(list).each(function(index) {
        				list[index] = parseInt(list[index]);
        			});
        			mask.push(list);
        		});
        	};
        	 
            $.wload(function() {
            	buildMask();
                $('.cproduct-selector .options-form input:checkbox').attr('checked',false);
            	// 
            });

        	$('.cproduct-selector .cta-show').live('click', function(e) {
        		//console.log('show');
        		
        		$(this).addClass('hide');
        		firstClick = false;
        		$('.cproduct-selector .options-form').trigger('click');
        		e.stopPropagation();
        		
        	});
        	$('.cproduct-selector .options-form').live('click', function(e) {
        		
        		if (firstClick) return;
        		
        		//console.log(mask);
        		//getActiveTab();
        		$('.cproduct-selector .cta-show').addClass('hide');
        		var checked = [], activeTab = 0, i, j;
        		$('.cproduct-selector .options-form input').each(function() {
        			if ($(this).prop("checked")) {
        				checked.push(1);
        			} else {
        				checked.push(0);
        			}
        		});
        		//console.log(checked);
        		
        		// todo: use initial default as default for activeTab
        	
        		for(i = mask.length - 1; i >=0; i--) {
        			var flag = 1, m = mask[i], count = 0, countMask = 0;
        			
        			for (j = 0; j < checked.length; j++) {
        				count += m[j] & checked[j];
        				if (m[j]) countMask += 1;
        			}
        			if (count == countMask) {
        				activeTab = i;
        				break;
        			}
        		}
        		//console.log('activeTab = ' + activeTab);
        		// turn on active tab
        		var blocks = $('.cproduct-selector .product-block');
        		blocks.removeClass('default').removeClass('active');
        		blocks.each(function(index) {
        			if (index == activeTab) {
        				$(this).addClass('active');
        			}
        		});
        		
        	});
        })()
	});


}(jQuery));

$(document).ready(function () {
	var pageURL = location.pathname;
    // Script for the changing the header phone number for payments pages 
	if( pageURL.match("/point-of-sale") || pageURL.match("/point-of-sale-compare") ) {
		Intuit.Utils.Standard.modifyDomElement(".top-bar-container .nav-links .phone-info .change-text > a", '<span class="phone-tiny link-icon"></span>(800) 460-1494<span class="info-icon"></span>');
	}
	// Script for hiding /month for the payments pages
	if( pageURL.match("/point-of-sale-compare") ) {
		Intuit.Utils.Standard.modifyDomElement(".ccomp-table-yoy-header p.per-month", '');
	}

});



(function($, undefined){
    $.extend(Intuit.Utils, {
        Wizard: (function() {
            var stack=[],cName = '',targetUrls=[];

            $( document ).ready(function() {
                init();
            });



            function init(){
                stack=[],cName = '',targetUrls=[];

                $('body').on('click', '.wizard .ccta a:not(.ctaprimary)',function(e) {

                    if($(this).attr('href').length <= 0 || $(this).attr('href') == '#') return;
                    if($(this).attr('id'))stack.push($(this).attr('id'));
                    if($(this).attr('data-cta-wizard-link'))targetUrls.push($(this).attr('data-cta-wizard-link'));
                    if(cName){
                        if(typeof $($('.wizard')[0]).attr('dirty') == 'undefined' ){
                            $(this).parents('.wizard').attr('dirty','true');
                            $(this).parents('.container-block').hide();

                        }
                        else{

                            $(this).parents('.wizard').find(cName).parents('.container-block').hide();
                        }

                    }
                    else{
                        $(this).parents('.container-block').hide();
                    }

                    cName = $(this).attr('href');

                    if(cName.toLowerCase() == '#previous')
                        cName = '#'+stack[stack.length-1];
                    $(this).parents('.wizard').find(cName).parents('.container-block').show();

                    e.preventDefault();



                });
            }
            return {
                history:function(){return stack;},
                clear:function(){cName = '';stack=[];},
                getTargetUrls:function(){return targetUrls;},
                init:function(){return init;}
            }

        })()
    });
}(jQuery,window,document))
/**
 * Add a parameters to IN SUI URL.
 */
$.extend({
 getUrlVars: function(){
   var vars = [], hash;
   var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
   for(var i = 0; i < hashes.length; i++)
   {
     hash = hashes[i].split('=');
     vars.push(hash[0]);
     vars[hash[0]] = hash[1];
   }
   return vars;
 },
 getUrlVar: function(name){
   return $.getUrlVars()[name];
 }
});

var partner_uid_val="";

if($.getUrlVar('partner_uid')){
    partner_uid_val = $.getUrlVar('partner_uid');
    
}
if($.getUrlVar('PARTNER_UID')){
    partner_uid_val = $.getUrlVar('PARTNER_UID');
    
}

$(document).ready(function(){
  //var qb_sui_links = $("#qb_in_sui_1,#qb_in_sui_2,#qb_in_sui_3,#qb_in_sui_4,#qb_in_sui_5,#qb_in_sui_6");
  //var qb_sui_links = $("a[href*='/qbindia.intuit.com/qbosui/pages/createaccount.jsp?SKU_TYPE=INP-FRE']");
  //var qb_sui_links = $("a[href*='/qbindia.intuit.com/qbosui/pages/createaccount_directbuy.jsp?SKU_TYPE=INP-FRE']");

   var qb_sui_links = $("a[href*='qbindia.intuit.com/qbosui/pages/createaccount']");
   qb_sui_links.click(function(event){
   
   //if (event.ctrlKey || event.shiftKey || event.metaKey || event.which == 2) {
        
      generateURL( this );
   //}
  })
   qb_sui_links.on("mousedown",function(event){
      if (event.which == 1 || event.which == 2 || event.which == 3) {
            generateURL( this );
            
        }
     }) 
   var qb_sui_br_links = $("a[href*='global.intuit.com/quickbooks/pt/br/']");
   qb_sui_br_links.click(function(event){
   //if (event.ctrlKey || event.shiftKey || event.metaKey || event.which == 2) {
        
      generateURL( this );
   //}
   })
   qb_sui_br_links.on("mousedown",function(event){
      if (event.which == 1 || event.which == 2 || event.which == 3) {
            generateURL( this );
            
        }
     })      
   var bindClickevents = setTimeout(function()
   {
                                                  
     var qb_sui_au_links = $("a[href*='/quickbooks-online/sui/']");
     qb_sui_au_links.on("click",function(event){
     
     //if (event.ctrlKey || event.shiftKey || event.metaKey || event.which == 2) {
          generateSUIURL( this );
     //}
      })
     qb_sui_au_links.on("mousedown",function(event){
      if (event.which == 1 || event.which == 2 || event.which == 3) {
            generateSUIURL( this );
            
        }
     })  
     var qb_sui_all_other_links = $("a[href*='/signup/']");
     qb_sui_all_other_links.on("click",function(event){
     //if (event.ctrlKey || event.shiftKey || event.metaKey || event.which == 2) {
          generateSUIURL( this );
     //}
     })
     qb_sui_all_other_links.on("mousedown",function(event){
      if (event.which == 1 || event.which == 2 || event.which == 3) {
            generateSUIURL( this );
            
        }
     })             
     var qb_sui_ca_fr_links = $("a[href*='/signer/']");
     qb_sui_ca_fr_links.on("click",function(event){
     //if (event.ctrlKey || event.shiftKey || event.metaKey || event.which == 2) {
          generateSUIURL( this );
      //}
     })
     qb_sui_ca_fr_links.on("mousedown",function(event){
      if (event.which == 1 || event.which == 2 || event.which == 3) {
            generateSUIURL( this );
            
        }
     })             
     /*
     var qb_sui_BR_zero_links = $("a[href*='zeropaper.com.br/subscribe']");
     qb_sui_BR_zero_links.on("click",function(event){
     
          generateSUIURL( this );
     
     })
     qb_sui_BR_zero_links.on("mousedown",function(event){
      if (event.which == 1 || event.which == 2 || event.which == 3) {
            generateSUIURL( this );
            
        }
     })
                  
     var qb_sui_BR_zero_links1 = $("a[href*='zeropaper.com.br/sign_up']");
     qb_sui_BR_zero_links1.on("click",function(event){
     
          generateSUIURL( this );
     
     })
     qb_sui_BR_zero_links1.on("mousedown",function(event){
      if (event.which == 1 || event.which == 2 || event.which == 3) {
            generateSUIURL( this );
            
        }
     })
     */
     var qbo_sui_online_link = $("a[href*='qbo.intuit.com']");
     
     qbo_sui_online_link.on("click",function(event){
      //if (event.ctrlKey || event.shiftKey || event.metaKey || event.which == 2) {
            generateSUIURL( this );
            
        //}
     })
     qbo_sui_online_link.on("mousedown",function(event){
      if (event.which == 1 || event.which == 2 || event.which == 3) {
            generateSUIURL( this );
            
        }
     })
   },100);
})


/**
 * Attempt to read a Cookie value from the current Domain.
 * Will return an empty string if the Cookie value cannot be determined.
 */
function getCookieValueSUI(key) {
    currentcookie = document.cookie;
    if (currentcookie.length > 0) {
        firstidx = currentcookie.indexOf(key + "=");
        if (firstidx != -1) {
            firstidx = firstidx + key.length + 1;
            lastidx = currentcookie.indexOf(";", firstidx);
            if (lastidx == -1) {
                lastidx = currentcookie.length;
            }
            return unescape(currentcookie.substring(firstidx, lastidx));
        }
    }
    return "";
}
/**
 * Attempt to get the name of the SC Cookie going by the Domain.
 * Will return an empty string if the Cookie cannot be determined.
 */
function getscTrackingCookie(){
  var gscTrackingVal = "";
  var pageURL = window.location.href;
  var SWCOOKIE_LOCAL_NAME = "qbn.ptc.sbm_global_channel_cookie";
  var SWCOOKIE_TEST_NAME = "qbn.sbm_global_sc_channel_test";
  var SWCOOKIE_PROD_NAME = "qbn.sbm_global_sc_channel";
  if(pageURL.indexOf("localvm.")!= -1){
     gscTrackingVal=getCookieValueSUI(SWCOOKIE_LOCAL_NAME);
  }else if(pageURL.indexOf("test.")!= -1 ){
     gscTrackingVal=getCookieValueSUI(SWCOOKIE_TEST_NAME);
  }else{
     gscTrackingVal=getCookieValueSUI(SWCOOKIE_PROD_NAME);
  }
  return gscTrackingVal;
}

function generateURL( this_item ){
  var sc_cookie_val = getscTrackingCookie();
  var href_url = this_item.href.split("&sc_cookie=");
  href_url = href_url[0];
  var new_url = href_url.concat("&sc_cookie=",sc_cookie_val);
  if(partner_uid_val!=""){
    var updated_sui_url = new_url.concat("&partner_uid=",partner_uid_val);
    this_item.href = updated_sui_url
  }else{
    this_item.href = new_url
  }
  
}

// function generateLpURL(docID){
//   var sc_cookie_val = getscTrackingCookie();
//   var prefix_URL= document.getElementById(docID).href;
//   var button_URL= prefix_URL.concat("&sc_cookie=",sc_cookie_val);
//   //var prefix_buy_now_URL = "http://test.qbindia.intuit.com/qbosui/pages/createaccount_directbuy.jsp?SKU_TYPE=INP-FRE";
//  //var buyNow_URL = prefix_buy_now_URL.concat("&sc_cookie=",sc_cookie_val);
//   window.open(button_URL);
// }


function get_hostname(url) {
    var m = url.match(/^https:\/\/[^/]+/);
    return m ? m[0] : null;
}

function domain_change(domain_name){
if(window.location.href.indexOf('qa.')> -1){
 switch(domain_name){
 
   case 'https://www.intuit.com.au':
   domain= "https://qa.sr.intuit.com.au";
   break;
   
   case 'https://quickbooks.intuit.ca':
   domain= "https://qa.sr.quickbooks.intuit.ca";
   break;
   
   case 'https://www.intuit.co.uk':
   domain= "https://qa.quickbooks.co.uk";
   break;
   
   case 'https://quickbooksenligne.intuit.ca':
   domain= "https://qa.quickbooksenligne.intuit.ca";
   break;
   
   case 'https://quickbooks.intuit.fr':
   domain= "https://qa.quickbooks.intuit.fr";
   break;
   
 
 }
 }else{
   domain = domain_name;
 }
 return domain;
}

//Below Function to Read the QueryString from URL
function generateSUIURL( this_item ){
    
    var href_url = this_item.href.split("&partner_uid=");
    href_url = href_url[0];
    //var domain_name = get_hostname(href_url);
    //if(domain_name.indexOf('com.au') > -1 || domain_name.indexOf('co.uk')> -1 || domain_name.indexOf('intuit.ca') > -1 || domain_name.indexOf('intuit.fr') > -1){
     // var domain_new_name = domain_change(domain_name);
     // var uri_part = href_url.split(domain_name);
    //  var updated_href_url = domain_new_name + uri_part[1];
      
    //  if(partner_uid_val!=""){
   //       var new_url= updated_href_url.concat("&partner_uid=",partner_uid_val);
    //      this_item.href = new_url
    //  }
   // }else {
      if(partner_uid_val!=""){
          var new_url= href_url.concat("&partner_uid=",partner_uid_val);
          this_item.href = new_url
      }
    //}
}

$(window).load(function(){
  var suiurlinmodal = setInterval(function(){
   $("body").find('.simplemodal-container').find('[href]').each(function()
   {
      //console.log('Interval started for Modal');
      //if(($(this).attr('href').indexOf('?bc=') > -1) || ($(this).attr('href').indexOf('&bc=') > -1))
      if(($(this).attr('href').indexOf('qbindia.intuit.com/qbosui/pages/createaccount') > -1) ||
        ($(this).attr('href').indexOf('global.intuit.com/quickbooks/pt/br/') > -1) ||
        ($(this).attr('href').indexOf('/quickbooks-online/sui/') > -1) ||
        ($(this).attr('href').indexOf('/signup/') > -1) ||
        ($(this).attr('href').indexOf('/signer/') > -1) ||
        ($(this).attr('href').indexOf('zeropaper.com.br/subscribe') > -1) ||
        ($(this).attr('href').indexOf('zeropaper.com.br/sign_up') > -1) ||
        ($(this).attr('href').indexOf('qbo.intuit.com') > -1))
        {
          if($(this).attr('href').indexOf('partner_uid') == -1)
          {
            var oldmodalsuiurl = $(this).attr('href');
            if(partner_uid_val!=""){
                //var domain_name = get_hostname(oldmodalsuiurl);
                //if(domain_name.indexOf('com.au') > -1 || domain_name.indexOf('co.uk')> -1 || domain_name.indexOf('intuit.ca') > -1 || domain_name.indexOf('intuit.fr') > -1){
                  //var domain_new_name = domain_change(domain_name);
                 // var uri_part = oldmodalsuiurl.split(domain_name);
               //   var updated_href_url = domain_new_name + uri_part[1];
                
                //oldmodalsuiurl = updated_href_url + "&partner_uid=" + partner_uid_val;
                //$(this).attr({'href': oldmodalsuiurl});
              //}else{
                oldmodalsuiurl = oldmodalsuiurl + "&partner_uid=" + partner_uid_val;
                $(this).attr({'href': oldmodalsuiurl}); 
              
              //}
            }
          }
        }
   });
  },50)
});
