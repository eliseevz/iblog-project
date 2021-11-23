import React, {useState} from 'react';
import ArticlesList from "../arcticlesList";
import FilterBar from "../FilterBar/filterBar";

const MainPage = () => {

    const [sortConfig, setSortConfig] = useState({
        sort: {value: "newest", label: "Новые"},
        tags: [],
        search: ""
    })

    return (
        <div>
            <FilterBar
                sort={sortConfig}
                setSort={setSortConfig}
            />
            <ArticlesList
                sortConfig={sortConfig}
            />
        </div>
    );
};

export default MainPage;
