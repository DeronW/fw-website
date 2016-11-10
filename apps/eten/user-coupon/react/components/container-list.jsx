
const ContainerList = React.createClass({
    render: function () {
        var name1 = ['未使用', '已使用', '已过期', '已赠送'];
        this.props.present ? name1 : name1 = ['未使用', '已使用', '已过期']
        return (
            <div className="containerCenterList">
                {
                    name1.map((n, index) => {
                        return <div key={index} className={this.props.listTab == n ? "centerList" : null}
                                    onClick={() => this.props.toggleListHandle(n, index)}>{n}
                        </div>
                    })
                }
            </div>
        )
    }
});
