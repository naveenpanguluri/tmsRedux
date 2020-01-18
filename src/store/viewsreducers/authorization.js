import * as ActionType from '../types';
import { INITIAL_STATE } from '../initailstate';

const {views} = INITIAL_STATE, { authorization } = views;

/* USER ROLE TABLE */

export const userRoleTable = (state = authorization.userRoleTable, action) => {
    switch (action.type) {
        case ActionType.Modify_User_Role_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

export const userRoleData = (state = authorization.userRoleData, action) => {
    switch (action.type) {
        case ActionType.Modify_User_Role_Data:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* ROLES MANGEMENT TABLE */

export const rolesMngtTable = (state = authorization.rolesMngtTable, action) => {
    switch (action.type) {
        case ActionType.Modify_Roles_Mngt_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

export const menuActivities = (state = authorization.menuActivities, action) => {
    switch (action.type) {
        case ActionType.Modify_Menu_Activities:
            return action.payload;
        default:
            return state
    }
}

/* USER APPLICATION TABLE */

export const userAppTable = (state = authorization.userAppTable, action) => {
    switch (action.type) {
        case ActionType.Modify_User_App_Table:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}

/* APPLICATIONS */

export const applications = (state = authorization.applications, action) => {
    switch (action.type) {
        case ActionType.Add_Applications:
            return action.payload;
        default:
            return state
    }
}