'use client'
import { PG } from "@/app/components/common/enums/PG";
import { MyTypography } from "@/app/components/common/style/cell";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"
import { NextPage } from "next";
import { jwtDecode } from "jwt-decode";
import { destroyCookie, parseCookies } from "nookies";
import { deleteUserById, findUserById, updateUser } from "@/app/components/user/service/user-service";
import { IUsers } from "@/app/components/user/model/users-model";
import { getOneUser } from "@/app/components/user/service/user-slice";


const UpdateUserPage:NextPage = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();
  const dispatch = useDispatch()
  const router = useRouter()
  const oneUser:IUsers = useSelector(getOneUser)
  const token:string|null = parseCookies().accessToken;


const handleDeleteUser = () =>{
    alert('탈퇴 완료.')
    destroyCookie(null, 'accessToken')
    dispatch(deleteUserById(token? jwtDecode<any>(token).userId:0))
    router.push("/")
}
  const handelCancel = () => {
    alert('수정을 취소합니다.')
    router.push(`${PG.USER}/list`)}

  const onSubmit = (data:any) => {
    data.id = jwtDecode<any>(token).userId
    alert(JSON.stringify(data))
    dispatch(updateUser(data))
    .then((res:any)=>{
      alert('수정 완료')
      console.log('서버에서 넘어온 메신저 : ' + res.payload.id)
      // router.push(`${PG.USER}/list`)
      location.reload()
    })
    .catch((err:any)=>{})  
  }

  useEffect(()=>{
    dispatch(findUserById(token? jwtDecode<any>(token).userId:0))
    console.log('토큰을 디코드한 내용 : ')
              console.log(JSON.stringify(jwtDecode<any>(parseCookies().accessToken)))
              console.log('토큰을 디코드한 ID : ')
              console.log(jwtDecode<any>(parseCookies().accessToken).id)
  }, [])


  return(<>

<form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
{/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">회원정보수정</label> */}


<div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    {MyTypography('마이페이지', "1.5rem")}
    <input type="hidden" value={jwtDecode<any>(parseCookies().accessToken).id} readOnly />

    <div className="flex items-center mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
            아이디
        </label>
        <div className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}>
        {jwtDecode<any>(parseCookies().accessToken).username}
        </div>
    </div>
    
    <div className="flex items-center mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
            이름
        </label>
        <div className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}>
        {oneUser.name}
        </div>
    </div>

    <div className="flex items-center mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
            비밀번호
        </label>
        <input {...register('password', {required: true, maxLength:40})} 
        className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}} placeholder={oneUser.password} type="text" name="password"/>
    </div>
    
    <div className="flex items-center mb-4">
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
            전화번호
        </label>
        <input {...register('phone', {required: true, maxLength:40})} 
        className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}} placeholder={oneUser.phone} type="text" name="phone"/>
    </div>


    <div className="buttons flex space-x-4">
    <button className="btn bg-blue-500 text-white py-2 px-4 rounded-xl font-bold uppercase hover:bg-blue-600 transition-colors duration-300" type="submit">수정</button>
    
      <div className="btn bg-blue-500 text-white py-2 px-4 rounded-xl font-bold uppercase hover:bg-blue-600 transition-colors duration-300"
        onClick={handleDeleteUser}>탈퇴</div>
  
      <div className="btn bg-blue-500 text-white py-2 px-4 rounded-xl font-bold uppercase hover:bg-blue-600 transition-colors duration-300"
        onClick={handelCancel}>취소</div>
    </div>
  </div>
  </form>
  </>)
}
export default UpdateUserPage