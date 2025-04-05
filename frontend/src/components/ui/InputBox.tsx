type InputBoxProps = {
    type?: string; // Type of the input field (e.g., text, password, email)
    placeholder?: string; // Placeholder text for the input field
    value?: string; // Current value of the input field
    onChange?: (value: string) => void; // Callback function to handle changes in the input field
    required?: boolean; // Indicates if the input field is required
    name?: string; // Name attribute for the input field
    classname?: string; // Additional class names for styling
  };
  
  export default function InputBox({
    type = "text",
    placeholder = "Placeholder here",
    value,
    onChange,
    required,
    name,
    classname,
  }: InputBoxProps) {
    return (
      <div className={`relative ${classname}`}> {/* Apply classname to the container */}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`block w-full rounded-sm border-2 px-4 py-2 focus:outline-mayormoto-blue text-sm 
                       border-mayormoto-blue font-normal`}
          required={required} // Indicates if the input field is required
          name={name} // Name attribute for the input field
        />
      </div>
    );
  }