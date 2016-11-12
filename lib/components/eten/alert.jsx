(()=> {
    /*
     为了在文字中添加颜色, 使用字符串格式化方法. 颜色目前近支持两种, 工场红色和工场蓝色
     用法一: "这是一段文字, 包含了一个%s的颜色文字", "关键字", "red"
     用法而: "这是一段文字, 包含了2个%s, %s的颜色文字", ["关键字", "WORD2"], ["blue"]

     usage: GlobalAlert('%sa%sb%sc', ['中', '2'], [null,'blue'])
     */
    let GlobalAlert = (tpl, values, colors) => {

        var id = '_id_react_component_global_alert';
        var element = document.getElementById(id);

        if (!element) {
            element = document.createElement('div');
            element.id = id;
            document.body.appendChild(element);
        }

        ReactDOM.render(React.createElement(Alert, {
            id: id,
            tpl: tpl,
            values: values,
            colors: colors,
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
        lineHeight: '37px',
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
        getPlaceholders: function (values, colors) {
            let placeholders = [];

            let get_color = (color) => {
                let c = '#fd4d4c';
                if (color == 'blue') c = '#649df8';
                return c;
            };

            let box = (v, c) => `<span style='color: ${get_color(c)}'>${v}</span>`;

            if (values == null) {
                values = [];
            } else if (typeof(values) == 'string') {
                values = [values];
                colors = [colors];
            }
            for (let i = 0; i < values.length; i++) {
                placeholders.push(box(values[i], colors[i]))
            }
            return placeholders;
        },
        render: function () {
            let {tpl, values, colors} = this.props;
            let placeholder = this.getPlaceholders(values, colors);
            let segment = tpl;

            for (let i = 0; i < placeholder.length; i++) {
                segment = segment.replace('%s', placeholder[i])
            }
            segment = {__html: segment};

            return (
                <div style={_style_bg}>
                    <div style={_style_panel}>
                        <div style={_style_title}><b onClick={this.closeHandler}
                                                     style={_style_btn_close}>&times;</b></div>
                        <div style={_style_text} dangerouslySetInnerHTML={segment}></div>
                        <a style={_style_btn} onClick={this.closeHandler}>确定</a>
                    </div>
                </div>
            )
        }
    });

    window.GlobalAlert = GlobalAlert;
})();