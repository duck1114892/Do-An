export const checkUser = (data) => {
    return {
        type: 'CHECK_USER',
        payload: data
    }
}
export const remainAccess = (username) => {
    return {
        type: 'REMAIN_USER',
        payload: username
    }
}
export const logoutredux = () => {
    return {
        type: 'LOG_OUT',
    }
}
export const getTotal = (total) => {
    return {
        type: 'TOTAL',
        payload: total
    }
}
export const searchValue = (value) => {
    return {
        type: 'SEARCH',
        payload: value
    }
}