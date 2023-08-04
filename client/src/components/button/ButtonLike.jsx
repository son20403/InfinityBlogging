import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faEye, faThumbsUp as farThumbUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as fasThumbUp } from '@fortawesome/free-solid-svg-icons';

const ButtonLike = ({ onClick = () => { }, isLiked, totalLikes }) => {
    return (
        <div className='flex gap-3 items-center ml-auto text-lg '>
            <div onClick={() => onClick()}
                className={`ml-auto text-xl cursor-pointer transition-all  border-blue-600 py-1 px-2 rounded-full border 
                ${isLiked ? 'bg-blue-600 text-white' : 'text-blue-600'}`}>
                <FontAwesomeIcon icon={isLiked ? fasThumbUp : farThumbUp} /></div>
            <span className='font-semibold font-body text-base'>{totalLikes} lượt thích</span>
        </div>
    )
}

export default ButtonLike;