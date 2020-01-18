import React from 'react';
import './tripManagement.scss';
import classNames from 'classnames/bind';

import Form from '../common/form';
import Pagination from '../common/pagination';
import PageSizeSelector from '../common/pagesizeselector';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../store/actions';
import { gettriplist, gettripstatusnames } from '../../store/viewsactions/tripmanagement';

let
    searchFormElems = [
        {
            name: 'Filter by Status Order',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            field: {
                type: "select",
                options: [
                    {
                        label: 'All',
                        value: ''
                    }
                ]
            },
            gridClass: "col-12 col-sm-6 col-md-4 col-lg-6",
            check: [
                {
                    regex: "^[0-9]+$",
                    message: "Please select an option"
                }
            ]
        },
        {
            name: 'Search Order',
            placeholder: 'Search Order by no. order, packing sheet, police no.',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            field: {
                type: "text"
            },
            gridClass: "col-12 col-md-12 col-lg-6",
            check: [
                {
                    regex: "^.{2,}$",
                    message: "Should be atleast 2 characters"
                }
            ]
        }
    ];

class TripManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalForm: [],
            SortOrder: "ordernumber",
            PageSize: 10,
            PageNumber: 1,
            keyword: "",
            OrderStatusId: "",
            tripStatusTypesFlag: false
        };

        this.getTripList();

        props.gettripstatusnames();
    }

    componentDidMount() {
        this.componentInitCheck()
    }

    componentDidUpdate() {
        this.componentInitCheck()
    }

    async componentInitCheck() {
        if (!this.state.tripStatusTypesFlag && Boolean(this.props.tripStatusNames.Data.length)) {
            await this.setState({ tripStatusTypesFlag: true });
            let formObj = JSON.parse(JSON.stringify(await this.refs.searchFormRef.getFormState().form));

            formObj[0].field.options = [formObj[0].field.options[0], ...this.props.tripStatusNames.Data.map(x => { return { value: x.Id, label: x.Value } })]

            this.refs.searchFormRef.modifyFormObj(formObj);
        }
    }

    async searchFormSubmit(data) {
        await this.setState({ OrderStatusId: data[0].value, keyword: data[1].value, PageNumber: 1 });
        this.getTripList();
        this.refs.searchFormRef.switchFormSubmit(false);
    }

    async resetSearch() {
        await this.setState({ OrderStatusId: "", keyword: "" });
        console.log(this.props.tripStatusNames.Data);
        let newFormObj = JSON.parse(JSON.stringify(await this.refs.searchFormRef.getFormState().form));

        newFormObj[0].value = "";
        newFormObj[1].value = "";

        this.refs.searchFormRef.modifyFormObj(newFormObj);
        this.getTripList();
    }

    async paginate(i) {
        await this.setState({ PageNumber: i });
        this.getTripList();
    }

    async sortTable(i) {
        await this.setState({ SortOrder: i });
        this.getTripList();
    }

    async rowsPerPageChange(i) {
        await this.setState({ PageSize: i, PageNumber: 1 });
        this.getTripList();
    }

    getTripList() {
        let reqObj = {
            "Requests": [
                {
                }
            ],
            "SortOrder": this.state.SortOrder,
            "PageSize": this.state.PageSize,
            "PageNumber": this.state.PageNumber,
            "GlobalSearch": this.state.keyword
        };

        if (this.state.OrderStatusId) {
            reqObj.Requests[0].OrderStatusId = this.state.OrderStatusId;
        }

        console.log(reqObj);

        this.props.gettriplist(reqObj);
    }

    render() {
        let searchFormButtons = <React.Fragment>
            <button className="text-uppercase btn btn-primary submit-button px-sm-5 px-md-5 px-lg-5 mt-0" type="submit">Search</button>
            {
                this.state.keyword &&
                <button className="btn btn-outline-danger reset-button p-2 ml-3 d-flex justify-content-between align-items-center" type="button" onClick={() => this.resetSearch()}><div className="text-truncate text-w">{this.state.keyword}</div><i className="fas fa-times"></i></button>
            }
        </React.Fragment>;
        return (
            <React.Fragment>
                <div className="TripManagement">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">Trip Management</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content">
                            <Form
                                fields={JSON.parse(JSON.stringify(searchFormElems))}
                                className="search-form px-2"
                                footerClassName="col-12 col-md-12 col-lg-6 d-flex"
                                formButtons={searchFormButtons}
                                onSubmit={obj => this.searchFormSubmit(obj)}
                                ref="searchFormRef"
                            />

                            <div className="table-header-block d-flex mt-5 align-items-center">
                                <h5 className="px-2 font-weight-bold table-heading m-0">Trip List</h5>
                            </div>

                            <PageSizeSelector NumberOfRecords={this.props.tripTable.NumberOfRecords} value={this.state.PageSize} onChange={x => this.rowsPerPageChange(x)} />


                            <div className="table-cover table-responsive px-2 mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "ordernumber") ? "ordernumber_desc" : "ordernumber")}>{(this.state.SortOrder.indexOf("ordernumber") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "ordernumber") ? "down" : "up")}></i>}No. Order</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "source") ? "source_desc" : "source")}>{(this.state.SortOrder.indexOf("source") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "source") ? "down" : "up")}></i>}Asal Pengiriman</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "destination") ? "destination_desc" : "destination")}>{(this.state.SortOrder.indexOf("destination") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "destination") ? "down" : "up")}></i>}Tujuan Pengiriman</th>
                                            <th scope="col">FTL/Deskripsi</th>
                                            <th scope="col">Dimensi/Berat</th>
                                            <th scope="col">Kendaraan</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "estimatedshipmentdate") ? "estimatedshipmentdate_desc" : "estimatedshipmentdate")}>{(this.state.SortOrder.indexOf("estimatedshipmentdate") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "estimatedshipmentdate") ? "down" : "up")}></i>}Estimasi Waktu Angkut</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "estimatedarrivaldate") ? "estimatedarrivaldate_desc" : "estimatedarrivaldate")}>{(this.state.SortOrder.indexOf("estimatedarrivaldate") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "estimatedarrivaldate") ? "down" : "up")}></i>}Estimasi Waktu Tiba</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "orderstatus") ? "orderstatus_desc" : "orderstatus")}>{(this.state.SortOrder.indexOf("orderstatus") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "orderstatus") ? "down" : "up")}></i>}Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Boolean(this.props.tripTable.NumberOfRecords) ?
                                                this.props.tripTable.Data.map((x, i) =>
                                                    <tr key={x.OrderId}>
                                                        <td className={classNames("row-actions d-flex align-items-center", { "border-top-0": !i })}>
                                                            <button type="button" onClick={() => this.props.history.push({ pathname: '/tripmanagement/detailOrder', params: { order: x, mode: "view" } })} className="btn rounded-circle circular-icon d-flex align-items-center justify-content-center">
                                                                <i className="fas fa-eye text-secondary"></i>
                                                            </button>
                                                            <button type="button" onClick={() => this.props.history.push({ pathname: '/tripmanagement/detailOrder', params: { order: x, mode: "edit" } })} className="btn btn-primary btn-sm ml-2 px-3 search-button">Reassign</button>
                                                        </td>
                                                        <td>{x.OrderNumber}</td>
                                                        <td>{x.Source}</td>
                                                        <td>{x.Destination}</td>
                                                        <td>{x.Description}</td>
                                                        <td>{x.Dimensions}</td>
                                                        <td>{x.Vehicle}</td>
                                                        <td>{x.EstimatedShipmentDate}</td>
                                                        <td>{x.EstimatedArrivalDate}</td>
                                                        <td>{x.OrderStatus}</td>
                                                    </tr>
                                                ) :
                                                <tr><td className="text-center" colSpan="6">No records found</td></tr>
                                        }
                                    </tbody>
                                </table>

                            </div>
                            <Pagination PageSize={this.state.PageSize} PageNumber={this.state.PageNumber} NumberOfRecords={this.props.tripTable.NumberOfRecords} onClick={i => this.paginate(i)} />


                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { tripManagement } = views,
        { tripTable, tripStatusNames } = tripManagement;
    return { credentials, tripTable, tripStatusNames }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        gettriplist,
        gettripstatusnames
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TripManagement);