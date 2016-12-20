const WeekLadderMobile = React.createClass({
    getInitialState: function () {
        return({
            weekData:[],
            tab:'上一页',
            page:1,
            totalPage:2,
        })
    },
    componentDidMount: function () {

        $.get("./javascripts/week.json",(data) => {
            var sData = data.data;
            this.setState({weekData:sData})
        },"json")
    },
    switchPageHandler: function (type) {
        this.setState({tab:type});
        let {page,totalPage}=this.state,newPage;
        if(type == '上一页'){
            if(page > 1){
                newPage = page - 1;
                if(page > 2){
                    this.setState({tab:''})
                }
            }
        }else if(type == '下一页'){
            if(page < totalPage){
                newPage = page + 1;
                if(page < totalPage - 1){
                    this.setState({tab:''})
                }
            }
        }
        if(newPage) this.setState({page:newPage},this.ajaxPageHandle)
    },
    ajaxPageHandle: function () {
        console.log(this.state.page);
    },
    render: function () {
        let page = (
            <div className="page">
                {
                    ['上一页','下一页'].map((item,index) => {
                        return <div key={index}
                                    className={this.state.tab == item ? "selectedDiv":null}
                                    onClick={()=>{this.switchPageHandler(item)}}>{item}</div>
                    })
                }
            </div>
        );
        let dateArr = [
            '1.6-1.12',
            '1.13-1.19',
            '1.20-1.26',
            '1.27-2.2',
            '2.3-2.9',
            '2.10-2.16',
            '2.17-2.23',
            '2.24-3.2',
            '3.3-3.9',
            '3.10-3.16',
            '3.17-3.23',
            '3.24-3.30',
        ];
        let tBody = (
            <tbody>
            {
                this.state.weekData.map((item,index) => {
                    return <tr key={index}>
                        <td>{dateArr[index]}</td>
                        <td>{item.number}</td>
                        <td>{item.money}</td>
                    </tr>
                })
            }
            </tbody>
        );
        return(
            <div className="weekLadderContainerMobile">
                <table className="weekLadder">
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