(function ($) {
    var ERROR_CODES = {
        '63023': '参数格式错误',
        '60000': '程序异常',
        '63011': '活动时间配置错误',
        '63008': '活动尚未开始',
        '63009': '活动已结束',
        '63004': '用户没有权限',
        '63002': '领取异常',
        '63003': '未达到领取条件',
        '63005': '大礼包不存在',
        '63006': '重复提交',
        '63007': '频繁领取',
        '63010': '已领取',
        '63022': '库存不足',
        '63012': '用户等级未开启',
        '63013': '转盘与当前活动不一致',
        '63015': '转盘尚未开始',
        '63016': '转盘已结束',
        '63017': '没有抽奖机会',
        '63018': '抽奖异常',
        '63019': '奖品已抽完',
        '63020': '没有中奖',
        '63021': '红包不存在',
        '63024': '用户不存在',
        '63025': '自己不能赠送给自己',
        '63026': '不是好友'
    };

    $.extend({
        fwAjax: function (options) {
            var _success = options.success;
            options.success = function (data) {
                if (data.code == 10000) {
                    _success(data.data);
                } else if(data.code == 63001){
                    location.href = 'https://passport.9888.cn/passport/login?sourceSite=jrgc'
                }else {
                    var msg = data.message || ERROR_CODES[data.code] || '没有找到对应的code码';
                    GlobalAlert(msg);
                }
            };
            $.ajax(options);
        },
        _fwDeferredAjax:function(options){
            var _success = options.success;
            var dtd = $.Deferred();
            var wait = function(data){
                dtd.resolve(data);
                return dtd.promise()
            };
            options.success = function(data){
               $.when(wait(data))
                .done(function(data){
                    if(data.code == 10000){
                        _success(data.data);
                    }else if(data.code == 63001){
                        location.href = 'https://passport.9888.cn/passport/login?sourceSite=jrgc'
                    }else {
                        var msg = data.message || ERROR_CODES[data.code] || '没有找到对应的code码';
                        GlobalAlert(msg);
                    }
                })
                .fail(function(){
                    GlobalAlert("出错啦！")
                })
            };
            $.ajax(options)
        }
    });
})(jQuery);
