class InjectPoolTotalPool extends React.Component {
    render() {
        let { platTotalBg, totalHeight } = this.props;
        let bg = {
             background: platTotalBg
         }
        let bottomStyle = { 
            bottom: totalHeight + 64
         }
        let heightStyle = { 
            height: totalHeight
         }
        return <div className="platformTotalPC">
            <div className="platformBg" style={bg}>
                <a href="https://www.9888.cn/" target="_blank">
                    <div className="injectPC">活动期间，累投越多可获分的奖金越多，快来注入！</div>
                </a>
                <img style={bottomStyle} src="images/waterTotal.png" alt="" />

                <div style={heightStyle} className="pillars"></div>
            </div>
        </div>
    }
}