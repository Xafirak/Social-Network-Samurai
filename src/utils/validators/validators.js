export const required = (value) => {
    return value ? undefined : 'Поле обязательно для ввода';
};

export const maxLengthCreator = (maxLength) => (value) => {
    return value.length > maxLength
        ? `Максимальное кол-во символов - ${maxLength}`
        : undefined;
};


