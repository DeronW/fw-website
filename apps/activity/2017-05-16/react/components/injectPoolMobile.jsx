class InjectPoolMobile extends React.Component {
    state = {
        showWater: false
    }
    closeWaterRemain() {
        this.setState({ showWater: false })
    }
    showWaterRemain() {
        this.setState({ showWater: true })
    }
    render() {
        let { platBg, height, platTotalBg, totalHeight, ladder } = this.props;
        console.log(totalHeight);
        let monthBg = {
            background: platBg
        };
        let totalBg = {
            background: platTotalBg
        };
        let bottomMonthStyle = {
            bottom: height && height + 67
        };
        let heightMonthStyle = {
            height: height
        };
        let bottomTotalStyle = {
            bottom: totalHeight && totalHeight + 67
        };
        let heightTotalStyle = {
            height: totalHeight
        };
        let waterStyle = {
            display: this.state.showWater ? "block" : "none"
        };
        let monthPart = (
            <div className="platformMobile" >
                <div className="platformBg" style={monthBg}>
                    <div className="injectText" style={waterStyle}>活动期间，累投越多可获分的奖金越多，快来注入！</div>
                    <div className="injectWater" onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.toggleWaterRemain()
                    }}></div>
                    <img style={bottomMonthStyle} src="images/waterMobile.png" alt="" />

                    <div style={heightMonthStyle} className="pillars"></div>`
                </div>
            </div>
        )
        let totalPart = (
            <div className="platformTotalMobile" >
                <div className="platformBg" style={totalBg}>
                    <div className="injectText" style={waterStyle}>活动期间，累投越多可获分的奖金越多，快来注入！</div>
                    <div className="injectWater" onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.toggleWaterRemain()
                    }}></div>
                    <img style={bottomTotalStyle} src="images/zongbang.png" alt="" />

                    <div style={heightTotalStyle} className="pillars"></div>
                </div>
            </div>
        )
        return <div>
            {ladder == "month" ? monthPart : totalPart}
        </div>
    }
}