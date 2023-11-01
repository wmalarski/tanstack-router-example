import { getSession } from "@services/auth";
import { Loader } from "@tanstack/loaders";

export const sessionLoader = new Loader({
  key: "session",
  fn: () => {
    return getSession();
  },
});
