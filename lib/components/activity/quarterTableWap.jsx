const MonthTable = React.createClass({
    getInitialState: function () {
      return({
          isIOS:false,
          monthData:[],
          monthPage:2,
          monthTotalPage:5,
          monthTab:'上一页',
      })
    },
    componentDidMount: function () {
        $.ajax({
            url:'./javascripts/list.json',
            type:'get',
            dataType:'json',
            success: function (data) {
                this.setState({
                    monthData:data.data,
                })
            }.bind(this)
        })
    },
    isImgFun: function (key) {
      let elementText = '';
      if(key == 0){
          elementText = './images/jin.png'
      }else if(key == 1){
          elementText = './images/yin.png'
      }else if(key == 2){
          elementText = './images/tong.png'
      }else{
          elementText = ''
      }
      return elementText
    },
    pageTabHandle: function (item) {
      this.setState({monthTab:item});
      let {monthPage,monthTotalPage}=this.state,newPage;
      if(item == "上一页"){
          if(monthPage > 1){
              newPage = monthPage - 1;
              if(monthPage > 2){
                  this.setState({monthTab:''})
              }
          }
      }else if(item == "下一页"){
          if(monthPage < monthTotalPage){
              newPage = monthPage + 1;
              if(monthPage < monthTotalPage - 1){
                  this.setState({monthTab:''})
              }
          }
      }
      if(newPage) this.setState({monthPage:newPage},this.ajaxPage)
    },
    ajaxPage: function () {
        console.log(this.state.monthPage)
    },
    render: function () {
        var iosStyle = {
          marginTop:this.state.isIOS ? '0':'78px'
        };
        var pageTap = (
          <div className="page">
              {
                  ['上一页','下一页'].map((item,index) => {
                      return <div key={index}
                                  className={this.state.monthTab == item ? 'selectedDiv':null}
                                  onClick={() => {this.pageTabHandle(item)}}>{item}</div>
                  })
              }
          </div>
        );
        return(
            <div className="monthTableContainer" style={iosStyle}>
                <table className="monthTable">
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
                        this.state.monthData.map((item,index) => {
                            return <tr key={index}>
                                <td>{this.isImgFun(index) ? <img className="tdImg" src={this.isImgFun(index)}/>:<span className="twoSpan">{index+1}</span>}
                                    {<span className="oneSpan">{item.name}</span>}
                                </td>
                                <td>{item.number}</td>
                                <td>
                                    {item.money}
                                    {item.text ? <div>{item.text}</div>:null}
                                </td>
                                <td>{item.price}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                {
                    pageTap
                }
            </div>
        )
    }
});