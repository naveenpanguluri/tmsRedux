import React from 'react';
import './createAdminTransporter.scss';

import Form from '../../common/form';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';

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
            name: 'Nama Admin',
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
                    regex: "^.{3,60}$",
                    message: "Should be 3 - 60 characters"
                },
                {
                    regex: "^[a-zA-Z ]{3,60}$",
                    message: "Name should not have any special characters or numerics"
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
                    message: "Please enter a valid email"
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
            errMsg: "",
            required: true,
            valid: false,
            field: {
                type: "confirm",
                pair: "Password"
            },
            gridClass: "col-12 col-md-6 col-lg-6"
        }
    ];

class CreateAdminTransporter extends React.Component {
    constructor(props) {
        super(props);
        this.editAdminTransporter = this.editAdminTransporter.bind(this);
    }

    componentDidMount() {
        if (this.props.location.params) {
            this.editAdminTransporter();
        }
    }

    async editAdminTransporter() {
        console.log("pools id....", this.props.location.params.adminTransporter);
        let y = this.props.location.params.adminTransporter,
            x = JSON.parse(JSON.stringify(await this.refs.formRef.getFormState().form));

        x[0].value = y.ID;
        x[0].gridclass= "col-12 col-md-6 col-lg-6";

        x[1].field.options[0].checked = y.IsActive;

        x[2].value = y.PICName;
        x[2].valid = true;

        x[3].value = y.PICPhone;
        x[3].valid = true;

        x[4].value = y.PICEmail;
        x[4].valid = true;

        x[5].value = y.PICPassword;
        x[5].valid = true;

        setTimeout(() => this.refs.formRef.modifyFormObj(x), 500);
    }

    async formSubmit(obj) {
        let self = this;
        this.props.addloader('createupdateadminpic');

        let body = {
            "Requests": [
                {
                    "ID": 0,
                    "PICName": obj[2].value,
                    "PICPhone": obj[3].value,
                    "PICEmail": obj[4].value,
                    "IsActive": true,
                    "IsDeleted": false,
                    "PICPassword": obj[5].value,
                    "PhotoGuId": 1,
                    "PhotoGuIdValue": "03869c39-664e-4a43-929f-7583c202a290"
                }
            ],
            "CreatedBy": "System",
            "CreatedTime": new Date()
        };

        if (this.props.location.params) {
            body.Requests[0].ID = this.props.location.params.adminTransporter.ID.toString(10);
        }

        console.log(JSON.stringify(body));

        await axios(rootURL + ops.pic.createupdatepic, {
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
                        self.props.history.push('/masterdata/maintainadmintransporter');
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

        this.props.removeloader('createupdateadminpic');
    }

    render() {
        return (
            <React.Fragment>
                <div className="PackingSheet">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">{this.props.location.params? "Edit" : "Create"} Admin Transporter</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content">
                            <Form
                                fields={JSON.parse(JSON.stringify(uploadFormElems))}
                                className="upload-form px-2"
                                footerClassName="d-none"
                                onSubmit={obj => this.formSubmit(obj)}
                                ref="formRef"
                            />
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0 py-4">
                            <button className="text-uppercase btn btn-success save-button px-5" type="submit" onClick={() => this.refs.formRef.onFormSubmit()}>SAVE & ACTIVATE</button>
                            <button className="text-uppercase btn btn-danger save-button px-5 ml-4" type="button" onClick={() => this.props.history.push('/masterdata/maintainadmintransporter')}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminTransporter);