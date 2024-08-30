import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactForm.module.css';

type InquiryType =
  | '製品について'
  | 'サービスについて'
  | '採用について'
  | 'その他';

const questions = [
  { id: 'name', label: '氏名', type: 'text', required: true },
  { id: 'email', label: 'メールアドレス', type: 'email', required: true },
  {
    id: 'inquiryType',
    label: '問い合わせ内容',
    type: 'select',
    required: true,
    options: ['製品について', 'サービスについて', '採用について', 'その他'],
  },
  { id: 'company', label: '会社名', type: 'text', required: false },
  { id: 'otherInquiry', label: 'その他', type: 'textarea', required: false },
];

const ContactForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setCurrentStep(Object.keys(JSON.parse(savedData)).length);
    }
  }, []);

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [id]: value };
      localStorage.setItem('contactFormData', JSON.stringify(newData));
      return newData;
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // ここにフォーム送信のロジックを追加
    localStorage.removeItem('contactFormData');
    setFormData({});
    setCurrentStep(0);
  };

  const currentQuestion = questions[currentStep];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>お問い合わせフォーム</h2>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.formGroup}>
            <label htmlFor={currentQuestion.id}>
              {currentQuestion.label}
              {currentQuestion.required && (
                <span className={styles.required}>*</span>
              )}
            </label>
            {currentQuestion.type === 'select' ? (
              <select
                id={currentQuestion.id}
                value={formData[currentQuestion.id] || ''}
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                required={currentQuestion.required}
              >
                <option value="">選択してください</option>
                {currentQuestion.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : currentQuestion.type === 'textarea' ? (
              <textarea
                id={currentQuestion.id}
                value={formData[currentQuestion.id] || ''}
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                required={currentQuestion.required}
              />
            ) : (
              <input
                type={currentQuestion.type}
                id={currentQuestion.id}
                value={formData[currentQuestion.id] || ''}
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                required={currentQuestion.required}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className={styles.buttonGroup}>
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className={styles.secondaryButton}
          >
            戻る
          </button>
        )}
        {currentStep < questions.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className={styles.primaryButton}
          >
            次へ
          </button>
        ) : (
          <button type="submit" className={styles.submitButton}>
            送信
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
