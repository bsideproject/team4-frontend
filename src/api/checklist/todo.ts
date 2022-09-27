import axios from '@/api/axios/index'
import { Todo } from '@/types/checklist'

const getTodoList = (ymd: string) => {
  return axios.get(`/api/v1/checklist/list/${ymd}`)
}

const saveTodo = (data: Todo) => {
  return axios.post('/api/v1/checklist', data)
}

const getTodo = (todoId: number) => {
  return axios.get(`/api/v1/checklist/${todoId}`)
}

const modifyTodo = (data: Todo, modifyType: string) => {
  return axios.put(`/api/v1/checklist/${data.checklistId}/date/${data.date}/modifyType/${modifyType}`, data)
}

const deleteTodo = (todoId: number) => {
  return axios.delete(`/api/v1/checklist/${todoId}`)
}

const modifyCheckedTodo = (data: {todoId: number, date: string}) => {
  return axios.put(`/api/v1/checklist/${data.todoId}/checked/date/${data.date}`)
}

export { getTodoList, saveTodo, getTodo, modifyTodo, deleteTodo, modifyCheckedTodo }
