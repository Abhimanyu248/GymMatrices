import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RevenueGraph from './RevenueGraph'; // Adjust the import path as needed

const RevenueDashboard = () => {
    const [yearlyRevenue, setYearlyRevenue] = useState([]);
    const [totalCollection, setTotalCollection] = useState(0);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/general/total-revenue'); // Adjust the API endpoint as needed
                setYearlyRevenue(response.data.yearlyRevenue);
                setTotalCollection(response.data.totalCollection);
            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };

        fetchRevenueData();
    }, []);

    return (
        <div className="md:p-6 p-2">
            {/* <h1 className="text-2xl font-bold mb-4 text-white">Revenue Dashboard</h1> */}
            {/* <div className="mb-4 text-white">
                <p>Total Collection: Rs. {totalCollection}</p>
            </div> */}

            <div className=" text-center text-white">
                <h3 className="text-lg font-semibold">Total Revenue</h3>
                <p className="text-2xl font-semibold mt-1 mb-4">
                    Rs: {totalCollection}
                </p>
            </div>
            <RevenueGraph yearlyRevenue={yearlyRevenue} />
        </div>
    );
};

export default RevenueDashboard;