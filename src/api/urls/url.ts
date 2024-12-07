import { API_URL } from "../../Config/tajinside.config"

export const URL = {
    BASE_URL: `${API_URL}`,
    ENTITIES: {
        USERS: 'users',
        PAYMENTS: 'payments',
        CATEGORIES: 'categories',
        PRODUCTS: 'products',
        SESSIONS: 'sessions'
    },
    ACTIONS: {
        CREATE: 'create',
        UPDATE: 'update',
        DELETE: 'delete',
        VERIFY: 'verify',
        GET: 'get',
        ALL: 'all'
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
    GET_ALL_PRODUCTS: `${URL.BASE_URL}/${URL.ENTITIES.PRODUCTS}/${URL.ACTIONS.GET}/${URL.ACTIONS.ALL}`,
    DELETE_SESSION_BY_ID: `${URL.BASE_URL}/${URL.ENTITIES.USERS}/${URL.ENTITIES.SESSIONS}/${URL.ACTIONS.DELETE}`,
    GET_PROFILE_BY_ID: `${URL.BASE_URL}/${URL.ENTITIES.USERS}/${URL.ACTIONS.GET}/profile`,
}

