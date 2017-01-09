const StepThree = React.createClass({
    getInitialState: function () {
        return {
        }
    },
    render: function () {
        return (
            <div className="thirdContent">
                <div className="markedWords">
                    <img src="images/success.png" alt="" />
                    恭喜您，手机号修改成功！
                </div>
                <a className="return" href="#">
                    返回充值
                </a>
            </div>
        )
    }
})
