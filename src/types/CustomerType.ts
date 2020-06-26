export type T_Customer={
    customerid: number;
    name: string;
    age: number;
    gender: string;
}
export type T_StoreAction={
    type:string;
    payload:{id:string}|null;
}
export type T_SelectedCustomer={
    id:string|null;
}
export type T_CustomerListingResult={
    loading:boolean;
    data:T_Customer[],
    error:any;
}