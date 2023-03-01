
export type validatorType = (value: string) => string | undefined


export const required: validatorType = (value) => {
    return value ? undefined : 'Поле обязательно для ввода';
};

export const maxLengthCreator = (maxLength: number): validatorType => (value) => {
    return value.length > maxLength
        ? `Максимальное кол-во символов - ${maxLength}`
        : undefined;
};


