import axios from '@/api/axios/index.js'

const getTodoList = (ymd) => {
  return axios.get(`/api/v1/checklist/${ymd}`)
}

const postTodo = (data) => {
  return axios.post('/api/v1/checklist', data)
}

const getTodo = (todoId) => {
  return axios.get(`/api/v1/checklist/${todoId}`)
}

const putTodo = (todoId) => {
  return axios.put(`/api/v1/checklist/${todoId}`)
}

const deleteTodo = (todoId) => {
  return axios.delete(`/api/v1/checklist/${todoId}`)
}

const putCheckedTodo = (todoId) => {
  return axios.put(`/api/v1/checklist/checked/${todoId}`)
}

export { getTodoList, postTodo, getTodo, putTodo, deleteTodo, putCheckedTodo }
