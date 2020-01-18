import * as ActionType from '../types';
import { INITIAL_STATE } from '../initailstate';

const {views} = INITIAL_STATE, { masterData } = views;

/* VEHICLES TABLE */

export const vehiclesTable = (state = masterData.vehiclesTable, action) => {
    switch (action.type) {
        case ActionType.Modify_Vehicles_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* DRIVERS TABLE */

export const driversTable = (state = masterData.driversTable, action) => {
    switch (action.type) {
        case ActionType.Modify_Drivers_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* CREATE DRIVER TRANSPORTER */

export const partnersList = (state = masterData.partnersList, action) => {
    switch (action.type) {
        case ActionType.Modify_Drivers_Partner:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* POOLS TABLE */

export const poolsTable = (state = masterData.poolsTable, action) => {
    switch (action.type) {
        case ActionType.Modify_Pools_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* ADMIN TABLE */

export const picsTable = (state = masterData.picsTable, action) => {
    switch (action.type) {
        case ActionType.Modify_Admin_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* EXPEDITOR TABLE */

export const partnersTable = (state = masterData.partnersTable, action) => {
    switch (action.type) {
        case ActionType.Modify_Expeditor_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

export const picList = (state = masterData.picList, action) => {
    switch (action.type) {
        case ActionType.Modify_PIC_List:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* EXPEDITOR POP UP SEARCH DISTRICTS */

export const subDistrictDetails = (state = masterData.subDistrictDetails, action) => {
    switch (action.type) {
        case ActionType.Modify_SubDistrictDetails:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* VEHICLE POOL NAMES */

export const poolNames = (state = masterData.poolNames, action) => {
    switch (action.type) {
        case ActionType.Modify_PoolNames:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* VEHICLE SHIPPER NAMES */

export const shipperNames = (state = masterData.shipperNames, action) => {
    switch (action.type) {
        case ActionType.Modify_ShipperNames:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* VEHICLE TYPE NAMES */

export const vehicleTypeNames = (state = masterData.vehicleTypeNames, action) => {
    switch (action.type) {
        case ActionType.Modify_VehicleTypeNames:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* POOL CITY NAMES */

export const cityNames = (state = masterData.cityNames, action) => {
    switch (action.type) {
        case ActionType.Modify_CityNames:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}