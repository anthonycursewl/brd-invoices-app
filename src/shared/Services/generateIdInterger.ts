/**
 * Función para generar un ID único de 5 dígitos
 * @param {number} length - Longitud del ID generado
 * @return {string} - ID único generado
 */
export const generateIdInteger = (length: number = 5): number => {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
    const idUnico = timestamp.slice(-length) + randomNum;
    return parseInt(idUnico);
}

