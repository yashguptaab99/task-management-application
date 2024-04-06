/* eslint-disable camelcase */
import { $SpecialObject } from 'i18next/typescript/helpers'
import { useTranslation } from 'react-i18next'
import { ZodArray, ZodSchema, ZodString, z } from 'zod'

export type TGuidelineField = FixedTranslation

export class FixedTranslation {
    constructor(public translation: string) {}
}

export const useFieldTranslations = () => {
    const { t } = useTranslation('forms')

    const v = {
        /**
         * Use when an input does not meet the minimum character requirement.
         * @param field key on forms.json
         * @param max number of chars
         */
        STRING_MAX_LENGTH: (field: string, max: number) => t('validations:maxLength', { field, max }),

        /**
         * Use when an input exceeds the maximum character limit.
         * @param field key on forms.json
         * @param min number of chars
         */
        STRING_MIN_LENGTH: (field: string, min: number) => t('validations:minLength', { field, min }),

        /**
         * Use when the number of items selected or uploaded exceeds the maximum allowed limit.
         * @param field key on forms.json
         * @param max number of items
         */
        ARRAY_MAX_LENGTH: (field: string, max: number) => t('validations:arrayMaxLength', { field, max }),

        /**
         * Use when the number of items selected or uploaded is less than the minimum required.
         * @param field key on forms.json
         * @param min number of items
         */
        ARRAY_MIN_LENGTH: (field: string, min: number) => t('validations:arrayMinLength', { field, min }),

        /**
         * Use specifically for login forms when the provided credentials do not match any user account
         * @param field key on forms.json
         */
        INVALID_CREDENTIALS: (field: string) => t('validations:invalidCredentials', { field }),

        /**
         * Use when the provided password is incorrect.
         * @param field key on forms.json
         */
        INVALID_PASSWORD: (field: string) => t('validations:invalidPassword', { field }),

        /**
         * Use when an input is in an incorrect format.
         * @param field key on forms.json
         */
        INVALID: (field: string) => t('validations:invalid', { field }),

        /**
         * Use when a required field is left empty
         * @param field key on forms.json
         */
        EMPTY_FIELD: (field: string) => t('validations:empty', { field }),

        /**
         * Use when at least one of several fields is required to be filled but all are empty.
         * @param fields list of field keys on forms.json
         */
        COMPOSITE_REQUIRED: (fields: string[]) => t('validations:compositeRequired', { fields: fields.join(', ') }),

        /**
         * Use when fields that are supposed to match (like password and confirm password) do not
         * @param field key on forms.json
         */
        FIELDS_NOT_MATCH: (field: string) => t('validations:notMatch', { field }),

        /**
         * Use when an input, such as a username or email, is already in use.
         * @param field key on forms.json
         */
        FIELD_ALREADY_EXISTS: (field: string) => t('validations:alreadyExists', { field }),

        /**
         * Use when a new password provided is the same as the current password.
         * @param field key on forms.json
         */
        NEW_PASSWORD_NOT_VALID: (field: string) => t('validations:newPasswordNoValid', { field }),

        /**
         * Use when a list does not allow two duplicated fields
         * @param field key on forms.json
         */
        NO_DUPLICATES: (field: string) => t('validations:noDuplicates', { field }),

        /**
         * Use during family onboarding partner uniqueness email validation
         */
        PARTNERS_UNIQUE_EMAIL: t('validations:partnersEmailUnique'),

        /**
         * Use during onboarding profile name uniqueness validation
         */
        PROFILE_NAME_TAKEN: t('validations:profileNameTaken'),
    }

    const isFieldConfig = (config: $SpecialObject): config is { label: string; validationFieldName: string } => {
        return 'label' in config
    }

    const fieldNameForValidation = (field: TGuidelineField) => {
        if (field instanceof FixedTranslation) {
            return field.translation.toLowerCase()
        }

        const fieldConfig = t(field, { returnObjects: true })
        if (isFieldConfig(fieldConfig)) {
            const { label, validationFieldName } = fieldConfig
            const text = validationFieldName || label
            return text.toLowerCase()
        }

        return ''
    }

    const optionalHandler = (
        schema: z.ZodString | z.ZodDate | z.ZodArray<z.ZodType, 'many'>,
        optional: boolean = false
    ) => {
        if (!optional) return schema

        if (schema instanceof ZodString)
            return z
                .union([schema, z.string().length(0)])
                .optional()
                .nullish()
                .transform(transforms.undefinedIfEmpty)

        if (schema instanceof ZodString) return schema.optional().nullish().transform(transforms.undefinedIfEmpty)

        if (schema instanceof ZodArray) return z.union([schema, z.array(z.literal('')).length(0).optional()])

        return schema
    }

    /**
     * Use this hook to connect your Zod Schema with our default
     * settings from BuildHero Platform + Internationalization error messages
     *
     * Eg:
     *
     * @example
     * const { guidelines } = useFieldTranslations()
     *
     * const schema = z.object({
     *    name: guidelines.textField('name'),
     *    bio: guidelines.textArea('name', { max: 160 }),
     *    profilePicture: guidelines.avatarInput('profilePicture'),
     *    creatorCategories: guidelines.list('creatorCategories', z.string(), { max: 3 })
     *    primaryLanguage: guidelines.textField('primaryLanguage'),
     *    otherContentLanguage: guidelines.textField('otherContentLanguage').optional(),
     *    equipment: guidelines.list('equipment', z.string()).optional(),
     * })
     *
     */
    const guidelines = {
        /**
         * Default values for TextField inputs
         * @param field key on forms.json
         * @param config defaults to min: 3, max: 120
         */
        textField: (
            field: TGuidelineField,
            { min = 3, max = 120, optional = false }: { min?: number; max?: number; optional?: boolean } = {}
        ) =>
            optionalHandler(
                z
                    .string({
                        required_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                        invalid_type_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                    })
                    .trim()
                    .min(1, { message: v.EMPTY_FIELD(fieldNameForValidation(field)) })
                    .min(min, { message: v.STRING_MIN_LENGTH(fieldNameForValidation(field), min) })
                    .max(max, { message: v.STRING_MAX_LENGTH(fieldNameForValidation(field), max) }),
                optional
            ),

        /**
         * Default values for TextAreas inputs
         * @param field key on forms.json
         * @param config defaults to min: 3, max: 1000
         */
        textArea: (
            field: TGuidelineField,
            { min = 3, max = 1000, optional }: { min?: number; max?: number; optional?: boolean } = {}
        ) =>
            optionalHandler(
                z
                    .string({
                        required_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                        invalid_type_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                    })
                    .trim()
                    .min(1, { message: v.EMPTY_FIELD(fieldNameForValidation(field)) })
                    .min(min, { message: v.STRING_MIN_LENGTH(fieldNameForValidation(field), min) })
                    .max(max, { message: v.STRING_MAX_LENGTH(fieldNameForValidation(field), max) }),
                optional
            ),

        /**
         * Default values for TextField inputs
         * @param field key on forms.json
         * @param config defaults to min: 3, max: 120
         */
        selectField: (field: TGuidelineField, { optional = false }: { optional?: boolean } = {}) =>
            optionalHandler(
                z
                    .string({
                        required_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                        invalid_type_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                    })
                    .trim()
                    .min(1, { message: v.EMPTY_FIELD(fieldNameForValidation(field)) }),
                optional
            ),

        literalField: (field: TGuidelineField, { literal }: { literal: string }) => z.literal(literal),

        /**
         * Default values for Date inputs
         * @param field key on forms.json
         * @param config defaults to optional: false
         */
        date: (field: TGuidelineField, { optional }: { optional?: boolean } = {}) =>
            optionalHandler(
                z.date({
                    required_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                    invalid_type_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                }),
                optional
            ),

        /**
         * Default values for Password inputs
         * @param field key on forms.json
         * @param config defaults to min: 8, max: 64
         */
        password: (field: TGuidelineField, { min = 8, max = 64 }: { min?: number; max?: number } = {}) =>
            z
                .string({
                    required_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                    invalid_type_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                })
                .trim()
                .min(1, { message: v.EMPTY_FIELD(fieldNameForValidation(field)) })
                .min(min, { message: v.STRING_MIN_LENGTH(fieldNameForValidation(field), min) })
                .max(max, { message: v.STRING_MAX_LENGTH(fieldNameForValidation(field), max) }),

        /**
         * Default values for Email inputs
         * @param field key on forms.json
         * @param config defaults to min: 3, max: 120
         */
        email: (field: TGuidelineField, { min = 3, max = 120 }: { min?: number; max?: number } = {}) =>
            z
                .string({
                    required_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                    invalid_type_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                })
                .trim()
                .email(v.INVALID(fieldNameForValidation(field)))
                .min(1, { message: v.EMPTY_FIELD(fieldNameForValidation(field)) })
                .min(min, { message: v.STRING_MIN_LENGTH(fieldNameForValidation(field), min) })
                .max(max, { message: v.STRING_MAX_LENGTH(fieldNameForValidation(field), max) }),

        /**
         * Default values for Avatar inputs
         * @param field key on forms.json
         */
        avatarInput: (field: TGuidelineField) =>
            z.object(
                {
                    info: z.object({
                        url: z.string().url().trim(),
                        fileName: z.string().trim(),
                    }),
                },
                {
                    invalid_type_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                    required_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                }
            ),

        /**
         * Default values for Gallery inputs
         * @param field key on forms.json
         */
        galleryInput: (field: TGuidelineField, { min = 3, max = 100 }: { min?: number; max?: number }) =>
            z
                .array(
                    z.object(
                        {
                            id: z.string().trim(),
                            extension: z.string().trim(),
                            imageUrl: z.string().trim(),
                        },
                        {
                            invalid_type_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                        }
                    ),
                    {
                        required_error: v.EMPTY_FIELD(fieldNameForValidation(field)),
                    }
                )
                .min(min, { message: v.ARRAY_MIN_LENGTH(fieldNameForValidation(field), min) })
                .max(max, { message: v.ARRAY_MAX_LENGTH(fieldNameForValidation(field), max) }),

        /**
         * Default values for list inputs
         * @param field key on forms.json
         * @param schema zod schema that the list contains
         * @param config defaults to min: 3, max: 100
         */
        list: (
            field: TGuidelineField,
            schema: ZodSchema,
            {
                min = 1,
                max = 100,
                optional = false,
                noDuplicates = false,
            }: { min?: number; max?: number; optional?: boolean; noDuplicates?: boolean } = {}
        ) => {
            const result = optionalHandler(
                z
                    .array(schema, { required_error: v.EMPTY_FIELD(fieldNameForValidation(field)) })
                    .min(min, { message: v.ARRAY_MIN_LENGTH(fieldNameForValidation(field), min) })
                    .max(max, { message: v.ARRAY_MAX_LENGTH(fieldNameForValidation(field), max) }),
                optional
            )

            if (noDuplicates) {
                return result.superRefine((val, ctx) => {
                    if (!val) return
                    const equipments = val as string[]
                    if (equipments.length !== new Set(equipments).size) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: v.NO_DUPLICATES(fieldNameForValidation(field)),
                        })
                    }
                })
            }

            return result
        },
    }

    const transforms = {
        undefinedIfEmpty: (value: unknown) => (!value ? undefined : value),
        arrayUndefinedIfEmpty: (value?: unknown[]) => {
            return value?.length === 0 ? undefined : value
        },
    }

    return { validation: v, guidelines, transforms, fieldNameForValidation }
}
