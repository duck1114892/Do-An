
import { current } from "@reduxjs/toolkit";
import axios from "../utils/axios";
export const callBook = () => {
    return axios.get('/api/products.php')
}
export const callBookDetails = (id) => {
    return axios.post('/api/detailsProduct.php', { id })
}
export const callLogin = (username, password) => {
    return axios.post('/api/login.php', { username, password })
}
export const callSignUp = (username, password, email, phone) => {
    return axios.post('/api/signUp.php', { username, password, email, phone })
}
export const callRemainLogin = (access_token) => {
    return axios.post('/api/remainLogin.php', { access_token })
}
export const callLogOut = () => {
    return axios.get('/api/logOut.php')
}
export const callOrders = (name, email, product_id, price, quantity, category, address) => {
    return axios.post('/api/orders.php', { name, email, product_id, price, quantity, category, address })
}
export const callAddCart = (username, email, name, product_id, price, img, quantity, category) => {
    return axios.post('/api/addCart.php', { username, email, name, product_id, price, img, quantity, category })
}
export const callGetCart = (username) => {
    return axios.post('/api/getCart.php', { username })
}
export const callDeleteCart = (id) => {
    return axios.post('/api/removeCart.php', { id })
}
export const callAddCartDb = (username, address) => {
    return axios.post('/api/addCartOnDB.php', { username, address })
}
export const callOrdering = (username) => {
    return axios.post('/api/ordering.php', { username })
}
export const callDeleteOrder = (id) => {
    return axios.post('/api/removeOrdering.php', { id })
}
export const callSearch = (name) => {
    return axios.post('/api/searchForByName.php', { name })
}
export const callUser = () => {
    return axios.get('/api/users.php')
}
export const callAddBook = (id, name, price, description, amount, img_name, path, type) => {
    return axios.post('/api/products.php', { id, name, price, description, amount, img_name, path, type })
}
export const callDeleteBook = (id) => {
    return axios.delete('/api/products.php', { data: { id } })
}
export const callOrder = (username) => {
    return axios.post('/api/ordering1.php', { username })
}
export const callConfirm = () => {
    return axios.get('/api/ordering2.php')
}
export const callChageStatus = (id) => {
    return axios.post('/api/changeState.php', { id })
}
export const callUpdateOder = (id, deliver, deliveryDate, expectedDateOfReceipt) => {
    return axios.post('/api/updateOrder.php', { id, deliver, deliveryDate, expectedDateOfReceipt })
}
export const callExpressing = () => {
    return axios.get('/api/ordering3.php')
}
export const callPanagication = (currentPage) => {
    return axios.post('/api/Pagination-Products.php', { currentPage })
}
export const callDetailProduct = () => {
    return axios.get('/api/Revenue.php')
}