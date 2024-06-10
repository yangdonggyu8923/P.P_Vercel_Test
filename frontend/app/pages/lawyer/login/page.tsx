'use client';
import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import Link from "next/link";
import { useRouter } from "next/navigation";

import instance from "@/app/components/common/configs/axios-config"
import { useDispatch, useSelector } from "react-redux";

import { parseCookies, destroyCookie, setCookie } from "nookies"
import { jwtDecode } from "jwt-decode";
import { getAuth } from "@/app/components/user/service/user-slice";
import { existsLawyer } from "@/app/components/lawyer/service/lawyer-slice";
import { ILawyers } from "@/app/components/lawyer/model/lawyers-model";
import { existsId, loginLawyer } from "@/app/components/lawyer/service/lawyer-service";
import { PG } from "@/app/components/common/enums/PG";


const LawyerLoginPage = () => {
  const dispatch = useDispatch()
  const auth = useSelector(getAuth)
  const message: boolean = useSelector(existsLawyer)
  const passwordRef = useRef<HTMLInputElement>(null);

  const [lawyer, setLawyer] = useState({} as ILawyers)
  const [isWrongId, setIsWrongId] = useState(false)
  const [isWrongPw, setIsWrongPw] = useState(false)

  const handleLawyername = (e: any) => {
    const ID_CHECK = /^[a-zA-Z0-9][a-zA-Z0-9]{5,19}$/g;
    // 영어 대소문자로 시작하는 6 ~ 20자의 영어 소문자 또는 숫자
    if (ID_CHECK.test(e.target.value)) {
      setIsWrongId(false)
    } else if (e.target.value == "") {
      setIsWrongId(false)
    } else {
      setIsWrongId(true)
    }
    setLawyer({
      ...lawyer,
      username: e.target.value
    })
  }
  const handlePassword = (e: any) => {
    const PW_CHECK = /^[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{8,20}$/g;
    // 6 ~ 20자의 영어 대소문자 또는 숫자 또는 특수문자
    if (PW_CHECK.test(e.target.value)) {
      setIsWrongPw(false)
    } else if (e.target.value == null) {
      setIsWrongPw(false)
    } else {
      setIsWrongPw(true)
    }
    setLawyer({
      ...lawyer,
      password: e.target.value
    })
  }

  const router = useRouter();

  const handleSubmit = () => {
    console.log('lawyer ... ' + JSON.stringify(lawyer))
    dispatch(existsId(lawyer.username))
      .then((res: any) => {
        if (res.payload == true) {
          dispatch((loginLawyer(lawyer))) 
            .then((resp: any) => {
              console.log('서버에서 넘어온 RES : ' + JSON.stringify(resp))
              console.log('서버에서 넘어온 메시지 1 : ' + resp.payload.message)
              console.log('서버에서 넘어온 토큰 1 : ' + resp.payload.accessToken)
              setCookie({}, 'message', resp.payload.message, { httpOnly: false, path: '/' })
              setCookie({}, 'accessToken', resp.payload.accessToken, { httpOnly: false, path: '/' })
              console.log('서버에서 넘어온 메시지 2 : ' + parseCookies().message)
              console.log('서버에서 넘어온 토큰 2 : ' + parseCookies().accessToken)
              console.log('jwtDecode(토큰) 디코드 : ')
              console.log(jwtDecode<any>(parseCookies().accessToken))
              // router.push(`${PG.LAWYER}/list`)
              location.replace(`${PG.LAWYER}/list`);
            })
            .catch((err: any) => {
              console.log('로그인 실패' + err)
            })
        } else {
          console.log('아이디가 존재하지 않습니다')
          setIsWrongId(false)
          setIsWrongPw(false)
        }

      })
      .catch((err: any) => {
        console.log('catch 로직 err 발생 : '+ `${err}`)
      })
      .finally(() => {
        console.log('최종적으로 반드시 이뤄져야 할 로직')
      })
    setIsWrongId(false)
    setIsWrongPw(false)
    if (passwordRef.current) {
      passwordRef.current.value = "";
    }
  }

  // useEffect(() => {
  //   if (auth.message === 'SUCCESS') {
  //     setCookie({}, 'message', auth.message, { httpOnly: false, path: '/' })
  //     setCookie({}, 'token', auth.token, { httpOnly: false, path: '/' })
  //     console.log('서버에서 넘어온 메시지 : ' + parseCookies().message)
  //     console.log('서버에서 넘어온 토큰 : ' + parseCookies().token)
  //     console.log('jwtDecode(토큰) : ' + jwtDecode<any>(parseCookies().token))
  //     router.push(`${PG.BOARD}/list`)
  //   }
  //   else {
  //     console.log('FAILURE')
  //     router.replace
  //   }
  // }, [auth])


  return (<div className="h-[70vh] flex items-center justify-center">
    <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-l w-full m-auto">
      {/* <div
        className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
        style={{
          backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/lawyerlogin/login_tailwindtap.jpg)`,
        }}
      ></div> */}
      <div className="w-full p-8">
        <p className="text-xl text-gray-600 text-center">변호사 로그인</p>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID
          </label>
          <input
            onChange={handleLawyername}
            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
            type="email"
            required
          />
        </div>
        {isWrongId && (<pre>
          <h6 className="text-red-600">잘못된 아이디입니다.</h6>
        </pre>)}
        {/* {message && (<pre>
        <h6 className="text-green-600">존재하는 아이디입니다.</h6>
      </pre>)} */}
        {!message && (<pre>
          <h6 className="text-red-600">없는 아이디입니다.</h6>
        </pre>)}
        <div className="mt-4 flex flex-col justify-between">
          <div className="flex justify-between">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
          </div>
          <input
            ref={passwordRef}
            onChange={handlePassword}
            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
            type="password"
          />
          {isWrongPw && (<pre>
            <h6 className="text-red-600">잘못된 비밀번호입니다.</h6>
          </pre>)}
          {/* {message && (<pre>
        <h6 className="text-green-600">존재하는 비밀번호입니다.</h6>
      </pre>)} */}
          {!message && (<pre>
            <h6 className="text-red-600">없는 비밀번호입니다.</h6>
          </pre>)}
          <a
            href="#"
            className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
          >
            {/* Forget Password? */}
          </a>
        </div>
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
            로그인
          </button>
        </div>
        {/* <a
          href="#"
          className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
        >
          <div className="flex px-5 justify-center w-full py-3">
            <div className="min-w-[30px]">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <div className="flex w-full justify-center">
              <h1 className="whitespace-nowrap text-gray-600 font-bold">
                Sign in with Google
              </h1>
            </div>
          </div>
        </a> */}
        
        <div className="mt-4 flex items-center w-full text-center">
          <Link
            href={`${PG.LAWYER}/save`}
            className="text-xs text-gray-500 capitalize text-center w-full"
            >
    
            <span className="text-blue-700"> 변호사 회원가입</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}
export default LawyerLoginPage;