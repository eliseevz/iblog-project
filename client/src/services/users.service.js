import httpService from "./http.service";
const usersEndPoint = "user/"

const usersService = {
    fetchAll: async () => {
        const {data} = await httpService.get(usersEndPoint)
        return data
    },
    getById: async (id) => {
        const data = await httpService.get(usersEndPoint + id)
        return data
    },
    update: async (id, payload) => {
        const {data} = await httpService.patch(usersEndPoint + id, payload)
        return data
    },
    create: async (data) => {
        const result = await httpService.put(usersEndPoint + data._id, data)
        return result
    }
}

export default usersService