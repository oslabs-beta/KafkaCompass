import React from 'react';
import AddTopic from './add-topic-form';

const TopicButtons = ({chartData, setChartData, totalBytes, setTotal}) => {

    const handleCreateTopic = async(topic) => {
        // send topic to the backend
        try {
            // const response = await fetch('/api/topic', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //       },
            //       body: JSON.stringify({topic}),
            // });
            // if (response.ok) {
            const newChartData = chartData;
            newChartData.labels.push(topic);
            newChartData.datasets[0].data.push(0);
            setChartData(newChartData);
            console.log(chartData);
            return;
            // }
            console.log('Could not add new topic to the cluster');
        } catch(err) {
            console.log('Network error occurred');
        }
    }

    return (
        <>
            <div className='buttons-container btn-group btn-group-vertical mx-4'>
                <label htmlFor="topic-create-modal" className='btn btn-xs btn-outline btn-accent'>Create topic</label>
                <button class='btn btn-xs btn-outline btn-accent'>Delete topic</button>
                <button class='btn btn-xs btn-outline btn-accent'>Write a message</button>
            </div>
            <AddTopic onCreate={handleCreateTopic} />
        </>
    )
}

export default TopicButtons;