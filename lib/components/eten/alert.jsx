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
        width: '400px',
        height: '200px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: '-200px',
        marginTop: '-100px'
    };

    let _style_title = {
        height: '60px',
        padding: '30px 0 0 0',
        borderBottom: '2px solid blue'
    };

    let _style_btn = {
        display: 'block',
        margin: '20px auto',
        width: '80px',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center'
    };

    const Alert = React.createClass({
        componentWillUnmount: function () {
            this.props.unMountHandler && this.props.unMountHandler();
        },
        render: function () {
            return (
                <div style={_style_bg}>
                    <div style={_style_panel}>
                        <div style={_style_title}>
                            <b>&times;</b>
                        </div>
                        {this.props.text}
                        <a style={_style_btn}>确定</a>
                    </div>
                </div>
            )
        }
    });

    window.GlobalAlert = GlobalAlert;
})();