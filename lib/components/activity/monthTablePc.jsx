const MonthTablePc = React.createClass({
    getInitialState: function () {
      return({
          monthData:[],
      })
    },
    componentDidMount: function () {
        $.ajax({
            url:'./javascripts/list.json',
            type:"get",
            dataType:'json',
            success: function (data) {
                console.log(data);
                this.setState({
                    monthData:data.data
                })
            }.bind(this)
        });
    },
    render:function(){
        return (
            <div className="monthTableContainerPc">
                <table className="monthTable">
                    <thead>
                    <tr>
                        <td>用户名</td>
                        <td>有效邀请数</td>
                        <td>好友累计年化投资额（元）</td>
                        <td>奖金（元）</td>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
});
