import { DateTime, Settings } from "luxon";

const now = DateTime.fromISO("2025-01-01T00:00:00.000Z").toMillis();

Settings.now = () => now;
