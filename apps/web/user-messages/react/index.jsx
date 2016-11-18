const MessagePanel = React.createClass({
    getInitialState: function () {
        return {
            tab: '全部消息',
            unread_count: null,
            page: 1,
            total_page: null,
            msg_list: []
        }
    },
    componentDidMount: function () {
        this.loadMessages();
    },
    loadMessages: function () {
        let m = {
            '全部消息': 'A',
            '未读消息': 'N',
            '已读消息': 'Y'
        };
        // A: 全部, N: 未读, Y:已读
        $.get(API_PATH + 'mesageCenter/dataList.shtml', {
            rows: 10,
            page: this.state.page,
            isUse: m[this.state.tab],
            _: +new Date()
        }, function (data) {
            this.setState({
                msg_list: data.pageData.result,
                unread_count: data.unReadCount,
                page: data.pageData.pagination.pageNo,
                total_page: data.pageData.pagination.totalPage
            })
        }.bind(this), 'json');
    },
    loadPage: function (page) {
        let next_page;
        if (page == 'first') {
            next_page = 1
        } else if (page == 'last') {
            next_page = this.state.total_page
        } else if (page == 'prev' && this.state.page > 1) {
            next_page = this.state.page - 1;
        } else if (page == 'next' && this.state.page < this.state.total_page) {
            next_page = this.state.page + 1;
        } else {
            return;
        }
        this.setState({page: next_page}, this.loadMessages);
    },
    toggleTabHandler: function (tab_name) {
        if (tab_name == this.state.tab) return;
        this.setState({
            tab: tab_name,
            page: 1,
            total_page: null
        }, this.loadMessages)
    },
    markAllReadHandler: function () {

    },
    render: function () {
        let page, tab_bar, records;

        let message = (msg, index) => {
            let href = null;
            console.log(msg.isUse)
            return (
                <a key={index} className="msg-btn" href={href}>
                    <div className={msg.isUse == 'Y' ? 'icon-read' : 'icon-unread'}></div>
                    <div>
                        <b className="msg-title">{msg.title}</b>
                        <b className="msg-date"> {msg.createTime} </b>
                    </div>
                    <div className="content">{msg.content}</div>
                </a>
            )
        };

        tab_bar = (
            <div className="tab-bar">
                {['全部消息', '未读消息', '已读消息'].map((n, index) => {
                    return (
                        <div key={index} className={this.state.tab == n ? "active" : null}
                             onClick={() => this.toggleTabHandler(n)}>
                            {n}<i className="icon-bottom-angle"> </i>
                        </div>
                    )
                })}
            </div>
        );

        if (this.state.msg_list.length) {
            page = (
                <div className="pagination">
                    第{this.state.page}页, 共{this.state.total_page}页
                    <a onClick={() => this.loadPage('first')}>首页</a>
                    {this.state.page > 1 ?
                        <a onClick={() => this.loadPage('prev')}>上一页</a> : null }
                    {this.state.page < this.state.total_page ?
                        <a onClick={() => this.loadPage('next')}>下一页</a> : null }
                    <a onClick={() => this.loadPage('last')}>末页</a>
                </div>
            );
            records = this.state.msg_list.map(message);
        } else {
            records = <div className="no-message">暂无记录</div>
        }

        return (
            <div className="message-panel">
                {tab_bar}
                <div className="handle-unread">
                    <i>{this.state.unread_count}</i> 个未读消息
                    <span className="line">|</span>
                    <a href="/mesageCenter/readAll.shtml">全部设为已读</a>
                </div>
                {records}
                {page}
                <div className="more-messages">仅可查看较近时期的消息，如若想查看较早的记录，请联系客服400-0322-988</div>
            </div>
        )
    }
});

$(function () {
    ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
    ReactDOM.render(<MessagePanel />, document.getElementById('messagePanel'));
});