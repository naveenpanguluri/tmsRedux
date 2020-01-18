import React from 'react';
import './login.scss';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../config';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modifycredentials, addloader, removeloader, modifyerror } from '../../store/actions';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: "tms1",
            Password: "tms1"
        }
        this.checkPersistence();
    }

    async checkPersistence(){
        if(window.sessionStorage && sessionStorage.getItem('credentials')){
            let credentials = JSON.parse(sessionStorage.getItem('credentials'));
            await this.props.modifycredentials(credentials);
            this.props.history.push('/dashboard');
        }
    }

    async loginAPI(e) {
        e.preventDefault();
        let { Username, Password } = this.state;
        if (Username && Password) {
            let self = this;
            this.props.addloader('login');

            await axios(rootURL + ops.users.login, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "UserName": Username,
                    "UserPassword": Password
                  })
            })
                .then(async function (response) {
                    if (response.statusText === "OK") {
                        console.log("response", response);
                        if (response.data.StatusCode === 200 && response.data.TokenKey) {
                            await self.props.modifycredentials(response.data);
                            await sessionStorage.setItem('credentials', JSON.stringify(response.data));
                            self.props.history.push('/dashboard');
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

            this.props.removeloader('login');
        }
        else {
            this.props.modifyerror({
                show: true,
                heading: "Invalid Credentials!",
                text: "Please enter valid credentials."
            });
        }
    }

    render() {
        return (
            <div className="Login">

                <header className="px-4 py-3">
                    <div className="row m-0">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <p className="mb-0 font-weight-bold title_clr">TRANSPORTATION MANAGEMENT SYSTEM</p>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="logo text-right">
                                <img title="ASTRA MOTOR LOGO" alt="ASTRA MOTOR LOGO" src={require('../../img/honda-logo.png')} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="row m-0 body_h bgbody_clr text-right">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 position-relative">
                        <form className="login_box shadow-sm px-5 py-4" onSubmit={e => this.loginAPI(e)}>
                            <h3 className="mb-4 title_clr text-center">LOGIN</h3>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Username" value={this.state.Username} onChange={e => this.setState({ Username: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" value={this.state.Password} onChange={e => this.setState({ Password: e.target.value })} />
                            </div>
                            <p className="text-right mb-2">forgot password?</p>
                            <button type="submit" className="btn btn-primary login_btn px-4">login</button>
                        </form>
                        {/* <div className="btn_box">
                        <p className="text-right mb-2">
                            forgot password?
                        </p>
                        <button type="button" className="btn btn-primary login_btn px-4">login</button>
                    </div> */}
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 pr-0">
                        <div className="text-right pt-5 mbl_padd">
                            <img title="" alt="ASTRA MOTOR DASHBOARD LOGO" className="img-fluid" src={require('../../img/img_dashboard_ilus.png')} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        modifycredentials,
        addloader,
        removeloader,
        modifyerror
    }, dispatch)
);

export default connect(null, mapDispatchToProps)(Login);