const MoneyPanel = React.createClass({
    getInitialState: function () {
        return {
            tab_name: '未使用'
        }
    },
    toggleListHandle: function (name) {
        if (name == this.state.tab_name) return;
        this.setState({tab_name: name})
    },
    render: function () {
        let {
            availableAmount,
            availableNumber,
            willExpireNumber,
            willExpireAmount,
            usedNumber,
            usedAmount
        } = this.props.data;

        let tab = (name, index) => {
            return (
                <div key={index} className={this.state.tab_name == name ? "centerList" : null}
                     onClick={() => this.toggleListHandle(name)}>
                    {name}
                </div>
            )
        };

        let th_rows;
        if (this.state.tab_name == '未使用') {
            th_rows = ['面值(元)', '所需投资现金(元)', '可投标期限(元)', '有效期', '备注', '操作'];
        }


        return (

            <div className="containerCenter">

                <div className="containerCenterTitle">
                    <div className="centerTitleLeft centerTitleCom">
                        <div>
                            可用返现券 <em>{availableNumber}</em> 张
                            {availableAmount ? '，共' : null}
                            {availableAmount ? <em>${availableAmount}</em> : null}
                            {availableAmount ? '元' : null}
                        </div>
                    </div>
                    <div className="centerTitleCenter centerTitleCom">
                        <div>
                            即将过期 <em>{willExpireNumber}</em> 张
                            {willExpireAmount ? '（' : null}
                            {willExpireAmount ? <em>${willExpireAmount}</em> : null}
                            {willExpireAmount ? '）' : null}
                        </div>
                    </div>
                    <div className="centerTitleRight centerTitleCom">
                        <div>
                            已使用 <em>{usedNumber}</em> 张
                            {usedAmount ? '，共' : null}
                            {usedAmount ? <em>{usedAmount}</em> : null}
                            {usedAmount ? '元' : null}
                        </div>
                    </div>
                </div>

                <div className="containerCenterList">
                    { ['未使用', '已使用', '已过期', '已赠送'].map(tab) }
                </div>

                <div className="containerRecord">
                    <Table th_rows={th_rows} rows={[]}/>
                </div>
            </div>
        )
    }
});