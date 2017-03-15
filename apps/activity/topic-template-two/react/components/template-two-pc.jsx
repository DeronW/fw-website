const TemplateTwoPC = React.createClass({
    getInitialState(){
        return {
            num: 5,
            products: []
        }
    },
    componentDidMount() {
        this.resortHandler()
    },
    resortHandler() {
        let p = [];
        for (let i = 0; i < this.state.num; i++) {
            p.push(i + 1)
        }
        this.setState({products: p})
    },
    changeNumberHandler(e){
        this.setState({num: parseInt(e.target.value)})
    },
    render(){
        let {products} = this.state, sum = products.length;
        let item_4, item_3, item_2, item_1;
        if (sum === 1) item_1 = products;
        if (sum === 2 || sum / 4 > 0 && sum % 4 === 1) {
            item_2 = products.slice(sum - 2);
        }
        if (sum === 3 || sum / 4 > 0 && sum % 4 !== 0) {
            if (sum % 4 == 1) item_3 = products.slice(sum - 5, sum - 2);
            if (sum % 4 == 2) item_3 = products.slice(sum - 6);
            if (sum % 4 == 3) item_3 = products.slice(sum - 3);
        }
        if (sum >= 4) {
            let cur;
            if (sum / 4 == 0) cur = sum;
            if (sum / 4 == 1) cur = sum - 5;
            if (sum / 4 == 2) cur = sum - 6;
            if (sum / 4 == 3) cur = sum - 3;
            item_4 = products.slice(0, Math.max(0, cur));
        }
        let group = (arr, size)=> {
            let r = [];
            arr = arr || [];
            for (var i = 0; i < arr.length; i += size) {
                r.push(arr.slice(i, i + size))
            }
            return r
        };

        let columns = (rows, index)=> {
            let fnCell = (cell, index) => {
                return <div className="cell" key={index}>
                    <img src="" alt=""/>

                    <div>{cell}</div>
                </div>
            };
            let fnRow = (row, index)=> {
                return <div className="row" key={index}>{row.map(fnCell)}</div>
            };
            return <div className="column">{rows.map(fnRow)}</div>
        };

        return <div className="templateTwoPC">
            测试<input type="number" onChange={this.changeNumberHandler}/>
            {columns(group(item_4, 4))}
            {columns(group(item_3, 3))}
            {columns(group(item_2, 2))}
            {columns(group(item_1, 1))}
        </div>
    }
});