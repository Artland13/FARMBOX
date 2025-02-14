import React from 'react';
import styles from './InputWithTitle.module.scss';

interface Iprops {
  title: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  type: string;
  placeholder?: string;
}

const InputWithTitle = React.forwardRef(
  ({ title, onChange, name, ...props }: Iprops, ref: any) => (
    <div className={styles.root}>
      {title && (
        <label className={styles.title} htmlFor={name}>
          {title}
        </label>
      )}
      <input
        className={styles.input}
        name={name}
        id={name}
        ref={ref}
        onChange={onChange}
        {...props}
      />
    </div>
  )
);

export default InputWithTitle;
