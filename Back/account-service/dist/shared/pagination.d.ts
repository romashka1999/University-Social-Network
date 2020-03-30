export interface Ipagination {
    offset: number;
    limit: number;
}
export declare const pagination: <Ipagination_1>(page: number, pageSize: number) => {
    offset: number;
    limit: number;
};
