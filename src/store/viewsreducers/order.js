import * as ActionType from '../types';
import { INITIAL_STATE } from '../initailstate';

const {views} = INITIAL_STATE, { order } = views;

/* ORDERS TABLE */

export const ordersTable = (state = order.ordersTable, action) => {
    switch (action.type) {
        case ActionType.Modify_Orders_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* ORDER IDs */

export const orderIDs = (state = order.orderIDs, action) => {
    switch (action.type) {
        case ActionType.Modify_OrderID:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}


/* PARTNER LIST1 */

export const partnersList1 = (state = order.partnersList1, action) => {
    switch (action.type) {
        case ActionType.Modify_Partners_List1:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}


/* PARTNER LIST2 */

export const partnersList2 = (state = order.partnersList2, action) => {
    switch (action.type) {
        case ActionType.Modify_Partners_List2:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}


/* PARTNER LIST3 */

export const partnersList3 = (state = order.partnersList3, action) => {
    switch (action.type) {
        case ActionType.Modify_Partners_List3:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}


/* FLEET TYPES */

export const fleetTypes = (state = order.fleetTypes, action) => {
    switch (action.type) {
        case ActionType.Modify_Fleet_Types:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}


/* VEHICLE TYPES */

export const vehicleTypes = (state = order.vehicleTypes, action) => {
    switch (action.type) {
        case ActionType.Modify_Vehicle_Types:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* DRIVER NAMES */

export const driverNames = (state = order.driverNames, action) => {
    switch (action.type) {
        case ActionType.Modify_Driver_Names:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* REGION CODES */

export const regionCodes = (state = order.regionCodes, action) => {
    switch (action.type) {
        case ActionType.Modify_Region_Codes:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}