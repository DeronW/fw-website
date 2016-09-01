const Header = React.createClass({
    getInitialState: function () {
        return {
            total: 15012289317,
            today: 12389412
        }
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
                timestamp: 1472201445773,
                province: '北京',
                phone: '189****2123',
                money: 93234,
            }, {
                timestamp: 1472201445774,
                province: '北京',
                phone: '189****2123',
                money: 293234,
            }, {
                timestamp: 1472201415773,
                province: '北京',
                phone: '189****2123',
                money: 193234,
            }, {
                timestamp: 1472201445776,
                province: '北京',
                phone: '189****2123',
                money: 12931234,
            }]
        }
    },
    receiveInterestMsg: function (msg) {
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
            var time = d.getHours() + ':' + d.getMinutes();

            let money = data.money.toString().match(/\d{3}/g).join(',');
            money

            return (
                <div className="row" key={data.timestamp}>
                    <div className="province">{data.province}</div>
                    <div className="phone">{data.phone}</div>
                    <div className="money">&yen;{data.money}</div>
                    <div className="time">{time}</div>
                </div>
            )
        };

        return (
            <div className="ladder">
                {this.state.items.map(row)}
            </div>
        )
    }
});

$(function () {
    ReactDOM.render(<Header/>, document.getElementById('header'));
    ReactDOM.render(<Ladder/>, document.getElementById('ladder'));

    setTimeout(function () {
        location.reload()
    }, 3 * 60 * 60 * 1000);
});