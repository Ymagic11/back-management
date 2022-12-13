import type { FormItemRule } from 'element-plus'

export type Form = {
    username: String,
    password: string,
    bname: String,
    code: string
}

export type Rule = {
    [k in keyof Form]: Array<FormItemRule>
}

export type foodForm = {
    foodtype: string;
    foodname: string;
    fooddetail?: string;
    foodspecil?: string;
    pic?: string;
    guige?: baseform[];
    id?:number
}

export type foodRule = {
    [k in keyof foodForm]: Array<FormItemRule>
}

export type baseform = {
    name: string;
    price: number;
    moreprice: number;
}
