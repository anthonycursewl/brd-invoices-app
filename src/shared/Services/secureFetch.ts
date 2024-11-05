import { getCookie } from "../Cookies/GetCookie";

export const secureFetch = async (url: string, method: string, body: any, setLoading: (v: boolean) => void) => {
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
            throw new Error(error.message);
        }

        const data = await response.json();
        setLoading(false);
        return { result: data };
    } catch (error: string | any) {
        setLoading(false);
        return { error: error.message || 'Something went wrong' };
    }
}