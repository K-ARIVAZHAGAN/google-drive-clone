import React from 'react';
import { FaFolder, FaTrash } from 'react-icons/fa';

const Folder = ({ folder, onClick, onDelete }) => {
    return (
        <div
            className="group relative flex flex-col items-center p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors"
        >
            <div onClick={onClick} className="flex flex-col items-center w-full">
                <FaFolder className="text-4xl text-gray-500 mb-2 group-hover:text-blue-500" />
                <span className="text-sm font-medium text-gray-700 truncate w-full text-center">{folder.name}</span>
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete"
            >
                <FaTrash size={12} />
            </button>
        </div>
    );
};

export default Folder;
