import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

const FlashcardDisplay = ({ cards, onBack, onDeleteCard }) => {
  const cardTypes = {
    education: { label: 'آموزش', color: 'primary', icon: '📚' },
    reminder: { label: 'یادآور', color: 'warning', icon: '⏰' },
    exercise: { label: 'تمرین', color: 'success', icon: '💪' },
    fun: { label: 'فان', color: 'info', icon: '🎉' }
  };

  const priorities = {
    1: { label: 'خیلی کم', color: 'secondary' },
    2: { label: 'کم', color: 'info' },
    3: { label: 'متوسط', color: 'primary' },
    4: { label: 'مهم', color: 'warning' },
    5: { label: 'فوری', color: 'danger' }
  };

  const sortedCards = React.useMemo(
    () => [...cards].sort((a, b) => Number(b.priority) - Number(a.priority)),
    [cards]
  );

  return (
    <div className="min-vh-100 d-flex flex-column" dir="rtl"
         style={{ 
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           padding: '20px'
         }}>
      <div className="container mb-4">
        <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
          <div className="card-header text-white text-center" 
               style={{ 
                 background: 'linear-gradient(45deg, #667eea, #764ba2)',
                 padding: '20px'
               }}>
            <div className="d-flex justify-content-between align-items-center">
              <div style={{ width: '80px' }}></div>
              <h3 className="mb-0">📚 کارت‌های اطلاعاتی ({cards.length})</h3>
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={onBack}
                style={{ borderRadius: '10px' }}
              >
                بازگشت →
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex-grow-1">
        {cards.length === 0 ? (
          <div className="text-center text-white">
            <div className="card bg-transparent border-white border-2" style={{ borderRadius: '15px' }}>
              <div className="card-body py-5">
                <h4>📝 هیچ کارتی موجود نیست</h4>
                <p>اولین کارت خود را ایجاد کنید!</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {sortedCards.map((card) => (
              <div key={card.id} className="col-lg-6 col-xl-4">
                <div className="card h-100 shadow-lg border-0" 
                     style={{ 
                       borderRadius: '15px',
                       transition: 'all 0.3s ease',
                       transform: 'translateY(0)',
                       animation: `fadeInUp 0.5s ease both`
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-5px)';
                       e.currentTarget.style.exShadow = '0 15px 35px rgba(0,0,0,0.2)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                     }}>
                  <div className={`card-header bg-${cardTypes[card.type].color} text-white position-relative`}
                       style={{ borderRadius: '15px 15px 0 0' }}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="d-flex flex-column align-items-start">
                        <span className={`badge bg-${priorities[card.priority].color} mb-1`}
                              style={{ fontSize: '12px' }}>
                          {'⭐'.repeat(card.priority)}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-light"
                          onClick={() => onDeleteCard(card.id)}
                          aria-label={`حذف کارت ${card.title}`}
                          style={{ 
                            width: '30px', 
                            height: '30px',
                            borderRadius: '50%',
                            padding: '0'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                      <div className="flex-grow-1 text-end">
                        <h5 className="card-title mb-1" style={{ fontWeight: '600' }}>
                          {card.title} {cardTypes[card.type].icon}
                        </h5>
                        <small className="opacity-75">
                          {cardTypes[card.type].label}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted mb-3 text-end" style={{ fontSize: '14px' }}>
                      {card.description}
                    </p>
                    {card.tags.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 justify-content-end">
                        {card.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="badge bg-dark text-light"
                            style={{ 
                              fontSize: '11px',
                              borderRadius: '12px',
                              padding: '4px 8px'
                            }}
                          >
                            {tag} 🏷️
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-transparent border-0 pt-0 text-end">
                    <small className="text-muted">
                      📅 {new Date(card.createdAt).toLocaleDateString('fa-IR')}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

const FlashcardForm = () => {
  const [currentView, setCurrentView] = useState('form');
  const [cards, setCards] = useState([]);
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
    if (!isFormValid()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newCard = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setCards(prev => [...prev, newCard]);
    setFormData({
      title: '',
      description: '',
      type: '',
      priority: '',
      tags: []
    });
    setIsSubmitting(false);
    setCurrentView('display');
  };

  const handleDeleteCard = (id) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این کارت را حذف کنید؟')) {
      setCards(prev => prev.filter(card => card.id !== id));
    }
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

  if (currentView === 'display') {
    return (
      <FlashcardDisplay 
        cards={cards} 
        onBack={() => setCurrentView('form')}
        onDeleteCard={handleDeleteCard}
      />
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" dir="rtl"
         style={{ 
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           padding: '20px'
         }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        <div className="card shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <div className="card-header text-white text-center position-relative" 
               style={{ 
                 background: 'linear-gradient(45deg, #667eea, #764ba2)',
                 padding: '30px 20px'
               }}>
            <div className="d-flex justify-content-between align-items-center">
              <div style={{ width: '120px' }}></div>
              <div className="text-center">
                <h2 className="mb-0" style={{ fontWeight: '700' }}>
                  📝 فرم ثبت کارت اطلاعاتی
                </h2>
                <p className="mb-0 mt-2" style={{ fontSize: '16px', opacity: 0.9 }}>
                  جایگزین هوشمند دفترچه یادداشت
                </p>
              </div>
              <div style={{ width: '120px' }}>
                {cards.length > 0 && (
                  <button 
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setCurrentView('display')}
                    style={{ borderRadius: '10px' }}
                  >
                    مشاهده کارت‌ها ({cards.length}) 📚
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="card-body p-4" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label fw-bold text-dark mb-2">
                🏷️ عنوان *
              </label>
              <input
                type="text"
                className="form-control form-control-lg shadow-sm"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="عنوان کارت را وارد کنید"
                style={{ 
                  borderRadius: '12px',
                  border: '2px solid #e9ecef',
                  transition: 'all 0.3s ease',
                  textAlign: 'right'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="form-label fw-bold text-dark mb-2">
                📄 توضیح *
              </label>
              <textarea
                className="form-control shadow-sm"
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="توضیحات کارت را وارد کنید"
                style={{ 
                  borderRadius: '12px',
                  border: '2px solid #e9ecef',
                  transition: 'all 0.3s ease',
                  resize: 'vertical',
                  textAlign: 'right'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
              />
            </div>
            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="type" className="form-label fw-bold text-dark mb-2">
                  🎯 نوع کارت *
                </label>
                <select
                  className="form-select form-select-lg shadow-sm"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    borderRadius: '12px',
                    border: '2px solid #e9ecef',
                    textAlign: 'right'
                  }}
                >
                  <option value="">انتخاب کنید</option>
                  {cardTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} {type.icon}
                    </option>
                  ))}
                </select>
                {formData.type && (
                  <div className="mt-2 text-end">
                    <span className={`badge bg-${getSelectedTypeInfo()?.color} px-3 py-2`} 
                          style={{ fontSize: '14px', borderRadius: '8px' }}>
                      {getSelectedTypeInfo()?.label} {getSelectedTypeInfo()?.icon}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="priority" className="form-label fw-bold text-dark mb-2">
                  ⭐ اولویت *
                </label>
                <select
                  className="form-select form-select-lg shadow-sm"
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    borderRadius: '12px',
                    border: '2px solid #e9ecef',
                    textAlign: 'right'
                  }}
                >
                  <option value="">انتخاب کنید</option>
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
                {formData.priority && (
                  <div className="mt-2 text-end">
                    <span className={`badge bg-${getSelectedPriorityInfo()?.color} px-3 py-2`} 
                          style={{ fontSize: '14px', borderRadius: '8px' }}>
                      {getSelectedPriorityInfo()?.label} {'⭐'.repeat(parseInt(formData.priority))}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label fw-bold text-dark mb-2">
                🏷️ تگ‌ها (حداکثر 7 تگ)
              </label>
              <div className="input-group shadow-sm mb-3">
                <button
                  type="button"
                  className="btn btn-outline-primary position-absolute start-0 top-0 h-100 px-3"
                  onClick={handleAddTag}
                  disabled={!currentTag.trim() || formData.tags.length >= 7 || formData.tags.includes(currentTag.trim())}
                  style={{ 
                    borderRadius: '0 12px 12px 0',
                    zIndex: 10,
                    border: 'none'
                  }}
                >
                  ➕
                </button>
                <input
                  type="text"
                  className="form-control border-0"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="تگ جدید را وارد کنید"
                  disabled={formData.tags.length >= 7}
                  style={{ borderRadius: '0', textAlign: 'right', paddingRight: '80px' }}
                />
                <span className="input-group-text bg-light border-0" style={{ borderRadius: '12px 0 0 12px' }}>
                  🔖
                </span>
              </div>
              <div className=" d-flex flex-wrap gap-2 mb-3 justify-content-end">
                {formData.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-dark badge bg-gradient d-flex align-items-center gap-2 px-3 py-2"
                    style={{ 
                      fontSize: '14px',
                      borderRadius: '20px',
                      background: `linear-gradient(45deg, hsl(${index * 50}, 70%, 60%), hsl(${index * 50 + 30}, 70%, 70%))`,
                      color: 'white',
                      animation: 'fadeIn 0.3s ease-in'
                    }}
                  >
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      style={{ 
                        fontSize: '10px',
                        filter: 'brightness(0) invert(1)'
                      }}
                      onClick={() => handleRemoveTag(tag)}
                    />
                    {tag} 🏷️
                  </span>
                ))}
              </div>
              <div className="progress mb-2" style={{ height: '8px', borderRadius: '4px' }}>
                <div 
                  className="progress-bar bg-gradient"
                  style={{ 
                    width: `${(formData.tags.length / 7) * 100}%`,
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
              <small className="text-muted d-flex justify-content-between">
                <span>{formData.tags.length}/7 تگ اضافه شده</span>
                <span>{7 - formData.tags.length} تگ باقی مانده</span>
              </small>
            </div>
            {!isFormValid() && (
              <div className="alert alert-warning mt-3">
                لطفاً تمام فیلدهای اجباری را پر کنید.
              </div>
            )}
            <div className="d-grid">
              <button 
                type="button" 
                className={`btn btn-lg shadow-lg ${isFormValid() ? 'btn-success' : 'btn-secondary'}`}
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                style={{ 
                  borderRadius: '12px',
                  padding: '15px',
                  fontSize: '18px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
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
                <h6 className="text-muted mb-2 text-end">📋 پیش نمایش کارت:</h6>
                <h5 className="mb-2 text-end">{formData.title}</h5>
                <p className="text-muted small mb-2 text-end">{formData.description}</p>
                <div className="d-flex gap-2 flex-wrap justify-content-end">
                  {getSelectedTypeInfo() && (
                    <span className={`badge bg-${getSelectedTypeInfo().color}`}>
                      {getSelectedTypeInfo().label} {getSelectedTypeInfo().icon}
                    </span>
                  )}
                  {getSelectedPriorityInfo() && (
                    <span className={`badge bg-${getSelectedPriorityInfo().color}`}>
                      {getSelectedPriorityInfo().label} {'⭐'.repeat(parseInt(formData.priority))}
                    </span>
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
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        .card {
          transition: all 0.3s ease;
        }
        .badge {
          transition: all 0.3s ease;
        }
        .badge:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default FlashcardForm;