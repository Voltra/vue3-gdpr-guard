<template>
	<slot v-bind="slotProps"/>
</template>

<script setup lang="ts">
	import type { GdprManager } from "gdpr-guard";
	import { computed, reactive, defineProps } from "vue";

	const props = defineProps<{
		manager: GdprManager,
	}>();

	const groups = computed(() => props.manager.getGroups());

	const enable = () => props.manager.enable();
	const disable = () => props.manager.disable();
	const toggle = () => props.manager.toggle();

	const slotProps = reactive({
		groups,
		enable,
		disable,
		toggle,
	});
</script>
