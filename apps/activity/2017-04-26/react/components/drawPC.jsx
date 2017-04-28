class drawPC extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin:false,
            monthNotice:"",

        }
    }

    componentDidMount(){
        var _this = this;
        $UserReady(function (isLogin, user) {

        })
    }
    render(){
        return (
                <div>
                   <PersonMonthLadder />
                </div>
            )

    }
}

class PersonMonthLadder extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){

    }
    render(){
        return (
                <div className="personMonthLadder">
                    asdafa
                </div>
            )


    }
}