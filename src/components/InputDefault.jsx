import { Input } from "@material-tailwind/react";

const InputDefault = ({ label, id, type, value, onChange }) => {
    return (
        <div className="w-72">
            <label htmlFor={id} className="block text-gray-700 font-medium mb-1">{label}</label>
            <Input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
        </div>
    )
}

export default InputDefault;    