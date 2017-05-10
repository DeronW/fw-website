const RockProduct = React.createClass({
    getInitialState() {
        this.t = null;
        this._time_gap = 0;
        return {
            position: 0,
            position_index: 1,
        }
    },

    tenClosePopHandler() {
        this.props.productList.pop();
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    },
    componentDidMount(){
        this.autoCycleHandler()
    },
    //自动循环播放奖品列表
    autoCycleHandler(){
        let delay = 30, duration = 4500, singleH = 182, p, target = 182;
        let { productList } = this.props;
        this.t = setInterval(() => {
            this._time_gap += delay;
            if (this._time_gap >= duration) {
                if (this.state.position < singleH * (productList.length - 1)) {
                    p = (target - this.state.position) / 12;
                    p = p > 0 ? Math.ceil(p) : Math.floor(p);
                    if (this.state.position >= singleH * (this.state.position_index)) {
                        target += 182;
                        this._time_gap = 0;
                        this.setState({position_index: ++this.state.position_index})
                    }
                    this.setState({
                        position: this.state.position + p
                    });
                } else {
                    target = 182;
                    this._time_gap = 0;
                    this.setState({position_index: 1, position: 0})
                }
            }
        }, delay)
    },
    lotteryDrawHandler(speed, prizeMark, prize, remainTimes) {
        clearInterval(this.t);
        var productList = this.props.productList;
        var s = 0, i = 0, count = 0;
        var timer = setInterval(() => {
            var position = this.state.position;
            productList.forEach((item, index) => {
                if (item.prizeMark == prizeMark) {
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
                            ReactDOM.render(<PopOnePrize closePopHandle={this.props.closePopHandler} popPrize={prize}
                                                         popNumber={remainTimes}
                                                         popBtn='继续抽奖'/>, document.getElementById('pop'));
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
    tenLotteryDrawHandler(speed, productList, remainTimes, prize_list) {
        clearInterval(this.t);
        var s = 0;
        var count = 0;
        var timer = setInterval(() => {
            var position = this.state.position;
            var distance = (prize_list.length - 1) * 182;
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
                            ReactDOM.render(<PopTenPrice closePopHandle={this.tenClosePopHandler }
                                                         productList={productList}
                                                         popNumber={remainTimes}
                                                         popBtn='继续抽奖'/>, document.getElementById('pop'));
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
            prize_list: this.props.prize_list,
            count: 0,
            position: 0,
        }
    },
    closePopHandler() {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    },
    componentDidMount(){
        this.ajaxCount()
    },
    //请求有几次抽奖次数
    ajaxCount(){
        $.get(API_PATH + "api/activityPullInvest/v1/prizeDrawTimes.json", {
            isUsed: 0
        }).then(data => {
            this.setState({count: data.data.times})
        })
    },

    //请求一次抽奖
    ajaxOnePrize(){
        $.get(API_PATH + 'api/activityPullInvest/v1/play.json', {
            configNo: 1,
            drawCount: 1
        }).then(data => {
            this.ajaxCount();
            var prize = data.data.resultAward[0].prize;
            var prizeMark = data.data.resultAward[0].prizeMark;
            var remainTimes = data.data.remainTimes;
            if (window.once_delay) return;
            window.once_delay = true;
            this.refs.rockProduct.lotteryDrawHandler(30, prizeMark, prize, remainTimes);
            setTimeout(() => {
                this.refs.rockProduct2.lotteryDrawHandler(30, prizeMark, prize, remainTimes);
            }, 300);
            setTimeout(() => {
                this.refs.rockProduct3.lotteryDrawHandler(30, prizeMark, prize, remainTimes);
            }, 600);
        })
    },
    //请求十次抽奖
    ajaxTenPrize(){
        $.get(API_PATH + 'api/activityPullInvest/v1/play.json', {
            configNo: 1,
            drawCount: 10
        }).then(data => {
            this.ajaxCount();
            var resultAward = data.data.resultAward;
            var remainTimes = data.data.remainTimes;
            let {prize_list} = this.props;
            if (window.once_delay) return;
            window.once_delay = true;
            prize_list && prize_list.push({
                img: 'images/gift.png',
                name: '抽奖十次大礼包'
            });
            this.refs.rockProduct.tenLotteryDrawHandler(30, resultAward, remainTimes, prize_list);
            setTimeout(() => {
                this.refs.rockProduct2.tenLotteryDrawHandler(30, resultAward, remainTimes, prize_list);
            }, 300);
            setTimeout(() => {
                this.refs.rockProduct3.tenLotteryDrawHandler(30, resultAward, remainTimes, prize_list);
            }, 600);

        })
    },
    //点击一次抽奖时先判断抽奖次数是否大于1
    rockLotteryDraw() {
        if (this.state.count < 1) {
            ReactDOM.render(<PopZero closePopHandle={this.closePopHandler}/>, document.getElementById('pop'))
        } else {
            this.ajaxOnePrize();
        }
    },
    //点击十次抽奖时先判断抽奖次数是否大于1，大于10
    rockTenLotteryDraw(){
        let {count} =this.state;
        if (count < 1) {
            ReactDOM.render(<PopZero closePopHandle={this.closePopHandler}/>, document.getElementById('pop'))
        } else if (count < 10) {
            ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} gotoLogin={this.props.gotoLogin}
                                        popTop="抽奖次数" popNoTitle={"抽奖机会不足10次啦，去单次抽奖吧。"}
                                        popBtn="朕知道了"/>, document.getElementById('pop'))
        } else {
            this.ajaxTenPrize()
        }
    },
    showRule(){
        ReactDOM.render(<PopRule closePopHandle={this.closePopHandler} popBtn="朕知道了"/>, document.getElementById('pop'))
    },
    popLogin(){
        ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} gotoLogin={this.props.gotoLogin} popTop="立即登录"
                                    popNoTitle={"您还没有登录"} popBtn="立即登录"/>, document.getElementById('pop'))
    },
    render() {
        let {count} = this.state;
        let {isLogin,gotoLogin,prize_list} = this.props;
        return <div className="slotShow">
            {
                isLogin && <div className="chance">
                    您有<em>{count}</em>次机会
                </div>
            }
            <div className="rule" onClick={()=>this.showRule()}>抽奖奖品></div>
            <div className="current">
                <RockProduct productList={prize_list} ref="rockProduct" closePopHandler={this.closePopHandler}
                             gotoLogin={gotoLogin}/>
            </div>
            <div className="current current1">
                <RockProduct productList={prize_list} ref="rockProduct2" closePopHandler={this.closePopHandler}
                             gotoLogin={gotoLogin}/>
            </div>
            <div className="current current2">
                <RockProduct productList={prize_list} ref="rockProduct3" closePopHandler={this.closePopHandler}
                             gotoLogin={gotoLogin}/>
            </div>
            <div className="onceBtn" onClick={isLogin?()=>this.rockLotteryDraw():()=>this.popLogin()}>抽奖一次</div>
            <div className="tenBtn" onClick={isLogin?()=>this.rockTenLotteryDraw():()=>this.popLogin()}>抽奖十次</div>
            <div className="onceText">消耗1次抽奖机会</div>
            <div className="tenText">消耗10次抽奖机会</div>
        </div>
    }
});