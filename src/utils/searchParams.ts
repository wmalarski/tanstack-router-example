export const buildSearchParams = (
  query?: Record<string, unknown>
): URLSearchParams => {
  const entries = Object.entries(query || {});
  const pairs = entries.flatMap(([key, value]) =>
    value !== undefined ? [[key, `${value}`]] : []
  );
  const search = new URLSearchParams(pairs);

  return search;
};