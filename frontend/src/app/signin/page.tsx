'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useGoogleLogin } from '@react-oauth/google'

type UserProp = {
  name: string
  picture: string
}

const Signin = () => {
  const [user, setUser] = useState<UserProp>({ name: '', picture: '' })
  const handleGoogleAuth = useGoogleLogin({
    onError: () => {
      //handle error
    },
    onSuccess: async (codeResponse: any) => {
      try {
        const apiUrl = `http://localhost:8000/api/signin`
        const responseOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: codeResponse.code
          })
        }

        const response = await fetch(apiUrl, responseOptions)
        const data = await response.json()

        setUser(data)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
      } catch (error: any) {
        console.error('Error', error.message)
      }
    },
    flow: 'auth-code'
  })

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-10 mt-10'>
        <div className='' onClick={handleGoogleAuth}>
          <button className='bg-slate-700 p-5 rounded-lg text-base text-white'>
            Login with Google
          </button>
        </div>
        <div className=''>
          <h2 className='capitalize text-center mb-5'>{user?.name}</h2>
          {user?.picture ? (
            <Image
              className='rounded-full'
              src={user?.picture}
              width={200}
              height={200}
              alt=''
            />
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Signin
