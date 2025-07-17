import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';

const FlashcardForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    priority: '',
    tags: []
  });

  const [currentTag, setCurrentTag] = useState('');

  const cardTypes = [
    { value: 'education', label: 'آموزش' },
    { value: 'reminder', label: 'یادآور' },
    { value: 'exercise', label: 'تمرین' },
    { value: 'fun', label: 'فان' }
  ];

  const priorities = [1, 2, 3, 4, 5];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && formData.tags.length < 7 && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ background: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)', padding: '20px', direction: 'rtl', textAlign: 'right' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="card shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <div className="card-header bg-primary text-white text-center">
            <h3 className="mb-0">فرم ثبت کارت اطلاعاتی</h3>
          </div>
          <div className="card-body">
            <div onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-bold">عنوان *</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="عنوان کارت را وارد کنید"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold">توضیح *</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="توضیحات کارت را وارد کنید"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label fw-bold">نوع کارت *</label>
                <select
                  className="form-select"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">نوع کارت را انتخاب کنید</option>
                  {cardTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="priority" className="form-label fw-bold">اولویت *</label>
                <select
                  className="form-select"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">اولویت را انتخاب کنید</option>
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">تگ‌ها (حداکثر 7 تگ)</label>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="تگ جدید را وارد کنید"
                    disabled={formData.tags.length >= 7}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleAddTag}
                    disabled={!currentTag.trim() || formData.tags.length >= 7 || formData.tags.includes(currentTag.trim())}
                  >
                    افزودن
                  </button>
                </div>
                
                <div className="d-flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary d-flex align-items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        style={{ fontSize: '10px' }}
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </span>
                  ))}
                </div>
                
                <small className="text-muted">
                  {formData.tags.length}/7 تگ اضافه شده
                </small>
              </div>

              <div className="d-grid">
                <button type="button" className="btn btn-success btn-lg" onClick={handleSubmit}>
                  ثبت کارت اطلاعاتی
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardForm;