import React, {useEffect, useState} from 'react';
import TextField from "../components/textField";
import TextAreaField from "../components/textAreaField";
import MultiSelectField from "../components/multiSelectField";
import {useHistory} from "react-router";
import {confirmAlert} from "react-confirm-alert";
import {useDispatch, useSelector} from "react-redux";
import {addArticle, getCurrentUser, logout, removeArticle} from "../store/users";
import {addNewArticle, getArticleById, removeArticleFromList, updateArticle} from "../store/articles";
import {getTagsList} from "../store/tags";
import {parseArticleContent} from "../utils/parseArticleContent";
import {validator} from "../utils/validator";

const NewArticle = ({userNickname, type, articleId=null, userId=null}) => {

    const validationConfig = {
        title: {
            isRequired: {
                message: "Поле обязательно для ввода"
            },
        },
        short: {
            isRequired: {
                message: "Поле обязательно для ввода"
            },
        },
        content: {
            isRequired: {
                message: "Поле обязательно для ввода"
            }
        },
        tags: {
            isRequired: {
                message: "Поле обязательно для ввода"
            },
            max: {
                value: 2,
                message: "Максимально - 2 тэга"
            }
        }
    }

    const initialState = {
        title: "",
        short: "",
        content: "",
        tags: []
    }

    const history = useHistory()
    const [loading, setLoading] = useState(type === "new" ? false : true)

    const [data, setData] = useState(initialState)
    const [errors, setErrors] = useState({})

    const tags = useSelector(getTagsList()).map(tag => ({label: tag.name, value: tag}))
    const user = useSelector(getCurrentUser())
    const dispatch = useDispatch()

    const article = useSelector(getArticleById(articleId))


    const handleChange = (data) => {
        setData(prevState => ({...prevState, [data.name]: data.value}))
    }

    useEffect(async () => {
        if (type === 'edit') {
            console.log(article, ' hello data')
            setData({
                ...article,
                title: article.title,
                short: article.short,
                content: article.content.length === 1 ? article.content[0].content : parseArticleContent(article.content),
                tags: article.tags
            })
            setLoading(prevState => !prevState)
        } else {
            setData(initialState)
        }
    }, [type])

    const getTags = () => {
        if (type === "edit") {
            const tagsIndex = []
            tags.forEach((tag, index) => {
                if (data.tags.find(dataTag => tag.value._id === dataTag)) {
                    tagsIndex.push(index)
                }
            })
            console.log(tagsIndex)
            return tagsIndex
        }
        return null
    }

    const handleCancelClick = () => {
        history.push(`/${userNickname}`)
    }

    const deleteArt = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(removeArticle(user._id, data._id))
        dispatch(removeArticleFromList(data._id))
        history.push(`/${user.nickname}`)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        confirmAlert({
            title: `Внимание!`,
            message: `Действительно хотите удалить вашу статью?`,
            buttons: [
                {
                    label: 'Удалить',
                    onClick: async () => await deleteArt(e)
                },
                {
                    label: 'Отмена',
                    onClick: () => {}
                }
            ]
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const result = validator(data, validationConfig)

        if (Object.keys(result).length !== 0) {
            setErrors(result)
            return
        }

        const correctContent = transformArticleContent(data.content)

        let correctTags = data.tags
        if (typeof data.tags[0] !== "string") {
            correctTags = data.tags.map(tag => tag.value._id)
        }
        if (type === "edit") {
            console.log("edit")
            const result = dispatch(updateArticle(data._id, {...data, tags: correctTags, content: correctContent}))
            history.push(`/${userNickname}/article/${data._id}`)
        }
        if (type === "new") {
            const result = await dispatch(addNewArticle({
                ...data,
                tags: data.tags.map(tag => tag.value._id),
                content: correctContent,
                author: userNickname
            }))
            dispatch(addArticle(result.authorId, result._id))
            history.push(`/${userNickname}/article/${result._id}`)
        }
    }

    function transformArticleContent(content) {
        console.log(content)
        const splitedContent = content.trim().split("\n")
        const newContent = []
        for (let i = 0; i < splitedContent.length; i++) {
            if (i !== 0 && splitedContent[i - 1] === "") {
                if (splitedContent[i] !== "") {
                    newContent.push({
                        content: splitedContent[i].trim(),
                        margin: 2
                    })
                }
            } else {
                if (splitedContent[i] !== "") {
                    newContent.push({
                        content: splitedContent[i].trim(),
                        margin: 1
                    })
                }
            }
        }

        return newContent
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3 mt-4">
                    <h2 className="text-start">
                        {
                            type === "edit"
                            ? "Редактирование статьи"
                            : "Новая статья"
                        }
                    </h2>
                </div>
            </div>
            <div className="row">
                {
                    !loading
                    ? <form onSubmit={handleSubmit} className="w-100 mt-4 d-flex flex-column align-items-center">
                        <TextField
                            value={data.title}
                            onChange={handleChange}
                            name="title"
                            type="text"
                            label="Название статьи"
                            styles={{}}
                            className="col-sm-6 mb-3"
                            error={errors.title}
                        />
                        <TextAreaField
                            value={data.short}
                            name="short"
                            type="text"
                            onChange={handleChange}
                            label="Короткое описание"
                            rows={3}
                            styles={{}}
                            className="col-sm-6 mb-3"
                            error={errors.short}
                        />
                        <TextAreaField
                            value={data.content}
                            name="content"
                            type="text"
                            onChange={handleChange}
                            label="Статья"
                            rows={10}
                            styles={{}}
                            className="col-sm-8 mb-4"
                            error={errors.content}
                        />
                        <span>Выбрать тэги (максимум 2)</span>
                        <MultiSelectField
                            name="tags"
                            options={tags}
                            className={`basic-multi-select mt-2 text-dark ms-3 col-sm-6`}
                            onChange={handleChange}
                            limit={2}
                            // value={data.tags}
                            value={getTags()?.map(tag => tags[tag])}
                            error={errors.tags}
                        />
                        <div className="buttonsGroup mt-5">
                            <button type="submit" className="btn btn-primary me-3">Сохранить</button>
                            <button onClick={handleCancelClick} className="btn btn-secondary me-3">Отмена</button>
                            {
                                type === "edit"
                                && <button onClick={handleDelete} className="btn btn-danger">Удалить</button>
                            }
                        </div>
                    </form>
                    : <p>loading</p>
                }
            </div>
        </div>
    );
};

export default NewArticle;
