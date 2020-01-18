import React from 'react';
import './masterData.scss';
import CustomBox from '../common/custombox';

const renderBox = [
    {
        name: 'Expeditor',
        circleBgColor: 'bg-primary',
        logo: 'fas fa-truck-moving',
        img: 'masterdata/ic_expeditor_circle.png',
        URL: '/masterdata/maintainexpeditor'
    },
    {
        name: 'Vehicle',
        circleBgColor: 'bg-success',
        logo: 'fas fa-truck',
        img: 'masterdata/ic_vehicle_circle.png',
        URL: '/masterdata/maintainvehicle'
    },
    {
        name: 'Admin',
        circleBgColor: 'bg-danger',
        logo: 'fas fa-user-tie',
        img: 'masterdata/ic_admin_circle.png',
        URL: '/masterdata/maintainadmintransporter'
    },
    {
        name: 'Drivers',
        circleBgColor: 'bg-info',
        logo: 'fas fa-wheelchair',
        img: 'masterdata/ic_drivers_circle.png',
        URL: '/masterdata/maintaindrivertransporter'
    },
    {
        name: 'Pools',
        circleBgColor: 'bg-warning',
        logo: 'fas fa-map-marker-alt',
        img: 'masterdata/ic_pools_circle.png',
        URL: '/masterdata/maintainpools'
    },
    
]

class Masterdata extends React.Component {
    render() {
        return (
            <div className="MasterData">
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

export default Masterdata;