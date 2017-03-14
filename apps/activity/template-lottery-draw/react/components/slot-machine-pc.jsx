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
        var timer = setInterval(() => {
            var position = this.state.position;
            productList.forEach((item, index) => {
                if (item.id == id) {
                    i = index;
                }
            });
            var distance = (i - 1) * 182;
            if (position >= (productList.length - 1) * 182) {
                this.setState({
                    position: speed
                });
                count++;
            } else {
                if (count >= 2) {
                    s = (distance - this.state.position) / 8;
                    s = s > 0 ? Math.ceil(s) : Math.floor(s);
                    this.setState({
                        position: this.state.position + s
                    });
                    if (this.state.position == distance) {
                        clearInterval(timer);
                        setTimeout(()=>{
                            window.once_delay = false;
                        },100);
                    }
                } else {
                    s = speed + this.state.position;
                    this.setState({
                        position: s
                    });
                }
            }
        }, 30)
    },
    tenLotteryDrawHandler(speed,productList) {
        var s = 0;
        var count = 0;
        var timer = setInterval(() => {
            var position = this.state.position;
            var distance = (productList.length - 1) * 182;
            if (position >= distance) {
                this.setState({
                    position: speed
                });
                count++;
            } else {
                if (count >= 2) {
                    s = (distance - this.state.position) / 8;
                    s = s > 0 ? Math.ceil(s) : Math.floor(s);
                    this.setState({
                        position: this.state.position + s
                    });
                    if (this.state.position == distance) {
                        clearInterval(timer);
                        setTimeout(()=>{
                            window.ten_delay = false;
                        },100);
                    }
                } else {
                    s = speed + this.state.position;
                    this.setState({
                        position: s
                    });
                }
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
            result: null,
             prize_list: this.props.prize_list
        }
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
        if(window.once_delay) return;
        window.once_delay = true;
        this.refs.rockProduct.lotteryDrawHandler(30, 3);
        setTimeout(() => {
            this.refs.rockProduct2.lotteryDrawHandler(30, 3);
        }, 300);
        setTimeout(() => {
            this.refs.rockProduct3.lotteryDrawHandler(30, 3);
        }, 600);
    },
    rockTenLotteryDraw(){
        if(window.ten_delay) return;
        window.ten_delay = true;
        this.state.prize_list.push({
            img: 'http://placehold.it/138?text=大礼包',
            name: '大礼包'
        });
        this.refs.rockProduct.tenLotteryDrawHandler(30,this.state.prize_list);
        setTimeout(() => {
            this.refs.rockProduct2.tenLotteryDrawHandler(30,this.state.prize_list);
        }, 300);
        setTimeout(() => {
            this.refs.rockProduct3.tenLotteryDrawHandler(30,this.state.prize_list);
        }, 600);
    },
    render() {
        let {prize_list} = this.state;
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
            <div className="tenBtn" onClick={this.rockTenLotteryDraw}>抽奖十次</div>
            <div className="onceText">消耗1次抽奖机会</div>
            <div className="tenText">消耗10次抽奖机会</div>
        </div>
    }
});