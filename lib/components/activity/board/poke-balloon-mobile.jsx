const BalloonBoom = React.createClass({
    getInitialState(){
        return {
            bluePath: this.props.path,
            giftPath: ''
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
    render(){
        return <div className="pokeBalloonMobile">
            <div className="ball">
                <BalloonBoom path='images/blue.png'/>
            </div>
            <div className="ball2">
                <BalloonBoom path='images/purple.png'/>
            </div>
            <div className="ball3">
                <BalloonBoom path='images/pink.png'/>
            </div>
        </div>
    }
});