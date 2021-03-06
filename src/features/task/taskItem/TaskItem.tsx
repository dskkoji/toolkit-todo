import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import {
  // completeTask,
  fetchTasks,
  deleteTask,
  selectTask,
  handleModalOpen,
  selectIsModalOpen,
  editTask
} from '../taskSlice'
import {AppDispatch} from '../../../app/store'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import EventNoteIcon from '@material-ui/icons/EventNote'
// import { RootState } from '../../../app/store'
import TaskForm from '../taskForm/TaskForm'
import styles from './TaskItem.module.scss'

interface PropsTypes {
  task: { id: string; title: string; completed: boolean }
}

const TaskItem: React.FC<PropsTypes> = ({ task }) => {
  const isModalOpen = useSelector(selectIsModalOpen)
  const dispatch: AppDispatch = useDispatch()

  const handleOpen = () => {
    dispatch(selectTask(task))
    dispatch(handleModalOpen(true))
  }

  const handleClose = () => {
    dispatch(handleModalOpen(false))
  }

  const handleEdit = async (id: string, title: string,  completed: boolean) => {
    const sendData = { id, title, completed: !completed }
    await editTask(sendData)
    dispatch(fetchTasks())
  }

  const handleDelete = async (id: string) => {
    await deleteTask(id)
    dispatch(fetchTasks())
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <EventNoteIcon className={styles.icon} />
        <div className={styles.title_text}>{task.title}</div>
      </div>
      <div className={styles.right_item}>
        <Checkbox
          checked={task.completed}
          // onClick={() => dispatch(completeTask(task))} 
          onClick={() => handleEdit(task.id, task.title, task.completed)}
          className={styles.checkbox}
        />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button 
          // onClick={() => dispatch(deleteTask(task))}
          onClick={() => handleDelete(task.id)}
          className={styles.delete_button}
        >
          <DeleteIcon className={styles.icon} />
        </button>
      </div>
      <Modal open={isModalOpen} onClose={handleClose} className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_title}>Edit Task Title</div>
            <TaskForm edit />
        </div>
      </Modal>
    </div>
  )
}

export default TaskItem

