const WeekLadderMobile = React.createClass({
    getInitialState: function () {
        this.PRE_PAGE = 6;
        return ({
            totalData: [],
            page: 1,
            totalPage: 2,
            tab: '上一页',
            isClick:true,
            cursor: 0,
            currentDate:0
        })
    },
    componentDidMount: function () {
        this.ajaxTime();
        $.get(API_PATH+'/api/activityPullNew/v2/PullNewCountByTimeline.json',{
            timeline:'2017-01-06,2017-01-12 23:59:59;2017-1-13,2017-01-19 23:59:59;2017-01-20,2017-01-26 23:59:59;' +
            '2017-01-27,2017-02-02 23:59:59;2017-02-03,2017-02-09 23:59:59;2017-02-10,2017-02-16 23:59:59;2017-02-17,2017-02-23 23:59:59;' +
            '2017-02-24,2017-03-02 23:59:59;2017-03-03,2017-03-09 23:59:59;2017-03-10,2017-03-16 23:59:59;2017-03-17,2017-03-23 23:59:59;2017-03-24,2017-03-30 23:59:59',
            totalBaseAmt:1000,
        }, (data) => {
            var sData = data.data.countList || [];
            if (sData.length <= this.PRE_PAGE) {
                this.setState({totalPage: 1,isClick:false})
            } else if (sData.length > this.PRE_PAGE && sData.length <= this.PRE_PAGE * 2) {
                this.setState({totalPage: 2,isClick:true})
            } else if (sData.length > this.PRE_PAGE * 2 && sData.length <= this.PRE_PAGE * 3) {
                this.setState({totalPage: 3,isClick:true})
            }
            this.setState({totalData: sData})
        }, "json")
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
    getAwardHandle: function (count) {
        var score = '暂无奖金';
        if (count >= 5 && count <= 9) score = count * 10;
        if (count >= 10 && count <= 29) score = count * 12;
        if (count >= 30 && count <= 49) score = count * 15;
        if (count >= 50) score = count * 18;
        return score
    },
    get_current_page: function () {
        return this.state.totalData.slice(this.state.cursor, this.state.cursor + this.PRE_PAGE);
    },
    ajaxTime: function () {
        this.getServerTimestamp(function (timestamp) {
            this.setState({currentDate:timestamp})
        }.bind(this));
    },
    getServerTimestamp:function(callback){
        var ts = $getDebugParams().timestamp;
        if(ts) {
            callback(ts)
        } else {
            $.get(API_PATH+"api/userState/v1/timestamp.json", function (data) {
                callback(data.data.timestamp)
            }, 'json')
        }
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
        let dateArr = [
            '1.06-1.12',
            '1.13-1.19',
            '1.20-1.26',
            '1.27-2.02',
            '2.03-2.09',
            '2.10-2.16',
            '2.17-2.23',
            '2.24-3.02',
            '3.03-3.09',
            '3.10-3.16',
            '3.17-3.23',
            '3.24-3.30',
        ];
        function getNowFormatDate(timestamp) {
            var date = new Date(timestamp);
            var symbol = ".";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            //if (month >= 1 && month <= 9) {
            //    month = "0" + month;
            //}
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            return month + symbol + strDate;
        }
        function compareDate(a,b){
            return a <= getNowFormatDate(b)
        }
        let bodyImg = (item, index) => {
            index += this.state.cursor;
            let t;
            let n;
            var d = dateArr[index].split('-')[0];
            var cd = this.state.currentDate;
            if(compareDate(d,cd)) {
                t = this.getAwardHandle(item);
                n = item;
            } else {
                t = '未开始';
                n = '未开始'
            }
            return <tr key={index}>
                <td>{dateArr[index]}</td>
                <td className={n=='未开始'?null:"bodyAward"}>{n}</td>
                <td className={t=='未开始'||t=='暂无奖金'?null:"bodyAward"}>{t}</td>
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
            <div className="weekLadderContainerMobile">
                <table className="weekLadderMobile">
                    <thead>
                    <tr>
                        <td>日期</td>
                        <td>有效邀友数</td>
                        <td>工豆奖励（元）</td>
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
})
