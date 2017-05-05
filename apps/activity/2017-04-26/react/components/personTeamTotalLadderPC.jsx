//总榜PC端
class PersonTeamTotalLadderPC extends React.Component {
    constructor(props) {
        super(props);
        this.PRE_PAGE = 10;
        this.START = '2017/5/16 00:00:00';
        this.END = '2017/7/12 23:59:59';
        this.state = {
            totalData: {
                topList: []
            },
            page: 1,
            totalPage: 2,
            tab: '上一页',
            isClick: true,
            cursor: 0,
        }
    }
    componentDidMount() {
        let {title} = this.props;
        if(title == "个人榜"){
            this.ajaxPersonLadder()
        }else if(title == "团队榜"){
            this.ajaxTeamLadder()
        }
    }
    //个人榜请求ajax
    ajaxPersonLadder(){
        $.get(API_PATH+"api/activityPullInvest/v1/singularMonthList.json",{
            start:this.START,
            end:this.END
        }).then(data => {
            this.showAndSetData(data)
        })
    }
    //团队榜请求ajax
    ajaxTeamLadder(){
        $.get(API_PATH+"api/activityPullInvest/v1/singularMonthTeamList.json",{
            start:this.START,
            end:this.END
        }).then(data => {
            this.showAndSetData(data)
        })
    }

    showAndSetData(data) {
        var sData = data.data || {};
        var len = sData.topList.length;
        if (len <= this.PRE_PAGE) {
            this.setState({totalPage: 1, isClick: false});
        } else if (len > this.PRE_PAGE && sData.length <= this.PRE_PAGE * 2) {
            this.setState({totalPage: 2, isClick: true})
        }
        this.setState({totalData: sData})
    }

    switchPageHandler(type) {
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
    }

    fixedPriceFun(i) {
        var febStart = new Date("2017/2/3").getTime();
        var marStart = new Date("2017/3/3").getTime();
        let monthPrice = 0;
        var money = 0;
        let totalData = this.state.totalData;
        if (totalData.topList[i].totalall < 50 || totalData.topList[i].total < 500000) {
            return '暂无奖金'
        } else {
            if (this.state.currentTime < febStart || this.props.startDate == '2017-1-6') {
                monthPrice = 120000;
            } else if (this.state.currentTime < marStart || this.props.startDate == '2017-2-3') {
                monthPrice = 150000;
            } else {
                monthPrice = 180000;
            }
            money = ((totalData.topList[i].total) / (totalData.totalYearInvest)) * monthPrice;
        }
        return money.toFixed(2);
    }

    get_current_page() {
        return this.state.totalData.topList.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    }
    render() {
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
                    {this.props.isImgFun(index) ? <img className="tdImg" src={this.props.isImgFun(index)}/> :
                        <span className="twoSpan">{index + 1}</span>}
                    {<span className="oneSpan">{item.loginName}</span>}
                </td>
                <td>
                    {this.props.fixedPrice(item.total)}
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
        return <div className="personMonthLadder">
            <div className={this.props.title == "个人榜"?"personTitle":"teamTitle"}>{this.props.title}</div>
            <div className="personTable">
                <table>
                    <thead>
                    <tr>
                        <td>用户名</td>
                        <td>团队累投金额（元）</td>
                        <td>奖金（元）</td>
                    </tr>
                    </thead>
                    {
                        this.state.totalData.topList.length ? tBody : null
                    }
                </table>
            </div>
            {
                this.state.totalData.topList.length ? page : null
            }
            {
                this.state.totalData.topList.length ? null : <div className="monthLadderPcNot">人气王还在堵车，马上就来</div>
            }
        </div>
    }
}