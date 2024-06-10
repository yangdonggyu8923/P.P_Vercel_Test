'use client';
import { useRouter } from "next/navigation"
import { useState } from "react";
import axios from 'axios'
import React from 'react';
import { NextPage } from "next";
import { PG } from "@/app/components/common/enums/PG";
import { MyTypography } from "@/app/components/common/style/cell";


const JoinPage: NextPage = () =>  {

  

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    law: "",
    lawyerNo: "",
    office: "",
    address: "",
  })

  const { username, password, name, phone, law, lawyerNo, office, address } = inputs;
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({
        ...inputs,
        [name]: value
      })
  }

  const options = [
    { value: '형사법', label: '형사법' },
    { value: '민사법', label: '민사법' },
    { value: '가사법', label: '가사법' },
    { value: '건설', label: '건설' },
    { value: '재개발·재건축', label: '재개발·재건축' },
    { value: '이혼', label: '이혼' },
    { value: '도산', label: '도산' },
];

  const router = useRouter();

  const handleSubmit = (e:any) => {
    e.preventDefault()
    const url = `${process.env.NEXT_PUBLIC_API_URL}/lawyers/save`
    const data = { username, password, name, phone, law, lawyerNo, office, address }
    const config = {
      headers:{
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
         Authorization: `Bearer blah ~` ,
        "Access-Control-Allow-Origin": "*",
    }}
    axios.post(url, data, config)
      .then(res => {
        alert("response가 가져온 ID : " + JSON.stringify(res.data))
        router.push(`${PG.LAWYER}/login`)
      })
  }


  return (<>
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      {MyTypography('변호사 회원가입', "1.5rem")}
      <div className="flex items-center mb-4">
      <label htmlFor="username" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>아이디</b></label>
      <input type="text" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}} placeholder="Enter Username" name="username" onChange={handleChange} value={username} required /><br />
      </div>

      <div className="flex items-center mb-4">
      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>비밀번호</b></label>
      <input type="password" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}  placeholder="Enter Password" name="password" onChange={handleChange} value={password} required /><br />
      </div>
      
      <div className="flex items-center mb-4">
      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>이름</b></label>
      <input type="text" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}  placeholder="Enter Name" name="name" onChange={handleChange} value={name} required /><br />
      </div>

      <div className="flex items-center mb-4">
      <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>전화번호</b></label>
      <input type="text" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}  placeholder="Enter Phone" name="phone" onChange={handleChange} value={phone} required /><br />
      </div>

      <div className="flex items-center mb-4">
      <label htmlFor="law" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>담당분야</b></label>
      {/* <input type="text" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}  placeholder="Enter Law" name="law" onChange={handleChange} value={law} required /><br /> */}
      <select 
    className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{ flexBasis: 0, flexGrow: 1 }} onChange={handleChange} value={law} name="law">
    <option value="" >담당분야를 선택하세요</option>
    {options.map((option) => (
        <option  key={option.value} value={option.value}>{option.label}</option>
        
    ))}
</select>
      </div>

      <div className="flex items-center mb-4">
      <label htmlFor="lawyerNo" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>자격번호</b></label>
      <input type="text" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}  placeholder="-를 제외한 8자리 자격번호" name="lawyerNo" onChange={handleChange} value={lawyerNo} required /><br />
      </div>

      <div className="flex items-center mb-4">
      <label htmlFor="office" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>사무소</b></label>
      <input type="text" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}  placeholder="사무소 없을 경우 공백" name="office" onChange={handleChange} value={office} /><br />
      </div>

      <div className="flex items-center mb-4">
      <label htmlFor="address" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>주소</b></label>
      <input type="text" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}  placeholder="주소 없을 경우 공백" name="address" onChange={handleChange} value={address} /><br />
      </div>
     
    
      <div className="buttons flex space-x-4">
        <button className="btn bg-blue-500 text-white py-2 px-4 rounded-xl font-bold uppercase hover:bg-blue-600 transition-colors duration-300" onClick={handleSubmit}>회원가입</button>
      </div>
    </div>
  </>);
}



export default JoinPage;