import classNames from 'classnames';
import React, { useCallback } from 'react';

type Props = React.ComponentPropsWithRef<'button'>;

export const Button: React.VFC<Props> = ({
  className,
  disabled,
  onClick,
  ...rest
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      !disabled && !!onClick && onClick(e);
    },
    [disabled, onClick],
  );
  return (
    <button
      className={classNames(
        'w-full rounded text-center font-bold focus:outline-none',
        {
          'text-secondary-inverted border-secondary-inverted bg-secondary-inverted':
            disabled,
          'text-primary-inverted border-accent-primary-regular bg-accent-primary-regular':
            !disabled,
        },
        className,
      )}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    />
  );
};
