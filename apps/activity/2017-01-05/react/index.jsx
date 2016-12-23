
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
       let container = this.state.isMobile ? <MobileContainer/> : <PcContainer />;
       return container
   }
});

$(function () {
    ReactDOM.render(
        <Content />,document.getElementById("cnt")
    );
});
