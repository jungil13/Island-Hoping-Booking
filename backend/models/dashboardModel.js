const db = require('../config/db');

const getStats = async () => {
    try {
      const statsQuery = `
        SELECT
          (SELECT COUNT(*) FROM bookings) AS totalBookings,
          (SELECT COUNT(*) FROM bookings WHERE status = 'Approved') AS approvedBookings,
          (SELECT SUM(total_price) FROM bookings WHERE status = 'Approved') AS totalEarnings,
          (SELECT COUNT(*) FROM users) AS totalUsers
      `;
  
      const earningsQuery = `
        WITH months AS (
          SELECT 'January' AS month, 1 AS month_number UNION ALL
          SELECT 'February', 2 UNION ALL
          SELECT 'March', 3 UNION ALL
          SELECT 'April', 4 UNION ALL
          SELECT 'May', 5 UNION ALL
          SELECT 'June', 6 UNION ALL
          SELECT 'July', 7 UNION ALL
          SELECT 'August', 8 UNION ALL
          SELECT 'September', 9 UNION ALL
          SELECT 'October', 10 UNION ALL
          SELECT 'November', 11 UNION ALL
          SELECT 'December', 12
        )
        SELECT 
          m.month,
          COALESCE(SUM(b.total_price), 0) AS totalEarnings
        FROM months m
        LEFT JOIN bookings b 
          ON MONTH(b.created_at) = m.month_number
          AND YEAR(b.created_at) = YEAR(CURDATE())
          AND b.status = 'Approved'
        GROUP BY m.month, m.month_number
        ORDER BY m.month_number;
      `;
  
      const userBookingsQuery = `
        SELECT 
          users.name AS userName,
          COUNT(bookings.id) AS totalApprovedBookings,
          SUM(bookings.total_price) AS totalPrice
        FROM bookings
        JOIN users ON bookings.user_id = users.id
        WHERE bookings.status = 'Approved'
        GROUP BY users.id;
      `;
  
      const [statsResult] = await db.promise().query(statsQuery);
      const [earningsResult] = await db.promise().query(earningsQuery);
      const [userBookingsResult] = await db.promise().query(userBookingsQuery);
  
      return { stats: statsResult[0], earningsData: earningsResult, userBookingsData: userBookingsResult };
    } catch (error) {
      throw new Error('Error fetching stats: ' + error.message);
    }
  };
  
  

module.exports = { getStats };
