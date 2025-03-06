interface ButtonProps {
    label: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label}) => {
    return <button>{label}</button>;
};

export default Button;
