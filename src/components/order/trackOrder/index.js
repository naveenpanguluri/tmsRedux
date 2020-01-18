import React from 'react';
import './trackOrder.scss';
import classNames from 'classnames/bind';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';

class TrackOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trackingData: {}
        }
        if (!props.location.params) {
            props.history.push('/order');
        }
        this.getTrackingOrder();
    }


    async getTrackingOrder() {
        let self = this;
        this.props.addloader('getTrackingOrder');

        await axios(rootURL + ops.order.trackorder + "?orderId=" + self.props.location.params.order.OrderId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": this.props.credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK") {
                    console.log("TRACKING response", response);
                    console.log("Data...", response.data);
                    self.setState({ trackingData: response.data });
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

        this.props.removeloader('getTrackingOrder');

    }

    render() {
        console.log("order params", this.props.location.params);
        console.log("state data...", this.state.trackingData);
        console.log("AcceptOrder data...", this.state.trackingData.Data);

        let trackingDataObj = this.state.trackingData.Data;

        return (
            <React.Fragment>
                <div className="TrackOrder">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">Tracking Order</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content clearfix">
                            <div className="order-progress clearfix">

                                {
                                    this.state.trackingData.Data ?

                                        <ul className="progressbar-y list-unstyled clearfix">
                                            <li className="vertical-list">
                                                <div className="text-left pl-5 pb-5">
                                                    <div className="main-title-y">{trackingDataObj.AcceptOrder.StepHeaderName}</div>
                                                    <div className="sub-title-y">{trackingDataObj.AcceptOrder.StepHeaderDescription}</div>
                                                    <div className="date-y text-secondary">{trackingDataObj.AcceptOrder.StepHeaderDateTime}</div>
                                                </div>
                                            </li>
                                            <li className="vertical-list">

                                                {
                                                    trackingDataObj.Loads.map((x, i) =>

                                                        <div className="text-left pl-5 pb-5" key={i}>

                                                            <div className="main-title-y">{x.TrackLoadUnloadName}<span className="badge badge-pill badge-bg ml-4 px-3">{x.StepHeaderNotification}</span></div>
                                                            <div className="horizontal-bar">
                                                                <ul className="progressbar-x list-unstyled clearfix">

                                                                    <li className={classNames({ "inactive": !Boolean(x.StartTrip.StepHeaderDateTime) })}>
                                                                        <div className="main-title">{x.StartTrip.StepHeaderName}</div>
                                                                        <div className="sub-title">{x.StartTrip.StepHeaderDescription}</div>
                                                                        <div className="date text-secondary">{x.StartTrip.StepHeaderDateTime}</div>
                                                                    </li>
                                                                    <li className={classNames({ "inactive": !Boolean(x.ConfirmArrive.StepHeaderDateTime) })}>
                                                                        <div className="main-title">{x.ConfirmArrive.StepHeaderName}</div>
                                                                        <div className="sub-title">{x.ConfirmArrive.StepHeaderDescription}</div>
                                                                        <div className="date text-secondary">{x.ConfirmArrive.StepHeaderDateTime}</div>
                                                                    </li>
                                                                    <li className={classNames({ "inactive": !Boolean(x.StartLoad.StepHeaderDateTime) })}>
                                                                        <div className="main-title">{x.StartLoad.StepHeaderName}</div>
                                                                        <div className="sub-title">{x.StartLoad.StepHeaderDescription}</div>
                                                                        <div className="date text-secondary">{x.StartLoad.StepHeaderDateTime}</div>
                                                                    </li>
                                                                    <li className={classNames({ "inactive": !Boolean(x.FinishLoad.StepHeaderDateTime) })}>
                                                                        <div className="main-title">{x.FinishLoad.StepHeaderName}</div>
                                                                        <div className="sub-title">{x.FinishLoad.StepHeaderDescription}</div>
                                                                        <div className="date text-secondary">{x.FinishLoad.StepHeaderDateTime}</div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                    )
                                                }

                                            </li>
                                            <li className="vertical-list">


                                                {
                                                    trackingDataObj.Unloads.map((x, i) =>

                                                        <div className="text-left pl-5 pb-5" key={i}>

                                                            <div className="main-title-y">{x.TrackLoadUnloadName}<span className="badge badge-pill badge-bg ml-4 px-3">{x.StepHeaderNotification}</span></div>
                                                            <div className="horizontal-bar">
                                                                <ul className="progressbar-x list-unstyled clearfix">

                                                                    <li className={classNames({ "inactive": !Boolean(x.StartTrip.StepHeaderDateTime) })}>
                                                                        <div className="main-title">{x.StartTrip.StepHeaderName}</div>
                                                                        <div className="sub-title">{x.StartTrip.StepHeaderDescription}</div>
                                                                        <div className="date text-secondary">{x.StartTrip.StepHeaderDateTime}</div>
                                                                    </li>
                                                                    <li className={classNames({ "inactive": !Boolean(x.ConfirmArrive.StepHeaderDateTime) })}>
                                                                        <div className="main-title">{x.ConfirmArrive.StepHeaderName}</div>
                                                                        <div className="sub-title">{x.ConfirmArrive.StepHeaderDescription}</div>
                                                                        <div className="date text-secondary">{x.ConfirmArrive.StepHeaderDateTime}</div>
                                                                    </li>
                                                                    <li className={classNames({ "inactive": !Boolean(x.StartLoad.StepHeaderDateTime) })}>
                                                                        <div className="main-title">{x.StartLoad.StepHeaderName}</div>
                                                                        <div className="sub-title">{x.StartLoad.StepHeaderDescription}</div>
                                                                        <div className="date text-secondary">{x.StartLoad.StepHeaderDateTime}</div>
                                                                    </li>
                                                                    <li className={classNames({ "inactive": !Boolean(x.FinishLoad.StepHeaderDateTime) })}>
                                                                        <div className="main-title">{x.FinishLoad.StepHeaderName}</div>
                                                                        <div className="sub-title">{x.FinishLoad.StepHeaderDescription}</div>
                                                                        <div className="date text-secondary">{x.FinishLoad.StepHeaderDateTime}</div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                    )
                                                }

                                            </li>
                                            <li className={classNames("vertical-list", { "inactive": !Boolean(trackingDataObj.POD.StepHeaderDateTime) })}>
                                                <div className="text-left pl-5 pb-5">
                                                    <div className="main-title-y">{trackingDataObj.POD.StepHeaderName}</div>
                                                    <div className="sub-title-y">{trackingDataObj.POD.StepHeaderDescription}</div>
                                                    <div className="date-y text-secondary">{trackingDataObj.POD.StepHeaderDateTime}</div>
                                                </div>
                                            </li>
                                            <li className={classNames("vertical-list", { "inactive": !Boolean(trackingDataObj.Complete.StepHeaderDateTime) })}>
                                                <div className="text-left pl-5 pb-5">
                                                    <div className="main-title-y">{trackingDataObj.Complete.StepHeaderName}</div>
                                                    <div className="sub-title-y">{trackingDataObj.Complete.StepHeaderDescription}</div>
                                                    <div className="date-y text-secondary">{trackingDataObj.Complete.StepHeaderDateTime}</div>
                                                </div>
                                            </li>
                                        </ul>

                                        : <p>No records found</p>
                                }

                            </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(TrackOrder);