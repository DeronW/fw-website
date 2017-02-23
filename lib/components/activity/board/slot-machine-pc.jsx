const SlotMachinePC = React.createClass({
    getInitialState(){
        this.imgs = ["images/one.png", "images/two.png", "images/three.png", "images/one.png", "images/two.png", "images/three.png"];
        this.productsName=['苹果笔记本','智能手环','智能手机','苹果笔记本','智能手环','智能手机'];
        return {
            arr: [],
            position: 0
        }
    },
    componentDidMount(){
        this.setState({
            arr: this.imgs
        });

    },
    lotteryDraw(){
        var destination = 30;
        var count = 0;
        var iSpeed = 0;
        let timer = setInterval(() => {
            if (destination >= (this.state.arr.length - 1) * 138) {
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
                position: parseInt(position / 138) * 138
            });
            clearInterval(timer);
            console.log(this.productsName[parseInt(position / 138)]);
        }, parseInt(Math.random() * 10) * 500)
    },
    render(){
        let noticePosition = {
            transform: 'translateY(-' + this.state.position + 'px)'
        };
        let img = (item, index) => {
            return <img style={noticePosition} key={index} src={item} alt=""/>
        };
        return <div className="imgShow">
            <div className="current">
                {this.state.arr.map(img)}
            </div>
            <div className="btn" onClick={this.lotteryDraw}>抽奖</div>
        </div>
    }
});