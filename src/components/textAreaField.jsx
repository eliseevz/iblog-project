import React from 'react';

const TextAreaField = ({rows, name, type = "text",onChange, value, styles ={maxWidth: "200px"}, className = "mb-3 d-flex flex-column align-items-center justify-content-center", label = "", error }) => {

    const handleChange = ({target}) => {
        onChange({name: name, value: target.value})
    }

    return (
        <div className={className}>
            {
                label
                    ? <label className="me-3 w-100 mb-1" htmlFor={name+label}>{label}</label>
                    : null
            }
                <textarea
                    onChange={handleChange}
                    name={name}
                    id={name+label}
                    value={value}
                    type={type}
                    className={"form-control"}
                    style={styles}
                    rows={rows}
                />
            {
                error
                ? <span className="text-danger">{error}</span>
                : null
            }
        </div>
    );
};

export default TextAreaField;
