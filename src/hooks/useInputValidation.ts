import {useState, useEffect, useCallback} from 'react';
import useDebounce from "./useDebounce.ts";

type ValidationRule = {
    test: (value: string) => boolean;
    message: string;
};

const useInputValidation = (initialValues: Record<string, string>, rules: Record<string, ValidationRule[]>) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validations = Object.keys(values).reduce((acc, key) => {
            const value = values[key];
            const isFieldTouched = touched[key];
            const validationsForField = rules[key] || [];

            let error = '';

            // Perform validation only if the field has been touched (blurred at least once)
            if (isFieldTouched) {
                if (value === '' && isFieldTouched) {
                    error = 'This field is required';
                } else {
                    error = validationsForField
                        .map(rule => rule.test(value) ? '' : rule.message)
                        .find(message => message.length > 0) || '';
                }
            }

            acc[key] = error;
            return acc;
        }, {} as Record<string, string>);

        setErrors(validations);

        const noErrors = Object.values(validations).every(error => error === '');
        const notEmptyValues = Object.values(values).every(value => value !== '');

        setIsValid(noErrors && notEmptyValues);
    }, [values, rules, touched]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // Debounce setting the field as touched
    const debouncedSetTouched = useDebounce((name: string) => {
        setTouched(prev => ({
            ...prev,
            [name]: true,
        }));
    }, 500);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        debouncedSetTouched(name);
    }, [debouncedSetTouched]);

    const clearErrors = () => {
        setErrors({});
        setTouched({});
    };

    return {values, errors, isValid, handleChange, handleBlur, clearErrors};
};

export default useInputValidation;
