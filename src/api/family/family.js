import axios from "@/api/axios/index.js";

const selectFamilyList = () => {
  return axios.get('/api/v1/family')
}

export {
    selectFamilyList
}