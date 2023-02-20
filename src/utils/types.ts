import { QueryFunction } from "@tanstack/react-query";

export type QueryFunctionResult<T> = T extends QueryFunction<infer R, any>
  ? R
  : never;
