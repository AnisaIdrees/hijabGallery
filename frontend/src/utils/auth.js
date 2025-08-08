export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));
export const getUser = () => {

     const user = localStorage.getItem('user');

  // ✅ Handle all invalid cases
  if (!user || user === 'undefined' || user === 'null') return null;

  try {
    return JSON.parse(user);
  } catch (err) {
    console.error('Invalid JSON in user:', err);
    return null;
  }
}
export const removeUser = () => localStorage.removeItem("user")


export const isAuthorized = () => {
    const token = getToken()
    const user = getUser()
    return !!token && !!user
}