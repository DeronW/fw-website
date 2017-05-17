class InjectPoolMonthPool extends React.Component {
    render() {
        let {platBg,height} = this.props;
        let bg = {
             background: platBg
         }
        let bottomStyle = { 
            bottom: height + 64
         }
        let heightStyle = { 
            height: height
         }
        return <div className="platformPC">
            <div className="platformBg" style={bg}>
                <a href="https://www.9888.cn" target="_blank">
                    <div className="injectPC">活动期间，累投越多可获分的奖金越多，快来注入！</div>
                </a>
                <img style={bottomStyle} src="images/water.png" alt="" />

                <div style={heightStyle} className="pillars"></div>
            </div>
        </div>
    }
}