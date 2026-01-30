import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaFile, FaFilePdf, FaFileImage, FaFileAlt, FaTrash, FaDownload } from 'react-icons/fa';
import API_URL from '../../config';

const getFileIcon = (mimeType) => {
    if (mimeType?.includes('image')) return <FaFileImage className="text-purple-500" />;
    if (mimeType?.includes('pdf')) return <FaFilePdf className="text-red-500" />;
    return <FaFileAlt className="text-blue-500" />;
};

const File = ({ file, onDelete }) => {
    const handleDownload = async (e) => {
        e.stopPropagation();
        try {
            const res = await axios.get(`${API_URL}/api/files/download/${file._id}`);
            window.open(res.data.url, '_blank');
        } catch (error) {
            console.error("Download failed", error);
            toast.error('Failed to download file');
        }
    };

    return (
        <div className="group relative flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="text-4xl mb-2">
                {getFileIcon(file.mimeType)}
            </div>
            <span className="text-sm font-medium text-gray-700 truncate w-full text-center" title={file.originalName}>
                {file.originalName}
            </span>

            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={handleDownload}
                    className="text-gray-400 hover:text-blue-500"
                    title="Download/View"
                >
                    <FaDownload size={12} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="text-gray-400 hover:text-red-500"
                    title="Delete"
                >
                    <FaTrash size={12} />
                </button>
            </div>
        </div>
    );
};

export default File;
