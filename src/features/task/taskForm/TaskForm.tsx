import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
// import { RootState } from '../../../app/store'
import { 
  createTask, 
  editTask, 
  handleModalOpen, 
  fetchTasks, 
  selectSelectedTask 
} from '../taskSlice'
import {AppDispatch} from '../../../app/store'
import styles from './TaskForm.module.scss'

type Inputs = {
  taskTitle: string;
}

type PropsTypes = {
  edit?: boolean;
}

const TaskForm: React.FC<PropsTypes> = ({ edit }) => {
  const dispatch: AppDispatch = useDispatch()
  // const selectedTask = useSelector((state: RootState) => state.task.selectedTask)
  const selectedTask = useSelector(selectSelectedTask)
  const { register, handleSubmit, reset } = useForm<Inputs>()

  const handleCreate = async (data: Inputs) => {
    await createTask(data.taskTitle)
    reset()
    dispatch(fetchTasks())
  }

  const handleEdit = async (data: Inputs) => {
    const sendData = {...selectedTask, title: data.taskTitle }
    await editTask(sendData)
    dispatch(handleModalOpen(false))
    dispatch(fetchTasks())
  }

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={!edit ? handleSubmit(handleCreate) : handleSubmit(handleEdit)}
        className={styles.form}
      >
        <TextField 
          label={!edit ? 'New Task' : 'Edit Task'}
          variant='outlined'
          {...register("taskTitle", { required: true })}
          className={styles.text_field}
          defaultValue={selectedTask.title}
        />
        {edit ? (
          <div className={styles.button_wrapper}>
            <button
              type="submit"
              onClick={handleSubmit(handleEdit)}
              className={styles.submit_button}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => dispatch(handleModalOpen(false))}
              className={styles.cancel_button}
            >
              Cancel
            </button>
          </div>
        ) : (
          null 
        )}
      </form>
    </div>
  )
}

export default TaskForm