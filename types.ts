import { z } from "zod";

// TODO: add support for non-input form field types
export const SupportedTextInputTypeSchema = z.enum([
	"tel",
	"text",
	"textarea",
	"email",
	"number",
]);

export const SupportedDateInputTypeSchema = z.enum(["date", "datetime"]);

export const SupportedButtonInputTypeSchema = z.enum(["checkbox", "radio"]);
export const SupportedInputTypeSchema = z.union([
	SupportedTextInputTypeSchema.exclude(["textarea"]),
	SupportedDateInputTypeSchema,
	SupportedButtonInputTypeSchema,
]);

export const SupportedFieldTypeSchema = z.union([
	SupportedInputTypeSchema,
	z.literal("textarea"),
	z.literal("select"),
]);

const BaseFormField = z.object({
	name: z
		.string()
		.describe(
			"Corresponds to the `name` attribute on the HTMLInputElement."
		),
	label: z
		.string()
		.nullish()
		.describe(
			"The text that will appear in the field's <label> tag. If left empty, a title case version of `name` will be used."
		),
	type: SupportedFieldTypeSchema.describe(
		"The `type` directly corresponds with the `type` html attribute on `HTMLInputElements`, with the addition of `textarea` and `select`."
	),
	required: z.boolean().optional(),
});

// TODO: add validation that ensures the max is past the minimum

export const MinMaxFormField = BaseFormField.extend({
	min: z
		.number()
		.default(1)
		.describe(
			"For text-based inputs, this is the minimum character count. For number-based inputs, this is the minimum value."
		),
	max: z
		.number()
		.default(250)
		.describe(
			"For text-based inputs, this is the maximum character count. For number-based inputs, this is the maximum value."
		),
	type: BaseFormField.describe(
		"This `type` includes form inputs that can be constrained with minimum / maximum values: `text` (and its derivatives), `textarea`, `number`, etc."
	),
});

export const DateFormField = BaseFormField.extend({
	earliest: z
		.string()
		.date()
		.describe(
			"For text-based inputs, this is the minimum character count. For number-based inputs, this is the minimum value."
		),
	latest: z
		.string()
		.date()
		.optional()
		.describe(
			"For text-based inputs, this is the maximum character count. For number-based inputs, this is the maximum value."
		),
	type: z.enum(["date", "datetime"]),
});

export const TextFormField = MinMaxFormField.extend({
	placeholder: z
		.string()
		.optional()
		.describe("The placeholder for the text input field."),
	defaultValue: z
		.string()
		.optional()
		.describe("The default value for the text input field."),
	type: SupportedTextInputTypeSchema.exclude(["number"]),
});

export const NumberFormField = MinMaxFormField.extend({
	defaultValue: z
		.number()
		.optional()
		.describe("The default value for the text input field."),
	type: z.literal("number"),
});

// TODO: add validation to enforce unique options
export const SelectFormField = BaseFormField.extend({
	type: z.enum(["select", "radio"]),
	defaultValue: z
		.string()
		.optional()
		.describe(
			"The default value for the `<select>` or `<input type='radio' />` field."
		),
	options: z
		.union([z.object({ label: z.string(), value: z.string() }), z.string()])
		.array(),
});

export const CheckboxFormField = BaseFormField.extend({
	type: z.literal("checkbox"),
	defaultValue: z
		.boolean()
		.optional()
		.describe(
			"The default value for the `<input type='checkbox' />` field."
		),
});

export const FormFieldSchema = z.union([
	TextFormField,
	DateFormField,
	SelectFormField,
	CheckboxFormField,
]);
export type SupportedInputType = z.infer<typeof SupportedInputTypeSchema>;
export type SupportedFieldType = z.infer<typeof SupportedFieldTypeSchema>;
export type FormField = z.infer<typeof FormFieldSchema>;
