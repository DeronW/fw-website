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
        let {isLogin, timestamp} = this.props;
        console.log(timestamp);
        let july_start_time = this.standardTime(2017, 7, 13, 0, 0, 0);
        let july_end_time = this.standardTime(2017, 7, 23, 0, 0, 0);
        console.log(july_start_time)
        console.log(july_end_time)
        if (timestamp < july_start_time) {
            ReactDOM.render(<PopStartOrEnd text="活动尚未开始"/>, document.getElementById("pop"))
        } else if (timestamp > july_end_time) {
            ReactDOM.render(<PopStartOrEnd text="活动已结束"/>, document.getElementById("pop"))
        }

        return <div className="july_pc_box">
            this is pc box
            <BottomShow isLogin={isLogin}/>
        </div>
    }
}

class BottomShow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let isLogin = this.props.isLogin;
        let logged = <div className="log-box logged-box">
            活动内，您可以邀请50人参与活动，如何邀请 | 立即投资
        </div>;
        let unlogged = <div className="log-box unlogged-box">
            请登录后查看您活动内的邀友和投标情况，立即登录 | 如何邀请
        </div>;
        return <div className="bottom-box">
            {isLogin ? logged : unlogged}
        </div>
    }
}

class PopStartOrEnd extends React.Component {
    render() {
        let {text} = this.props
        return <div className="pop_notbegun_box">
            <div className="pop_notbegun_text">
                {text}
            </div>
        </div>
    }
}

