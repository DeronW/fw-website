class JulyPc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        let isLogin = this.props.isLogin
        return <div>
            this is pc box
            <BottomShow isLogin={isLogin}/>
        </div>
    }
}

class BottomShow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let isLogin = this.props.isLogin
        let logged = <div className="log-box logged-box">
            活动内，您可以邀请50人参与活动，如何邀请 | 立即投资
        </div>
        let unlogged = <div className="log-box unlogged-box">
            请登录后查看您活动内的邀友和投标情况，立即登录 | 如何邀请
        </div>
        return <div className="bottom-box">
            {isLogin ? logged : unlogged}
        </div>
    }
}
