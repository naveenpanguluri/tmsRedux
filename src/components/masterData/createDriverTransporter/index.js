import React from 'react';
import './createDriverTransporter.scss';

import Form from '../../common/form';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getpartnerslist } from '../../../store/viewsactions/masterData';

let
    uploadFormElems = [
        {
            name: 'ID',
            placeholder: '',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
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
            name: '',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            field: {
                type: "checkbox",
                horizontal: true,
                options: [
                    {
                        label: 'Aktif',
                        checked: false
                    }
                ]
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'First Name',
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
                    regex: "^.{3,30}$",
                    message: "Should be 3 - 30 characters"
                },
                {
                    regex: "^[a-zA-Z]{3,30}$",
                    message: "Entered value is invalid"
                }
            ]
        },
        {
            name: 'Last Name',
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
                    regex: "^.{3,30}$",
                    message: "Should be 3 - 30 characters"
                },
                {
                    regex: "^[a-zA-Z]{3,30}$",
                    message: "Entered value is invalid"
                }
            ]
        },
        {
            name: 'Address',
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
                    regex: "^.{6,200}$",
                    message: "Should be 6 - 200 characters"
                }
            ]
        },
        {
            name: 'No. Telepon',
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
                    regex: "^.{10,15}$",
                    message: "Should be 10 - 15 digits"
                },
                {
                    regex: "^[0-9]{10,15}$",
                    message: "Entered value number is invalid"
                }
            ]
        },
        {
            name: 'Email',
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
                    regex: "^.{0,50}$",
                    message: "Email id is too long"
                },
                {
                    regex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$",
                    message: "Please enter a valid email id"
                }
            ]
        },

        {
            name: 'Username',
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
                    regex: "^.{2,}$",
                    message: "Should be atleast 2 characters"
                },
                {
                    regex: "^[a-zA-Z0-9]{2,}$",
                    message: "Username should not have any special characters, spaces"
                }
            ]
        },
        {
            name: 'Password',
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "password"
            },
            gridClass: "col-12 col-md-6 col-lg-6",
            check: [
                {
                    regex: "^.{8,30}$",
                    message: "Should be 8 - 30 characters"
                },
                {
                    regex: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})",
                    message: "Should contain atleast 1 character from each set: (a-z), (A-Z), (0-9), (!, @, #, $, %, ^, &, *)."
                }
            ]
        },
        {
            name: 'Confirm Password',
            placeholder: '',
            value: '',
            errMsg: "Password doesn't match",
            required: true,
            valid: false,
            field: {
                type: "confirm",
                pair: "Password"
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'No. KTP',
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
                    regex: "^.{10,20}$",
                    message: "Should be 10 - 20 characters"
                },
                {
                    regex: "^[0-9]{10,20}$",
                    message: "Entered value is invalid"
                }
            ]
        },
        {
            name: 'Foto KTP',
            placeholder: '',
            value: '',
            guid: null,
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "browsefoto"
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'No. SIM',
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
                    regex: "^.{10,20}$",
                    message: "Should be 10 - 20 characters"
                },
                {
                    regex: "^[0-9]{10,20}$",
                    message: "Entered value is invalid"
                }
            ]
        },
        {
            name: 'Batas Berlaku',
            placeholder: '',
            value: null,
            errMsg: '',
            required: false,
            valid: true,
            field: {
                type: "datepicker"
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'Foto SIM',
            placeholder: '',
            value: '',
            guid: null,
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "browsefoto"
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'Foto Diri',
            placeholder: '',
            value: '',
            guid: null,
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "browsefoto"
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        },
        {
            name: 'Partner',
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
        }
    ];

class CreateDriverTransporter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            dataFlag: false,
            selectedPartner: []
        };
        this.getPartners();
        this.editDriverTransporter = this.editDriverTransporter.bind(this);
    }

    failure = async () => {
        this.props.history.push("/masterdata/maintaindrivertransporter");
    }

    componentDidMount() {
        this.componentInitCheck()
    }

    componentDidUpdate() {
        this.componentInitCheck()
    }

    async componentInitCheck() {
        if (!this.state.dataFlag && this.props.partnersList.Data.length) {
            await this.setState({ dataFlag: true });
            if (this.props.location.params) {
                this.editDriverTransporter();
            }
            else {
                this.refs.formRef.modifyFormObj(await this.typeHeadCodeBuild());
            }
        }
    }

    async typeHeadCodeBuild() {
        let formObj = JSON.parse(JSON.stringify(await this.refs.formRef.getFormState().form));

        formObj[16] = {
            component:
                <div className="form-group col-12 col-md-6 col-lg-6">
                    <label className="text-truncate">Partner<span className="text-danger font-weight-bold">*</span></label>
                    <div className="position-relative">
                        <Typeahead id="" labelKey="Value" options={this.props.partnersList.Data.filter(x => Boolean(x.Value))} placeholder="Select an option" selected={this.state.selectedPartner} onChange={(selected) => this.setState({ selectedPartner: selected })} />
                        <i className="fas fa-search text-secondary position-absolute" style={{ right: "10px", top: "12px" }}></i>
                    </div>
                    <small className="form-text text-danger">{this.state.formSubmitted && !Boolean(this.state.selectedPartner.length) && "Required Field"}</small>
                </div>,
            field: {
                type: "component"
            }
        };

        return formObj;
    }

    getPartners() {
        this.props.getpartnerslist({
            "Requests": [
                {
                    "PartnerTypeId": 1
                }
            ]
        }, this.failure);
    }

    async editDriverTransporter() {
        let y = this.props.location.params.driverTransporter;

        if (y.TransporterId) {
            await this.setState({ selectedPartner: this.props.partnersList.Data.filter(z => z.Id === y.TransporterId) })
        }

        console.log(this.state);

        let x = await this.typeHeadCodeBuild();

        console.log("Driver Details", y);

        x[0].value = y.DriverNo;
        x[0].gridclass = "col-12 col-md-6 col-lg-6";

        x[1].field.options[0].checked = y.IsActive;

        x[2].value = y.FirstName;
        x[2].valid = true;

        x[3].value = y.LastName;
        x[3].valid = true;

        x[4].value = y.DriverAddress;
        x[4].valid = true;

        x[5].value = y.DriverPhone;
        x[5].valid = true;

        x[6].value = y.Email;
        x[6].valid = true;

        x[7].value = y.UserName;
        x[7].valid = true;

        x[8].value = y.Password;
        x[8].valid = true;

        x[9].value = y.Password;
        x[9].valid = true;
        x[9].errMsg = "";

        x[10].value = y.IdentityNo;
        x[10].valid = true;

        x[11].guid = y.IdentityImageGuId;
        x[11].valid = true;

        x[12].value = y.DrivingLicenseNo;
        x[12].valid = true;

        x[13].value = new Date(y.DrivingLicenseExpiredDate);
        x[13].valid = true;

        x[14].guid = y.DrivingLicenceImageGuId;
        x[14].valid = true;

        x[15].guid = y.DriverImageGuId;
        x[15].valid = true;

        setTimeout(() => this.refs.formRef.modifyFormObj(x), 500);
    }

    async onEachSubmit() {
        this.setState({ formSubmitted: true });
        this.refs.formRef.modifyFormObj(await this.typeHeadCodeBuild());
    }

    formSubmit(obj) {
        if (this.state.selectedPartner.length) {
            let self = this,
                thisTimer = setInterval(function () {
                    if (obj[11].guid && obj[14].guid && obj[15].guid) {
                        clearInterval(thisTimer);
                        self.createUpdateDriverAPI(obj);
                    }
                }, 50);
        }
    }

    async createUpdateDriverAPI(obj) {
        let self = this;
        this.props.addloader('createupdatedrivertransporter');

        let body = {
            "Requests": [
                {
                    "FirstName": obj[2].value,
                    "LastName": obj[3].value,
                    "DriverAddress": obj[4].value,
                    "DriverPhone": obj[5].value,
                    "IsActive": obj[1].field.options[0].checked,
                    "Email": obj[6].value,
                    "UserName": obj[7].value,
                    "Password": obj[8].value,
                    "IdentityNo": obj[10].value,
                    "DrivingLicenseNo": obj[12].value,
                    "DrivingLicenseExpiredDate": new Date(obj[13].value).toISOString(),
                    "IdentityImageGuId": obj[11].guid,
                    "DrivingLicenceImageGuId": obj[14].guid,
                    "DriverImageGuId": obj[15].guid,
                    "TransporterId": self.state.selectedPartner[0].Id
                }
            ],
            "CreatedBy": "System",
            "CreatedTime": new Date()
        };

        if (this.props.location.params) {
            body.Requests[0].ID = this.props.location.params.driverTransporter.ID.toString(10);
            body.Requests[0].DriverNo = this.props.location.params.driverTransporter.DriverNo;
            body.Requests[0].DriverImageId = this.props.location.params.driverTransporter.DriverImageId;
            body.Requests[0].DrivingLicenceImageId = this.props.location.params.driverTransporter.DrivingLicenceImageId;
            body.Requests[0].IdentityImageId = this.props.location.params.driverTransporter.IdentityImageId;
        }

        console.log(JSON.stringify(body));

        await axios(rootURL + ops.driver.createupdatedriver, {
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
                        self.props.history.push('/masterdata/maintaindrivertransporter');
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

        this.props.removeloader('createupdatedrivertransporter');
    }

    render() {
        console.log("getpartners", this.props.partnersList);
        return (
            <React.Fragment>
                <div className="PackingSheet">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">{this.props.location.params ? "Edit" : "Create"} Driver Transporter</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content">
                            <Form
                                fields={JSON.parse(JSON.stringify(uploadFormElems))}
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
                            <button className="text-uppercase btn btn-success save-button px-5" type="submit" onClick={() => this.refs.formRef.onFormSubmit()}>SAVE & ACTIVATE</button>
                            <button className="text-uppercase btn btn-danger save-button px-5 ml-4" type="button" onClick={() => this.props.history.push('/masterdata/maintaindrivertransporter')}>CANCEL</button>
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
        { partnersList } = masterData;
    return { credentials, partnersList }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getpartnerslist
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateDriverTransporter);