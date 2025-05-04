import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import AdminLayout from '../layout/AdminLayout';
import RevenueChart from "../charts/RevenueChart";
import { useLazyGetDashboardSalesQuery } from '../../redux/api/orderApi';
import toast from 'react-hot-toast';
import LoadingSpinner from '../layout/LoadingSpinner';
import MetaData from '../layout/MetaData';

const Dashboard = () => {
    const [startDate, setStartDate] = useState(new Date().setDate(1));
    const [endDate, setEndDate] = useState(new Date());

    const [getDashboardSales, { error, isLoading, data }] = useLazyGetDashboardSalesQuery();

    useEffect(() => {
        if (error) toast.error(error?.data?.message);

        if (startDate && endDate && !data) {
            getDashboardSales({
                startDate: new Date(startDate).toISOString(),
                endDate: endDate.toISOString(),
            });
        }
    }, [error, startDate, endDate, getDashboardSales, data]);

    const submitHandler = () => {
        getDashboardSales({
            startDate: new Date(startDate).toISOString(),
            endDate: endDate.toISOString(),
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <AdminLayout>
             <MetaData title="Admin Dashboard" />
            {/* Date Pickers: Use Bootstrap grid to make them stack on mobile */}
            <div className="row align-items-end g-3">
                <div className="col-md-4 col-sm-12">
                    <label className="form-label">Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        maxDate={new Date()}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4 col-sm-12">
                    <label className="form-label">End Date</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        maxDate={new Date()}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4 col-sm-12">
                    <button
                        className="btn btn-danger w-50 mt-2 mt-md-0"
                        onClick={submitHandler}
                    >
                        Fetch
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="row my-4">
                <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                    <div className="card text-white bg-success h-100">
                        <div className="card-body text-center card-font-size">
                            Sales
                            <br />
                            <b>${data?.totalSales?.toFixed(2)}</b>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                    <div className="card text-white bg-danger h-100">
                        <div className="card-body text-center card-font-size">
                            Orders
                            <br />
                            <b>{data?.totalNumOrders}</b>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-md-6 col-sm-12 mb-3">
                    <div className="card text-white bg-info h-100">
                        <div className="card-body text-center card-font-size">
                            Customers
                            <br />
                            <b>{data?.totalNumUsers}</b>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            {/* <div className="mt-4"> */}
                <RevenueChart salesData={data?.sales} />
            {/* </div> */}

            <div className="mb-5" />
        </AdminLayout>
    );
};

export default Dashboard;
