export function hasRole(requiredRole) {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === requiredRole;
  }
  