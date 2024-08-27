export interface User{
    id:string;
    name:string;
    email:string;
    image?:string;
    contact?:string;
    role:Role
}

export enum Role{
    USER="USER",
    CLIENT="CLIENT",
    ADMIN="ADMIN"
}
  