import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useController, useFormContext } from 'react-hook-form';

export const FormInput = ({ name, label, type = 'text', placeholder }) => {
    const { control } = useFormContext();
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium">{label}</label>
            <Input
                {...field}
                type={type}
                placeholder={placeholder}
                className="mt-1 block w-full"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export const FormSelect = ({ name, label, options, placeholder }) => {
    const { control } = useFormContext();
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium">{label}</label>
            <select
                {...field}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};
export const FormTextarea = ({ name, label, placeholder }) => {
    const { control } = useFormContext();
    const {
        field,
        fieldState: { error },
    } = useController({ name, control });

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium">{label}</label>
            <Textarea
                {...field}
                placeholder={placeholder}
                className="mt-1 block w-full"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};
