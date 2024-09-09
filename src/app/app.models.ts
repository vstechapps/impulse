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


export interface Page{
    id:string;
    name:string;
    auth?:boolean;
    header?:boolean;
    html?:string;
    script?:string;
    style?:string;
  }
  