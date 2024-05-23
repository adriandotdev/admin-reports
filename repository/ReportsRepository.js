const mysql = require("../database/mysql");

module.exports = class ReportsRepository {
	GetTotalCPOs() {
		const QUERY = `
			SELECT 
				COUNT(*) AS total_cpos
			FROM 
				cpo_owners
			ORDER BY
				date_created DESC
		`;

		return new Promise((resolve, reject) => {
			mysql.query(QUERY, (err, result) => {
				if (err) {
					reject(err);
				}

				resolve(result);
			});
		});
	}

	GetTotalRFIDs() {
		const QUERY = `
			SELECT
				(SELECT COUNT(*) FROM rfid_cards WHERE rfid_status = 'ACTIVE' ORDER BY date_assigned DESC) AS total_assigned_rfids,
				(SELECT COUNT(*) FROM rfid_cards WHERE rfid_status = 'UNASSIGNED' ORDER BY date_created DESC) AS total_unassigned_rfids,
				(SELECT COUNT(*) FROM rfid_cards ORDER BY date_created DESC) AS total_rfids,
				(SELECT MAX(date_assigned) FROM rfid_cards WHERE rfid_status = 'ACTIVE') AS effective_date_of_total_assigned_rfids,
				(SELECT MAX(date_created) FROM rfid_cards WHERE rfid_status = 'UNASSIGNED') AS effective_date_of_total_unassigned_rfids,
				(SELECT MAX(date_created) FROM rfid_cards) AS effective_date_of_total_rfids
		`;

		return new Promise((resolve, reject) => {
			mysql.query(QUERY, (err, result) => {
				if (err) {
					reject(err);
				}

				resolve(result);
			});
		});
	}

	GetTotalEVSEs() {
		const QUERY = `
			SELECT 
				(SELECT COUNT(*) FROM evse WHERE cpo_location_id IS NOT NULL) AS total_assigned_evses,
				(SELECT COUNT(*) FROM evse WHERE cpo_location_id IS NULL) AS total_unassigned_evses,
				(SELECT COUNT(*) FROM evse) AS total_evses,
				(SELECT MAX(date_created) FROM evse WHERE cpo_location_id IS NOT NULL) AS effective_date_of_total_assigned_evses,
				(SELECT MAX(date_created) FROM evse WHERE cpo_location_id IS NULL) AS effective_date_of_total_unassigned_evses,
				(SELECT MAX(date_created) FROM evse) AS effective_date_of_total_evses 
		`;

		return new Promise((resolve, reject) => {
			mysql.query(QUERY, (err, result) => {
				if (err) {
					reject(err);
				}

				resolve(result);
			});
		});
	}

	GetTotalLocations() {
		const QUERY = `

			SELECT 
				(SELECT COUNT(*) FROM cpo_locations WHERE cpo_owner_id IS NOT NULL) AS total_assigned_locations,
				(SELECT COUNT(*) FROM cpo_locations WHERE cpo_owner_id IS NULL) AS total_unassigned_locations,
				(SELECT COUNT(*) FROM cpo_locations) AS total_locations,
				(SELECT MAX(date_created) FROM cpo_locations) AS effective_date_of_total_locations
		`;

		return new Promise((resolve, reject) => {
			mysql.query(QUERY, (err, result) => {
				if (err) {
					reject(err);
				}

				resolve(result);
			});
		});
	}

	GetTotalTopups() {
		const QUERY = `

			SELECT
				(SELECT SUM(amount) FROM topup_logs WHERE type = 'TOPUP') AS total_topup_sales,
				(SELECT SUM(amount) FROM topup_logs WHERE type = 'VOID') AS total_void_topups,
				(SELECT SUM(amount) FROM topup_logs WHERE type = 'TOPUP' AND payment_type = 'CARD') AS total_topup_card_sales,
				(SELECT SUM(amount) FROM topup_logs WHERE type = 'TOPUP' AND payment_type = 'MAYA') AS total_topup_maya_sales,
				(SELECT MAX(date_created) FROM topup_logs WHERE type = 'TOPUP') AS effective_date_of_topup_sales
		`;

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
