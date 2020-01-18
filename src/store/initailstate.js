export const INITIAL_STATE = {
    credentials: {
        // "Data": [
        //     {
        //         "ID": 1,
        //         "UserName": "tms1",
        //         "Password": null,
        //         "ConfirmPassword": null,
        //         "FirstName": "tms user",
        //         "LastName": "one",
        //         "Applications": null,
        //         "IsActive": true,
        //         "ApplicationNames": null,
        //         "Roles": null,
        //         "Regions": null
        //     }
        // ],
        // "Status": "Success",
        // "StatusCode": 200,
        // "StatusMessage": "User Logged In Successfully",
        // "TokenKey": "Jt4w+1N+xYrnM3moTqLBsZMn/jAAzQ0/FzwoFpetEPFuNRZr6nhQvDCvFgj6vMed",
        // "TokenIssuedOn": "2019-05-07T21:16:03.367",
        // "TokenExpiresOn": "2019-08-09T02:31:20.527",
        // "NumberOfRecords": 0
    },
    error: {
        show: false,
        heading: "Something went wrong!",
        text: "Please try again later. We apologize for the inconvinience caused."
    },
    warning: {
        show: false,
        text: "Are you sure?",
        onClick: () => console.log("Warning initial click")
    },
    layout: {
        sidebar: {
            desktop: false,
            mobile: false
        }
    },
    loader: [],
    views: {
        authorization: {
            userRoleTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "username",
                Data: []
            },
            userRoleData: {
                users: [],
                roles: [],
                regions: []
            },
            rolesMngtTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "rolecode",
                Data: []
            },
            menuActivities: [],
            userAppTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "username",
                Data: []
            },
            applications: []
        },
        masterData: {
            vehiclesTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "platenumber",
                Data: []
            },
            driversTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "firstname",
                Data: []
            },
            poolsTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "poolname",
                Data: []
            },
            picsTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "",
                Data: []
            },
            partnersTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "partnername",
                Data: []
            },
            picList: {
                Data: []
            },
            subDistrictDetails: {
                Data: []
            },
            poolNames: {
                Data: []
            },
            shipperNames: {
                Data: []
            },
            vehicleTypeNames: {
                Data: []
            },
            cityNames: {
                Data: []
            },
            partnersList: {
                NumberOfRecords: 0,
                Data: []
            }
        },
        order: {
            ordersTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "",
                Data: []
            },
            orderIDs: {
                Data: []
            },
            partnersList1: {
                Data: []
            },
            partnersList2: {
                Data: []
            },
            partnersList3: {
                Data: []
            },
            fleetTypes: {
                Data: []
            },
            vehicleTypes: {
                Data: []
            },
            driverNames: {
                Data: []
            },
            regionCodes: {
                Data: []
            }
        },
        dashboard: {
            dashboardDetails: {
                
            }
        },
        gatetogate: {
            gateTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "",
                Data: []
            }
        },
        tripManagement: {
            tripTable: {
                PageNumber: 1,
                NumberOfRecords: 0,
                PageSize: 10,
                SortOrder: "",
                Data: []
            },
            tripStatusNames: {
                Data: []
            }
        },
        report: {
            reportOrderPerHari: {
                NumberOfRecords: 0,
                Data: []
            },
            reportOrderPerHariSelectBox: {
                NumberOfRecords: 0,
                Data: []
            },
            reportArmadaMuatPerHari: {
                NumberOfRecords: 0,
                Data: []
            },
            reportArmadaBongkarPerHari: {
                NumberOfRecords: 0,
                Data: []
            },
            reportGRvsOrder: {
                NumberOfRecords: 0,
                Data: []
            },
            reportGIvsOrder: {
                NumberOfRecords: 0,
                Data: []
            },
            reportInboundBoardAdmin: {
                NumberOfRecords: 0,
                Data: []
            },
            reportOutboundBoardAdmin: {
                NumberOfRecords: 0,
                Data: []
            },
            orderProgress: {
                NumberOfRecords: 0,
                Data: []
            },
            finishOrderReport: {
                NumberOfRecords: 0,
                Data: []
            }
        }
    }
};