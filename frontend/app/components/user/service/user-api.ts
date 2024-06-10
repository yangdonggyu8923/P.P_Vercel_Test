import instance from "@/app/components/common/configs/axios-config"
import { IUsers } from "../model/users-model"

export const findAllUsersAPI = async (page: number) => {
    try {
        const response = await instance().get('/users/list', {
            params: { page, size: 10, limit: 10 }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const findUserByIdAPI = async (id: number) => {
    try {
        const response = await instance().get('/users/detail', {
            params: { id }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const modifyUserAPI = async (user: IUsers) => {
    try {
        const response = (await instance().put('/users/modify', user))
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const countUserAPI = async () => {
    try {
        const response = await instance().get('/users/count', {
            params: {}
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteUserByIdAPI = async (id: number) => {
    try {
        const response = await instance().delete('/users/delete', {
            params: { id }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const loginUserAPI = async (user: IUsers) => {
    console.log(` 로그인API 에 넘어온 파라미터 : ${JSON.stringify(user)}`)
    try{
        const response = await instance().post(`/auth/login`,user)
        // Java 에서 Messenger.message 에 값을 담음
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const existsIdAPI = async (username: string) => {
    try {
        const response = await instance().get('/auth/exists-username',
            { params: { username } })
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const logoutUserAPI = async () => {
    try {
        const response = await instance().get('/users/logout')
        console.log('logoutAPI 결과 : '+ response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const saveUserAPI = async (user: IUsers) => {
    try {
        const response = await instance().post('/users/save', user)
        console.log('saveAPI 결과 : '+ response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const updateUserAPI = async (user: IUsers) => {
    try {
        const response = await instance().post('/users/update', user)
        console.log('updateAPI 결과 : '+ response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

