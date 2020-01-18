import React from 'react';
import './order.scss';
import CustomBox from '../common/custombox';

const renderBox = [
    {
        name: 'Order',
        circleBgColor: 'bg-primary',
        logo: 'fas fa-box',
        img: 'orders/ic_order_circle.png',
        URL: '/order/maintainorder'
    },
    {
        name: 'Packing Sheet',
        circleBgColor: 'bg-success',
        logo: 'fas fa-box-open',
        img: 'orders/ic_packingsheet_circle.png',
        URL: '/order/createpackingsheet'
    },
    
]

class Order extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div className="Order">
                <div className="row shadow-sm bg-wclr m-0 p-3">

                    {
                        renderBox.map((x) =>
                            <div key={x.name} className="col-12 col-md-4 col-lg-4 d-flex">
                                <CustomBox {...x} onClick={x => this.props.history.push(x)} />
                            </div>
                        )
                    }
                </div>
            </div>

        );
    }
}

export default Order;