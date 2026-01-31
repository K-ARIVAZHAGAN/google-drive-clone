import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useDropzone } from 'react-dropzone';
import { FaFolder, FaFile, FaPlus, FaSignOutAlt, FaFolderPlus, FaTrash, FaGoogleDrive, FaBars, FaTimes } from 'react-icons/fa';
import Folder from '../components/Storage/Folder';
import File from '../components/Storage/File';
import toast from 'react-hot-toast';
import API_URL from '../config';

const Dashboard = () => {
    const { logout, user } = useAuth();
    const [structure, setStructure] = useState({ folders: [], files: [] });
    const [currentFolder, setCurrentFolder] = useState(null);
    const [folderHistory, setFolderHistory] = useState([]);
    const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const fetchFiles = useCallback(async (folderId = null) => {
        try {
            const params = folderId ? { folderId } : {};
            const res = await axios.get(`${API_URL}/api/files`, { params });
            setStructure(res.data);
        } catch (error) {
            console.error("Error fetching files", error);
            toast.error('Failed to load files');
        }
    }, []);

    useEffect(() => {
        fetchFiles(currentFolder);
    }, [currentFolder, fetchFiles]);

    const onDrop = useCallback(async (acceptedFiles) => {
        const formData = new FormData();
        acceptedFiles.forEach(file => {
            formData.append('file', file);
        });
        if (currentFolder) {
            formData.append('parentFolderId', currentFolder);
        }

        try {
            const toastId = toast.loading('Uploading file...');
            await axios.post(`${API_URL}/api/files/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.dismiss(toastId);
            toast.success('File uploaded successfully');
            fetchFiles(currentFolder);
        } catch (error) {
            console.error(error);
            toast.error('Upload failed');
        }
    }, [currentFolder, fetchFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

    const createFolder = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/files/folder`, {
                name: newFolderName,
                parentFolderId: currentFolder
            });
            setNewFolderName('');
            setIsCreateFolderOpen(false);
            fetchFiles(currentFolder);
            toast.success('Folder created');
        } catch (error) {
            toast.error('Failed to create folder');
        }
    };

    const handleFolderClick = (folderId, folderName) => {
        setFolderHistory([...folderHistory, { id: currentFolder, name: 'Back' }]); // Simple history
        setCurrentFolder(folderId);
    };

    const handleUp = () => {
        // Very basic navigation up
        if (folderHistory.length > 0) {
            const prev = folderHistory[folderHistory.length - 1];
        }
        setCurrentFolder(null); // Go to root for now on "Home"
    };

    const deleteItem = async (id, type) => {
        // Confirmation?
        if (!window.confirm('Are you sure?')) return;

        try {
            const endpoint = type === 'folder' ? `/api/files/folder/${id}` : `/api/files/${id}`;
            await axios.delete(`${API_URL}${endpoint}`);
            toast.success(`${type} deleted`);
            fetchFiles(currentFolder);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Delete failed');
        }
    }

    return (
        <div {...getRootProps()} className="flex h-screen bg-gray-100">
            <input {...getInputProps()} />

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            {/* Sidebar (Desktop & Mobile) */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:flex`}>
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaGoogleDrive className="w-8 h-8 text-blue-600" />
                        <span className="text-xl font-semibold text-gray-700">Drive</span>
                    </div>
                    {/* Mobile Close Button */}
                    <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>
                <div className="p-4">
                    <button
                        onClick={() => { setIsCreateFolderOpen(true); setIsMobileMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-2 mb-2 text-gray-700 bg-white border rounded-full shadow hover:shadow-md transition-shadow"
                    >
                        <FaPlus className="text-red-500" />
                        <span>New Folder</span>
                    </button>
                    <button
                        onClick={() => { document.querySelector('input[type="file"]').click(); setIsMobileMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 bg-white border rounded-full shadow hover:shadow-md transition-shadow"
                    >
                        <FaFile className="text-blue-500" />
                        <span>File Upload</span>
                    </button>
                </div>
                <div className="flex-1 p-2">
                    <div
                        onClick={() => { handleUp(); setIsMobileMenuOpen(false); }}
                        className={`flex items-center gap-3 px-4 py-2 rounded-r-full cursor-pointer hover:bg-gray-100 ${!currentFolder ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                    >
                        <FaFolder />
                        My Drive
                    </div>
                </div>
                <div className="p-4 border-t">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                            {user?.firstName?.[0]}
                        </div>
                        <div className="text-sm">
                            <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                    <button onClick={logout} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600">
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {isDragActive && (
                    <div className="absolute inset-0 z-50 bg-blue-100 bg-opacity-75 border-4 border-blue-500 border-dashed flex items-center justify-center">
                        <p className="text-2xl font-bold text-blue-700">Drop files to upload</p>
                    </div>
                )}

                {/* Header */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10">
                    <div className="flex items-center gap-2 text-gray-600">
                        {/* Mobile Link Toggle */}
                        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden mr-2 p-2 rounded hover:bg-gray-100">
                            <FaBars size={20} />
                        </button>

                        <button onClick={handleUp} className="hover:bg-gray-100 p-2 rounded-full">
                            <span className="font-medium text-lg">My Drive</span>
                        </button>
                        {currentFolder && (
                            <>
                                <span className="text-gray-400">/</span>
                                <span className="text-gray-500 text-sm">...</span>
                            </>
                        )}
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Folders</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                        {structure.folders.map(folder => (
                            <Folder
                                key={folder._id}
                                folder={folder}
                                onClick={() => handleFolderClick(folder._id, folder.name)}
                                onDelete={() => deleteItem(folder._id, 'folder')}
                            />
                        ))}
                    </div>

                    <h3 className="text-sm font-medium text-gray-500 mb-4">Files</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {structure.files.map(file => (
                            <File
                                key={file._id}
                                file={file}
                                onDelete={() => deleteItem(file._id, 'file')}
                            />
                        ))}
                    </div>

                    {structure.folders.length === 0 && structure.files.length === 0 && (
                        <div className="text-center mt-20 text-gray-400">
                            <p className="text-xl">Folder is empty</p>
                            <p className="text-sm mt-2">Drag files here to upload</p>
                        </div>
                    )}
                </main>
            </div>

            {/* Create Folder Modal */}
            {isCreateFolderOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
                        <h3 className="text-lg font-bold mb-4">New Folder</h3>
                        <form onSubmit={createFolder}>
                            <input
                                type="text"
                                className="w-full border p-2 rounded mb-4"
                                placeholder="Folder Name"
                                autoFocus
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateFolderOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    disabled={!newFolderName}
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
