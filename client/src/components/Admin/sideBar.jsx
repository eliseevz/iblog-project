import React from 'react';

const SideBar = ({data, setData, selected}) => {

    const getClasses = (data) => {
        let cls = "list-group-item"
        if (data?.className) {
            cls = cls + ` ${data.className}`
        }
        if (data?.color) {
            cls = cls + ` text-${data.color}`
        }
        return cls
    }

    return (
        <ul className="list-group">
            {
                Object.keys(data).map(tab => {
                    if (data[tab].name === selected.name) {
                        return <li key={tab.name} className="list-group-item active" aria-current="true">{selected.label}</li>
                    }
                    return <li onClick={
                        data[tab].action
                            ? data[tab].action
                            : () => setData(data[tab])
                    }
                       // className={data[tab].color ? `list-group-item text-${data[tab].color}` : `list-group-item`}
                       className={getClasses(data[tab])}
                       role="button"
                       key={tab.name}
                    >
                        {data[tab].label}
                    </li>
                })
            }
        </ul>
    );
};

export default SideBar;
