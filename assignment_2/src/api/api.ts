const getPeople = (search:string) => fetch(`/api/people?search=${search}`);

export const api = {
  getPeople,
};
