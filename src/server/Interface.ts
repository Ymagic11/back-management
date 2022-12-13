import axios from 'axios'
import interceptorApi from './Interceptor'

const serve = axios.create({
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
    },
    baseURL:'http://47.108.28.179:3000'
})

export const register = function(data:any){
    let code = new Promise(resolve => {
        serve.request({
            method:'post',
            url:'/api/reguser',
            data:data
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const Login = function(data:any){
    let code = new Promise(resolve => {
        serve.request({
            method:'post',
            url:'/api/login',
            data:data
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const getuserInfo = function(data:any){
    const token = localStorage.getItem('token')
    let code = new Promise(resolve => {
        serve.request({
            method:'GET',
            url:'/my/userinfo',
            params:data,
            headers: {
                Authorization: token
              }
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const regbusiness = function(data:any){
    let code = new Promise(resolve => {
        serve.request({
            method:'post',
            url:'/api/regBuser',
            data:data
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const buslogin = function(data:any){
    let code = new Promise(resolve => {
        serve.request({
            method:'post',
            url:'/api/buslogin',
            data:data
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const getdata = function(){
    const token = localStorage.getItem('token')
    let code = new Promise(resolve => {
        serve.request({
            method:'GET',
            url:'/my/getdata',
            headers: {
                Authorization: token
              }
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const gettotal = function(){
    const token = localStorage.getItem('token')
    let code = new Promise(resolve => {
        serve.request({
            method:'GET',
            url:'/my/gettotal',
            headers: {
                Authorization: token
              }
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const changeavatar = function(data:any){
    const token = localStorage.getItem('token')
    let code = new Promise(resolve => {
        serve.request({
            method:'POST',
            url:'/my/update/pic',
            data:data,
            headers: {
                Authorization: token
              }
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const getBusInfo = function(data:any){
    const token = localStorage.getItem('token')
    let code = new Promise(resolve => {
        serve.request({
            method:'GET',
            url:'/my/getBusInfo',
            params:data,
            headers: {
                Authorization: token
              }
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const addgoods = function(data:any){
    const token = localStorage.getItem('token')
    let code = new Promise(resolve => {
            serve.request({
            method:'POST',
            url:'/goods/addgoods',
            data:data,
            headers: {
                Authorization: token,
              }
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const getfoodInfo = function(data:any){
    const token = localStorage.getItem('token')
    let code = new Promise(resolve => {
        serve.request({
            method:'GET',
            url:'/goods/getgoods',
            params:data,
            headers: {
                Authorization: token
              }
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

export const updatefood = function(data:any){
    const token = localStorage.getItem('token')
    let code = new Promise(resolve => {
        serve.request({
            method:'POST',
            url:'/goods/updatefood',
            data:data,
            headers: {
                Authorization: token
              }
        }).then(res => {
            resolve(interceptorApi(res.data))
        })
    })
        return code
}

