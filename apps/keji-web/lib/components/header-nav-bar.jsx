class HeaderNavBar extends React.Component {
    state = {
        isLogin: false,
        isVip: false,
        isBuyZxProduct:false,
        isComplianceOpen: true,
    }
    componentDidMount(){
        $.ajax({
            url: API_PATH + '/api/user/v1/checkComplianceIsOpen.json',
            type:'POST',
            dataType: 'json',
        }).done( data => {
            let d = data.data
            console.log(d.isBuyZxProduct)
            this.setState({
                isVip:d.isVip,
                isLogin:d.isLogin,
                isBuyZxProduct:d.isBuyZxProduct,
                isComplianceOpen:d.isComplianceOpen,
            })
        })
    }
    render() {
        let { isVip,isLogin,isBuyZxProduct,isComplianceOpen} = this.state

        return <div className="header-nav-bar">
            <div className="container">
                <a href="/" className="header-nav-bar-logo"></a>
                <div className="header-nav-bar-links">
                    <li className="active"><a href="/">首页</a></li>
                    <li><a href="https://www.gongchangp2p.com" target="_blank">工场微金</a></li>
                    {
                        isComplianceOpen && isLogin && isVip  && isBuyZxProduct && <li><a href="http://www.gongchangzx.com" target="_blank">工场尊享</a></li>
                    }
                    {
                        !isComplianceOpen && <li><a href="http://www.gongchangzx.com" target="_blank">工场尊享</a></li>
                    }
                    <li><a href="https://www.easyloan888.com" target="_blank">我要借款</a></li>
                    <li><a id="_douge_mall" href="https://www.dougemall.com" target="_blank">豆哥商城</a></li>
                </div>
            </div>
        </div>
    }
}
