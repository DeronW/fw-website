const QuarterTableWap = React.createClass({
    getInitialState: function () {
      return({
          isIOS:false,
          quarterData:[],
          page:2,
          totalPage:5,
          tab:'上一页',
      })
    },
    componentDidMount: function () {
        $.ajax({
            url:'./javascripts/list.json',
            type:'get',
            dataType:'json',
            success: function (data) {
                this.setState({
                    quarterData:data.data
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
    subNameFun: function (str) {
        return str.substring(0,2)+"**"+str.substring(str.length-2,str.length);
    },
    fixedPriceFun: function (price) {
        return price.toFixed(2)
    },
    pageTabHandle: function (type) {
      this.setState({tab:type});
      let {page,totalPage}=this.state,newPage;
      if(type == "上一页"){
          if(page > 1){
              newPage = page - 1;
              if(page > 2){
                  this.setState({tab:''})
              }
          }
      }else if(type == "下一页"){
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
        console.log(this.state.page)
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
                                  className={this.state.tab == item ? 'selectedDiv':null}
                                  onClick={() => {this.pageTabHandle(item)}}>{item}</div>
                  })
              }
          </div>
        );
        return(
            <div className="quarterTableContainerWap" style={iosStyle}>
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
                        this.state.quarterData.map((item,index) => {
                            return <tr key={index}>
                                <td>{this.isImgFun(index) ? <img className="tdImg" src={this.isImgFun(index)}/>:<span className="twoSpan">{index+1}</span>}
                                    {<span className="oneSpan">{this.subNameFun(item.name)}</span>}
                                </td>
                                <td>{item.number}</td>
                                <td>
                                    {this.fixedPriceFun(item.money)}
                                    {item.text ? <div>{item.text}</div>:null}
                                </td>
                                <td>{this.fixedPriceFun(item.price)}</td>
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
