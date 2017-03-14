const ProductListAuto = React.createClass({
    getInitialState(){
        return {
            products: [],
            singleProduct: []
        }
    },
    componentDidMount(){
        this.resortHandler();
        this.rewardPoolHandler();
    },
    resortHandler(){
        $.get("./javascripts/getPersonDate.json", (data)=> {
            this.setState({products: data.data.list})
        }, "json")
    },
    rewardPoolHandler(){
        $.get("./javascripts/once.json", (data)=> {
            this.setState({singleProduct: data.data.list})
        }, "json")
    },
    //componentWillReceiveProps(nextProps){
    //    if (nextProps.singleProduct) {
    //        console.log(nextProps.singleProduct);
    //        this.setState({singleProduct: nextProps.singleProduct})
    //    }
    //},
    render(){
        let {products,singleProduct} = this.state, sum = products.length;
        products && singleProduct.forEach((item, index)=> {
            products.forEach((p,i)=>{
                if (item.id === products[i].id) {
                    products[i].selected = true;
                    products[i].number = item.number;
                }
            });
        });
        //console.log(this.state.products);
        let group = (arr, size) => {
            var r = [];
            arr = arr || [];
            for (var i = 0; i < arr.length; i += size) {
                r.push(arr.slice(i, i + size))
            }
            return r
        };
        let column = (rows) => {
            let fnCell = (cell, index) => {
                return <div className="cell" key={index}>
                    <div className="productPicture">
                        <img src={cell.picture} alt=""/>

                        <div className={cell.selected?"":'shade'}></div>
                        <div
                            className={(cell.selected && cell.number > 1)?"productNumber":''}>{(cell.selected && cell.number > 1) ? cell.number : ''}</div>
                    </div>
                    <div
                        className={cell.selected?"productName":"productNameShade productName"}>{cell.goodsname}</div>
                </div>
            };
            let fnRow = (row, index)=> {
                return <div className={"row row-col-" + row.length} key={index}>{row.map(fnCell)}</div>
            };
            return <div>{rows.map(fnRow)}</div>
        };
        let items_c_1, items_c_2, items_c_3;
        if (sum === 1) {
            items_c_1 = products;
        }
        if (sum === 2 || (sum > 3 && sum % 3 !== 0)) {
            if (sum % 3 == 2) items_c_2 = products.slice(Math.max(0, sum - 2));
            if (sum % 3 == 1) items_c_2 = products.slice(Math.max(0, sum - 4));

        }
        if (sum >= 3) {
            let cur;
            if (sum % 3 == 0) cur = sum;
            if (sum % 3 == 2) cur = sum - 2;
            items_c_3 = products.slice(0, Math.max(0, cur));
        }
        return <div className="productListAuto">
            {column(group(items_c_3, 3))}
            {column(group(items_c_2, 2))}
            {column(group(items_c_1, 1))}
        </div>
    }
});