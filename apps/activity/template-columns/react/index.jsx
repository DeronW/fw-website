const Content = React.createClass({
    getInitialState() {
        return {
            num: 22
        }
    },
    resortHandler(){

    },
    changeHandler(e){
        this.setState({num: parseInt(e.target.value)})
    },
    render() {

        return (
            <div>
                <h2>test columns</h2>
                <p> column: {this.state.num} </p>
                <input type="number" onChange={this.changeHandler} />
                <a onClick={this.resortHandler}>OK</a>

                <div>

                </div>
            </div>
        )
    }
})

$(function () {
    ReactDOM.render(<Content />, CONTENT_NODE)
})
