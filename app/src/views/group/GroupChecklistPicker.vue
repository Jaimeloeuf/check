<script setup lang="ts">
import { useChecklist, useGroup, useSettings, useLoader } from "../../store";
import BackButton from "../components/BackButton.vue";
import type { GroupID, ChecklistID } from "../../types";

const props = defineProps<{ groupID: GroupID }>();

const checklistStore = useChecklist();
const groupStore = useGroup();
const settings = useSettings();
const loader = useLoader();

const group = await groupStore.get(props.groupID);

async function toggleChecklist(checklistID: ChecklistID) {
  loader.show();
  await groupStore.toggleChecklist(group.id, checklistID);
  loader.hide();
}
</script>

<template>
  <div :class="{ 'mx-auto max-w-6xl': !settings.expandFull }">
    <div class="mb-6 flex flex-row items-center border-b pb-4">
      <BackButton />
      <span class="ml-2 text-2xl">{{ group.name }}</span>
    </div>

    <div class="flex flex-col gap-3">
      <!-- @todo sort by last editted first -->
      <button
        v-for="checklist in checklistStore.checklists"
        :key="checklist.id"
        class="rounded-lg border border-zinc-200 p-3 text-left text-lg text-zinc-800"
        :class="{
          'bg-green-50 bg-opacity-50': group.checklists.includes(checklist.id),
        }"
        @click="toggleChecklist(checklist.id)"
      >
        {{ checklist.name }}
      </button>
    </div>
  </div>
</template>
