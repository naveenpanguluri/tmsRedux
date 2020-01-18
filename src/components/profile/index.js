import React from 'react';
import './profile.scss';
import classNames from 'classnames/bind';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
               <div className="Profile">
                    <div className="tabs-wrap">
                        <div className="tabs-header-wrap">
                            <div className="tabs-title d-none d-md-block d-lg-block active">User Profile</div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="tabs-content">

                            <div className="row m-0">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" placeholder="Suryanto" />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" placeholder="Adi" />
                                    </div>
                                </div>
                            </div>

                            <div className="row m-0">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" className="form-control" placeholder="Suryanto827880" />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <label>Region</label>
                                        <input type="text" className="form-control" placeholder="Jakarta" />
                                    </div>
                                </div>
                            </div>

                            <div className="row m-0">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control" placeholder="suryanto.adi@hso.astra.co.id" />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" className="form-control" placeholder="08423423423423234" />
                                    </div>
                                </div>
                            </div>

                            <div className="row m-0">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                    <div className="form-group">
                                        <label>Role</label>
                                        <input type="text" className="form-control" placeholder="Salesman" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="row m-0 py-4">
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 p-0">
                            <button className="text-uppercase btn btn-success save-button px-5" type="button">SAVE</button>
                        </div>
                        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 p-0 text-right">
                            <button className="text-uppercase btn btn-primary save-button px-5" type="button" onClick={() => this.props.history.push('/changePassword')}>CHANGE PASSWORD</button>
                        </div>
                    </div>


                </div>
            </React.Fragment>
        );
    }
}

export default Profile;