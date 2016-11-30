const Worker = React.createClass({
    render: function () {
        var introduction = [
            {
                pic:'./images/pic1.png',
                name:'魏薇',
                job:'董事长'
            },
            {
                pic:'./images/pic2.png',
                name:'崔海晨',
                job:'CEO'
            },
            {
                pic:'./images/pic3.png',
                name:'邹晓东',
                job:'首席风控'
            },
            {
                pic:'./images/pic4.png',
                name:'李建光',
                job:'副总裁'
            }
        ];
        return(
            <div className="containerBox">
                <div className="banner">
                    <div className="bannerImg"></div>
                </div>
                <div className="Question">
                    <div className="questionTitle">什么是工友汇？</div>
                    <div className="questionContent">
                        工友汇”是金融工场与用户面对面、零距离交流活动。在这里，能认识同城投资伙伴，还可以直面工场管理层；在这里，你的财富愿景与专业指导、透明信息交流汇聚分享。金融工场是香港上市金融公司中国信贷（08207.HK）旗下互联网金融平台。成立四年以来，坚持严格自律，并以最真诚的态度面向所有用户。“工友汇”，将与全国各地的工友们零距离接触，面对面走近您身边！
                    </div>
                </div>
                <div className="wealth">
                    <div className="wealthBox">
                        <div className="wealthTitle">
                            <span>自律创造财富</span>
                            <img src="./images/city.png" alt=""/>
                        </div>
                        <div className="wealthContent">
                            <div className="wealthContentPeople">
                                {
                                    introduction.map((item,index) => {
                                        return <div className="person" key={index}>
                                            <img src={item.pic} alt=""/>
                                            <div className="name">{item.name}</div>
                                            <div className="job">{item.job}</div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="wealthContentText">
                                <p>10月29日，工场“工友汇”第一站在北京正式启动。50多位工友齐聚一堂，与金融工场高级管理人员面对面交流探讨。金融工场董事长魏薇、CEO崔海晨、首席风控官邹晓东、副总裁李建光出席活动，并对金融工场上线银行存管、风控体系、监管政策、行业发展以及日常服务，进行交流答疑。</p>
                               <p>在会上，魏薇从“金融”、“科技”、“安全”、“服务”四个方面分析了行业未来的发展趋势，并阐述了金融工场未来的发展方向。此后，金融工场CEO崔海晨就金融工场的发展作出总结，“成立四年累计完成158亿的交易额，为近百万用户赚取了超过4亿元的收益”。首席风险官邹晓东则从资产结构、流程与制度、资金交易保障和合规化调整四个方面，详细介绍了金融工场风险控制体系。副总裁李建光对于近期上线的徽商银行资金存管系统做出最后精彩分享。</p>
                            </div>
                            <PlayPicture />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

const PlayPicture = React.createClass({
    getInitialState: function () {
      return{
          showArrow:false,
          page:0,
          totalPage:3
      }
    },
    hoverInHandle: function () {
        this.setState({showArrow:true})
    },
    hoverOutHandle: function () {
        this.setState({showArrow:false})
    },
    switchBtnHandle: function (type) {
      let {page,totalPage} = this.state,newPage;
      if(type == 'left'){
          if(page > 1) {
              newPage = page - 1
          }else{
              this.setState({page:0})
          };
      }else if(type == "right"){
          if(page < totalPage - 1 ) newPage = page + 1;
      }
      if(newPage) this.setState({page:newPage});
    },
   render: function () {
        var btnStyle = {
            display:this.state.showArrow ? "block":"none"
        };
       var images = [
         './images/img1.png',
         './images/img2.png',
         './images/img3.png'
       ];
       return(
           <div className="wealthContentPicture" onMouseOver={() => {this.hoverInHandle()}} onMouseOut={()=>{this.hoverOutHandle()}}>
               <div className="btn" style={btnStyle}>
                   <img className="leftBtn" src="./images/left.png" alt="" onClick={()=>{this.switchBtnHandle('left')}}/>
                   <img className="rightBtn" src="./images/right.png" alt="" onClick={()=>{this.switchBtnHandle('right')}}/>
               </div>
               <div className="picture">
                   <img src={images[this.state.page]} alt=""/>
               </div>
           </div>
       )
   }
});

$(function(){
    ReactDOM.render(<Worker />,document.getElementById('cnt')); 
});
