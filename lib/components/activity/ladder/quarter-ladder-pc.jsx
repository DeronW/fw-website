const QuarterLadderPC = React.createClass({
    getInitialState: function () {
        this.PRE_PAGE = 10;
        return ({
            totalData: [],
            page: 1,
            totalPage: 2,
            tab: '上一页',
            cursor: 0,
            isClick:true,
        })
    },
    componentDidMount: function () {
        $.ajax({
            url: API_PATH+'/api/activityPullNew/v2/PullNewTopAndYearInvest.json',
            data:{
                dataCount:30,
                totalBaseAmt:1000,
                endDate:'2017-3-30',
                startDate:'2017-1-6',
                startTotalCount:0,
                startTotalInvest:0
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
                this.setState({totalData: sData})
            }.bind(this)
        });
    },
    isImgFun: function (key) {
        var imgName = ['jin', 'yin', 'tong'];
        var i = imgName[key] ? `./images/${imgName[key]}.png` : null;
        return i
    },
    subNameFun: function (str) {
        return str.substr(0, 2) + "**" + str.substr(str.length - 2, 2);
    },
    fixedPrice: function (total) {
        return total.toFixed(2)
    },
    fixedPriceFun: function (total, totalLimit) {
        let price = 0;
        let p = 0.01;
        if (total >= 4000000 && total < 5000000) {
            p = 0.01;
        } else if (total >= 5000000 && total < 6000000) {
            p = 0.013;
        } else if (total >= 6000000) {
            p = 0.018;
        } else {
            return '暂无奖金'
        }
        price = totalLimit * 0.01 * 0.0056 + (total - totalLimit) * 0.01;
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
        let page = (
            <div className="page">
                {
                    ['上一页', '下一页'].map(pageImg)
                }
            </div>
        );
        let bodyImg = (item, index) => {
            index += this.state.cursor;
            return (
                <tr key={index}>
                    <td>{this.isImgFun(index) ? <img className="tdImg" src={this.isImgFun(index)}/> :
                        <span className="twoSpan">{index + 1}</span>}
                        {<span className="oneSpan">{this.subNameFun(item.name)}</span>}
                    </td>
                    <td>{item.totalall}</td>
                    <td>
                        {this.fixedPrice(item.money)}
                        {<em className="limit">({item.total4})</em>}
                    </td>
                    <td className={this.fixedPriceFun(item.totalall,item.total4) !== '暂无奖金'?"tdPrice":null}>{this.fixedPriceFun(item.totalall,item.total4)}</td>
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
            <div className="quarterLadderContainerPC">
                <table className="quarterLadderPc">
                    <thead>
                    <tr>
                        <td>用户名</td>
                        <td>有效邀友数</td>
                        <td>好友累计年化投资额（元）</td>
                        <td>奖金（元）</td>
                    </tr>
                    </thead>
                    {
                        tBody
                    }
                </table>
                {
                    page
                }
            </div>
        )
    }
});
