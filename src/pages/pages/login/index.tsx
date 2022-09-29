// ** React Imports
import {  MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import TextField from '@mui/material/TextField'

// import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

// import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'

// import FormControl from '@mui/material/FormControl'
// import OutlinedInput from '@mui/material/OutlinedInput'

import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// import InputAdornment from '@mui/material/InputAdornment'
// import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import {  useEffect } from "react"

// ** Icons Imports
import Google from 'mdi-material-ui/Google'

// import Github from 'mdi-material-ui/Github'
// import Twitter from 'mdi-material-ui/Twitter'
// import Facebook from 'mdi-material-ui/Facebook'
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { getCsrfToken, signIn } from "next-auth/react"

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'


// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

// const LinkStyled = styled('a')(({ theme }) => ({
//   fontSize: '0.875rem',
//   textDecoration: 'none',
//   color: theme.palette.primary.main
// }))

// const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
//   '& .MuiFormControlLabel-label': {
//     fontSize: '0.875rem',
//     color: theme.palette.text.secondary
//   }
// }))

import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'

import * as queryst from 'query-string';
import Image from 'next/image'

const LoginPage = () => {
  // ** State
  // const [values, setValues] = useState<State>({
  //   password: '',
  //   showPassword: false
  // })

  // const url = new URL(location.href);
  // const errorFromUrl = url.searchParams.get("error")!;

  const router = useRouter()
  const parsedQuery = queryst.parse(router.asPath);
  let defaultError = ""
  if(parsedQuery.error){
    defaultError = "unable to login via email : "+parsedQuery.error
  }
  const [error, setError] = useState<string>(defaultError)

  const [email , setEmail] = useState<string>("")


  const loginF =  (provider:string) => {
     return async (e:MouseEvent<HTMLElement>) => { e.preventDefault();

      if(provider == "email"){


       const csrfToken = await getCsrfToken();

       const details : {
        [key: string]: number | string ,
       } = {
        'csrfToken': csrfToken!,
        'email': email
    };

    const formBody : string[] = [];
    const test = "";
    console.log(test);
    for (const property in details) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    const formData = formBody.join("&");






        try{
          const out = await fetch('/api/auth/signin/email',{
            method: 'POST',
            headers: {"Content-type": "application/x-www-form-urlencoded"},
            body:formData
           });

           if (out.redirected) {
            window.location.href = out.url;
          }else{
            setError('unable to generate link, error : '+String(out.statusText));
          }
        }catch(e:any){
          setError(String(e.message));
        }


      }else{
        signIn(provider , {callbackUrl: redirectUrl,} );
      }



    }
  };



  // const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword })
  // }

  // const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  // }

  let redirectUrl = "";


  useEffect(() => {
    const url = new URL(location.href);
    const callbackURL = url.searchParams.get("callbackUrl")!;
    if(callbackURL !="" ){
      redirectUrl = callbackURL;
    }
    if(redirectUrl=="" || redirectUrl == null){
      redirectUrl = window.location.origin;
    }
  });

  return (
    <Box className='content-center'>


      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <Image
            src="/images/favicon.png"
            alt="logo"
            width={48}
            height={48}/>
            <Typography
              variant='h3'
              sx={{

                lineHeight: 1,
                fontWeight: 600,

                fontSize: '2rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            {/* <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography> */}
            <Typography variant='body2'>Please sign-in to your account!!</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth id='email' label='Email' onChange={(e) => {setEmail(e.target.value);}} sx={{ marginBottom: 4 }} >{email}</TextField>
            {/* <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl> */}
            {/* <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link>
            </Box> */}
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7  , marginTop: 5}}
              onClick={loginF('email')}
            >
              Login with Link
            </Button>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box> */}
            {/* <Divider sx={{ my: 5 }}>or</Divider> */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <Button  fullWidth size='large'  variant='contained' component='a' onClick={loginF('google')}>
                  Login via Google
                  <Google sx={{marginLeft:5}} aria-label="Example"/>
                </Button>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
      { error !="" &&
     <Snackbar open={true} autoHideDuration={3000} onClose={() => setError("")}>
        <Alert severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
}
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
