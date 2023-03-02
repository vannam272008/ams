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
    SET_USER_ASSIGNMENT,
    SET_ASSET_ASSIGNMENT,
} = userConstants;

const initState = {
    userList: [],
    assetList: [],
    assignmentList: [],
    user: null,
    meta: [],
    success: false,
    requestFirstShown: {},
    homeAssignmentFirstShown: {},
    userFirstShown: {},
    assetFirstShown: {},
    assignmentFirstShow: {},
    sortAction: {
        page: 1,
        sortColumn: '', // (full_name, staff_code, joined_date, admin)
        sortType: 2, // 1 (desc), 2(asc)
        filterType: 'all', // (admin, staff, all)
        search: null,
    },
    sortAssignment: {
        page: 1,
        sortColumn: 'asset_name', // (full_name, staff_code, joined_date, admin)
        sortType: 2, // 1 (desc), 2(asc)
        filterType: 'all', // (admin, staff, all)
        search: null,
        assignedDate: null,
    },
    sortAssetAction: {
        page: 1,
        sortColumn: 'asset_name', // (asset_code, asset_name, category_name, asset_status_name)
        sortType: 2, // 1 (desc), 2(asc)
        filterState: 'all', // (id),
        filterCategory: 'all', // (id)
        search: null,
        assignedDate: null,
    },
    showUserAssignment: {
        id: 0,
        fullName: '',
    },
    showAssetAssignment: {
        id: 0,
        assetName: '',
    },
    sortRequestAction: {
        page: 1,
        sortColumn: 'asset_name', // (full_name, staff_code, joined_date, admin)
        sortType: 2, // 1 (desc), 2(asc)
        filterType: 'all', // (admin, staff, all)
        search: null,
        returnedDate: null,
    },
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_USER_LIST:
            return {
                ...state,
                userList: action.payload.data,
                meta: action.payload.meta,
                success: action.payload.success,
            };
        case GET_ASSET_LIST:
            return {
                ...state,
                assetList: action.payload.data,
                meta: action.payload.meta,
                success: action.payload.success,
            };
        case CHANGE_PAGE:
            return {
                ...state,
                sortAction: {
                    ...state.sortAction,
                    page: action.payload.page,
                },
                sortAssignment: {
                    ...state.sortAssignment,
                    page: action.payload.page,
                },
                sortAssetAction: {
                    ...state.sortAssetAction,
                    page: action.payload.page,
                },
                sortRequestAction: {
                    ...state.sortRequestAction,
                    page: action.payload.page,
                },
            };
        case SET_SORT:
            return {
                ...state,
                sortAction: {
                    ...state.sortAction,
                    page: 1,
                    sortColumn: action.payload.sortColumn,
                    sortType: action.payload.sortType,
                },
            };
        case SET_ASSET_SORT:
            return {
                ...state,
                sortAssetAction: {
                    ...state.sortAssetAction,
                    page: 1,
                    sortColumn: action.payload.sortColumn,
                    sortType: action.payload.sortType,
                },
            };
        case SET_FILTER_TYPE:
            return {
                ...state,
                success: action.payload.success,
                sortAction: {
                    ...state.sortAction,
                    page: 1,
                    filterType: action.payload.filterType,
                },
            };
        case SET_ASSET_FILTER_STATE:
            return {
                ...state,
                success: action.payload.success,
                sortAssetAction: {
                    ...state.sortAssetAction,
                    page: 1,
                    filterState: action.payload.filterState,
                },
            };
        case SET_ASSET_FILTER_CATEGORY:
            return {
                ...state,
                success: action.payload.success,
                sortAssetAction: {
                    ...state.sortAssetAction,
                    page: 1,
                    filterCategory: action.payload.filterCategory,
                },
            };
        case SEARCH:
            return {
                ...state,
                success: action.payload.success,
                sortAction: {
                    ...state.sortAction,
                    page: 1,
                    search: action.payload.search,
                },
            };
        case ASSET_SEARCH:
            return {
                ...state,
                success: action.payload.success,
                sortAssetAction: {
                    ...state.sortAssetAction,
                    page: 1,
                    search: action.payload.search,
                },
            };
        case 'SET_FIRST_SHOW_USER':
            return {
                ...state,
                success: action.payload.success,
                userFirstShown: action.payload.data,
            };
        case 'SET_FIRST_SHOW_ASSET':
            return {
                ...state,
                success: action.payload.success,
                assetFirstShown: action.payload.data,
            };
        case 'SET_FIRST_SHOW_ASSIGNMENT':
            return {
                ...state,
                success: action.payload.success,
                assignmentFirstShow: action.payload.data,
                sortAssignment: {
                    page: 1,
                    sortColumn: 'asset_name', // (full_name, staff_code, joined_date, admin)
                    sortType: 2, // 1 (desc), 2(asc)
                    filterType: 'all', // (admin, staff, all)
                    search: null,
                    assignedDate: null,
                },
            };
        case 'SET_FIRST_SHOW_HOME_ASSIGNMENT':
            return {
                ...state,
                success: action.payload.success,
                homeAssignmentFirstShown: action.payload.data,
                sortAssignment: {
                    page: 1,
                    sortColumn: 'asset_name', // (full_name, staff_code, joined_date, admin)
                    sortType: 2, // 1 (desc), 2(asc)
                    filterType: 'all', // (admin, staff, all)
                    search: null,
                    assignedDate: null,
                },
            };
        case SET_USER_ASSIGNMENT:
            return {
                ...state,
                success: action.payload.success,
                showUserAssignment: {
                    ...state.showUserAssignment,
                    id: action.payload.id,
                    fullName: action.payload.fullName,
                },
            };
        case SET_ASSET_ASSIGNMENT:
            return {
                ...state,
                success: action.payload.success,
                showAssetAssignment: {
                    ...state.showAssetAssignment,
                    id: action.payload.id,
                    assetName: action.payload.assetName,
                },
            };

        //    ASIGNMENT =======================================
        case 'SET_ASSIGNMENT_LIST':
            return {
                ...state,
                assignmentList: action.payload.data,
                meta: action.payload.meta,
                success: action.payload.success,
            };
        case 'SET_DATE_ASSIGNMENT':
            return {
                ...state,
                success: action.payload.success,
                sortAssignment: {
                    ...state.sortAssignment,
                    page: 1,
                    assignedDate: action.payload.data,
                },
            };
        case 'SET_SEARCH_ASSIGNMENT':
            return {
                ...state,
                success: action.payload.success,
                sortAssignment: {
                    ...state.sortAssignment,
                    page: 1,
                    search: action.payload.data,
                },
            };
        case 'SET_FILTER_ASSIGNMENT':
            return {
                ...state,
                success: action.payload.success,
                sortAssignment: {
                    ...state.sortAssignment,
                    page: 1,
                    filterType: action.payload.data,
                },
            };
        case 'SET_SORT_ASSIGNMENT':
            return {
                ...state,
                sortAssignment: {
                    ...state.sortAssignment,
                    page: 1,
                    sortColumn: action.payload.sortColumn,
                    sortType: action.payload.sortType,
                },
            };

        //    ASIGNMENT =======================================
        // REQUEST ---------------------------
        case 'SET_REQUEST_LIST':
            return {
                ...state,
                requestList: action.payload.data,
                meta: action.payload.meta,
                success: action.payload.success,
            };
        case 'SET_RETURNED_DATE':
            return {
                ...state,
                success: action.payload.success,
                sortRequestAction: {
                    ...state.sortRequestAction,
                    page: 1,
                    returnedDate: action.payload.data,
                },
            };
        case 'SET_SEARCH_REQUEST':
            return {
                ...state,
                success: action.payload.success,
                sortRequestAction: {
                    ...state.sortRequestAction,
                    page: 1,
                    search: action.payload.data,
                },
            };
        case 'SET_FILTER_REQUEST':
            return {
                ...state,
                success: action.payload.success,
                sortRequestAction: {
                    ...state.sortRequestAction,
                    page: 1,
                    filterType: action.payload.data,
                },
            };
        case 'SET_SORT_REQUEST':
            return {
                ...state,
                sortRequestAction: {
                    ...state.sortRequestAction,
                    page: 1,
                    sortColumn: action.payload.sortColumn,
                    sortType: action.payload.sortType,
                },
            };
        case 'SET_FIRST_SHOW_REQUEST':
            return {
                ...state,
                success: action.payload.success,
                requestFirstShown: action.payload.data,
                sortRequestAction: {
                    page: 1,
                    sortColumn: 'asset_name', // (full_name, staff_code, joined_date, admin)
                    sortType: 2, // 1 (desc), 2(asc)
                    filterType: 'all', // (admin, staff, all)
                    search: null,
                    returnedDate: null,
                },
            };
        // DEFAULT
        case 'SET_DEFAULT_DISPLAY':
            let list = {};
            if (action.payload.typeDefault === 'user') {
                list = {
                    homeAssignmentFirstShown: {},
                    assetFirstShown: {},
                    assignmentFirstShow: {},
                };
            } else if (action.payload.typeDefault === 'asset') {
                list = {
                    homeAssignmentFirstShown: {},
                    userFirstShown: {},
                    assignmentFirstShow: {},
                };
            } else if (action.payload.typeDefault === 'assignment') {
                list = {
                    homeAssignmentFirstShown: {},
                    userFirstShown: {},
                    assetFirstShown: {},
                };
            } else if (action.payload.typeDefault === 'home') {
                list = {
                    assignmentFirstShow: {},
                    userFirstShown: {},
                    assetFirstShown: {},
                };
            } else {
                list = {
                    homeAssignmentFirstShown: {},
                    userFirstShown: {},
                    assetFirstShown: {},
                    assignmentFirstShow: {},
                };
            }

            return {
                ...state,
                success: action.payload.success,
                ...list,
                sortAction: {
                    page: 1,
                    sortColumn: '', // (full_name, staff_code, joined_date, admin)
                    sortType: 2, // 1 (desc), 2(asc)
                    filterType: 'all', // (admin, staff, all)
                    search: null,
                },
                sortAssignment: {
                    page: 1,
                    sortColumn: 'asset_name', // (full_name, staff_code, joined_date, admin)
                    sortType: 2, // 1 (desc), 2(asc)
                    filterType: 'all', // (admin, staff, all)
                    search: null,
                    assignedDate: null,
                },
                sortAssetAction: {
                    page: 1,
                    sortColumn: 'asset_name', // (asset_code, asset_name, category_name, asset_status_name)
                    sortType: 2, // 1 (desc), 2(asc)
                    filterState: 'all', // (id),
                    filterCategory: 'all', // (id)
                    search: null,
                    assignedDate: null,
                },
                sortRequestAction: {
                    page: 1,
                    sortColumn: 'asset_name', // (full_name, staff_code, joined_date, admin)
                    sortType: 2, // 1 (desc), 2(asc)
                    filterType: 'all', // (admin, staff, all)
                    search: null,
                    returnedDate: null,
                },
            };
        case 'SET_DEFAULT_FIRST_RECORD':
            return {
                ...state,
                userFirstShown: {},
                assetFirstShown: {},
                assignmentFirstShow: {},
                requestFirstShown: {},
            };
        default:
            return state;
    }
};

export default userReducer;
