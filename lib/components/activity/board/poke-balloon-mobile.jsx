const BalloonBoom = React.createClass({
    getInitialState() {
        return {
            path: this.props.path,
            giftPath: '',
            prizeList: []
        }
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
        }, 40);
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
        }, 40);
    },
    render() {
        let pathStyle = {
            position: 'absolute',
            left: '0',
            top: '110px'
        };
        return <div className="ballBoom">
            <img className="giftBoom" src={this.state.giftPath} alt=""/>
            <img className="blueBalloon" onClick={this.judgeType}
                 style={this.state.path == 'images/giftMobile.png' ? pathStyle : {}} src={this.state.path}/>
        </div>
    }
});

const PokeBalloonMobile = React.createClass({
    getInitialState() {
        return {
            count: 1,
            type: 'single',
            giftPath:''
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
        this.setState({ giftPath: ''})
    },
    promiseOnceLotteryResult(){
        $.get("./javascripts/once.json", (data) => {
            this.showMessagePop('抱歉，系统异常', '', data.data.name)
        }, 'json')
    },
    promiseMoreLotteryResult(){
        $.get("./javascripts/getPersonDate.json", (data) => {
            this.setState({prizeList: data.data.list});
            this.showMessagePop('抱歉，抽奖异常', '', '', this.state.prizeList)
        }, 'json')
    },
    showMessagePop(title, message, productName, prizeList){
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
        return this.state.type
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
            <div className="ball">
                <BalloonBoom path='images/blue.png' getPrizeType={this.getPrizeType} number={this.state.number}
                             promiseOnceLotteryResult={this.promiseOnceLotteryResult}
                             promiseMoreLotteryResult={this.promiseMoreLotteryResult}/>
            </div>
            <div className="ball2">
                <BalloonBoom path='images/purple.png' getPrizeType={this.getPrizeType} number={this.state.number}
                             promiseOnceLotteryResult={this.promiseOnceLotteryResult}
                             promiseMoreLotteryResult={this.promiseMoreLotteryResult}/>
            </div>
            <div className="ball3">
                <BalloonBoom path='images/pink.png' getPrizeType={this.getPrizeType} number={this.state.number}
                             promiseOnceLotteryResult={this.promiseOnceLotteryResult}
                             promiseMoreLotteryResult={this.promiseMoreLotteryResult}/>
            </div>
            <div className="chanceBtn">
                {btn('使用1次机会', 'single')}
                {btn('使用10次机会', 'package')}
            </div>
        </div>
    }
});
