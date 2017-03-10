const BalloonBoom = React.createClass({
    getInitialState() {
        return {
            path: this.props.path,
            giftPath: '',
            prizeList: [],
            animation: 1,
            outTime: false
        }
    },
    componentDidMount(){
        $.get("./javascripts/time.json", (data)=> {
            if (data.time > 9) {
                this.setState({outTime: true})
            }
        }, 'json')
    },
    judgeType(){
        if (this.props.getPrizeType() == 'single') {
            this.balloonBoomHandler();
            this.setState({animation: 0});
            this.props.promiseOnceLotteryResult();
        } else if (this.props.getPrizeType() == 'package') {
            this.balloonBoomHandler();
            this.setState({animation: 0});
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
            left: '0',
            top: '110px'
        };
        return <div className="ballBoom">
            <img className="giftBoom" src={this.state.giftPath} alt=""/>
            {
                this.state.outTime ? <img className="greyPath" src={this.props.greyPath} alt=""/> :
                    <img className={this.props.isAnimation ? "blueBalloon":"blueBalloonNo"}
                         onClick={this.judgeType}
                         style={this.state.path == 'images/giftMobile.png' ? pathStyle : {}} src={this.state.path}/>
            }
        </div>
    }
});


const PokeBalloonMobile = React.createClass({
    getInitialState() {
        return {
            count: 1,
            type: 'single',
            giftPath: '',
            isAnimation: true
        }
    },
    componentDidMount() {
        $.get("./javascripts/count.json", (data) => {
            this.setState({
                count: data.number
            });
        }, 'json');
    },
    closePopHandler() {
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
        this.setState({giftPath: '', isAnimation: true})
    },
    promiseOnceLotteryResult(){
        $.get("./javascripts/once.json", (data) => {
            this.refs.productListAuto.rewardPoolHandler();
            this.showMessagePop('抱歉，系统异常', '', data.data.list[0].goodsname)
        }, 'json')
    },
    promiseMoreLotteryResult(){
        $.get("./javascripts/once.json", (data) => {
            this.refs.productListAuto.rewardPoolHandler();
            this.showMessagePop('抱歉，抽奖异常', '', '', data.data.list)
        }, 'json')
    },
    showMessagePop(title, message, productName, prizeList){
        this.setState({isAnimation: false});
        ReactDOM.render(<PopAllSituation closePopHandler={this.closePopHandler} popBtn="知道了"
                                         popTitle={title}
                                         popText={message}
                                         popOneProduct={productName}
                                         popMoreProducts={prizeList}/>, document.getElementById("pop"))
    },
    changeNumberHandler(type) {
        this.setState({type: type});
    },
    getPrizeType(){
        if (this.state.count < 1) {
            return ''
        } else {
            return this.state.type
        }

    },
    showAddress(){
        ReactDOM.render(<PopInformation />, document.getElementById("pop"))
    },
    render() {
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
            if ((this.state.count < 10 && btnTab == '使用10次机会') ||
                (this.state.count < 1 && btnTab == '使用1次机会')) gray = true;
            return <div className={this.state.type == type && "active"}
                        style={gray && notClick}
                        onClick={gray?'':() => this.changeNumberHandler(type)}>{btnTab}</div>
        };

        return <div className="pokeBalloonMobile">
            <div className="pokeBalloonShow">
                <div className="ball">
                    <BalloonBoom path='images/blue.png' greyPath="images/blueGrey.png" getPrizeType={this.getPrizeType}
                                 number={this.state.number}
                                 isAnimation={this.state.isAnimation}
                                 promiseOnceLotteryResult={this.promiseOnceLotteryResult}
                                 promiseMoreLotteryResult={this.promiseMoreLotteryResult}/>
                </div>
                <div className="ball2">
                    <BalloonBoom path='images/purple.png' greyPath="images/purpleGrey.png"
                                 getPrizeType={this.getPrizeType} number={this.state.number}
                                 isAnimation={this.state.isAnimation}
                                 promiseOnceLotteryResult={this.promiseOnceLotteryResult}
                                 promiseMoreLotteryResult={this.promiseMoreLotteryResult}/>
                </div>
                <div className="ball3">
                    <BalloonBoom path='images/pink.png' greyPath="images/pinkGrey.png" getPrizeType={this.getPrizeType}
                                 number={this.state.number}
                                 isAnimation={this.state.isAnimation}
                                 promiseOnceLotteryResult={this.promiseOnceLotteryResult}
                                 promiseMoreLotteryResult={this.promiseMoreLotteryResult}/>
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
            <div className="goodAddressBtn" onClick={()=>this.showAddress()}></div>
        </div>
    }
});
