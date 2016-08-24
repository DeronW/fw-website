(function () {

    const Investment = React.createClass({
        render: function () {
            let ft = '20px';
            if (this.props.sequence == 0) {
                ft = '50px'
            } else if (this.props.sequence == 1) {
                ft = '35px'
            } else if (this.props.sequence == 2) {
                ft = '25px'
            }
            return (
                <div className="invest-item">
                    <div className="sequence" style={{ fontSize: ft }}>{this.props.sequence + 1}</div>
                    <div>
                        <img src={this.props.avatar}/>
                        <div className="name">
                            <div className="username">{this.props.username} ({this.props.province})</div>
                            <div className="sex"></div>
                        </div>
                        <div className="money">
                            在 {this.props.project_name} 项目中, 投资了
                            <div className="num" style={{fontSize: ft}}> {this.props.money}
                                <span className="" style={{fontSize: "14px", position: "relative", top: "-4px"}}>元</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    });

    const TopInvestment = React.createClass({
        getInitialState: function () {
            /*
             single_item = {
             key: (new Date()).toISOString(),
             username: msg.data.name,
             money: msg.data.money,
             avatar: '',
             project_name: '',
             sex: 'male',
             province: msg.data.province,
             city: msg.data.city
             }
             */
            this._total_invest_money = 0;
            return {invest_list: [], total_invest: 0}
        },
        receiveInvestMessage: function (invest) {
            let invest_list = this.state.invest_list;
            invest_list.push(invest);
            invest_list.sort((a, b) => b.money - a.money);
            if (invest_list.length > 7) invest_list.shift();
            this.setState({invest_list: invest_list});
            this.addInvestMoney(invest.money);
        },
        addInvestMoney: function (money) {
            this._total_invest_money += money;
            window.clearInterval(this._total_invest_timer);
            this._total_invest_timer = setInterval(this.increaseTotalInvestHandler, 30);
        },
        increaseTotalInvestHandler: function () {
            let total_invest;
            if (this.state.total_invest < this._total_invest_money - 10) {
                total_invest = this.state.total_invest + 10;
            } else {
                total_invest = this._total_invest_money;
                window.clearInterval(this._total_invest_timer);
            }
            this.setState({total_invest: total_invest});
        },
        render: function () {

            let invest = (data, index) => <Investment {...data} key={data.key} sequence={index}/>;
            let total_invest_fs = this.state.total_invest < this._total_invest_money ? '40px' : '30px';

            let total_invest_top = this._pendulum ? '-3px' : '0px';
            this._pendulum = !this._pendulum;
            if (this.state.total_invest >= this._total_invest_money) total_invest_top = '0px';

            return (
                <div className="top-investment">
                    <div className="today-title">今日投资排行榜</div>
                    <div className="today-total">
                        今日总投资: &yen;
                        <span style={{fontSize: total_invest_fs, top: total_invest_top}}>
                            {formatCurrency(this.state.total_invest)} </span>
                    </div>
                    {this.state.invest_list.map(invest)}
                </div>
            )
        }
    });

    const Investing = React.createClass({
        getInitialState: function () {
            return {
                invest_list: [
                    {
                        username: 'xxx',
                        money: '9,888.01',
                        avatar: 'http://lorempixel.com/g/100/100/',
                        project_name: 'PROJECT',
                        sex: 'male'
                    }]
            }
        },
        receiveMessage: function (msg) {
            let invest_list = this.state.invest_list;
            invest_list.push(msg);
            if (invest_list.length > 20) invest_list.pop();

            this.setState({invest_list: invest_list});
        },
        render: function () {
            let invest = (data, index) => {
                return (
                    <div key={data.key}>got new message</div>
                )
            };
            return (
                <div className="investing-news">
                    <div className="bg"></div>
                    <div> {this.state.invest_list.map(invest)} </div>
                </div>
            )
        }
    });


    window.TopInvestmentPanel = ReactDOM.render(<TopInvestment/>, document.getElementById('topInvestment'));
    window.InvestingPanel = ReactDOM.render(<Investing/>, document.getElementById('mapTR'));

    // 模拟投资
    // http://10.10.100.104:8080/logtest/invest?ip=111.202.74.131&name=XXXX

})();

function formatCurrency(price) {
    var p = parseFloat(price), i = Math.abs(parseInt(p)), j = parseInt(Math.abs(p) * 10 * 10 - i * 100), s = [];
    while (i > 1000) {
        i = i / 1000;
        s.push(((i.toString().split('.')[1] || '' ) + '000').substr(0, 3));
        i = parseInt(i);
    }
    s = (i == 1000 ? ['1', '000'] : [i.toString()]).concat(s.reverse());
    return (p >= 0 ? '' : '-') + s.join(',') + (j ? '.' + (j < 10 ? '0' + j : j) : '')
}