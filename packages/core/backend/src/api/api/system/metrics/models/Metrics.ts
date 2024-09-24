export class Metrics {
	readonly cpuTemperature: number;

	private constructor(cpuTemperature: number) {
		this.cpuTemperature = cpuTemperature;
	}

	public static fromCelsiusTemperature(cpuTemperature: number) {
		return new Metrics(cpuTemperature);
	}
}
