export interface iUser {
    _id: string,
    name: string,
    email: string,
    role: string
    permission: IPermission[]

}

interface IPermission {
    apiPath: string;
    method: string;
}