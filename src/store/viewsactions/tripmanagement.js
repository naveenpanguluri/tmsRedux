import * as ActionType from '../types';
import axios from 'axios';

import { rootURL, ops } from '../../config';

import { addloader, removeloader, modifyerror } from '../actions';

/* TRIP MANAGEMENT */

// Actions

export const modifytriptable = val => (
    {
        type: ActionType.Modify_Trip_Table,
        payload: val
    }
);

export const modifytripStatusNames = val => (
    {
        type: ActionType.Modify_Trip_Status_Names,
        payload: val
    }
);

// Thunk
export const gettriplist = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('gettriplist'));

        await axios(rootURL + ops.tripManagement.gettriplist, {
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
                    dispatch(modifytriptable({ NumberOfRecords, Data, PageNumber, PageSize, SortOrder }));
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

        dispatch(removeloader('gettriplist'));
    };
}

// Thunk
export const gettripstatusnames = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('gettripstatusnames'));

        await axios(rootURL + ops.tripManagement.gettripstatusnames, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    let { Data } = response.data;
                    dispatch(modifytripStatusNames({ Data }));
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

        dispatch(removeloader('gettripstatusnames'));
    };
}