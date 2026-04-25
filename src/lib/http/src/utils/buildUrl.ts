type SearchParamValue = string | number | boolean;
type SearchParam =
  | SearchParamValue
  | readonly SearchParamValue[]
  | null
  | undefined;
export type SearchParams = Record<string, SearchParam>;

function generateSearchParams(searchParams: SearchParams): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value == null) continue;
    const values = Array.isArray(value)
      ? value.filter((v) => v !== null && v !== undefined)
      : [value];
    for (const v of values) params.append(key, String(v));
  }

  return params;
}

export function buildUrl<TSearchParams>(
  url: string,
  searchParams?: TSearchParams,
): URL {
  const builtSearchParams = generateSearchParams(searchParams || {});
  const builtUrl = new URL(url);
  builtUrl.search = builtSearchParams.toString();

  return builtUrl;
}
