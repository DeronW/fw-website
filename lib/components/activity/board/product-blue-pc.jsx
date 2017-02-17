const ProductBluePC= React.createClass({
    render: function () {
        return(
            <div className="productBluePC">
                <img className="productImg" src="http://placehold.it/280x280" alt=""/>
                <div className="productBg"></div>
                <div className="productText">累计投资年化<em>{this.props.product.num}</em>万</div>
                <div className="productName">{this.props.product.name}</div>
            </div>
        )
    }
});