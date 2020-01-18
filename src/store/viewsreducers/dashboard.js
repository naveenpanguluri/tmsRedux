import * as ActionType from '../types';
import { INITIAL_STATE } from '../initailstate';

const {views} = INITIAL_STATE, { dashboard } = views;

/* DASHBOARD */

export const dashboardDetails = (state = dashboard.dashboardDetails, action) => {
    switch (action.type) {
        case ActionType.Modify_Dashboard_Details:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}
