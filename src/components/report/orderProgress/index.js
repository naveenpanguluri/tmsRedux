import React from 'react';
import './orderProgress.scss';

import ToggleBound from '../../common/togglebound';
import Tabs from '../../common/tabs';

const renderTabs = [
    {
        name: 'Report - Progress Order',
        component: 'reportProgressOrder',
        url: 'report/orderProgress/tabs/reportProgressOrder'
    },
    {
        name: 'Report - Finish Order',
        component: 'reportFinishOrder',
        url: 'report/orderProgress/tabs/reportFinishOrder'
    }
]

class ReportOrderProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inbound: true }
    }

    render() {
        return (
            <React.Fragment>
                <div className="OrderProgress">
                    <div className="text-right">
                        <ToggleBound toggle={this.state.inbound} onClick={() => this.setState({ inbound: !this.state.inbound })} />
                    </div>
                    <Tabs passProps={{inbound: this.state.inbound}} tabs={renderTabs} current={this.props.match.params.tab} onClick={x => this.props.history.push(`/report/orderProgress/${x}`)} />
                </div>
            </React.Fragment>
        );
    }
}

export default ReportOrderProgress;