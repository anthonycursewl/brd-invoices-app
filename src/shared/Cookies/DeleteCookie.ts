export const deleteCookie = (cookieName: string) => {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/;';
  }