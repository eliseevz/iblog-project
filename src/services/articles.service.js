import httpService from "./http.service";
const articlesEndPoint = "articles/"

const articlesService = {
    fetchAll: async () => {
        const {data} = await httpService.get(articlesEndPoint)
        return data
    },
    update: async (id, data) => {
      const result = await httpService.put(articlesEndPoint+id, data)
        return result
    },
    add: async (data) => {
        const result = await httpService.put(articlesEndPoint + data._id, data)
        return result
    },
    delete: async (id) => {
        const res = await httpService.delete(articlesEndPoint + id)
        return res
    }
}

export default articlesService