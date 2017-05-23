const PopNoStart = React.createClass({
    render(){
        let {popTitle,popEnd,popText} =this.props;
        return <div className="popNoStart">
            <div className="popNoStartContent">
                <div className="popTitle">{popTitle}</div>
                {popEnd && <div className="popText">欢迎您下次再来</div>}
                {popText &&<div className="popText">
                    <p>活动时间：2017.5.16 - 2017.7.12</p>
                    <p>客服电话：400-0322-988</p>
                </div>}
            </div>
        </div>
    }
});