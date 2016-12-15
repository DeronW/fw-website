(function () {
    var Bridge = function () {
        this.bridge = null;
        this.isReady = false;
        this._ready_list = [];
    };
    Bridge.prototype = {
        init: function (bridge) {
            this.bridge = bridge;
            this.isReady = true;
            for (var i = 0; i < this._ready_list.length; i++) {
                this._ready_list[i]();
            }
            this._ready_list = [];
        },
        ready: function (cb) {
            this.isReady ? cb() : this._ready_list.push(cb);
        },
        goto: function (link, need_login) {
            this.bridge.callHandler('nativeCallback', createPackage('goto', link, need_login))
        },
        setTitle: function (title) {
            if (this.isReady) {
                this.bridge.callHandler('nativeCallback', createPackage('set_title', title))
            } else {
                this._ready_list.push(function () {
                    NativeBridge.setTitle(title)
                });
            }
        },
        hideHeader: function () {
            if (this.isReady) {
                this.bridge.callHandler('nativeCallback', createPackage('hide_header'))
            } else {
                this._ready_list.push(NativeBridge.hideHeader);
            }
        },
        showHeader: function () {
            if (this.isReady) {
                this.bridge.callHandler('nativeCallback', createPackage('show_header'))
            } else {
                this._ready_list.push(NativeBridge.showHeader);
            }
        },
        login: function (next_url) {
            if (this.isReady) {
                this.bridge.callHandler('nativeCallback', { action: 'login', value: next_url });
            } else {
                this._ready_list.push(NativeBridge.login);
            }
        },
        gotoMall: function () {
            this.bridge.callHandler('nativeCallback', { action: 'redirectMall' });
        },
        toNative: function (kw) {
            if (this.isReady) {
                this.bridge.callHandler('nativeCallback', { action: 'toNative', value: kw });
            } else {
                console.log('JS Bridge is not ready, can not call "toNative" with', kw)
            }
        },
        close: function () {
            if (this.isReady) {
                this.bridge.callHandler('nativeCallback', { action: 'close' });
            } else {
                this._ready_list.push(NativeBridge.close);
            }
        }
    };

    function createPackage(action, value, need_login) {
        var encode = !!navigator.userAgent.match(/Android/i);
        value = encode ? encodeURI(value) : value;
        return {
            action: action,
            need_login: need_login,
            value: value,
            encode: encode
        }
    }

    window.NativeBridge = new Bridge();
})();

window.onNativeMessageReceive = function (msg) {
    console.log('not define onNativeMessageReceive yet, receive msg: ', msg)
};

(function (callback) {

    // 如果不在app内打开, 不需要加载真实的 js bridge
    if (navigator.userAgent.indexOf('FinancialWorkshop') < 0) return;

    if (window.NativeBridge.bridge) return;

    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        // Android初始化方法
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge)
        }, false);
        // iOS初始化方法
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        } else {
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }
    }
})(function (bridge) {
    // Android need this init function, or could not send message to webview
    // BUT!!!, iOS could not use this, or could not send message to webview

    if (navigator.userAgent.match(/Android/i)) {
        bridge.init(function (message, responseCallback) {
            responseCallback({ 'msg': 'init success' })
        })
    }
    bridge.registerHandler('jsHandler', function (data, responseCallback) {
        alert('receive msg from native: ' + data);
        responseCallback({ 'receive msg from native': "gocha" });
        var resp = window.onNativeMessageReceive(data);
        if (resp) responseCallback(resp);
    });

    NativeBridge.init(bridge);
});
