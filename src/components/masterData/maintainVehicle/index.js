import React from 'react';
import './maintainVehicle.scss';
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
import { getvehicles } from '../../../store/viewsactions/masterData';

let 
    searchFormElems = [
        {
            name: 'Search Vehicle',
            placeholder: 'Search by vehicle',
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

class MaintainVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SortOrder: "platenumber",
            PageSize: 10,
            PageNumber: 1,
            keyword: ""
        };
        this.getVehicles();
    }

    async searchFormSubmit(data) {
        await this.setState({ keyword: data[0].value, PageNumber: 1 });
        this.getVehicles();
        this.refs.searchFormRef.switchFormSubmit(false);
    }

    async resetSearch() {
        await this.setState({ keyword: "" });
        this.refs.searchFormRef.modifyFormObj(JSON.parse(JSON.stringify(searchFormElems)));
        this.getVehicles();
    }

    async paginate(i) {
        await this.setState({ PageNumber: i });
        this.getVehicles();
    }

    async sortTable(i) {
        await this.setState({ SortOrder: i });
        this.getVehicles();
    }

    async rowsPerPageChange(i) {
        await this.setState({ PageSize: i, PageNumber: 1 });
        this.getVehicles();
    }

    async deleteVehicle(id){
        console.log(id);
        let self = this;
        this.props.addloader('deleteVehicle');

        await axios(rootURL + ops.vehicle.deletevehicle + "?vehicleID=" + id, {
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
                        self.getVehicles();
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

        this.props.removeloader('deleteVehicle');

    }

    getVehicles() {
        console.log("get vehicles");
        this.props.getvehicles({
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
                <div className="MaintainVehicle">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">Maintain Vehicle</div>
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
                                <h5 className="px-2 font-weight-bold table-heading m-0">Vehicle List</h5>
                                <button className="btn btn-outline-primary add-button p-2 ml-auto" onClick={() => this.props.history.push('/masterdata/createVehiclePools')}><i className="fas fa-plus"></i></button>
                            </div>

                            <PageSizeSelector NumberOfRecords={this.props.vehiclesTable.NumberOfRecords} value={this.state.PageSize} onChange={x => this.rowsPerPageChange(x)} />

                            <div className="table-cover table-responsive px-2 mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "platenumber") ? "platenumber_desc" : "platenumber")}>{(this.state.SortOrder.indexOf("platenumber") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "platenumber") ? "down" : "up")}></i>}Plat Nomor</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "maxweight") ? "maxweight_desc" : "maxweight")}>{(this.state.SortOrder.indexOf("maxweight") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "maxweight") ? "down" : "up")}></i>}Max Beban (kg)</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "maxdimension") ? "maxdimension_desc" : "maxdimension")}>{(this.state.SortOrder.indexOf("maxdimension") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "maxdimension") ? "down" : "up")}></i>}Max Dimensi (CBM)</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "vehicletypedescription") ? "vehicletypedescription_desc" : "vehicletypedescription")}>{(this.state.SortOrder.indexOf("vehicletypedescription") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "vehicletypedescription") ? "down" : "up")}></i>}Jenis Kendaraan</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "pool") ? "pool_desc" : "pool")}>{(this.state.SortOrder.indexOf("pool") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "pool") ? "down" : "up")}></i>}Pool</th>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "kirexpirydate") ? "kirexpirydate_desc" : "kirexpirydate")}>{(this.state.SortOrder.indexOf("kirexpirydate") === 0) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "kirexpirydate") ? "down" : "up")}></i>}KIR/Expired</th>
                                            <th scope="col">Dedicated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(this.props.vehiclesTable)}
                                        {
                                            Boolean(this.props.vehiclesTable.NumberOfRecords) ?
                                                this.props.vehiclesTable.Data.map((x, i) =>
                                                    <tr key={x.ID}>
                                                        
                                                        <td className={classNames("row-actions d-flex align-items-center", { "border-top-0": !i })}>
                                                            <button type="button" onClick={() => this.deleteVehicle(x.ID)} className="btn rounded-circle mr-2 circular-icon d-flex align-items-center justify-content-center">
                                                                <i className="far fa-trash-alt text-secondary"></i>
                                                            </button>
                                                            <button type="button" onClick={() => this.props.history.push({ pathname: '/masterdata/createVehiclePools', params: { vehicle: x }})} className="btn rounded-circle circular-icon d-flex align-items-center justify-content-center">
                                                                <i className="fas fa-pencil-alt text-secondary"></i>
                                                            </button>
                                                        </td>
                                                        <td>{x.PlateNumber}</td>
                                                        <td>{x.MaxWeight}</td>
                                                        <td>{x.MaxDimension}</td>
                                                        <td>{x.VehicleTypeDescription}</td>
                                                        <td>{x.PoolName}</td>
                                                        <td>{new Date(x.KIRExpiryDate).toISOString().slice(0,10)}</td>
                                                        <td>{x.IsDedicated ? 'Yes' : 'No'}</td>
                                                    </tr>
                                                ) :
                                                <tr><td className="text-center" colSpan="8">No records found</td></tr>
                                        }
                                    </tbody>
                                </table>
                                
                            </div>
                            <Pagination PageSize={this.state.PageSize} PageNumber={this.state.PageNumber} NumberOfRecords={this.props.vehiclesTable.NumberOfRecords} onClick={i => this.paginate(i)} />
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
        { vehiclesTable } = masterData;
    return { credentials, vehiclesTable }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getvehicles
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MaintainVehicle);