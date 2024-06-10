import { createSlice } from "@reduxjs/toolkit";
import { countUsers, deleteUserById, existsId, findAllUsers, findUserById, loginUser, modifyUser, saveUser, updateUser } from "./user-service";
import { IUsers } from "../model/users-model";

const userThunks = [findAllUsers]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

interface IAuth {
    message?: boolean,
    token?: string
}

interface UserState {
    json?: IUsers,
    array?: Array<IUsers>,
    auth?: IAuth,

}

export const initialState: UserState = {
    json: {} as IUsers, 
    array: [],
    auth: {} as IAuth,

}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        handlePassword: (state: any, { payload }) => { state.json.password = payload },
        handlePhone: (state: any, { payload }) => { state.json.phone = payload },
        handleJob: (state: any, { payload }) => { state.json.job = payload },
    },
    extraReducers: builder => {
        const { pending, rejected } = status;

        builder
            .addCase(findAllUsers.fulfilled, (state: any, { payload }: any) => { state.array = payload })
            .addCase(findUserById.fulfilled, (state: any, { payload }: any) => { state.json = payload })
            .addCase(countUsers.fulfilled, (state: any, { payload }: any) => { state.count = payload })
            .addCase(modifyUser.fulfilled, (state: any, { payload }: any) => { state.json = payload })
            .addCase(deleteUserById.fulfilled, (state: any, { payload }: any) => { state.json = payload })
            .addCase(loginUser.fulfilled, (state: any, { payload }: any) => { state.auth = payload })
            .addCase(existsId.fulfilled, (state: any, { payload }: any) => { state.json = payload })
            .addCase(saveUser.fulfilled, (state: any, { payload }: any) => { state.json = payload })
            .addCase(updateUser.fulfilled, (state: any, { payload }: any) => { state.json = payload })
    }
})

export const getAllUsers = (state: any) => {
    console.log('-- Before useSelector --')
    console.log(JSON.stringify(state.user.array))
    return state.user.array;
}
export const getOneUser = (state: any) => (state.user.json)
export const getCountUsers = (state: any) => (state.user.count)
export const deleteOneUser = (state: any) => (state.user.json)
export const getAuth = (state: any) => {
    console.log(JSON.stringify(state.user.auth))
    return state.user.auth
}
export const existsUser = (state: any) => {
    console.log(JSON.stringify(state.user.json))
    return state.user.json
}

export const { handlePassword, handleJob, handlePhone } = userSlice.actions

export default userSlice.reducer;