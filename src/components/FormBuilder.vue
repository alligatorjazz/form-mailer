<script setup lang="ts">
import { ref } from "vue";
import {
	CheckboxFormFieldSchema,
	DateFormFieldSchema,
	NumberFormFieldSchema,
	SelectFormFieldSchema,
	TextFormFieldSchema,
	type CheckboxFormField,
	type DateFormField,
	type FormField,
	type NumberFormField,
	type SelectFormField,
	type TextFormField,
} from "../../types";
import ModularForm from "./ModularForm.vue";
import { titleCaseToCamelCase } from "../../lib";

const testFields: FormField[] = [
	{ name: "firstName", type: "text", min: 1, max: 80 },
	{ name: "lastName", type: "text", min: 1, max: 80 },
	{ name: "email", type: "email", min: 1, max: 80 },
	{ name: "phone", type: "tel", min: 4, max: 15 },
	{ name: "isCool", type: "checkbox", label: "Are You Cool?" },
	{
		name: "radLevel",
		type: "radio",
		options: ["1", "2", "3"],
		label: "Radness Level",
	},
	{ name: "message", type: "textarea", min: 10, max: 250 },
];

const advanced = ref(false);
const newField = ref<FormField>({
	type: "text",
	label: "New Field",
	required: true,
	name: "newField",
	min: 0,
	max: 1,
});

// // base fields
// const newField.type = ref<FormField["type"]>("text");
// const fieldLabel = ref<FormField["label"]>();
// const required = ref<FormField["required"]>(true);

// // minmax fields
// const min = ref<MinMaxFormField["min"] | null>(null);
// const max = ref<MinMaxFormField["max"] | null>(null);

// // text and number fields
// const placeholder = ref<TextFormField["placeholder"]>("Field Title");
// const defaultValue = ref<
// 	| TextFormField["defaultValue"]
// 	| NumberFormField["defaultValue"]
// 	| CheckboxFormField["defaultValue"]
// >();

// // date fields
// const after = ref<DateFormField["after"] | null>(null);
// const before = ref<DateFormField["before"] | null>(null);

// // select fields
// // TODO: mandate that there be at least two options
// const options = ref<SelectFormField["options"]>([]);

const handleSubmit = () => {
	// const baseFieldData = {
	// 	type: newField.type,
	// 	name: titleCaseToCamelCase(),
	// };
	// e.preventDefault();
};
</script>
<!-- TODO: decide if user should be able to set field name -->
<!-- TODO: implement other form fields -->
<!-- TODO: validate min being above max for relevant schemas -->

<template>
	<div class="form-builder">
		<h2>Build your form:</h2>
		<div class="panel">
			<form @submit="handleSubmit" class="field-builder">
				<h3>Add Form Field</h3>
				<div>
					<label for="newField.type">Field Type</label>
					<select required v-model="newField.type">
						<option value="text">Text</option>
						<option value="textarea">Textarea</option>
						<option value="email">Email</option>
						<option value="tel">Tel</option>
						<option value="number">Number</option>
						<option value="date">Date</option>
						<option value="datetime-local">Datetime</option>
						<option value="checkbox">Checkbox</option>
						<option value="radio">Radio</option>
						<option value="select">Select</option>
					</select>
				</div>
				<div>
					<label for="fieldLabel">Field Label</label>
					<input
						:value="newField.label"
						@input="event => {
						const {value} = (event.target as HTMLInputElement);
						newField.label = value;
						if (!advanced) { newField.name = titleCaseToCamelCase(value)}
					}"
					/>
				</div>
				<div class="row">
					<label for="required">Required?</label>
					<input type="checkbox" v-model="newField.required" />
				</div>
				<template
					v-if="TextFormFieldSchema.shape.type.safeParse(newField.type).success"
				>
					<div>
						<label for="min">Min. Characters</label>
						<input type="number" v-model="(newField as TextFormField).min" />
					</div>

					<div>
						<label for="max">Max. Characters</label>
						<input type="number" v-model="(newField as TextFormField).max" />
					</div>
					<div>
						<label for="placeholder">Placeholder</label>
						<input
							:type="newField.type === 'textarea' ? 'textarea' : 'text'"
							v-model="(newField as TextFormField).placeholder"
						/>
					</div>
					<div>
						<label for="defaultValue">Default Value</label>
						<input
							:type="newField.type === 'textarea' ? 'textarea' : 'text'"
							v-model="(newField as TextFormField).defaultValue"
						/>
					</div>
				</template>
				<template
					v-if="
						NumberFormFieldSchema.shape.type.safeParse(newField.type).success
					"
				>
					<div>
						<label for="min">Min. Value</label>
						<input type="number" v-model="(newField as NumberFormField).min" />
					</div>

					<div>
						<label for="max">Max. Value</label>
						<input type="number" v-model="(newField as NumberFormField).max" />
					</div>
					<div>
						<label for="defaultValue">Default Value</label>
						<input
							type="number"
							v-model="(newField as NumberFormField).defaultValue"
						/>
					</div>
				</template>
				<template
					v-if="DateFormFieldSchema.shape.type.safeParse(newField.type).success"
				>
					<!-- TODO: validate min being above max -->
					<div>
						<label for="after">Earliest Selectable Date</label>
						<input
							:type="newField.type"
							v-model="(newField as DateFormField).after"
						/>
					</div>

					<div>
						<label for="max">Latest Selectable Date</label>
						<input
							:type="newField.type"
							v-model="(newField as DateFormField).before"
						/>
					</div>
				</template>
				<template
					v-if="
						SelectFormFieldSchema.shape.type.safeParse(newField.type).success
					"
				>
					<!-- TODO: validate min being above max -->
					<div>
						<label for="options">Options (comma-separated)</label>
						<input
							type="textarea"
							name="options"
							@input="event => (newField as SelectFormField).options = (event.target as HTMLInputElement)
							.value
							.split(',')
							.map(option => option.trim())
							"
						/>
						<p>{{ JSON.stringify((newField as SelectFormField).options) }}</p>
					</div>
				</template>
				<template
					v-if="
						CheckboxFormFieldSchema.shape.type.safeParse(newField.type).success
					"
				>
					<!-- TODO: validate min being above max -->
					<div>
						<label for="defaultValue">Checked by Default?</label>
						<input
							type="checkbox"
							v-model="(newField as CheckboxFormField).defaultValue"
						/>
					</div>
				</template>
				<div>
					<label for="advanced">Advanced Mode?</label>
					<input
						type="checkbox"
						v-model="advanced"
						@change="event => {
							// resets form field name back to camelCase field title when advanced mode is disabled
							const {checked} = (event.target as HTMLInputElement);
							if (!checked) { 
								newField.name = titleCaseToCamelCase(newField?.label?? '')
							}
						}"
					/>
				</div>
				<template v-if="advanced">
					<div>
						<label for="fieldLabel">Field Name (json)</label>
						<input v-model="newField.name" />
					</div>
				</template>
				<input type="submit" value="Add Field" />
			</form>
			<div class="preview">
				<ModularForm class="form" :fields="testFields" />
				<div>new field</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.form-builder {
	display: flex;
	flex-direction: column;
}

.panel {
	display: flex;
	gap: 1rem;
}

.field-builder > div {
	display: flex;
	flex-direction: column;
}

.field-builder > .row {
	display: flex;
	flex-direction: row;
}
</style>
