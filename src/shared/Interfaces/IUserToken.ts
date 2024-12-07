export interface IUserToken {
    id: string;
    email: string;
    type: string;
    iat: number;
    exp: number;
}