import React from 'react';
import './invoice.scss';
import classNames from 'classnames/bind';

import ToggleBound from '../../common/togglebound';
import Form from '../../common/form';

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
                        label: 'All',
                        value: ''
                    },
                    {
                        label: 'option 1',
                        value: '1'
                    },
                    {
                        label: 'option 2',
                        value: '2'
                    },
                    {
                        label: 'option 3',
                        value: '3'
                    }
                ]
            },
            gridClass: "col-12 col-sm-6 col-md-6 col-lg-6",
            check: [
                {
                    regex: /^[0-9]$/,
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
                        label: 'option 1',
                        value: '1'
                    },
                    {
                        label: 'option 2',
                        value: '2'
                    },
                    {
                        label: 'option 3',
                        value: '3'
                    }
                ]
            },
            gridClass: "col-12 col-sm-6 col-md-3 col-lg-3",
            check: [
                {
                    regex: /^[0-9]$/,
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
                    },
                    {
                        label: 'option 1',
                        value: '1'
                    },
                    {
                        label: 'option 2',
                        value: '2'
                    },
                    {
                        label: 'option 3',
                        value: '3'
                    }
                ]
            },
            gridClass: "col-12 col-sm-6 col-md-3 col-lg-3",
            check: [
                {
                    regex: /^[0-9]$/,
                    message: "Please select an option"
                }
            ]
        },
        {
            name: 'Status',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "select",
                options: [
                    {
                        label: 'All',
                        value: ''
                    },
                    {
                        label: 'option 1',
                        value: '1'
                    },
                    {
                        label: 'option 2',
                        value: '2'
                    },
                    {
                        label: 'option 3',
                        value: '3'
                    }
                ]
            },
            gridClass: "col-12 col-sm-6 col-md-6 col-lg-6",
            check: [
                {
                    regex: /^[0-9]$/,
                    message: "Please select an option"
                }
            ]
        },
    ],
    roles = [
        {
            ID: 1,
            InvoiceID: "04042019119",
            InvoiceDate: "4 April 2019",
            Transport: "Transporter",
            Nominal: "RP 3.900.000",
            Status: "CONFIRM ORDER",
            Date: "4 April 2019",
        },
        {
            ID: 2,
            InvoiceID: "04042019119",
            InvoiceDate: "4 April 2019",
            Transport: "Transporter",
            Nominal: "RP 3.900.000",
            Status: "CONFIRM ORDER",
            Date: "4 April 2019",
        },
    ];

class ReportInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inbound: true, roleList: [], startDate: new Date() }
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    modalFormSubmit(data) {
        console.log(data);
    }

    componentDidMount() {
        this.getRoles();
    }

    getRoles() {
        setTimeout(() => this.setState({ roleList: roles }), 1500)
    }

    render() {
        return (
            <React.Fragment>
                <div className="ReportInvoice">
                    <div className="text-right">
                        <ToggleBound toggle={this.state.inbound} onClick={() => this.setState({ inbound: !this.state.inbound })} />
                    </div>
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">Invoice</div>
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
                        
                        <div className="table-cover px-2 mt-5">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Invoice ID</th>
                                            <th scope="col">Tanggal Invoice</th>
                                            <th scope="col">Transporter</th>
                                            <th scope="col">Nominal</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Paid Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.roleList.map((x, i) =>
                                                <tr>
                                                    <td className={classNames("row-actions d-flex", { "border-top-0": !i })}>
                                                        <button type="button" className="btn mr-2 rounded-circle circular-icon d-flex align-items-center justify-content-center">
                                                            <i className="far fa-eye role-delete text-secondary"></i>
                                                        </button>
                                                        <button type="button" className="btn rounded-circle circular-icon d-flex align-items-center justify-content-center">
                                                            <i className="fas fa-print role-edit text-secondary"></i>
                                                        </button>
                                                    </td>
                                                    <td>{x.InvoiceID}</td>
                                                    <td>{x.InvoiceDate}</td>
                                                    <td>{x.Transport}</td>
                                                    <td>{x.Nominal}</td>
                                                    <td>{x.Status}</td>
                                                    <td>{x.Date}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                
                            </div>

                        </div>
                    </div>


                    <div className="tabs-content mt-4">

                        <div className="row m-0 py-4">
                            <div className="col-md-6 col-lg-6">
                                <div className="row m-0">
                                    <div className="col-md-6 col-lg-6 p-0">
                                        <p className=""><strong>Nama Transporter</strong></p>
                                    </div>
                                    <div className="col-md-6 col-lg-6 p-0">
                                        <p className="">Nama Transporter</p>
                                    </div>
                                </div>
                                <div className="row m-0">
                                    <div className="col-md-6 col-lg-6 p-0">
                                        <p className=""><strong>Alamat Transporter</strong></p>
                                    </div>
                                    <div className="col-md-6 col-lg-6 p-0">
                                        <p className="">JI. Gaya Motor Raya</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6">
                                <div className="row m-0">
                                    <div className="col-md-6 col-lg-6 p-0">
                                        <p className=""><strong>No. Dokumen</strong></p>
                                    </div>
                                    <div className="col-md-6 col-lg-6 p-0">
                                        <p className="">04042019219201</p>
                                    </div>
                                </div>
                                <div className="row m-0">
                                    <div className="col-md-6 col-lg-6 p-0">
                                        <p className=""><strong>Tanggal Dokumen</strong></p>
                                    </div>
                                    <div className="col-md-6 col-lg-6 p-0">
                                        <p className="">4 April 2019</p>
                                    </div>
                                </div>
                                <div className="row m-0">
                                    <div className="col-md-6 col-lg-6 p-0">
                                        <p className=""><strong>Mata Uang</strong></p>
                                    </div>
                                    <div className="col-md-6 col-lg-6 p-0">
                                        <p className="">IDR</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                         <div className="table-cover table-responsive px-2">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Order ID</th>
                                        <th scope="col">Transporter</th>
                                        <th scope="col">Asal</th>
                                        <th scope="col">Tujuan</th>
                                        <th scope="col">Biaya</th>
                                        <th scope="col">Biaya Tambahan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>02042019112</td>
                                        <td>Transporter</td>
                                        <td>Tanjung Priok</td>
                                        <td>Lebak Bulus</td>
                                        <td>Rp 3.900.000</td>
                                        <td>-</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>  
                        <div className="d-flex justify-content-between p-4 text-primary border border-left-0 border-right-0">
                            <p className="m-0">
                                Total Biaya
                            </p>
                            <p className="m-0">
                                Rp 3.900.000
                            </p>
                        </div>       
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default ReportInvoice;