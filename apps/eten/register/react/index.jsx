$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
});

$(()=> {

    const Number = React.createClass({

        getInitialState: function () {
            let n = this.props.num,
                yi = parseInt(n / (10000 * 10000)),
                wan = parseInt((n % (10000 * 10000)) / 10000);
            let num2arr = (num, arr)=> num.toString().split('').forEach((i)=>arr.push(i));
            let yi_arr = [], wan_arr = [];

            num2arr(yi, yi_arr);
            num2arr(wan, wan_arr);

            return {
                yi_arr: [...yi_arr].map(x=>0),
                wan_arr: [...wan_arr].map(x=>0),
                target_yi_arr: yi_arr,
                target_wan_arr: wan_arr
            }
        },

        componentDidMount: function () {
            this._timer_count = 0;
            this._timer = setInterval(this.timerHandler, 1000)
        },

        timerHandler: function () {
            if (this._timer_count >= 9) {
                clearInterval(this._timer);
                return;
            }
            this.animate();
            this._timer_count++;
        },

        animate: function () {
            let yi_arr = this.state.yi_arr, wan_arr = this.state.wan_arr;

            for (let i = 0; i < yi_arr.length; i++) {
                if (yi_arr[i] < this.state.target_yi_arr[i])
                    yi_arr[i] = yi_arr[i] + 1;
            }

            for (let i = 0; i < wan_arr.length; i++) {
                if (wan_arr[i] < this.state.target_wan_arr[i])
                    wan_arr[i] = wan_arr[i] + 1;
            }

            this.setState({
                yi_arr: yi_arr,
                wan_arr: wan_arr
            });
        },

        render: function () {

            let num_field = (n, index) => {
                return (
                    <span className="money-number" key={index}>
                        <em>{n}</em>
                        <strong> </strong>
                    </span>
                )
            };

            return (
                <div className="earningDataBox">
                    <div className="yibox">
                        {this.state.yi_arr.map(num_field)}
                        <span className="yizi">亿</span>
                    </div>
                    <div className="yibox">
                        {this.state.wan_arr.map(num_field)}
                        <span className="yizi">万</span>
                        <span className="yizi">元</span>
                    </div>
                </div>
            )
        }
    });

    ReactDOM.render(<Number num={12 * 10000 * 10000 + 3400 * 10000}/>, document.getElementById('yibox'));
    ReactDOM.render(<Number num={56 * 10000 * 10000 + 3400 * 10000}/>, document.getElementById('yibox2'));
});