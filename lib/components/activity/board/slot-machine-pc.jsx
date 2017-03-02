const RockProduct = React.createClass({
    getInitialState() {
        return {
            position: 0,
            result: this.props.result
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({ result: nextProps.result }, this.lotteryDrawHandler)
    },
    lotteryDrawHandler(speed, id) {
        var productList = this.props.productList;
        var s = 0;
        var i = 0;
        var count = 0;
        var timer = setInterval(() => {
            var position = this.state.position;
            productList.forEach((item, index) => {
                if (item.id == id) {
                    i = index;
                }
            });
            var target = (i - 1) * 182;
            if (position >= (productList.length - 1) * 182) {
                this.setState({
                    position: speed
                });
                //count++;
                //if (count == 2) {
                //    this.setState({ position: target});
                //    clearInterval(timer);
                //}
            } else {
                s = speed + this.state.position;
                this.setState({
                    position: s
                });
            }
        }, 30)
    },
    render() {
        let position = {
            transform: 'translateY(-' + this.state.position + 'px)'
        };
        let products = (item, index) => {
            return <div className="product" key={index}>
                <img style={position} src={item.img} />
                <p style={position}>{item.name}</p>
            </div>
        };
        return <div className="rockProduct">
            {this.props.productList.map(products)}
        </div>
    }
});

const SlotMachinePC = React.createClass({
    getInitialState() {
        return {
            arr: [],
            position: 0,
            result: null
            // prize_list: this.props.prize_list
        }
    },
    componentDidMount() {
    },
    closePopHandler() {
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
    componentWillReceiveProps(nextProps) {
        this.setState({ result: nextProps.result }, this.rockLotteryDraw)
    },
    rockLotteryDraw() {
        this.refs.rockProduct.lotteryDrawHandler(30, 4);
        setTimeout(() => {
            this.refs.rockProduct2.lotteryDrawHandler(30, 4);
        }, 300);
        setTimeout(() => {
            this.refs.rockProduct3.lotteryDrawHandler(30, 4);
        }, 600);
    },
    render() {
        let {prize_list} = this.props;
        let {result} = this.props;

        return <div className="slotShow">
            <div className="current">
                <RockProduct productList={prize_list}  ref="rockProduct" result={result}/>
            </div>
            <div className="current current1">
                <RockProduct productList={prize_list}  ref="rockProduct2" result={result}/>
            </div>
            <div className="current current2">
                <RockProduct productList={prize_list} ref="rockProduct3" result={result}/>
            </div>
            <div className="onceBtn" onClick={this.rockLotteryDraw}>抽奖一次</div>
            <div className="tenBtn" onClick={this.rockLotteryDraw}>抽奖十次</div>
            <div className="onceText">消耗1次抽奖机会</div>
            <div className="tenText">消耗10次抽奖机会</div>
        </div>
    }
});
