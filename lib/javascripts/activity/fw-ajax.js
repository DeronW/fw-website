"use strict";

(function () {
    function Ajax(options) {
        var cfg = {
            url: '', // 请求地址
            method: 'GET', // http verb.
            data: {}, // 要提交的数据
            complete: null, // 完成后的回调函数, 需要传入一个方法
            fake: false, //  boolean类型, 默认false, 标记为true时, 表示采用模拟数据, 不会真的调用ajax接口
            fake_delay: 200, // integer类型, 模拟数据返回的延时时间, 单位毫秒
            fake_data: window.FakeData, // 存储模拟数据的变量名, 莫非为全局变量下的 FakeData
            // 处理错误码的方法, 如果返回true, 说明需不需要默认处理方法, 否则依然使用默认错误码处理方式处理一遍
            error_handler: function (code, msg) {
                console.log('got error: ', code, msg);
                return false
            }
        };

        for (var i in cfg) {
            if (cfg.hasOwnProperty(i) && typeof(options[i]) !== 'undefined') cfg[i] = options[i];
        }

        if (cfg.fake) {
            var fakeData = cfg.fake_data || window.FakeData;
            if (!fakeData) throw 'no fake data source, you should define window.FakeData, and insert some data';
            setTimeout(function () {
                var r = fakeData[cfg.url];
                cfg.error_handler(r.code, r.message) && handleErrorCode(r.code, r.message);
                cfg.complete && cfg.complete(r);
            }, cfg.fake_delay || 200);
            return
        }

        var xhr;
        try {
            xhr = new XMLHttpRequest();
        } catch (E) {
            try {
                xhr = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (E) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
            	//alert('ajax status code ' + xhr.status)
                if (xhr.status == 200 || xhr.status == 201) {
                    var r = JSON.parse(xhr.responseText);
                    cfg.error_handler(r.code, r.message) && handleErrorCode(r.code, r.message);
                    cfg.complete && cfg.complete(r);
                } else if (xhr.status == 400) {
                    console.log(JSON.parse(xhr.responseText).error);
                } else if (xhr.status == 401) {
                    console.log('请您先登录');
                } else if (xhr.status == 404) {
                    console.log('API不存在，请确认接口地址正确')
                } else if (xhr.status == 422) {
                    console.log('请求中没有包含CSRF TOKEN')
                } else {
                    if (xhr.status == 0) console.log('got http status: 0');
                    if (xhr.status >= 500) alert('服务器出现问题了，稍后再试');
                }
            }
        };

        if (typeof(cfg.data) == 'object') {
            //data['authenticity_token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content');
            var formData = '';
            for (var i in cfg.data) {
                if (!cfg.data.hasOwnProperty(i)) continue;
                if (cfg.data[i] == null) continue;
                if (formData) formData += '&';
                formData += i + '=' + cfg.data[i];
            }
        } else {
            formData = cfg.data;
        }

        var url = cfg.url;
        if (cfg.method.toUpperCase() == 'GET' && formData) {
            url.indexOf('?') > 0 ? url += '&' + formData : url += '?' + formData
        }
        xhr.open(cfg.method.toUpperCase() == 'GET' ? 'GET' : 'POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(formData);
    }

    function BatchAjax(option_arr, callback) {
        var resp_data = {}, done_count = 0;
        var ajax_cb = function (url, data) {
            resp_data[url] = data;
            done_count++;
            if (done_count == option_arr.length) {
                var d = [];
                for (var j = 0; j < option_arr.length; j++) {
                    d.push(resp_data[option_arr[j].url])
                }
                callback(d)
            }
        };

        option_arr.forEach(function (opt) {
            opt.complete = function (data) {
                ajax_cb(opt.url, data)
            };
            Ajax(opt)
        });
    }

    // 处理通用错误编码, 如果未捕捉到异常编码则抛出异常
    function handleErrorCode(code, msg) {
        msg = msg || "error";
        if (code == 10000 || code == 0) {
            console.log(code);
        } else if(data.code == 63001){
            location.href = 'https://passport.9888.cn/passport/login?sourceSite=jrgc'
        }else {
            if (code > 63000 && code < 63999) {
                consle.log('未处理异常', code, message);
            }
            alert('unknown error code: ' + code + ' with message: ' + msg);
        }
    }

    // set to global
    if (typeof(window.FinancialWorkspace) == 'undefined')
        window.FinancialWorkspace = window.$FW = {};

    window.FinancialWorkspace.Ajax = Ajax;
    window.FinancialWorkspace.BatchAjax = BatchAjax;
})();
