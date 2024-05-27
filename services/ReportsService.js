const ReportsRepository = require("../repository/ReportsRepository");

module.exports = class ReportsService {
	#repository;

	constructor() {
		this.#repository = new ReportsRepository();
	}

	async GetDashboardData() {
		const totalCPOs = await this.#repository.GetTotalCPOs();
		const rfidData = await this.#repository.GetTotalRFIDs();
		const evsesData = await this.#repository.GetTotalEVSEs();
		const totalLocations = await this.#repository.GetTotalLocations();
		const topupSales = await this.#repository.GetTotalTopups();

		return {
			total_cpos: totalCPOs[0].total_cpos,
			rfid_info: { ...rfidData[0] },
			evse_info: { ...evsesData[0] },
			location_info: { ...totalLocations[0] },
			topup_info: { ...topupSales[0] },
		};
	}
};
