const QuarterTable = React.createClass({
    getInitialState: function () {
        return({
            quartData:[],
            quartPage:2,
            quartTotalPage:5,
            quartTab:'上一页',
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
        });
    },
    isImgFun: function (key) {
        var tdText = '';
        if(key == 0){
            tdText = "./images/jin.png"
        }else if(key == 1){
            tdText = "./images/yin.png"
        }else if(key == 2){
            tdText = "./images/tong.png"
        } else{
            tdText = 0
        }
        return tdText
    },
    switchPageHandler: function (type) {
        let {quartPage,quartTotalPage}=this.state ,new_page;
        if(type == '上一页') {
            if(quartPage > 1){
                new_page = quartPage -1;
                if(quartPage > 2){
                    this.setState({quartTab:''})
                }else{
                    this.setState({quartTab:'上一页'})
                }
            }
        }else if(type == '下一页'){
            if(quartPage < quartTotalPage){
                new_page = quartPage + 1;
                if(quartPage < quartTotalPage - 1){
                    this.setState({quartTab:''})
                }else{
                    this.setState({quartTab:'下一页'})
                }
            }
        }
        if(new_page) this.setState({quartPage:new_page},this.ajaxPageHandle)
    },
    ajaxPageHandle: function () {
        console.log(this.state.quartPage)
    },
    render: function () {
        var pageTab = (
            <div className="page">
                {
                    ['上一页','下一页'].map((item,index) => {
                        return <div key={index}
                                    className={this.state.quartTab == item ? 'selectPage':null}
                                    onClick={()=>{this.switchPageHandler(item)}}>{item}</div>
                    })
                }
            </div>
        );
        return(
            <div className="quarterTableContainer">
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
                            )
                        })
                    }
                    </tbody>
                </table>
                {
                    pageTab
                }
            </div>
        )
    }
});