import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Import your custom CSS file

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('File upload failed!');
        }
    };

    return (
        <div className="file-upload-container">
            {/* Download Section */}
            <div className="download-section">
                <h3>Download Excel Template</h3>
                <p>Please download and fill in the template below with your data before uploading it.</p>
                <a href="/template.xlsx" download="template.xlsx">
                    <button type="button" className="btn download-btn">Download Template</button>
                </a>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleFileUpload} className="upload-form">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="file-input"
                />
                <button type="submit" className="btn upload-btn">Upload Excel</button>
            </form>
        </div>
    );
};

export default FileUpload;
