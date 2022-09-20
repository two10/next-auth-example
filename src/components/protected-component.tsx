
import { useSession } from "next-auth/react"
import { CircularProgress } from '@mui/material'
import { Stack } from "@mui/system"
import { useEffect } from "react"
import { useRouter } from 'next/router'

interface Props {
  children: React.ReactNode
}
export default function ProtectedComponent({ children }: Props) {

  const router = useRouter()
  const { data: session, status } = useSession()

 useEffect(() => {
    if(status == "unauthenticated")

       router.push('pages/login?callbackUrl='+router.basePath)
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
