const LotteryPC = React.createClass({
    getInitialState() {
        return {
            prize_list: [{
                img: 'http://placehold.it/138?text=1',
                name: 'name',
                id: 1
            }, {
                img: 'http://placehold.it/138?text=2',
                name: 'name',
                id: 2
            }, {
                img: 'http://placehold.it/138?text=3',
                name: 'name',
                id: 3
            }, {
                img: 'http://placehold.it/138?text=4',
                name: 'name',
                id: 4
            }, {
                img: 'http://placehold.it/138?text=5',
                name: 'name',
                id: 5
            }],
            result: null
        }
    },
    componentDidMount() {
        //setTimeout(() => {
        //    this.setState({ result: 4 })
        //}, 4000)
    },
    render() {
        //<SlotMachinePC />
        //<WinningListPC />
        return <SlotMachinePC prize_list={this.state.prize_list} result={this.state.result} />
    }
});
