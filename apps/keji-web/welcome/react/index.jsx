class Welcome extends React.Component {
    render() {
        return <div className="welcomeBg">
            <div className="welcomeTitle">
                <div className="titleLeft"></div>
                <div className="titleRight"></div>
            </div>
        </div>
    }
}


$(function () {
    ReactDOM.render(<Welcome/>, document.getElementById('cnt'));
});
