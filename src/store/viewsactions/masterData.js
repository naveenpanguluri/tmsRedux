import * as ActionType from '../types';
import axios from 'axios';

import { rootURL, ops } from '../../config';

import { addloader, removeloader, modifyerror } from '../actions';

/* VEHICLES */

// Actions

export const modifyvehiclestable = val => (
    {
        type: ActionType.Modify_Vehicles_Table,
        payload: val
    }
);

// Thunk
export const getvehicles = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getvehicles'));

        await axios(rootURL + ops.vehicle.getvehicles, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data,
                        { PageNumber, PageSize, SortOrder } = body;
                    dispatch(modifyvehiclestable({ NumberOfRecords, Data, PageNumber, PageSize, SortOrder }));
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getvehicles'));
    };
}


/* DRIVERS */

// Actions

export const modifydriverstable = val => (
    {
        type: ActionType.Modify_Drivers_Table,
        payload: val
    }
);

// Thunk
export const getdrivers = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getdrivers'));

        await axios(rootURL + ops.driver.getdrivers, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data,
                        { PageNumber, PageSize, SortOrder } = body;
                    dispatch(modifydriverstable({ NumberOfRecords, Data, PageNumber, PageSize, SortOrder }));
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getdrivers'));
    };
}


/* CREATE DRIVER TRANSPORTER */

// Actions

export const modifypartnersList = val => (
    {
        type: ActionType.Modify_Drivers_Partner,
        payload: val
    }
);

// Thunk
export const getpartnerslist = (body, failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpartnerslist'));

        await axios(rootURL + ops.driver.getpartners, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if(response.data.NumberOfRecords === 0){
                        failure();
                        dispatch(modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Partner' options. Please create the related entries first to proceed."
                        }));
                    }
                    else{
                        let { NumberOfRecords, Data } = response.data;
                        dispatch(modifypartnersList({ NumberOfRecords, Data }));
                    }
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getpartnerslist'));
    };
}


/* POOLS */

// Actions

export const modifypoolstable = val => (
    {
        type: ActionType.Modify_Pools_Table,
        payload: val
    }
);

// Thunk
export const getpools = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpools'));

        await axios(rootURL + ops.pool.getpools, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data,
                        { PageNumber, PageSize, SortOrder } = body;
                    dispatch(modifypoolstable({ NumberOfRecords, Data, PageNumber, PageSize, SortOrder }));
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getpools'));
    };
}


/* ADMIN */

// Actions

export const modifypicstable = val => (
    {
        type: ActionType.Modify_Admin_Table,
        payload: val
    }
);

// Thunk
export const getpics = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpics'));

        await axios(rootURL + ops.pic.getpics, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data,
                        { PageNumber, PageSize, SortOrder } = body;
                    dispatch(modifypicstable({ NumberOfRecords, Data, PageNumber, PageSize, SortOrder }));
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getpics'));
    };
}

/* EXPEDITOR */

// Actions

export const modifypartnerstable = val => (
    {
        type: ActionType.Modify_Expeditor_Table,
        payload: val
    }
);

// Thunk
export const getpartners = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpartners'));

        await axios(rootURL + ops.partner.getpartners, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data,
                        { PageNumber, PageSize, SortOrder } = body;
                    dispatch(modifypartnerstable({ NumberOfRecords, Data, PageNumber, PageSize, SortOrder }));
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getpartners'));
    };
}

/* PIC LIST */

// Actions

export const modifypiclist = val => (
    {
        type: ActionType.Modify_PIC_List,
        payload: val
    }
);

// Thunk
export const getpiclist = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpartners'));

        await axios(rootURL + ops.partner.getpics, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify({ "Requests": [{}], "SortOrder": "PICName" })
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if (response.data.NumberOfRecords === 0) {
                        failure();
                        dispatch(modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'PIC' / 'Admin' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        let { Data } = response.data;
                        dispatch(modifypiclist({ Data }));
                    }
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getpartners'));
    };
}


/* EXPEDITOR POP UP SEARCH DISTRICTS*/

// Actions

export const modifypopUpSearchDistricts = val => (
    {
        type: ActionType.Modify_SubDistrictDetails,
        payload: val
    }
);

export const getpopUpSearchDistricts = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpopUpSearchDistricts'));

        await axios(rootURL + ops.partner.getsubdistrictdetails, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if (response.data.NumberOfRecords === 0) {
                        failure();
                        dispatch(modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Kecamatan' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        dispatch(modifypopUpSearchDistricts(response.data));
                    }
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getpopUpSearchDistricts'));
    };
}


/* VEHICLE POOL NAMES */

// Actions

export const modifypoolNames = val => (
    {
        type: ActionType.Modify_PoolNames,
        payload: val
    }
);

export const getpoolNames = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpoolNames'));

        await axios(rootURL + ops.vehicle.getpoolnames, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if (response.data.NumberOfRecords === 0) {
                        failure();
                        dispatch(modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Pools' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        dispatch(modifypoolNames(response.data));
                    }
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getpoolNames'));
    };
}


/* VEHICLE SHIPPER NAMES */

// Actions

export const modifyshipperNames = val => (
    {
        type: ActionType.Modify_ShipperNames,
        payload: val
    }
);

export const getshipperNames = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getshipperNames'));

        await axios(rootURL + ops.vehicle.getshippernames, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if (response.data.NumberOfRecords === 0) {
                        failure();
                        dispatch(modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Shipper' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        dispatch(modifyshipperNames(response.data));
                    }
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getshipperNames'));
    };
}


/* VEHICLE TYPE NAMES */

// Actions

export const modifyvehicleTypeNames = val => (
    {
        type: ActionType.Modify_VehicleTypeNames,
        payload: val
    }
);

export const getvehicleTypeNames = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getvehicleTypeNames'));

        await axios(rootURL + ops.vehicle.getvehicletypenames, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if (response.data.NumberOfRecords === 0) {
                        failure();
                        dispatch(modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Jenis Kendaraan' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        dispatch(modifyvehicleTypeNames(response.data));
                    }
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getvehicleTypeNames'));
    };
}


/* POOL CITY NAMES */

// Actions

export const modifycityNames = val => (
    {
        type: ActionType.Modify_CityNames,
        payload: val
    }
);

export const getcityNames = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getcityNames'));

        await axios(rootURL + ops.pool.getcitynames, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if (response.data.NumberOfRecords === 0) {
                        failure();
                        dispatch(modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Kota' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        dispatch(modifycityNames(response.data));
                    }
                }
                else {
                    console.log("response", response);
                    dispatch(modifyerror({ show: true }));
                }
            })
            .catch(function (error) {
                dispatch(modifyerror({ show: true }));
                console.log("error", error)
            });

        dispatch(removeloader('getcityNames'));
    };
}