$(()=>{
    const NumberHiddle=React.createClass({
        getInitialState:function () {
            let n=this.props.num;
            console.log(n);
            let yizi=parseInt(n/(10000*10000));  //得到亿位显示的数字
            let wan=parseInt((n%(10000*10000)/10000)); //得到万位显示的数字
            console.log(yizi,wan);
            let wan_arr=[];
            let yizi_arr=[];
            //把数字分割开来的函数
            // let num2arr=(num,arr)=>num.toString().split("").forEach((i)=>arr.push)(i);
            let num2arr = (num, arr)=> num.toString().split('').forEach((i)=>arr.push(i));
            //然后进行判断
            if(yizi<1){
                num2arr(wan, wan_arr);
                return {
                    yizi:yizi,
                    wan_arr:[...wan_arr].map(x=>0),
                    wan_target_arr:wan_arr
                }
            }else{
                console.log("yi")
                num2arr(yizi,yizi_arr);
                num2arr(wan,wan_arr);
                return{
                    yizi:yizi,
                    yizi_arr:[...yizi_arr].map(x=>0),
                    wan_arr:[...wan_arr].map(x=>0),
                    yizi_target_arr:yizi_arr,
                    wan_target_arr:wan_arr
                }

            }

        },
        //控制定时的函数
        componentDidMount:function () {
            this._timer_count=0;
            this._timer=setInterval(this.timeHiddler,500);

        },
        //对定时的条件进行判断
        timeHiddler:function () {
            if(this._timer_count>=9){
                clearInterval(this._timer);
                return;
            }else{
                this._timer_count++;
                this.animate();
            }
        },
        animate:function () {
            let yizi_arr=this.state.yizi_arr;
            let wan_arr=this.state.wan_arr;
            let yizi=this.state.yizi;
            if(yizi>=1){
                for( let z=0;z<yizi_arr.length;z++){
                    if(yizi_arr[z]<this.state.yizi_target_arr[z]){
                        yizi_arr[z]=yizi_arr[z]+1;
                    }
                }
                for( let j=0;j<wan_arr.length;j++){
                    if(wan_arr[j]<this.state.wan_target_arr[j]){
                        wan_arr[j]=wan_arr[j]+1;
                    }
                }
            }else{
                console.log("animate");
                for( let i=0 ;i<wan_arr.length;i++){
                    if(wan_arr[i]<this.state.wan_target_arr[i]){
                        wan_arr[i]=wan_arr[i]+1;
                    }
                }
            }
            this.setState({
                yizi_arr: yizi_arr,
                wan_arr: wan_arr
            });

        },

        render:function () {
            let num_field = (n, index) => {
                return (
                    <span className="money-number" key={index}>
                        <em>{n}</em>
                        <strong> </strong>
                    </span>
                )
            };
            if(this.state.yizi<1){
                return (
                    <div className="earningDataBox">
                        <div className="yibox">
                            {this.state.wan_arr.map(num_field)}
                            <span className="yizi">万</span>
                            <span className="yizi">元</span>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div className="earningDataBox">
                        <div className="yibox">
                            {this.state.yizi_arr.map(num_field)}
                            <span className="yizi">亿</span>
                        </div>
                        <div className="yibox">
                            {this.state.wan_arr.map(num_field)}
                            <span className="yizi">万</span>
                            <span className="yizi">元</span>
                        </div>
                    </div>

                )
            }

        }


    });
    ReactDOM.render(<NumberHiddle num={45*10000*10000+7800*10000}/>,document.getElementById('yibox'));
    ReactDOM.render(<NumberHiddle num={3*10000*10000+5643*10000}/>,document.getElementById('yibox2'));
    ReactDOM.render(<NumberHiddle num={7812*10000}/>,document.getElementById('yibox3'));


})
// $(function () {
//     ReactDOM.render(<HeaderStatusBar />, document.getElementById('header-status-bar'));
// });
//
// $(()=> {
//
//     const Number = React.createClass({
//
//         getInitialState: function () {
//             let n = this.props.num,
//                 yi = parseInt(n / (10000 * 10000)),
//                 wan = parseInt((n % (10000 * 10000)) / 10000);
//             let num2arr = (num, arr)=> num.toString().split('').forEach((i)=>arr.push(i));
//             let yi_arr = [], wan_arr = [];
//
//             num2arr(yi, yi_arr);
//             num2arr(wan, wan_arr);
//
//             return {
//                 yi_arr: [...yi_arr].map(x=>0),
//                 wan_arr: [...wan_arr].map(x=>0),
//                 target_yi_arr: yi_arr,
//                 target_wan_arr: wan_arr
//             }
//         },
//
//         componentDidMount: function () {
//             this._timer_count = 0;
//             this._timer = setInterval(this.timerHandler, 1000)
//         },
//
//         timerHandler: function () {
//             if (this._timer_count >= 9) {
//                 clearInterval(this._timer);
//                 return;
//             }
//             this.animate();
//             this._timer_count++;
//         },
//
//         animate: function () {
//             let yi_arr = this.state.yi_arr, wan_arr = this.state.wan_arr;
//
//             for (let i = 0; i < yi_arr.length; i++) {
//                 if (yi_arr[i] < this.state.target_yi_arr[i])
//                     yi_arr[i] = yi_arr[i] + 1;
//             }
//
//             for (let i = 0; i < wan_arr.length; i++) {
//                 if (wan_arr[i] < this.state.target_wan_arr[i])
//                     wan_arr[i] = wan_arr[i] + 1;
//             }
//
//             this.setState({
//                 yi_arr: yi_arr,
//                 wan_arr: wan_arr
//             });
//         },
//
//         render: function () {
//
//             let num_field = (n, index) => {
//                 return (
//                     <span className="money-number" key={index}>
//                         <em>{n}</em>
//                         <strong> </strong>
//                     </span>
//                 )
//             };
//
//             return (
//                 <div className="earningDataBox">
//                     <div className="yibox">
//                         {this.state.yi_arr.map(num_field)}
//                         <span className="yizi">亿</span>
//                     </div>
//                     <div className="yibox">
//                         {this.state.wan_arr.map(num_field)}
//                         <span className="yizi">万</span>
//                         <span className="yizi">元</span>
//                     </div>
//                 </div>
//             )
//         }
//     });
//
//     ReactDOM.render(<Number num={12 * 10000 * 10000 + 3400 * 10000}/>, document.getElementById('yibox'));
//     ReactDOM.render(<Number num={56 * 10000 * 10000 + 3400 * 10000}/>, document.getElementById('yibox2'));
//     ReactDOM.render(<Number num={1*10000*10000+7800 * 10000}/>, document.getElementById('yibox3'));
//
// });
