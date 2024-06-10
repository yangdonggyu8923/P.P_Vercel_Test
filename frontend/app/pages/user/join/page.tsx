'use client';
import { useRouter } from "next/navigation"
import { useState } from "react";
import axios from 'axios'
import React from 'react';
import { API } from "@/app/components/common/enums/API";
import AxiosConfig from "@/app/components/common/configs/axios-config";
import { PG } from "@/app/components/common/enums/PG";
import { NextPage } from "next";
import { MyTypography } from "@/app/components/common/style/cell";


const JoinPage: NextPage = () =>  {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
  })

  const { username, password, name, phone } = inputs;
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
        ...inputs,
        [name]: value
      })
  }

  const router = useRouter();

  const handleSubmit = (e:any) => {
    e.preventDefault()
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/save`
    const data = { username, password, name, phone }
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
        router.push("http://localhost:3000/")
      })
  }


  return (<>
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      {MyTypography('회원가입', "1.5rem")}
      <div className="flex items-center mb-4">
      <label htmlFor="username" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>아이디</b></label>
      <input type="text" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}placeholder="Enter Username" name="username" onChange={handleChange} value={username} required /><br />
      </div>

      <div className="flex items-center mb-4">
      <label htmlFor="password" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>비밀번호</b></label>
      <input type="password" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}} placeholder="Enter Password" name="password" onChange={handleChange} value={password} required /><br />
      </div>

      <div className="flex items-center mb-4">
      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>이름</b></label>
      <input type="text" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}placeholder="Enter Name" name="name" onChange={handleChange} value={name} required /><br />
      </div>

      <div className="flex items-center mb-4">
      <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mr-2 flex-none" style={{width: '100px'}}><b>전화번호</b></label>
      <input type="text" className="bg-gray-100 border border-gray-300 p-2 flex-grow" style={{flexBasis: 0, flexGrow: 1}}placeholder="Enter Phone Number" name="phone" onChange={handleChange} value={phone} required /><br />
      </div>
     
    
      <div className="buttons flex space-x-4">
        <button className="btn bg-blue-500 text-white py-2 px-4 rounded-xl font-bold uppercase hover:bg-blue-600 transition-colors duration-300" onClick={handleSubmit}>회원가입</button>
      </div>
    </div>
  </>);
}



export default JoinPage;