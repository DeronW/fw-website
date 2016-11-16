const Table = React.createClass({
    getInitialState: function () {
        /**
         *  page 当前是第几页
         *  total_page 总共第几页
         *  th_rows 标题
         *  rows 数据 二维数组
         */
        return {
            page: 1,
            total_page: 1,
            th_rows: this.props.th_rows || [],
            rows: []
        }
    },
    switchPageHandler: function (type) {
        // 4种换页方式. 首页, 尾页, 上一页, 下一页
        let {page, total_page} = this.state, new_page;
        if (type == 'first') {
            if (page != 1) new_page = 1;
        } else if (type == 'last') {
            if (page != total_page) new_page = total_page;
        } else if (type == 'prev') {
            if (page > 1) new_page = page - 1;
        } else if (type == 'next') {
            if (page < total_page) new_page = page + 1;
        }
        if (new_page) this.setState({page: new_page}, this.reloadData);
    },
    reloadData: function () {
        this.props.fnLoadData && this.props.fnLoadData(this.state.page, (data)=> {
            let filterData = this.props.fnFilterData && this.props.fnFilterData(data);
            if (filterData)
                this.setState({
                    total_page: filterData.total_page,
                    rows: filterData.rows
                })
        })
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            page: 1,
            th_rows: nextProps.th_rows,
            rows: []
        }, this.reloadData)
    },
    componentDidMount: function () {
        this.reloadData()
    },
    render: function () {
        let {page, total_page, rows} = this.state;

        let th_cell = (t, index) => {
            return <th key={index} width={t.width} className={"thCell"+index}>{t.title}</th>
        };

        let tr = (row, row_index) => {
            let td = (cell, cell_index) => {
                return (
                    <td key={cell_index} className={cell.className}>
                        <span onClick={()=>cell.clickHandler(this.reloadData)}>{cell.text}</span>
                        <em className="productStatus">{cell.content}</em>
                    </td>
                )
            };
            return (
                <tr key={row_index}>
                    {row.map(td)}
                </tr>)
        };

        let pagination, empty_records;
        if (rows.length) {
            pagination = (
                <div className="pagination">
                    <div className="paginationPage">
                        第{page}页, 共{total_page}页
                        {page > 1 ? <a onClick={()=>this.switchPageHandler('first')}>首页</a> : null}
                        {page > 1 ? <a onClick={()=>this.switchPageHandler('prev')}>上一页</a> : null}
                        {page < total_page ?
                            <a onClick={()=>this.switchPageHandler('next')}>下一页</a> : null}
                        {page < total_page ?
                            <a onClick={()=>this.switchPageHandler('last')}>尾页</a> : null}
                    </div>
                </div>
            );
        } else {
            empty_records = <div className="emptyRecords">暂无记录</div>
        }

        return (
            <div>
                <table className="table-read-only">
                    <tbody>
                    <tr className="trTitle">{this.state.th_rows.map(th_cell)}</tr>
                    {this.state.rows.map(tr)}
                    </tbody>
                </table>
                {empty_records}
                {pagination}
            </div>
        )
    }
});