import * as ActionType from '../types';
import axios from 'axios';

import { rootURL, ops } from '../../config';

import { addloader, removeloader, modifyerror } from '../actions';

/* REPORT ORDER PER HARI*/

// Actions

export const modifyOrderPerHariTable = val => (
    {
        type: ActionType.Modify_OrderPerHari_Table,
        payload: val
    }
);

// Thunk
export const getordersdatewise = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getordersdatewise'));

        await axios(rootURL + ops.report.getordersdatewise, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data;

                    dispatch(modifyOrderPerHariTable({ NumberOfRecords, Data }));
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

        dispatch(removeloader('getordersdatewise'));
    };
}



/* REPORT ORDER PER HARI SELECT BOX */

// Actions

export const modifyOrderPerHariSelectBox = val => (
    {
        type: ActionType.Modify_OrderPerHari_SelectBox,
        payload: val
    }
);

// Thunk
export const getpartners = (body, failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getpartners'));

        await axios(rootURL + ops.report.getpartners, {
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
                        this.props.modifyerror({
                            show: true,
                            heading: "Data missing!",
                            text: "Data is missing for 'Main Dealer' options. Please create the related entries first to proceed."
                        })
                    }
                    else {
                        let { NumberOfRecords, Data } = response.data;
    
                        dispatch(modifyOrderPerHariSelectBox({ NumberOfRecords, Data }));
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


/* ORDER PROGRESS */

// Actions

export const modifyOrderProgressTable = val => (
    {
        type: ActionType.Modify_OrderProgress_Table,
        payload: val
    }
);

// Thunk
export const getordersProgress = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getordersProgress'));

        await axios(rootURL + ops.report.getordersprogress, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data;

                    dispatch(modifyOrderProgressTable({ NumberOfRecords, Data }));
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

        dispatch(removeloader('getordersProgress'));
    };
}


/* REPORT FINISH ORDER */

// Actions

export const modifyFinishedOrderReports = val => (
    {
        type: ActionType.Modify_FinishOrderReport_Table,
        payload: val
    }
);

// Thunk
export const getfinishedorderreports = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getfinishedorderreports'));

        await axios(rootURL + ops.report.finishedorderreports, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data;

                    dispatch(modifyFinishedOrderReports({ NumberOfRecords, Data }));
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

        dispatch(removeloader('getfinishedorderreports'));
    };
}


/* REPORT ARMADA MUAT PER HARI*/

// Actions

export const modifyArmadaMuatPerHariTable = val => (
    {
        type: ActionType.Modify_ArmadaMuatPerHari_Table,
        payload: val
    }
);

// Thunk
export const getavgloadingperdayreport = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getavgloadingperdayreport'));

        await axios(rootURL + ops.report.avgloadingperdayreport, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data;

                    dispatch(modifyArmadaMuatPerHariTable({ NumberOfRecords, Data }));
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

        dispatch(removeloader('getavgloadingperdayreport'));
    };
}


/* REPORT ARMADA BONGKAR PER HARI*/

// Actions

export const modifyArmadaBongkarPerHariTable = val => (
    {
        type: ActionType.Modify_ArmadaBongkarPerHari_Table,
        payload: val
    }
);

// Thunk
export const getavgunloadingperdayreport = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getavgunloadingperdayreport'));

        await axios(rootURL + ops.report.avgunloadingperdayreport, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data;

                    dispatch(modifyArmadaBongkarPerHariTable({ NumberOfRecords, Data }));
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

        dispatch(removeloader('getavgunloadingperdayreport'));
    };
}


/* REPORT GR VS ORDER */

// Actions

export const modifyGRvsOrderReport = val => (
    {
        type: ActionType.Modify_GRvsOrder_Table,
        payload: val
    }
);

// Thunk
export const getgoodsreceivereport = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getgoodsreceivereport'));

        await axios(rootURL + ops.report.getgoodsreceivereport, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data;

                    dispatch(modifyGRvsOrderReport({ NumberOfRecords, Data }));
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

        dispatch(removeloader('getgoodsreceivereport'));
    };
}


/* REPORT GI VS ORDER */

// Actions

export const modifyGIvsOrderReport = val => (
    {
        type: ActionType.Modify_GIvsOrder_Table,
        payload: val
    }
);

// Thunk
export const getgoodsissuereport = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getgoodsissuereport'));

        await axios(rootURL + ops.report.getgoodsissuereport, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { NumberOfRecords, Data } = response.data;

                    dispatch(modifyGIvsOrderReport({ NumberOfRecords, Data }));
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

        dispatch(removeloader('getgoodsissuereport'));
    };
}


/* REPORT INBOUND BOARD ADMIN */

// Actions

export const modifyInboundBoardAdminReport = val => (
    {
        type: ActionType.Modify_InboundBoardAdmin,
        payload: val
    }
);

// Thunk
export const getinboundboardadminreport = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getinboundboardadminreport'));

        await axios(rootURL + ops.report.inboundboardadminreport, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                   
                    dispatch(modifyInboundBoardAdminReport(response.data));
                    
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

        dispatch(removeloader('getinboundboardadminreport'));
    };
}


/* REPORT OUTBOUND BOARD ADMIN */

// Actions

export const modifyOutboundBoardAdminReport = val => (
    {
        type: ActionType.Modify_OutboundBoardAdmin,
        payload: val
    }
);

// Thunk
export const getoutboundboardadminreport = (failure) => {
    return async function (dispatch, getState) {
        dispatch(addloader('getoutboundboardadminreport'));

        await axios(rootURL + ops.report.outboundboardadminreport, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                   
                    dispatch(modifyOutboundBoardAdminReport(response.data));
                    
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

        dispatch(removeloader('getoutboundboardadminreport'));
    };
}