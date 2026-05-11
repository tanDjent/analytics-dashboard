const APIRoot = import.meta.env.VITE_API_ROOT;

export const getDataURL = (endpoint: string, country?: string | null) => {
  const url = new URL(APIRoot + endpoint);
  if (country) {
    url.searchParams.append("country", country);
  }

  return url.toString();
};
