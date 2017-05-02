const RockProduct = React.createClass({
    getInitialState() {
        return {
            position: 0,
        }
    },

    tenClosePopHandler() {
        this.props.productList.pop();
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    },
    lotteryDrawHandler(speed, id) {
        console.log(speed);
        var productList = this.props.productList;
        var s = 0, i = 0, count = 0;
        var timer = setInterval(() => {
            var position = this.state.position;
            productList.forEach((item, index) => {
                if (item.id == id) {
                    i = index;
                }
            });
            var distance = (i) * 182;
            if (position >= (productList.length - 1) * 182) {
                this.setState({
                    position: speed
                });
                count++;
            } else {
                if (count >= 3) {
                    if (this.state.position > 182) {
                        s = (distance - this.state.position) / 8;
                        s = s > 0 ? Math.ceil(s) : Math.floor(s);
                        this.setState({
                            position: this.state.position + s
                        });
                    } else {
                        this.setState({
                            position: distance
                        });
                    }
                    if (this.state.position == distance) {
                        clearInterval(timer);
                        setTimeout(()=> {
                            ReactDOM.render(<PopOnePrize closePopHandle={this.props.closePopHandler} popPrize="1888工豆"
                                                         popNumber="10" popBtn='继续抽奖'/>, document.getElementById('pop'));
                            //ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} popTitle="抱歉，抽奖异常！" popText="请稍后再试，如需咨询请联系客服400-0322-988 。" popBtn="朕知道了"/>,document.getElementById('pop'))
                            //ReactDOM.render(<PopOnePrize closePopHandle={this.closePopHandler} popPrize="1888工豆" popNumber="10" popBtn='继续抽奖'/>,document.getElementById('pop'))
                            //ReactDOM.render(<PopZero closePopHandle={this.closePopHandler}/>,document.getElementById('pop'))

                            window.once_delay = false;
                        }, 1000);
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
    tenLotteryDrawHandler(speed, productList) {
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
                        setTimeout(()=> {
                            window.once_delay = false;
                            ReactDOM.render(<PopTenPrice closePopHandle={this.tenClosePopHandler} popNumber={31}
                                                         popBtn={"继续抽奖"}/>, document.getElementById("pop"))
                        }, 1000);
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
            prize_list: this.props.prize_list
        }
    },
    closePopHandler() {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    },
    rockLotteryDraw() {
        if (window.once_delay) return;
        window.once_delay = true;
        this.refs.rockProduct.lotteryDrawHandler(30, 2);
        setTimeout(() => {
            this.refs.rockProduct2.lotteryDrawHandler(30, 2);
        }, 300);
        setTimeout(() => {
            this.refs.rockProduct3.lotteryDrawHandler(30, 2);
        }, 600);
    },
    rockTenLotteryDraw(){
        if (window.once_delay) return;
        window.once_delay = true;
        var prize_list = this.state.prize_list;
        prize_list.push({
            img: 'http://placehold.it/138?text=大礼包',
            name: '大礼包'
        });
        this.refs.rockProduct.tenLotteryDrawHandler(30, prize_list);
        setTimeout(() => {
            this.refs.rockProduct2.tenLotteryDrawHandler(30, prize_list);
        }, 300);
        setTimeout(() => {
            this.refs.rockProduct3.tenLotteryDrawHandler(30, prize_list);
        }, 600);
    },
    showRule(){
        ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} gotoLogin={this.props.gotoLogin} popMyPrize="抽奖规则" popRule={true} popBtn="朕知道了"/>, document.getElementById('pop'))
    },
    popLogin(){
        ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} gotoLogin={this.props.gotoLogin} popMyPrize="立即登录" popNoTitle={"您还没有登录"} popBtn="立即登录"/>, document.getElementById('pop'))
    },
    render() {
        let {prize_list} = this.state;
        let {isLogin,gotoLogin} = this.props;
        return <div className="slotShow">
            {
                isLogin && <div className="chance">
                    您有<em>19</em>次机会
                </div>
            }
            <div className="rule" onClick={()=>this.showRule()}>抽奖规则></div>
            <div className="current">
                <RockProduct productList={prize_list} ref="rockProduct" closePopHandler={this.closePopHandler} gotoLogin={gotoLogin}/>
            </div>
            <div className="current current1">
                <RockProduct productList={prize_list} ref="rockProduct2" closePopHandler={this.closePopHandler} gotoLogin={gotoLogin}/>
            </div>
            <div className="current current2">
                <RockProduct productList={prize_list} ref="rockProduct3" closePopHandler={this.closePopHandler} gotoLogin={gotoLogin}/>
            </div>
            <div className="onceBtn" onClick={isLogin?()=>this.rockLotteryDraw():()=>this.popLogin()}>抽奖一次</div>
            <div className="tenBtn" onClick={isLogin?()=>this.rockTenLotteryDraw():()=>this.popLogin()}>抽奖十次</div>
            <div className="onceText">消耗1次抽奖机会</div>
            <div className="tenText">消耗10次抽奖机会</div>
        </div>
    }
});
