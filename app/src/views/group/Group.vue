<script setup lang="ts">
import { nextTick } from "vue";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
import { useGroup, useSettings, useLoader } from "../../store";
import {
  AllGroupRoute,
  ChecklistRoute,
  GroupChecklistPickerRoute,
} from "../../router";
import GroupChecklistNameCard from "./GroupChecklistNameCard.vue";
import BackButton from "../components/BackButton.vue";
import type { GroupID, ChecklistID } from "../../types";

const props = defineProps<{ groupID: GroupID }>();

const router = useRouter();
const groupStore = useGroup();
const settings = useSettings();
const loader = useLoader();

const group = await groupStore.get(props.groupID);

const vFocusIfNoItems = {
  mounted(el: HTMLElement) {
    nextTick(() => {
      nextTick(() => {
        if (group.checklists.length === 0 && group.name === "untitled group") {
          el.focus();
          (el as HTMLInputElement).select();
        }
      });
    });
  },
};

async function deleteGroup() {
  if (!confirm("Delete?")) return;
  loader.show();
  await groupStore.delete(props.groupID);
  router.push({ name: AllGroupRoute.name });
  loader.hide();
}

async function removeChecklist(checklistID: ChecklistID) {
  loader.show();
  // Toggle can work as removal since checklist definitely in it.
  await groupStore.toggleChecklist(group.id, checklistID);
  loader.hide();
}
</script>

<template>
  <div :class="{ 'mx-auto max-w-6xl': !settings.expandFull }">
    <div class="flex flex-row items-center justify-between pb-6">
      <BackButton />

      <input
        v-model="group.name"
        onclick="this.select()"
        class="ml-3 flex-grow px-1 text-2xl focus:outline-none"
        v-focus-if-no-items
      />
    </div>

    <div class="flex flex-row items-center justify-between pb-6">
      <p class="flex-grow text-2xl font-extralight">
        {{ group.checklists.length }} checklists
      </p>

      <button
        class="rounded-lg border border-red-300 p-1 text-red-400"
        @click="deleteGroup()"
      >
        delete
      </button>
    </div>

    <div
      v-if="group.checklists.length === 0"
      class="flex h-[50vh] flex-col items-center justify-center text-2xl font-thin"
    >
      <p>
        Click <span class="px-2 font-extralight">edit</span> to add checklists
      </p>
    </div>

    <!-- If the checklist in group does not exists, then ignore it -->
    <draggable v-model="group.checklists" group="group" item-key="id">
      <template #item="{ element: checklistID, index }">
        <router-link
          :to="{ name: ChecklistRoute.name, params: { checklistID } }"
        >
          <div
            class="flex flex-row items-center justify-between rounded-lg border border-zinc-200 p-3"
          >
            <p>
              <span class="pr-2">{{ index + 1 }}.</span>
              <GroupChecklistNameCard :checklistID="checklistID" />
            </p>

            <button
              class="rounded-lg border border-zinc-200 px-1 font-thin"
              @click.prevent="removeChecklist(checklistID)"
            >
              remove
            </button>
          </div>

          <div class="pb-3"></div>
        </router-link>
      </template>
    </draggable>

    <!-- To allow scrolling past the FAB -->
    <div class="pt-20"></div>

    <router-link
      :to="{ name: GroupChecklistPickerRoute.name }"
      class="fixed bottom-10 right-10 z-30 rounded-full border border-zinc-200 bg-white p-3 shadow-lg"
    >
      edit
    </router-link>
  </div>
</template>
