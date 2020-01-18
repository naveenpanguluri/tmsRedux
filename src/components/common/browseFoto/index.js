import React from 'react';
import './browseFoto.scss';
import classNames from 'classnames/bind';

import axios from 'axios';
import { toast } from 'react-toastify';
import { rootURL, ops } from '../../../config';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addloader, removeloader, modifyerror } from '../../../store/actions';

class BrowseFoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = { elemObj: props.elemObj, formSubmitted: props.formSubmitted };
        this.fileRef = React.createRef();
    }

    getElemObj() {
        return JSON.parse(JSON.stringify(this.state.elemObj));
    }

    isElemValid() {
        return this.state.elemObj.valid;
    }

    changeFormState(val) {
        this.setState({ formSubmitted: val });
    }

    async fileSelected() {
        let filename = "",
            newFormObj = JSON.parse(JSON.stringify(this.state.elemObj));

        if (this.fileRef.current.value.indexOf("fakepath") !== -1) {
            filename = this.fileRef.current.value.split("fakepath\\")[1];
        }

        this.props.onChange(filename);

        newFormObj.value = filename;

        if (!(/\.(jpg|jpeg|png)$/i).test(filename)) {
            newFormObj.valid = false;
            newFormObj.errMsg = "Only .jpg, .jpeg & .png files are allowed"
        }
        else if (this.fileRef.current.files[0].size > 5242880) {
            newFormObj.valid = false;
            newFormObj.errMsg = "File size Max. 5MB"
        }
        else {
            newFormObj.valid = true;
            newFormObj.errMsg = ""
        }

        await this.setState({ elemObj: newFormObj });
    }

    async uploadFile() {
        let self = this,
            guid = null;

        if (this.state.elemObj.required || (!this.state.elemObj.required && this.state.elemObj.value)) {
            this.props.addloader(this.state.elemObj.name + 'uploadFile');

            var formData = new FormData();
            formData.append("image", this.fileRef.current.files[0]);

            await axios(rootURL + ops.uploadMedia.uploadfile, {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Token": self.props.credentials.TokenKey
                },
                data: formData
            })
                .then(function (response) {
                    if (response.statusText === "OK" && response.data.Status === "Success") {
                        guid = response.data.Guid;
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

            this.props.removeloader(this.state.elemObj.name + 'uploadFile');
        }
        else {
            guid = "";
        }
        return guid;
    }

    // async downloadFile() {
    //     this.props.addloader(this.state.elemObj.name + 'downloadFile');

    //     let self = this;

    //     await axios(rootURL + ops.uploadMedia.downloadfile + "?fileguid=" + this.props.guid, {
    //         method: 'GET',
    //         headers: {
    //             "Token": self.props.credentials.TokenKey
    //         }
    //     })
    //         .then(function (response) {
    //             if (response.statusText === "OK") {
    //                 console.log(response)
    //             }
    //             else {
    //                 console.log("response", response);
    //                 self.props.modifyerror({ show: true });
    //             }
    //         })
    //         .catch(function (error) {
    //             self.props.modifyerror({ show: true });
    //             console.log("error", error)
    //         });

    //     this.props.removeloader(this.state.elemObj.name + 'downloadFile');
    // }

    render() {
        let x = this.state.elemObj;
        return (
            <div className={classNames("form-group", x.gridClass)}>
                <label className="text-truncate">{x.name}{x.required && <span className="text-danger font-weight-bold">*</span>}</label>
                <div className="d-flex w-100">
                    <div className="flex-grow-1" onClick={() => this.fileRef.current.click()}>
                        <input type="text" disabled={true} className="form-control" style={{ "cursor": "pointer" }} value={x.value} aria-label={x.name} placeholder={x.placeholder} />
                    </div>
                    <div className="pl-2">
                        <button type="button" className="btn btn-primary browse-button px-4" onClick={() => this.fileRef.current.click()}>BROWSE</button>
                    </div>
                </div>
                <small className="form-text text-danger">{(this.props.formSubmitted || (x.value !== "" && !x.valid)) && x.errMsg}</small>
                {
                    Boolean(this.props.guid) &&
                    <a href="#" onClick={e => { e.preventDefault(); window.open(rootURL + ops.uploadMedia.downloadfile + "?fileguid=" + this.props.guid, "Uploaded Image", "width=800,height=600") }}>View uploaded image</a>
                }
                <input className="d-none" type="file" ref={this.fileRef} onChange={() => this.fileSelected()} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let { credentials } = state;
    return { credentials }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addloader,
        removeloader,
        modifyerror
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BrowseFoto);