import httpService from "./http.service";
const usersEndPoint = "user/"

const usersService = {
    fetchAll: async () => {
        const {data} = await httpService.get(usersEndPoint)
        return data
    },
    getById: async (id) => {
        const data = await httpService.get(usersEndPoint + id)
        console.log(data, ' data from httpservice')
        return data
    },
    update: async (id, data) => {
        const result = await httpService.put(usersEndPoint + id, data)
        return data
    },
    create: async (data) => {
        const result = await httpService.put(usersEndPoint + data._id, data)
        return result
    }
}

export default usersService