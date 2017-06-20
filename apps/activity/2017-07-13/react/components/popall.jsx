class PopStartOrEnd extends React.Component {
    render() {
        let {text} = this.props
        return  <div className="pop_notbegun_box">
            <div className="pop_notbegun_text">
                {text}
            </div>
        </div>
    }
}

class PopInvitePC extends React.Component {
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return  <div className="pop-invite-pc">
            <div className="pop-invite-pc-text">
                <div>如何邀请</div>
                <div>请好友用您的工场码注册，去投标，达成团队目标。</div>
                <div className="confrim-btn" onClick={()=>{this.props.closePopHandler()}}>确定</div>
            </div>

        </div>
    }
}


class PopInviteMobile extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return  <div>
            <div>如何邀请</div>
            <div>请好友用您的工场码注册，去投标，达成团队目标。</div>
        </div>
    }
}



