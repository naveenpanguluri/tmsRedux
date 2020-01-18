import React from 'react';
import './boardAdmin.scss';
import classNames from 'classnames/bind';

import ToggleBound from '../../common/togglebound';
import Form from '../../common/form';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';
import { getinboundboardadminreport, getoutboundboardadminreport } from '../../../store/viewsactions/report';


class ReportBoardAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inbound: true,
            dataNull: false
        }
        props.getinboundboardadminreport(this.failure);
        props.getoutboundboardadminreport(this.failure);
    }

    failure = async () => {
        if (!this.state.dataNull) {
            await this.setState({ dataNull: true });
            this.props.history.push("/report");
        }
    }

    render() {
        console.log("inbound,,,,", this.props.reportInboundBoardAdmin);
        console.log("outbound....", this.props.reportOutboundBoardAdmin);

        let { OrdersInDays, AssignmentInDays, JalanInDays, GatinInDays, BongkarInDays, FinishInDays } = this.props[(this.state.inbound)? 'reportInboundBoardAdmin' : 'reportOutboundBoardAdmin'].Data;

        return (
            <React.Fragment>
                <div className="ReportBoardAdmin">
                    <div className="row m-0 mb-4">
                        <div className="col-md-6 col-lg-6">
                            <h4 className="txt-clr">{ Boolean(this.state.inbound) ? "Inbound" : "Outbound" }</h4>
                        </div>
                        <div className="col-md-6 col-lg-6 text-right">
                            <ToggleBound toggle={this.state.inbound} onClick={() => this.setState({ inbound: !this.state.inbound })} />
                        </div>
                    </div>  

                    <div className="row m-0">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 d-flex">
                            <div className="card shadow-sm mb-3 w-100 contain">
                                <div className="card-body p-3">
                                    <h6 className="card-title">Order</h6>

                                    {
                                        (Boolean(OrdersInDays) && OrdersInDays.length) ?
                                            OrdersInDays.map((x, i) =>

                                                <div key={i} className="order_box d-flex flex-wrap p-2 align-items-center justify-content-center mb-2">
                                                    <i className="fas fa-truck w_clr mr-3 ml-2"></i>
                                                    <div className="">
                                                        <div className="w_clr m-0 fs_10 txt-trunk">{x.OrderNumber}</div>
                                                        <div className="w_clr m-0 fs_12 txt-trunk">{x.Pallet}</div>
                                                    </div>
                                                </div>

                                            ) :
                                            <div className="no-records">No records found</div>
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 d-flex">
                            <div className="card shadow-sm mb-3 w-100 contain">
                                <div className="card-body p-3">
                                    <h6 className="card-title">Assign</h6>
                                    
                                    {
                                        (Boolean(AssignmentInDays) && AssignmentInDays.length) ?
                                            AssignmentInDays.map((x, i) =>

                                                <div key={i} className="order_box d-flex flex-wrap p-2 align-items-center justify-content-center mb-2">
                                                    <i className="fas fa-truck w_clr mr-3 ml-2"></i>
                                                    <div className="">
                                                        <p className="w_clr m-0 fs_10 txt-trunk">{x.OrderNumber}</p>
                                                        <p className="w_clr m-0 fs_12 txt-trunk">{x.Pallet}</p>
                                                    </div>
                                                </div>

                                            ) :
                                            <div className="no-records">No records found</div>
                                    }
                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 d-flex">
                            <div className="card shadow-sm mb-3 w-100 contain">
                                <div className="card-body p-3">
                                    <h6 className="card-title">Jalan</h6>
                                    
                                    {
                                        (Boolean(JalanInDays) && JalanInDays.length) ?
                                            JalanInDays.map((x, i) =>

                                                <div key={i} className="order_box d-flex flex-wrap p-2 align-items-center justify-content-center mb-2">
                                                    <i className="fas fa-truck w_clr mr-3 ml-2"></i>
                                                    <div className="">
                                                        <p className="w_clr m-0 fs_10 txt-trunk">{x.OrderNumber}</p>
                                                        <p className="w_clr m-0 fs_12 txt-trunk">{x.Collie}</p>
                                                    </div>
                                                </div>

                                            ) :
                                            <div className="no-records">No records found</div>
                                    }
                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 d-flex">
                            <div className="card shadow-sm mb-3 w-100 contain">
                                <div className="card-body p-3">
                                    <h6 className="card-title">Gate In</h6>
                                    
                                    {
                                        (Boolean(GatinInDays) && GatinInDays.length) ?
                                            GatinInDays.map((x, i) =>

                                                <div key={i} className="order_box d-flex flex-wrap p-2 align-items-center justify-content-center mb-2">
                                                    <i className="fas fa-truck w_clr mr-3 ml-2"></i>
                                                    <div className="">
                                                        <p className="w_clr m-0 fs_10 txt-trunk">{x.OrderNumber}</p>
                                                        <p className="w_clr m-0 fs_12 txt-trunk">{x.Collie}</p>
                                                    </div>
                                                </div>

                                            ) :
                                            <div className="no-records">No records found</div>
                                    }
                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 d-flex">
                            <div className="card shadow-sm mb-3 w-100 contain">
                                <div className="card-body p-3">
                                    <h6 className="card-title">Bongkar</h6>
                                    
                                    {
                                        (Boolean(BongkarInDays) && BongkarInDays.length) ?
                                            BongkarInDays.map((x, i) =>

                                                <div key={i} className="order_box d-flex flex-wrap p-2 align-items-center justify-content-center mb-2">
                                                    <i className="fas fa-truck w_clr mr-3 ml-2"></i>
                                                    <div className="">
                                                        <p className="w_clr m-0 fs_10 txt-trunk">{x.OrderNumber}</p>
                                                        <p className="w_clr m-0 fs_12 txt-trunk">{x.Collie}</p>
                                                    </div>
                                                </div>

                                            ) :
                                            <div className="no-records">No records found</div>
                                    }
                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 d-flex">
                            <div className="card shadow-sm mb-3 w-100 contain">
                                <div className="card-body p-3">
                                    <h6 className="card-title">Finish</h6>
                                    
                                    {
                                        (Boolean(FinishInDays) && FinishInDays.length) ?
                                            FinishInDays.map((x, i) =>

                                                <div key={i} className="order_box d-flex flex-wrap p-2 align-items-center justify-content-center mb-2">
                                                    <i className="fas fa-truck w_clr mr-3 ml-2"></i>
                                                    <div className="">
                                                        <p className="w_clr m-0 fs_10 txt-trunk">{x.OrderNumber}</p>
                                                        <p className="w_clr m-0 fs_12 txt-trunk">{x.Collie}</p>
                                                    </div>
                                                </div>

                                            ) :
                                            <div className="no-records">No records found</div>
                                    }
                                    
                                </div>
                            </div>
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
        { reportInboundBoardAdmin, reportOutboundBoardAdmin } = report;
    return { credentials, reportInboundBoardAdmin, reportOutboundBoardAdmin }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getinboundboardadminreport,
        getoutboundboardadminreport

    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ReportBoardAdmin);