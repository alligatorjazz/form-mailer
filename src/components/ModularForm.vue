<script setup lang="ts">
import type { FormField } from "../../types";
import FormBuilderField from './ModularFormField.vue';

// TODO: print fields to console
const { fields } = defineProps<{ fields: FormField[] }>();

</script>

<template>
	<form>
		<FormBuilderField v-for="(field, key) in fields" :key="key" :data="field" />
	</form>
</template>

<style scoped>
</style>