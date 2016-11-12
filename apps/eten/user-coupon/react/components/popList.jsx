const PopList = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            total_page: null,
            gcm: '',
            finalRole: '',
            user_list: [],
            selectedLoginName: null
        }
    },
    componentDidMount: function () {
        this.ajaxFriendsList();
    },
    closeHandler: function () {
        ReactDOM.unmountComponentAtNode(document.getElementById('popList'));
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
        if (new_page) this.setState({page: new_page}, this.ajaxFriendsList);
    },
    ajaxFriendsList: function () {
        var this1 = this;
        $.ajax({
            url: API_PATH + 'api/parttimeFinancialer/v1/searchFriends.json',
            //url: './friends.json',
            data: {
                page: this.state.page,
                rows: 8
            },
            type: 'get',
            success: function (data) {
                this1.setAndFilterResultData(data.data)
            },
            fail: function (error) {
                alert(error)
            }
        })
    },
    setAndFilterResultData: function (data) {
        let {result, pagination} = data.pageData;
        this.setState({
            gcm: data.gcm,
            finalRole: data.finalRole,
            total_page: pagination.totalPage,
            user_list: result.map((i)=>({
                loginName: i.loginName,
                realName: i.realName,
                sex: i.sex,
                createTime: i.createTime,
                mobile: i.mobile
            }))
        })
    },
    presentCoupon: function () {
        console.log(this.props.type);
        console.log(this.props.id);
        console.log(this.state.selectedLoginName);
        $.ajax({
            url:API_PATH+'api/coupon/v1/changeHolder.json',
            data:{
                couponId:this.props.id,
                newUserId:1
            },
            success: function (data) {
                console.log(data.data.businessResult)
            }
        })
    },
    toggleSelectedHandler: function (name) {
        console.log(name)
        this.setState({selectedLoginName: name})
    },
    render: function () {
        let {page, total_page} = this.state;

        var popLoginName = function (loginName, gcm, finalRole) {
            var loginNameValue = '';
            if (loginName != null && gcm.substring(0, 1) == 'A') {
                if (finalRole == 4) {
                    if (loginName.length <= 4) {
                        loginNameValue = loginName.substring(0, 1) + "**"
                    } else {
                        loginNameValue = loginName.substring(0, 2) + "**" + loginName.substring(loginName.length - 2, loginName.length);
                    }
                } else {
                    loginNameValue = loginName;
                }
            } else if (loginName != null) {
                if (loginName.length <= 4) {
                    loginNameValue = loginName.substring(0, 1) + "**";
                } else {
                    loginNameValue = loginName.substring(0, 2) + "**" + loginName.substring(loginName.length - 2, loginName.length);
                }
            } else {
                loginNameValue = '--';
            }
            return loginNameValue
        };
        var popRealName = function (sex, realName, gcm, finalRole) {
            var sexValue = "";
            if (sex == 1) {
                sexValue = "先生";
            } else {
                sexValue = "女士";
            }
            var realNameValue = '';
            if (realName != null && gcm.substring(0, 1) == 'A') {
                if (finalRole == 4) {
                    realNameValue = realName.substring(0, 1) + sexValue;
                } else {
                    realNameValue = realName
                }
            } else if (realName != null) {
                realNameValue = realName.substring(0, 1) + sexhtml
            } else {
                realNameValue = "--";
            }
            return realNameValue
        };
        var popMobile = function (mobile, gcm, finalRole) {
            var mobileValue = '';
            if (gcm.substring(0, 1) == 'A') {
                if (finalRole == 4) {
                    if (mobile != null) {
                        mobileValue = mobile.substring(0, 3) + "****" + item.mobile.substring(7, 11);
                    } else {
                        mobileValue = "--"
                    }
                } else {
                    mobileValue = mobile
                }
            } else {
                if (mobile != null) {
                    mobileValue = mobile.substring(0, 3) + "****" + item.mobile.substring(7, 11)
                } else {
                    mobileValue = "--";
                }
            }
            return mobileValue
        };
        var popCreateTime = function (createTime) {
            var time = '';
            if (createTime != null) {
                time = createTime
            } else {
                time = "--"
            }
            return time
        };

        var friend = (item) => {
            return <li key={item.loginName}>
                <div className="centerCon1 centerCon" onClick={()=>this.toggleSelectedHandler(item.loginName)}>
                    {this.state.selectedLoginName == item.loginName ? <img src="./images/checked.png"/> : <img src="./images/check.png"/>}
                </div>
                <div className="centerCon2 centerCon">
                    { popLoginName(item.loginName, this.state.gcm, this.state.finalRole) }
                </div>
                <div className="centerCon3 centerCon">
                    { popRealName(item.sex, item.realName, this.state.gcm, this.state.finalRole) }
                </div>
                <div className="centerCon4 centerCon">
                    { popMobile(item.mobile, this.state.gcm, this.state.finalRole) }
                </div>
                <div className="centerCon5 centerCon">
                    { popCreateTime(item.createTime) }
                </div>
            </li>
        };

        return (
            <div className="listPopBg">
                <div className="listPop">
                    <div className="listTop">
                        <div className="topLeft">请选择好友</div>
                        <div className="topClose" onClick={this.closeHandler}>关闭</div>
                    </div>
                    <div className="listCenter">
                        <div className="centerTitle">
                            <div className="centerCon1 centerCon">选择</div>
                            <div className="centerCon2 centerCon">好友登录名</div>
                            <div className="centerCon3 centerCon">好友姓名</div>
                            <div className="centerCon4 centerCon">好友手机号</div>
                            <div className="centerCon5 centerCon">好友注册时间</div>
                        </div>
                        <ul>
                            { this.state.user_list.map(friend) }
                        </ul>
                        <div className="paginationList">
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
                    </div>
                    <div className="listFooter">
                        <div className="sendBtn footerBtn" onClick={this.presentCoupon}>赠送</div>
                        <div className="cancelBtn footerBtn" onClick={this.closeHandler}>取消</div>
                    </div>
                </div>
            </div>
        )
    }
});

function showPopList(type, id) {
    ReactDOM.render(<PopList type={type} id={id}/>, document.getElementById('popList'))
}