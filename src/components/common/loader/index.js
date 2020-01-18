import React from 'react';
import './loader.scss';
import { connect } from 'react-redux';

function Loader(props) {
    return (
        Boolean(props.loader.length) &&
        <div className="loader-wrap">
            <img width={props.width} height={props.height} alt="" src={require("../../../img/loader.svg")} />
        </div>
    );
}

export const StaticLoader = <div className="text-center">
                                <img width="auto" height="100%" alt="" style={{"maxHeight": "150px"}} src={require("../../../img/loader.svg")} />
                            </div>;

const mapStateToProps = (state) => {
    let { loader } = state;
    return { loader }
};

export default connect(mapStateToProps)(Loader);