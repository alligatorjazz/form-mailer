import export type { HTMLAttributes } from "astro/types";
import { z } from "zod";

// TODO: add support for non-input form field types
export const SupportedInputTypeSchema = z.enum([
	"button",
	"checkbox",
	"color",
	"date",
	"datetime-local",
	"email",
	"file",
	"hidden",
	"image",
	"month",
	"number",
	"password",
	"radio",
	"range",
	"reset",
	"search",
	"submit",
	"tel",
	"text",
	"time",
	"url",
	"week",
	"textarea",
]);

export const FormFieldSchema = z.object({
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
	type: SupportedInputTypeSchema.describe(
		"The `type` directly corresponds with the `type` html attribute on `HTMLInputElements`, with the addition of `textarea`."
	),
});

export type SupportedInputexport type = z.infer<typeof SupportedInputTypeSchema>;
export type FormField = z.infer<typeof FormFieldSchema>;
