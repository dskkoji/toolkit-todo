import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import styles from './Header.module.scss'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'



const Header: React.FC = (props) => {
  const navigate = useNavigate()
  const handleSignOut = async () => {
    const auth = getAuth()
    await signOut(auth)
          .then(() => {
            navigate('user-auth')
          })
          .catch((error) => {
            const errorMessage = error.message
            alert(errorMessage)
          })
  }
  return (
    <div className={styles.root} >
      <AppBar position='static' className={styles.app_bar}>
        <Toolbar className={styles.tool_bar}>
          <Typography variant='h6' className={styles.title}>
            Redux Toolkit Todo
          </Typography>
          <Button onClick={handleSignOut}>ログアウト</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
