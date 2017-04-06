const Content = React.createClass({
    getInitialState: function () {
        return {
            tabName: '工豆明细',
            bean: {},
            username: null,
        }
    },
    componentDidMount: function () {
        var _this=this;
        $UserReady(function(is_login, user){
            _this.setState({username:user.username});
        });
    },
    render: function () {
        let {bean} = this.state;
        let th_rows = [], fnLoadData = () => null, fnFilterData = x => x;
        th_rows = [{title: '登录时间',width:'20%'}, {title: '地点',width:'15%'}, {title: 'IP',width:'25%'}, {title: "登录来源",width:'20%'}, {title: "登出时间",width:'20%'}];
        fnLoadData = Fn.DetailLoadData;
        fnFilterData = Fn.DetailFilterData;
        return (
            <div className="topNav">
                <div className="title">
                    <span className="redshow">{this.state.username}</span>
                    , 您可以查看最近3个月的登录状况，若存在异常登录记录，请在核实后尽快“<a className="blueshow" href="http://www.9888.cn/depository/account/toModifPwd.shtml">修改密码</a>”以保障账号安全。
                </div>
                <div className="moneyItemContainer">
                    <div className="beanItem">
                        <span className="left">登录历史记录</span>
                        <a className="right" href="http://www.9888.cn/depository/account/toAccountSetup.shtml">
                            <img src="images/return.png"/>
                            返回账户设置
                        </a>
                    </div>
                    <Table th_rows={th_rows} fnLoadData={fnLoadData} fnFilterData={fnFilterData}/>
                </div>
            </div>)
    }
});
let Fn = {
    DetailLoadData: function (page, cb) {
        $.get(API_PATH + '/beans/allBorrows.do', {
            rows: 12,
            page: page
        }, function (data) {
            cb(data.pageData)
        }, 'json')
    },
    DetailFilterData: function (data) {
        if(data){
            let rows = data.result.map((i) => [{
                text: i.createTime
            }, {
                text: i.cashValue,
                className: i.cashValue,
            }, {
                text: i.remark
            }, {
                text: i.waterType
            }, {
                text: i.waterTypeName
            }]);
            return {
                total_page: data.pagination.totalPage,
                rows: rows
            }
        }else{
            return{
                rows:[]
            }
        }
    },
}
$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<Content />, document.getElementById('userContent'));
});
