const TemplatePC = React.createClass({
    getInitialState:function(){
        return {
            a:1
        }
    },
    render:function(){
        let productBlue1 = {
          num:'≥10',
          name:'送SK-II PITERA基础护肤奇迹套装',
            img:'http://placehold.it/280x280'
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
            <div className="templateMainPC" style={this.props.bg}>
                <BannerPC/>
                <TitlePC/>
                <div className="productListPC">
                    <ProductBluePC product={productBlue1} />
                    <ProductBluePC product={productBlue2} />
                    <ProductPurplePC product={productPurple1} />
                    <ProductPurplePC product={productPurple2} />
                    <ProductOrangePC product={productOrange1} />
                    <ProductOrangePC product={productOrange2} />
                </div>
                <ActivityExplainPC />
            </div>
        )
    }
});