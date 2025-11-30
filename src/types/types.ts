export interface GenerationMix {
  fuel: string;
  perc: number;
}

export interface DailyEnergyMix {
  date: string;
  generationmix: GenerationMix[];
  cleanEnergyPercentage: number;
}

export interface OptimalChargingWindow {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  cleanEnergyPercentage: number;
}
