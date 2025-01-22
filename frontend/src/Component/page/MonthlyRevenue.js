import React, { useState } from 'react';
import Revenue from './Revenue';

const MonthlyRevenue = ({ members, monthlyRevenue }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    // Filtered members by single date
    const filteredByDate = selectedDate
        ? members.filter((member) =>
            member.joiningdate.slice(0, 10) === selectedDate
        )
        : members;

    // Filtered members by date range
    const filteredByRange =
        dateRange.start && dateRange.end
            ? members.filter((member) => {
                const joiningDate = new Date(member.joiningdate.slice(0, 10));
                return (
                    joiningDate >= new Date(dateRange.start) &&
                    joiningDate <= new Date(dateRange.end)
                );
            })
            : filteredByDate;

    return (
        <>
            {/* Total Monthly Revenue */}
            <div className="text-center text-white mb-6">
                <h3 className="text-lg font-semibold">Total Monthly Revenue</h3>
                <p className="text-2xl font-bold mt-2">
                    {monthlyRevenue !== null ? `Rs: ${monthlyRevenue}` : 'Loading...'}
                </p>
            </div>

            {/* Date Filters */}
            <div className="flex flex-col md:flex-row justify-center gap-4 pl-4">
                <div className='text-white'>
                    <label className="block text-sm font-medium text-white mb-1">
                        Filter by Date:
                    </label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setDateRange({ start: '', end: '' }); // Clear range filter
                        }}
                        className="p-2 border rounded-md bg-gray-900 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className='text-white'>
                    <label className="block text-sm font-medium text-white mb-1">
                        Filter by Date Range:
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) =>
                                setDateRange((prev) => ({ ...prev, start: e.target.value }))
                            }
                            className="p-2 border rounded-md bg-gray-900 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-white">to</span>
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) =>
                                setDateRange((prev) => ({ ...prev, end: e.target.value }))
                            }
                            className="p-2 border rounded-md bg-gray-900 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Filtered Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4 gap-4">
                {filteredByRange.map((member) => (
                    <div key={member._id}>
                        <Revenue member={member} />
                    </div>
                ))}
                {filteredByRange.length === 0 && (
                    <p className="text-center text-gray-500 col-span-full">
                        No members found for the selected criteria.
                    </p>
                )}
            </div>
        </>
    );
};

export default MonthlyRevenue;
