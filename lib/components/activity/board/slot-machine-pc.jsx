const RockProduct = React.createClass({
    getInitialState() {
        return {
            position: 0,
            result: this.props.result
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({result: nextProps.result}, this.lotteryDrawHandler)
    },
    lotteryDrawHandler(speed, id) {
        var productList = this.props.productList;
        var s = 0;
        var i = 0;
        var count = 0;
        var sp = 20;
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
                count++;
            } else {
                s = speed + this.state.position;
                if(count >= 2){
                    s = s - (20);
                    if(s == 10){
                        clearInterval(timer);
                    }
                }
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
    getInitialState() {
        return {
            result: null
            // prize_list: this.props.prize_list
        }
    },
    componentDidMount() {
        //setTimeout(() => {
        //    this.setState({ result: 4 })
        //}, 4000);
    },
    closePopHandler() {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    },
    //ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} popMyPrize="我的奖品" popNoTitle="暂无中奖记录" popBtn="朕知道了"/>,document.getElementById('pop'))
    //            //ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} popTitle="抱歉，抽奖异常！" popText="请稍后再试，如需咨询请联系客服400-0322-988 。" popBtn="朕知道了"/>,document.getElementById('pop'))
    //            //ReactDOM.render(<PopOnePrize closePopHandle={this.closePopHandler} popPrize="1888工豆" popNumber="10" popBtn='继续抽奖'/>,document.getElementById('pop'))
    //            //ReactDOM.render(<PopZero closePopHandle={this.closePopHandler}/>,document.getElementById('pop'))

    componentWillReceiveProps(nextProps) {
        this.setState({result: nextProps.result}, this.rockLotteryDraw)
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
        let {result} = this.state;

        return <div className="slotShow">
            <div className="current">
                <RockProduct productList={prize_list} ref="rockProduct" result={result}/>
            </div>
            <div className="current current1">
                <RockProduct productList={prize_list} ref="rockProduct2" result={result}/>
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
