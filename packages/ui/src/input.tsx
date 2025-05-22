interface InputProps {
    type: string,
    value: string,
    placeholder: string,
    handleChange: (e:  React.ChangeEvent<HTMLInputElement>) => void,
    className?: string

}

const Input = ({type, value, placeholder, handleChange, className}: InputProps) => {
    return <input 
    value={value}
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    className={className}
    />
}

export default Input;