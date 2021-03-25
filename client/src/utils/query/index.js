import { Filter, FilterOperator } from "./Filter";
import { Expand } from "./Expand";
import { Sort, SortType } from "./Sort";

export const createQuery = ({filter, expand, select, sort}) => {
    return [
        filter ? `$filter=${filter.toQueryString()}` : "",
        expand ? `$expand=${expand.toQueryString()}` : "",
        select ? `$select=${select.toQueryString()}` : "",
        sort ? `$sort=${sort.toQueryString()}` : ""
    ].filter(part => part)
    .join("&");
};

export const getPath = (path, queryParams) => {
    let query = createQuery(queryParams);
    return query ? `http://localhost:4000/${path}?${query}` : `http://localhost:4000/${path}`;
};

export {
    Filter,
    FilterOperator,
    Expand,
    Sort,
    SortType
}