import React from 'react';
import './custombox.scss';
import classNames from 'classnames/bind';

class CustomBox extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        };
    }

    render(){
        const img = require("../../../img/" + this.props.img);
        return (
            // <div className="d-flex custom-box border rounded-lg px-3 py-3 m-0 my-2" onClick={() => this.props.onClick(this.props.URL)}>
            //     <div className="mr-3">
            //         <div className="title-logo">
            //             <img title="" alt="ASTRA MOTOR ORDERS ICON" className="img-fluid" src={img} />
            //         </div>
            //     </div>
            //     <div className="">
            //         <div className="">
            //             <p className="m-0 txt-clr title">{this.props.name}</p>
            //         </div>
            //     </div>
            // </div>
            <div className="row w-100 custom-box border rounded-lg px-2 py-3 m-0 my-2" onClick={() => this.props.onClick(this.props.URL)}>
                <div className="col-5 col-sm-12 col-md-12 col-lg-6 col-xl-5">
                    <div className="title-logo">
                        <img title="" alt="ASTRA MOTOR ORDERS ICON" className="img-fluid" src={img} />
                    </div>

                    {/* <div className={classNames("circle", this.props.circleBgColor)}>
                        <i className={classNames("text-light", "fa-2x", this.props.logo)}></i>
                    </div> */}
                </div>
                <div className="col-7 col-sm-12 col-md-12 col-lg-6 col-xl-7 p-0">
                    <div className="">
                        <p className="m-0 txt-clr title">{this.props.name}</p>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default CustomBox;
