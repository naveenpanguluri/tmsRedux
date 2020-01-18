import React from 'react';
import './GRvsOrder.scss';
import classNames from 'classnames/bind';

import Form from '../../common/form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getgoodsreceivereport, modifyGRvsOrderReport, getpartners } from '../../../store/viewsactions/report';

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
            placeholder: 'From Date',
            value: null,
            errMsg: 'Required Field',
            required: true,
            valid: false,
            field: {
                type: "datepicker"
            },
            gridClass: "col-12 col-sm-6 col-md-4 col-lg-3 fromDate"
        },
        {
            name: 'Periode 1',
            placeholder: 'To Date',
            value: null,
            errMsg: 'Required Field',
            required: true,
            valid: false,
            field: {
                type: "datepicker"
            },
            gridClass: "col-12 col-sm-6 col-md-4 col-lg-3 hide-label"
        }
    ];

class ReportGRvsOrder extends React.Component {
    constructor(props) {
        super(props);
        this.getPartners();
        this.props.modifyGRvsOrderReport({ NumberOfRecords: 0, Data: [] });
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
        if (this.props.reportOrderPerHariSelectBox.Data.length ) {
            let formObj = JSON.parse(JSON.stringify(await this.refs.formRef.getFormState().form));

            formObj[0].field.options = [formObj[0].field.options[0], ...this.props.reportOrderPerHariSelectBox.Data.map(x => { return { label: x.Value, value: x.Id } })];
            formObj[0].value = formObj[0].field.options.find(x => (x.value == formObj[0].value))? formObj[0].value : "";
            formObj[0].valid = Boolean(formObj[0].value);

            this.refs.formRef.modifyFormObj(formObj);
        }
    }

    modalFormSubmit(data) {
        this.props.getgoodsreceivereport({
            "Request": 
                {
                "PartnerId": data[0].value,
                "StartDate": new Date(data[1].value).toISOString(),
                "EndDate": new Date(data[2].value).toISOString()
                }
        });
    }

    getPartners() {
        this.props.getpartners({
            "Requests": [
                {
                    "PartnerTypeId": 3
                }
            ]
        }, this.failure);
    }


    render() {
        let { GoodsReceiveOrIssues } = this.props.reportGRvsOrder.Data;
        return (
            <React.Fragment>
                <div className="ReportGRvsOrder">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">Report - GR vs Order</div>
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

                            {
                                Boolean(GoodsReceiveOrIssues) &&
                                <React.Fragment>

                                    <div className="table-header-block d-flex mt-5 align-items-center">
                                        <h5 className="px-2 font-weight-bold table-heading m-0">GR vs Order List</h5>
                                    </div>
                                
                                    <div className="table-cover table-responsive px-2 mt-3">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Tanggal</th>
                                                    <th scope="col">GR (Qty)</th>
                                                    <th scope="col">Order (Qty)</th>
                                                    <th scope="col">% Persentase</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Boolean(this.props.reportGRvsOrder.NumberOfRecords) ?
                                                        this.props.reportGRvsOrder.Data.GoodsReceiveOrIssues.map((x, i) =>
                                                            <tr key={i}>
                                                                <td>{x.Date}</td>
                                                                <td>{x.GRQty}</td>
                                                                <td>{x.OrderQty}</td>
                                                                <td>{x.Percentage}</td>
                                                            </tr>
                                                        ) :
                                                        <tr><td className="text-center" colSpan="6">No records found</td></tr>
                                                }
                                            </tbody>
                                        </table>
                                        
                                    </div>
                                </React.Fragment>
                            }

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { report } = views,
        { reportGRvsOrder, reportOrderPerHariSelectBox } = report;
    return { credentials, reportGRvsOrder, reportOrderPerHariSelectBox }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getgoodsreceivereport,
        modifyGRvsOrderReport,
        getpartners 
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ReportGRvsOrder);
