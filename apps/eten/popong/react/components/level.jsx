const Level = React.createClass({
    getInitialState: function () {
        return {level_list: this.getExtendList(this.props.level_list)}
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({level_list: this.getExtendList(nextProps.level_list)})
    },

    getExtendList: function (level_list) {
        let list = [], ls = JSON.parse(JSON.stringify(level_list)),
            todo_level = null;

        for (var i = 0; i < ls.length; i++) {
            list.push(ls[i]);
            if ((i == 0 && ls[i].locked) ||
                (i > 0 && ls[i].locked && ls[i - 1].locked === false)) {
                todo_level = i;
            }
        }
        if (todo_level !== null) {
            list[todo_level].star = '0';
            list[todo_level].locked = false;
        }
        return list
    },

    clickHandler: function (level) {
        if (this.state.level_list[level - 1].locked) {
            alert(`您还没有解锁${level}关`);
        } else {
            this.props.switchLevel(level)
        }
    },

    render: function () {
        let level = (item, index) => {
            var cn_bg = item.locked ? 'img-locked' : 'img-unlocked';
            if (item.gift) cn_bg += ' level-gift';

            var star = <div className={'star star-' + item.star}></div>;

            return (
                <div key={index} className="level">
                    <div className={cn_bg} onClick={() => this.clickHandler(index + 1)}>
                        <div className="num">{index + 1}</div>
                        {item.star != null ? star : null}
                    </div>
                </div>
            )
        };

        return <div className="level-list">
            <img className="header" src="images/level-list-header.png"/>
            <img className="footer" src="images/level-list-footer.png"/>
            <div> {this.state.level_list.map(level)} </div>
        </div>
    }
});