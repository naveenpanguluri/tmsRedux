import React from 'react';
import './createOrder.scss';
import classNames from 'classnames/bind';

import ToggleBound from '../../common/togglebound';
import { Modal } from 'reactstrap';
import { roundTo } from '../../common/lib';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from '../../common/form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getpartnerslist1, getpartnerslist2, getpartnerslist3, getfleettypes, getvehicletypes, getdrivernames, getregioncodes } from '../../../store/viewsactions/order';

let
    uploadFormElems = [
        {
            name: 'Order No.',
            placeholder: '',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            disabled: true,
            field: {
                type: "text"
            },
            gridClass: "d-none",
            check: [
                {
                    regex: "^.{0,}$",
                    message: ""
                }
            ]
        },
        {
            name: 'PO/SO Number',
            placeholder: '',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            field: {
                type: "text"
            },
            gridClass: "col-12 col-lg-6",
            check: [
                {
                    regex: "^.{2,10}$",
                    message: "Should be 2 - 10 characters"
                },
                {
                    regex: '^[a-zA-Z0-9]{2,10}$',
                    message: "PO/SO number should not have any special characters or spaces"
                }
            ]
        },
        {
            name: 'Tipe Muatan',
            value: '',
            errMsg: 'Please select an option',
            required: true,
            valid: false,
            field: {
                type: "radio",
                horizontal: true,
                options: []
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'Tipe Kendaraan',
            value: [],
            required: true,
            valid: false,
            field: {
                type: "typehead",
                labelKey: "Value",
                options: []
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'Nama Pengendara',
            value: [],
            required: true,
            valid: false,
            field: {
                type: "typehead",
                labelKey: "Value",
                options: []
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'Estimated Total Pallet',
            label: {
                text: "cm",
                super: "3"
            },
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "label"
            },
            gridClass: "col-12 col-lg-6",
            check: [
                {
                    regex: "^.{1,10}$",
                    message: "Should be 1 - 10 digits"
                },
                {
                    regex: '^[0-9]{1,10}$',
                    message: "Estimated Total Pallet should be numerical"
                }
            ]
        },
        {
            name: 'Weight',
            label: {
                text: "kg"
            },
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "label"
            },
            gridClass: "col-12 col-lg-6",
            check: [
                {
                    regex: "^.{1,30}$",
                    message: "Should be 1 - 30 digits"
                },
                {
                    regex: "(^[0-9]+$|^[0-9]+\.[0-9]+$)",
                    message: "Weight should be numerical"
                }
            ]
        },
        {
            name: 'Police Number',
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "text"
            },
            gridClass: "col-12 col-lg-6",
            check: [
                {
                    regex: "^.{1,15}$",
                    message: "Should be 1 - 15 characters"
                }
            ]
        },
        {
            name: 'Instruksi',
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "text"
            },
            gridClass: "col-12 col-lg-6",
            check: [
                {
                    regex: "^.{1,200}$",
                    message: "Should be 1 - 200 characters"
                }
            ]
        },
        {
            name: 'Harga',
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "text"
            },
            gridClass: "col-12 col-lg-6",
            check: [
                {
                    regex: "^.{1,30}$",
                    message: "Should be 1 - 4 digits"
                },
                {
                    regex: "(^[0-9]+$|^[0-9]+\.[0-9]+$)",
                    message: "Harga should be only numericals"
                }
            ]
        },
        {
            name: 'Business Area',
            value: [],
            required: true,
            valid: false,
            field: {
                type: "typehead",
                labelKey: "Value",
                options: []
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'Shipment Schedule',
            placeholder: '',
            value: '',
            guid: null,
            errMsg: 'Please upload an image',
            required: false,
            valid: true,
            field: {
                type: "browsefoto"
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        }
    ];


class CreateOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            uploadErrors: [],
            responseError: "",
            inbound: true,
            partnerOneSelected: [],
            partnerOneDetails: {},
            partnerSource: {
                selected: [],
                details: {},
                actualDT: new Date(),
                estimatedDT: new Date()
            },
            partnerDestination: {
                selected: [],
                details: {},
                actualDT: new Date(),
                estimatedDT: new Date()
            },
            rows: [{
                selected: [],
                details: {},
                actualDT: new Date(),
                estimatedDT: new Date()
            }],
            formSubmitted: false,
            dataFlag: false,
            editID: 0,
            dataNull: false
        };

        this.getPartnerType(1);
        this.getPartnerType(2);
        this.getPartnerType(3);
        props.getfleettypes(this.failure);
        props.getvehicletypes(this.failure);
        props.getdrivernames(this.failure);
        props.getregioncodes(this.failure);
    }

    failure = async () => {
        if (!this.state.dataNull) {
            await this.setState({ dataNull: true });
            this.props.history.push('/order/maintainorder');
        }
    }

    componentDidMount() {
        this.componentInitCheck()
    }

    componentDidUpdate() {
        this.componentInitCheck()
    }

    async componentInitCheck() {
        if (!this.state.dataFlag && this.props.partnersList1.Data.length && this.props.partnersList2.Data.length && this.props.partnersList3.Data.length && this.props.fleetTypes.Data.length && this.props.vehicleTypes.Data.length && this.props.driverNames.Data.length && this.props.regionCodes.Data.length) {
            await this.setState({ dataFlag: true });
            if (this.props.location.params) {
                this.getOrderDetails()
            }
            else {
                this.refs.formRef.modifyFormObj(await this.formCodeBuild());
            }
        }
    }

    async formCodeBuild() {
        let formObj = JSON.parse(JSON.stringify(await this.refs.formRef.getFormState().form));

        formObj[2].field.options = this.props.fleetTypes.Data.map(x => x.Value);
        formObj[3].field.options = this.props.vehicleTypes.Data.filter(x => Boolean(x.Value));
        formObj[4].field.options = this.props.driverNames.Data.filter(x => Boolean(x.Value));
        formObj[10].field.options = this.props.regionCodes.Data.filter(x => Boolean(x.Value));

        return formObj;
    }

    /* EDIT MODE FUNCTIONS START */

    async getOrderDetails() {
        let self = this,
            x = this.props.location.params.order;
        this.props.addloader('getOrderUploadDetails');

        await axios(rootURL + ops.order.getorderdetails + "?orderId=" + x.OrderId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": this.props.credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.StatusMessage === "Success") {
                    self.orderDetailsPopulate(response.data);
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

        this.props.removeloader('getOrderUploadDetails');
    }

    async orderDetailsPopulate(obj) {
        console.log(obj);
        let x = this.state,
            newFormObj = await this.formCodeBuild(),
            newState = Object.assign({}, x,
                {
                    editID: obj.ID,
                    inbound: (obj.OrderType === 1),
                    partnerOneSelected: this.props.partnersList1.Data.filter(y => (y.Id === obj.Transporter.PartnerId)),
                    partnerOneDetails: { Address: obj.Transporter.Address },
                    partnerSource: {
                        selected: this.props.partnersList2.Data.filter(y => (y.Id === obj.SourceOrDestinations.find(z => (z.PeartnerType === 2)).PartnerId)),
                        details: {
                            Address: obj.SourceOrDestinations.find(z => (z.PeartnerType === 2)).Address,
                            ProvinceName: obj.SourceOrDestinations.find(z => (z.PeartnerType === 2)).ProvinceName,
                            CityName: obj.SourceOrDestinations.find(z => (z.PeartnerType === 2)).CityName
                        },
                        actualDT: new Date(),
                        estimatedDT: new Date()
                    },
                    partnerDestination: {
                        selected: this.props.partnersList3.Data.filter(y => (y.Id === obj.SourceOrDestinations.find(z => (z.PeartnerType === 3)).PartnerId)),
                        details: {
                            Address: obj.SourceOrDestinations.find(z => (z.PeartnerType === 3)).Address,
                            ProvinceName: obj.SourceOrDestinations.find(z => (z.PeartnerType === 3)).ProvinceName,
                            CityName: obj.SourceOrDestinations.find(z => (z.PeartnerType === 3)).CityName
                        },
                        actualDT: new Date(),
                        estimatedDT: new Date()
                    }
                }
            ),
            rowsPartnerType = (newState.inbound ? 2 : 3),
            newRowsObj = obj.SourceOrDestinations.filter(y => (y.PeartnerType === rowsPartnerType)).map(y => {
                return {
                    selected: this.props[`partnersList${rowsPartnerType}`].Data.filter(z => (z.Id === y.PartnerId)),
                    details: {
                        Address: y.Address,
                        ProvinceName: y.ProvinceName,
                        CityName: y.CityName
                    },
                    actualDT: new Date(),
                    estimatedDT: new Date()
                }
            });

        newFormObj[0].value = obj.OrderNo;
        newFormObj[0].gridClass = "col-12 col-lg-6";

        newFormObj[1].value = obj.SOPONumber ? obj.SOPONumber : "";
        newFormObj[1].valid = true;

        newFormObj[2].value = this.props.fleetTypes.Data.find(x => (x.Id === obj.FleetType)).Value;
        newFormObj[2].valid = true;

        newFormObj[3].value = this.props.vehicleTypes.Data.filter(y => (y.Id == obj.VehicleShipmentType));
        newFormObj[3].valid = true;

        newFormObj[4].value = this.props.driverNames.Data.filter(y => (y.Id == obj.DriverNo));
        newFormObj[4].valid = true;

        newFormObj[5].value = obj.TotalPallet;
        newFormObj[5].valid = true;

        newFormObj[6].value = obj.OrderWeight;
        newFormObj[6].valid = true;

        newFormObj[7].value = obj.VehicleNo;
        newFormObj[7].valid = true;

        newFormObj[8].value = obj.Instructions;
        newFormObj[8].valid = true;

        newFormObj[9].value = obj.Harga;
        newFormObj[9].valid = true;

        newFormObj[10].value = this.props.regionCodes.Data.filter(y => (y.Id == obj.BusinessAreaId));
        newFormObj[10].valid = true;

        newFormObj[11].guid = obj.ShipmentScheduleImageGUID;
        newFormObj[11].valid = true;

        newState.rows = newRowsObj;

        await this.setState({ ...newState });
        this.refs.formRef.modifyFormObj(newFormObj)
    }

    /* EDIT MODE FUNCTIONS END */

    getPartnerType(i) {
        this.props[`getpartnerslist${i}`]({
            "Requests": [
                {
                    "PartnerTypeId": i
                }
            ],
            "SortOrder": "",
            "GlobalSearch": ""
        }, this.failure);
    }

    toggleChange() {
        let { rows } = this.state,
            newRowObj = rows.map(x => Object.assign({}, x, { selected: [], details: {} }));
        this.setState({ inbound: !this.state.inbound, rows: newRowObj })
    }

    async onPartnerOneChange(obj) {
        await this.setState({ partnerOneSelected: obj });

        if (obj.length) {

            let self = this;
            this.props.addloader('onPartnerOneChange');

            await axios(rootURL + ops.order.getpartnerdetails + "?partnerId=" + obj[0].Id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Token": this.props.credentials.TokenKey
                }
            })
                .then(function (response) {
                    console.log(response);
                    if (response.statusText === "OK" && response.data.StatusMessage === "Success") {
                        self.setState({ partnerOneDetails: response.data.Data[0] });
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

            this.props.removeloader('onPartnerOneChange');
        }
        else {
            await this.setState({ partnerOneDetails: {} });
        }
    }

    async onPartnerSrcDesChange(obj, pType) {
        await this.setState({ [pType]: Object.assign({}, this.state[pType], { selected: obj }) });

        if (obj.length) {

            let self = this;
            this.props.addloader('onPartnerSrcDesChange');

            await axios(rootURL + ops.order.getpartnerdetails + "?partnerId=" + obj[0].Id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Token": this.props.credentials.TokenKey
                }
            })
                .then(function (response) {
                    console.log(response);
                    if (response.statusText === "OK" && response.data.StatusMessage === "Success") {
                        self.setState({ [pType]: Object.assign({}, self.state[pType], { details: response.data.Data[0] }) });
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

            this.props.removeloader('onPartnerSrcDesChange');
        }
        else {
            await this.setState({ [pType]: Object.assign({}, this.state[pType], { details: {} }) });
        }
    }

    partnerSrcDesDateChange(date, label, pType) {
        this.setState({ [pType]: Object.assign({}, this.state[pType], { [label]: date }) });
    }

    async onRowChange(obj, i) {
        let { rows } = this.state;

        rows[i].selected = obj;

        await this.setState({ rows: rows });

        if (obj[0]) {

            let self = this;
            this.props.addloader('onRowChange');

            await axios(rootURL + ops.order.getpartnerdetails + "?partnerId=" + obj[0].Id, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Token": this.props.credentials.TokenKey
                }
            })
                .then(function (response) {
                    console.log(response);
                    if (response.statusText === "OK" && response.data.StatusMessage === "Success") {
                        rows[i].details = response.data.Data[0];
                        self.setState({ rows: rows });
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

            this.props.removeloader('onRowChange');
        }
    }

    rowDateChange(date, label, i) {
        let { rows } = this.state;

        rows[i][label] = date;

        this.setState({ rows });
    }

    addRow() {
        let { rows } = this.state;

        rows.push({
            selected: [],
            details: {},
            actualDT: new Date(),
            estimatedDT: new Date()
        });

        this.setState({ rows });
    }

    onEachSubmit() {
        this.setState({ formSubmitted: true });
    }

    async onFormSubmit(obj) {
        if (obj[11].value) {
            let self = this,
                thisTimer = setInterval(function () {
                    if (obj[11].guid) {
                        clearInterval(thisTimer);
                        self.postOrderDetailsManual(obj);
                    }
                }, 50);
        }
        else{
            this.postOrderDetailsManual(obj);
        }
    }

    async postOrderDetailsManual(obj) {
        let self = this,
            x = self.state;

        if (x.partnerOneSelected[0] && Boolean(x.inbound ? x.partnerDestination.selected[0] : x.partnerSource.selected[0]) && !x.rows.find(j => !(j.selected[0] && j.actualDT && j.estimatedDT))) {
            this.props.addloader('postOrderDetailsManual');

            let body = {
                "Requests": [
                ],
                "UploadType": 2,
                "CreatedBy": "System",
                "CreatedTime": new Date()
            };

            let reqObjs = this.state.rows.map((row, i) => {
                let adt = new Date(row.actualDT),
                    edt = new Date(row.estimatedDT);
                return {
                    "ID": x.editID,
                    "BusinessAreaId": obj[10].value[0].Id,
                    "OrderNo": obj[0].value,
                    "SOPONumber": obj[1].value,
                    "SequenceNo": (10 * (i + 1)),
                    "PartnerNo1": x.partnerOneSelected[0].Id,
                    "PartnerType1": 1,
                    "PartnerNo2": (x.inbound ? row.selected[0].Id : x.partnerSource.selected[0].Id),
                    "PartnerType2": 2,
                    "PartnerNo3": (x.inbound ? x.partnerDestination.selected[0].Id : row.selected[0].Id),
                    "PartnerType3": 3,
                    "FleetType": this.props.fleetTypes.Data.find(x => (x.Value === obj[2].value)).Id,
                    "OrderType": (x.inbound ? 1 : 2),
                    "VehicleShipmentType": obj[3].value[0].Id,
                    "DriverNo": obj[4].value[0].Id,
                    "VehicleNo": obj[7].value,
                    "OrderWeight": obj[6].value,
                    "OrderWeightUM": "KG",
                    // "SourceEstimationShipmentDate": "24.04.2019",
                    // "SourceEstimationShipmentTime": "15:00",
                    // "SourceActualShipmentDate": "24.04.2019",
                    // "SourceActualShipmentTime": "16:00",
                    "EstimationShipmentDate": `${roundTo(edt.getDate(), 2)}.${roundTo(edt.getMonth(), 2)}.${roundTo(edt.getFullYear(), 4)}`,
                    "EstimationShipmentTime": `${roundTo(edt.getHours(), 2)}:${roundTo(edt.getMinutes(), 2)}`,
                    "ActualShipmentDate": `${roundTo(adt.getDate(), 2)}.${roundTo(adt.getMonth(), 2)}.${roundTo(adt.getFullYear(), 4)}`,
                    "ActualShipmentTime": `${roundTo(adt.getHours(), 2)}:${roundTo(adt.getMinutes(), 2)}`,
                    "OrderShipmentStatus": 1,
                    "TotalPallet": obj[5].value,
                    "Instructions": obj[8].value,
                    "Harga": parseFloat(obj[9].value, 10),
                    "ShipmentScheduleImageGUID": obj[11].guid
                }
            });

            body.Requests = reqObjs;

            console.log(JSON.stringify(body));

            await axios(rootURL + ops.order.createupdateorders, {
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
                        if (response.statusText === "OK") {
                            if (response.data.Status === "Success") {
                                toast.success(response.data.StatusMessage);
                                self.props.history.push('/order');
                            }
                            else if (response.data.Status === "Failure") {
                                self.setState({ isOpen: true, uploadErrors: response.data.Data, responseError: response.data.StatusMessage });
                            }
                        }
                        else {
                            console.log("response", response);
                            self.props.modifyerror({ show: true });
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

            this.props.removeloader('postOrderDetailsManual');
        }
    }

    render() {
        console.log("order props....", this.props.location.params);
        
        return (
            <React.Fragment>
                <div className="PackingSheet">
                    <div className="text-right">
                        <ToggleBound toggle={this.state.inbound} onClick={() => this.toggleChange()} />
                    </div>
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">{this.props.location.params ? this.props.location.params.mode : "Create"} Order</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content">

                            <form className="upload-form px-2" onSubmit={e => e.preventDefault()}>
                                <div className="row">
                                    <div className="form-group col-12 col-md-6 col-lg-6">
                                        <label className="text-truncate">Nama Transporter<span className="text-danger font-weight-bold">*</span></label>
                                        <div className="position-relative">
                                            <Typeahead id="" labelKey="Value" options={this.props.partnersList1.Data} placeholder="Select an option" selected={this.state.partnerOneSelected} onChange={selected => this.onPartnerOneChange(selected)} />
                                            <i className="fas fa-search text-secondary position-absolute" style={{ right: "10px", top: "12px" }}></i>
                                        </div>
                                        <small className="form-text text-danger">{(this.state.formSubmitted && !this.state.partnerOneSelected.length) && "Please select an option"}</small>
                                    </div>
                                    <div className="form-group col-12 col-md-6 col-lg-6">
                                        <label className="text-truncate">Alamat Transporter<span className="text-danger font-weight-bold">*</span></label>
                                        <input className="form-control" readOnly={true} value={this.state.partnerOneDetails.Address ? this.state.partnerOneDetails.Address : ""} />
                                    </div>
                                </div>
                            </form>

                            <div className="table-cover table-responsive position-relative px-2 mt-5">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th scope="col">Source</th>
                                            <th scope="col">Tempat</th>
                                            <th scope="col">Nama</th>
                                            <th scope="col">Alamat</th>
                                            <th scope="col">Provinsi</th>
                                            <th scope="col">Kota</th>
                                            <th scope="col">Tanggal Pengiriman</th>
                                            <th scope="col">Estimasi Pengiriman</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !this.state.inbound &&
                                            <tr>
                                                <td>
                                                    <button type="button" className="btn rounded-circle circular-icon d-flex align-items-center justify-content-center">
                                                        <i className="far fa-trash-alt text-secondary"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <input type="text" className="form-control" readOnly={true} value="Asal" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input-group w_200 my-3">
                                                        <div className="position-relative">
                                                            <Typeahead id="" labelKey="Value" options={this.props.partnersList2.Data} placeholder="Select an option" selected={this.state.partnerSource.selected} onChange={selected => this.onPartnerSrcDesChange(selected, "partnerSource")} />
                                                            <i className="fas fa-search text-secondary position-absolute" style={{ right: "10px", top: "12px" }}></i>
                                                        </div>
                                                        <small className="form-text text-danger">{(this.state.formSubmitted && !this.state.partnerSource.selected.length) && "Please select an option"}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <input type="text" className="form-control" readOnly={true} value={Boolean(this.state.partnerSource.selected.length) ? this.state.partnerSource.selected[0].Value : ""} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <input type="text" className="form-control" readOnly={true} value={this.state.partnerSource.details.Address} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <input type="text" className="form-control" readOnly={true} value={this.state.partnerSource.details.ProvinceName} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <input type="text" className="form-control" readOnly={true} value={this.state.partnerSource.details.CityName} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <DatePicker dateFormat="dd.MM.yyyy HH:mm" selected={this.state.partnerSource.actualDT} onChange={date => this.partnerSrcDesDateChange(date, "actualDT", "partnerSource")} showTimeSelect timeFormat="HH:mm" timeIntervals={15} timeCaption="time" className="form-control" />
                                                        <small className="form-text text-danger">{(this.state.formSubmitted && !this.state.partnerSource.actualDT) && "Please specify a date & time"}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <DatePicker dateFormat="dd.MM.yyyy HH:mm" selected={this.state.partnerSource.estimatedDT} onChange={date => this.partnerSrcDesDateChange(date, "estimatedDT", "partnerSource")} showTimeSelect timeFormat="HH:mm" timeIntervals={15} timeCaption="time" className="form-control" />
                                                        <small className="form-text text-danger">{(this.state.formSubmitted && !this.state.partnerSource.estimatedDT) && "Please specify a date & time"}</small>
                                                    </div>
                                                </td>
                                            </tr>
                                        }

                                        {
                                            this.state.rows.map((row, i) =>
                                                <tr key={i}>
                                                    <td>
                                                        <button type="button" className="btn rounded-circle circular-icon d-flex align-items-center justify-content-center">
                                                            <i className="far fa-trash-alt text-secondary"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <div className="form-group w_200 my-3">
                                                            <input type="text" className="form-control" readOnly={true} value={this.state.inbound ? "Asal" : "Tujuan"} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input-group w_200 my-3">
                                                            <div className="position-relative">
                                                                <Typeahead id="" labelKey="Value" options={this.state.inbound ? this.props.partnersList2.Data : this.props.partnersList3.Data} placeholder="Select an option" selected={row.selected} onChange={selected => this.onRowChange(selected, i)} />
                                                                <i className="fas fa-search text-secondary position-absolute" style={{ right: "10px", top: "12px" }}></i>
                                                            </div>
                                                            <small className="form-text text-danger">{(this.state.formSubmitted && !row.selected.length) && "Please select an option"}</small>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group w_200 my-3">
                                                            <input type="text" className="form-control" readOnly={true} value={Boolean(row.selected.length) ? row.selected[0].Value : ""} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group w_200 my-3">
                                                            <input type="text" className="form-control" readOnly={true} value={row.details.Address ? row.details.Address : ""} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group w_200 my-3">
                                                            <input type="text" className="form-control" readOnly={true} value={row.details.ProvinceName ? row.details.ProvinceName : ""} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group w_200 my-3">
                                                            <input type="text" className="form-control" readOnly={true} value={row.details.CityName ? row.details.CityName : ""} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group w_200 my-3">
                                                            <DatePicker dateFormat="dd.MM.yyyy HH:mm" selected={row.actualDT} onChange={date => this.rowDateChange(date, "actualDT", i)} showTimeSelect timeFormat="HH:mm" timeIntervals={15} timeCaption="time" className="form-control" />
                                                            <small className="form-text text-danger">{(this.state.formSubmitted && !row.actualDT) && "Please specify a date & time"}</small>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="form-group w_200 my-3">
                                                            <DatePicker dateFormat="dd.MM.yyyy HH:mm" selected={row.estimatedDT} onChange={date => this.rowDateChange(date, "estimatedDT", i)} showTimeSelect timeFormat="HH:mm" timeIntervals={15} timeCaption="time" className="form-control" />
                                                            <small className="form-text text-danger">{(this.state.formSubmitted && !row.estimatedDT) && "Please specify a date & time"}</small>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                        {
                                            this.state.inbound &&
                                            <tr>
                                                <td>
                                                    <button type="button" className="btn rounded-circle circular-icon d-flex align-items-center justify-content-center">
                                                        <i className="far fa-trash-alt text-secondary"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <input type="text" className="form-control" readOnly={true} value="Tujuan" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input-group w_200 my-3">
                                                        <div className="position-relative">
                                                            <Typeahead id="" labelKey="Value" options={this.props.partnersList3.Data} placeholder="Select an option" selected={this.state.partnerDestination.selected} onChange={selected => this.onPartnerSrcDesChange(selected, "partnerDestination")} />
                                                            <i className="fas fa-search text-secondary position-absolute" style={{ right: "10px", top: "12px" }}></i>
                                                        </div>
                                                        <small className="form-text text-danger">{(this.state.formSubmitted && !this.state.partnerDestination.selected.length) && "Please select an option"}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <input type="text" className="form-control" readOnly={true} value={Boolean(this.state.partnerDestination.selected.length) ? this.state.partnerDestination.selected[0].Value : ""} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <input type="text" className="form-control" readOnly={true} value={this.state.partnerDestination.details.Address} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <input type="text" className="form-control" readOnly={true} value={this.state.partnerDestination.details.ProvinceName} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <input type="text" className="form-control" readOnly={true} value={this.state.partnerDestination.details.CityName} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <DatePicker dateFormat="dd.MM.yyyy HH:mm" selected={this.state.partnerDestination.actualDT} onChange={date => this.partnerSrcDesDateChange(date, "actualDT", "partnerDestination")} showTimeSelect timeFormat="HH:mm" timeIntervals={15} timeCaption="time" className="form-control" />
                                                        <small className="form-text text-danger">{(this.state.formSubmitted && !this.state.partnerDestination.actualDT) && "Please specify a date & time"}</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group w_200 my-3">
                                                        <DatePicker dateFormat="dd.MM.yyyy HH:mm" selected={this.state.partnerDestination.estimatedDT} onChange={date => this.partnerSrcDesDateChange(date, "estimatedDT", "partnerDestination")} showTimeSelect timeFormat="HH:mm" timeIntervals={15} timeCaption="time" className="form-control" />
                                                        <small className="form-text text-danger">{(this.state.formSubmitted && !this.state.partnerDestination.estimatedDT) && "Please specify a date & time"}</small>
                                                    </div>
                                                </td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>

                            </div>

                            <div className="row m-0 py-4">
                                <div className="col-12 col-md-12 col-lg-12 text-center">
                                    <button className="btn btn-outline-primary add-button p-2 ml-auto" onClick={() => this.addRow()}><i className="fas fa-plus"></i></button>
                                </div>
                            </div>

                            <div className="my-4">
                                <div className="px-2">
                                    <Form
                                        fields={JSON.parse(JSON.stringify(uploadFormElems))}
                                        className="upload-form px-2"
                                        footerClassName="d-none"
                                        onEachSubmit={() => this.onEachSubmit()}
                                        onSubmit={obj => this.onFormSubmit(obj)}
                                        ref="formRef"
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0 py-4">
                            {
                                (this.props.location.params && this.props.location.params.mode === "view") ?
                                    null :
                                    <button className="text-uppercase btn btn-success save-button px-5" type="submit" onClick={() => this.refs.formRef.onFormSubmit()}>SAVE</button>
                            }
                            <button className="text-uppercase btn btn-danger save-button px-5 ml-4" type="button" onClick={() => this.props.history.push('/order')}>CANCEL</button>
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.isOpen} toggle={() => this.setState({ isOpen: false })} className="modal-dialog-centered file-upload-error-modal">
                    <div className="modal-body">
                        <div className="image-wrap text-center">
                            <img alt="Upload Failed" className="img-fluid" src={require("../../../img/upload_failed.svg")} />
                        </div>
                        {Boolean(this.state.responseError) &&
                            <h6 className="text-center mt-4">{this.state.responseError}</h6>
                        }
                        <ul className={classNames({ "pt-4": Boolean(!this.state.responseError) })}>
                            {
                                this.state.uploadErrors.map(x =>
                                    <li key={x.ErrorMessage}>{x.ErrorMessage}</li>
                                )
                            }
                        </ul>
                        <div className="modal-close-wrap text-center">
                            <button style={{ "backgroundColor": "#00539F", "borderRadius": "50px" }} onClick={() => this.setState({ isOpen: false })} className="btn btn-primary border-0">COBA LAGI</button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { order } = views,
        { partnersList1, partnersList2, partnersList3, fleetTypes, vehicleTypes, driverNames, regionCodes } = order;
    return { credentials, partnersList1, partnersList2, partnersList3, fleetTypes, vehicleTypes, driverNames, regionCodes }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getpartnerslist1,
        getpartnerslist2,
        getpartnerslist3,
        getfleettypes,
        getvehicletypes,
        getdrivernames,
        getregioncodes
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);