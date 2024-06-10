import { createAsyncThunk } from "@reduxjs/toolkit";
import { countLawyerAPI, crawlingLawyersAPI, deleteLawyerByIdAPI, existsIdAPI, findAllLawyersAPI, findLawyerByIdAPI, loginLawyerAPI, logoutLawyerAPI, modifyLawyerAPI, updateLawyerAPI } from "./lawyer-api";
import { ILawyers } from "../model/lawyers-model";

export const findAllLawyers: any = createAsyncThunk(
    'lawyers/findAllLawyers',
    async (page:number)=>{
        console.log('findAllUsers page : ' + page)
        const data:any = await findAllLawyersAPI(1);
        const {message, result}: any =data;
        console.log('----- API를 사용한 경우 ------')
        console.log('message : ' + message)
        console.log(JSON.stringify(result))
        return data
    }
)

export const crawlingLawyers: any = createAsyncThunk(
    'lawyers/crawlingLawyers',
    async (lawyer: ILawyers) => {
        console.log('crawlingLawyers : ' + lawyer)
        const data: any = await crawlingLawyersAPI(lawyer);
        return data
    }
)


// 아래 미구현
export const findLawyerById: any = createAsyncThunk(
    'lawyers/findLawyerById',
    async (id: number) => {
        const data: any = await findLawyerByIdAPI(id);
        return data
    }
)

export const modifyLawyer: any = createAsyncThunk(
    'lawyers/modifyLawyer',
    async (lawyer: ILawyers) => {
        const data: any = await modifyLawyerAPI(lawyer);
        return data
    }
)

export const countLawyers: any = createAsyncThunk(
    'lawyers/countLawyer',
    async () => {
        const data: any = await countLawyerAPI();
        return data
    }
)

export const deleteLawyerById: any = createAsyncThunk(
    'lawyers/deleteLawyerById',
    async (id:number) => {
        const data: any = await deleteLawyerByIdAPI(id);
        return data
    }
)

export const loginLawyer: any = createAsyncThunk(
    'lawyers/loginLawyer',
    async (lawyer: ILawyers) => {
        const data: any = await loginLawyerAPI(lawyer);
        return data
    }
)

export const existsId: any = createAsyncThunk(
    'lawyers/existsId',
    async (username: string) => {
        const data: any = await existsIdAPI(username);
        return data
    }
)

export const logoutLawyer: any = createAsyncThunk(
    'lawyers/logoutLawyer',
    async () => await logoutLawyerAPI()
)

export const updateLawyer: any = createAsyncThunk(
    'lawyers/updateLawyer',
    async (lawyer: ILawyers) => await updateLawyerAPI(lawyer)
)