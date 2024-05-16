export const createQueryString = (
  name: string,
  value: string,
  searchParams: any
) => {
  const params = new URLSearchParams(searchParams.toString());
  if (!value) {
    params.delete(name);
  }

  if (value) {
    params.set(name, value);
  }

  return params.toString();
};
