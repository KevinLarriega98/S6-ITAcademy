export const NAME_PATTERN = "^\\p{L}{2,}(?:\\s\\p{L}+)*$"
export const PHONE_PATTERN = "^\\d{9}$"
export const EMAIL_PATTERN = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"

export const NAME_REGEX = new RegExp(NAME_PATTERN, "u")
export const PHONE_REGEX = new RegExp(PHONE_PATTERN)
export const EMAIL_REGEX = new RegExp(EMAIL_PATTERN)

export const isNameValid = (value: string) => NAME_REGEX.test(value)
export const isPhoneValid = (value: string) => PHONE_REGEX.test(value)
export const isEmailValid = (value: string) => EMAIL_REGEX.test(value)

export const normalize = (value: string) => value.trim()