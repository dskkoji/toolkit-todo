import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {RootState} from '../../app/store'
// import firebase from 'firebase/app'
import { db } from '../../firebase';
import { doc, getDocs, query, orderBy, collection, addDoc, Timestamp, setDoc, deleteDoc } from 'firebase/firestore/lite'

interface TaskState {
  idCount: number;
  tasks: { id: string; title: string; completed: boolean }[];
  selectedTask: { id: string; title: string; completed: boolean };
  isModalOpen: boolean;
}

const initialState: TaskState = {
  idCount: 1,
  tasks: [],
  selectedTask: {id: '', title: '', completed: false},
  isModalOpen: false,
}

export const fetchTasks = createAsyncThunk('task/getAllTasks', async () => {
  const q = query(collection(db, 'tasks'), orderBy('dateTime','desc'))
  const querySnapshot = await getDocs(q)

  const allTasks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    completed: doc.data().completed,
  }))
  
  const taskNumber = allTasks.length
  const passData = { allTasks, taskNumber }
  return passData
})

export const createTask = async (title: string): Promise<void> => {
  try {
    const dateTime = Timestamp.fromDate(new Date())
    await addDoc(collection(db, 'tasks'), {
      title: title,
      completed: false,
      dateTime: dateTime
    })
  } catch(err) {
    console.log('Error writing document: ', err)
  }
}


export const editTask = async (submitData: {
  id: string; 
  title: string; 
  completed: boolean;
}): Promise<void> => {
      const { id, title, completed } = submitData
      const dateTime = Timestamp.fromDate(new Date())
      try {
        const docRef =  doc(db, 'tasks', id)
        await setDoc(docRef, { title, completed, dateTime }, { merge: true })        
      } catch (err) {
        console.log('Error updating document: ', err)
      }
}

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'tasks', id))
  } catch(err) {
    console.log('Error removing document: ', err)
  }
}


export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // createTask: (state, action) => {
    //   // state.idCount++;
    //   // const newTask = {
    //   //   id: state.idCount,
    //   //   title: action.payload,
    //   //   completed: false,
    //   // }
    //   // state.tasks = [newTask, ...state.tasks];
    // },
    // completeTask: (state, action) => {
    //   // const task = state.tasks.find((t) => t.id === action.payload.id)
    //   // if (task) {
    //   //   task.completed = !task.completed
    //   // }
    // },
    // deleteTask: (state, action) => {
    //   // state.tasks = state.tasks.filter((t) => t.id !== action.payload.id)
    // },
    selectTask: (state, action) => {
      state.selectedTask = action.payload
    },
    // editTask: (state, action) => {
    //   // const task = state.tasks.find((t) => t.id === action.payload.id)
    //   // if (task) {
    //   //   task.title = action.payload.title
    //   // }
    // },
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
  //state, action の型が正しく推論されるためのbuilder関数
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      //action.payload === return passData
      state.tasks = action.payload.allTasks
      state.idCount = action.payload.taskNumber
    })
  },
});

export const {
  // createTask,
  // completeTask,
  // deleteTask,
  selectTask,
  // editTask,
  handleModalOpen,
} = taskSlice.actions

export const selectTasks = (state: RootState): TaskState['tasks'] => state.task.tasks

export const selectIsModalOpen = (state: RootState): TaskState['isModalOpen'] => state.task.isModalOpen

export const selectSelectedTask = (state: RootState): TaskState['selectedTask'] => state.task.selectedTask

export default taskSlice.reducer;