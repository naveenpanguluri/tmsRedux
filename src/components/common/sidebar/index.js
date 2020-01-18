import React from 'react';
import './sidebar.scss';
import classNames from 'classnames/bind';

import routes from '../../../routes.json'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchmobsidebar, modifycredentials, modifywarning } from '../../../store/actions';

class Sidebar extends React.Component {
    async logout() {
        this.props.modifywarning({
            show: true,
            text: "Are you sure you wish to logout?",
            onClick: async () => {
                await sessionStorage.clear();
                this.props.modifycredentials({});
            }
        })
    }

    render() {
        return (
            <div className={classNames("sidebar h-100", { "sidebarCollapse": this.props.desktop })}>
                <div className={classNames("nav-item sidebar-profile media flex-row align-items-center", { "active": ("/profile" === this.props.match.path || this.props.match.path.indexOf("/profile") === 0) })} onClick={() => { this.props.history.push("/profile"); this.props.switchmobsidebar() }}>
                    <img src={require('../../../img/avatar.png')} className="avatar align-self-center mr-3" alt="avatar" />
                    <div className="media-body align-self-center">
                        <p className="mb-2 text-white profile-primary">Alexander</p>
                        <p className="mb-0 text-white profile-secondary">Alexander 123</p>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <div className="w-100">
                        <ul className="nav flex-column sidebar-links">
                            {
                                routes.routes.filter(x => x.showInSidebar).map(x => {
                                    return (
                                        <li key={x.name} className={classNames("nav-item flex-row align-items-center", { "active": (x.path === this.props.match.path || this.props.match.path.indexOf(x.path) === 0) })} onClick={() => { this.props.history.push(x.sidebarLink); this.props.switchmobsidebar() }}>
                                            <i className={x.icon}></i>
                                            <span>{x.name}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div className="w-100 notify-menu">
                    <ul className="nav flex-column sidebar-links">
                        <li className={classNames("nav-item flex-row align-items-center", { "active": ("/notifications" === this.props.match.path || this.props.match.path.indexOf("/notifications") === 0) })} onClick={() => { this.props.history.push("/notifications"); this.props.switchmobsidebar() }}>
                            <i className="fas fa-bell"></i>
                            <span>Notification</span>
                        </li>
                        <li className="nav-item flex-row align-items-center" onClick={() => this.logout()}>
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let { layout } = state,
        { sidebar } = layout,
        { desktop } = sidebar;
    return { desktop }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        switchmobsidebar,
        modifycredentials,
        modifywarning
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);