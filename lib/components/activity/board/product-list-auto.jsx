const ProductListAuto = React.createClass({
    getInitialState(){
        return {
            products: [{
                img: 'http://placehold.it/138?text=1',
                name: 'name',
                prizeMark: 1
            }, {
                img: 'http://placehold.it/138?text=2',
                name: 'name',
                prizeMark: 2
            }, {
                img: 'http://placehold.it/138?text=3',
                name: 'name',
                prizeMark: 3
            }, {
                img: 'http://placehold.it/138?text=4',
                name: 'name',
                prizeMark: 4
            }, {
                img: 'http://placehold.it/138?text=5',
                name: 'name',
                prizeMark: 5
            }, {
                img: 'http://placehold.it/138?text=2',
                name: 'name',
                prizeMark: 6
            }, {
                img: 'http://placehold.it/138?text=3',
                name: 'name',
                prizeMark: 7
            }, {
                img: 'http://placehold.it/138?text=4',
                name: 'name',
                prizeMark: 8
            }, {
                img: 'http://placehold.it/138?text=5',
                name: 'name',
                prizeMark: 9
            }],
            singleProduct: []
        }
    },
    componentDidMount(){
        this.rewardPoolHandler();
    },
    rewardPoolHandler(){
        $.get(API_PATH + "/api/activityPullInvest/v1/myPrizeRecordListApp.json").then(data => {
            this.setState({singleProduct: data.data.pageData.result})
        })
    },
    render(){
        let {products,singleProduct} = this.state, sum = products.length;
        singleProduct && singleProduct.forEach((item, index)=> {
            products.forEach((p, i)=> {
                if (item.prizeMark === products[i].prizeMark) {
                    products[i].selected = true;
                    products[i].count = item.count;
                }
            });
        });
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
                            className={(cell.selected && cell.count > 1)?"productNumber":''}>{(cell.selected && cell.count > 1) ? cell.count : ''}</div>
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