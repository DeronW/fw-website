const MonthLadderMobile = React.createClass({
    getInitialState: function () {
        this.PRE_PAGE = 5;
        return ({
            totalData: {
                topList: []
            },
            page: 1,
            totalPage: 2,
            tab: '上一页',
            isClick: true,
            cursor: 0
        })
    },
    getServerTimestamp: function (callback) {
        var ts = $getDebugParams().timestamp;
        if (ts) {
            callback(ts)
        } else {
            $.get(API_PATH + "api/userState/v1/timestamp.json", function (data) {
                callback(data.data.timestamp)
            }, 'json')
        }
    },
    componentDidMount: function () {
        var febStart = new Date("2017/2/3").getTime();
        var marStart = new Date("2017/3/3").getTime();
        var startDate = '2017-1-6';
        var endDate = '2017-2-2';
        this.getServerTimestamp(function (timestamp) {
            var currentTime = timestamp;
            if (currentTime < febStart) {
                startDate = '2017-1-6';
                endDate = '2017-2-2';
            } else if (currentTime < marStart) {
                startDate = '2017-2-3';
                endDate = '2017-3-2';
            } else {
                startDate = '2017-3-3';
                endDate = '2017-3-30';
            }
            this.ajaxPullNewInvest(startDate, endDate)
        }.bind(this))
    },
    componentWillReceiveProps: function (nextProps) {
        this.ajaxPullNewInvest(nextProps.startDate, nextProps.endDate)
    },
    ajaxPullNewInvest: function (startDate, endDate) {
        $.ajax({
            url: API_PATH + '/api/activityPullNew/v2/PullNewTopAndYearInvest.json',
            data: {
                dataCount: 20,
                totalBaseAmt: 1000,
                startDate: startDate,
                endDate: endDate,
                startTotalCount: 2,
                startTotalInvest: 50000
            },
            type: "get",
            dataType: 'json',
            success: function (data) {
                var sData = data.data;
                var len = sData.topList.length || [];
                if (len <= this.PRE_PAGE) {
                    this.setState({totalPage: 1, isClick: false});
                } else if (len > this.PRE_PAGE && sData.length <= this.PRE_PAGE * 2) {
                    this.setState({totalPage: 2, isClick: true})
                } else{
                    this.setState({totalPage: 3, isClick: true})
                }
                this.setState({totalData: sData})
            }.bind(this)
        });
    },
    isImgFun: function (index) {
        return ['images/jin.png', 'images/yin.png', 'images/tong.png'][index]
    },
    fixedPrice: function (total) {
        return total.toFixed(2)
    },
    fixedPriceFun: function (i) {
        var febStart = new Date("2017/2/3").getTime();
        var marStart = new Date("2017/3/3").getTime();
        let monthPrice = 0;
        let totalData = this.state.totalData;
        //50人改为2人 50万改为5万
        if (totalData.topList[i].totalall < 2 && totalData.topList[i].total < 50000) {
            return '暂无奖金'
        } else {
            if (this.state.currentTime < febStart || this.props.startDate == '2017-1-6') {
                monthPrice = 120000;
            } else if (this.state.currentTime < marStart || this.props.startDate == '2017-2-3') {
                monthPrice = 150000;
            } else{
                monthPrice = 180000;
            }
        }
        var money = ((totalData.topList[i].total) / (totalData.totalYearInvest)) * monthPrice;
        return money.toFixed(2);
    },
    switchPageHandler: function (type) {
        this.setState({tab: type});
        let {page,totalPage}=this.state;
        let cursor, min, new_page, len = this.state.totalData.topList.length;
        if (type == '上一页') {
            if (len % this.PRE_PAGE) {
                min = parseInt(len / this.PRE_PAGE) * this.PRE_PAGE
            } else {
                min = len - this.PRE_PAGE
            }
            cursor = this.state.cursor > 0 ? Math.min(min, this.state.cursor - this.PRE_PAGE) : 0;
            this.setState({cursor: cursor});
            if (page > 1) {
                new_page = page - 1;
                this.setState({page: new_page});
                if (page > 2) {
                    this.setState({tab: ''})
                }
            }
        } else {
            console.log("xiaa")
            if (len % this.PRE_PAGE) {
                min = parseInt(len / this.PRE_PAGE) * this.PRE_PAGE
            } else {
                min = len - this.PRE_PAGE
            }
            cursor = Math.min(min, this.state.cursor + this.PRE_PAGE);
            this.setState({cursor: cursor});
            if (page < totalPage) {
                new_page = page + 1;
                this.setState({page: new_page});
                if (page < totalPage - 1) {
                    this.setState({tab: ''})
                }
            }
        }
    },
    get_current_page: function () {
        return this.state.totalData.topList.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    },
    render: function () {
        let pageImg = (item, index) => {
            return <div key={index}
                        className={this.state.isClick?(this.state.tab == item ? 'selectedPage':null):'selectedPage'}
                        onClick={this.state.isClick?()=>{this.switchPageHandler(item)}:null}>{item}</div>
        };
        let page = (
            <div className="page">
                {
                    ['上一页', '下一页'].map(pageImg)
                }
            </div>
        );
        let bodyImg = (item, index) => {
            index += this.state.cursor;
            return <tr key={index}>
                <td>
                    {this.isImgFun(index) ? <img className="tdImg" src={this.isImgFun(index)}/> :
                        <span className="twoSpan">{index + 1}</span>}
                    {<span className="oneSpan">{item.loginName}</span>}
                </td>
                <td>{item.totalall}</td>
                <td>
                    {this.fixedPrice(item.total)}
                </td>
                <td className={this.fixedPriceFun(index) == '暂无奖金'?null:"bodyPrice"}>{this.fixedPriceFun(index)}</td>
            </tr>
        };
        let tBody = (
            <tbody>
            {
                this.get_current_page().map(bodyImg)
            }
            </tbody>
        );
        return (
            <div className="monthLadderContainerMobile">
                <table className="monthLadderMobile">
                    <thead>
                    <tr>
                        <td>用户名</td>
                        <td>有效邀友数</td>
                        <td className="tHeadTd3">有效好友累投年化额（元）</td>
                        <td>奖金（元）</td>
                    </tr>
                    </thead>
                    {
                        this.state.totalData.topList.length ? tBody : null
                    }
                </table>
                {
                    this.state.totalData.topList.length ? page : null
                }
                {
                    this.state.totalData.topList.length ? null :
                        <div className="monthLadderMobileNot">人气王还在堵车，马上就来</div>
                }
            </div>
        )
    }
});
