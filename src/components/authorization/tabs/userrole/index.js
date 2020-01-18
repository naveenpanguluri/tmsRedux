import React from 'react';
import './userrole.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../../config';

import Form from '../../../common/form';
import CustomModal from '../../../common/custommodal';
import Pagination from '../../../common/pagination';
import PageSizeSelector from '../../../common/pagesizeselector';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../../store/actions';
import { getuserroles, getuserrolesdata } from '../../../../store/viewsactions/authorization';

let
    serachFormElems = [
        {
            name: 'Username',
            placeholder: 'Search by username',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "text"
            },
            gridClass: "col-12 col-lg-6",
            check: [
                {
                    regex: "^.{2,}$",
                    message: "Should be atleast 2 characters"
                }
            ]
        }
    ],
    modalFormElems = [
        {
            name: 'Username',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "select",
                options: [
                    {
                        label: 'Select username',
                        value: ''
                    }
                ]
            },
            gridClass: "col-12",
            check: [
                {
                    regex: '^[0-9]+$',
                    message: "Please select an option"
                }
            ]
        },
        {
            name: 'Role',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "select",
                options: [
                    {
                        label: 'Select Role',
                        value: ''
                    }
                ]
            },
            gridClass: "col-12",
            check: [
                {
                    regex: '^[0-9]+$',
                    message: "Please select an option"
                }
            ]
        },
        {
            name: 'Region',
            value: '',
            errMsg: '',
            required: true,
            valid: false,
            field: {
                type: "select",
                options: [
                    {
                        label: 'Select region',
                        value: ''
                    }
                ]
            },
            gridClass: "col-12",
            check: [
                {
                    regex: '^[0-9]+$',
                    message: "Please select an option"
                }
            ]
        }
    ];

class UserRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalForm: [],
            SortOrder: "username",
            PageSize: 10,
            PageNumber: 1,
            keyword: "",
            editId: null,
            dataNull: []
        };
        this.getUserRoles();

        props.getuserrolesdata(this.failure);
    }

    failure = async (arr) => {
        if (!this.state.dataNull.length) {
            await this.setState({ dataNull: arr });
        }
    }

    async searchFormSubmit(data) {
        await this.setState({ keyword: data[0].value, PageNumber: 1 });
        this.props.getuserroles({
            "Requests": [
                {
                    "isActive": true,
                    "Username": this.state.keyword
                }
            ],
            "SortOrder": this.state.SortOrder,
            "PageSize": this.state.PageSize,
            "PageNumber": this.state.PageNumber
        });
        this.refs.searchFormRef.switchFormSubmit(false);
    }

    resetSearch() {
        this.setState({ keyword: "" });
        this.refs.searchFormRef.modifyFormObj(JSON.parse(JSON.stringify(serachFormElems)));
        this.getUserRoles();
    }

    addUserRole() {
        if (this.state.dataNull.length) {
            this.props.modifyerror({
                show: true,
                heading: "Data missing!",
                text: `Data is missing for '${this.state.dataNull.join(', ')}' options. Please create the related entries first to proceed.`
            })
        }
        else {
            this.setState({ showModal: true, editId: null, modalForm: JSON.parse(JSON.stringify(this.modalFormElems())) });
        }
    }

    modalFormElems() {
        let formObj = JSON.parse(JSON.stringify(modalFormElems)),
            { userRoleData } = this.props,
            { users, roles, regions } = userRoleData;
        formObj[0].field.options = [formObj[0].field.options[0], ...users.map(x => { return { value: x.Id, label: x.Value } })];
        formObj[1].field.options = [formObj[1].field.options[0], ...roles.map(x => { return { value: x.Id, label: x.Value } })];
        formObj[2].field.options = [formObj[2].field.options[0], ...regions.map(x => { return { value: x.Id, label: x.Value } })];
        return formObj;
    }

    editUserRole(x) {
        if (this.state.dataNull.length) {
            this.props.modifyerror({
                show: true,
                heading: "Data missing!",
                text: `Data is missing for '${this.state.dataNull.join(', ')}' options. Please create the related entries first to proceed.`
            })
        }
        else {
            let formObj = JSON.parse(JSON.stringify(modalFormElems)),
                { userRoleData } = this.props,
                { users, roles, regions } = userRoleData;

            formObj[0].value = x.UserID;
            formObj[0].valid = true;
            formObj[0].disabled = true;
            formObj[0].field.options = [formObj[0].field.options[0], ...users.map(x => { return { value: x.Id, label: x.Value } })];

            formObj[1].value = x.RoleID;
            formObj[1].valid = true;
            formObj[1].field.options = [formObj[1].field.options[0], ...roles.map(x => { return { value: x.Id, label: x.Value } })];

            formObj[2].value = x.BusinessAreaID;
            formObj[2].valid = true;
            formObj[2].field.options = [formObj[2].field.options[0], ...regions.map(x => { return { value: x.Id, label: x.Value } })];

            return formObj;
        }
    }

    async modalFormSubmit(data) {
        let self = this;
        this.props.addloader('userRoleFormSubmit');

        let body = {
            "Requests": [
                {
                    "UserID": data[0].value.toString(10),
                    "RoleID": data[1].value.toString(10),
                    "BusinessAreaID": data[2].value.toString(10)
                }
            ]
        };

        if (this.state.editId !== null) {
            body.Requests[0].ID = this.state.editId.toString(10);
        }

        await axios(rootURL + ops.users.createupdateuserrole, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Token": this.props.credentials.TokenKey
            },
            data: JSON.stringify(body)
        })
            .then(function (response) {
                if (response.statusText === "OK") {
                    console.log("response", response);
                    if (response.data.StatusCode === 200) {
                        toast.success(response.data.StatusMessage);
                        self.getUserRoles();
                        // success toast
                    }
                    else {
                        toast.error(response.data.StatusMessage);
                        // error toast
                    }
                }
                else {
                    console.log("response", response);
                    self.props.modifyerror({ show: true });
                }
            })
            .catch(function (error) {
                self.props.modifyerror({ show: true });
                console.log("error", error)
            });

        this.setState({ showModal: false });
        this.props.removeloader('userRoleFormSubmit');
    }

    async deleteUserRole(id) {
        console.log(id);
        let self = this;
        this.props.addloader('deleteUserRole');

        await axios(rootURL + ops.users.deleteuserrole + "?userRoleID=" + id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Token": this.props.credentials.TokenKey
            }
        })
            .then(function (response) {
                if (response.statusText === "OK") {
                    console.log("response", response);
                    if (response.data.StatusCode === 200) {
                        toast.success(response.data.StatusMessage);
                        self.getUserRoles();
                        // success toast
                    }
                    else {
                        toast.error(response.data.StatusMessage);
                        // error toast
                    }
                }
                else {
                    console.log("response", response);
                    self.props.modifyerror({ show: true });
                }
            })
            .catch(function (error) {
                self.props.modifyerror({ show: true });
                console.log("error", error)
            });

        this.props.removeloader('deleteUserRole');

    }

    async paginate(i) {
        await this.setState({ PageNumber: i });
        this.getUserRoles();
    }

    async sortTable(i) {
        await this.setState({ SortOrder: i });
        this.getUserRoles();
    }

    async rowsPerPageChange(i) {
        await this.setState({ PageSize: i, PageNumber: 1 });
        this.getUserRoles();
    }

    getUserRoles() {
        let reqObj = {
            "Requests": [
                {
                    "isActive": true
                }
            ],
            "SortOrder": this.state.SortOrder,
            "PageSize": this.state.PageSize,
            "PageNumber": this.state.PageNumber
        };
        if (this.state.keyword) {
            reqObj.Username = this.state.keyword;
        }
        this.props.getuserroles(reqObj);
    }

    render() {
        let searchFormButtons = <React.Fragment>
            <button className="text-uppercase btn btn-primary submit-button px-sm-5 px-md-5 px-lg-5 mt-0" type="submit">Search</button>
            {
                this.state.keyword &&
                <button className="btn btn-outline-danger reset-button p-2 ml-3 d-flex justify-content-between align-items-center" type="button" onClick={() => this.resetSearch()}><div className="text-truncate text-w">{this.state.keyword}</div><i className="fas fa-times"></i></button>
            }
        </React.Fragment>,
            modalFormButtons = <React.Fragment>
                <button className="text-uppercase btn btn-primary save-button px-5 mt-0 ml-auto" type="submit">SAVE</button>
                <button className="text-uppercase btn btn-primary cancel-button px-5 mt-0 ml-3" type="button" onClick={() => this.setState({ showModal: false })}>CANCEL</button>
            </React.Fragment>;
        return (
            <React.Fragment>
                <Form
                    fields={JSON.parse(JSON.stringify(serachFormElems))}
                    className="search-form px-2"
                    footerClassName="col-12 col-lg-6 d-flex"
                    formButtons={searchFormButtons}
                    onSubmit={obj => this.searchFormSubmit(obj)}
                    ref="searchFormRef"
                />

                <div className="table-header-block d-flex mt-4 align-items-center">
                    <h5 className="px-2 font-weight-bold table-heading m-0">User Role List</h5>
                    <button className="btn btn-outline-primary add-button p-2 ml-auto" onClick={() => this.addUserRole()}><i className="fas fa-plus"></i></button>
                </div>

                <PageSizeSelector NumberOfRecords={this.props.userRoleTable.NumberOfRecords} value={this.state.PageSize} onChange={x => this.rowsPerPageChange(x)} />

                <div className="table-cover px-2 mt-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "username") ? "username_desc" : "username")}>{(this.state.SortOrder.indexOf("username") !== -1) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "username") ? "down" : "up")}></i>}Username</th>
                                <th scope="col" style={{ "cursor": "pointer" }} onClick={() => this.sortTable((this.state.SortOrder === "rolename") ? "rolename_desc" : "rolename")}>{(this.state.SortOrder.indexOf("rolename") !== -1) && <i className={"mr-2 fas fa-sort-" + ((this.state.SortOrder === "rolename") ? "down" : "up")}></i>}Role</th>
                                <th scope="col">Region</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Boolean(this.props.userRoleTable.NumberOfRecords) ?
                                    this.props.userRoleTable.Data.map((x, i) =>
                                        <tr key={x.ID}>
                                            <td className={classNames("row-actions d-flex", { "border-top-0": !i })}>
                                                <i className="far fa-trash-alt text-secondary role-delete mr-3" onClick={() => this.deleteUserRole(x.ID)}></i>
                                                <i className="fas fa-pencil-alt text-secondary role-edit" onClick={() => this.setState({ showModal: true, editId: x.ID, modalForm: JSON.parse(JSON.stringify(this.editUserRole(x))) })}></i>
                                            </td>
                                            <td>{x.UserName}</td>
                                            <td>{x.RoleName}</td>
                                            <td>{x.BusinessArea}</td>
                                        </tr>
                                    ) :
                                    <tr><td className="text-center" colSpan="3">No records found</td></tr>
                            }
                        </tbody>
                    </table>
                    <Pagination PageSize={this.state.PageSize} PageNumber={this.state.PageNumber} NumberOfRecords={this.props.userRoleTable.NumberOfRecords} onClick={i => this.paginate(i)} />
                </div>

                <CustomModal modaltitle={(Boolean(this.state.editId) ? "Edit" : "Add New") + " User Role"} isOpen={this.state.showModal} onClick={() => this.setState({ showModal: false })}>
                    <Form
                        className="px-2"
                        fields={this.state.modalForm}
                        onSubmit={obj => this.modalFormSubmit(obj)}
                        footerClassName="col-12 d-flex modal-form-footer mt-3"
                        formButtons={modalFormButtons}
                    />
                </CustomModal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    let { credentials, views } = state,
        { authorization } = views,
        { userRoleTable, userRoleData } = authorization;
    return { credentials, userRoleTable, userRoleData }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror,
        getuserroles,
        getuserrolesdata
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserRole);