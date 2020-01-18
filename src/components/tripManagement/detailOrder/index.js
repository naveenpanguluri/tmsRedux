import React from 'react';
import './detailOrder.scss';
import classNames from 'classnames/bind';

import Form from '../../common/form';
import { StaticLoader } from '../../common/loader';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getfleettypes, getvehicletypes, getdrivernames } from '../../../store/viewsactions/order';

class DetailOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetails: {},
            formSubmitted: false,
            dataNull: false
        };

        if (!props.location.params) {
            props.history.push("/tripmanagement")
        }
        else {
            props.getvehicletypes(this.failure);
            props.getdrivernames(this.failure);
            props.getfleettypes(this.failure);
        }
    }

    failure = async () => {
        if (!this.state.dataNull) {
            await this.setState({ dataNull: true });
            this.props.history.push('/tripmanagement');
        }
    }

    componentDidMount() {
        this.getOrderDetails();
    }

    async getOrderDetails() {
        let self = this,
            x = this.props.location.params.order;
        this.props.addloader('getOrderDetails');

        await axios(rootURL + ops.tripManagement.gettripdetails + "?orderId=" + x.OrderId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": this.props.credentials.TokenKey
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.statusText === "OK" && response.data.StatusMessage === "Success") {
                    self.setState({ orderDetails: response.data });
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

        this.props.removeloader('getOrderDetails');
    }

    async formSubmit(obj) {
        await this.setState({ formSubmitted: true });

        let { orderDetails } = this.state,
            { VehicleShipmentType, DriverNo } = orderDetails;

        if(VehicleShipmentType && DriverNo){
            this.tripManagementReassign(obj);
        }
    }

    async tripManagementReassign(obj){
        let { orderDetails } = this.state,
            self = this;
        this.props.addloader('tripManagementReassign');

        let body = {
            "Requests": [
                {
                    "OrderId": this.props.location.params.order.OrderId,
                    "Vehicle": orderDetails.VehicleShipmentType,
                    "DriverNo": orderDetails.DriverNo,
                    "DriverName": orderDetails.DriverNo
                }
            ],
            "LastModifiedBy": "system",
            "LastModifiedTime": new Date()
        };

        console.log(JSON.stringify(body));

        await axios(rootURL + ops.tripManagement.updatetripdetails, {
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
                        self.props.history.push('/tripmanagement');
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

        this.props.removeloader('tripManagementReassign');
    }

    render() {
        let { orderDetails } = this.state;
        return (
            Boolean(Object.keys(orderDetails).length) ?
                <React.Fragment>
                    <div className="PackingSheet">
                        <div className="tabs-wrap">
                            <div className="tabs-header-wrap">
                                <div className="tabs-title d-none d-md-block d-lg-block active">Detail Order</div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="tabs-content">

                                <form className="upload-form px-2" onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="form-group col-12 col-md-6 col-lg-6">
                                            <label className="text-truncate">Nama Transporter<span className="text-danger font-weight-bold">*</span></label>
                                            <input type="text" className="form-control" aria-label="Nama Transporter" readOnly={true} value={orderDetails.Transporter.PartnerName} />
                                        </div>
                                        <div className="form-group col-12 col-md-6 col-lg-6">
                                            <label className="text-truncate">Alamat Transporter<span className="text-danger font-weight-bold">*</span></label>
                                            <p className="form-control border-0">{orderDetails.Transporter.Address}</p>
                                        </div>
                                    </div>
                                </form>

                                <div className="table-cover table-responsive px-2 mt-5">
                                    <table className="table">
                                        <thead>
                                            <tr>
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
                                                orderDetails.SourceOrDestinations.map(SoD =>
                                                    <tr>
                                                        <td>
                                                            <div className="form-group w_200 my-3">
                                                                <input type="text" className="form-control" readOnly={true} value={(SoD.PeartnerType === 2) ? "Asal" : ((SoD.PeartnerType === 3) ? "Tujuan" : "")} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group w_200 my-3">
                                                                <input type="text" className="form-control" readOnly={true} value={SoD.PartnerCode} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group w_200 my-3">
                                                                <input type="text" className="form-control" readOnly={true} value={SoD.PartnerName} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group w_200 my-3">
                                                                <input type="text" className="form-control" readOnly={true} value={SoD.Address} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group w_200 my-3">
                                                                <input type="text" className="form-control" readOnly={true} value={SoD.ProvinceName} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group w_200 my-3">
                                                                <input type="text" className="form-control" readOnly={true} value={SoD.CityName} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group w_200 my-3">
                                                                <input type="text" className="form-control" readOnly={true} value={SoD.ActualShipmentDate} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="form-group w_200 my-3">
                                                                <input type="text" className="form-control" readOnly={true} value={SoD.EstimationShipmentDate} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }

                                        </tbody>
                                    </table>

                                </div>


                                <div className="my-5">
                                    <div className="row m-0 py-3">
                                        <div className="col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label for="usr">PO/SO Number</label>
                                                <input type="text" className="form-control" readOnly={true} value={orderDetails.OrderNo} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <label className="mb-3">Tipe Muatan</label>
                                            <div className="form-group">

                                                {
                                                    Boolean(this.props.fleetTypes.Data.length) && (orderDetails.FleetType) &&
                                                    this.props.fleetTypes.Data.map(ft =>
                                                        <div className="form-check-inline mr-5" key={ft.Id}>
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" readOnly={true} checked={orderDetails.FleetType === ft.Id} />{ft.Value}
                                                            </label>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row m-0 py-3">
                                        <div className="col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label for="sel1">Tipe Kendaraan</label>
                                                <select className="form-control" readOnly={this.props.location.params.mode === "view"} disabled={this.props.location.params.mode === "view"} value={orderDetails.VehicleShipmentType} onChange={e => this.setState({ orderDetails: Object.assign({}, orderDetails, { VehicleShipmentType: e.target.value }) })}>
                                                    <option value="">Select an option</option>
                                                    {
                                                        this.props.vehicleTypes.Data.map(vt =>
                                                            <option key={vt.Id} value={vt.Id}>{vt.Value}</option>
                                                        )
                                                    }
                                                </select>
                                                <small className="form-text text-danger">{(this.state.formSubmitted && orderDetails.VehicleShipmentType == "") && "Required field"}</small>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label>Nama Pengendara</label>
                                                <select className="form-control" readOnly={this.props.location.params.mode === "view"} disabled={this.props.location.params.mode === "view"} value={orderDetails.DriverNo} onChange={e => this.setState({ orderDetails: Object.assign({}, orderDetails, { DriverNo: e.target.value }) })}>
                                                    <option value="">Select an option</option>
                                                    {
                                                        this.props.driverNames.Data.map(dn =>
                                                            <option key={dn.Value} value={dn.Value}>{dn.Value}</option>
                                                        )
                                                    }
                                                </select>
                                                <small className="form-text text-danger">{(this.state.formSubmitted && orderDetails.DriverNo == "") && "Required field"}</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row m-0 py-3">
                                        <div className="col-md-6 col-lg-6">
                                            <label>Estimated Total Pallet</label>
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" readOnly={true} value={orderDetails.TotalPallet} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">cm<sup>3</sup></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <label>Weight</label>
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" readOnly={true} value={orderDetails.OrderWeight} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">{orderDetails.OrderWeightUM}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row m-0 py-3">
                                        <div className="col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label>Police Number</label>
                                                <input type="text" className="form-control" readOnly={true} value={orderDetails.VehicleNo} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label for="usr">Instruksi</label>
                                                <input type="text" className="form-control" readOnly={true} value={orderDetails.Instructions} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row m-0 py-3">
                                        <div className="col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label for="usr">Harga</label>
                                                <input type="text" className="form-control" readOnly={true} value={orderDetails.Harga} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                            <label>Shipment Schedule</label>
                                            <div className="input-group mb-3">
                                                <a href="#" onClick={e => { e.preventDefault(); window.open(rootURL + ops.uploadMedia.downloadfile + "?fileguid=" + orderDetails.ShipmentScheduleImageGUID, "Uploaded Image", "width=800,height=600") }}>View uploaded image</a>
                                            </div>

                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>
                        <div className="row m-0">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0 py-4">
                                {
                                    (this.props.location.params.mode === "edit") &&
                                    <button className="text-uppercase btn btn-success save-button px-5" type="submit" onClick={() => this.formSubmit()}>SAVE</button>
                                }
                                <button className="text-uppercase btn btn-danger save-button px-5 ml-4" type="button" onClick={() => this.props.history.push('/tripmanagement')}>CANCEL</button>
                            </div>
                        </div>
                    </div>
                </React.Fragment> :
                StaticLoader
        );
    }
}

const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { order } = views,
        { fleetTypes, vehicleTypes, driverNames } = order;
    return { credentials, fleetTypes, vehicleTypes, driverNames }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getfleettypes,
        getvehicletypes,
        getdrivernames
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrder);