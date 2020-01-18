import React from 'react';
import './uploadOrder.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import ToggleBound from '../../common/togglebound';
import { Modal } from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';

const XLSX = require('xlsx');

let uploadFormElems = [
    {
        name: 'File Name',
        placeholder: 'Choose File',
        value: '',
        errMsg: '',
        required: true,
        disabled: true,
        valid: false,
        field: {
            type: "text"
        },
        gridClass: "col-12",
        check: [
            {
                regex: ".*\.(xls|xlsx)$",
                message: "Please upload an excel file with .xls or .xlsx extension"
            }
        ]
    }
],
    jsonColumns = ["BusinessArea", "OrderNo", "SequenceNo", "PartnerNo1", "PartnerType1", "PartnerName1", "PartnerNo2", "PartnerType2", "PartnerName2", "PartnerNo3", "PartnerType3", "PartnerName3", "FleetType", "OrderType", "VehicleShipmentType", "DriverNo", "DriverName", "VehicleNo", "OrderWeight", "OrderWeightUM", "EstimationShipmentDate", "EstimationShipmentTime", "ActualShipmentDate", "ActualShipmentTime", "Sender", "Receiver", "OrderShipmentStatus", "Dimension", "TotalPallet", "Instructions", "ShippingListNo", "PackingSheetNo", "TotalCollie", "ShipmentSAPNo"],
    excelColumns = ["BusinessArea", "Order No", "SequenceNo", "PartnerNo1", "PartnerType1", "Partnet Name 1", "PartnerNo 2", "Partner Type 2", "Partner Name 2", "Partner No 3", "Partner Type 3", "Partner Name 3", "Fleet Type", "Order Type", "Vehicle Shipment", "Driver No", "Driver Name", "Vehicle No", "Order Weight", "Order Weight Unit Of Measure", "Estimation Shipment Date", "Estimation Shipment Time", "Actual Shipment Date", "Actual Shipment Time", "Sender", "Receiver ", "Order Shipment Status", "Dimension", "Total Pallet", "Instructions", "Shipping List No", "Packing Sheet No", "Total Collie", "Shipment SAP No"];

class UploadOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false, inbound: true, filename: "", uploadErrors: [], responseError: "", formSubmitted: false }
        this.fileUploadRef = React.createRef();
    }

    async fileSelected(e) {
        let filename = "";

        if (this.fileUploadRef.current.value.indexOf("fakepath") !== -1) {
            filename = this.fileUploadRef.current.value.split("fakepath\\")[1];
        }

        this.setState({ filename: filename });
    }

    async fileSubmit(){
        this.setState({ formSubmitted: true });
        if(Boolean(this.state.filename.length) && new RegExp(".*\.(xls|xlsx)$").test(this.state.filename)){
            this.uploadFile();
        }
    }

    uploadFile() {
        let reader = new FileReader(),
            self = this;

        reader.onload = async function (e) {
            let data = new Uint8Array(e.target.result),
                workbook = XLSX.read(data, { type: 'array' }),
                first_sheet_name = workbook.SheetNames[0],
                worksheet = workbook.Sheets[first_sheet_name],
                worksheetkeys = Object.keys(worksheet).filter(x => (x !== "!margins" && x !== "!ref"));

            for (let key of worksheetkeys) {
                if (worksheet[key].t === "n") {
                    worksheet[key].t = "s";
                    worksheet[key].v = worksheet[key].w;
                }
            }

            let
                excelJSON = XLSX.utils.sheet_to_json(worksheet, { raw: true }),
                excelFormat = true,
                postData = [],
                headers = [],
                range = XLSX.utils.decode_range(worksheet['!ref']),
                colStart = range.s.c,
                rowStart = range.s.r;

            for (colStart; colStart <= range.e.c; ++colStart) {
                var cell = worksheet[XLSX.utils.encode_cell({ c: colStart, r: rowStart })]

                var hdr = "UNKNOWN";
                if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);

                headers.push(hdr);
            }

            for (let i in excelColumns) {
                if (headers.indexOf(excelColumns[i]) === -1) {
                    self.props.modifyerror({ show: true, text: "The format of the excel is not as expected. Please modify & re-upload the file." });
                    excelFormat = false;
                    break;
                }
            }

            if (excelFormat) {
                self.props.addloader('modalFormSubmit');

                for (let x of excelJSON) {
                    let obj = { "ID": 0 };
                    for (let i in excelColumns) {
                        obj[jsonColumns[i]] = x[excelColumns[i]]
                    }
                    postData.push(obj);
                }

                let body = {
                    "Requests": postData,
                    "UploadType": 1,
                    "CreatedBy": "system"
                };

                console.log(JSON.stringify(body));

                await axios(rootURL + ops.order.createupdateorders, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Token": self.props.credentials.TokenKey
                    },
                    data: JSON.stringify(body)
                })
                    .then(function (response) {
                        console.log("response", response);
                        if (response.statusText === "OK" && response.data.Status === "Success") {
                            toast.success(response.data.StatusMessage);
                        }
                        else if (response.statusText === "OK" && response.data.Status === "Failure") {
                            self.setState({ isOpen: true, uploadErrors: response.data.Data, responseError: response.data.StatusMessage });
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

                self.props.removeloader('modalFormSubmit');
                self.setState({ filename: "", formSubmitted: false });
            }
        };

        reader.readAsArrayBuffer(this.fileUploadRef.current.files[0]);
    }

    render() {
        return (
            <React.Fragment>
                <div className="text-right pt-3 pr-3">
                    <ToggleBound toggle={this.state.inbound} onClick={() => this.setState({ inbound: !this.state.inbound })} />
                </div>

                <div className="tabs-wrap pt-0">
                    <div className="tabs-header-wrap">
                        <div className="tabs-title d-none d-md-block d-lg-block active">Upload Order</div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="tabs-content">
                        <div className="d-block d-lg-flex">
                            <form className="upload-form col-12 col-lg-6 px-2">
                                <div className="row">
                                    <div className="form-group col-12">
                                        <label className="text-truncate">File Name<span className="text-danger font-weight-bold">*</span></label>
                                        <div className="flex-grow-1" onClick={() => this.fileUploadRef.current.click()}>                                        
                                            <input type="text" disabled className="form-control" style={{"cursor": "pointer"}} aria-label="File Name" placeholder="Choose File" value={this.state.filename} />
                                        </div>
                                        <small className="form-text text-danger">{((this.state.formSubmitted && this.state.filename === "") || (Boolean(this.state.filename.length) && !new RegExp(".*\.(xls|xlsx)$").test(this.state.filename))) && "Please upload an excel file with .xls or .xlsx extension"}</small>
                                    </div>
                                </div>
                            </form>

                            <div className="col-12 col-lg-6 px-2 text-right text-lg-left">
                                <button className="text-uppercase btn btn-primary choose-button px-4 mt-2 mt-lg-0 mx-2" type="button" onClick={() => this.fileUploadRef.current.click()}>CHOOSE FILE</button>
                                <button className="text-uppercase btn btn-primary upload-button px-4 mt-2 mt-lg-0 mx-2" type="button" onClick={() => this.fileSubmit()}>UPLOAD</button>
                                <input type="file" ref={this.fileUploadRef} className="d-none" id="uploadfileinput" onChange={() => this.fileSelected()} />
                            </div>
                        </div>
                        <div className="px-2">
                            <a href={require("../../../Order_Upload_Sample.xlsx")} download="Upload Order Sample">Download a sample</a>
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
                        <ul>
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
    let { credentials } = state;
    return { credentials }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UploadOrder);