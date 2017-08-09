class StepThree extends React.Component {

    render() {
        let successfulReturn = <a className="return"
            href="/depository/recharge/toQRecharge.do">
            返回充值
        </a>

        return <div className="thirdContent">
            <div className="markedWords">
                <img src="images/success.png" alt="" />
                恭喜您，手机号修改成功！
                </div>
            {successfulReturn}
        </div>
    }
}
