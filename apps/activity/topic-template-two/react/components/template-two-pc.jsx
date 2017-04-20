const TemplateTwoPC = React.createClass({
    getInitialState(){
        this.cellIndex = -1;
        this.rowIndex = -1;
        return {
            num:16,
            products: []
        }
    },
    componentDidMount() {
        this.resortHandler()
    },
    resortHandler() {
        $.get("./javascripts/once.json", (data)=> {
            this.setState({products: data.data.list})
        }, "json")
    },
    changeNumberHandler(e){
        this.setState({num: parseInt(e.target.value)})
    },
    getParamsFn(i){
        if (this.rowIndex % 3 == 0) {
            return <ProductBluePC product={this.state.products[i]}/>
        } else if (this.rowIndex % 3 == 1) {
            return <ProductOrangePC product={this.state.products[i]}/>
        } else if (this.rowIndex % 3 == 2) {
            return <ProductPurplePC product={this.state.products[i]}/>
        }

        //var r = {};
        //var search = location.search.substr(1);
        //if (!search) return r;
        //search.split("&").forEach(function (i) {
        //    var kv = i.split("="), k = kv[0], v = kv[1] || null;
        //    if (!isNaN(v)) v = parseFloat(v);
        //    r[k] = v;
        //});
        //if(r.debug === 'true'){
        //    if(r.template == "blue"){
        //        return <ProductBluePC product={this.state.products[i]}/>
        //    }else if(r.template == "orange"){
        //        return <ProductOrangePC product={this.state.products[i]}/>
        //    }else if(r.template == "purple"){
        //        return <ProductPurplePC product={this.state.products[i]}/>
        //    }
        //}
    },
    render(){
        let {products} = this.state, sum = products.length;
        let item_3, item_2, item_1;
        if (sum === 1) item_1 = products;
        if (sum === 2 || sum / 3 > 0) {
            if (sum % 3 == 1) item_2 = products.slice(sum - 4);
            if (sum % 3 == 2) item_2 = products.slice(sum - 2);
        }
        if (sum >= 3) {
            let cur = 0;
            if (sum % 3 == 0) cur = sum;
            if (sum % 3 == 1) cur = sum - 4;
            if (sum % 3 == 2) cur = sum - 2;
            item_3 = products.slice(0, Math.max(0, cur));
        }
        let group = (arr, size)=> {
            let r = [];
            arr = arr || [];
            for (var i = 0; i < arr.length; i += size) {
                r.push(arr.slice(i, i + size))
            }
            return r
        };

        let columns = (rows)=> {
            let fnCell = (cell, index) => {
                this.cellIndex += 1;
                return <div className="cell" key={index}>
                    {
                        this.getParamsFn(this.cellIndex)
                    }
                </div>
            };
            let fnRow = (row, index)=> {
                this.rowIndex += 1;
                return <div className={"row row-col-" + row.length} key={index}>
                    {row.map(fnCell)}
                </div>
            };
            return <div>{rows.map(fnRow)}</div>
        };

        return <div className="templateTwoPC">
            测试<input type="number" onChange={this.changeNumberHandler}/>
            {columns(group(item_3, 3))}
            {columns(group(item_2, 2))}
            {columns(group(item_1, 1))}
        </div>
    }
});

$(function () {
    ReactDOM.render(<TemplateTwoPC />, CONTENT_NODE)
})