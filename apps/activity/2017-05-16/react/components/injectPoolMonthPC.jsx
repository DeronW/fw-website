class InjectPoolMonthPool extends React.Component {
    render() {
        let {platBg,height} = this.props;
        return <div className="platformPC">
            <div className="platformBg" style={{ background: platBg }}>
                <a href="https://www.9888.cn" target="_blank">
                    <div className="injectPC">活动期间，累投越多可获分的奖金越多，快来注入！</div>
                </a>
                <img style={{ bottom: height + 64 }} src="images/water.png" alt="" />

                <div style={{ height: height }} className="pillars"></div>
            </div>
        </div>
    }
}