<script setup lang="ts">
import { useChecklist } from "../../store";
import type { ChecklistID } from "../../types";
import Checklist from "./Checklist.vue";

const props = defineProps<{ checklistID: ChecklistID }>();

const checklistStore = useChecklist();
const checklist = await checklistStore.get(props.checklistID);
</script>

<template>
  <Checklist :checklist="checklist" type="local" />
</template>
