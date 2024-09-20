export interface DataTable {
    data:any[];
    cols:string[];
    actions:Action[];
}

export interface Action{
    id:string;
    text?:string;
    class?:string[];
    icon?:string;
}