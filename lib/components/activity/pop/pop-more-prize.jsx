const PopMorePrize = React.createClass({
    getInitialState(){
        this.PRE_PAGE = 5;
        return {
            list: [],
            page: 1,
            total_page: 2
        }
    },
    componentDidMount(){
        this.reloadData()
    },
    reloadData(){
        $.get(API_PATH + "api/activityPullInvest/v1/myPrizeRecordList.json",{
            page:this.state.page,
            rows:5
        }).then(data =>{
            var list = data.data.pageData.result;
            var totalPage = data.data.pageData.pagination.totalPage;
            this.setState({list: list,total_page:totalPage})
        });
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
    render(){
        let {page,total_page,list} =this.state;
        let tBody = (item, index) => {
            return <tr key={index}>
                <td>{item.magicTitle}</td>
                <td>{item.drawTime}</td>
                <td style={{color:'#ef464d'}}>{item.praiseContent}</td>
            </tr>
        };
        let pagination;
        pagination = <div className="pagination">
            <div className="paginationPage">
                第{page}页, 共{total_page}页
                {page > 1 ? <a onClick={() => this.switchPageHandler('prev')}>上一页</a> : null}
                {page < total_page ?
                    <a onClick={() => this.switchPageHandler('next')}>下一页</a> : null}
            </div>
        </div>;
        return <div className="popMorePrize">
            <div className="popMorePrizeContent">
                <div className="closePop" onClick={this.props.closePopHandle}></div>
                <table>
                    <thead>
                    <tr>
                        <td>活动名称</td>
                        <td>翻牌时间</td>
                        <td>所获奖品</td>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map(tBody)}
                    </tbody>
                </table>
                {pagination}
            </div>
        </div>
    }
});