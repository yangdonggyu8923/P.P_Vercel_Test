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
import { getOneLawyer } from "@/app/components/lawyer/service/lawyer-slice";
import { ILawyers } from "@/app/components/lawyer/model/lawyers-model";
import { deleteLawyerById, findLawyerById, updateLawyer } from "@/app/components/lawyer/service/lawyer-service";
import Select from "react-select/base";


const UpdateLaywerPage:NextPage = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();
  const dispatch = useDispatch()
  const router = useRouter()
  const oneLawyer:ILawyers = useSelector(getOneLawyer)
  const token:string|null = parseCookies().accessToken;

  const initialSelectedLaws = oneLawyer.law ? oneLawyer.law.split(',') : [];

  const options = [
    { value: '형사법', label: '형사법' },
    { value: '민사법', label: '민사법' },
    { value: '가사법', label: '가사법' },
    { value: '건설', label: '건설' },
    { value: '재개발·재건축', label: '재개발·재건축' },
    { value: '이혼', label: '이혼' },
    { value: '도산', label: '도산' },
];


const handleDeleteLawyer = () =>{
    alert('탈퇴 완료.')
    destroyCookie(null, 'accessToken')
    dispatch(deleteLawyerById(token? jwtDecode<any>(token).lawyerId:0))
    router.push("/")
}
  const handelCancel = () => {
    alert('수정을 취소합니다.')
    router.push(`${PG.LAWYER}/list`)}

  const onSubmit = (data:any) => {
    data.id = jwtDecode<any>(token).lawyerId
    alert(JSON.stringify(data))
    dispatch(updateLawyer(data))
    .then((res:any)=>{
      alert('수정 완료')
      console.log('서버에서 넘어온 메신저 : ' + res.payload.id)
    //   router.push(`${PG.LAWYER}/list`)
      location.reload()
    })
    .catch((err:any)=>{})  
  }

  useEffect(()=>{
    dispatch(findLawyerById(token? jwtDecode<any>(token).lawyerId:0))
    console.log('토큰을 디코드한 내용 : ')
              console.log(JSON.stringify(jwtDecode<any>(parseCookies().accessToken)))
              console.log('토큰을 디코드한 ID : ')
              console.log(jwtDecode<any>(parseCookies().accessToken).lawyerId)
  }, [])

  

  return(<>

<form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        {MyTypography('변호사페이지', "1.5rem")}
        <input type="hidden" value={jwtDecode<any>(parseCookies().accessToken).id} readOnly />

        <div className="flex items-center mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
                아이디
            </label>
            <input defaultValue={jwtDecode<any>(parseCookies().accessToken).username} className="bg-gray-300 border border-gray-300 p-2 flex-grow" style={{ flexBasis: 0, flexGrow: 1, cursor: 'default' }} type="text" name="username" readOnly/>
        </div>

        <div className="flex items-center mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
                이름
            </label>
            <input defaultValue={oneLawyer.name} className="bg-gray-300 border border-gray-300 p-2 flex-grow" style={{ flexBasis: 0, flexGrow: 1, cursor: 'default' }} type="text" name="name" readOnly/>
        </div>

        <div className="flex items-center mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
                비밀번호
            </label>
            <input {...register('password', { required: true, maxLength: 40 })} 
                className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{ flexBasis: 0, flexGrow: 1 }} placeholder={oneLawyer.password} defaultValue={oneLawyer.password} type="text" name="password"/>
        </div>

    
    <div className="flex items-center mb-4">
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
            전화번호
        </label>
        <input {...register('phone', {required: true, maxLength:40})} 
        className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}} placeholder={oneLawyer.phone} defaultValue={oneLawyer.phone} type="text" name="phone"/>
    </div>


    {/* <div className="flex items-center mb-4">
                    <label htmlFor="law" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
                        담당분야1
                    </label>
                    <div className="flex-grow" style={{ flexBasis: 0, flexGrow: 1 }}>
                        {options.map((option) => (
                            <div key={option.value} className="flex items-center mb-2">
                                <input 
                                    type="checkbox" 
                                    value={option.value} 
                                    {...register('law', { required: true })}
                                    defaultChecked={initialSelectedLaws.includes(option.value)}
                                    className="mr-2"
                                />
                                <label htmlFor="law" className="text-gray-700 text-sm">{option.label}</label>
                            </div>
                        ))}
                    </div>
                </div> */}

    <div className="flex items-center mb-4">
        <label htmlFor="law" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
            담당분야
        </label>
        <select {...register('law', { required: true })} 
    className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{ flexBasis: 0, flexGrow: 1 }}>
    <option value="" >담당분야를 선택하세요</option>
    {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
    ))}
</select>
        {/* <input {...register('law', {required: true, maxLength:40})} 
        className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}} placeholder={oneLawyer.law} defaultValue={oneLawyer.law} type="text" name="law"/> */}
    
    </div>

    <div className="flex items-center mb-4">
    <label htmlFor="lawyerNo" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{ width: '100px' }}>
        자격번호
    </label>
    <input defaultValue={oneLawyer.lawyerNo} className="bg-gray-300 border border-gray-300 p-2 flex-grow" style={{ flexBasis: 0, flexGrow: 1, cursor: 'default' }} type="text" name="lawyerNo" readOnly/>
    </div>

    <div className="flex items-center mb-4">
        <label htmlFor="office" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
            사무소
        </label>
        <input {...register('office', {required: false, maxLength:40})} 
        className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}} placeholder={oneLawyer.office} defaultValue={oneLawyer.office} type="text" name="office"/>
    </div>

    <div className="flex items-center mb-4">
        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}>
            주소
        </label>
        <input {...register('address', {required: false, maxLength:40})} 
        className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}} placeholder={oneLawyer.address} defaultValue={oneLawyer.address} type="text" name="address"/>
    </div>

    


    <div className="buttons flex space-x-4">
    <button className="btn bg-blue-500 text-white py-2 px-4 rounded-xl font-bold uppercase hover:bg-blue-600 transition-colors duration-300" type="submit">수정</button>
    
      <div className="btn bg-blue-500 text-white py-2 px-4 rounded-xl font-bold uppercase hover:bg-blue-600 transition-colors duration-300"
        onClick={handleDeleteLawyer}>탈퇴</div>
  
      <div className="btn bg-blue-500 text-white py-2 px-4 rounded-xl font-bold uppercase hover:bg-blue-600 transition-colors duration-300"
        onClick={handelCancel}>취소</div>
    </div>
  </div>
  </form>
  </>)
}
export default UpdateLaywerPage