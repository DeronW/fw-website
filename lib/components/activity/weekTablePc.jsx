const WeekTablePc = React.createClass({
    getInitialState: function () {
        return({
            weekData:[],
        })
    },
    componentDidMount: function () {
      $.get("./javascripts/week.json",(data) => {
          this.setState({weekData:data.data})
      },"json")
    },
    render:function(){
        return(
            <div className="weekTableContainerPc">
                <table className="weekTable">
                    <thead>
                    <tr>
                        <td>日期</td>
                        <td>有效邀友数</td>
                        <td>工豆奖励（元）</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.weekData.map((item,index) => {
                            return <tr key={index}>
                                <td></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
})