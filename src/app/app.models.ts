export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  contact?: string;
  role: Role
}

export enum Role {
  USER = "USER",
  CLIENT = "CLIENT",
  ADMIN = "ADMIN"
}

export interface Page {
  id: string;
  name: string;
  auth?: boolean;
  header?: boolean;
  html?: string;
  script?: string;
  style?: string;
}

export interface Dialog {
  title?: string;
  form?: Form;
  table?: any;
}

export interface Form {
  id?: string
  name?: string;
  controls: Control[];
  actions: Action[];
}

export interface Table {
  data: any[];
  cols: string[];
  actions: Action[];
}

export interface Control {
  id: string;
  name?: string;
  type: string;
  label?: string;
  placeholder?: string;
  text?: string;
  values?: string[];
  value: string;
}

export interface Action {
  id: string;
  text: string;
  action: string;
  class?: string[];
  icon?: string;
}