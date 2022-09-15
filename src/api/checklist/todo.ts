import axios from '@/api/axios/index'

const getTodoList = (ymd: string) => {
  return axios.get(`/api/v1/checklist/list/${ymd}`)
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

const putCheckedTodo = (data: {todoId: number, date: string}) => {
  return axios.put(`/api/v1/checklist/${data.todoId}/checked/date/${data.date}`)
}

export { getTodoList, postTodo, getTodo, putTodo, deleteTodo, putCheckedTodo }
