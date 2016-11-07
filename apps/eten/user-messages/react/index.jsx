const MessagePanel = React.createClass({
    getInitialState: function () {
        return {
            tab: '全部消息',
            unread_count: 0,
            msg_list: []
        }
    },
    componentDidMount: function () {
        this.loadMessages('全部消息');
    },
    loadMessages: function (type) {
        let m = {
            '全部消息': 'A',
            '未读消息': 'N',
            '已读消息': 'Y'
        };
        // A: 全部, N: 未读, Y:已读
        $.get(API_PATH + 'mesageCenter/dataList.shtml', {
            rows: 10,
            page: 1,
            isUse: m[type],
            _: +new Date()
        }, function (data) {
            this.setState({msg_list: data.pageData.result})
        }.bind(this), 'json');
    },
    toggleTabHandler: function (tab_name) {
        this.setState({tab: tab_name}, ()=> this.loadMessages(this.state.tab))
    },
    markAllReadHandler: function () {

    },
    render: function () {
        let page, tab_bar;

        tab_bar = (
            <div className="tab-bar">
                {['全部消息', '未读消息', '已读消息'].map((n, index)=> {
                    return (
                        <div key={index} className={this.state.tab == n ? "active" : null}
                             onClick={()=>this.toggleTabHandler(n)}>
                            {n}<i className="icon-bottom-angle"> </i>
                        </div>
                    )
                })}
            </div>
        );

        page = (
            <div className="pagination">
                第{1}页, 共{1}页
                <a onClick={()=>this.loadPage(1)}>首页</a>
                <a>上一页</a>
                <a>下一页</a>
                <a>末页</a>
            </div>
        );

        let message = (msg, index) => {
            return (
                <a key={index} className="msg-btn">
                    <img src="./images/icon-msg.png"/>
                    <div>
                        <b className="msg-title">{msg.title}</b>
                        <b className="msg-date"> {msg.createTime} </b>
                    </div>
                    <div className="content">{msg.content}</div>
                </a>
            )
        };

        return (
            <div className="message-panel">
                {tab_bar}
                <div className="handle-unread">
                    <i>{this.state.unread_count}</i> 个未读消息
                    <span className="line">|</span>
                    <a href="/mesageCenter/readAll.shtml">全部设为已读</a>
                </div>
                {this.state.msg_list.length ? this.state.msg_list.map(message) : <div className="no-message">暂无记录</div>}
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