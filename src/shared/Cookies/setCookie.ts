export function createCookie(nombre: string, valor: string, dias: number = 3650) {
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (dias * 24 * 60 * 60 * 1000));
  
    document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${fechaExpiracion.toUTCString()}; path=/`;
  }