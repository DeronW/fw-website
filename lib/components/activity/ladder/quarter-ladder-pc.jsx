const QuarterLadderPC = React.createClass({
    getInitialState: function () {
        return({
            quarterData:[],
            page:2,
            totalPage:5,
            tab:'上一页',
        })
    },
    componentDidMount: function () {
        $.ajax({
            url:'./javascripts/list.json',
            type:"get",
            dataType:'json',
            success: function (data) {
                this.setState({
                    quarterData:data.data
                })
            }.bind(this)
        });
    },
    isImgFun: function (key) {
        var imgName = ['jin','yin','tong'];
        var i = imgName[key]?`./images/${imgName[key]}.png`:null;
        return i
    },
    subNameFun: function (str) {
        return str.substr(0,2)+"**"+str.substr(str.length-2,2);
    },
    fixedPriceFun: function (price) {
        return price.toFixed(2)
    },
    switchPageHandler: function (type) {
        this.setState({tab:type});
        let {page,totalPage}=this.state ,new_page;
        if(type == '上一页') {
            if(page > 1){
                new_page = page -1;
                if(page > 2){
                    this.setState({tab:''})
                }
            }
        }else if(type == '下一页'){
            if(page < totalPage){
                new_page = page + 1;
                if(page < totalPage - 1){
                    this.setState({tab:''})
                }
            }
        }
        if(new_page) this.setState({page:new_page},this.ajaxPageHandle)
    },
    ajaxPageHandle: function () {
        console.log(this.state.page)
    },
    render: function () {
        let pageImg = (item,index) => {
            return <div key={index}
                        className={this.state.tab == item ? 'selectedPage':null}
                        onClick={()=>{this.switchPageHandler(item)}}>{item}</div>
        };
        let page = (
            <div className="page">
                {
                    ['上一页','下一页'].map(pageImg)
                }
            </div>
        );
        let bodyImg = (item,index) => {
            return(
                <tr key={index}>
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
            )
        };
        let tBody = (
            <tbody>
            {
                this.state.quarterData.map(bodyImg)
            }
            </tbody>
        );
        return(
            <div className="quarterLadderContainerPC">
                <table className="quarterLadder">
                    <thead>
                    <tr>
                        <td>用户名</td>
                        <td>有效邀友数</td>
                        <td>好友累计年化投资额（元）</td>
                        <td>奖金（元）</td>
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
});
