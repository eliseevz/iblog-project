import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import classes from "./filterBar.module.css"
import apiTags from "../../api/tags"
import SelectField from "../selectField";
import MultiSelectField from "../multiSelectField";
import TextField from "../textField";

const FilterBar = ({sort, setSort}) => {

    const {fetchAll} = apiTags
    const [tags, setTags] = useState()

    const sortOptions = [
        {value: "oldest", label: "Старые"},
        {value: "newest", label: "Новые"}
    ]

    useEffect(() => {
        fetchAll()
            .then(data => {
                const newTags = data.map(tag => ({value: tag, label: tag.name}))
                setTags(newTags)
            })
    }, [])

    const handleChange = (target) => {
        console.log(target, ' this is target')
        console.log(target.name)
        setSort(prevState => ({...prevState, [target.name]: target.value}))
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-sm-3 d-flex align-items-center justify-content-between">
                    <span>Сначала:</span>
                    <SelectField
                        className={`basic-single ${classes.select} ms-3 text-dark`}
                        onChange={handleChange}
                        options={sortOptions}
                        defaultValue={sort.sort}
                        name="sort"
                    />
                </div>
                <div className={`col-sm-5 d-flex align-items-center justify-content-between`}>
                    <span>Тэги:</span>
                    <MultiSelectField
                        name="tags"
                        options={tags}
                        className={`basic-multi-select text-dark ms-3 ${classes.select}`}
                        onChange={handleChange}
                    />
                </div>
                <div className={`col-sm-3 d-flex align-items-center justify-content-between`}>
                    <span>Поиск</span>
                    <TextField
                        value={sort.search}
                        onChange={handleChange}
                        className={`ms-3 w-100 h-100`}
                        name="search"
                        type="text"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
