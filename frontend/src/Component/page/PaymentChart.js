import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PaymentChart = ({ memberData }) => {
    const [filter, setFilter] = useState('Daily'); // Default filter
    const [filteredData, setFilteredData] = useState([]);
    const [cashTotal, setCashTotal] = useState(0);
    const [onlineTotal, setOnlineTotal] = useState(0);

    // Filter the data based on the selected filter
    useEffect(() => {
        const now = new Date();
        const filtered = memberData.filter((member) => {
            const paymentDate = new Date(member.joiningdate);
            switch (filter) {
                case 'Daily':
                    return paymentDate.toDateString() === now.toDateString();
                case 'Weekly':
                    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
                    return paymentDate >= startOfWeek;
                case 'Monthly':
                    return (
                        paymentDate.getMonth() === now.getMonth() &&
                        paymentDate.getFullYear() === now.getFullYear()
                    );
                case 'Yearly':
                    return paymentDate.getFullYear() === now.getFullYear();
                default:
                    return true;
            }
        });

        setFilteredData(filtered);

        // Calculate total collection
        const cash = filtered
            .filter((member) => member.payment === 'Cash')
            .reduce((acc, member) => acc + member.membership.price, 0);
        const online = filtered
            .filter((member) => member.payment === 'Online')
            .reduce((acc, member) => acc + member.membership.price, 0);

        setCashTotal(cash);
        setOnlineTotal(online);
    }, [filter, memberData]);


    // Prepare data for Chart.js
    const chartData = {
        labels: ['Cash', 'Online'],
        datasets: [
            {
                label: 'Payment Method',
                data: [
                    filteredData.filter((member) => member.payment === 'Cash').length,
                    filteredData.filter((member) => member.payment === 'Online').length,
                ],
                backgroundColor: ['#4caf50', '#2196f3'],
                borderColor: ['#388e3c', '#1976d2'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Payment Method Distribution (${filter})`,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
            {/* Filter Dropdown */}
            <div className="flex justify-between items-center mb-6">
                <label htmlFor="filter" className="font-medium text-gray-700">
                    Filter By:
                </label>
                <select
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
            </div>

            {/* Chart */}
            <div className="w-11/12 h-[300px] sm:h-[400px] mb-6">
                <Bar data={chartData} options={options} />
            </div>

            {/* Total Collection */}
            <div className="text-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Total Collection ({filter})
                </h3>
                <div className="flex justify-around">
                    <div className="text-green-600 font-medium">
                        <p>Cash:</p>
                        <p>₹{cashTotal}</p>
                    </div>
                    <div className="text-blue-600 font-medium">
                        <p>Online:</p>
                        <p>₹{onlineTotal}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentChart;
