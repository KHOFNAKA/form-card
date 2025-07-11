import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
function FlashCardForm({ cardToEdit, onSubmit = () => {}, onCancel = () => {} }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cardToEdit) {
      setTitle(cardToEdit.title);
      setDescription(cardToEdit.description);
      setType(cardToEdit.type);
      setPriority(cardToEdit.priority);
      setTags(cardToEdit.tags);
      setCreatedAt(cardToEdit.createdAt);
      setUpdatedAt(cardToEdit.updatedAt);
    }
  }, [cardToEdit]);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tags.length >= 7) {
      setError("حداکثر ۷ تگ مجاز است!");
      return;
    }
    if (tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      setError("");
    }
  };

  const handleRemoveTag = (removeIndex) => {
    setTags(tags.filter((_, idx) => idx !== removeIndex));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !type || !priority) {
      setError("عنوان، نوع و اولویت اجباری هستند!");
      return;
    }

    const flashCard = {
      id: cardToEdit ? cardToEdit.id :Date.now(), // برای شناسایی کارت
      title, 
      description,
      type,
      priority,
      tags,
      createdAt: cardToEdit ? createdAt : new Date().toLocaleString(),
      updatedAt: cardToEdit ? new Date().toLocaleString() : null,
    };

    const storedCards = JSON.parse(localStorage.getItem("flashCards") || "[]");
    if (cardToEdit) {
      const updatedCards = storedCards.map((card) =>
        card.id === cardToEdit.id ? flashCard : card
      );
      localStorage.setItem("flashCards", JSON.stringify(updatedCards));
    } else {
      localStorage.setItem("flashCards", JSON.stringify([...storedCards, flashCard]));
    }

    onSubmit(flashCard);
    setTitle("");
    setDescription("");
    setType("");
    setPriority("");
    setTags([]);
    setTagInput("");
    setCreatedAt(null);
    setUpdatedAt(null);
    setError("");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setType("");
    setPriority("");
    setTags([]);
    setTagInput("");
    setError("");
    onCancel();
  };

  return (
    <div className="card p-4 bg-dark text-light" dir="rtl" style={{ maxWidth: '500px', margin: 'auto' }}>
      <h4 className="mb-3 text-center">{cardToEdit ? "ویرایش فلش‌کارت" : "ساخت فلش‌کارت جدید"}</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control bg-secondary text-light border-0"
            placeholder="عنوان کارت"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control bg-secondary text-light border-0"
            placeholder="توضیحات"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <select
            className="form-select bg-secondary text-light border-0"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">نوع کارت را انتخاب کنید</option>
            <option value="آموزش">آموزش</option>
            <option value="یادآور">یادآور</option>
            <option value="تمرین">تمرین</option>
            <option value="فان">فان</option>
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-select bg-secondary text-light border-0"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">اولویت را انتخاب کنید</option>
            <option value="1">۱</option>
            <option value="2">۲</option>
            <option value="3">۳</option>
            <option value="4">۴</option>
            <option value="5">۵</option>
          </select>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control bg-secondary text-light border-0"
            placeholder="برچسب جدید"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTag(e)}
          />
          <button className="btn btn-outline-light" onClick={handleAddTag} type="button">
            افزودن برچسب
          </button>
        </div>
        <div className="mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="badge bg-info text-dark ms-1 mb-1" style={{ fontSize: '1em', position: 'relative' }}>
              {tag}
              <button
                type="button"
                className="btn-close btn-close-white ms-1"
                aria-label="حذف"
                style={{ fontSize: '0.7em', marginRight: '5px' }}
                onClick={() => handleRemoveTag(index)}
              ></button>
            </span>
          ))}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success w-100" type="submit">
            {cardToEdit ? "ویرایش" : "ثبت کارت"}
          </button>
          <button className="btn btn-danger w-100" type="button" onClick={handleCancel}>
            لغو
          </button>
        </div>
      </form>
    </div>
  );
}

export default FlashCardForm;