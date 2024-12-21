<script setup lang="ts">
import { camelCaseToTitleCase } from '../../lib';
import { FormFieldSchema, SupportedInputTypeSchema, type FormField } from '../../types';
const { data } = defineProps<{ data: FormField }>();
const field = FormFieldSchema.parse(data);
const label = field.label ?? camelCaseToTitleCase(field.name);
</script>

<template>
	<div class="form-field">
		<label v-if="field.type !== 'radio'" :for="field.name">{{ label }}</label>
		<textarea v-if="field.type === 'textarea'" :name="field.name"></textarea>
		<select v-if="field.type === 'select'" :name="field.name">
			<option v-for="(option, key) in field.options" :key="key">
				{{ typeof option === 'string' ? camelCaseToTitleCase(option) : option.label }}
			</option>
		</select>
		<fieldset v-if="field.type === 'radio'">
			<legend>{{ label }}</legend>
			<div class="radio-button" v-for="(option, key) in field.options" :key="key">
				<input type="radio" :name="field.name" :value="typeof option === 'string' ? option : option.value">
				<label :for="typeof option === 'string' ? option : option.value">
					{{ typeof option === 'string' ? camelCaseToTitleCase(option) : option.label }}
				</label>
			</div>
		</fieldset>
		<input v-if="field.type !== 'radio' && SupportedInputTypeSchema.safeParse(field.type).success" :type="field.type" :name="field.name" :checked="field.type === 'checkbox' ? field.defaultValue : undefined" />
	</div>
</template>

<style scoped>
.form-field > * {
	display: block;
}

.form-field > textarea {
 	min-height: 3rem;
}
</style>