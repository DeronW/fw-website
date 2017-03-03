const PopAllSituation = React.createClass({
    render(){
        let product = (item, index) => {
            return <tr key={index}>
                <td>{item.goodsname}</td>
                <td>X{item.id}</td>
            </tr>
        };
        return <div className="popAllSituation">
            <div className="popAllContent">
                <div className="popTitle">{this.props.popTitle}</div>
                <div className="popText" dangerouslySetInnerHTML={{__html:this.props.popText}}></div>
                <div className="popOneProduct">{this.props.popOneProduct}</div>
                <table className="popTable">
                    <tbody>
                    {this.props.popMoreProducts ? this.props.popMoreProducts.map(product) : ''}
                    </tbody>
                </table>
                <div className="knowPop"
                     onClick={this.props.closePopHandler}>{this.props.popBtn ? this.props.popBtn : ''}</div>
            </div>
        </div>
    }
});