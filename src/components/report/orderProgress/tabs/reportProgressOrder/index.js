import React from 'react';
import './reportProgressOrder.scss';
import classNames from 'classnames/bind';

import Form from '../../../../common/form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../../../store/actions';
import { getordersProgress, modifyOrderProgressTable, getpartners } from '../../../../../store/viewsactions/report';

let
    uploadFormElems = [
        {
            name: 'Main Dealer',
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
            gridClass: "col-12 col-sm-6 col-md-6 col-lg-6",
            check: [
                {
                    regex: "^[0-9]+$",
                    message: "Please select an option"
                }
            ]
        },
        {
            name: 'Periode',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "select",
                options: [
                    {
                        label: 'Month',
                        value: ''
                    },
                    {
                        label: 'Jan',
                        value: '1'
                    },
                    {
                        label: 'Feb',
                        value: '2'
                    },
                    {
                        label: 'Mar',
                        value: '3'
                    },
                    {
                        label: 'Apr',
                        value: '4'
                    },
                    {
                        label: 'May',
                        value: '5'
                    },
                    {
                        label: 'Jun',
                        value: '6'
                    },
                    {
                        label: 'Jul',
                        value: '7'
                    },
                    {
                        label: 'Aug',
                        value: '8'
                    },
                    {
                        label: 'Sep',
                        value: '9'
                    },
                    {
                        label: 'Oct',
                        value: '10'
                    },
                    {
                        label: 'Nov',
                        value: '11'
                    },
                    {
                        label: 'Dec',
                        value: '12'
                    }
                ]
            },
            gridClass: "col-12 col-sm-6 col-md-3 col-lg-3",
            check: [
                {
                    regex: "^[0-9]+$",
                    message: "Please select an option"
                }
            ]
        },
        {
            name: '',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "select",
                options: [
                    {
                        label: 'Year',
                        value: ''
                    }
                ]
            },
            gridClass: "col-12 col-sm-6 col-md-3 col-lg-3 hide-label",
            check: [
                {
                    regex: "^[0-9]+$",
                    message: "Please select an option"
                }
            ]
        },
    ];

class ReportProgressOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inbound: this.props.inbound, expeditors: "" };
        this.getPartners();
        this.props.modifyOrderProgressTable({NumberOfRecords: 0, Data: []});
    }

    componentDidMount() {
        this.componentInitCheck()
    }

    componentDidUpdate() {
        this.componentInitCheck()
    }

    async componentInitCheck() {
        let x = this.state;
        if (this.props.reportOrderPerHariSelectBox.Data.length && JSON.stringify(this.props.reportOrderPerHariSelectBox.Data) != this.state.expeditors ) {
            await this.setState({ expeditors: JSON.stringify(this.props.reportOrderPerHariSelectBox.Data) });
            let formObj = JSON.parse(JSON.stringify(await this.refs.formRef.getFormState().form)),
                dateDif = new Date().getFullYear - 2019;

            formObj[0].field.options = [formObj[0].field.options[0], ...this.props.reportOrderPerHariSelectBox.Data.map(x => { return { label: x.Value, value: x.Id } })];
            formObj[2].field.options = [formObj[2].field.options[0], { label: "2019", value: "2019" }];

            for (let i = 0; i < dateDif; i++) {
                formObj[2].field.options.push({ label: `${2019 + i}`, value: (2019 + i) });
            }

            this.refs.formRef.modifyFormObj(formObj);
        }
        if(x.inbound !== this.props.inbound){
            await this.setState({inbound: this.props.inbound});
            this.props.modifyOrderProgressTable({NumberOfRecords: 0, Data: []});
            this.getPartners();
        }
    }

    modalFormSubmit(data) {
        this.props.getordersProgress({
            "Request": {
                "OrderTypeId": this.props.inbound ? 1 : 2,
                "MainDealerId": data[0].value,
                "Month": data[1].value,
                "Year": data[2].value
            }
        });
    }

    getPartners() {
        this.props.getpartners({
            "Requests": [
                {
                    "PartnerTypeId": this.props.inbound ? 3 : 2
                }
            ]
        });
    }

    render() {
        let { OrderProgresses } = this.props.orderProgress.Data;

        return (
            <React.Fragment>
                <Form
                    fields={uploadFormElems}
                    className="upload-form px-2"
                    footerClassName="col-12"
                    formButtons={<button className="text-uppercase btn btn-primary search-button px-5 mt-0" type="submit">View</button>}
                    onSubmit={obj => this.modalFormSubmit(obj)}
                    ref="formRef"
                />

                {
                    Boolean(OrderProgresses) &&

                    <React.Fragment>

                        <div className="table-header-block d-flex mt-5 align-items-center">
                            <h5 className="px-2 font-weight-bold table-heading m-0">Progress Order List</h5>
                        </div>

                        <div className="table-cover px-2 mt-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Destination</th>
                                        <th scope="col">Transporter</th>
                                        <th scope="col">Driver</th>
                                        <th scope="col">Vehicle</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Created Time</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        Boolean(this.props.orderProgress.NumberOfRecords) ?
                                            this.props.orderProgress.Data.OrderProgresses.map((x, i) =>
                                                <tr key={x.OrderId}>
                                                    <td>{x.OrderNo}</td>
                                                    <td>{x.Destination}</td>
                                                    <td>{x.Transporter}</td>
                                                    <td>{x.Drivername}</td>
                                                    <td>{x.Vehicle}</td>
                                                    <td>{x.OrderStatus}</td>
                                                    <td>{x.OrderCreatedDate}</td>
                                                </tr>
                                            ) :
                                            <tr><td className="text-center" colSpan="6">No records found</td></tr>
                                    }

                                </tbody>
                            </table>

                        </div>

                    </React.Fragment>
                }

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { report } = views,
        { orderProgress, reportOrderPerHariSelectBox } = report;
    return { credentials, orderProgress, reportOrderPerHariSelectBox }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getordersProgress,
        modifyOrderProgressTable,
        getpartners
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ReportProgressOrder);
