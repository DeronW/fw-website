const BalloonBoom = React.createClass({
    getInitialState(){
        return {
            bluePath: this.props.path,
            giftPath: ''
        }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.number){
            
        }
    },
    balloonBoomHandler(){
        var arr = ['images/balloonBoom.png', 'images/giftMobile.png'];
        var i = 0;
        var timer = setInterval(()=> {
            this.setState({bluePath: arr[i]});
            i++;
            if (i == 2) {
                this.giftBoomHandler();
                clearInterval(timer);
            }
        }, 40);
    },
    giftBoomHandler(){
        var gifts = ['images/gift1Mobile.png', 'images/gift2Mobile.png'];
        var i = 0;
        var timer2 = setInterval(()=> {
            this.setState({giftPath: gifts[i]});
            i++;
            if (i == 2) {
                clearInterval(timer2);
            }
        }, 40);
    },
    render(){
        let blueStyle = {
            position: 'absolute',
            left: '0',
            top: '110px'
        };
        return <div className="ballBoom">
            <img className="giftBoom" src={this.state.giftPath} alt=""/>
            <img className="blueBalloon" onClick={this.balloonBoomHandler}
                 style={this.state.bluePath == 'images/giftMobile.png' ? blueStyle:{}} src={this.state.bluePath}/>
        </div>
    }
});

const PokeBalloonMobile = React.createClass({
    getInitialState(){
        return {
            number: 1,
            btnTab: '使用1次机会',
            notOnceClick: 1,
            notTenClick: 10
        }
    },
    componentDidMount(){
        $.get("./javascripts/once.json", (data)=> {
            if (data.number < 10) {
                this.setState({notTenClick: 0})
            }
            if(data.number < 1){
                this.setState({notOnceClick: 0})
            }
        }, 'json')
    },
    changeNumberHandler(tab){
        this.setState({btnTab: tab});
        if(this.state.notClick){
            if (tab == '使用1次机会') {
                this.setState({number: 1})
            } else if (tab == '使用10次机会') {
                this.setState({number: 10})
            }
        }else{
            this.setState({number:0})
        }

    },
    render(){
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
        let btn = (item, index)=> {
            return <div key={index} className={this.state.btnTab == item?"active":""}
                        style={this.state.notTenClick ? {} : notClick}
                        onClick={()=>this.changeNumberHandler(item)}>{item}</div>
        };
        return <div className="pokeBalloonMobile">
            <div className="ball">
                <BalloonBoom path='images/blue.png' number={this.state.number}/>
            </div>
            <div className="ball2">
                <BalloonBoom path='images/purple.png' number={this.state.number}/>
            </div>
            <div className="ball3">
                <BalloonBoom path='images/pink.png' number={this.state.number}/>
            </div>
            <div className="chanceBtn">
                {
                    ['使用1次机会', '使用10次机会'].map(btn)
                }
            </div>

        </div>
    }
});