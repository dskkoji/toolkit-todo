import React, { useState } from 'react'
import { useForm  } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {makeStyles} from '@material-ui/core/styles'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ©️'}
      <Link color="inherit" href="https:/mui.com/">
        My Site
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}))

interface AuthDataTypes {
  email: string;
  password: string;
}

const UserAuth: React.FC = (props) => {
  let navigate = useNavigate()
  const classes = useStyles()
  const { register, handleSubmit } = useForm<AuthDataTypes>()
  const [isSignIn, setIsSignIn] = useState(true)

  const handleSignIn = async (data: AuthDataTypes) => {
    const { email, password } = data
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            navigate('/')
          })
          .catch((error) => {
            const errorMessage = error.message
            alert(errorMessage)
          })
  }

  const handleSignUp = async (data: AuthDataTypes) => {
    const { email, password } = data
    const auth = getAuth()
    await createUserWithEmailAndPassword(auth, email, password)
          .then(() => {
            navigate('/')
          })
          .catch((error) => {
            const errorMessage = error.message
            alert(errorMessage)
          })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> 
        <Typography component="h1" variant="h5">
          {isSignIn 
            ? 'ログイン'
            : '新規登録'
          }
        </Typography>
        <form 
          onSubmit={
            isSignIn ? handleSubmit(handleSignIn) : handleSubmit(handleSignUp) 
          }
          className={classes.form} 
          noValidate
          >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                {...register(
                  "email",
                  {
                  required: {
                    value: true,
                    message: 'メールアドレスを入力してください'
                  },
                  pattern: {
                    value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/,
                    message: 'メールアドレスを正しい形式で入力してください',
                  }
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                autoComplete="current-password"
                {...register(
                  'password',
                   {
                    required: {
                      value: true,
                      message: 'パスワードを入力してください'
                    },
                    minLength: {
                      value: 6,
                      message: 'パスワードを6文字以上で入力してください'
                    },
                  }
                )}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignIn 
              ? 'ログイン'
              : '新規登録する'
            }
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link 
                href="#" 
                variant="body2" 
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn
                  ? 'アカウントをお持ちでない方はこちら'
                  : 'アカウントをお持ちの方はこちら'
                }
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default UserAuth