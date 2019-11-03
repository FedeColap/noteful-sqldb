import React from 'react'
import './NotefulForm.css'

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  console.log('the form is used')
  return (
    <div>
      <form
        className={['Noteful-form', className].join(' ')}
        action='#'
        {...otherProps}
      />
      <h1> show me where this is</h1>
    </div>
  )
}
