class JulyPc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {

    }

    standardTime = (year, month, day, hours, minutes, seconds) => {
        let d = new Date();
        d.setFullYear(year || 0);
        d.setMonth(month - 1 || 0);
        d.setDate(day || 0);
        d.setHours(hours || 0);
        d.setMinutes(minutes || 0);
        d.setSeconds(seconds || 0);
        d.setMilliseconds(0);
        return new Date(d).getTime()
    }

    render() {
        let {isLogin, timestamp, gotoLogin, closePopHandler} = this.props;
        console.log(timestamp);
        let july_start_time = this.standardTime(2017, 7, 13, 0, 0, 0);
        let july_end_time = this.standardTime(2017, 8, 15, 0, 0, 0);
        console.log(`pc:${july_start_time}`)
        console.log(`pc:${july_end_time}`)
        if (timestamp < july_start_time) {
            ReactDOM.render(<PopStartOrEnd text="活动尚未开始"/>, document.getElementById("pop"))
        } else if (timestamp > july_end_time) {
            ReactDOM.render(<PopStartOrEnd text="活动已结束"/>, document.getElementById("pop"))
        }

        return <div className="july-pc-box">
            <div className="section-banner"></div>
            <div className="coupon-box"></div>
            <div className="welfare-box"></div>
            <div className="fight-box"></div>
            <div className="explain-box"></div>
            this is pc box
            <BottomShow isLogin={isLogin} gotoLogin={gotoLogin} closePopHandler={closePopHandler}/>
        </div>
    }
}

class BottomShow extends React.Component {
    constructor(props) {
        super(props)
    }

    showHowInvite = () => {
        ReactDOM.render(<PopInvitePC gotoLogin={this.props.gotoLogin}
                                     closePopHandler={this.props.closePopHandler}/>, document.getElementById("pop"))
    }

    render() {
        let isLogin = this.props.isLogin;
        let logged = <div className="log-box logged-box">
            活动内，您可以邀请50人参与活动，
            <div className="invite-pc-pre" onClick={() => {
                this.showHowInvite()
            }}>如何邀请
            </div>
            |
            <a href="">立即投资</a>
        </div>;
        let unlogged = <div className="log-box unlogged-box">
            请登录后查看您活动内的邀友和投标情况，立即登录 | 如何邀请
        </div>;
        return <div className="bottom-box">
            {isLogin ? logged : unlogged}
        </div>
    }
}


