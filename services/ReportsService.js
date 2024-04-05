const ReportsRepository = require("../repository/ReportsRepository");

module.exports = class ReportsService {
	#repository;

	constructor() {
		this.#repository = new ReportsRepository();
	}

	async GetDashboardData() {
		const result = await this.#repository.GetDashboardData();

		return result;
	}
};
