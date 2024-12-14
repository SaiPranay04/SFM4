import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './ProjectBoundary.css';
function ProjectBoundary( ) {
    const [formData, setFormData] = useState({
        carbonSources: [],
        carbonSinks: [],
        carbonReservoirs: [],
        forests: {
            forestType: '',
            protected: '',
            treeSpecies: '',
            vegetationDensity: '',
        },
    });

    const [activeTab, setActiveTab] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((item) => item !== value),
            }));
        } else if (name.startsWith('forests_')) {
            const field = name.replace('forests_', '');
            setFormData((prev) => ({
                ...prev,
                forests: { ...prev.forests, [field]: value },
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/project-boundary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                alert('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }
    };

    const renderTabContent = () => {
        const tabsContent = [
            {
                title: 'Carbon Sources',
                options: [
                    { label: 'Vehicles', value: 'vehicles' },
                    { label: 'Agriculture', value: 'agriculture' },
                    { label: 'Industry', value: 'industry' },
                ],
                name: 'carbonSources',
            },
            {
                title: 'Carbon Sinks',
                options: [
                    { label: 'Trees', value: 'trees' },
                    { label: 'Soil', value: 'soil' },
                    { label: 'Wetlands', value: 'wetlands' },
                ],
                name: 'carbonSinks',
            },
            {
                title: 'Carbon Reservoirs',
                options: [
                    { label: 'Permafrost', value: 'permafrost' },
                    { label: 'Peatlands', value: 'peatlands' },
                ],
                name: 'carbonReservoirs',
            },
        ];

        if (activeTab < 3) {
            const { title, options, name } = tabsContent[activeTab];
            return (
                <>
                    <h2 className="tab-title">{title}</h2>
                    <div className="options-container">
                        {options.map(({ label, value }) => (
                            <div key={value} className="checkbox-container">
                                <label>
                                    <input
                                        type="checkbox"
                                        name={name}
                                        value={value}
                                        onChange={handleChange}
                                    />
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                </>
            );
        }

        return (
            <div className="forests-tab">
                <h2 className="tab-title">Forests</h2>
                <div className="form-fields">
                    {[
                        { label: 'Forest type:', name: 'forests_forestType', type: 'select', options: ['Tropical', 'Rainforest', 'Temperate', 'Mangrove'] },
                        { label: 'Protected:', name: 'forests_protected', type: 'select', options: ['National', 'State', 'None'] },
                        { label: 'Tree species composition:', name: 'forests_treeSpecies', type: 'text' },
                        { label: 'Vegetation density:', name: 'forests_vegetationDensity', type: 'text' },
                    ].map(({ label, name, type, options }) => (
                        <div className="field-container" key={name}>
                            <label htmlFor={name}>{label}</label>
                            {type === 'select' ? (
                                <select name={name} id={name} onChange={handleChange}>
                                    <option value="">Select</option>
                                    {options.map((opt) => (
                                        <option key={opt} value={opt.toLowerCase()}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input type="text" name={name} id={name} onChange={handleChange} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const handlePreview = () => {
        setIsPreviewOpen(true);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text('Project Boundary Form Preview', 10, 10);

        let y = 20;
        Object.entries(formData).forEach(([key, value]) => {
            doc.text(`${key}:`, 10, y);
            const content = Array.isArray(value)
                ? value.join(', ') || 'None selected'
                : typeof value === 'object'
                ? JSON.stringify(value, null, 2)
                : value || 'N/A';
            doc.text(content, 20, y + 10);
            y += 20;
        });

        doc.save('form-preview.pdf');
    };

    return (
        <div className="project-boundary-container">
            <h1>Define Project Boundary</h1>
            <div className="tabs">
                {['Sources', 'Sinks', 'Reservoirs', 'Forests'].map((tab, index) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === index ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="tab-content">{renderTabContent()}</div>
                <div className="form-navigation">
                    {activeTab > 0 && (
                        <button type="button" onClick={() => setActiveTab((prev) => prev - 1)} className="nav-button prev">
                            Previous
                        </button>
                    )}
                    {activeTab < 3 && (
                        <button type="button" onClick={() => setActiveTab((prev) => prev + 1)} className="nav-button next">
                            Next
                        </button>
                    )}
                    {activeTab === 3 && (
                        <>
                            <button type="button" className="preview-button" onClick={handlePreview}>
                                Preview
                            </button>
                            <button type="submit" className="submit-button">Submit</button>
                        </>
                    )}
                </div>
            </form>

            {isPreviewOpen && (
                <div className="preview-modal">
                    <div className="preview-content">
                        <h2>Form Preview</h2>
                        {Object.entries(formData).map(([key, value]) => (
                            <div className="preview-field" key={key}>
                                <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong>{' '}
                                {Array.isArray(value)
                                    ? value.join(', ') || 'None selected'
                                    : typeof value === 'object'
                                    ? JSON.stringify(value, null, 2)
                                    : value || 'N/A'}
                            </div>
                        ))}
                        <div className="preview-actions">
                            <button onClick={downloadPDF} className="download-pdf-btn">
                                Download PDF
                            </button>
                            <button onClick={() => setIsPreviewOpen(false)} className="close-preview-btn">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectBoundary;