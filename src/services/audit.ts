import { Audit } from "../models/Audit.model";
import { Check } from "../models/Check.model";
import { all } from "passes";

const accumulate = <T>(acc: Audit<T>[], input: T, problems: string[]) =>
  problems.length > 0 ? [...acc, { input, problems }] : acc;

export const audit = <T>(checks: Check<T>[], inputs: T[]) =>
  inputs.reduce<Audit<T>[]>(
    (acc, input) =>
      accumulate(
        acc,
        input,
        checks.reduce<string[]>(
          (acc, { conditions, message }) =>
            all(conditions(input)) ? [...acc, message] : acc,
          [],
        ),
      ),
    [],
  );
