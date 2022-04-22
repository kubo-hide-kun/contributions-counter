import classNames from 'classnames';
import React, { forwardRef, useCallback } from 'react';

type Props = React.ComponentPropsWithRef<'textarea'>;

export const TextArea: React.VFC<Props> = forwardRef<
  HTMLTextAreaElement,
  Props
>(function TextArea({ className, disabled, onChange, ...rest }, ref) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      !disabled && !!onChange && onChange(e);
    },
    [disabled, onChange],
  );
  return (
    <textarea
      ref={ref}
      className={classNames(
        'p-4 bg-secondary-regular border-secondary-regular focus:outline-none',
        className,
      )}
      onChange={handleChange}
      {...rest}
    />
  );
});

// width: 92%;
// max-width: 600px;
// height: 126px;
// margin-bottom: 24px;
// padding: 12px;
// border: 1px solid #e1e5e7;
// border-radius: 4px;
// box-sizing: border-box;
// background: #fbf9f5;
// color: #2b546a;
// font-weight: bold;
// font-size: 1.5rem;
