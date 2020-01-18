import * as ActionType from '../types';
import axios from 'axios';

import { rootURL, ops } from '../../config';

import { addloader, removeloader, modifyerror } from '../actions';

/* DASHBOARD */

// Actions

export const modifydashboarddetails = val => (
    {
        type: ActionType.Modify_Dashboard_Details,
        payload: val
    }
);

// Thunk
export const getdashboarddetails = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getdashboarddetails'));

        await axios(rootURL + ops.users.dashboard, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": getState().credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK" && response.data.Status === "Success") {
                    // let { NumberOfRecords, Data } = response.data,
                    //     { PageNumber, PageSize, SortOrder } = body;
                    dispatch(modifydashboarddetails(response.data));
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

        dispatch(removeloader('getdashboarddetails'));
    };
}

