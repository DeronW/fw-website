const ExchangePanel = React.createClass({
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
            unUseCount,
            overCount,
            useCount
        } = this.props.data;

        let tab = (name, index) => {
            return (
                <div key={index} className={this.state.tab_name == name ? "centerList" : null}
                     onClick={() => this.toggleListHandle(name)}>
                    {name}
                </div>
            )
        };

        return (
            <div>
                <div className="containerCenter">
                    <div className="containerCenterTitle">
                        <div className="centerTitleLeft centerTitleCom">
                            <div>
                                可用兑换券 <em>{unUseCount}</em> 张
                            </div>
                        </div>
                        <div className="centerTitleCenter centerTitleCom">
                            <div>
                                即将过期 <em>{overCount}</em> 张
                            </div>
                        </div>
                        <div className="centerTitleRight centerTitleCom">
                            <div>
                                已使用 <em>{useCount}</em> 张
                            </div>
                        </div>
                    </div>

                    <div className="containerCenterList">
                        { ['未使用', '已使用', '已过期'].map(tab) }
                    </div>

                    <div className="containerRecord">
                        <Table th_rows={['名称', '商品编号', '价格', '有效期', '来源', '备注']}
                               fnFilterData={x=>x} fnLoadData={x=>x}
                        />
                    </div>
                </div>
            </div>
        )
    }
});

ExchangePanel.fn = function () {
    console.log(11)
};