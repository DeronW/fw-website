const ProductPurpleMobile= React.createClass({
    render: function () {
        return(
            <div className="productPurpleMobile">
                <img className="productImg" src={this.props.product.img} alt=""/>
                <div className="productBg"></div>
                <div className="productText">累计投资年化<em>{this.props.product.num}</em>万</div>
                <div className="productName">{this.props.product.name}</div>
            </div>
        )
    }
});