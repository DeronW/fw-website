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
            total_page: null,
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

    },
    componentDidMount: function () {

    },
    render: function () {
        let th_cell = (t, index) => {
            return <th key={index} className="">{t}</th>
        };

        let tr = (row, row_index) => {
            let td = (cell, cell_index) => {
                return (
                    <td key={cell_index} className="">
                        {cell.toString()}
                    </td>
                )
            };
            return (
                <tr key={row_index}>
                    {row.map(td)}
                </tr>
            )
        };

        let pagination, empty_records;
        if (this.state.rows.length) {
            pagination = (
                <div className="pagination">
                    第{this.state.page}页, 共{this.state.total_page}页
                    <a onClick={()=>this.switchPageHandler('first')}>首页</a>
                    <a onClick={()=>this.switchPageHandler('prev')}>上一页</a>
                    <a onClick={()=>this.switchPageHandler('next')}>下一页</a>
                    <a onClick={()=>this.switchPageHandler('last')}>尾页</a>
                </div>
            );
        } else {
            empty_records = <div>暂无记录</div>
        }

        return (
            <div>
                <table className="table-read-only">
                    <tbody>
                    <tr>{this.state.th_rows.map(th_cell)}</tr>
                    {this.state.rows.map(tr)}
                    </tbody>
                </table>
                {empty_records}
                {pagination}
            </div>
        )
    }
});

Table.propTypes = {
    url: React.PropTypes.string,
    params: React.PropTypes.object,
    dataFilter: React.PropTypes.func
};