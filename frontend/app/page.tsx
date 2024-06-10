'use client';
import { useEffect, useRef, useState } from "react";
import axios from 'axios'
import Link from "next/link";
import AxiosConfig from "./components/common/configs/axios-config";
import { useRouter } from "next/navigation";
import { PG } from "./components/common/enums/PG";
import instance from "@/app/components/common/configs/axios-config"
import { useDispatch, useSelector } from "react-redux";
import { IUsers } from "./components/user/model/users-model";
import { existsId, loginUser } from "./components/user/service/user-service";
import { getAuth, existsUser } from "./components/user/service/user-slice";
import { parseCookies, destroyCookie, setCookie } from "nookies"
import { jwtDecode } from "jwt-decode";


const LoginPage = () => {
  const dispatch = useDispatch()
  const auth = useSelector(getAuth)
  const message: boolean = useSelector(existsUser)
  const passwordRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState({} as IUsers)
  const [isWrongId, setIsWrongId] = useState(false)
  const [isWrongPw, setIsWrongPw] = useState(false)

  const handleUsername = (e: any) => {
    const ID_CHECK = /^[a-zA-Z0-9][a-zA-Z0-9]{5,19}$/g;
    // 영어 대소문자로 시작하는 6 ~ 20자의 영어 소문자 또는 숫자
    if (ID_CHECK.test(e.target.value)) {
      setIsWrongId(false)
    } else if (e.target.value == "") {
      setIsWrongId(false)
    } else {
      setIsWrongId(true)
    }
    setUser({
      ...user,
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
    setUser({
      ...user,
      password: e.target.value
    })
  }

  const router = useRouter();

  const handleSubmit = () => {
    console.log('user ... ' + JSON.stringify(user))
    dispatch(existsId(user.username))
      .then((res: any) => {
        if (res.payload == true) {
          dispatch((loginUser(user)))
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
              router.push(`${PG.USER}/list`)
              location.replace(`${PG.USER}/list`);
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
      <div className="w-full p-8">
        <p className="text-xl text-gray-600 text-center">Welcome!</p>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID
          </label>
          <input
            onChange={handleUsername}
            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
            type="email"
            required
          />
        </div>
        {isWrongId && (<pre>
          <h6 className="text-red-600">잘못된 아이디입니다.</h6>
        </pre>)}
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
        <div className="mt-4 flex items-center w-full text-center">
          <Link
            href={`${PG.USER}/join`}
            className="text-xs text-gray-500 capitalize text-center w-full">
            <span className="text-blue-700"> 회원가입 </span>
          </Link>
        </div>
        <div className="mt-4 flex items-center w-full text-center">
          <Link
            href={`${PG.LAWYER}/login`}
            className="text-xs text-gray-500 capitalize text-center w-full"
          >
            변호사인가요?
            <span className="text-blue-700"> 변호사 로그인</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}
export default LoginPage;