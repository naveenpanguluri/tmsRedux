import React from 'react';
import './authorization.scss';

import Tabs from '../common/tabs';

const renderTabs = [
    {
        name: 'User Role',
        component: 'userrole',
        url: 'authorization/tabs/userrole'
    },
    {
        name: 'Role Management',
        component: 'rolemanagement',
        url: 'authorization/tabs/rolemanagement'
    },
    {
        name: 'User Application',
        component: 'userapplication',
        url: 'authorization/tabs/userapplication'
    }
]

function Authorization(props) {
    return (
        <React.Fragment>
            <div className="authorization-wrap">
                <Tabs tabs={renderTabs} current={props.match.params.tab} onClick={x => props.history.push(`/authorization/${x}`)} />
            </div>
        </React.Fragment>
    )
}

export default Authorization;