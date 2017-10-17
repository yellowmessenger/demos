"use strict";

var myApp = myApp || {};
(function (namespace) {
    namespace = namespace || {};

    var HttpInterceptor = function (args) {
        this.options = args;
    }

    namespace.HttpInterceptor = HttpInterceptor;
    var getRequestHeaders = function (customHeaders) {
        var options = {
            'Content-Type': 'application/json',
            'authtoken': CookieHandler.GetCookie('JWToken'),
            'guardtoken': CookieHandler.GetCookie('GuardToken')
        };

        return customHeaders ? $.extend({}, options, customHeaders, true) : options;
    };

    var makeAjaxCall = function (requestUrl,
        requestData,
        requestType,
        args,
        onSuccess,
        onError) {
        let headObj = getRequestHeaders(args);

        $.ajax({
            url: requestUrl,
            type: requestType,
            contentType: 'application/json',
            data: requestData ? JSON.stringify(requestData) : null,
            headers: headObj,
            success: function (response, status) {
                console.log("Success!!");
                console.log(response);
                console.log(status);
                $.isFunction(onSuccess) && onSuccess(response);
            },
            error: function (xhr, desc, err) {
                console.log(xhr);
                console.log("Desc: " + desc + "\nErr:" + err);
                $.isFunction(onError) && onError(err);
            }
        });
    };

    var proto = HttpInterceptor.prototype;

    proto.Post = function (url, data, args, onSuccess, onError) {
        makeAjaxCall(url, data, 'POST', args, onSuccess, onError);
    }

    proto.Get = function (url, data, args, onSuccess, onError) {
        makeAjaxCall(url, data, 'GET', args, onSuccess, onError);
    }


})(myApp);

var httpInterceptor = new myApp.HttpInterceptor();

(function (namespace) {

    var convertGuradKeyToGuardToken = function (guardKey) {
        const salt = "B!&1j";
        var timeStamp = new Date().getTime();

        var token = salt.concat('|', timeStamp.toString(), '|', guardKey);

        return btoa(token);
    }

    var setSystemAuthToken = function (secretKey, clientId) {
        var request = {
            secretKey: secretKey,
            clientId: clientId
        };
        var options = {
            'platform': 'desk'
        };

        //httpInterceptor.Post("https://ydp7mvreug.execute-api.ap-southeast-1.amazonaws.com/NpDevVer02/v1/logins/ui",
        httpInterceptor.Post("https://apis.qa.bfsgodirect.com/v1/logins/ui",
            request,
            options,
            function (response) {
                var responseData = response;

                if (!responseData.errorBean) {
                    CookieHandler.SetCookie('JWToken', responseData.payload.tokens[0].token);
                    CookieHandler.SetCookie('GuardToken', convertGuradKeyToGuardToken(responseData.payload.tokens[0].guardKey));
                }
            }, null);
    }

    var setSecretKeyForClientId = function (clientId) {

        //https://ydp7mvreug.execute-api.ap-southeast-1.amazonaws.com/NpDevVer02/v1/logins/ui/keys/bflclient
        //httpInterceptor.Get("https://ydp7mvreug.execute-api.ap-southeast-1.amazonaws.com/NpDevVer02/v1/logins/ui/keys/" + clientId,
        httpInterceptor.Get("https://apis.qa.bfsgodirect.com/v1/logins/ui/keys/" + clientId,
            null,
            null,
            function (response) {
                var responseData = response;

                if (!responseData.errorBean) {
                    CookieHandler.SetCookie('ClientId', clientId);
                    CookieHandler.SetCookie('SecretKey', responseData.payload.secretKey);
                    setSystemAuthToken(responseData.payload.secretKey, clientId);
                }
            }, null);
    }

    var authenticateSystem = function () {
        var userClientId = 'bflclient';
        setSecretKeyForClientId(userClientId);
    }

    var AuthenticateSystem = function (options) {
        this.options = options;
        authenticateSystem();
    };
    namespace.AuthenticateSystem = AuthenticateSystem;
})(myApp);

var systemAuth = new myApp.AuthenticateSystem();