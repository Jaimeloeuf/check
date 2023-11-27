<script setup lang="ts">
import { ref } from "vue";
import { useChecklist, useGroup, useSettings, useLoader } from "../../store";
import { useSearch } from "../../composable";
import BackButton from "../components/BackButton.vue";
import type { GroupID, ChecklistID } from "../../types";

const props = defineProps<{ groupID: GroupID }>();

const checklistStore = useChecklist();
const groupStore = useGroup();
const settings = useSettings();
const loader = useLoader();

const group = await groupStore.get(props.groupID);

/** Ref to the DOM element so that it can be cleared by `clearSearchInputHandler` */
const searchField = ref<HTMLInputElement | null>(null);

const { searchInput, results, clearSearchInput } = useSearch(
  ref(checklistStore.checklistsArray),
  { keys: ["name"], threshold: 0.5, resultLimit: 5 },
  () => searchField.value?.focus()
);

async function toggleChecklist(checklistID: ChecklistID) {
  loader.show();
  await groupStore.toggleChecklist(group.id, checklistID);
  loader.hide();
}
</script>

<template>
  <div :class="{ 'mx-auto max-w-6xl': !settings.expandFull }">
    <div class="mb-3 flex flex-row items-center border-b pb-4">
      <BackButton />
      <span class="ml-2 text-2xl">{{ group.name }}</span>
    </div>

    <div class="w-full max-w-md pb-6">
      <p class="font-thin">Search</p>
      <div class="flex max-w-md flex-row gap-3">
        <input
          ref="searchField"
          v-model.trim="searchInput"
          type="text"
          class="w-full rounded-lg border border-zinc-200 p-2 text-sm focus:outline-none"
          :placeholder="`E.g. ${
            checklistStore.checklistsArray[0]?.name ?? 'My Checklist'
          }`"
        />

        <button
          class="rounded-lg bg-zinc-100 px-4 text-sm font-light text-zinc-900"
          @click="clearSearchInput"
        >
          clear
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <!-- @todo sort by last editted first -->
      <button
        v-for="checklist in results"
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
