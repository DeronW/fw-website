const NumberBoard = React.createClass({
    getInitialState: function () {
        let n = this.props.num;
        let yizi = parseInt(n / (10000 * 10000));  //得到亿位显示的数字
        let wan = parseInt((n % (10000 * 10000) / 10000)); //得到万位显示的数字
        let wan_arr = [];
        let yizi_arr = [];
        //把数字分割开来的函数
        // let num2arr=(num,arr)=>num.toString().split("").forEach((i)=>arr.push)(i);
        let num2arr = (num, arr)=> num.toString().split('').forEach((i)=>arr.push(i));
        //然后进行判断
        if (yizi < 1) {
            num2arr(wan, wan_arr);
            return {
                yizi: yizi,
                wan_arr: [...wan_arr].map(x=>0),
                wan_target_arr: wan_arr
            }
        } else {
            num2arr(yizi, yizi_arr);
            num2arr(wan, wan_arr);
            return {
                yizi: yizi,
                yizi_arr: [...yizi_arr].map(x=>0),
                wan_arr: [...wan_arr].map(x=>0),
                yizi_target_arr: yizi_arr,
                wan_target_arr: wan_arr
            }

        }

    },
    //控制定时的函数
    componentDidMount: function () {
        this._timer_count = 0;
        this._timer = setInterval(this.timeHiddler, 500);

    },
    //对定时的条件进行判断
    timeHiddler: function () {
        if (this._timer_count >= 9) {
            clearInterval(this._timer);
        } else {
            this._timer_count++;
            this.animate();
        }
    },
    animate: function () {
        let yizi_arr = this.state.yizi_arr;
        let wan_arr = this.state.wan_arr;
        let yizi = this.state.yizi;
        if (yizi >= 1) {
            for (let z = 0; z < yizi_arr.length; z++) {
                if (yizi_arr[z] < this.state.yizi_target_arr[z]) {
                    yizi_arr[z] = yizi_arr[z] + 1;
                }
            }
            for (let j = 0; j < wan_arr.length; j++) {
                if (wan_arr[j] < this.state.wan_target_arr[j]) {
                    wan_arr[j] = wan_arr[j] + 1;
                }
            }
        } else {
            for (let i = 0; i < wan_arr.length; i++) {
                if (wan_arr[i] < this.state.wan_target_arr[i]) {
                    wan_arr[i] = wan_arr[i] + 1;
                }
            }
        }
        this.setState({
            yizi_arr: yizi_arr,
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
        if (this.state.yizi < 1) {
            return (
                <div className="earningDataBox">
                    <div className="yibox">
                        {this.state.wan_arr.map(num_field)}
                        <span className="yizi">万</span>
                        <span className="yizi">元</span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="earningDataBox">
                    <div className="yibox">
                        {this.state.yizi_arr.map(num_field)}
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
    }
});

$(function () {
    $.get(API_PATH + "/cms/api/dealstatis.php", null, function (data) {
        ReactDOM.render(<NumberBoard num={data.totalDeals}/>, document.getElementById('yibox'));
        ReactDOM.render(<NumberBoard num={data.totalInterests}/>, document.getElementById('yibox2'));
        ReactDOM.render(<NumberBoard num={data.userCount}/>, document.getElementById('yibox3'));
    }, 'json');
});

$(function () {
    $("#redcash").on("mouseenter", function () {
        $("#redbag1").css("display", "block").removeClass().addClass("redbag1");
        $("#redbag2").css("display", "block");
    }).on("mouseleave", function () {
        $("#redbag1").css("display", "none").removeClass().css({"left": "0", "top": "0"}).addClass("redbag1-down");
        $("#redbag2").css("display", "none");
    });

    $("#redcash2").on("mouseenter", function () {
        $("#redbag21").css("display", "block");
        $("#redbag22").css("display", "block");
    }).on("mouseleave", function () {
        $("#redbag21").css("display", "none");
        $("#redbag22").css("display", "none");
    });
    $("#redcash3").on("mouseenter", function () {
        $("#redbag31").css("display", "block");
        $("#redbag32").css("display", "block");
    }).on("mouseleave", function () {
        $("#redbag31").css("display", "none");
        $("#redbag32").css("display", "none");
    });

    $(".selectItem").on("mouseenter", function () {
        $(this).find("img").attr("src", "images/guide_selectlistB-0" + ($(this).index() + 1) + ".gif");
    }).on("mouseleave", function () {
        $(this).find("img").attr("src", "images/guide_selectlistB-0" + ($(this).index() + 1) + ".jpg");
    });
});

$(function () {
    // 鼠标滚动一定高度后显示
    $(document).scroll(function () {
        var top = $(document).scrollTop();
        if (top >= 400) {
            $(".scroll").css("display", "block");
        } else {
            $(".scroll").css("display", "none");
        }
    });
});