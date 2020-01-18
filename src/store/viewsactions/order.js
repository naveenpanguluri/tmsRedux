import * as ActionType from '../types';
import axios from 'axios';

import { rootURL, ops } from '../../config';

import { addloader, removeloader, modifyerror } from '../actions';

/* ORDERS TABLE*/

// Actions

export const modifyorderstable = val => (
    {
        type: ActionType.Modify_Orders_Table,
        payload: val
    }
);

// Thunk
export const getorders = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getorders'));

        await axios(rootURL + ops.order.getorders, {
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
                    dispatch(modifyorderstable({ NumberOfRecords, Data, PageNumber, PageSize, SortOrder }));
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

        dispatch(removeloader('getorders'));
    };
}


/* ORDER IDS*/

// Actions

export const modifyorderids = val => (
    {
        type: ActionType.Modify_OrderID,
        payload: val
    }
);

// Thunk
export const getorderids = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getorderids'));

        await axios(rootURL + ops.order.getorderids, {
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
                            text: "Data is missing for 'Trip No.' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        dispatch(modifyorderids(response.data));
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

        dispatch(removeloader('getorderids'));
    };
}



/* PARTNERS LIST1 */

// Actions

export const modifypartnerslist1 = val => (
    {
        type: ActionType.Modify_Partners_List1,
        payload: val
    }
);

// Thunk
export const getpartnerslist1 = (body, failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpartnerslist1'));

        await axios(rootURL + ops.order.getpartners, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                console.log(response);
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if (response.data.NumberOfRecords === 0) {
                        failure();
                        dispatch(modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Nama Transporter - Type 1' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        let { Data } = response.data;
                        dispatch(modifypartnerslist1({ Data }));
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

        dispatch(removeloader('getpartnerslist1'));
    };
}


/* PARTNERS LIST2 */

// Actions

export const modifypartnerslist2 = val => (
    {
        type: ActionType.Modify_Partners_List2,
        payload: val
    }
);

// Thunk
export const getpartnerslist2 = (body, failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpartnerslist2'));

        await axios(rootURL + ops.order.getpartners, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if (response.data.NumberOfRecords === 0) {
                        failure();
                        dispatch(modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Nama Transporter - Type 2'  options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        let { Data } = response.data;
                        dispatch(modifypartnerslist2({ Data }));
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

        dispatch(removeloader('getpartnerslist2'));
    };
}


/* PARTNERS LIST3 */

// Actions

export const modifypartnerslist3 = val => (
    {
        type: ActionType.Modify_Partners_List3,
        payload: val
    }
);

// Thunk
export const getpartnerslist3 = (body, failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpartnerslist3'));

        await axios(rootURL + ops.order.getpartners, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    if (response.data.NumberOfRecords === 0) {
                        failure();
                        dispatch(modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Nama Transporter - Type 3'  options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        let { Data } = response.data;
                        dispatch(modifypartnerslist3({ Data }));
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

        dispatch(removeloader('getpartnerslist3'));
    };
}


/* FLEET TYPES */

// Actions

export const modifyfleettypes = val => (
    {
        type: ActionType.Modify_Fleet_Types,
        payload: val
    }
);

// Thunk
export const getfleettypes = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getfleettypes'));

        await axios(rootURL + ops.order.getfleettypenames, {
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
                            text: "Data is missing for 'Tipe Muatan' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        dispatch(modifyfleettypes(response.data));
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

        dispatch(removeloader('getfleettypes'));
    };
}

/* VEHICLE TYPES */

// Actions

export const modifyvehicletypes = val => (
    {
        type: ActionType.Modify_Vehicle_Types,
        payload: val
    }
);

// Thunk
export const getvehicletypes = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getvehicletypes'));

        await axios(rootURL + ops.order.getvehicletypenames, {
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
                            text: "Data is missing for 'Tipe Kendaraan' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        dispatch(modifyvehicletypes(response.data));
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

        dispatch(removeloader('getvehicletypes'));
    };
}


/* DRIVER NAMES */

// Actions

export const modifydrivernames = val => (
    {
        type: ActionType.Modify_Driver_Names,
        payload: val
    }
);

// Thunk
export const getdrivernames = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getdrivernames'));

        await axios(rootURL + ops.order.getdrivernames, {
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
                            text: "Data is missing for 'Nama Pengendara' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        dispatch(modifydrivernames(response.data));
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

        dispatch(removeloader('getdrivernames'));
    };
}


/* REGION CODES */

// Actions

export const modifyregioncodes = val => (
    {
        type: ActionType.Modify_Region_Codes,
        payload: val
    }
);

// Thunk
export const getregioncodes = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getregioncodes'));

        await axios(rootURL + ops.order.getregioncodes, {
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
                            text: "Data is missing for 'Business Area' options. Please create the related entries first to proceed."
                        }));
                    }
                    else {
                        dispatch(modifyregioncodes(response.data));
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

        dispatch(removeloader('getregioncodes'));
    };
}