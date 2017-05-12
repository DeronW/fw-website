const BalloonBoom = React.createClass({
    getInitialState() {
        return {
            path: this.props.path,
            giftPath: '',
            prizeList: [],
            outTime: false,
        }
    },
    componentDidMount(){
        $.get(API_PATH+"api/userState/v1/timestamp.json", (data)=> {
            if (data.data.timestamp > 1499875200000) {
                this.setState({outTime: true})
            }
        }, 'json')
    },
    judgeType(){
        if (this.props.getPrizeType() == 'single') {
            this.balloonBoomHandler();
            this.props.promiseOnceLotteryResult();
        } else if (this.props.getPrizeType() == 'package') {
            this.balloonBoomHandler();
            this.props.promiseMoreLotteryResult();
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            path: nextProps.path,
            giftPath: nextProps.giftPath
        })
    },
    balloonBoomHandler() {
        var arr = ['images/balloonBoom.png', 'images/giftMobile.png'];
        var i = 0;
        var timer = setInterval(() => {
            this.setState({path: arr[i]});
            i++;
            if (i == 2) {
                this.giftBoomHandler();
                clearInterval(timer);
            }
        }, 80);
    },
    giftBoomHandler() {
        var gifts = ['images/gift1Mobile.png', 'images/gift2Mobile.png'];
        var i = 0;
        var timer2 = setInterval(() => {
            this.setState({giftPath: gifts[i]});
            i++;
            if (i == 2) {
                clearInterval(timer2);
            }
        }, 80);
    },
    render() {
        let pathStyle = {
            position: 'absolute',
            left: '40px',
            top: '110px'
        };
        return <div className="ballBoom">
            <img className="giftBoom" src={this.state.giftPath} alt=""/>
            {
                (this.state.outTime || this.props.getPrizeType() == 'grey') ?
                    <img className="greyPath" src={this.props.greyPath} alt=""/> :
                    <img className={this.props.isAnimation ? "blueBalloon":"blueBalloonNo"}
                         onTouchEnd={this.judgeType}
                         style={this.state.path == 'images/giftMobile.png' ? pathStyle : {}} src={this.state.path}/>
            }
        </div>
    }
});


const PokeBalloonMobile = React.createClass({
    getInitialState() {
        return {
            count: 0,
            type: 'single',
            giftPath: '',
            isAnimation: true,
            isLogin:false
        }
    },
    componentDidMount() {
        $UserReady(function (isLogin, user) {
            this.setState({isLogin: isLogin});
        }.bind(this));
        this.ajaxCount();
    },
    ajaxCount(){
        $.get(API_PATH + "api/activityPullInvest/v1/prizeDrawTimes.json", {
            isUsed: 0
        }).then(data => {
            this.setState({count: data.data.times})
        })
    },
    closePopHandler() {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
        this.setState({giftPath: '', isAnimation: true})
    },
    //一次
    promiseOnceLotteryResult(){
        this.showMessagePop('恭喜中奖');
        if(window.poke_delay) return;
        window.poke_delay = true;
        $.get(API_PATH+"api/activityPullInvest/v1/play.json?",{
            configNo:1,
            drawCount:1
        }).then((data) => {
            this.ajaxCount();
            this.showMessagePop('恭喜中奖', data.data.resultAward[0].prize);
            this.refs.productListAuto.rewardPoolHandler();
        });

    },
    //十次
    promiseMoreLotteryResult(){
        this.showMessagePop('恭喜中奖');
        if(window.poke_delay) return;
        window.poke_delay = true;
        $.get(API_PATH+"api/activityPullInvest/v1/play.json?",{
            configNo:1,
            drawCount:10
        }).then((data) => {
            this.ajaxCount();
            this.showMessagePop('恭喜中奖','', data.data.resultAward);
            this.refs.productListAuto.rewardPoolHandler();
        });
    },
    showMessagePop(title, productName, prizeList){
        this.setState({isAnimation: false});
        ReactDOM.render(<PopAllSituation closePopHandler={this.closePopHandler} popBtn="知道了"
                                         popTitle={title}
                                         popOneProduct={productName}
                                         popMoreProducts={prizeList}/>, document.getElementById("pop"))
    },
    changeNumberHandler(type) {
        this.setState({type: type});
    },
    getPrizeType(){
        if (this.state.count < 1) {
            return 'grey'
        } else {
            return this.state.type
        }
    },
    showAddress(){
        ReactDOM.render(<PopInformation />, document.getElementById("pop"))
    },
    render() {
        let {count} =this.state;
        let notClick = {
            width: '276px',
            height: '102px',
            background: 'url("images/notBtn.png") no-repeat',
            lineHeight: '102px',
            textAlign: 'center',
            fontSize: '30px',
            color: '#676767',
            marginLeft: '25px'
        };
        let btn = (btnTab, type) => {
            let gray;
            if ((count < 10 && btnTab == '使用10次机会') ||
                (count < 1 && btnTab == '使用1次机会')) gray = true;
            return <div className={this.state.type == type && "active"}
                        style={gray && notClick}
                        onClick={gray?'':() => this.changeNumberHandler(type)}>{btnTab}</div>
        };

        return <div className="pokeBalloonMobile">
            <div className="pokeBalloonShow">
                <div className="pokeBallChance">您有<em>{count}</em>次获奖机会</div>
                <div className="ball">
                    <BalloonBoom path='images/blue.png' greyPath="images/blueGrey.png"
                                 getPrizeType={this.getPrizeType}
                                 count={this.state.count}
                                 isAnimation={this.state.isAnimation}
                                 ajaxCount={this.ajaxCount}
                                 promiseOnceLotteryResult={this.promiseOnceLotteryResult}
                                 promiseMoreLotteryResult={this.promiseMoreLotteryResult}
                                 closePopHandler={this.closePopHandler}/>
                </div>
                <div className="ball2">
                    <BalloonBoom path='images/purple.png' greyPath="images/purpleGrey.png"
                                 getPrizeType={this.getPrizeType}
                                 count={this.state.count}
                                 isAnimation={this.state.isAnimation}
                                 ajaxCount={this.ajaxCount}
                                 promiseOnceLotteryResult={this.promiseOnceLotteryResult}
                                 promiseMoreLotteryResult={this.promiseMoreLotteryResult}
                                 closePopHandler={this.closePopHandler}/>/>
                </div>
                <div className="ball3">
                    <BalloonBoom path='images/pink.png' greyPath="images/pinkGrey.png"
                                 getPrizeType={this.getPrizeType}
                                 count={this.state.count}
                                 isAnimation={this.state.isAnimation}
                                 ajaxCount={this.ajaxCount}
                                 promiseOnceLotteryResult={this.promiseOnceLotteryResult}
                                 promiseMoreLotteryResult={this.promiseMoreLotteryResult}
                                 closePopHandler={this.closePopHandler}/>/>
                </div>
                <div className="chanceBtn">
                    {btn('使用1次机会', 'single')}
                    {btn('使用10次机会', 'package')}
                </div>
                <div className="chanceText">
                    <div> 一次获得1个奖品</div>
                    <div> 一次获得10个奖品</div>
                </div>
            </div>
            <div className="myPrizeTitle">我的奖品</div>
            <div className="productShow">
                <ProductListAuto ref="productListAuto"/>
            </div>
        </div>
    }
});
