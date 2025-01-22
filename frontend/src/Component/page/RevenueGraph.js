import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const RevenueGraph = ({ yearlyRevenue }) => {
    const [selectedYear, setSelectedYear] = useState('');

    // Prepare the unique years for the dropdown
    const uniqueYears = [...new Set(yearlyRevenue.map(yearData => yearData.year))];
    
    // Function to handle year change
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    // Filter the revenue data based on the selected year
    const filteredRevenue = selectedYear ? yearlyRevenue.find(yr => yr.year === selectedYear) : null;

    // Prepare the data for the chart
    let labels = [];
    let datasets = [];

    if (filteredRevenue) {
        labels = filteredRevenue.monthlyRevenue.map(monthData => monthData.month);
        
        // Generate a dataset for each month with a random color
        datasets = [{
            label: `${selectedYear} Revenue`,
            data: filteredRevenue.monthlyRevenue.map(monthData => monthData.revenue),
            backgroundColor: filteredRevenue.monthlyRevenue.map(() => getRandomColor()),
            
        }];
    }

    const data = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Ensures the chart fills the container without maintaining aspect ratio
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: filteredRevenue ? `Monthly Revenue for ${selectedYear}` : 'Select a Year to View Monthly Revenue',
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
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md text-black">
            <div className="mb-4 flex flex-wrap items-center gap-2">
                <label htmlFor="year-select" className="text-gray-700 font-medium">
                    Select Year:
                </label>
                <select
                    id="year-select"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">-- Select Year --</option>
                    {uniqueYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-11/12 h-[300px] sm:h-[400px]">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};


export default RevenueGraph;
