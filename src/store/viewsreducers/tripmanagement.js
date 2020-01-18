import * as ActionType from '../types';
import { INITIAL_STATE } from '../initailstate';

const {views} = INITIAL_STATE, { tripManagement } = views;

/* TRIP MANAGEMENT TABLE */

export const tripTable = (state = tripManagement.tripTable, action) => {
    switch (action.type) {
        case ActionType.Modify_Trip_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

export const tripStatusNames = (state = tripManagement.tripStatusNames, action) => {
    switch (action.type) {
        case ActionType.Modify_Trip_Status_Names:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}