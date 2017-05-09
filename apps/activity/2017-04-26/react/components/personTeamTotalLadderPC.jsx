//总榜PC端
class PersonTeamTotalLadderPC extends React.Component {
    constructor(props) {
        super(props);
        this.PRE_PAGE = 10;
        this.START = '2017-05-16 00:00:00';
        this.END = '2017-07-12 23:59:59';
        this.state = {
            list:[],
            page: 1,
            totalPage: 2,
            tab: '上一页',
            isClick: true,
            cursor: 0,
        }
    }
    componentDidMount() {
        this.ajaxLadder();
    }
    //请求个人、小组数据
    ajaxLadder(){
        $.get(API_PATH+"api/activityPullInvest/v1/singularMonthTeamList.json",{
            start:this.START,
            end:this.END,
            type:'mayActBig'
        }).then(data => {
            let sData;
            let {title} =this.props;
            if(title == "个人榜"){
                sData = data.data.persondata || [];
                this.setState({list: sData})
            }else if(title == "团队榜"){
                sData = data.data.teamdata || [];
                this.setState({list: sData})
            }
        })
    }

    switchPageHandler(type) {
        this.setState({tab: type});
        let {page,totalPage}=this.state;
        let cursor, min, new_page, len = this.state.list.length;
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

    get_current_page() {
        let {list} =this.state;
        return list && list.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    }
    render() {
        let {totalPage,tab,cursor,list}=this.state;
        let pageImg = (item, index) => {
            return <div key={index}
                        className={totalPage>1?(tab == item ? 'selectedPage':null):'selectedPage'}
                        onClick={totalPage>1?()=>{this.switchPageHandler(item)}:null}>{item}</div>
        };
        let page = (
            <div className="page">
                {
                    ['上一页', '下一页'].map(pageImg)
                }
            </div>
        );
        let bodyImg = (item, index) => {
            index += cursor;
            return <tr key={index}>
                <td>
                    {this.props.isImgFun(index) ? <img className="tdImg" src={this.props.isImgFun(index)}/> :
                        <span className="twoSpan">{index + 1}</span>}
                    {<span className="oneSpan">{item.loginName}</span>}
                </td>
                <td>
                    {item.amount}
                </td>
                <td className={item.bonus?"bodyPrice":""}>{item.bonus}</td>
            </tr>
        };
        let tBody = (
            <tbody>
            {
                this.get_current_page().map(bodyImg)
            }
            </tbody>
        );
        return <div className="personMonthLadder personTotalLadder">
            <div className={this.props.title == "个人榜"?"personTotalTitle":"teamTotalTitle"}>{this.props.title}</div>
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
                        list.length ? tBody : null
                    }
                </table>
            </div>
            {
                list.length ? page : null
            }
            {
                list.length ? null : <div className="monthLadderPcNot totalLadderPcNot">人气王还在堵车，马上就来</div>
            }
        </div>
    }
}