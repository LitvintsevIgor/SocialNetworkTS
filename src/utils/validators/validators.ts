
export type FieldValidatorType = (value: string) => string | undefined

export const required:FieldValidatorType = (value) => {
    if (value) return undefined;
    return "Field should be required"
}

export const maxLengthCreator = (maxValue: number):FieldValidatorType => (value) => {
    if (value && value.length < maxValue) return undefined
    return `Max length ${maxValue} symbols`
}