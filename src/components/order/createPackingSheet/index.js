import React from 'react';
import './createPackingSheet.scss';
import classNames from 'classnames/bind';

import { FormElem } from '../../common/form';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getorderids } from '../../../store/viewsactions/order';

let
    uploadFormElems = [
        {
            name: 'Trip No.',
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
            check: [
                {
                    regex: '^[0-9]+$',
                    message: "Please select an option"
                }
            ]
        },
        {
            name: 'Notes',
            placeholder: '',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            field: {
                type: "text"
            },
            check: [
                {
                    regex: "^.{2,200}$",
                    message: "Should be 2 - 200 characters"
                }
            ]
        }
    ],
    rowObjs = [
        {
            name: 'Kode Dealer',
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
            check: [
                {
                    regex: '^[0-9]+$',
                    message: "Please select an option"
                }
            ]
        },
        {
            name: 'Shipping List No.',
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "text"
            },
            check: [
                {
                    regex: "^.{2,20}$",
                    message: "Should be 2 - 20 characters"
                },
                {
                    regex: '^[a-zA-Z0-9]{2,20}$',
                    message: "Should not have any special characters or spaces"
                }
            ]
        },
        {
            name: 'Collie',
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "text"
            },
            check: [
                {
                    regex: "^.{1,10}$",
                    message: "Should be 1 - 10 digits"
                },
                {
                    regex: '^[0-9]{1,10}$',
                    message: "Collie should be integer/whole number"
                }
            ]
        },
        {
            name: 'Keterangan',
            placeholder: '',
            value: '',
            errMsg: '',
            required: false,
            valid: true,
            field: {
                type: "text"
            },
            check: [
                {
                    regex: "^.{2,200}$",
                    message: "Should be 2 - 200 digits"
                }
            ]
        },
        {
            name: 'Packing Sheet No.',
            placeholder: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "text"
            },
            check: [
                {
                    regex: "^.{2,50}$",
                    message: "Should be 2 - 50 characters"
                },
                {
                    regex: '^[a-zA-Z0-9]{2,20}$',
                    message: "Should not have any special characters or spaces"
                }
            ]
        }
    ],
    rowObj = {
        DealerId: "",
        ShippingListNo: "",
        Collie: "",
        Katerangan: "",
        PackingSheetRows: [
            {
                Value: ""
            }
        ]
    };

class CreatePackingSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dealers: [],
            formObj: Object.assign([], uploadFormElems),
            rows: [this.getRowArr()],
            formSubmitted: false,
            orderIDsFlag: false
        };

        props.getorderids(this.failure);
    }

    failure = async () => {
        this.props.history.push('/order');
    }

    componentDidMount() {
        this.componentInitCheck()
    }

    componentDidUpdate() {
        this.componentInitCheck()
    }

    async componentInitCheck() {
        if (!this.state.orderIDsFlag && this.props.orderIDs.Data.length) {
            let { formObj } = this.state;

            formObj[0].field.options = [formObj[0].field.options[0], ...this.props.orderIDs.Data.filter(x => x.Value).map(x => { return { value: x.Id, label: x.Value } })];

            this.setState({ formObj, orderIDsFlag: true })
        }
    }

    async tripChange(obj) {
        await this.setState({ formObj: Object.assign([], this.state.formObj, [obj]) });

        if (obj.value) {

            let self = this;
            this.props.addloader('getTripDealerList');

            await axios(rootURL + ops.order.getdealers + "?orderId=" + obj.value, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Token": this.props.credentials.TokenKey
                }
            })
                .then(function (response) {
                    if (response.statusText === "OK" && response.data.StatusMessage === "Success") {
                        if (response.data.NumberOfRecords === 0) {
                            console.log("response", response);
                            self.modifyerror({
                                show: true,
                                heading: "Data missing!",
                                text: "Data is missing for 'Kode Dealer' options for this 'Trip No.'. Please create the related entries first or select another 'Trip No.' to proceed."
                            });
                        }
                        else {
                            let { rows } = self.state,
                                newRows = rows.map(row => {
                                    row[0].value = "";
                                    row[1] = {};
                                    row[0].field.options = [row[0].field.options[0], ...response.data.Data.map(x => { return { value: x.OrderDeatialId, label: x.DealerNumber } })];
                                    return row
                                });
                            self.setState({ rows: newRows, dealers: response.data.Data });
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

            this.props.removeloader('getTripDealerList');
        }
        else {
            let { rows } = this.state,
                newRows = rows.map(row => {
                    row[0].value = "";
                    row[1] = {};
                    row[0].field.options = [row[0].field.options[0]];
                    return row
                });
            this.setState({ rows: newRows, dealers: [] });
        }
    }

    handleRowChange(obj, i, ...arr) {
        let { rows } = this.state;

        if (arr.length === 1) {
            rows[i][arr[0]] = obj;
        }
        else {
            rows[i][arr[0]][arr[1]] = obj;
        }

        if (arr[0] === 0) {
            rows[i][1] = this.state.dealers.find(x => (x.OrderDeatialId == obj.value));
            if (!rows[i][1]) {
                rows[i][1] = {};
            }
        }

        this.setState({ rows });
    }

    getRowArr() {
        return Object.assign([], [
            rowObjs[0],
            {},
            rowObjs[1],
            rowObjs[2],
            rowObjs[3],
            [rowObjs[4]]
        ]);
    }

    addPackingSheet(index) {
        let { rows } = this.state;
        rows[index][5].push(Object.assign([], rowObjs[4]));
        this.setState({ rows });
    }

    addRow() {
        let { rows } = this.state;
        rows.push(this.getRowArr());
        this.setState({ rows });
    }

    async formSubmit() {
        let { formSubmitted, formObj, rows } = this.state,
            invalidCount = 0;

        if (!formSubmitted) {
            await this.setState({ formSubmitted: true });
        }

        formObj = formObj.map(x => {
            if (!x.valid) {
                invalidCount++;
                x.errMsg = "Required field"
            }
            return x
        });

        rows = rows.map(y => y.map((x, i) => {
            if (i !== 5) {
                if (i !== 1 && !x.valid) {
                    invalidCount++;
                    x.errMsg = "Required field"
                }
            }
            else{
                x = x.map(z => {
                    if (!z.valid) {
                        invalidCount++;
                        z.errMsg = "Required field"
                    }
                    return z
                })
            }
            return x
        }));

        this.setState({ formObj, rows });

        if(!invalidCount){
            this.addPackingSheets();
        }
    }

    async addPackingSheets() {
        let { formObj, rows } = this.state,
            self = this;
        this.props.addloader('addPackingSheets');

        let body = {
            "Requests": [
            ],
            "CreatedBy": "System",
            "CreatedTime": new Date()
        };

        body.Requests = rows.map(x => {
            return {
                "OrderNumber": formObj[0].value,
                "Notes": formObj[1].value,
                "DealerId": x[1].DealerId,
                "OrderDetailId": parseFloat(x[1].OrderDeatialId, 10),
                "ShippingListNo": x[2].value,
                "Collie": parseFloat(x[3].value, 10),
                "Katerangan": x[4].value,
                "PackingSheetNumbers": x[5].map(y => { return { "Id": 0, "Value": y.value } })
            }
        })

        console.log(JSON.stringify(body));

        await axios(rootURL + ops.order.createupdatepackingsheet, {
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
                        self.props.history.push('/order');
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

        this.props.removeloader('addPackingSheets');
    }

    render() {
        let { formSubmitted } = this.state;
        return (
            <React.Fragment>
                <div className="PackingSheet">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">Create Packing Sheet</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content">

                            <div className="px-2">
                                <div className="row">
                                    <div className="form-group col-12 col-sm-6 col-md-4 col-lg-6">
                                        <FormElem
                                            formSubmitted={formSubmitted}
                                            elemObj={this.state.formObj[0]}
                                            handlechange={obj => this.tripChange(obj)}
                                        />
                                    </div>
                                    <div className="form-group col-12 col-md-6 col-lg-6">
                                        <FormElem
                                            formSubmitted={formSubmitted}
                                            elemObj={this.state.formObj[1]}
                                            handlechange={obj => this.setState({ formObj: Object.assign([], [this.state.formObj[0], obj]) })}
                                        />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>

                            <div className="table-cover table-responsive px-2 mt-5">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Kode Dealer</th>
                                            <th scope="col">Nama Dealer</th>
                                            <th scope="col">Shipping List No.</th>
                                            <th scope="col">Collie</th>
                                            <th scope="col">Keterangan</th>
                                            <th scope="col">Packing Sheet No.</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.rows.map((row, i) =>
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        <FormElem
                                                            formSubmitted={formSubmitted}
                                                            elemObj={row[0]}
                                                            handlechange={obj => this.handleRowChange(obj, i, 0)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" readOnly={true} value={row[1].DealerName ? row[1].DealerName : ""} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <FormElem
                                                            formSubmitted={formSubmitted}
                                                            elemObj={row[2]}
                                                            handlechange={obj => this.handleRowChange(obj, i, 2)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <FormElem
                                                            formSubmitted={formSubmitted}
                                                            elemObj={row[3]}
                                                            handlechange={obj => this.handleRowChange(obj, i, 3)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <FormElem
                                                            formSubmitted={formSubmitted}
                                                            elemObj={row[4]}
                                                            handlechange={obj => this.handleRowChange(obj, i, 4)}
                                                        />
                                                    </td>
                                                    <td className="packingSheetsWrap">
                                                        {
                                                            row[5].map((ps, j) =>
                                                                <FormElem
                                                                    formSubmitted={formSubmitted}
                                                                    elemObj={ps}
                                                                    handlechange={obj => this.handleRowChange(obj, i, 5, j)}
                                                                />
                                                            )
                                                        }
                                                    </td>
                                                    <td className="valign_b" colSpan={row[5].length}>
                                                        <button className="text-uppercase btn btn-primary search-button mt-0 mb-2" type="button" onClick={() => this.addPackingSheet(i)}>Add Row</button>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>

                            </div>

                            <div className="row m-0 py-4">
                                <div className="col-12 col-md-12 col-lg-12 text-center">
                                    <button className="btn btn-outline-primary add-button p-2 ml-auto" type="button" onClick={() => this.addRow()}><i className="fas fa-plus"></i></button>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 p-0 py-4">
                            <button className="text-uppercase btn btn-success save-button mb-2 px-5" type="submit" onClick={() => this.formSubmit()}>SAVE</button>
                            <button className="text-uppercase btn btn-danger save-button mb-2 px-5 ml-4" type="button" onClick={() => this.props.history.push('/order')}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { order } = views,
        { orderIDs } = order;
    return { credentials, orderIDs }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getorderids
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CreatePackingSheet);