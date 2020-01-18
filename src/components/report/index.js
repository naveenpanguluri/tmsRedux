import React from 'react';
import './report.scss';
import CustomBox from '../common/custombox';

const renderBox = [
    {
        name: 'Report Order Per Hari',
        circleBgColor: 'bg-primary',
        logo: 'fas fa-file-alt',
        img: 'reports/ic_report_circle.png',
        URL: '/report/reportOrderPerHari'
    },
    {
        name: 'Armada Muat Per Hari',
        circleBgColor: 'bg-success',
        logo: 'fas fa-truck',
        img: 'reports/ic_armadamuat_circle.png',
        URL: '/report/armadaMuatPerHari'
    },
    {
        name: 'Armada Bongkar Per Hari',
        circleBgColor: 'bg-danger',
        logo: 'fas fa-truck',
        img: 'reports/ic_armadabongkar_circle.png',
        URL: '/report/armadaBongkarPerHari'
    },
    {
        name: 'Board Admin',
        circleBgColor: 'bg-info',
        logo: 'fas fa-user',
        img: 'reports/ic_boardadmin_circle.png',
        URL: '/report/boardAdmin'
    },
    {
        name: 'Order Progress',
        circleBgColor: 'bg-warning',
        logo: 'fas fa-box',
        img: 'reports/ic_orderprogress_circle.png',
        URL: '/report/orderProgress/reportProgressOrder'
    },
    {
        name: 'Invoice',
        circleBgColor: 'brown-bgclr',
        logo: 'fas fa-file-invoice-dollar',
        img: 'reports/ic_invoice_circle.png',
        URL: '/report/invoice'
    },
    {
        name: 'GR vs Order',
        circleBgColor: 'blue-bgclr',
        logo: 'fas fa-box',
        img: 'reports/ic_gr_circle.png',
        URL: '/report/GRvsOrder'
    },
    {
        name: 'GI vs Order',
        circleBgColor: 'purple-bgclr',
        logo: 'fas fa-box',
        img: 'reports/ic_gi_circle.png',
        URL: '/report/GIvsOrder'
    }
    
]

class Report extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div className="Report">
                <div className="row shadow-sm bg-wclr m-0 p-3 report">

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

export default Report;