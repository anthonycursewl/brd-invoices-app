export function createCookie(nombre: string, valor: string, minutos: number = 1400, secure: boolean = true, httpOnly: boolean = true, sameSite: 'Strict' | 'Lax' | 'None' = 'Strict') {
  const fechaExpiracion = new Date();
  fechaExpiracion.setTime(fechaExpiracion.getTime() + (minutos * 60 * 1000))
  
  let cookieString = `${nombre}=${encodeURIComponent(valor)}; expires=${fechaExpiracion.toUTCString()}; path=/; SameSite=${sameSite}`;
  
  if (secure) {
      cookieString += '; Secure';
  }
  
  if (httpOnly) {
      cookieString += '; HttpOnly';
  }
  
  document.cookie = cookieString;
}
