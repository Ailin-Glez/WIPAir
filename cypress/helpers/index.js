export const filterCookies = (cookies, cookieKey) => {
  const filterrdCookies = cookies.filter((item) => item.name === cookieKey);
  if (filterrdCookies.length > 0) return filterrdCookies[0];
  return null;
};

// exports.filterCookies = filterCookies;
