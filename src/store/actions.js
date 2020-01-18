import * as ActionType from './types';

/* CREDENTIALS */

export const modifycredentials = value => (
    {
        type: ActionType.Modify_Credentials,
        payload: value
    }
);

/* ERROR */

export const modifyerror = value => (
    {
        type: ActionType.Modify_Error,
        payload: value
    }
);

/* WARNING */

export const modifywarning = value => (
    {
        type: ActionType.Modify_Warning,
        payload: value
    }
);

/* LAYOUT */

// Sidebar

export const switchdesksidebar = () => (
    {
        type: ActionType.Switch_Desk_Sidebar
    }
);

export const switchmobsidebar = () => (
    {
        type: ActionType.Switch_Mob_Sidebar
    }
);

/* LOADER */

export const addloader = value => (
    {
        type: ActionType.Add_Loader,
        payload: value
    }
);

export const removeloader = value => (
    {
        type: ActionType.Remove_Loader,
        payload: value
    }
);