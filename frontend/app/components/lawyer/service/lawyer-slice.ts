import { createSlice } from "@reduxjs/toolkit";
import { ILawyers } from "../model/lawyers-model";
import { countLawyers, crawlingLawyers, deleteLawyerById, existsId, findAllLawyers, findLawyerById, loginLawyer, modifyLawyer, updateLawyer } from "./lawyer-service";

const lawyerThunks = [findAllLawyers]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

interface IAuth {
    message?: boolean,
    token?: string
}

interface LawyerState {
    json?: ILawyers,
    array?: Array<ILawyers>,
    auth?: IAuth,

}

export const initialState: LawyerState = {
    json: {} as ILawyers, 
    array: [],
    auth: {} as IAuth,

}

export const lawyerSlice = createSlice({
    name: "lawyers",
    initialState,
    reducers: {
        handleSample: (state:any, {payload}) => {state.json.lawyerNo= payload},
        handlePassword: (state: any, { payload }) => { state.json.password = payload },
        handleLaw: (state: any, { payload }) => { state.json.law = payload }
    },
    extraReducers: builder => {
        const { pending, rejected } = status;

        builder
        .addCase(crawlingLawyers.fulfilled, (state: any, { payload }: any) => { state.array = payload })
        .addCase(findAllLawyers.fulfilled, (state: any, { payload }: any) => { state.array = payload })
        .addCase(findLawyerById.fulfilled, (state: any, { payload }: any) => { state.json = payload })
        .addCase(countLawyers.fulfilled, (state: any, { payload }: any) => { state.count = payload })
        .addCase(loginLawyer.fulfilled, (state: any, { payload }: any) => { state.auth = payload })
        .addCase(modifyLawyer.fulfilled, (state: any, { payload }: any) => { state.json = payload })
        .addCase(deleteLawyerById.fulfilled, (state: any, { payload }: any) => { state.json = payload })
        .addCase(existsId.fulfilled, (state: any, { payload }: any) => { state.json = payload })
        .addCase(updateLawyer.fulfilled, (state: any, { payload }: any) => { state.json = payload })      
    }
})

export const getAllLawyers = (state: any) => {
    console.log('-- Before useSelector --')
    console.log(JSON.stringify(state.lawyer.array))
    return state.lawyer.array;
}
export const getAuth = (state: any) => {
    console.log(JSON.stringify(state.lawyer.auth))
    return state.lawyer.auth
}
export const crawling = (state:any) => (state.lawyer.array)
export const getOneLawyer = (state: any) => (state.lawyer.json)
export const getCountLawyers = (state: any) => (state.lawyer.count)
export const deleteOneLawyer = (state: any) => (state.lawyer.json)
export const existsLawyer = (state: any) => {
    console.log(JSON.stringify(state.lawyer.json))
    return state.lawyer.json
}

export const { handleLaw, handlePassword, handleSample } = lawyerSlice.actions

export default lawyerSlice.reducer; // 위는 각각의 reducers 여기선 다 합쳐져서 s가 사라진다.