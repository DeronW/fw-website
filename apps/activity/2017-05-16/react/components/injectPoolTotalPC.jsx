class InjectPoolTotalPool extends React.Component {
    render() {
        let { platTotalBg, totalHeight } = this.props;
        return <div className="platformTotalPC">
            <div className="platformBg" style={{ background: platTotalBg }}>
                <a href="https://www.9888.cn/" target="_blank">
                    <div className="injectPC">活动期间，累投越多可获分的奖金越多，快来注入！</div>
                </a>
                <img style={{ bottom: totalHeight + 64 }} src="images/waterTotal.png" alt="" />

                <div style={{ height: totalHeight }} className="pillars"></div>
            </div>
        </div>
    }
}