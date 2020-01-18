import React from 'react';
import './createExpeditor.scss';

import Form from '../../common/form';
import CustomModal from '../../common/custommodal';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getpopUpSearchDistricts, modifypopUpSearchDistricts, getpiclist, modifypiclist } from '../../../store/viewsactions/masterData';

let
    uploadFormElems = [
        {
            name: 'ID Ekspedisi',
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
            name: 'Nama Ekspedisi',
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
                    regex: "^[a-zA-Z ]{3,30}$",
                    message: "Name should not have any special characters or numerics"
                }
            ]
        },
        {
            name: 'Initial',
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
                    regex: "^[a-zA-Z ]{3,30}$",
                    message: "Initial should not have any special characters or numerics"
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
            name: 'Alamat',
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
            name: 'Kode Pos',
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
            name: 'Kota',
            placeholder: '',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
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
            name: 'Provinsi',
            placeholder: '',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
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
            name: 'PIC Name',
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
                    regex: "^.{0,}$",
                    message: ""
                }
            ]
        },
        {
            name: 'PIC Phone',
            placeholder: '',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
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

class CreateExpeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            postalCode: [],
            postalCodeFlag: false,
            formSubmitted: false,
            picCode: [],
            dataNull: false
        }
        this.editExpeditor = this.editExpeditor.bind(this);
        this.formCodeBuild = this.formCodeBuild.bind(this);
        
        props.getpopUpSearchDistricts(this.failure);
        props.getpiclist(this.failure);
    }

    failure = async () => {
        if (!this.state.dataNull) {
            await this.setState({ dataNull: true });
            this.props.history.push('/masterdata/maintainexpeditor');
        }
    }

    componentDidMount() {
        this.componentInitCheck()
    }

    componentDidUpdate() {
        this.componentInitCheck()
    }

    async componentInitCheck() {
        let x = this.state;
        if (!x.postalCodeFlag && this.props.subDistrictDetails.Data.length && this.props.picList.Data.length) {
            await this.setState({ postalCodeFlag: true });

            if (this.props.location.params) {
                this.editExpeditor();
            }
            else {
                this.refs.formRef.modifyFormObj(await this.formCodeBuild());
            }
        }
    }

    async formCodeBuild() {
        let formObj = JSON.parse(JSON.stringify(await this.refs.formRef.getFormState().form)),
            x = this.state.postalCode[0],
            y = this.state.picCode[0];

        formObj[5] = {
            component:
                <div className="form-group col-12 col-md-6 col-lg-6">
                    <label className="text-truncate">Kode Pos</label>
                    <div className="position-relative" onClick={() => this.setState({ showModal: true })}>
                        <input disabled type="text" value={x ? x.PostalCode : ""} className="form-control" placeholder="Pop up search" />
                        <i className="fas fa-search text-secondary position-absolute" style={{ right: "10px", top: "12px" }}></i>
                    </div>
                    <small className="form-text text-danger">{this.state.formSubmitted && !Boolean(this.state.postalCode.length) && "Required Field"}</small>
                </div>,
            field: {
                type: "component"
            }
        }

        formObj[6].value = x ? x.CityName : "";

        formObj[7].value = x ? x.ProvinceName : "";

        formObj[8] = {
            component: (
                <div className="form-group col-12 col-md-6 col-lg-6">
                    <label className="text-truncate">PIC Name<span className="text-danger font-weight-bold">*</span></label>
                    <div className="position-relative">
                        <Typeahead id="" labelKey="PICName" disabled={this.props.location.params && this.props.location.params.mode === "view"} options={this.props.picList.Data} placeholder="Select an option" selected={this.state.picCode} onChange={(selected) => this.onTypeheadChange("picCode", selected)} />
                        <i className="fas fa-search text-secondary position-absolute" style={{ right: "10px", top: "12px" }}></i>
                    </div>
                    <small className="form-text text-danger">{this.state.formSubmitted && !Boolean(this.state.picCode.length) && "Required Field"}</small>
                </div>
            ),
            field: {
                type: "component"
            }
        };

        formObj[9].value = y ? y.PICPhone : "";

        return formObj;
    }

    onTypeheadChange = async (field, obj) => {
        await this.setState({ [field]: obj });

        this.refs.formRef.modifyFormObj(await this.formCodeBuild());
    }

    async editExpeditor() {
        let y = this.props.location.params.expeditor;

        await this.setState({
            postalCode: [this.props.subDistrictDetails.Data.find(x => x.PostalCodeId === y.PostalCodeID)],
            picCode: [this.props.picList.Data.find(x => x.ID === y.PICID)],
            postalCodeFlag: true
        });

        let x = await this.formCodeBuild();

        x[0].value = y.PartnerNo;
        x[0].gridClass = "col-12 col-md-6 col-lg-6";

        x[1].value = y.PartnerName;
        x[1].valid = true;

        x[2].value = y.PartnerInitial;
        x[2].valid = true;

        x[3].value = y.PartnerEmail;
        x[3].valid = true;

        x[4].value = y.PartnerAddress;
        x[4].valid = true;

        if (this.props.location.params.mode === "view") {
            x[1].disabled = true;
            x[2].disabled = true;
            x[3].disabled = true;
            x[4].disabled = true;
        }

        setTimeout(() => this.refs.formRef.modifyFormObj(x), 500);
    }

    async onEachSubmit() {
        await this.setState({ formSubmitted: true });

        this.refs.formRef.modifyFormObj(await this.formCodeBuild());
    }

    async formSubmit(obj) {
        let { postalCode, picCode } = this.state;
        if (postalCode.length && picCode.length) {
            let self = this;
            this.props.addloader('createupdateexpeditor');

            let body = {
                "Requests": [
                    {
                        "ID": 0,
                        "PartnerInitial": obj[2].value,
                        "PartnerName": obj[1].value,
                        "PartnerEmail": obj[3].value,
                        "PartnerAddress": obj[4].value,
                        "PostalCodeID": postalCode[0].PostalCodeId,
                        "PICID": picCode[0].ID,
                        "PartnerTypeID": 1,
                        "IsDeleted": true
                    }
                ],
                "CreatedBy": "System",
                "CreatedTime": new Date()
            };

            if (this.props.location.params) {
                body.Requests[0].ID = this.props.location.params.expeditor.ID.toString(10);
            }

            console.log(JSON.stringify(body));

            await axios(rootURL + ops.partner.createupdatepartner, {
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
                            self.props.history.push('/masterdata/maintainexpeditor');
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

            this.props.removeloader('createupdateexpeditor');
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="PackingSheet">

                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">{this.props.location.params ? this.props.location.params.mode : "Create"} Expeditor</div>
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
                            {
                                (this.props.location.params && this.props.location.params.mode === "view") ?
                                    null :
                                    <button className="text-uppercase btn btn-success save-button px-5" type="submit" onClick={() => this.refs.formRef.onFormSubmit()}>SAVE</button>
                            }
                            <button className="text-uppercase btn btn-danger save-button px-5 ml-4" type="button" onClick={() => this.props.history.push('/masterdata/maintainexpeditor')}>{(this.props.location.params && this.props.location.params.mode === "view") ? "CLOSE" : "CANCEL"}</button>
                        </div>
                    </div>
                </div>

                <CustomModal modaltitle="Kode Pos" isOpen={this.state.showModal} onClick={() => this.setState({ showModal: false })}>
                    <div className="form-group">
                        <label className="text-truncate">Kecamatan</label>
                        <div className="position-relative">
                            <Typeahead id="" labelKey="SubDistrictName" disabled={this.props.location.params && this.props.location.params.mode === "view"} options={this.props.subDistrictDetails.Data} placeholder="Select an option" selected={this.state.postalCode} onChange={(selected) => this.onTypeheadChange("postalCode", selected)} />
                            <i className="fas fa-search text-secondary position-absolute" style={{ right: "10px", top: "12px" }}></i>
                        </div>
                        <small className="form-text text-danger">{this.state.formSubmitted && !Boolean(this.state.postalCode.length) && "Required Field"}</small>
                    </div>
                    <div className="form-group">
                        <label className="text-truncate">Kode Pos</label>
                        <input type="text" className="form-control" disabled value={this.state.postalCode[0] && this.state.postalCode[0].PostalCode} />
                    </div>
                    <div className="d-block text-right">
                        <button className="text-uppercase btn btn-danger" type="button" onClick={() => this.setState({ showModal: false })}>close</button>
                    </div>
                </CustomModal>

            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    let { credentials, views } = state,
        { masterData } = views,
        { subDistrictDetails, picList } = masterData;
    return { credentials, subDistrictDetails, picList }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getpopUpSearchDistricts,
        modifypopUpSearchDistricts,
        getpiclist,
        modifypiclist
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateExpeditor);