import httpService from "./http.service";
const commentsEndPoint = "comments/"

const commentsService = {
    getComments: async (pageId) => {
        const {data} = await httpService.get(commentsEndPoint, {
            params: {
                orderBy: "pageId",
                equalTo: `${pageId}`
            }
        })
        return data
    },
    removeComment: async (id) => {
        const {data} = await httpService.delete(commentsEndPoint + id)
        return data
    },
    createComment: async (payload) => {
        const {data} = await httpService.post(commentsEndPoint, payload)
        return data
    }
}

export default commentsService