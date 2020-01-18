import React from 'react';
import './changePassword.scss';
import classNames from 'classnames/bind';


class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
               <div className="ChangePassword">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">CHANGE PASSWORD</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content">

                            <div className="row m-0">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <label>Old Password</label>
                                        <input type="password" className="form-control" placeholder="*********" />
                                    </div>
                                </div>
                            </div>

                            <div className="row m-0">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type="password" className="form-control" placeholder="*********" />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <label>Confirm New Password</label>
                                        <input type="password" className="form-control" placeholder="*********" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row m-0 py-4">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0">
                            <button className="text-uppercase btn btn-primary save-button px-5" type="button" onClick={() => this.props.history.push()}>CHANGE PASSWORD</button>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default ChangePassword;