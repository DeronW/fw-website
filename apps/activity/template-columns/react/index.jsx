const Content = React.createClass({
    getInitialState() {
        return {
            products: [],
            num: 9
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
        this.setState({ products: p })
    },
    changeHandler(e) {
        this.setState({ num: parseInt(e.target.value) })
    },
    render() {
        let {products} = this.state, sum = products.length;

        let group = (arr, size) => {
            let r = [], block;
            arr = arr || [];
            for (let i = 0; i < arr.length; i += size) {
                r.push(arr.slice(i, i + size))
            }
            return r
        }

        let column = (rows) => {
            let fnCell = (cell, index) => {
                return <div className="cell" key={index}>
                    <div>
                        <img src="http://placehold.it/160x160" />
                    </div>
                    {cell}
                </div>
            }
            let fnRow = (row, index) => {
                return <div className={"row row-col-" + row.length} key={index}>{row.map(fnCell)}</div>
            }
            return <div> {rows.map(fnRow)} </div>;
        }

        let items_c_1, items_c_2, items_c_3, items_c_4;
        if (sum === 1) items_c_1 = products;
        if (sum === 2 || (sum > 4 && sum % 4 === 1))
            items_c_2 = products.slice(Math.max(0, sum - 2));

        if (sum === 3 || (sum > 4 && sum % 4 !== 0)) {
            if (sum % 4 == 3) items_c_3 = products.slice(Math.max(0, sum - 3));
            if (sum % 4 == 2) items_c_3 = products.slice(Math.max(0, sum - 6));
            if (sum % 4 == 1) items_c_3 = products.slice(sum - 5, sum - 2);
        }
        if (sum >= 4) {
            let cur;
            if (sum % 4 == 0) cur = sum;
            if (sum % 4 == 3) cur = sum - 3;
            if (sum % 4 == 2) cur = sum - 6;
            if (sum % 4 == 1) cur = sum - 5;
            items_c_4 = products.slice(0, Math.max(0, cur));
        }

        return (
            <div>
                <h2>test columns</h2>
                <input type="number" onChange={this.changeHandler} />
                <a onClick={this.resortHandler}>OK</a>

                <div className="products-container">
                    {column(group(items_c_4, 4))}
                    {column(group(items_c_3, 3))}
                    {column(group(items_c_2, 2))}
                    {column(group(items_c_1, 1))}
                </div>
            </div>
        )
    }
})

$(function () {
    ReactDOM.render(<Content />, CONTENT_NODE)
})
