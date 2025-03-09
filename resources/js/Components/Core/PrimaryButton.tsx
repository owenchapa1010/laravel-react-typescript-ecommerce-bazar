import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={`btn btn-primary ` + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
