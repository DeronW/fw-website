const Content = React.createClass({
    getInitialState: function () {
        return {
            tabName: '工豆明细',
            bean: {},
            username:'xiaoming'
        }
    },

    componentDidMount: function () {
        this.setState({
            bean: {
                usable: 1,
                outdate: 2,
                frozen: 3
            }
        })
    },

    tabClickHandler: function (tab) {
        let n=(tab=="工豆收入")?true:false;
        this.setState({tabName: tab,check:n});
    },

    render: function () {
        let {bean} = this.state;

        // let tab_list = ["工豆明细", "工豆收入", "工豆支出", "已过期"];
        //
        // let tab = (value, index) => {
        //     let cn = this.state.tabName == value ? "active" : null;
        //     return (
        //         <div className={cn} key={index} onClick={() => this.tabClickHandler(value) }>
        //             {value}
        //         </div>
        //     )
        // };
        let th_rows = [], fnLoadData = () => null, fnFilterData = x => x;
        if (this.state.tabName == '工豆明细') {
            th_rows = [{title: '登录时间'}, {title: '地点'}, {title: 'IP'},{title:"登录来源"},{title:"登出时间"}];
            fnLoadData = Fn.DetailLoadData;
            fnFilterData = Fn.DetailFilterData;
        }
        return (
            <div className="topNav">
                <div className="title">
                    <span className="redshow">{this.state.username}</span>
                    , 您可以查看最近3个月的登录状况，若存在异常登录记录，请在核实后尽快“<a className="blueshow" href="#">修改密码</a>”以保障账号安全。
                </div>
                <div className="moneyItemContainer">
                    <div className="beanItem">
                        <span className="left">登录历史记录</span>
                        <span className="right"><img src="images/return.png"/>返回账户设置</span>
                    </div>
                    <Table th_rows={th_rows} fnLoadData={fnLoadData} fnFilterData={fnFilterData}/>
                </div>


            </div>)
    }
});

let Fn = {
    DetailLoadData: function (page, cb) {
        $.get(API_PATH + 'beans/allBorrows.do', {
            rows: 10,
            page: page
        }, function (data) {
            cb(data.pageData)
        }, 'json')
    },
    DetailFilterData: function (data) {
        let rows = data.result.map((i) => [{
            text: i.createTime
        }, {
            text: i.cashValue>0?("+"+i.cashValue):(i.cashValue),
            className: i.cashValue > 0 ? 'red' : 'green'
        }, {
            text: `(${i.waterTypeName})${i.remark}`
        },{
            text:i.waterType
        },{
            text:i.waterTypeName
        }]);

        return {
            total_page: data.pagination.totalPage,
            rows: rows
        }
    },
    IncomeLoadData:function (page,callback) {
        $.get(API_PATH+'beans/incomeBorrows.do',{
            rows:10,
            page:page
        },function (data) {
            let d = data.pageData;
            d.bean_count = data.beanCount;
            callback(d)
        },'json')
    },
    IncomeFilterData:function (data) {
        let rows=data.result.map((i)=>[
            {text:i.issueTime},
            {text: i.beanUsed>0?("+"+i.beanUsed):(i.beanUsed),
                className: i.beanUsed > 0 ? 'red' : 'green'},
            {text:i.overdueTime},
            {text:i.remark}
            ]

        );
        return {
            total_page: data.pagination.totalPage,
            rows: rows,
            bean_count:data.bean_count
        }
    },
    ExpendLoadData:function (page,callback) {
        $.get(API_PATH+'beans/expendBorrows.do',{
            rows:10,
            page:page
        },function (data) {
            let d = data.pageData;
            d.bean_count=data.beanCount;
            callback(d);
        },'json');
    },
    ExpendFilterData:function (data) {
        let rows = data.result.map((value)=>[
            {text:value.createTime},
            {text:(value.cashValue>0)?"+"+value.cashValue:value.cashValue,
            className:value.cashValue>0?"red":"green"},
            {text:value.remark}
        ]);
        return {
            total_page:data.pagination.totalPage,
            rows:rows,
            bean_count:data.bean_count
        }
    },
    OverdateLoadData:function (page,callback) {
        $.get(API_PATH+'beans/overdueBorrows.do',{
            rows:10,
            page:page
        },function (data) {
            let d = data.pageData;
            d.bean_count=data.beanCount;
            callback(d);
        },'json');
    },
    OverdateFilterData:function (data) {
        let rows = data.result.map((value)=>[
            {text:value.issueTime},
            {text:(value.beanOverdue>0)?"+"+value.beanOverdue:value.beanOverdue,
                className:value.beanOverdue>0?"red":"green"},
            {text:value.overdueTime},
            {text:value.remark}
        ]);
        return {
            total_page:data.pagination.totalPage,
            rows:rows,
            bean_count:data.bean_count
        }
    }
}


$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<Content />, document.getElementById('userContent'));
});
