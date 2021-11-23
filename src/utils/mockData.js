import httpService from "../services/http.service";
import articles from "../mocData/articles.json";
import users from "../mocData/users.json";
import tags from "../mocData/tags.json";
import {useEffect, useState} from "react";

export const useMockData = () => {
    const statusConsts = {
        idle: "Not Started",
        pending: "In Process",
        success: "Ready",
        error: "Error occured"
    }

    const [error, setError] = useState()
    const [status, setStatus] = useState(statusConsts.idle)
    const [progress, setProgress] = useState(0)
    const [count, setCount] = useState(0)
    const summaryCount = articles.length + users.length + tags.length

    const incrementCount = () => {
        setCount(prevState => prevState + 1)
    }

    const updateProgress = () => {
        if (count !== 0 && status === statusConsts.idle) {
            setStatus(statusConsts.pending)
        }
        const newProgress = Math.floor((count/summaryCount) * 100)
        if (progress < newProgress) {
            setProgress(() => newProgress)
        }
        if (newProgress === 100) {
            setStatus(statusConsts.success)
        }
    }

    useEffect(() => {
        updateProgress()
    }, [count])

    async function initialize  () {
        console.log('go initialize')
        try {
            for(const article of articles) {
                const result = await httpService.put("articles/" + article._id, article)
                incrementCount()
            }
            for(const user of users) {
                const result = await httpService.put("user/" + user._id, user)
                incrementCount()
            }
            for(const tag of tags) {
                const result = await httpService.put("tags/" + tag._id, tag)
                incrementCount()
            }
        } catch (e) {
            setError(e)
            setStatus(statusConsts.error)
            console.log('smt gone wrong')
        }

    }

    return {
        error,
        status,
        initialize,
        progress
    }
}