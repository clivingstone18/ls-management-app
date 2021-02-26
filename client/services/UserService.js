import axios from "axios"
const host = 'localhost:8080'
const API_LINK = `http://${host}/api/`
const API_STAFF_URL = `http://${host}/api/staff/`
const API_CLASS_URL = `http://${host}/api/classData/`

// Performs all API calls 

class UserService {

    getAllStaff() {
        return axios.get(API_STAFF_URL + 'getAll')
    }

    addNewStaff(data) {
        return axios.post(API_STAFF_URL + 'post', data)
    }

    deleteStaff(staffID) {
        return axios.post(API_STAFF_URL + 'delete', {staffID:staffID})
    }
    addNewClassData(data) {
        return axios.post(API_CLASS_URL + 'post', {data:data})
    }
    getClassData() {
        return axios.post(API_CLASS_URL + 'mostrecent/get');
    }
    getClassDataOnDate(date) {
        return axios.get(API_CLASS_URL + `${date}/get`);
    }


}

export default new UserService()

