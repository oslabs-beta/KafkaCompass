import React, { useState } from 'react';

const DeleteTopic = ({onDelete, topics}) => {
    const [topic, setTopic] = useState('');
    console.log(topics);

    return(
        <>
        <input type="checkbox" id="topic-delete-modal" className="modal-toggle" />
        <label htmlFor="topic-delete-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
                <h3 className="mb-4 text-lg font-bold">Topic name:</h3>
                <div className="form-control w-full max-w-xs">
                <select class="select w-full max-w-xs">
                    <option onChange={(e) => setTopic(e.target.value)} disabled selected>Choose a topic to delete</option>
                    {topics.map(t =>  <option>{t}</option>)}
                </select>
                    <div className = 'pt-4 mt-2 modal-action'>
                        <label htmlFor="topic-delete-modal" className = 'btn btn-accent' onClick={() => onDelete(topic)}>Create topic</label>
                    </div>
                </div>
            </label>
        </label>
        </>
    )
}

export default DeleteTopic;