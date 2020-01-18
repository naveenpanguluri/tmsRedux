import React from 'react';
import './warning.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modifywarning } from '../../../store/actions';

import { Modal } from 'reactstrap';

function Warning(props) {
    let { warning } = props;
    return (
        <Modal isOpen={warning.show} toggle={() => props.modifywarning({ show: false })} className="modal-dialog-centered">
            <div className="modal-body text-center">
                <div className="warning-icon"><i class="fas fa-exclamation-triangle"></i></div>
                <h4 className="modal-title my-3">{warning.text}</h4>
                <div className="modal-button-wrap text-centre">
                    <button type="button" onClick={() => { props.modifywarning({ show: false }); warning.onClick() }} className="btn btn-outline-primary mr-3 px-4">Yes</button>
                    <button type="button" onClick={() => props.modifywarning({ show: false })} className="btn btn-outline-primary px-4">No</button>
                </div>
            </div>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    let { warning } = state;
    return { warning }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        modifywarning
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Warning);