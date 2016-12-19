
const Content = React.createClass({
   getInitialState: function () {
       return({
           isMobile:true,
       })
   },
   componentDidMount:function(){
       this.setState({isMobile:navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ? true : false})
   },
   render: function () {
       return(
           <div>
               {
                   this.state.isMobile ? <MonthTable /> : <QuarterTable />
               }
           </div>
       )
   }
});

const MonthTable = React.createClass({
   render: function () {
       return(
           <div className="mobileShow">34523454</div>
       )
   }
});


$(function () {
    ReactDOM.render(
        <Content />,document.getElementById("cnt")
    );
});
