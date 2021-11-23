import React, {useContext, useEffect, useState} from "react"
import apiTags from "../api/tags";
import tagsService from "../services/tags.service";

const TagsContext = React.createContext()

export const useTags = () => {
    return useContext(TagsContext)
}

export const TagsProvider = ({children}) => {

    const [tags, setTags] = useState()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetchTags()
    }, [])

    const fetchTags = async () => {
        const data = await tagsService.fetchAll()
        const newTags = data.content.map(tag => ({value: tag, label: tag.name}))
        setTags(newTags)
        setLoading(false)
    }

    const getTagById = (id) => {
        return tags.find(tag => tag.value._id === id)
    }

    return (
        <TagsContext.Provider value={{tags, getTagById}}>
            {
                !isLoading
                ? children
                : <p>loading</p>
            }
        </TagsContext.Provider>
    )
}