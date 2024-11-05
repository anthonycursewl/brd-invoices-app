export const useFetch = async (url: string, method: string, body: any, setLoading: (v: boolean) => void) => {
    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body !== null ? JSON.stringify(body) : null,
        })

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        setLoading(false);
        return { result: data };
    } catch (error: any) {
        console.log(`BRD | Error: ${error.message}`);
        setLoading(false);
        return { error: error.message || 'Something went wrong' };
    }
}