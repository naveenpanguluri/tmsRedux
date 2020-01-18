import React from 'react';
import './maintainOrder.scss';
import classNames from 'classnames/bind';

import Form from '../../common/form';
import Pagination from '../../common/pagination';
import PageSizeSelector from '../../common/pagesizeselector';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getorders } from '../../../store/viewsactions/order';


let 
    searchFormElems = [
        {
            name: 'Search order',
            placeholder: 'Search by orders',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "text"
            },
            gridClass: "col-12 col-md-6 col-lg-6",
            check: [
                {
                    regex: "^.{2,}$",
                    message: "Should be atleast 2 characters"
                }
            ]
        }
    ];

class MaintainOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SortOrder: "",
            PageSize: 10,
            PageNumber: 1,
            keyword: ""
        };
        this.getOrders();
    }

    async searchFormSubmit(data) {
        await this.setState({ keyword: data[0].value, PageNumber: 1 });
        this.props.getorders({
            "Requests": [
                {
                    "OrderNumber": this.state.keyword
                }
            ],
            "SortOrder": this.state.SortOrder,
            "PageSize": this.state.PageSize,
            "PageNumber": this.state.PageNumber,
            "GlobalSearch": ""
        });
        this.refs.searchFormRef.switchFormSubmit(false);
    }

    async resetSearch() {
        await this.setState({ keyword: "" });
        this.refs.searchFormRef.modifyFormObj(JSON.parse(JSON.stringify(searchFormElems)));
        this.getOrders();
    }

    async paginate(i) {
        await this.setState({ PageNumber: i });
        this.getOrders();
    }

    async sortTable(i) {
        await this.setState({ SortOrder: i });
        this.getOrders();
    }

    async rowsPerPageChange(i) {
        await this.setState({ PageSize: i, PageNumber: 1 });
        this.getOrders();
    }

    getOrders() {
        this.props.getorders({
            "Requests": [
            ],
            "SortOrder": this.state.SortOrder,
            "PageSize": this.state.PageSize,
            "PageNumber": this.state.PageNumber,
            "GlobalSearch": this.state.keyword
        });
    }

    render() {
        let
            searchFormButtons =
                <React.Fragment>
                    <button className="text-uppercase btn btn-primary submit-button px-5 mt-0" type="submit">Search</button>
                    {
                        this.state.keyword &&
                        <button className="btn btn-outline-danger reset-button p-2 ml-3" type="button" onClick={() => this.resetSearch()}>{this.state.keyword}<i className="fas fa-times ml-2"></i></button>
                    }
                </React.Fragment>;
        return (
            <React.Fragment>
                <div className="MaintainOrder">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">Maintain Order</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content">
                        
                            <Form
                                fields={searchFormElems}
                                className="search-form px-2"
                                footerClassName="col-12 col-md-6 col-lg-6 d-flex"
                                formButtons={searchFormButtons}
                                onSubmit={obj => this.searchFormSubmit(obj)}
                                ref="searchFormRef"
                            />

                            <div className="table-header-block d-flex flex-wrap mt-4 align-items-center">
                                <h5 className="px-2 font-weight-bold table-heading m-0">Order List</h5>
                                <button type="button" className="btn btn-primary btn-sm ml-2 px-3 search-button ml-auto" onClick={() => this.props.history.push('/order/uploadOrder')}>UPLOAD ORDER</button>
                                <button className="btn btn-outline-primary add-button p-2 ml-3 ml-sm-3 ml-md-3 ml-lg-3" onClick={() => this.props.history.push('/order/createOrder')}><i className="fas fa-plus"></i></button>
                            </div>

                            <PageSizeSelector NumberOfRecords={this.props.ordersTable.NumberOfRecords} value={this.state.PageSize} onChange={x => this.rowsPerPageChange(x)} />

                            <div className="table-cover table-responsive px-2 mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">No. Order</th>
                                            <th scope="col">Asal Pengiriman</th>
                                            <th scope="col">Tujuan Pengiriman</th>
                                            <th scope="col">Vehicle Type</th>
                                            <th scope="col">Expedition Name</th>
                                            <th scope="col">Nomor Polisi</th>
                                            <th scope="col">Status Order</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            Boolean(this.props.ordersTable.NumberOfRecords) ?
                                                this.props.ordersTable.Data.map((x, i) =>
                                                    <tr key={x.OrderId}>
                                                        <td className={classNames("row-actions d-flex align-items-center", { "border-top-0": !i })}>
                                                            <button type="button" className="btn rounded-circle circular-icon d-flex align-items-center justify-content-center" onClick={() => this.props.history.push({ pathname: '/order/createOrder', params: { order: x, mode: "view" }})}>
                                                                <i className="fas fa-eye text-secondary role-delete"></i>
                                                            </button>
                                                            <button type="button" onClick={() => this.props.history.push({ pathname: '/order/createOrder', params: { order: x, mode: "edit" }})} className="btn ml-2 rounded-circle circular-icon d-flex align-items-center justify-content-center">
                                                                <i className="fas fa-pencil-alt text-secondary role-delete"></i>
                                                            </button>
                                                            <button type="button" onClick={() => this.props.history.push({ pathname: '/order/trackOrder', params: { order: x }})} className="btn btn-primary btn-sm ml-2 px-3 search-button w-120">Track Order</button>
                                                        </td>
                                                        <td>{x.OrderNumber}</td>
                                                        <td>{x.Source}</td>
                                                        <td>{x.Destination}</td>
                                                        <td>{x.VehicleType}</td>
                                                        <td>{x.ExpeditionName}</td>
                                                        <td>{x.PoliceNumber}</td>
                                                        <td>{x.OrderStatus}</td>
                                                    </tr>
                                                ) :
                                                <tr><td className="text-center" colSpan="6">No records found</td></tr>
                                        }

                                    </tbody>
                                </table>
                                
                            </div>
                            <Pagination PageSize={this.state.PageSize} PageNumber={this.state.PageNumber} NumberOfRecords={this.props.ordersTable.NumberOfRecords} onClick={i => this.paginate(i)} />


                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { order } = views,
        { ordersTable } = order;
    return { credentials, ordersTable }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getorders
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MaintainOrder);