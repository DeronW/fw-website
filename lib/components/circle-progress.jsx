/*
 * SVGCircleProgress组件，创建一个圆形进度条.
 * @constructor
 * @param {number} radius - 圆形的半径.
 * @param {number} weight - 圆形的线条宽度.
 * @param {number} percent - 进度的百分比, 整数表示, 取值范围 0 ~ 100.
 * @param {boolean} animate - 是否使用动画, 默认 true.
 * @param {number} padding - 圆形形状的内边距.
 * @param {string} animate - 是否使用动画, 默认 true.
 * @param {string} bgColor - 进度条背景颜色.
 * @param {string} progressColor - 进度条进度颜色.
 */

'use strict';

const SVGCircleProgress = React.createClass({
    getDefaultProps: function () {
        return {
            weight: 10,
            radius: 100,
            animate: true,
            padding: 0,
            bgColor: '#eee',
            progressColor: '#FC655A'
        }
    },
    getInitialState: function () {
        this.STEP_PERCENT = 1.2;
        let minLineWeightWidth = 100 * this.props.weight / (Math.PI * 2 * (this.props.radius - this.props.weight / 2));
        this.MAX_UNFINISHED_PERCENT = 99.9 - minLineWeightWidth;
        this.MIN_START_PERCENT = Math.min(minLineWeightWidth, this.STEP_PERCENT);

        return {
            radius: this.props.radius,
            bgColor: this.props.bgColor,
            progressColor: this.props.progressColor,
            weight: this.props.weight,
            current_percent: 0,
            target_percent: this.props.percent,
            animate: this.props.animate,
            padding: this.props.padding
        }
    },

    shouldComponentUpdate: function () {
        return this.state.current_percent < this.state.target_percent;
    },

    componentWillUnmount: function () {
        clearInterval(this._animate_timer);
    },

    setProgress: function (p) {
        if (p > this.MAX_UNFINISHED_PERCENT && p < 100) p = this.MAX_UNFINISHED_PERCENT;
        // 一旦进度条到达100%, 就不能再重新设置进度了
        if (p >= 100) {
            p = 100;
            clearInterval(this._animate_timer);
        }
        this.setState({current_percent: p})
    },

    animate: function () {
        if (this.state.current_percent < this.state.target_percent) {
            var p = this.state.current_percent + this.STEP_PERCENT;
            if (p > this.MAX_UNFINISHED_PERCENT && this.state.target_percent == 100) {
                p = 100;
            } else {
            }
            this.setProgress(p)
        } else {
            clearInterval(this._animate_timer);
        }
    },

    componentDidMount: function () {
        if (this.state.animate) {
            this._animate_timer = setInterval(this.animate, 15)
        } else {
            this.setProgress(this.state.target_percent);
        }
    },

    render: function () {
        let sideLength = (this.state.radius + this.state.padding) * 2;
        let center = {
            x: this.state.radius + this.state.padding,
            y: this.state.radius + this.state.padding
        };
        let percent = this.state.current_percent / 100;

        let circleColor = percent === 1 ? this.state.progressColor : this.state.bgColor;
        let circle = <circle cx={center.x} cy={center.y}
                             r={this.state.radius - this.state.weight / 2}
                             fill="transparent" stroke={circleColor}
                             strokeWidth={this.state.weight}></circle>;

        let p2 = {
            x: center.x + Math.sin(Math.PI * 2 * percent) * this.state.radius,
            y: center.y - Math.cos(Math.PI * 2 * percent) * this.state.radius
        };
        let p3 = {
            x: center.x + Math.sin(Math.PI * 2 * percent) * (this.state.radius - this.state.weight),
            y: center.y - Math.cos(Math.PI * 2 * percent) * (this.state.radius - this.state.weight)
        };

        // 一共由4段圆弧构成
        let f1 = ['M', sideLength / 2, sideLength / 2 - this.state.radius],
            f2 = ['A', this.state.radius, this.state.radius, 0, (percent > .5 ? 1 : 0), 1, p2.x, p2.y],
            f3 = ['A', this.state.weight / 2, this.state.weight / 2, '0', '1', '1', p3.x, p3.y],
            f4 = ['A', this.state.radius - this.state.weight, this.state.radius - this.state.weight, '0',
                (percent > 0.5 ? 1 : 0), '0', sideLength / 2, sideLength / 2 - this.state.radius + this.state.weight],
            f5 = ['A', this.state.weight / 2, this.state.weight / 2, '0', '1', '1', sideLength / 2, sideLength / 2 - this.state.radius],
            f6 = ['Z'];

        let d = [].concat(f1).concat(f2).concat(f3).concat(f4).concat(f5).concat(f6).join(' ');

        let path = <path fill={this.state.progressColor} d={d}></path>;
        if (this.state.current_percent === 100 || this.state.current_percent < this.MIN_START_PERCENT) path = null;

        return (
            <svg width={sideLength} height={sideLength}
                 style={{
                     display: 'inline-block',
                     transform: 'translate(0, 0)',
                     overflow: 'hidden'
                 }}>
                {circle}
                {path}
            </svg>
        )
    }
});