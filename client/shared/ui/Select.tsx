'use client';

import React from 'react';

interface SelectOption { value: string;
    label: string; }
interface SelectProps extends React.SelectHTMLAttributes < HTMLSelectElement > {
    label ? : string;options: SelectOption[];error ? : string;
}

const Select: React.FC < SelectProps > = ({ label, options, error, id, style, ...rest }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
    {label && (
      <label htmlFor={id} style={{ fontSize: '0.85rem', color: 'var(--fg3)', fontWeight: 600,
        letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label}
      </label>
    )}
    <select id={id}
      style={{ border: `1px solid ${error ? '#e57373' : 'var(--border)'}`, borderRadius: 8,
        padding: '10px 14px', fontSize: '0.95rem', outline: 'none',
        width: '100%', boxSizing: 'border-box', cursor: 'pointer', ...style }}
      {...rest}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    {error && <span style={{ fontSize: '0.8rem', color: '#e57373' }}>{error}</span>}
  </div>
);

export default Select;
