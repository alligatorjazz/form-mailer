import { z } from "zod";

// TODO: add support for non-input form field types
export const SupportedMinMaxTypeSchema = z.enum([
	"email",
	"number",
	"range",
	"tel",
	"text",
	"textarea"
]);

export const SupportedInputTypeSchema = z.enum([
	"email",
	"number",
	"range",
	"search",
	"tel",
	"text",
	"button",
	"checkbox",
	"color",
	"date",
	"radio"
]);

export const SupportedFieldTypeSchema = z.union([
	SupportedMinMaxTypeSchema,
	SupportedInputTypeSchema,
	z.literal("select"),
]);

export const BaseFormField = z.object({
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
	defaultValue: z
		.string()
		.nullish()
		.describe("The default value of the form field."),

	type: SupportedFieldTypeSchema.describe(
		"The `type` directly corresponds with the `type` html attribute on `HTMLInputElements`, with the addition of `textarea` and `select`."
	),
});

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
	type: SupportedMinMaxTypeSchema.describe(
		"This `type` includes form inputs that can be constrained with minimum / maximum values: `text` (and its derivatives), `textarea`, `number`, etc."
	),
});

export const SelectFormField = BaseFormField.extend({
	type: z.literal("select"),
	options: z.string().array()
});

export const FormFieldSchema = z.union([MinMaxFormField, SelectFormField])
export type SupportedInputType = z.infer<typeof SupportedInputTypeSchema>;
export type SupportedFieldType = z.infer<typeof SupportedFieldTypeSchema>;
export type FormField = z.infer<typeof FormFieldSchema>;
