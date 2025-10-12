import React, { useEffect, useState } from 'react'
import axios from "axios";
import Createtodo from './Createtodo';
import { toast } from 'react-toastify';
import {CircleCheckBig, CircleX, Trash, Pencil   } from 'lucide-react'

const {VITE_BACKEND_URL} = import.meta.env

function Mytodos() {

  const [todos,     setTodos]     = useState([])
  const [showModal, setShowModal] = useState(false)
  const [completeOperation, setCompleteOperation] = useState(false)
  const [update,    setUpdate]    = useState({
                                      todoId : '',
                                      title : '',
                                      description : '',
                                      startAt : '',
                                      endAt : ''
                                    })
  const [showDetails, setShowDetails] = useState(false) //working on div for showing full details of to do.

  const token = localStorage.getItem('token')

  const fetchTodos = async () =>{
    try{

      const response = await axios.get(`${VITE_BACKEND_URL}/todos/getTodoList`, {
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      })

      setTodos(response.data.data)

    }catch(err){
      console.log("to do list error",err)
    }
  }

  const handleDelete = async (id) => {

    try{
        const response = await axios.post(`${VITE_BACKEND_URL}/todos/deleteTodoById`, { todoId : id }, {
          headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          }
        })

        if(response.data.statusCode == 200){
          toast.success('Todo Delete Success')
          fetchTodos()
        }
        
    }catch (err){
      console.log("delete todo error",err)
    }
  }

  const localConversion = (startAt) => { //helper function to convert db iso string to local time
    const date = new Date(startAt);
    const tzOffset = date.getTimezoneOffset(); // in minutes
    const localDate = new Date(date.getTime() - tzOffset*60000); // adjust to local
    const localDateTime = localDate.toISOString().slice(0,16);
    return localDateTime
  }

  const handleUpdate = async (id, completeStatus) => {
    if(completeStatus == 1){
      toast.success('Todo marked as complete! cannot udpate')
      return
    }
    setShowModal(true)
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/todos/getToDoById?todoId=${id}`, {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          }
      })

      const { todoId, title, description, startAt, endAt}  = response.data.data[0]

      
      setUpdate({todoId : todoId, 
        title : title, 
        description : description, 
        startAt : startAt ?  localConversion(startAt): "",
        endAt : endAt ? localConversion(endAt) : ""})

    }
    catch(err){
      console.log("udpate data show error",err)
    }
  }

  const handleUpdateChange = (e) => {

    const { name, value } = e.target
    setUpdate((prev)=>({...prev, [name]: value}))

  }

  const handleUpdateSubmit = async () => {
  
    try {

      const updatedData = {
        todoId : update.todoId,
        title : update.title,
        description : update.description,
        startAt : new Date( update.startAt).toISOString(),
        endAt :  new Date(update.endAt).toISOString()
      }

      const response = await axios.post(`${VITE_BACKEND_URL}/todos/updateTodoById`, updatedData, {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
          }
      })


      if(response.data.statusCode == 200) {
        toast.success(response.data.message)
        setShowModal(false)
        setUpdate({title : "", description : ""})
        fetchTodos()
      }

    }
    catch(err){
      console.log("udpate data show error",err)
    }
  }
 
  const handleCompleteOperation = async (todoId, completeStatus) => {
    try {
      completeStatus == 1 ? completeStatus = 0 : completeStatus = 1

      const response = await axios.post(`${VITE_BACKEND_URL}/todos/completeMarkOperation`,{ todoId, completeStatus }, {
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      })

      if(response.data.statusCode == 200 ){
        toast.success(response.data.message)
        fetchTodos()
      }
      
    }
    catch (err){
      console.log("complete operation error", err)
    }
  }

  useEffect( ()=>{

   fetchTodos()

  },[])
 
  return (
    <>
      

      <div className="container mx-auto w-full max-w-2xl bg-gray-50 rounded-lg py-8 shadow-lg">
      <div className="flex justify-center items-center">
        <Createtodo renderList={fetchTodos} />
      </div>
      
      {todos && todos.length > 0 ? (
        <div className="space-y-2">
          {todos.map((value, index) => (
            <div 
              key={value._id} 
              className="flex border w-4/5 items-center justify-between border-gray-400 rounded-lg p-3 mx-auto shadow-sm hover:shadow-md transition-shadow bg-white font-poppins"
            >
              <span className="flex items-center gap-2 text-gray-800">
                <span className="text-gray-500 font-medium">{index + 1}.</span>
                <span 
                  className={`${value.completeStatus === 1 ? 'line-through text-gray-400' : ''}`}
                >
                  {value.title}
                </span>
              </span>

              <div className="flex items-center gap-1">
                <button 
                  title={value.completeStatus === 0 ? "Mark as Complete" : "Mark as Incomplete"}
                  aria-label={value.completeStatus === 0 ? "Mark as Complete" : "Mark as Incomplete"}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors text-green-600 hover:text-green-700"
                  onClick={() => handleCompleteOperation(value.todoId, value.completeStatus)}
                >
                  {value.completeStatus === 0 ? (
                    <CircleCheckBig size={20} />
                  ) : (
                    <CircleX size={20} />
                  )}
                </button>
                
                <button 
                  title="Edit Todo"
                  aria-label="Edit Todo"
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors text-blue-600 hover:text-blue-700"
                  onClick={() => handleUpdate(value.todoId, value.completeStatus)}
                >
                  <Pencil size={20} />
                </button>
                
                <button 
                  title="Delete Todo"
                  aria-label="Delete Todo"
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(value.todoId)}
                >
                  <Trash size={20} />
                </button>
              </div> 
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No todos yet</p>
          <p className="text-sm mt-1">Create your first todo to get started!</p>
        </div>
      )}
    </div>

      {
        showModal ? (
          <div>

            <button onClick={()=> {setShowModal(false); setUpdate({title : "", description : ""})}}>Close</button>

            <input type="text"
              name='title'
              value={update.title}
              onChange={handleUpdateChange}
              className="border p-2 m-2 rounded"
            />

            <input type="text"
              name='description'
              value={update.description}
              onChange={handleUpdateChange}
              className="border p-2 m-2 rounded"
            />

            <input type="datetime-local"
              value={update.startAt}
              name='startAt'
              onChange={handleUpdateChange}
              placeholder='startAt'
            />

            <input type="datetime-local"
              value={update.endAt}
              name='endAt'
              onChange={handleUpdateChange}
              placeholder='endAt'
            />

            <button onClick={()=> handleUpdateSubmit()}>Edit</button>

          </div>
        ) : ""
       }
    </>
  )
}

export default Mytodos