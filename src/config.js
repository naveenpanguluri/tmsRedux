export const
    rootURL = "http://tms.anblicks.com/tms-qa-api/api/v1/",
    ops = {
        users: {
            login: "user/login",
            getuserroles: "user/getuserroles",
            getusernames: "user/getusernames",
            getrolecodes: "user/getrolecodes",
            getregioncodes: "user/getregioncodes",
            createupdateuserrole: "user/createupdateuserrole",
            deleteuserrole: "user/deleteuserrole",
            getroles: "user/getroles",
            getmenuwithactivities: "user/getmenuwithactivities",
            GetRoleDetails: "user/GetRoleDetails",
            createupdaterole: "user/createupdaterole",
            deleterole: "user/deleterole",
            getusers: "user/getusers",
            getapplications: "user/getapplications",
            createupdateuser: "user/createupdateuser",
            deleteuser: "user/deleteuser",
            dashboard: "user/dashboard"
        },
        vehicle: {
            getvehicles: "vehicle/getvehicles",
            deletevehicle: "vehicle/deletevehicle",
            createupdatevehicle: "vehicle/createupdatevehicle",
            getpoolnames: "master/getpoolnames",
            getshippernames: "master/getshippernames",
            getvehicletypenames: "master/getvehicletypenames"
        },
        driver: {
            getdrivers: "driver/getdrivers",
            createupdatedriver: "driver/createupdatedriver",
            deletedriver: "driver/deletedriver",
            getpartners: "master/getpartners"
        },
        pool: {
            getpools: "pool/getpools",
            createupdatepool: "pool/createupdatepool",
            deletepool: "pool/deletepool",
            getcitynames: "master/getcitynames"
        },
        pic: {
            getpics: "pic/getpics",
            createupdatepic: "pic/createupdatepic",
            deletepic: "pic/deletepic"
        },
        partner: {
            getpics: "pic/getpics",
            getpartners: "partner/getpartners",
            deletepartner: "partner/deletepartner",
            createupdatepartner: "partner/createupdatepartner",
            getsubdistrictdetails: "master/getsubdistrictdetails"
        },
        uploadMedia: {
            uploadfile: "media/uploadfile",
            downloadfile: "media/downloadfile"
        },
        order: {
            createupdateorders: "order/createupdateorder",
            createupdatepackingsheet: "order/createupdatepackingsheet",
            getregioncodes: "user/getregioncodes",
            getpartnerdetails: "master/getpartnerdetails",
            getorders: "order/getorders",
            trackorder: "order/trackorder",
            getorderids: "order/getorderids",
            getdealers: "order/getdealers",
            getpartners: "master/getpartners",
            getfleettypenames: "master/getfleettypenames",
            getvehicletypenames: "master/getvehicletypenames",
            getdrivernames: "master/getdrivernames",
            getorderdetails: "order/getorderdetails"
        },
        gatetogate: {
            creategateingateout: "gate/creategateingateout",
            getgatelist: "gate/getgatelist",
            getgatenames: "master/getgatenames"
        },
        tripManagement: {
            gettripstatusnames: "master/gettripstatusnames",
            updatetripdetails: "trip/updatetripdetails",
            gettriplist: "trip/gettriplist",
            gettripdetails: "trip/gettripdetails"
        },
        report: {
            getordersdatewise: "report/getordersdatewise",
            getordersprogress: "report/getordersprogress",
            finishedorderreports: "report/finishedorderreports",
            getpartners: "master/getpartners",
            avgloadingperdayreport: "report/avgloadingperdayreport",
            avgunloadingperdayreport: "report/avgunloadingperdayreport",
            getgoodsreceivereport: "report/getgoodsreceivereport",
            getgoodsissuereport: "report/getgoodsissuereport",
            inboundboardadminreport: "report/inboundboardadminreport",
            outboundboardadminreport: "report/outboundboardadminreport"
        }
    },
    entriesPerPage = [5, 10, 20, 50];