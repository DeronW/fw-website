
const Content = React.createClass({
   getInitialState: function () {
       return({
           isMobile:false,
       })
   },
   componentDidMount:function(){
       this.setState({isMobile:navigator.userAgent.match(/Android|iPhone|iPad|Mobile/i) ? true : false})
   },
   render: function () {
       let container = this.state.isMobile ? <WapContainer/> : <PcContainer />
       return(
           <div>
               {container}
           </div>
       )
   }
});

$(function () {
    ReactDOM.render(
        <Content />,document.getElementById("cnt")
    );
});
