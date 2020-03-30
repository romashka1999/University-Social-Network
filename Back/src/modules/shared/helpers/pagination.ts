export interface Ipagination {
    offset: number;
    limit: number;
}

export const pagination = <Ipagination>(page: number, pageSize: number) => {
    const offset = page * pageSize;
    const limit = pageSize;

    return {
        offset,//start index point data fetching
        limit //limit data
    }
}