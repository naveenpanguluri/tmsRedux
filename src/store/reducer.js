import { combineReducers } from 'redux';
import * as ActionType from './types';

import * as AuthorizationReducer from './viewsreducers/authorization';
import * as MasterDataReducer from './viewsreducers/masterData';
import * as OrderReducer from './viewsreducers/order';
import * as DashboardReducer from './viewsreducers/dashboard';
import * as GatetogateReducer from './viewsreducers/gatetogate';
import * as TripManagementReducer from './viewsreducers/tripmanagement';
import * as ReportsReducer from './viewsreducers/report';




import { INITIAL_STATE } from './initailstate';

/* CREDENTIALS */

const credentialsReducer = (state = INITIAL_STATE.credentials, action) => {
    switch (action.type) {
        case ActionType.Modify_Credentials:
            return Object.assign({}, action.payload);
        default:
            return state
    }
}

/* ERROR */

const errorReducer = (state = INITIAL_STATE.error, action) => {
    switch (action.type) {
        case ActionType.Modify_Error:
            return Object.assign({}, INITIAL_STATE.error, action.payload);
        default:
            return state
    }
}

/* WARNING */

const warningReducer = (state = INITIAL_STATE.warning, action) => {
    switch (action.type) {
        case ActionType.Modify_Warning:
            return Object.assign({}, INITIAL_STATE.warning, action.payload);
        default:
            return state
    }
}

/* LAYOUT */

const layoutReducer = (state = INITIAL_STATE.layout, action) => {
    let { sidebar } = state;
    switch (action.type) {
        case ActionType.Switch_Desk_Sidebar:
            return Object.assign({}, state, { sidebar: Object.assign({}, sidebar, { desktop: !sidebar.desktop }) });
        case ActionType.Switch_Mob_Sidebar:
            return Object.assign({}, state, { sidebar: Object.assign({}, sidebar, { mobile: !sidebar.mobile }) });
        default:
            return state
    }
};

/* LOADER */

const loaderReducer = (state = INITIAL_STATE.loader, action) => {
    switch (action.type) {
        case ActionType.Add_Loader:
            return [...state, action.payload]
        case ActionType.Remove_Loader:
            return state.filter(x => (x !== action.payload))
        default:
            return state
    }
}

/* VIEWS */

const viewsReducer = (state = INITIAL_STATE.views, action) => {
    return ({
        authorization: {
            userRoleTable: AuthorizationReducer.userRoleTable(state.authorization.userRoleTable, action),
            userRoleData: AuthorizationReducer.userRoleData(state.authorization.userRoleData, action),
            rolesMngtTable: AuthorizationReducer.rolesMngtTable(state.authorization.rolesMngtTable, action),
            menuActivities: AuthorizationReducer.menuActivities(state.authorization.menuActivities, action),
            userAppTable: AuthorizationReducer.userAppTable(state.authorization.userAppTable, action),
            applications: AuthorizationReducer.applications(state.authorization.applications, action)
        },
        masterData:{
            vehiclesTable: MasterDataReducer.vehiclesTable(state.masterData.vehiclesTable, action),
            driversTable: MasterDataReducer.driversTable(state.masterData.driversTable, action),
            poolsTable: MasterDataReducer.poolsTable(state.masterData.poolsTable, action),
            picsTable: MasterDataReducer.picsTable(state.masterData.picsTable, action),
            partnersTable: MasterDataReducer.partnersTable(state.masterData.partnersTable, action),
            picList: MasterDataReducer.picList(state.masterData.picList, action),
            subDistrictDetails: MasterDataReducer.subDistrictDetails(state.masterData.subDistrictDetails, action),
            poolNames: MasterDataReducer.poolNames(state.masterData.poolNames, action),
            shipperNames: MasterDataReducer.shipperNames(state.masterData.shipperNames, action),
            vehicleTypeNames: MasterDataReducer.vehicleTypeNames(state.masterData.vehicleTypeNames, action),
            cityNames: MasterDataReducer.cityNames(state.masterData.cityNames, action),
            partnersList: MasterDataReducer.partnersList(state.masterData.partnersList, action),

        },
        order: {
            ordersTable: OrderReducer.ordersTable(state.order.ordersTable, action),
            orderIDs: OrderReducer.orderIDs(state.order.orderIDs, action),
            partnersList1: OrderReducer.partnersList1(state.order.partnersList1, action),
            partnersList2: OrderReducer.partnersList2(state.order.partnersList2, action),
            partnersList3: OrderReducer.partnersList3(state.order.partnersList3, action),
            fleetTypes: OrderReducer.fleetTypes(state.order.fleetTypes, action),
            vehicleTypes: OrderReducer.vehicleTypes(state.order.vehicleTypes, action),
            driverNames: OrderReducer.driverNames(state.order.driverNames, action),
            regionCodes: OrderReducer.regionCodes(state.order.regionCodes, action)
        },
        dashboard: {
            dashboardDetails: DashboardReducer.dashboardDetails(state.dashboard.dashboardDetails, action)
        },
        gatetogate: {
            gateTable: GatetogateReducer.gateTable(state.gatetogate.gateTable, action)
        },
        tripManagement: {
            tripTable: TripManagementReducer.tripTable(state.tripManagement.tripTable, action),
            tripStatusNames: TripManagementReducer.tripStatusNames(state.tripStatusNames, action)
        },
        report: {
            reportOrderPerHari: ReportsReducer.reportOrderPerHari(state.report.reportOrderPerHari, action),
            orderProgress: ReportsReducer.orderProgress(state.report.orderProgress, action),
            finishOrderReport: ReportsReducer.finishOrderReport(state.report.finishOrderReport, action),
            reportOrderPerHariSelectBox: ReportsReducer.reportOrderPerHariSelectBox(state.report.reportOrderPerHariSelectBox, action),
            reportArmadaMuatPerHari: ReportsReducer.reportArmadaMuatPerHari(state.report.reportArmadaMuatPerHari, action),
            reportArmadaBongkarPerHari: ReportsReducer.reportArmadaBongkarPerHari(state.report.reportArmadaBongkarPerHari, action),
            reportGRvsOrder: ReportsReducer.reportGRvsOrder(state.report.reportGRvsOrder, action),
            reportGIvsOrder: ReportsReducer.reportGIvsOrder(state.report.reportGIvsOrder, action),
            reportInboundBoardAdmin: ReportsReducer.reportInboundBoardAdmin(state.report.reportInboundBoardAdmin, action),
            reportOutboundBoardAdmin: ReportsReducer.reportOutboundBoardAdmin(state.report.reportOutboundBoardAdmin, action),

        }
    })
}

export default combineReducers({
    credentials: credentialsReducer,
    error: errorReducer,
    warning: warningReducer,
    layout: layoutReducer,
    loader: loaderReducer,
    views: viewsReducer
});