import * as ActionType from '../types';
import axios from 'axios';

import { rootURL, ops } from '../../config';

import { addloader, removeloader, modifyerror } from '../actions';

/* GATETOGATE */

// Actions

export const modifygatetogatetable = val => (
    {
        type: ActionType.Modify_Gate_Table,
        payload: val
    }
);

// Thunk
export const getgatetogatelist = body => {
    return async function (dispatch, getState) {
        dispatch(addloader('getgatetogatelist'));

        await axios(rootURL + ops.gatetogate.getgatelist, {
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
                    dispatch(modifygatetogatetable({ NumberOfRecords, Data, PageNumber, PageSize, SortOrder }));
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

        dispatch(removeloader('getgatetogatelist'));
    };
}

