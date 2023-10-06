const initialState = {
    isLogin: false,
    status: 'idle',
    price: '0',
    search: '',
    user:
    {
        "email": "",
        "password": "",
        "phone": "",
        "role": "",
        "username": "",
    }

};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECK_USER':
            console.log('this is action', action)
            localStorage.setItem('username', action.payload.username)
            localStorage.setItem('email', action.payload.email)
            localStorage.setItem('role', action.payload.role)
            return { ...state, isLogin: true, user: action.payload }
        case 'REMAIN_USER':
            return { ...state, isLogin: true, user: { ...state.user, username: action.payload.username, phone: action.payload.phone, email: action.payload.email, } }
        case 'LOG_OUT':
            return {
                isLogin: false,
                status: 'idle',
                price: 0,
                user:
                {
                    "email": "",
                    "password": "",
                    "phone": "",
                    "role": "",
                    "username": "",
                }
            }
        case 'TOTAL':
            console.log(state.price)
            return {
                ...state, isLogin: true, price: action.payload
            }
        case 'SEARCH':
            console.log(state.search)
            return {
                ...state, search: action.payload
            }
        default: return state
    }


}
export default rootReducer