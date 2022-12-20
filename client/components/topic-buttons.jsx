import React from 'react';

const TopicButtons = (props) => {
    return (
        <div className='buttons-container btn-group btn-group-vertical mx-4'>
            <button class='btn btn-xs btn-outline btn-accent'>Create topic</button>
            <button class='btn btn-xs btn-outline btn-accent'>Delete topic</button>
            <button class='btn btn-xs btn-outline btn-accent'>Write a message</button>
        </div>
    )
}

export default TopicButtons;