export interface Check<T> {
  conditions: (context: T) => boolean[];
  message: string;
}
