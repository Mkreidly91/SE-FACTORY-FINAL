const headers = (contentType?: {}) => {
  //   const { token } = JSON.parse(localStorage.getItem('userInfo') || '');
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU0UiLCJlbWFpbCI6InNlZmFjdG9yeUBnbWFpbC5jb20iLCJfaWQiOiI2NGY1YWY4NzQ0YjU3ZWIxYTY3ZGU1NTAiLCJpYXQiOjE2OTM4MzAyMDV9.uugT0AKkysCBZD1jeiRQt3nuupvV-Rm8McnIhTCcAbs';

  return {
    headers: { Authorization: `Bearer ${token}`, ...contentType },
  };
};
const getUser = () => {
  const { user } = JSON.parse(localStorage.getItem('userInfo') || '');
  return user;
};

export { headers, getUser };
