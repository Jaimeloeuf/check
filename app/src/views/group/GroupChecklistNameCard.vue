<script setup lang="ts">
import { useChecklist } from "../../store";
import type { ChecklistID } from "../../types";

const props = defineProps<{ checklistID: ChecklistID }>();
const checklistStore = useChecklist();
const checklist = await checklistStore.get(props.checklistID);
</script>

<template>
  {{ checklist.name }}
</template>
