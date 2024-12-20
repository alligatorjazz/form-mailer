<script setup lang="ts">
import { camelCaseToTitleCase } from '../../lib';
import { FormFieldSchema, SupportedInputTypeSchema, type FormField } from '../../types';
const { data } = defineProps<{ data: FormField }>();
const field = FormFieldSchema.parse(data);
</script>

<template>
	<label :for="field.name">{{ field.label ?? camelCaseToTitleCase(field.name) }}</label>
	<textarea v-if="field.type === 'textarea'" name="field.name"></textarea>
	<select v-if="field.type === 'select'" name="field.name"></select>
	<input v-if="SupportedInputTypeSchema.safeParse(field.type).success" :type="field.type" :name="field.name" />
</template>

<!-- <style scoped>
button {
	font-weight: bold;
}
</style> -->