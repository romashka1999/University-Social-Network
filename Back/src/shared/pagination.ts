export interface Ipagination {
    offset: number;
    limit: number;
}

export const pagination = <Ipagination>(page: number, pageSize: number) => {
    const offset: number = Number(page) * Number(pageSize);
    const limit: number = Number(pageSize);

    return {
        offset,//start index point data fetching
        limit //limit data
    }
}