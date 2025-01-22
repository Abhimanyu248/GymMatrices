
import Member from '../Models/member.js';

export const expiringmember = async (req, res) => {
    try {
        const { days } = req.query; // Optional query param for range (default: 7 days)
        const range = days ? parseInt(days, 10) : 7;

        const currentDate = new Date();
        const expiryDate = new Date();
        expiryDate.setDate(currentDate.getDate() + range);

        const expiringMembers = await Member.find({
            nextPaymentDate: { $gte: currentDate, $lte: expiryDate },
        }).sort({ nextPaymentDate: 1 }); // Sort by `nextPaymentDate`

        res.status(200).json({
            success: true,
            members: expiringMembers,
        });
    } catch (error) {
        console.error("Error fetching expiring members:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch expiring members",
            error: error.message,
        });
    }
};


export const monthlyrevenue = async (req, res) => {
    try {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();


        // Find members who joined this month
        const membersJoinedThisMonth = await Member.find({
            joiningdate: {
                $gte: new Date(currentYear, currentMonth, 1),
                $lte: new Date(currentYear, currentMonth + 1, 0),
            },
        });

        // Sum up the membership prices
        const totalMonthlyCollection = membersJoinedThisMonth.reduce((total, member) => {
            return total + member.membership.price;
        }, 0);

        res.status(200).json({
            success: true,
            totalMonthlyCollection,
            members: membersJoinedThisMonth,
        });
    } catch (error) {
        console.error("Error calculating monthly collection:", error);
        res.status(500).json({
            success: false,
            message: "Failed to calculate monthly collection",
            error: error.message,
        });
    }
};




export const totalrevenue = async (req, res) => {
    try {
        const members = await Member.find();

        // Helper function to get the month name from a Date object
        const getMonthName = (date) => {
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            return monthNames[date.getMonth()];
        };

        // Group members by year and then by month
        const yearlyMonthlyRevenue = {};
        let totalCollection = 0;

        members.forEach(member => {
            const joiningDate = new Date(member.joiningdate);
            const year = joiningDate.getFullYear();
            const monthName = getMonthName(joiningDate);

            if (!yearlyMonthlyRevenue[year]) {
                yearlyMonthlyRevenue[year] = {};
            }

            if (!yearlyMonthlyRevenue[year][monthName]) {
                yearlyMonthlyRevenue[year][monthName] = 0;
            }

            yearlyMonthlyRevenue[year][monthName] += member.membership.price;
            totalCollection += member.membership.price;
        });

        // Convert the yearlyMonthlyRevenue object to an array of objects
        const yearlyRevenueArray = Object.keys(yearlyMonthlyRevenue).map(year => ({
            year,
            monthlyRevenue: Object.keys(yearlyMonthlyRevenue[year]).map(month => ({
                month,
                revenue: yearlyMonthlyRevenue[year][month]
            }))
        }));

        res.status(200).json({
            success: true,
            yearlyRevenue: yearlyRevenueArray,
            totalCollection,
        });
    } catch (error) {
        console.error("Error calculating total collection:", error);
        res.status(500).json({
            success: false,
            message: "Failed to calculate total collection",
            error: error.message,
        });
    }
};

