const MobileContainer = React.createClass({
    getInitialState: function () {
        return ({
            isIOS: false,
        })
    },
    render: function () {
        var iosStyle = {
            marginTop: this.state.isIOS ? 0 : "78px"
        };
        return (
            <div className="mobileContainer" style={iosStyle}>
                <div className="mobileBanner"></div>
                <div className="mobileWeekPack">
                    <div className="weekTitle"></div>
                    <div className="weekText">单周邀请有效好友人数达标，邀请人获不同级别的工豆奖励。</div>
                    <div className="weekAward">本周（1.6-1.12）内，您有效邀友<em>50</em>人，可获工豆<em>100</em>元。&nbsp;&nbsp;
                        <div className="beforeWeek" onClick={()=>{this.getWeekLadder()}}>往周邀友奖励</div>
                    </div>
                    <div className="weekInvite"></div>
                    <div className="weekRemind">温馨提示： 每人按最高标准，仅可获得一个标准奖励。</div>
                </div>
            </div>
        );
    }
});
