import React from 'react';
import './layout.scss';
import classNames from 'classnames/bind';

import { connect } from 'react-redux';

import routes from '../../../routes.json'

import { StaticLoader } from '../../common/loader';

import Sidebar from '../sidebar';
import Topbar, { TopbarRight } from '../topbar';

let ThisComponent = null;

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { path: this.props.match.path };
        this.componentRerender();
    }

    async componentDidUpdate() {
        if (this.props.match.path !== this.state.path) {
            await this.setState({ path: this.props.match.path });
            this.componentRerender();
        }
    }

    componentRerender() {
        let x = routes.routes.find(x => x.path === this.state.path);
        ThisComponent = React.lazy(() => import('../../' + x.component));
    }

    render() {
        let { layout, ...ComponentProps } = this.props;
        return (
            <div className="layout-container d-flex flex-column">

                <div className="layout-topbar flex-grow-0">
                    <Topbar />
                </div>

                <div className={classNames("layout-body d-flex flex-grow-1", { "sidebarCollapse": layout.sidebar.desktop }, { "sidebarShow": layout.sidebar.mobile })}>
                    <div className="layout-sidebar">
                        <Sidebar {...this.props} />
                    </div>
                    <div className="layout-content">
                        <TopbarRight className="d-block d-md-none d-lg-none topbarRightMob" />
                        <React.Suspense fallback={StaticLoader}>
                            {
                                <ThisComponent {...ComponentProps} />
                            }
                        </React.Suspense>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let { layout } = state;
    return { layout }
};

export default connect(mapStateToProps)(Layout);