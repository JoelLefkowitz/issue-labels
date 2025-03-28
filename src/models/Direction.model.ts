export const directions = ["bug", "enhancement", "question"] as const;

export type Direction = (typeof directions)[number];
