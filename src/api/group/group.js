import axios from "@/api/axios/index.js";

const selectGroupList = () => {
  return axios.get('/api/v1/family')
}

export {
  selectGroupList
}