import { userConstants } from '../Constants/userConstants';

const {
    GET_USER_LIST,
    GET_ASSET_LIST,
    CHANGE_PAGE,
    SET_SORT,
    SET_ASSET_SORT,
    SET_FILTER_TYPE,
    SET_ASSET_FILTER_STATE,
    SET_ASSET_FILTER_CATEGORY,
    SEARCH,
    ASSET_SEARCH,
    SET_FIRST_SHOW_USER,
    SET_USER_ASSIGNMENT,
    SET_ASSET_ASSIGNMENT,
    SET_ASSIGNMENT_LIST,
    SET_SEARCH_ASSIGNMENT,
    SET_DATE_ASSIGNMENT,
    SET_FILTER_ASSIGNMENT,
    SET_SORT_ASSIGNMENT,
    SET_FIRST_SHOW_ASSET,
    SET_FIRST_SHOW_ASSIGNMENT,
    SET_DEFAULT_DISPLAY,
    SET_DEFAULT_FIRST_RECORD,
    SET_REQUEST_LIST,
    SET_SEARCH_REQUEST,
    SET_RETURNED_DATE,
    SET_FILTER_REQUEST,
    SET_SORT_REQUEST,
    SET_FIRST_SHOW_REQUEST,
    SET_FIRST_SHOW_HOME_ASSIGNMENT,
} = userConstants;

export const getAllUsers = (data) => {
    return {
        type: GET_USER_LIST,
        payload: data,
        success: true,
    };
};

export const getAllAssets = (data) => {
    return {
        type: GET_ASSET_LIST,
        payload: data,
        success: true,
    };
};

export const changePage = (currentPage) => {
    return {
        type: CHANGE_PAGE,
        payload: {
            page: currentPage,
            success: false,
        },
    };
};

export const setSort = (sortCurrentColumn, sortCurrentType) => {
    return {
        type: SET_SORT,
        payload: {
            sortColumn: sortCurrentColumn,
            sortType: sortCurrentType,
        },
    };
};

export const setAssetSort = (sortCurrentColumn, sortCurrentType) => {
    return {
        type: SET_ASSET_SORT,
        payload: {
            sortColumn: sortCurrentColumn,
            sortType: sortCurrentType,
        },
    };
};

export const setFilter = (filterCurrentType) => {
    return {
        type: SET_FILTER_TYPE,
        payload: {
            filterType: filterCurrentType,
            success: false,
        },
    };
};

export const setAssetFilterState = (filterCurrentType) => {
    return {
        type: SET_ASSET_FILTER_STATE,
        payload: {
            filterState: filterCurrentType,
            success: false,
        },
    };
};

export const setAssetFilterCategory = (filterCurrentType) => {
    return {
        type: SET_ASSET_FILTER_CATEGORY,
        payload: {
            filterCategory: filterCurrentType,
            success: false,
        },
    };
};

export const setSearch = (words) => {
    return {
        type: SEARCH,
        payload: {
            search: words,
            success: false,
        },
    };
};

export const setAssetSearch = (words) => {
    return {
        type: ASSET_SEARCH,
        payload: {
            search: words,
            success: false,
        },
    };
};

// ASIGNMENT ===========================================================
export const setSearchAssignment = (data) => {
    return {
        type: SET_SEARCH_ASSIGNMENT,
        payload: data,
        success: false,
    };
};

export const setFilterAssignment = (data) => {
    return {
        type: SET_FILTER_ASSIGNMENT,
        payload: data,
        success: false,
    };
};

export const setDateAssignment = (data) => {
    return {
        type: SET_DATE_ASSIGNMENT,
        payload: data,
        success: false,
    };
};

export const setSortAssignment = (sortCurrentColumn, sortCurrentType) => {
    return {
        type: SET_SORT_ASSIGNMENT,
        payload: {
            sortColumn: sortCurrentColumn,
            sortType: sortCurrentType,
        },
    };
};
// ASIGNMENT ===========================================================

export const setFirstShowUser = (data) => {
    return {
        type: SET_FIRST_SHOW_USER,
        payload: data,
        success: false,
    };
};

export const setFirstShowAsset = (data) => {
    return {
        type: SET_FIRST_SHOW_ASSET,
        payload: data,
        success: false,
    };
};

export const setFirstShowAssignment = (data) => {
    return {
        type: SET_FIRST_SHOW_ASSIGNMENT,
        payload: data,
        success: false,
    };
};

export const setFirstShowHomeAssignment = (data) => {
    return {
        type: SET_FIRST_SHOW_HOME_ASSIGNMENT,
        payload: data,
        success: false,
    };
};

export const setUserAssignment = (id, fullName) => {
    return {
        type: SET_USER_ASSIGNMENT,
        payload: {
            id,
            fullName,
            success: false,
        },
    };
};

export const setAssetAssignment = (id, assetName) => {
    return {
        type: SET_ASSET_ASSIGNMENT,
        payload: {
            id,
            assetName,
            success: false,
        },
    };
};

export const setAssignmentList = (data) => {
    return {
        type: SET_ASSIGNMENT_LIST,
        payload: data,
        success: true,
    };
};

export const setDefaultDisplay = (data) => {
    return {
        type: SET_DEFAULT_DISPLAY,
        payload: { success: false, typeDefault: data },
    };
};

export const setDefaultFirstRecord = () => {
    return {
        type: SET_DEFAULT_FIRST_RECORD,
    };
};

// REQUEST ===========================================================
export const setRequestList = (data) => {
    return {
        type: SET_REQUEST_LIST,
        payload: data,
        success: true,
    };
};
export const setSearchRequest = (data) => {
    return {
        type: SET_SEARCH_REQUEST,
        payload: data,
        success: false,
    };
};

export const setFilterRequest = (data) => {
    return {
        type: SET_FILTER_REQUEST,
        payload: data,
        success: false,
    };
};

export const setReturnedDate = (data) => {
    return {
        type: SET_RETURNED_DATE,
        payload: data,
        success: false,
    };
};

export const setSortRequest = (sortCurrentColumn, sortCurrentType) => {
    return {
        type: SET_SORT_REQUEST,
        payload: {
            sortColumn: sortCurrentColumn,
            sortType: sortCurrentType,
        },
    };
};

export const setFirstShowRequest = (data) => {
    return {
        type: SET_FIRST_SHOW_REQUEST,
        payload: data,
        success: false,
    };
};
