import React from 'react';
import './maintainDriverTransporter.scss';
import classNames from 'classnames/bind';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import Form from '../../common/form';
import Pagination from '../../common/pagination';
import PageSizeSelector from '../../common/pagesizeselector';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getdrivers } from '../../../store/viewsactions/masterData';

let 
    searchFormElems = [
        {
            name: 'Search Driver',
            placeholder: 'Search by driver',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
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

class MaintainDriverTransporter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SortOrder: "firstname",
            PageSize: 10,
            PageNumber: 1,
            keyword: ""
        };
        this.getDrivers();
    }

    async searchFormSubmit(data) {
        await this.setState({ keyword: data[0].value, PageNumber: 1 });
        this.getDrivers();
        this.refs.searchFormRef.switchFormSubmit(false);
    }

    async resetSearch() {
        await this.setState({ keyword: "" });
        this.refs.searchFormRef.modifyFormObj(JSON.parse(JSON.stringify(searchFormElems)));
        this.getDrivers();
    }

    async sortTable(i) {
        await this.setState({ SortOrder: i });
        this.getDrivers();
    }

    async paginate(i) {
        await this.setState({ PageNumber: i });
        this.getDrivers();
    }

    async rowsPerPageChange(i) {
        await this.setState({ PageSize: i, PageNumber: 1 });
        this.getDrivers();
    }

    async deleteDriver(id){
        console.log(id);
        let self = this;
        this.props.addloader('deleteDriver');

        await axios(rootURL + ops.driver.deletedriver + "?driverID=" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Token": this.props.credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK") {
                    console.log("response", response);
                    if (response.data.StatusCode === 200) {
                        toast.success(response.data.StatusMessage);
                        self.getDrivers();
                        // success toast
                    }
                    else {
                        toast.error(response.data.StatusMessage);
                        // error toast
                    }
                }
                else {
                    console.log("response", response);
                    self.props.modifyerror({ show: true });
                }
            })
            .catch(function (error) {
                self.props.modifyerror({ show: true });
                console.log("error", error)
            });

        this.props.removeloader('deleteDriver');

    }

    getDrivers() {
        this.props.getdrivers({
            "Requests": [
            ],
            "SortOrder": this.state.SortOrder,
            "PageSize": this.state.PageSize,
            "PageNumber": this.state.PageNumber,
            "GlobalSearch": this.state.keyword
        });
    }

    render() {
        let searchFormButtons = <React.Fragment>
            <button className="text-uppercase btn btn-primary submit-button px-sm-5 px-md-5 px-lg-5 mt-0" type="submit">Search</button>
            {
                this.state.keyword &&
                <button className="btn btn-outline-danger reset-button p-2 ml-3 d-flex justify-content-between align-items-center" type="button" onClick={() => this.resetSearch()}><div className="text-truncate text-w">{this.state.keyword}</div><i className="fas fa-times"></i></button>
            }
        </React.Fragment>
        return (
            <React.Fragment>
                <div className="MaintainDriver">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">Maintain Driver Transporter</div>
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

                            <div className="table-header-block d-flex mt-4 align-items-center">
                                <h5 className="px-2 font-weight-bold table-heading m-0">Driver List</h5>
                                <button className="btn btn-outline-primary add-button p-2 ml-auto" onClick={() => this.props.history.push('/masterdata/createDriverTransporter')}><i className="fas fa-plus"></i></button>
                            </div>

                            <PageSizeSelector NumberOfRecords={this.props.driversTable.NumberOfRecords} value={this.state.PageSize} onChange={x => this.rowsPerPageChange(x)} />

                            <div className="table-cover table-responsive px-2 mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "firstname") ? "firstname_desc" : "firstname")}>{(this.state.SortOrder.indexOf("firstname") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "firstname") ? "down" : "up")}></i>}Nama Driver</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "phone") ? "phone_desc" : "phone")}>{(this.state.SortOrder.indexOf("phone") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "phone") ? "down" : "up")}></i>}No. Telepon</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "email") ? "email_desc" : "email")}>{(this.state.SortOrder.indexOf("email") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "email") ? "down" : "up")}></i>}Email</th>
                                            <th scope="col">No. SIM/Batas Berlaku</th>
                                            <th scope="col">Aktif</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Boolean(this.props.driversTable.NumberOfRecords) ?
                                                this.props.driversTable.Data.map((x, i) =>
                                                    <tr key={x.ID}>
                                                        <td className={classNames("row-actions d-flex align-items-center", { "border-top-0": !i })}>
                                                            <button type="button" onClick={() => this.deleteDriver(x.ID)} className="btn rounded-circle mr-2 circular-icon d-flex align-items-center justify-content-center">
                                                                <i className="far fa-trash-alt text-secondary"></i>
                                                            </button>
                                                            <button type="button" onClick={() => this.props.history.push({ pathname: '/masterdata/createDriverTransporter', params: { driverTransporter: x }})} className="btn rounded-circle circular-icon d-flex align-items-center justify-content-center"><i className="fas fa-pencil-alt text-secondary"></i></button>
                                                        </td>
                                                        <td>{x.FirstName} {x.LastName}</td>
                                                        <td>{x.DriverPhone}</td>
                                                        <td>{x.Email}</td>
                                                        <td>{x.DrivingLicenseNo}</td>
                                                        <td>{x.IsActive ? 'Yes' : 'No'}</td>
                                                    </tr>
                                                ) :
                                                <tr><td className="text-center" colSpan="6">No records found</td></tr>
                                        }
                                    </tbody>
                                </table>
                                
                            </div>
                            <Pagination PageSize={this.state.PageSize} PageNumber={this.state.PageNumber} NumberOfRecords={this.props.driversTable.NumberOfRecords} onClick={i => this.paginate(i)} />

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { masterData } = views,
        { driversTable } = masterData;
    return { credentials, driversTable }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getdrivers
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MaintainDriverTransporter);