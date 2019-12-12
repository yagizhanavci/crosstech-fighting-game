export interface WarLog {
  id: string;
  logText: string;
}

export interface War {
  recentLogs: WarLog[];
}
