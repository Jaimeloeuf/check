<script setup lang="ts">
import { ref } from "vue";
import { useChecklist } from "../../store";
import Checklist from "./Checklist.vue";

const props = defineProps<{ link: string }>();

const checklistStore = useChecklist();
const checklist = ref(await checklistStore.getFromLink(props.link));
</script>

<template>
  <Checklist :checklist="checklist" type="hosted" />
</template>
