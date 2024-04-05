const mysql = require("../database/mysql");

module.exports = class ReportsRepository {
	GetDashboardData() {
		const QUERY = ``;

		return new Promise((resolve, reject) => {
			mysql.query(QUERY, (err, result) => {
				if (err) {
					reject(err);
				}

				resolve(result);
			});
		});
	}
};
