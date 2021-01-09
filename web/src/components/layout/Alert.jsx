import React from 'react';
import './css/Alert.css';

const alertStyle = {
  backgroundColor: '#151515',
  color: 'white',
  padding: '10px',
  textTransform: 'uppercase',
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
  fontFamily: 'Arial',
  width: '300px',
  boxSizing: 'border-box'
}

const buttonStyle = {
  marginLeft: '20px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#FFFFFF'
}

const BaseIcon = ({ color, pushRight = true, children }) => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      style={{ marginRight: pushRight ? '20px' : '0', minWidth: 24 }}
    >
      {children}
    </svg>
)

const Alert = ({ message, options, style, close }) => {
  const SuccessIcon = (<BaseIcon color='#31B404'>
                          <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
                          <polyline points='22 4 12 14.01 9 11.01' />
                       </BaseIcon>);

  const ErrorIcon = (<BaseIcon color='#FF0040'>
                         <circle cx='12' cy='12' r='10' />
                         <line x1='12' y1='8' x2='12' y2='12' />
                         <line x1='12' y1='16' x2='12' y2='16' />
                      </BaseIcon>);

  const CloseIcon = (<BaseIcon color='#FFFFFF' pushRight={false}>
                        <line x1='18' y1='6' x2='6' y2='18' />
                        <line x1='6' y1='6' x2='18' y2='18' />
                    </BaseIcon>);

  return (
    <div style={{ ...alertStyle, ...style }} className ='alert'>
      {options.type === 'success' ? SuccessIcon: null}
      {options.type === 'error' ? ErrorIcon : null}
      <span style={{ flex: 2 }}>{message}</span>
      <button onClick={close} style={buttonStyle}>
        {CloseIcon}
      </button>
    </div>
  )
}

export default Alert;