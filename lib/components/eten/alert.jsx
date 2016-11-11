(()=> {

    let GlobalAlert = (text) => {

        var id = '_id_react_component_global_alert';
        var element = document.getElementById(id);

        if (!element) {
            element = document.createElement('div');
            element.id = id;
            document.body.appendChild(element);
        }

        ReactDOM.render(React.createElement(Alert, {
            id: id,
            text: text,
            unMountHandler: function () {
                element.parentNode.removeChild(element)
            }
        }), element);
    };

    let _style_bg = {
        position: 'fixed',
        zIndex: 999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.3)'
    };

    let _style_panel = {
        width: '340px',
        height: '210px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: '-170px',
        marginTop: '-100px',
        background: 'white',
        borderRadius: '4px',
        overflow: 'hidden'
    };

    let _style_title = {
        height: '40px',
        borderBottom: '2px solid #8db6f5',
        position: 'relative',
        background: '#efefef'
    };

    let _style_btn_close = {
        display: 'block',
        position: 'absolute',
        top: '0',
        right: '2px',
        width: '40px',
        height: '40px',
        textAlign: 'center',
        lineHeight: '40px',
        color: '#a5a5a5',
        cursor: 'pointer',
        fontSize: '30px'
    };

    let _style_text = {
        display: 'block',
        textAlign: 'center',
        fontSize: '14px',
        margin: '40px auto',
        color: '#333'
    };

    let _style_btn = {
        display: 'block',
        margin: '20px auto',
        width: '100px',
        height: '34px',
        lineHeight: '34px',
        textAlign: 'center',
        borderRadius: '4px',
        background: '#ea6f5d',
        fontSize: '14px',
        cursor: 'pointer',
        color: 'white'
    };

    const Alert = React.createClass({
        closeHandler: function () {
            ReactDOM.unmountComponentAtNode(document.getElementById(this.props.id));
        },
        componentWillUnmount: function () {
            this.props.unMountHandler && this.props.unMountHandler();
        },
        render: function () {
            return (
                <div style={_style_bg}>
                    <div style={_style_panel}>
                        <div style={_style_title}>
                            <b onClick={this.closeHandler} style={_style_btn_close}>&times;</b>
                        </div>
                        <div style={_style_text}> {this.props.text} </div>
                        <a style={_style_btn} onClick={this.closeHandler}>确定</a>
                    </div>
                </div>
            )
        }
    });

    window.GlobalAlert = GlobalAlert;
})();