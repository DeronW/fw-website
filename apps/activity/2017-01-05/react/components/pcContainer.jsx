const PcContainer = React.createClass({
    render: function () {
        return(
            <div className="pcContainer">
                <QuarterLadderPC />
                <MonthLadderPC />
                <WeekLadderPC />
            </div>
        )
    }
});
