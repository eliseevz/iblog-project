import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart, registerables, CategoryScale} from "chart.js"
Chart.register(...registerables);
Chart.register(CategoryScale)

const GraphArticles = ({articles}) => {
    console.log(articles, ' articles in graph')

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
        console.log(months[nowDate])

        const resultLabels = []
        const resultCount = []
        for(let i = nowDate; i > nowDate - 6; i--) {
            let index = i
            if (i >= 12) {
                index = i - 12
            }
            resultLabels.push(months[index])
            const articlesCount = articles.filter((article) => {
                console.log(new Date(+article.date).getMonth(), ' DATE')
                return new Date(+article.date).getMonth() === i
            })
            resultCount.push(articlesCount.length)
        }

        setConfig(prevState => ({data: resultCount.reverse(), labels: resultLabels.reverse(), isReady: true}))

        // console.log(resultLabels, ' res labels');
        // console.log(resultCount.reverse(), ' res resultCount');
        // console.log(config, ' conf')
    }

    useEffect(() => {
        console.log(config)
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
