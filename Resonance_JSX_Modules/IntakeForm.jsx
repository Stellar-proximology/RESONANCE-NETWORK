
// IntakeForm.jsx
// Life coaching-style intake: where they are, what they seek, and what they offer

import React, { useState } from 'react';

export function IntakeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    currentState: '',
    seeking: [],
    offering: [],
    openToPods: false
  });

  const seekingOptions = [
    'Love or partnership',
    'Creative collaboration',
    'Healing or growth',
    'Learning or mentorship',
    'Building a project',
    'Adventure or life shift',
    'Just exploring'
  ];

  const offeringOptions = [
    'I’m a creator',
    'I’m a guide or coach',
    'I bring vision or clarity',
    'I stabilize chaos',
    'I offer insight',
    'I generate ideas',
    'I hold space',
    'I get things done'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'seeking') {
      setFormData(prev => ({
        ...prev,
        seeking: checked
          ? [...prev.seeking, value]
          : prev.seeking.filter(v => v !== value)
      }));
    } else if (type === 'checkbox' && name === 'offering') {
      setFormData(prev => ({
        ...prev,
        offering: checked
          ? [...prev.offering, value]
          : prev.offering.filter(v => v !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-6 bg-indigo-950 p-6 rounded-xl shadow-lg" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 font-semibold">Your Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-indigo-800 border border-indigo-600 text-white"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Where are you at in life right now?</label>
        <textarea
          name="currentState"
          value={formData.currentState}
          onChange={handleChange}
          className="w-full p-2 rounded bg-indigo-800 border border-indigo-600 text-white"
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">What are you currently seeking?</label>
        {seekingOptions.map((option) => (
          <label key={option} className="block">
            <input
              type="checkbox"
              name="seeking"
              value={option}
              checked={formData.seeking.includes(option)}
              onChange={handleChange}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      <div>
        <label className="block mb-2 font-semibold">What can you offer?</label>
        {offeringOptions.map((option) => (
          <label key={option} className="block">
            <input
              type="checkbox"
              name="offering"
              value={option}
              checked={formData.offering.includes(option)}
              onChange={handleChange}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      <div className="pt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="openToPods"
            checked={formData.openToPods}
            onChange={handleChange}
            className="mr-2"
          />
          I’m open to being part of a Resonance Pod (group mission)
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full py-2 px-4 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded"
      >
        Continue to Your Field
      </button>
    </form>
  );
}
