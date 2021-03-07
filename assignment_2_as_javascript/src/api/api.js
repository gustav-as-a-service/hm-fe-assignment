// eslint-disable-next-line no-undef
const getPeople = (search) => fetch(`/api/people?search=${search}`);

export const api = {
  getPeople,
};
