const PcContainer = React.createClass({
    render: function () {
        return(
            <div className="pcContainer">
                <QuarterTablePc />
                <MonthTablePc />
                <WeekTablePc />
            </div>
        )
    }
});