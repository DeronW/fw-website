const WapContainer = React.createClass({
    render: function () {
        return (
            <div>
                <QuarterTableWap />
                <MonthTableWap />
                <WeekTableWap />
            </div>
        );
    }
});
