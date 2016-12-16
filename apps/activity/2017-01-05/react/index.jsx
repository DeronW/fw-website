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
              console.log(data);
          }
      })
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
