import React from 'react';
import './reportOrderPerHari.scss';
import classNames from 'classnames/bind';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import ToggleBound from '../../common/togglebound';
import Form from '../../common/form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getordersdatewise, modifyOrderPerHariTable, getpartners } from '../../../store/viewsactions/report';

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

class ReportOrderPerHari extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inbound: true, expeditors: "" }
        this.getPartners();
        this.props.modifyOrderPerHariTable({ NumberOfRecords: 0, Data: [] });
    }

    failure = async () => {
        this.props.history.push("/report");
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
            formObj[0].value = formObj[0].field.options.find(x => (x.value == formObj[0].value))? formObj[0].value : "";
            formObj[0].valid = Boolean(formObj[0].value);

            formObj[2].field.options = [formObj[2].field.options[0], { label: "2019", value: "2019" }];

            for (let i = 0; i < dateDif; i++) {
                formObj[2].field.options.push({ label: `${2019 + i}`, value: (2019 + i) });
            }

            this.refs.formRef.modifyFormObj(formObj);
        }
    }

    async onInboundToggle() {
        await this.setState({ inbound: !this.state.inbound });
        this.props.modifyOrderPerHariTable({ NumberOfRecords: 0, Data: [] });
        this.getPartners();
    }

    modalFormSubmit(data) {
        this.props.getordersdatewise({
            "Request": {
                "OrderTypeId": this.state.inbound ? 1 : 2,
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
                    "PartnerTypeId": this.state.inbound ? 3 : 2
                }
            ]
        }, this.failure);
    }

    render() {
        let { OrdersByDates } = this.props.reportOrderPerHari.Data;

        return (
            <React.Fragment>
                <div className="ReportOrderPerHari">
                    <div className="text-right pt-3 pr-3">
                        <ToggleBound toggle={this.state.inbound} onClick={() => this.onInboundToggle()} />
                    </div>

                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">Report - Order Per Hari</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content">
                            <Form
                                fields={uploadFormElems}
                                className="upload-form px-2"
                                footerClassName="col-12"
                                formButtons={<button className="text-uppercase btn btn-primary search-button px-5 mt-0" type="submit">View</button>}
                                onSubmit={obj => this.modalFormSubmit(obj)}
                                ref="formRef"
                            />
                        </div>
                    </div>

                    {
                        Boolean(OrdersByDates) &&
                        <React.Fragment>
                            <div className="barChart-div mt-4">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <div className="chart">

                                            <BarChart width={900} height={350} data={OrdersByDates ? OrdersByDates : []} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="Day" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="OrderCount" barSize={20} fill="#1790ff" />
                                            </BarChart>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-div mt-4">
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <div className="m-0 total">
                                            Total: {OrdersByDates ? OrdersByDates.reduce(function (total, obj) { return total + obj.OrderCount; }, 0) : 0}
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                {
                                                    Boolean(this.props.reportOrderPerHari.NumberOfRecords) ?
                                                        this.props.reportOrderPerHari.Data.OrdersByDates.map((x, i) =>

                                                            <th key={i}>{x.Day}</th>

                                                        ) :
                                                        <th className="text-center" colSpan="6">No records found</th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Actual</td>
                                                {
                                                    Boolean(this.props.reportOrderPerHari.NumberOfRecords) ?
                                                        this.props.reportOrderPerHari.Data.OrdersByDates.map((x, i) =>

                                                            <td key={i}>{x.OrderCount}</td>

                                                        ) :
                                                        <td className="text-center" colSpan="6">No records found</td>
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </React.Fragment>
                    }

                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { report } = views,
        { reportOrderPerHari, reportOrderPerHariSelectBox } = report;
    return { credentials, reportOrderPerHari, reportOrderPerHariSelectBox }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getordersdatewise,
        modifyOrderPerHariTable,
        getpartners
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ReportOrderPerHari);