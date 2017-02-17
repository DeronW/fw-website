const TemplateMobile = React.createClass({
   render: function () {
       let productBlue1 = {
           num:'≥10',
           name:'送SK-II PITERA基础护肤奇迹套装',
           img:'http://placehold.it/234x234'
       };
       let productBlue2 = {
           num:'≥15',
           name:'送SK-II PITERA基础护肤奇迹套装'
       };
       let productPurple1 = {
           num:'≥20',
           name:'送SK-II PITERA基础护肤奇迹套装'
       };
       let productPurple2 = {
           num:'≥30',
           name:'送SK-II PITERA基础护肤奇迹套装'
       };
       let productOrange1 = {
           num:'≥35',
           name:'送SK-II PITERA基础护肤奇迹套装'
       };
       let productOrange2 = {
           num:'≥40',
           name:'送SK-II PITERA基础护肤奇迹套装'
       };
       return(
           <div className="templateMobile" style={this.props.bg}>
                <div className="productListMobile">
                    <div className="col-4">
                        <ProductBlueMobile className="item" product={productBlue1} />
                        <ProductBlueMobile product={productBlue2} />
                        <ProductBlueMobile product={productPurple1} />
                        <ProductBlueMobile product={productPurple2} />
                    </div>
                    <ProductBlueMobile product={productOrange1} />
                    <ProductBlueMobile product={productOrange2} />
                </div>
           </div>
       )
   }
});