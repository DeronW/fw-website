const QuarterLadderMobile = React.createClass({
    getInitialState: function () {
        this.PRE_PAGE = 10;
        return ({
            totalData: [],
            page: 1,
            totalPage: 2,
            tab: '上一页',
            isClick: true,
            cursor: 0,
            totalYearInvestAll:0,
        })
    },
    componentDidMount: function () {
        $.ajax({
            url: API_PATH + '/api/activityPullNew/v2/PullNewTopAndYearInvest.json',
            data: {
                dataCount: 30,
                totalBaseAmt: 1000,
                endDate: '2017-3-30',
                startDate: '2017-1-6',
                startTotalCount: 100,
                startTotalInvest: 1000000
            },
            type: "get",
            dataType: 'json',
            success: function (data) {
                var sData = data.data.topList || [];
                if (sData.length <= this.PRE_PAGE) {
                    this.setState({totalPage: 1,isClick:false});
                } else if (sData.length > this.PRE_PAGE && sData.length <= this.PRE_PAGE * 2) {
                    this.setState({totalPage: 2,isClick:true})
                } else if (sData.length > this.PRE_PAGE * 2 && sData.length <= this.PRE_PAGE * 3) {
                    this.setState({totalPage: 3,isClick:true})
                }
                this.setState({
                    totalData: sData,
                    totalYearInvestAll:data.data.totalYearInvestAll
                })
            }.bind(this)
        });
    },
    isImgFun: function (index) {
        return ['images/jin.png', 'images/yin.png', 'images/tong.png'][index]
    },
    subNameFun: function (str) {
        return str.substring(0, 2) + "**" + str.substring(str.length - 2, str.length);
    },
    fixedPrice: function (total) {
        if(!total) return;
        return total.toFixed(2)
    },
    fixedPriceFun: function (total, totalLimit,totalall) {
        let {totalYearInvest,totalYearInvestAll} = this.state;
        let price = 0;
        let p = 0.01;
        if(totalall >= 100 && total >= 1000000){
            if (totalYearInvestAll >= 40000000 && totalYearInvestAll < 50000000) {
                p = 0.01;
            } else if (totalYearInvestAll >= 50000000 && totalYearInvestAll < 60000000) {
                p = 0.013;
            } else if (totalYearInvestAll >= 60000000) {
                p = 0.018;
            }else{
                return '暂无奖金'
            }
        }else {
            return '暂无奖金'
        }
        price = totalLimit * p * 0.56 + (total - totalLimit) * p;
        return price.toFixed(2)
    },
    switchPageHandler: function (type) {
        this.setState({tab: type});
        let {page,totalPage}=this.state;
        let cursor, min, new_page, len = this.state.totalData.length;
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
        return this.state.totalData.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    },
    render: function () {
        let pageImg = (item, index) => {
            return <div key={index}
                        className={this.state.isClick?(this.state.tab == item ? 'selectedPage':null):'selectedPage'}
                        onClick={this.state.isClick?()=>{this.switchPageHandler(item)}:null}>{item}</div>
        };
        var page = (
            <div className="page">
                {
                    ['上一页', '下一页'].map(pageImg)
                }
            </div>
        );
        var td4Style = {
            textAlign : 'right',
            width:'100px',
            paddingRight:'20px'
        };
        let bodyImg = (item, index) => {
            index += this.state.cursor;
            return (
                <tr key={index}>
                    <td>{this.isImgFun(index) ? <img className="tdImg" src={this.isImgFun(index)}/> :
                        <span className="twoSpan">{index + 1}</span>}
                        {<span className="oneSpan">{item.loginName}</span>}
                    </td>
                    <td>{item.totalall}</td>
                    <td>
                        {this.fixedPrice(item.total)}
                        {<div className="tdPriceLimit">(含等额标{item.total4})</div>}
                    </td>
                    <td style={td4Style} className={this.fixedPriceFun(item.total,item.total4,item.totalall) == '暂无奖金'?null:"tdPrice"}>{this.fixedPriceFun(item.total,item.total4,item.totalall)}</td>
                </tr>
            )
        };
        let tBody = (
            <tbody>
            {
                this.get_current_page().map(bodyImg)
            }
            </tbody>
        );
        return (
            <div className="quarterLadderContainerMobile">
                <table className="quarterLadderMobile">
                    <thead>
                    <tr>
                        <td>用户名</td>
                        <td>有效邀友数</td>
                        <td>有效好友累投年化额（元）</td>
                        <td>奖金（元）</td>
                    </tr>
                    </thead>
                    {
                        this.state.totalData.length ? tBody : null
                    }
                </table>
                {
                    this.state.totalData.length ? page : null
                }
                {
                    this.state.totalData.length ? null : <div className="quarterLadderMobileNot">人气王还在堵车，马上就来</div>
                }
            </div>
        )
    }
});
