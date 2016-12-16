const QuarterTable = React.createClass({
    getInitialState: function () {
      return({
          quartData:[]
      })
    },
    componentDidMount: function () {
      $.ajax({
          url:'./javascripts/list.json',
          type:"get",
          dataType:'json',
          success: function (data) {
              this.setState({
                  quartData:data.data
              })
          }.bind(this)
      })
    },
    tdImgFun: function (key) {
        var tdText = '';
        if(key == 0){
            tdText = 1
        }else if(key == 1){
            tdText = 2
        }else{
            tdText = key + 1
        }
        return tdText
    },
    render: function () {
        return(
            <div className="quarter">
                <table className="quarterTable">
                    <thead>
                        <tr>
                            <td>用户名</td>
                            <td>有效邀友数</td>
                            <td>好友累计年化投资额（元）</td>
                            <td>奖金（元）</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.quartData.map((item,index) => {
                            return(
                                <tr key={index}>
                                    <td className="tdImg">{this.tdImgFun(index)}</td>
                                    <td>{item.number}</td>
                                    <td>{item.money}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
});
$(function () {
    ReactDOM.render(
        <QuarterTable />,document.getElementById("cnt")
    );
});
