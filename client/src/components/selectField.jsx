import React from 'react';
import Select from "react-select";

const SelectField = ({onChange, name, className, defaultValue, options }) => {

    const handleChange = (target) => {
        onChange({name: name, value: target})
    }

    return (
        <Select
            className={className}
            classNamePrefix="select"
            defaultValue={defaultValue}
            name={name}
            options={options}
            onChange={handleChange}
        />
    );
};

export default SelectField;
