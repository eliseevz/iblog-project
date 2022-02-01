import React, {useEffect, useState} from 'react';
import Select from "react-select";

const MultiSelectField = ({limit = null, onChange, name, className, options, value=null, error }) => {

    const [optionsList, setOptionsList] = useState()

    useEffect(() => {
        setOptionsList(options)
    }, [options])




    const handleChange = (target) => {
        if (limit && target.length + 1 > limit){
            onChange({name: name, value: target})
            setOptionsList([])
        } else {
            setOptionsList([...options])
            onChange({name: name, value: target})
        }
    }

    return (
        <>
            <Select
                isMulti
                // defaultValue={[{
                //     label: "ИТ",
                //     value: {_id: 'jskwie33', name: 'ИТ'}
                // }]}
                defaultValue={value}
                className={className}
                // classNamePrefix="select"
                name={name}
                options={optionsList}
                onChange={handleChange}
            />
            {
                error && <span className="text-danger">{error}</span>
            }
        </>
    );
};

export default MultiSelectField;
