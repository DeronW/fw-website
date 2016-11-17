
const Pause = React.createClass({
    clickHandler: function () {
        this.props.continue()
    },
    render: function () {
        return (
            <div className="level-pause">
                <div className="dialog">
                    <img src="images/pause-btn.png" onClick={this.clickHandler}/>
                </div>
            </div>
        )
    }
});
