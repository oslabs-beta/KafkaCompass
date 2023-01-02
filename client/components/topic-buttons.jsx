import React from 'react';
import AddTopic from './add-topic-form';

const TopicButtons = ({chartData, setChartData, totalBytes, setTotal, topics}) => {

    const handleCreateTopic = async(topic) => {
        // send topic to the backend
        // works only when connected to the backend!!
        // to test it comment out everything besides lines 19 - 23
        try {
            const response = await fetch('/api/topic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({topic}),
            });
            if (response.ok) {
                const newChartData = chartData;
                newChartData.labels.push(topic);
                newChartData.datasets[0].data.push(0);
                setChartData(newChartData);
                return;
            }
            console.log('Could not add new topic to the cluster');
        } catch(err) {
            console.log('Network error occurred');
        }
    }

    const handleDeleteTopic = async(topic) => {
        try {
            const response = await fetch('/api/topic', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({topic}),
            });
            if (response.ok) {
                const newChartData = chartData;
                for (let i = 0; i < newChartData.labels.length; i++) {
                    if (newChartData.labels[i] === topic) {
                        newChartData.labels = newChartData.labels.slice(0, i).concat(newChartData.labels.slice(i + 1));
                        newChartData.datasets[0].data = newChartData.datasets[0].data.slice(0, i).concat(newChartData.datasets[0].data.slice(i + 1));
                        break;
                    }
                }
                setChartData(newChartData);
                return;
            }
        } catch(err) {
            console.log('Network error');
        }
    }

    return (
        <>
            <div className='buttons-container btn-group btn-group-vertical mx-4'>
                <label htmlFor="topic-create-modal" className='btn btn-xs btn-outline btn-accent'>Create topic</label>
                <label htmlFor="topic-delete-modal" className='btn btn-xs btn-outline btn-accent'>Delete topic</label>
                <button class='btn btn-xs btn-outline btn-accent'>Write a message</button>
            </div>
            <AddTopic onCreate={handleCreateTopic} />
        </>
    )
}

export default TopicButtons;