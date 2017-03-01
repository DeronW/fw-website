const RockProduct = React.createClass({
    getInitialState(){
        return {
            position: 0
        }
    },
    lotteryDrawHandler(speed, id){
        var productList = this.props.productList;
        var s = 0;
        var i = 0;
        var count = 0;
        var timer = setInterval(()=> {
            var position = this.state.position;
            productList.forEach((item,index)=>{
               if(item.id == id){
                   i = index;
               }
            });
            var target = (i - 1) * 182;
            if (position >= (productList.length - 1) * 182) {
                this.setState({
                    position: speed
                });
                count++;
                if(count == 2){
                    this.setState({position: target});
                    clearInterval(timer);
                }
            } else {
                s = speed + this.state.position;
                this.setState({
                    position: s
                });
            }
        }, 30)
    },
    render(){
        let position = {
            transform: 'translateY(-' + this.state.position + 'px)'
        };
        let products = (item, index) => {
            return <div className="product" key={index}>
                <img style={position} src={item.img}/>

                <p style={position}>{item.name}</p>
            </div>
        };
        return <div className="rockProduct">
            {this.props.productList.map(products)}
        </div>
    }
});

const SlotMachinePC = React.createClass({
    getInitialState(){
        this.products = [
            {
                id: 1,
                img: 'images/one.png',
                name: '苹果笔记本'
            },
            {
                id: 2,
                img: 'images/two.png',
                name: '手环'
            },
            {
                id: 3,
                img: 'images/three.png',
                name: '手机'
            },
            {
                id: 4,
                img: 'images/one.png',
                name: '苹果笔记本'
            },
            {
                id: 5,
                img: 'images/two.png',
                name: '手环'
            },
            {
                id: 6,
                img: 'images/three.png',
                name: '手机'
            }
        ];
        return {
            arr: [],
            position: 0
        }
    },
    componentDidMount(){
        this.setState({
            arr: this.products
        });
    },
    closePopHandler(){
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    },
    //onceLotteryDraw(){
    //    if(window.delay) return;
    //    window.delay = true;
    //    setTimeout(()=>{
    //        window.delay = false;
    //    },parseInt(Math.random() * 10) * 500);
    //
    //    var destination = 30;
    //
    //    var timer = setInterval(() => {
    //        if (destination >= (this.state.arr.length - 1) * 168) {
    //            destination = 30;
    //            this.setState({
    //                position: destination
    //            });
    //        } else {
    //            destination += 30;
    //            this.setState({position: destination});
    //        }
    //    }, 30);
    //onceLotteryDraw(){
    //    if(window.delay) return;
    //    window.delay = true;
    //    setTimeout(()=>{
    //        window.delay = false;
    //    },parseInt(Math.random() * 10) * 500);
    //
    //    var destination = 30;
    //    var timer = setInterval(() => {
    //        if (destination >= (this.state.arr.length - 1) * 168) {
    //            destination = 30;
    //            this.setState({
    //                position: destination
    //            });
    //        } else {
    //            destination += 30;
    //            this.setState({position: destination});
    //        }
    //    }, 30);
    //    setTimeout(()=> {
    //        let {position} = this.state;
    //        this.setState({
    //            position: parseInt(position / 168) * 168
    //        });
    //        clearInterval(timer);
    //        setTimeout(()=> {
    //            //ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} popMyPrize="我的奖品" popNoTitle="暂无中奖记录" popBtn="朕知道了"/>,document.getElementById('pop'))
    //            //ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} popTitle="抱歉，抽奖异常！" popText="请稍后再试，如需咨询请联系客服400-0322-988 。" popBtn="朕知道了"/>,document.getElementById('pop'))
    //            //ReactDOM.render(<PopOnePrize closePopHandle={this.closePopHandler} popPrize="1888工豆" popNumber="10" popBtn='继续抽奖'/>,document.getElementById('pop'))
    //            //ReactDOM.render(<PopZero closePopHandle={this.closePopHandler}/>,document.getElementById('pop'))
    //
    //        }, 100)
    //    }, parseInt(Math.random() * 10) * 500);
    //},
    //tenLotteryDraw(){
    //    if(window.delay) return;
    //    window.delay = true;
    //    setTimeout(()=>{
    //        window.delay = false;
    //    },parseInt(Math.random() * 10) * 500 - 100);
    //
    //    var destination = 30;
    //    this.products.push({
    //        img:"images/gift.png",
    //        name:'大礼包'
    //    });
    //    this.setState({
    //        arr:this.products
    //    });
    //    var timer = setInterval(() => {
    //        if (destination >= (this.state.arr.length - 1) * 168) {
    //            destination = 30;
    //            this.setState({
    //                position: destination
    //            });
    //        } else {
    //            destination += 30;
    //            this.setState({position: destination});
    //        }
    //    }, 30);
    //    setTimeout(()=> {
    //        this.setState({
    //            position: 6 * 168
    //        });
    //        clearInterval(timer);
    //        setTimeout(()=> {
    //            ReactDOM.render(<PopTenPrice closePopHandle={this.closePopHandler} popNumber="10" popBtn="继续抽奖"/>,document.getElementById('pop'));
    //            this.products.pop({
    //                img:"images/gift.png",
    //                name:'大礼包'
    //            });
    //        }, 100)
    //    }, parseInt(Math.random() * 10) * 500);
    //},
    rockLotteryDraw(){
        this.refs.rockProduct.lotteryDrawHandler(30, 4);
        setTimeout(()=> {
            this.refs.rockProduct2.lotteryDrawHandler(30, 4);
        }, 300);
        setTimeout(()=> {
            this.refs.rockProduct3.lotteryDrawHandler(30, 4);
        }, 600);
    },
    render(){
        return <div className="slotShow">
            <div className="current">
                <RockProduct productList={this.state.arr} ref="rockProduct"/>
            </div>
            <div className="current current1">
                <RockProduct productList={this.state.arr} ref="rockProduct2"/>
            </div>
            <div className="current current2">
                <RockProduct productList={this.state.arr} ref="rockProduct3"/>
            </div>
            <div className="onceBtn" onClick={this.rockLotteryDraw}>抽奖一次</div>
            <div className="tenBtn" onClick={this.tenLotteryDraw}>抽奖十次</div>
            <div className="onceText">消耗1次抽奖机会</div>
            <div className="tenText">消耗10次抽奖机会</div>
        </div>
    }
});
