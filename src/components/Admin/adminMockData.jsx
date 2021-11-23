import React from 'react';
import {useMockData} from "../../utils/mockData";

const AdminMockData = () => {

    const {status, progress, initialize, error} = useMockData()

    const handleChange = async () => {
        console.log('click')
        await initialize()
    }

    return (
        <div>
            <h3>Загрузить mocData</h3>
            <ul>
                <li>status: {status}</li>
                <li>progress: {progress}</li>
                {
                    error && <li>
                        error: {error}
                    </li>
                }
            </ul>
            <button onClick={handleChange} className="btn btn-primary">Начать</button>
        </div>
    );
};

export default AdminMockData;
