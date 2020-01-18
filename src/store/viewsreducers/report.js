import * as ActionType from '../types';
import { INITIAL_STATE } from '../initailstate';

const {views} = INITIAL_STATE, { report } = views;

/* REPORT ORDER PER HARI TABLE */

export const reportOrderPerHari = (state = report.reportOrderPerHari, action) => {
    switch (action.type) {
        case ActionType.Modify_OrderPerHari_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* REPORT ORDER PER HARI SELECT OPTIONS */

export const reportOrderPerHariSelectBox = (state = report.reportOrderPerHariSelectBox, action) => {
    switch (action.type) {
        case ActionType.Modify_OrderPerHari_SelectBox:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* ORDER PROGRESS TABLE */

export const orderProgress = (state = report.orderProgress, action) => {
    switch (action.type) {
        case ActionType.Modify_OrderProgress_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* REPORT FINISH ORDER PROGRESS TABLE */

export const finishOrderReport = (state = report.finishOrderReport, action) => {
    switch (action.type) {
        case ActionType.Modify_FinishOrderReport_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* REPORT ARMADA MUAT PER HARI TABLE */

export const reportArmadaMuatPerHari = (state = report.reportArmadaMuatPerHari, action) => {
    switch (action.type) {
        case ActionType.Modify_ArmadaMuatPerHari_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}


/* REPORT ARMADA BONGKAR PER HARI TABLE */

export const reportArmadaBongkarPerHari = (state = report.reportArmadaBongkarPerHari, action) => {
    switch (action.type) {
        case ActionType.Modify_ArmadaBongkarPerHari_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}


/* REPORT GR vs ORDER */

export const reportGRvsOrder = (state = report.reportGRvsOrder, action) => {
    switch (action.type) {
        case ActionType.Modify_GRvsOrder_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* REPORT GI vs ORDER */

export const reportGIvsOrder = (state = report.reportGIvsOrder, action) => {
    switch (action.type) {
        case ActionType.Modify_GIvsOrder_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* REPORT INBOUND BOARD ADMIN */

export const reportInboundBoardAdmin = (state = report.reportInboundBoardAdmin, action) => {
    switch (action.type) {
        case ActionType.Modify_InboundBoardAdmin:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* REPORT OUTBOUND BOARD ADMIN */

export const reportOutboundBoardAdmin = (state = report.reportOutboundBoardAdmin, action) => {
    switch (action.type) {
        case ActionType.Modify_OutboundBoardAdmin:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}
