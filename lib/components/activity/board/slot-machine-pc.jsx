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
                alert(this.state.arr[parseInt(position / 168)].name)
            }, 100)
        }, parseInt(Math.random() * 10) * 500);
    },
    tenLotteryDraw(){
        if(window.delay) return;
        window.delay = true;
        setTimeout(()=>{
            window.delay = false;
        },parseInt(Math.random() * 10) * 500);

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
                alert(this.state.arr[this.state.arr.length-1].name);
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
                <img style={noticePosition} src={item.img} alt=""/>

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
        </div>
    }
});