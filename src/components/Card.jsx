import React from 'react';

const Card = ({ name, image, onCardClick }) => {
  return (
    <div className="card " onClick={onCardClick}>
      <a href="#">
        <img
          className="rounded-t-lg object-cover w-full h-44"
          src={image}
          alt="Image"
        />
      </a>
      <div className="p-3">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
      </div>
    </div>
  );
};

export default Card;
