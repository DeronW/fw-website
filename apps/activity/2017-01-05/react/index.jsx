
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
       return(
           <div>
               {
                   this.state.isMobile ? <WapContainer/> : <PcContainer />
               }
           </div>
       )
   }
});

$(function () {
    ReactDOM.render(
        <Content />,document.getElementById("cnt")
    );
});
