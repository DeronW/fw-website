const GlobalInvestList = React.createClass({
    getInitialState: function () {
        console.log(888)
        return {products: []}
    },
    componentDidMount: function () {
        console.log(333)
        $.get(API_PATH + 'prdClaims/phpDataList.shtml', {}, (data) => {
            this.setState({products: data.pageData.result})
        }, 'json')
    },
    shouldComponentUpdate: function () {
        return this.state.products.length == 0;
    },
    getRepayModeName: function (m) {
        if (m == 1) return "按季等额还款";
        if (m == 2) return "按月等额还款";
        if (m == 3) return "一次性还本付息";
        if (m == 4) return "按月付息到期还本";
        if (m == 5) return "按天一次性还本付息";
    },
    getRepayPeriod: function (product) {
        if (product.repayMode == 5) return `${product.repayPeriod}天`;
        let v = parseInt(product.repayPeriod);
        let enumerate = [null, 3, 6, 9, 12, 1, 2, 4, 5, 7, 8, 10, 11];
        return `${enumerate[v] || v}个月`;
    },
    getProductStatus: function (product) {
        let title, text, link;

        let sold_out = product.fullscaleTime && (product.fullscaleTime + '').split(" ", 1) + '售罄';

        if (product.status == 2) {
            title = '可投';
            if (product.prdChannels == '1') {
                link = `/prdClaims/getId.shtml?id=${product.id}`
            } else {
                link = "/prdClaims/dealBid.shtml?id=" + product.id;
            }
            let remain = (product.borrowAmount - product.completeLoan) / 10000;
            remain = parseInt(remain * 100) / 100;
            text = `可投${remain}万`;
        } else if (product.status == 4) {
            title = '满标';
            text = sold_out;
        } else if (product.status == 5) {
            title = '还款中';
            text = sold_out;
        } else if (product.status == 1) {
            title = '待确认';
        } else if (product.status == 6) {
            title = '已还清';
            text = sold_out;
        }
        return {
            can_buy: product.status == 2,
            link: link,
            title: title,
            text: text
        }
    },
    render: function () {

        let supportSVG = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;

        let product_label = (label_list) => {
            let label = label_list && label_list[0];
            if (!label || label.labelPriority != '1') return null;

            let bg;
            if (label.styleBackground == 1) {
                bg = '#fc6456'
            } else if (label.styleBackground == 2) {
                bg = '#41c4b2'
            } else if (label.styleBackground == 3) {
                bg = '#8b93f7'
            } else {
                bg = '#fe7c24'
            }

            return (
                <a href={label.labelUrl} className="product-label" style={{background: bg}}>
                    {label.labelName}
                    <img className="rotate" src="images/product-label/ico_bid.png"/>
                    <div className={"icon-label icon-label-" + label.styleIcon}></div>
                </a>
            );
        };

        let tags = (label, index) => {
            return (
                <a key={index} className="tag">
                    {label.labelName}
                </a>
            )
        };

        let product = (i, index) => {
            let extraRate = i.platformSubsidyExpense || 0,
                factRate = Math.round(i.annualRate * 100 - extraRate * 100) / 100,
                percent = i.completeLoan / i.borrowAmount,
                remain = `${parseInt((i.borrowAmount - i.completeLoan) / 100) / 100}万`,
                all = `${parseInt(i.brrowAmount / 100) / 100}万`,
                status = this.getProductStatus(i);

            let progress;
            if (supportSVG) {
                progress = <div className="circle-progress">
                    <SVGCircleProgress radius={50} weight={4} percent={percent * 100}/>
                    <div className="text">{percent >= 100 ? all : remain}</div>
                </div>
            } else {
                progress = <div className="rect-progress">
                    <div className="red" style={{width: `${percent * 100}%`}}></div>
                    <div className="text">{percent >= 100 ? all : remain}</div>
                </div>
            }

            return (
                <div className="invest-item" key={index}>
                    <div className="invest-item-1">
                        <i className={'icon trade-mark-' + i.tradeMark}> </i>
                        <div className="product-name">
                            <a href={"/prdClaims/getId.shtml?id=" + i.id}>{i.prdName}</a>
                            {product_label(i.prdLabelsList)}
                        </div>
                        <div className="tags">
                            <div className="remain-day">
                                {this.getRepayPeriod(i)}
                                {i.prdLabelsList && i.prdLabelsList.map(tags)}
                            </div>
                        </div>
                        <div className="pay">{this.getRepayModeName(i.repayMode)}</div>
                    </div>
                    <div className="invest-item-2">
                        预期年化
                        <span className="year-interest">
                            {factRate}%{extraRate ? `+${extraRate}%` : null}
                        </span>
                        <img title={`${factRate}%为基本收益率，${extraRate}%为平台回馈出借人的投资返利`}
                             className="info-img" src="images/g_ico_tanhao.png"/>
                    </div>
                    <div className="invest-item-3">
                        {progress}
                    </div>
                    <div className="invest-item-4">
                        <a href={status.link}>
                            {status.title}
                        </a>
                        <div>{status.text}</div>
                    </div>
                </div>
            )
        };

        return (
            <div className="global-invest-list">
                <div className="invest-title">热门投资等你来</div>
                <div className="invest-list">
                    {this.state.products.map(product)}
                </div>
            </div>
        )
    }
});