const StepThree = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        let successfulReturn;
        if(window.DOMAIN_ZX!=null){
            successfulReturn = <a className="return" href="http://www.gongchangzx.com/depository/recharge/toQRecharge.shtml">
                返回充值
            </a>
        }else{
            successfulReturn = <a className="return" href="https://www.9888.cn/depository/recharge/toQRecharge.shtml">
                返回充值
            </a>
        }
        return (
            <div className="thirdContent">
                <div className="markedWords">
                    <img src="images/success.png" alt=""/>
                    恭喜您，手机号修改成功！
                </div>
                {successfulReturn}
            </div>
        )
    }
})
