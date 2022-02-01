import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart, registerables, CategoryScale} from "chart.js"
Chart.register(...registerables);
Chart.register(CategoryScale)

const GraphArticles = ({articles}) => {

    const [config, setConfig] = useState({
        labels: [],
        data: [],
        isReady: false
    })

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = () => {
        const months = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ]

        const nowDate = new Date().getMonth()

        const resultLabels = []
        const resultCount = []
        for(let i = nowDate; i >= nowDate - 6; i--) {
            let index = i
            // if (i >= 12) {
            //     index = i - 12
            // }
            if (i < 0) {
                index = i + 12
            }
            resultLabels.push(months[index])
            const articlesCount = articles.filter((article) => {
                return new Date(article.date).getMonth() === index
            })
            resultCount.push(articlesCount.length)
        }


        setConfig(prevState => ({data: resultCount.reverse(), labels: resultLabels.reverse(), isReady: true}))

    }

    useEffect(() => {
    }, [config])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Количество статей за последние 6 месяцев',
                color: "#fff"
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April'];


    const data = {
        labels: config.labels,
        datasets: [
            {
                label: 'Количество статей',
                data: config.data,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };


    return (
        <>
        {
            config.isReady && <Line
                data={data}
                options={options}
            />
        }
        </>
    );
};

export default GraphArticles;
