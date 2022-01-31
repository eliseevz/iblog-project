import httpService from "./http.service";
const articlesEndPoint = "articles/"

const articlesService = {
    fetchAll: async () => {
        const {data} = await httpService.get(articlesEndPoint)
        return data
    },
    update: async (id, payload) => {
      const {data} = await httpService.patch(articlesEndPoint+id, payload)
        return data
    },
    add: async (payload) => {
        const {data} = await httpService.post(articlesEndPoint, payload)
        return data
    },
    delete: async (id) => {
        const res = await httpService.delete(articlesEndPoint + id)
        return res
    }
}

export default articlesService