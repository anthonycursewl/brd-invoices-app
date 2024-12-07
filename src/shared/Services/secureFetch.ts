import { getCookie } from "../Cookies/GetCookie";
// @ts-ignore
export const secureFetch = async (url: string, method: string, body: any, setLoading: (v: boolean) => void, redirect?: (path: string) => void) => {
    try {
        setLoading(true);
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('AuthTokenBRD')}`,
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            const error = await response.json();
            return { error: error }
        }

        const data = await response.json();
        setLoading(false);
        return { result: data };
    } catch (error: any) {
        setLoading(false);
        return { error: error.message || 'Something went wrong' };
    }
}