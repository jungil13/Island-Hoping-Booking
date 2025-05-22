const dashboardModel = require('../models/dashboardModel');

const getDashboardStats = async (req, res) => {
    try {
      const { stats, earningsData, userBookingsData } = await dashboardModel.getStats();
  
      const response = {
        totalBookings: stats.totalBookings,
        approvedBookings: stats.approvedBookings,
        totalEarnings: stats.totalEarnings,
        totalUsers: stats.totalUsers,
        earningsData: {
          labels: earningsData.map((row) => row.month),
          datasets: [
            {
              label: 'Earnings',
              data: earningsData.map((row) => row.totalEarnings),
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              fill: true,
            },
          ],
        },
        userBookingsData: userBookingsData.map((row) => ({
          userName: row.userName,
          totalApprovedBookings: row.totalApprovedBookings,
          totalPrice: row.totalPrice,
        })),
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).send('Error fetching stats');
    }
  };
  
  module.exports = { getDashboardStats };
  