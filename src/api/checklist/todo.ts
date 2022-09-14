import axios from '@/api/axios/index'

const getTodoList = (ymd: string) => {
  return axios.get(`/api/v1/checklist/${ymd}`)
}

const postTodo = (data: any) => {
  return axios.post('/api/v1/checklist', data)
}

const getTodo = (todoId: number) => {
  return axios.get(`/api/v1/checklist/${todoId}`)
}

const putTodo = (todoId: number) => {
  return axios.put(`/api/v1/checklist/${todoId}`)
}

const deleteTodo = (todoId: number) => {
  return axios.delete(`/api/v1/checklist/${todoId}`)
}

const putCheckedTodo = (todoId: number) => {
  return axios.put(`/api/v1/checklist/checked/${todoId}`)
}

export { getTodoList, postTodo, getTodo, putTodo, deleteTodo, putCheckedTodo }
