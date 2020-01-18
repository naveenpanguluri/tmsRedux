import React from 'react';
import './createPools.scss';

import Form from '../../common/form';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getcityNames } from '../../../store/viewsactions/masterData';

let
    uploadFormElems = [
        {
            name: 'Nama Pool',
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
                    regex: "^.{2,10}$",
                    message: "Should be 2 - 10 characters"
                },
                {
                    regex: "^[a-zA-Z ]{2,10}$",
                    message: "Name should not have any special characters or numerics"
                }
            ]
        },
        {
            name: 'Pool Description',
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
                    regex: "^.{3,50}$",
                    message: "Should be 3 - 50 characters"
                },
                {
                    regex: "^[a-zA-Z0-9 ]{3,50}$",
                    message: "Name should not have any special characters"
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
            name: 'Nomor Kontak',
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
            name: 'Kota',
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
            name: 'Foto Pool',
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
        }
    ];

class CreatePools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityCode: [],
            citiesFlag: false,
            formSubmitted: false
        }
        this.editPools = this.editPools.bind(this);

        props.getcityNames(this.failure);
    }

    failure = async () => {
        this.props.history.push('/masterdata/maintainpools');
    }

    componentDidMount() {
        this.componentInitCheck()
    }

    componentDidUpdate() {
        this.componentInitCheck()
    }

    async componentInitCheck() {
        let x = this.state;

        if (!x.citiesFlag && Boolean(this.props.cityNames.Data.length)) {
            await this.setState({ citiesFlag: true });

            if (this.props.location.params) {
                this.editPools();
            }
            else {
                this.refs.formRef.modifyFormElem(await this.formCodeBuild(), 4);
            }
        }
    }

    async formCodeBuild() {
        return (
            {
                component:
                    <div className="form-group col-12 col-md-6 col-lg-6">
                        <label className="text-truncate">Kota<span className="text-danger font-weight-bold">*</span></label>
                        <div className="position-relative">
                            <Typeahead id="" labelKey="Value" options={this.props.cityNames.Data} placeholder="Select an option" selected={this.state.cityCode} onChange={(selected) => this.onTypeheadChange(selected)} />
                            <i className="fas fa-search text-secondary position-absolute" style={{ right: "10px", top: "12px" }}></i>
                        </div>
                        <small className="form-text text-danger">{this.state.formSubmitted && !Boolean(this.state.cityCode.length) && "Required Field"}</small>
                    </div>,
                field: {
                    type: "component"
                }
            }
        )
    }

    onTypeheadChange = async (obj) => {
        await this.setState({ cityCode: obj });
        this.refs.formRef.modifyFormElem(await this.formCodeBuild(), 4);
    }

    async editPools() {
        console.log("Pool details", this.props.location.params.pools);
        let y = this.props.location.params.pools;

        await this.setState({
            cityCode: [this.props.cityNames.Data.find(x => x.Id === y.CityID)],
            citiesFlag: true
        });

        let x = JSON.parse(JSON.stringify(uploadFormElems));

        x[0].value = y.PoolName;
        x[0].valid = true;
        x[0].disabled = true;

        x[1].value = y.PoolDescription;
        x[1].valid = true;

        x[2].value = y.Address;
        x[2].valid = true;

        x[3].value = y.ContactNumber;
        x[3].valid = true;

        x[4] = await this.formCodeBuild();

        x[5].guid = y.PhotoGuId;
        x[5].valid = true;

        await setTimeout(() => this.refs.formRef.modifyFormObj(x), 500);
    }

    async onEachSubmit() {
        await this.setState({ formSubmitted: true });
        this.refs.formRef.modifyFormElem(await this.formCodeBuild(), 4);
    }

    async formSubmit(obj) {
        let self = this,
            thisTimer = setInterval(function () {
                if (obj[5].guid) {
                    clearInterval(thisTimer);
                    self.createUpdatePoolsAPI(obj);
                }
            }, 50);
    }

    async createUpdatePoolsAPI(obj) {
        let { cityCode } = this.state;
        if (cityCode.length) {
            let self = this;
            this.props.addloader('createUpdatePoolsAPI');

            let body = {
                "Requests": [
                    {
                        "PoolName": obj[0].value,
                        "PoolDescription": obj[1].value,
                        "Address": obj[2].value,
                        "ContactNumber": obj[3].value,
                        "CityID": this.state.cityCode[0].Id,
                        "PhotoGuId": obj[5].guid
                    }
                ],
                "CreatedBy": "System",
                "CreatedTime": new Date()
            };

            if (this.props.location.params) {
                body.Requests[0].ID = this.props.location.params.pools.ID.toString(10);
                body.Requests[0].PoolNo = this.props.location.params.pools.PoolNo;
                body.Requests[0].PhotoId = this.props.location.params.pools.PhotoId;
            }

            console.log(JSON.stringify(body));

            await axios(rootURL + ops.pool.createupdatepool, {
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
                            self.props.history.push('/masterdata/maintainpools');
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

            this.props.removeloader('createUpdatePoolsAPI');
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="PackingSheet">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">{this.props.location.params ? "Edit" : "Create"} Pools</div>
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
                            <button className="text-uppercase btn btn-success save-button px-5" type="submit" onClick={() => this.refs.formRef.onFormSubmit()}>SAVE</button>
                            <button className="text-uppercase btn btn-danger save-button px-5 ml-4" type="button" onClick={() => this.props.history.push('/masterdata/maintainpools')}>CANCEL</button>
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
        { cityNames } = masterData;
    return { credentials, cityNames }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getcityNames
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePools);