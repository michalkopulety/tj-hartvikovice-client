import {
    Filter,
    FilterOperator
} from "./Filter";
import {
    Expand
} from "./Expand";
import {
    Sort,
    SortType
} from "./Sort";

export const createQuery = ({
    filter,
    expand,
    select,
    sort,
    top
}) => {
    return [
            filter ? `$filter=${filter.toQueryString()}` : "",
            expand ? `$expand=${expand.toQueryString()}` : "",
            select ? `$select=${select.toQueryString()}` : "",
            sort ? `$sort=${sort.toQueryString()}` : "",
            top ? `$top=${top}` : ""
        ].filter(part => part)
        .join("&");
};

export const getPath = (path, queryParams) => {
    let query = createQuery(queryParams);
    return query ? `/${path}?${query}` : `/${path}`;
};

export {
    Filter,
    FilterOperator,
    Expand,
    Sort,
    SortType
}