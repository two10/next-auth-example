import { signIn } from "next-auth/react"

import { useSession } from "next-auth/react"
import { CircularProgress } from '@mui/material'
import { Stack } from "@mui/system"
import { useState, useEffect } from "react"

import type { ReactChildren } from "react"
import { useRouter } from 'next/router'
interface Props {
  children: React.ReactNode
}
export default function ProtectedComponent({ children }: Props) {

  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === "loading"

 useEffect(() => {
    if(status == "unauthenticated")
       router.push('pages/login')
  }, [status])


     return (
      <>

      {typeof window !== "undefined" && !session  &&
        <Stack alignItems="center">
        <CircularProgress />
      </Stack>
      }
      {typeof window !== "undefined" && session  &&
        <main>{children}</main>
      }

      </>
     )

}
