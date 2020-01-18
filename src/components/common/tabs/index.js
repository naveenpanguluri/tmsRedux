import React from 'react';
import './tabs.scss';
import classNames from 'classnames/bind';
import { Collapse } from 'reactstrap';

let ThisComponent = null;

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tabsExpanded: false, path: this.props.current };
        this.componentRerender();
    }

    componentDidUpdate() {
        if (this.props.current !== this.state.path) {
            this.setState({ path: this.props.current });
            this.componentRerender();
        }
    }

    componentRerender() {
        let x = this.props.tabs.find(x => (this.props.current === x.component));
        ThisComponent = React.lazy(() => import('../../' + x.url));
    }

    render() {
        return (
            <div className="tabs-wrap">
                <div className="tabs-header-wrap">
                    <div className="tabs-mobile-title d-flex d-md-none d-lg-none align-items-center" onClick={() => this.setState({ tabsExpanded: !this.state.tabsExpanded })}>
                        {
                            [this.props.tabs.find(x => (this.props.current === x.component))].map(x =>
                                <p key={x.name} className="m-0 flex-grow-1">{x.name}</p>
                            )
                        }
                        <i className="fas fa-bars text-muted"></i>
                    </div>
                    <Collapse isOpen={this.state.tabsExpanded}>
                        <div className="tabs-mobile-wrap d-block d-md-none d-lg-none">
                            {
                                this.props.tabs.map(x =>
                                    <div key={x.name} className={classNames("tabs-title", { 'active': (this.props.current === x.component) })} onClick={() => this.props.onClick(x.component)}>{x.name}</div>
                                )
                            }
                        </div>
                    </Collapse>
                    {
                        this.props.tabs.map(x =>
                            <div key={x.name} className={classNames("tabs-title d-none d-md-block d-lg-block", { 'active': (this.props.current === x.component) })} onClick={() => this.props.onClick(x.component)}>{x.name}</div>
                        )
                    }
                    <div className="clearfix"></div>
                </div>
                <div className="tabs-content">
                    <React.Suspense fallback={<div className="text-center"><img width="auto" height="100%" src={require("../../../img/loader.svg")} /></div>}>
                        {
                            <ThisComponent {...this.props.passProps} />
                        }
                    </React.Suspense>
                </div>
            </div>
        );
    }
}

export default Tabs;