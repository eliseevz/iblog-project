import React, {useState} from 'react';
import {useHistory} from "react-router";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import TextField from "../textField";
import {Link} from "react-router-dom";
import paginate from "../../utils/paginate";
import Pagination from "../pagination"; // Import css

const UsersInfo = ({usersData}) => {

    const [search, setSearch] = useState({
        search: ""
    })
    const [page, setPage] = useState(1)

    const pageSize = 1

    const history = useHistory()

    const handleChange = (target) => {
        setSearch({search: target.value})
    }

    const handleDelete = (user) => {
        confirmAlert({
            title: `Внимание!`,
            message: `Действительно хотите удалить пользователя ${user}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert('Click Yes')
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    }

    const searchUsers = usersData.filter(user => user.nickname.includes(search.search))
    const cropUsers = paginate(searchUsers, page, pageSize)

    return (
        <div>
            <TextField
                label = "поиск"
                onChange={handleChange}
                name="search"
                value={search.search}
            />
            <ul className="list-group list-group-flush">
                {
                    cropUsers.map(user => {
                        return (
                            <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span role="button"
                                      className="t-left"
                                      style={{width: 100}}
                                >
                                    <Link className="link-dark" target="_blank" to={`/${user.nickname}`}>
                                        <strong>
                                            {user.nickname}
                                        </strong>
                                    </Link>
                                </span>
                                articles: {user.articles ? user.articles.length : 0}
                                <button onClick={() => handleDelete(user.nickname)} className="btn fs-4">
                                    <i className="bi bi-x text-danger"></i>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <Pagination
                setPage={setPage}
                pageSize={pageSize}
                currentPage={page}
                content={searchUsers}
            />
        </div>
    );
};

export default UsersInfo;
