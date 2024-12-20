<script setup lang="ts">
import { ref } from 'vue'
import type { FormField } from "../../types";
import FormBuilderField from './FormBuilderField.vue';

const formFields = ref<FormField[]>([
	{name: "firstName", type: "text", min: 1, max: 80},
	{name: "lastName", type: "text", min: 1, max: 80},
	{name: "email", type: "email", min: 1, max: 80},
	{name: "phone", type: "tel", min: 4, max: 15},
	{name: "message", type: "textarea", min: 10, max: 250}
])

</script>

<template>
	<form v-for="(field, key) in formFields" :key="key">
		<FormBuilderField :data="field" />
	</form>
</template>

<style scoped>
</style>