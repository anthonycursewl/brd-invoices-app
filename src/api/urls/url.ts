export const URL = {
    BASE_URL: 'http://localhost:3000',
    ENTITIES: {
        USERS: 'users',
        PAYMENTS: 'payments',
        CATEGORIES: 'categories',
        PRODUCTS: 'products',
    },
    ACTIONS: {
        CREATE: 'create',
        UPDATE: 'update',
        DELETE: 'delete',
        VERIFY: 'verify',
        GET: 'get',
    },
    AUTH: {
        LOGIN: 'login',
        REGISTER: 'register',
    }
}

export const APP_URLS = {
    VERIFY_TOKEN: `${URL.BASE_URL}/${URL.ENTITIES.USERS}/${URL.ACTIONS.VERIFY}`,
    AUTH_LOGIN: `${URL.BASE_URL}/${URL.ENTITIES.USERS}/${URL.AUTH.LOGIN}`,
    AUTH_REGISTER: `${URL.BASE_URL}/${URL.ENTITIES.USERS}/${URL.AUTH.REGISTER}`,
    CREATE_PRODUCT: `${URL.BASE_URL}/${URL.ENTITIES.PRODUCTS}/${URL.ACTIONS.CREATE}`,
}

