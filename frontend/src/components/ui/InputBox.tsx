type InputBoxProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  name?: string;
  id?: string;
  label?: string;
  className?: string;
};

export default function InputBox({
  type = "text",
  id,
  placeholder = "Placeholder here",
  value,
  onChange,
  required,
  name,
  className,
}: InputBoxProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={`${id}`}
        name={name}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`block rounded p-1 px-2 pt-4 w-full text-sm 
                bg-white border border-gray-200 peer focus:outline-none
                 focus:ring-0 ${className}`}
        placeholder=" "
        required={required}
      />
      <label
        htmlFor="firstName"
        className="absolute text-sm text-gray-500  duration-300 transform 
                -translate-y-2.5 scale-75 top-3 z-10 origin-[0] start-2.5
                 peer-placeholder-shown:scale-100
                  peer-placeholder-shown:translate-y-0 
                 peer-focus:scale-75 peer-focus:-translate-y-3
                  rtl:peer-focus:translate-x-1/4 
                 rtl:peer-focus:left-auto"
      >
        {placeholder}
      </label>
    </div>
  );
}
