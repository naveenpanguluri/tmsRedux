import React from 'react';
import './gateToGate.scss';
import classNames from 'classnames/bind';

import Form from '../common/form';
import CustomModal from '../common/custommodal';
import Pagination from '../common/pagination';
import PageSizeSelector from '../common/pagesizeselector';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../config';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../store/actions';
import { getgatetogatelist } from '../../store/viewsactions/gatetogate';

let
    searchFormElems = [
        {
            name: 'Search Gate',
            placeholder: 'Search by gate',
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
    ],
    modalFormElems = [
        {
            name: 'Gate Type',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            disabled: true,
            field: {
                type: "text"
            },
            gridClass: "col-12",
            check: [
                {
                    regex: "^.{0,}$",
                    message: ""
                }
            ]
        },
        {
            name: 'Gate No.',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "select",
                options: [
                    {
                        label: 'Select an option',
                        value: ''
                    }
                ]
            },
            gridClass: "col-12",
            check: [
                {
                    regex: "^[0-9]+$",
                    message: "Please select an option"
                }
            ]
        },
        {
            name: 'No. Polisi',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            disabled: true,
            field: {
                type: "text"
            },
            gridClass: "col-12",
            check: [
                {
                    regex: "^.{0,}$",
                    message: ""
                }
            ]
        },
        {
            name: 'Tipe Pekerjaan',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            disabled: true,
            field: {
                type: "text"
            },
            gridClass: "col-12",
            check: [
                {
                    regex: "^.{0,}$",
                    message: ""
                }
            ]
        },
        {
            name: 'Keterangan',
            placeholder: 'Keterangan',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            field: {
                type: "text"
            },
            gridClass: "col-12",
            check: [
                {
                    regex: "^.{3,120}$",
                    message: "Should be 3 - 120 characters"
                }
            ]
        }
    ];

class Gatetogate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalFormObj: [],
            SortOrder: "gate",
            PageSize: 10,
            PageNumber: 1,
            keyword: "",
            editEntry: null
        };

        this.getGateList();
    }

    async searchFormSubmit(data) {
        await this.setState({ keyword: data[0].value, PageNumber: 1 });
        this.props.getgatetogatelist({
            "Requests": [
                {
                    "isActive": true,
                    "GateName": this.state.keyword
                }
            ],
            "SortOrder": this.state.SortOrder,
            "PageSize": this.state.PageSize,
            "PageNumber": this.state.PageNumber
        });
        this.refs.searchFormRef.switchFormSubmit(false);
    }

    async resetSearch() {
        await this.setState({ keyword: "" });
        this.refs.searchFormRef.modifyFormObj(JSON.parse(JSON.stringify(searchFormElems)));
        this.getGateList();
    }

    async paginate(i) {
        await this.setState({ PageNumber: i });
        this.getGateList();
    }

    async sortTable(i) {
        await this.setState({ SortOrder: i });
        this.getGateList();
    }

    async rowsPerPageChange(i) {
        await this.setState({ PageSize: i, PageNumber: 1 });
        this.getGateList();
    }

    getGateList() {
        this.props.getgatetogatelist({
            "Requests": [
                {
                }
            ],
            "SortOrder": this.state.SortOrder,
            "PageSize": this.state.PageSize,
            "PageNumber": this.state.PageNumber,
            "GlobalSearch": this.state.keyword
        });
    }

    async editEntry(x) {
        let self = this;
        this.props.addloader('getGateNamesOptions');

        await axios(rootURL + ops.gatetogate.getgatenames + "?businessAreaId=" + x.BusinessAreaId + "&gateTypeId=" + ((x.Status.trim() === "GATE IN") ? 2 : ((x.Status.trim() === "NOT ARRIVED") ? 1 : x.GateTypeId)), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": this.props.credentials.TokenKey
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if (!response.data.NumberOfRecords) {
                        self.props.modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Gate No' options. Please create the related entries first to proceed."
                        })
                    }
                    else {
                        let obj = JSON.parse(JSON.stringify(modalFormElems));

                        obj[0].value = ((x.Status.trim() === "GATE IN") ? 'GATE OUT' : '') || ((x.Status.trim() === "NOT ARRIVED") ? 'GATE IN' : '');

                        obj[1].field.options = [obj[1].field.options[0], ...response.data.Data.map(y => { return { value: y.Id, label: y.Value } })];

                        obj[2].value = x.VehicleNumber;

                        obj[3].value = x.OrderType;

                        obj[4].value = (x.Info) ? x.Info : '';
                        obj[4].valid = true;

                        self.setState({ modalFormObj: obj, editEntry: x, showModal: true });
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

        this.props.removeloader('getGateNamesOptions');
    }

    async modalFormSubmit(data) {
        console.log(data)
        let self = this,
            x = self.state.editEntry;
        this.props.addloader('gateToGateFormSubmit');

        let body = {
            "Requests": [
                {
                    "OrderId": x.OrderId,
                    "GateTypeId": ((x.Status.trim() === "GATE IN") ? 2 : ((x.Status.trim() === "NOT ARRIVED") ? 1 : x.GateTypeId)),
                    "GateId": data[1].value,
                    "Info": data[4].value
                }
            ],
            "CreatedBy": "system"
        };

        console.log(body);

        await axios(rootURL + ops.gatetogate.creategateingateout, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": this.props.credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK") {
                    console.log("response", response);
                    if (response.data.StatusCode === 200) {
                        toast.success(response.data.StatusMessage);
                        self.getGateList();
                    }
                    else {
                        toast.error(response.data.StatusMessage);
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

        this.setState({ showModal: false });
        this.props.removeloader('gateToGateFormSubmit');
    }

    render() {
        console.log(this.props.gateTable);
        let searchFormButtons = <React.Fragment>
            <button className="text-uppercase btn btn-primary submit-button px-sm-5 px-md-5 px-lg-5 mt-0" type="submit">Search</button>
            {
                this.state.keyword &&
                <button className="btn btn-outline-danger reset-button p-2 ml-3 d-flex justify-content-between align-items-center" type="button" onClick={() => this.resetSearch()}><div className="text-truncate text-w">{this.state.keyword}</div><i className="fas fa-times"></i></button>
            }
        </React.Fragment>;

        let modalFormButtons = <React.Fragment>
            <button className="text-uppercase btn btn-primary save-button px-5 mt-0 ml-auto" type="submit">SAVE</button>
            <button className="text-uppercase btn btn-primary cancel-button px-5 mt-0 ml-3" onClick={() => this.setState({ showModal: false })}>CANCEL</button>
        </React.Fragment>;
        return (
            <React.Fragment>
                <div className="GatetoGate">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">Gate</div>
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
                                <h5 className="px-2 font-weight-bold table-heading m-0">Gate List</h5>
                            </div>

                            <PageSizeSelector NumberOfRecords={this.props.gateTable.NumberOfRecords} value={this.state.PageSize} onChange={x => this.rowsPerPageChange(x)} />

                            <div className="table-cover table-responsive px-2 mt-4">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "gate") ? "gate_desc" : "gate")}>{(this.state.SortOrder.indexOf("gate") !== -1) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "gate") ? "down" : "up")}></i>}Gate</th>
                                            <th scope="col">No. Polisi</th>
                                            <th scope="col">Bongkar/Muat</th>
                                            <th scope="col">Tipe Kendaraan</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Boolean(this.props.gateTable.NumberOfRecords) ?
                                                this.props.gateTable.Data.map((x, i) =>
                                                    <tr key={x.OrderId}>
                                                        <td>{x.GateName}</td>
                                                        <td>{x.VehicleNumber}</td>
                                                        <td>{x.OrderType}</td>
                                                        <td>{x.VehicleTypeName}</td>
                                                        <td>{x.Status}</td>
                                                        <td className={classNames("row-actions d-flex align-items-center", { "border-top-0": !i })}>
                                                            {(x.Status.trim() !== 'GATE OUT') &&
                                                                <button type="button" className="btn btn-primary btn-sm w-120 px-3 search-button" onClick={() => this.editEntry(x)}>{((x.Status.trim() === "GATE IN") ? 'GATE OUT' : '') || ((x.Status.trim() === "NOT ARRIVED") ? 'GATE IN' : '')}</button>
                                                            }
                                                        </td>
                                                    </tr>
                                                ) :
                                                <tr><td className="text-center" colSpan="6">No records found</td></tr>
                                        }

                                    </tbody>
                                </table>

                            </div>
                            <Pagination PageSize={this.state.PageSize} PageNumber={this.state.PageNumber} NumberOfRecords={this.props.gateTable.NumberOfRecords} onClick={i => this.paginate(i)} />


                        </div>
                    </div>
                </div>

                <CustomModal modaltitle="Gate to Gate" isOpen={this.state.showModal} onClick={() => this.setState({ showModal: false })}>
                    <Form
                        className="px-2"
                        fields={this.state.modalFormObj}
                        onSubmit={obj => this.modalFormSubmit(obj)}
                        footerClassName="col-12 d-flex modal-form-footer mt-3"
                        formButtons={modalFormButtons}
                        ref="modalFormRef"
                    />
                </CustomModal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { gatetogate } = views,
        { gateTable } = gatetogate;
    return { credentials, gateTable }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getgatetogatelist
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Gatetogate);