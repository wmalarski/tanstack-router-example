import { getSession } from "@services/auth";

export const sessionLoader = new Loader({
  key: "session",
  fn: () => {
    return getSession();
  },
});
