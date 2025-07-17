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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardTypes = [
    { value: 'education', label: 'آموزش', color: 'primary', icon: '📚' },
    { value: 'reminder', label: 'یادآور', color: 'warning', icon: '⏰' },
    { value: 'exercise', label: 'تمرین', color: 'success', icon: '💪' },
    { value: 'fun', label: 'فان', color: 'info', icon: '🎉' }
  ];

  const priorities = [
    { value: 1, label: 'خیلی کم', color: 'secondary' },
    { value: 2, label: 'کم', color: 'info' },
    { value: 3, label: 'متوسط', color: 'primary' },
    { value: 4, label: 'مهم', color: 'warning' },
    { value: 5, label: 'فوری', color: 'danger' }
  ];

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Form submitted:', formData);
    setFormData({
      title: '',
      description: '',
      type: '',
      priority: '',
      tags: []
    });
    setIsSubmitting(false);
    alert('کارت اطلاعاتی با موفقیت ثبت شد!');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const getSelectedTypeInfo = () => {
    return cardTypes.find(type => type.value === formData.type);
  };

  const getSelectedPriorityInfo = () => {
    return priorities.find(priority => priority.value === parseInt(formData.priority));
  };

  const isFormValid = () => {
    return formData.title.trim() && formData.description.trim() && formData.type && formData.priority;
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ background: 'linear-gradient(135deg, #6b7280 0%, #374151 100%)', padding: '20px', direction: 'rtl', textAlign: 'right' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="card shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <div className="card-header text-white text-center position-relative" 
               style={{ background: 'linear-gradient(45deg, #6b7280, #374151)', padding: '30px 20px' }}>
            <div className="position-absolute top-0 start-0 w-100 h-100" 
                 style={{ background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', opacity: 0.3 }}></div>
            <h2 className="mb-0 position-relative" style={{ fontWeight: '700' }}>📝 فرم ثبت کارت اطلاعاتی</h2>
            <p className="mb-0 mt-2 position-relative" style={{ fontSize: '16px', opacity: 0.9 }}>جایگزین هوشمند دفترچه یادداشت</p>
          </div>

          <div className="card-body p-4" style={{ backgroundColor: '#f9fafb' }}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label fw-bold text-dark mb-2">🏷️ عنوان *</label>
              <input
                type="text"
                className="form-control form-control-lg shadow-sm"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="عنوان کارت را وارد کنید"
                style={{ borderRadius: '12px', border: '2px solid #e5e7eb', transition: 'all 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = '#4b5563'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="form-label fw-bold text-dark mb-2">📄 توضیح *</label>
              <textarea
                className="form-control shadow-sm"
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="توضیحات کارت را وارد کنید"
                style={{ borderRadius: '12px', border: '2px solid #e5e7eb', transition: 'all 0.3s ease', resize: 'vertical' }}
                onFocus={(e) => e.target.style.borderColor = '#4b5563'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="type" className="form-label fw-bold text-dark mb-2">🎯 نوع کارت *</label>
                <select
                  className="form-select form-select-lg shadow-sm"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  style={{ borderRadius: '12px', border: '2px solid #e5e7eb' }}
                >
                  <option value="">انتخاب کنید</option>
                  {cardTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.icon} {type.label}</option>
                  ))}
                </select>
                {formData.type && (
                  <div className="mt-2">
                    <span className={`badge bg-${getSelectedTypeInfo()?.color} px-3 py-2`} style={{ fontSize: '14px', borderRadius: '8px' }}>
                      {getSelectedTypeInfo()?.icon} {getSelectedTypeInfo()?.label}
                    </span>
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="priority" className="form-label fw-bold text-dark mb-2">⭐ اولویت *</label>
                <select
                  className="form-select form-select-lg shadow-sm"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                  style={{ borderRadius: '12px', border: '2px solid #e5e7eb' }}
                >
                  <option value="">انتخاب کنید</option>
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                  ))}
                </select>
                {formData.priority && (
                  <div className="mt-2">
                    <span className={`badge bg-${getSelectedPriorityInfo()?.color} px-3 py-2`} style={{ fontSize: '14px', borderRadius: '8px' }}>
                      {'⭐'.repeat(parseInt(formData.priority))} {getSelectedPriorityInfo()?.label}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold text-dark mb-2">🏷️ تگ‌ها (حداکثر 7 تگ)</label>
              <div className="input-group shadow-sm mb-3">
                <span className="input-group-text bg-light border-0" style={{ borderRadius: '12px 0 0 12px' }}>🔖</span>
                <input
                  type="text"
                  className="form-control border-0"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="تگ جدید را وارد کنید"
                  disabled={formData.tags.length >= 7}
                  style={{ borderRadius: '0 12px 12px 0' }}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary position-absolute start-0 top-0 h-100 px-3"
                  onClick={handleAddTag}
                  disabled={!currentTag.trim() || formData.tags.length >= 7 || formData.tags.includes(currentTag.trim())}
                  style={{ borderRadius: '12px 0 0 12px', zIndex: 10, border: 'none' }}
                >
                  ➕
                </button>
              </div>
              <div className="d-flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="badge bg-gradient d-flex align-items-center gap-2 px-3 py-2"
                    style={{ fontSize: '14px', borderRadius: '20px', background: `linear-gradient(45deg, hsl(${index * 50}, 70%, 60%), hsl(${index * 50 + 30}, 70%, 70%))`, color: 'white', animation: 'fadeIn 0.3s ease-in' }}
                  >
                    🏷️ {tag}
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      style={{ fontSize: '10px', filter: 'brightness(0) invert(1)' }}
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </span>
                ))}
              </div>
              <div className="progress mb-2" style={{ height: '8px', borderRadius: '4px' }}>
                <div 
                  className="progress-bar bg-gradient"
                  style={{ width: `${(formData.tags.length / 7) * 100}%`, background: 'linear-gradient(45deg, #6b7280, #374151)', transition: 'width 0.3s ease' }}
                />
              </div>
              <small className="text-muted d-flex justify-content-between">
                <span>{formData.tags.length}/7 تگ اضافه شده</span>
                <span>{7 - formData.tags.length} تگ باقی مانده</span>
              </small>
            </div>

            <div className="d-grid">
              <button 
                type="button" 
                className={`btn btn-lg shadow-lg ${isFormValid() ? 'btn-success' : 'btn-secondary'}`}
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                style={{ borderRadius: '12px', padding: '15px', fontSize: '18px', fontWeight: '600', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden' }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    در حال ثبت...
                  </>
                ) : (
                  <>
                    💾 ثبت کارت اطلاعاتی
                  </>
                )}
              </button>
            </div>

            {isFormValid() && (
              <div className="mt-4 p-3 bg-white rounded-3 shadow-sm border-end border-5 border-primary">
                <h6 className="text-muted mb-2">📋 پیش نمایش کارت:</h6>
                <h5 className="mb-2">{formData.title}</h5>
                <p className="text-muted small mb-2">{formData.description}</p>
                <div className="d-flex gap-2 flex-wrap">
                  {getSelectedTypeInfo() && (
                    <span className={`badge bg-${getSelectedTypeInfo().color}`}>{getSelectedTypeInfo().icon} {getSelectedTypeInfo().label}</span>
                  )}
                  {getSelectedPriorityInfo() && (
                    <span className={`badge bg-${getSelectedPriorityInfo().color}`}>{'⭐'.repeat(parseInt(formData.priority))} {getSelectedPriorityInfo().label}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-control:focus, .form-select:focus {
          box-shadow: 0 0 0 0.2rem rgba(107, 114, 128, 0.25) !important;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .card {
          transition: all 0.3s ease;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        .badge {
          transition: all 0.3s ease;
        }
        .badge:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .form-label, .card-header, .card-body, .badge, button, input, select, textarea {
          font-family: 'Vazirmatn', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default FlashcardForm;