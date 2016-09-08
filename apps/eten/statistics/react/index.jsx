const Header = React.createClass({
    getInitialState: function () {
        return {
            total: 0,
            today: 0
        }
    },
    receiveInterestMsg: function (msg) {
        this.setState({
            today: msg.today,
            total: msg.total
        })
    },
    render: function () {
        var d = new Date();
        let date = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;

        return (
            <div className="header">
                <a href="/" className="logo"> <img src="images/logo.png"/> </a>
                <div className="title">交易直播室</div>

                <div className="date">{date}</div>

                <div className="transaction"> 投资总金额
                    <span>{parseInt(this.state.total / (10000 * 10000))}</span>亿
                    <span>{parseInt(this.state.total % (10000 * 10000) / 10000)}</span>万元
                </div>
                <div className="transaction"> 今日交易
                    <span>{parseInt(this.state.today / 10000)}</span>万元
                </div>
            </div>
        )
    }
});

const Ladder = React.createClass({
    getInitialState: function () {
        return {
            items: [{
                timestamp: +new Date(),
                province: '省份',
                phone: '联系电话',
                money: '0',
            }]
        }
    },
    receiveInterestMsg: function (msg) {
        // if (msg.money < 50000) return;

        var items = this.state.items;
        items.push({
            timestamp: msg.timestamp,
            province: msg.province,
            phone: msg.phone,
            money: msg.money
        });

        items.sort((a, b) => a.money < b.money);

        if (items.length >= 10) items.pop();
        this.setState({items: items});
    },
    render: function () {
        let row = (data) => {
            var d = new Date(data.timestamp);
            var time = d.toTimeString().split(' ')[0];

            return (
                <div className="row" key={data.timestamp}>
                    <div className="province">{data.province}</div>
                    <div className="phone">{data.phone}</div>
                    <div className="money">&yen;{format_currency(data.money)}</div>
                    <div className="time">{time}</div>
                </div>
            )
        };

        return <div className="ladder"> {this.state.items.map(row)} </div>;
    }
});

function format_currency(n) {
    n = parseInt(n);
    var s = n.toString().split('').reverse().join('');
    var m = s.match(/\d{3}/g) || [];
    var o = m.concat([s.substr(3 * m.length)]).join(',');
    var r = o.split('').reverse().join('');
    return r.indexOf(',') === 0 ? r.substr(1) : r;
}

$(function () {
    window._Header = ReactDOM.render(<Header/>, document.getElementById('header'));
    window._Ladder = ReactDOM.render(<Ladder/>, document.getElementById('ladder'));

    setTimeout(function () {
        location.reload()
    }, 3 * 60 * 60 * 1000);
});