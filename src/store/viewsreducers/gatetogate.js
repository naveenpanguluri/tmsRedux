import * as ActionType from '../types';
import { INITIAL_STATE } from '../initailstate';

const {views} = INITIAL_STATE, { gatetogate } = views;

/* GATETOGATE TABLE */

export const gateTable = (state = gatetogate.gateTable, action) => {
    switch (action.type) {
        case ActionType.Modify_Gate_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}
