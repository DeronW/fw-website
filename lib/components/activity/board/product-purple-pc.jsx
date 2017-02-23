const ProductPurplePC= React.createClass({
    render: function () {
        return(
            <div className="productPurplePC">
                <img className="productImg" src={this.props.product.picture} alt=""/>
                <div className="productBg"></div>
                <div className="productText">累计投资年化<em>≥{this.props.product.levelprice/10000}</em>万</div>
                <div className="productName">{this.props.product.goodsname}</div>
            </div>
        )
    }
});