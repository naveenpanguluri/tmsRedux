import React from 'react';
import './createVehiclePools.scss';

import Form from '../../common/form';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getpoolNames, getshipperNames, getvehicleTypeNames } from '../../../store/viewsactions/masterData';

let
    uploadFormElems = [
        {
            name: 'Plat No.',
            placeholder: '',
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
                    regex: "^.{3,12}$",
                    message: "Should be 3 - 12 characters"
                },
                {
                    regex: "^[a-zA-Z0-9 ]{3,12}$",
                    message: "Entered value is invalid"
                }
            ]
        },
        {
            name: 'Police No.',
            placeholder: '',
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
                    regex: "^.{3,12}$",
                    message: "Should be 3 - 12 characters"
                },
                {
                    regex: "^[a-zA-Z0-9 ]{3,12}$",
                    message: "Entered value is invalid"
                }
            ]
        },
        {
            name: 'Max Beban (kg)',
            placeholder: '',
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
                    regex: "^.{1,}$",
                    message: "Should be atleast 1 character"
                },
                {
                    regex: "(^[0-9]+$|^[0-9]+\.[0-9]+$)",
                    message: "Max Beban should be numerical"
                }
            ]
        },
        {
            name: 'Max Dimensi (cbm)',
            placeholder: '',
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
                    regex: "^.{5,12}$",
                    message: "Should be 5 - 12 characters"
                },
                {
                    regex: "^[0-9]+\\*[0-9]+\\*[0-9]+$",
                    message: "Value should be in '1*1*1' pattern"
                }
            ]
        },
        {
            name: 'Jenis Kendaraan',
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            disabled: true,
            field: {
                type: "text"
            },
            gridClass: "col-12 col-md-6 col-lg-6",
            check: [
                {
                    regex: "^.{0,}$",
                    message: ""
                }
            ]
        },
        {
            name: 'Shipper',
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            disabled: true,
            field: {
                type: "text"
            },
            gridClass: "col-12 col-md-6 col-lg-6",
            check: [
                {
                    regex: "^.{0,}$",
                    message: ""
                }
            ]
        },
        {
            name: 'Pool',
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            disabled: true,
            field: {
                type: "text"
            },
            gridClass: "col-12 col-md-6 col-lg-6",
            check: [
                {
                    regex: "^.{0,}$",
                    message: ""
                }
            ]
        },
        {
            name: 'KIR No.',
            placeholder: '',
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
                    regex: "^.{3,25}$",
                    message: "Should be 3 - 25 characters"
                },
                {
                    regex: "^[a-zA-Z0-9 ]{3,25}$",
                    message: "Entered value is invalid"
                }
            ]
        },
        {
            name: 'KIR/Expired',
            placeholder: 'KIR Expiry',
            value: null,
            errMsg: 'Required Field',
            required: true,
            valid: false,
            field: {
                type: "datepicker"
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'Dedicated',
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
                    },
                    {
                        label: 'Yes',
                        value: '1'
                    },
                    {
                        label: 'No',
                        value: '2'
                    }
                ]
            },
            gridClass: "col-12 col-md-6 col-lg-6",
            check: [
                {
                    regex: "^[0-9]+$",
                    message: "Please select an option"
                }
            ]
        }
    ];

class CreateVehiclePools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formObj: uploadFormElems,
            vehicleType: [],
            shipperType: [],
            poolType: [],
            dataFlag: false,
            formSubmitted: false,
            dataNull: false
        }
        this.editVehicle = this.editVehicle.bind(this);
        this.generateTypeHead = this.generateTypeHead.bind(this);

        props.getvehicleTypeNames(this.failure);
        props.getshipperNames(this.failure);
        props.getpoolNames(this.failure);
    }

    failure = async () => {
        if (!this.state.dataNull) {
            await this.setState({ dataNull: true });
            this.props.history.push('/masterdata/maintainvehicle');
        }
    }

    componentDidMount() {
        this.componentInitCheck()
    }

    componentDidUpdate() {
        this.componentInitCheck()
    }

    async componentInitCheck() {
        if (!this.state.dataFlag && this.props.vehicleTypeNames.Data.length && this.props.shipperNames.Data.length && this.props.poolNames.Data.length) {
            await this.setState({ dataFlag: true });
            if (this.props.location.params) {
                this.editVehicle();
            }
            else {
                this.refs.formRef.modifyFormObj(await this.typeHeadCodeBuild());
            }
        }
    }

    async typeHeadCodeBuild() {
        let index = 4,
            formObj = JSON.parse(JSON.stringify(await this.refs.formRef.getFormState().form));

        formObj[index] = {
            component:
                this.generateTypeHead({
                    label: "Jenis Kendaraan",
                    options: this.props.vehicleTypeNames.Data,
                    selected: this.state.vehicleType,
                    field: "vehicleType",
                    index: index
                }),
            field: {
                type: "component"
            }
        };

        index = 5;

        formObj[index] = {
            component:
                this.generateTypeHead({
                    label: "Shipper",
                    options: this.props.shipperNames.Data,
                    selected: this.state.shipperType,
                    field: "shipperType",
                    index: index
                }),
            field: {
                type: "component"
            }
        };

        index = 6;

        formObj[index] = {
            component:
                this.generateTypeHead({
                    label: "Pool",
                    options: this.props.poolNames.Data,
                    selected: this.state.poolType,
                    field: "poolType",
                    index: index
                }),
            field: {
                type: "component"
            }
        };

        return formObj;
    }

    generateTypeHead(obj) {
        return (
            <div className="form-group col-12 col-md-6 col-lg-6">
                <label className="text-truncate">{obj.label}<span className="text-danger font-weight-bold">*</span></label>
                <div className="position-relative">
                    <Typeahead id="" labelKey="Value" options={obj.options.filter(x => Boolean(x.Value))} placeholder="Select an option" selected={obj.selected} onChange={(selected) => this.onTypeheadChange(obj.field, obj.index, selected)} />
                    <i className="fas fa-search text-secondary position-absolute" style={{ right: "10px", top: "12px" }}></i>
                </div>
                <small className="form-text text-danger">{this.state.formSubmitted && !Boolean(this.state[obj.field].length) && "Required Field"}</small>
            </div>
        )
    }

    onTypeheadChange = async (field, index, obj) => {
        await this.setState({ [field]: obj });
        this.refs.formRef.modifyFormObj(await this.typeHeadCodeBuild());
    }

    async editVehicle() {
        let y = this.props.location.params.vehicle;

        await this.setState({
            vehicleType: [this.props.vehicleTypeNames.Data.find(x => x.Id === y.VehicleTypeID)],
            shipperType: [this.props.shipperNames.Data.find(x => x.Id === y.ShipperID)],
            poolType: [this.props.poolNames.Data.find(x => x.Id === y.PoolID)]
        });

        let x = await this.typeHeadCodeBuild();

        x[0].value = y.PlateNumber;
        x[0].valid = true;
        x[0].disabled = true;

        x[1].value = y.PoliceNo;
        x[1].valid = true;

        x[2].value = y.MaxWeight;
        x[2].valid = true;

        x[3].value = y.MaxDimension;
        x[3].valid = true;

        x[7].value = y.KIRNo;
        x[7].valid = true;

        x[8].value = new Date(y.KIRExpiryDate);
        x[8].valid = true;

        x[9].value = y.IsDedicated ? 1 : 2;
        x[9].valid = true;

        setTimeout(() => this.refs.formRef.modifyFormObj(x), 500);
    }

    async onEachSubmit() {
        await this.setState({ formSubmitted: true });
        this.refs.formRef.modifyFormObj(await this.typeHeadCodeBuild());
    }

    async formSubmit(obj) {
        let { vehicleType, shipperType, poolType } = this.state;
        if (vehicleType.length && shipperType.length && poolType.length) {
            let self = this;
            this.props.addloader('createupdatevehicle');

            let body = {
                "Requests": [
                    {
                        "ID": 0,
                        "PlateNumber": obj[0].value,
                        "VehicleTypeID": vehicleType[0].Id,
                        "VehicleTypeName": vehicleType[0].Value,
                        "PoliceNo": obj[1].value,
                        "MaxWeight": obj[2].value,
                        "MaxDimension": obj[3].value,
                        "KIRNo": obj[7].value,
                        "KIRExpiryDate": new Date(obj[8].value).toISOString(),
                        "PoolID": poolType[0].Id,
                        "IsDedicated": (obj[9].value == 1) ? true : false,
                        "ShipperID": shipperType[0].Id,
                        "IsActive": true,
                        "IsDelete": true
                    }
                ],
                "CreatedBy": "System",
                "CreatedTime": new Date()
            };

            if (this.props.location.params) {
                body.Requests[0].ID = this.props.location.params.vehicle.ID.toString(10);
            }

            console.log(JSON.stringify(body));

            await axios(rootURL + ops.vehicle.createupdatevehicle, {
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
                            self.props.history.push('/masterdata/maintainvehicle');
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

            this.props.removeloader('createupdatevehicle');
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="PackingSheet">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">{this.props.location.params ? "Edit" : "Create"} Vehicle</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content">

                            <Form
                                fields={this.state.formObj}
                                className="upload-form px-2"
                                footerClassName="d-none"
                                onSubmit={obj => this.formSubmit(obj)}
                                onEachSubmit={() => this.onEachSubmit()}
                                ref="formRef"
                            />

                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0 py-4">
                            <button className="text-uppercase btn btn-success save-button px-5" type="submit" onClick={() => this.refs.formRef.onFormSubmit()}>SAVE</button>
                            <button className="text-uppercase btn btn-danger save-button px-5 ml-4" type="button" onClick={() => this.props.history.push('/masterdata/maintainvehicle')}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    let { credentials, views } = state,
        { masterData } = views,
        { poolNames, shipperNames, vehicleTypeNames } = masterData;
    return { credentials, poolNames, shipperNames, vehicleTypeNames }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getpoolNames,
        getshipperNames,
        getvehicleTypeNames
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateVehiclePools);