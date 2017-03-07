const OneArmBandit = React.createClass({
    getInitialState() {
        return {
            rotor_result: [null, null, null],
            prize_pool: [{
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
            }]
        }
    },
    componentDidMount() { },
    startHandler() {

    },
    render() {
        let { prize_pool } = this.state;

        return (
            <div className="bandit">
                <div>
                    {this.state.rotor_result.map(
                        (i, index) => <OneArmBandit.Rotor prize_pool={prize_pool}
                            result={i} key={index} />)}
                </div>
                <button onClick={this.startHandler} className="go">GO</button>
            </div>
        )
    }
})

OneArmBandit.Rotor = React.createClass({
    getInitialState() {
        return {
            target: null
        }
    },
    render() {
        let { prize_pool } = this.props;

        let prize = (i, index) => {
            return (
                <div key={index}>
                    <img src={i.img} />
                    {i.name}
                </div>
            )
        }

        return (
            <div className="rotor">
                {prize_pool.map(prize)}
            </div>
        )
    }
})
