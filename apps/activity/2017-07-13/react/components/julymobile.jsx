class JulyMobile extends React.Component {
    constructor() {
        super()
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
        let {isLogin, timestamp} = this.props
        let july_start_time = this.standardTime(2017, 7, 13, 0, 0, 0);
        let july_end_time = this.standardTime(2017, 8, 15, 0, 0, 0);
        console.log(`mobile:${july_start_time}`)
        console.log(`mobile:${july_end_time}`)
        if (timestamp < july_start_time) {
            ReactDOM.render(<PopStartOrEnd text="活动尚未开始"/>, document.getElementById("pop"))
        } else if (timestamp > july_end_time) {
            ReactDOM.render(<PopStartOrEnd text="活动已结束"/>, document.getElementById("pop"))
        }
        return <div className="july-mobile-box">
            this is mobile box
        </div>
    }
}
