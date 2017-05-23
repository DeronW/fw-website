class InjectPoolPC extends React.Component {
    
    render() {
        let { platBg, height, platTotalBg, totalHeight, ladder } = this.props;
        let monthBg = {
            background: platBg
        };
        let totalBg = {
            background: platTotalBg
        };
        let bottomMonthStyle = {
            bottom: height + 64
        };
        let heightMonthStyle = {
            height: height
        };
        let bottomTotalStyle = {
            bottom: totalHeight + 64
        };
        let heightTotalStyle = {
            height: totalHeight
        };
        let monthPart = (
            <div className="platformPC">
                <div className="platformBg" style={monthBg}>
                    <a href="https://www.9888.cn" target="_blank">
                        <div className="injectPC">活动期间，累投越多可获分的奖金越多，快来注入！</div>
                    </a>
                    <img style={bottomMonthStyle} src="images/water.png" alt="" />

                    <div style={heightMonthStyle} className="pillars"></div>
                </div>
            </div>
        )
        let totalPart = (
            <div className="platformTotalPC">
                <div className="platformBg" style={totalBg}>
                    <a href="https://www.9888.cn/" target="_blank">
                        <div className="injectPC">活动期间，累投越多可获分的奖金越多，快来注入！</div>
                    </a>
                    <img style={bottomTotalStyle} src="images/waterTotal.png" alt="" />

                    <div style={heightTotalStyle} className="pillars"></div>
                </div>
            </div>
        )
        return <div>
            {ladder == "month" ? monthPart : totalPart}
        </div>
    }
}