import axios from '@/api/axios/index'

const getTodoList = (ymd: any) => {
  return axios.get(`/api/v1/checklist/${ymd}`)
}

const postTodo = (data: any) => {
  return axios.post('/api/v1/checklist', data)
}

const getTodo = (todoId: any) => {
  return axios.get(`/api/v1/checklist/${todoId}`)
}

const putTodo = (todoId: any) => {
  return axios.put(`/api/v1/checklist/${todoId}`)
}

const deleteTodo = (todoId: any) => {
  return axios.delete(`/api/v1/checklist/${todoId}`)
}

const putCheckedTodo = (todoId: any) => {
  return axios.put(`/api/v1/checklist/checked/${todoId}`)
}

export { getTodoList, postTodo, getTodo, putTodo, deleteTodo, putCheckedTodo }
