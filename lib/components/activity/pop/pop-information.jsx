const PopInformation  = React.createClass({
    closePopHandler(){
        ReactDOM.unmountComponentAtNode(document.getElementById('pop'));
    },
    render(){
        return <div className="popInformation">
            <div className="popInformationContent">
                <div className="closePop" onClick={this.closePopHandler}></div>
                <div className="informationName informationBasic">
                    <label htmlFor="name">姓名</label>
                    <input type="text" id="name"/>
                </div>
                <div className="informationPhone informationBasic">
                    <label htmlFor="phone">手机</label>
                    <input type="text" id="phone"/>
                </div>
                <div className="informationAddress informationBasic">
                    <label htmlFor="address">地址</label>
                    <input type="text" id="address"/>
                </div>
            </div>
        </div>
    }
});