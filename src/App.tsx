import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/header/Header'
import TaskForm from './features/task/taskForm/TaskForm'
import TaskList from './features/task/taskList/TaskList'
import { fetchTasks } from './features/task/taskSlice'
import { AppDispatch } from './app/store'
import styles from './App.module.scss'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

const App: React.FC = (props) => {
  const navigate = useNavigate()
  console.log(auth)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      !user && navigate('user-auth')
    })
  }, [])

  useEffect(() => {
    const getData = () => {
      dispatch(fetchTasks())
    }
    getData()
  }, [])
  
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <Header />
        <TaskForm />
        <TaskList />
      </div>
    </div>
  )
};

export default App;
