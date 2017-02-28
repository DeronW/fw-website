const SlotMachinePC = React.createClass({
    getInitialState(){
        this.products = [
            {
                img: 'images/one.png',
                name: '苹果笔记本'
            },
            {
                img: 'images/two.png',
                name: '手环'
            },
            {
                img: 'images/three.png',
                name: '手机'
            },
            {
                img: 'images/one.png',
                name: '苹果笔记本'
            },
            {
                img: 'images/two.png',
                name: '手环'
            },
            {
                img: 'images/three.png',
                name: '手机'
            }
        ];
        return {
            arr: [],
            position: 0
        }
    },
    componentDidMount(){
        this.setState({
            arr: this.products
        });
    },
    closePopHandler(){
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    },
    onceLotteryDraw(){
        if(window.delay) return;
        window.delay = true;
        setTimeout(()=>{
            window.delay = false;
        },parseInt(Math.random() * 10) * 500);

        var destination = 30;

        var timer = setInterval(() => {
            if (destination >= (this.state.arr.length - 1) * 168) {
                destination = 30;
                this.setState({
                    position: destination
                });
            } else {
                destination += 30;
                this.setState({position: destination});
            }
        }, 30);

        setTimeout(()=> {
            let {position} = this.state;
            this.setState({
                position: parseInt(position / 168) * 168
            });
            clearInterval(timer);
            setTimeout(()=> {
                //ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} popMyPrize="我的奖品" popNoTitle="暂无中奖记录" popBtn="朕知道了"/>,document.getElementById('pop'))
                //ReactDOM.render(<PopMessage closePopHandle={this.closePopHandler} popTitle="抱歉，抽奖异常！" popText="请稍后再试，如需咨询请联系客服400-0322-988 。" popBtn="朕知道了"/>,document.getElementById('pop'))
                //ReactDOM.render(<PopOnePrize closePopHandle={this.closePopHandler} popPrize="1888工豆" popNumber="10" popBtn='继续抽奖'/>,document.getElementById('pop'))
                //ReactDOM.render(<PopZero closePopHandle={this.closePopHandler}/>,document.getElementById('pop'))

            }, 100)
        }, parseInt(Math.random() * 10) * 500);
    },
    tenLotteryDraw(){
        if(window.delay) return;
        window.delay = true;
        setTimeout(()=>{
            window.delay = false;
        },parseInt(Math.random() * 10) * 500 - 100);

        var destination = 30;
        this.products.push({
            img:"images/gift.png",
            name:'大礼包'
        });
        this.setState({
            arr:this.products
        });
        var timer = setInterval(() => {
            if (destination >= (this.state.arr.length - 1) * 168) {
                destination = 30;
                this.setState({
                    position: destination
                });
            } else {
                destination += 30;
                this.setState({position: destination});
            }
        }, 30);
        setTimeout(()=> {
            this.setState({
                position: 6 * 168
            });
            clearInterval(timer);
            setTimeout(()=> {
                ReactDOM.render(<PopTenPrice closePopHandle={this.closePopHandler} popNumber="10" popBtn="继续抽奖"/>,document.getElementById('pop'));
                this.products.pop({
                    img:"images/gift.png",
                    name:'大礼包'
                });
            }, 100)
        }, parseInt(Math.random() * 10) * 500);
    },

    render(){
        let noticePosition = {
            transform: 'translateY(-' + this.state.position + 'px)'
        };
        let products = (item, index) => {
            return <div className="product" key={index}>
                <img style={noticePosition} src={item.img} />
                <p style={noticePosition}>{item.name}</p>
            </div>
        };
        return <div className="slotShow">
            <div className="current">
                {this.state.arr.map(products)}
            </div>
            <div className="current current1">
                {this.state.arr.map(products)}
            </div>
            <div className="current current2">
                {this.state.arr.map(products)}
            </div>
            <div className="onceBtn" onClick={this.onceLotteryDraw}>抽奖一次</div>
            <div className="tenBtn" onClick={this.tenLotteryDraw}>抽奖十次</div>
            <div className="onceText">消耗1次抽奖机会</div>
            <div className="tenText">消耗10次抽奖机会</div>
        </div>
    }
});
