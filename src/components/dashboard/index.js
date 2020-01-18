import React from 'react';
import './dashboard.scss';
import classNames from 'classnames/bind';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../store/actions';
import { getdashboarddetails } from '../../store/viewsactions/dashboard';

let DashboardBox = [
    {
        ID: 1,
        Name: "ALL ORDER",
        key: "AllOrderCount",
        BgClr: "sky_bgclr"
    },
    {
        ID: 2,
        Name: "BOOKED",
        key: "BookedCount",
        BgClr: "dark_blue_bgclr"
    },
    {
        ID: 3,
        Name: "PICKUP",
        key: "PickUpCount",
        BgClr: "dark_blue_bgclr"
    },
    {
        ID: 4,
        Name: "LOADING",
        key: "LoadingCount",
        BgClr: "dark_blue_bgclr"
    },
    {
        ID: 5,
        Name: "CONFIRMED",
        key: "ConfirmedCount",
        BgClr: "dark_blue_bgclr"
    },
    {
        ID: 6,
        Name: "ACCEPTED",
        key: "Acceptedcount",
        BgClr: "dark_blue_bgclr"
    },
    {
        ID: 7,
        Name: "UNLOADING",
        key: "UnloadingCount",
        BgClr: "dark_blue_bgclr"
    },
    {
        ID: 8,
        Name: "DROP OFF",
        key: "DropOffCount",
        BgClr: "dark_blue_bgclr"
    },
    {
        ID: 9,
        Name: "POD",
        key: "PODCount",
        BgClr: "dark_blue_bgclr"
    },
    {
        ID: 10,
        Name: "CANCELLED",
        key: "CancelledCount",
        BgClr: "danger_bgclr"
    }
];

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.getDashboard();
    }

    getDashboard() {
        this.props.getdashboarddetails({
            "Requests": [
              {
                "ID": this.props.credentials.Data[0].ID
              }
            ]
        });
    }

    render() {
        return (
            <div className="dashboard">

                <div className="row m-0">
                    <div className="col-md-6 col-lg-6">

                        <div className="row px-3">

                            {
                                DashboardBox.map((x) =>
                                    <div key={x.ID} className="col-12 col-sm-12 col-md-12 col-lg-6 d-flex">
                                        <div className={classNames("border rounded-lg d-flex flex-wrap w-100 p-4 align-items-center text-light my-3 mx-0 shadow-sm", x.BgClr)}>
                                            <p className="m-0 flex-fill title">{x.Name}</p>
                                            <h2 className="m-0"><strong>{this.props.dashboardDetails[x.key]}</strong></h2>
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                    </div>

                    <div className="col-md-6 col-lg-6 pr-0 d-flex align-items-end justify-content-end position-relative">
                            <div className="text-right dashboard_img">
                                <img title="" alt="ASTRA MOTOR DASHBOARD LOGO" className="img-fluid" src={require('../../img/img_dashboard_ilus.png')} />
                            </div>
                    </div>
                </div>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    let { credentials, views } = state,
        { dashboard } = views,
        { dashboardDetails } = dashboard;
    return { credentials, dashboardDetails }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getdashboarddetails
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);