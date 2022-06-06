export const filterDocData = (data, doc) =>
  data.filter((item) => item.id === doc)[0].data;
