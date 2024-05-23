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
			totalCPOs,
			rfidData,
			evsesData,
			totalLocations,
			topupSales,
		};
	}
};
