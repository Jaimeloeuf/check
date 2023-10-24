<script setup lang="ts">
import { useRouter } from "vue-router";
import { useChecklist, useLoader } from "../../store";
import { ChecklistRoute } from "../../router";
import type { ChecklistID } from "../../types";

const router = useRouter();
const checklistStore = useChecklist();
const loader = useLoader();

async function create() {
  loader.show();
  const id = await checklistStore.create();
  router.push({ name: ChecklistRoute.name, params: { checklistID: id } });
  loader.hide();
}

async function deleteChecklist(checklistID: ChecklistID) {
  loader.show();
  await checklistStore.delete(checklistID);
  loader.hide();
}
</script>

<template>
  <!-- @todo Have a setting to allow them to expand to full width -->
  <div class="mx-auto max-w-6xl">
    <div class="flex flex-row items-center justify-between pb-6">
      <p class="text-2xl">Checklists</p>

      <button class="rounded-lg border border-zinc-200 p-3" @click="create()">
        Create
      </button>
    </div>

    <div class="flex flex-col gap-3">
      <!-- @todo sort by last editted first -->
      <router-link
        v-for="checklist in checklistStore.checklists"
        :key="checklist.id"
        :to="{
          name: ChecklistRoute.name,
          params: { checklistID: checklist.id },
        }"
      >
        <div class="rounded-lg border border-zinc-200 p-3">
          <div class="flex flex-row items-center justify-between">
            <p class="text-lg">{{ checklist.name }}</p>
            <button @click.prevent="deleteChecklist(checklist.id)">
              delete
            </button>
          </div>
        </div>
      </router-link>
    </div>

    <!-- To allow scrolling past the FAB -->
    <div class="pt-20"></div>

    <button
      class="fixed bottom-10 right-10 z-30 h-14 w-14 rounded-full border border-zinc-200 bg-white p-0 shadow-lg"
      @click="create()"
    >
      <svg viewBox="0 0 20 20" class="inline-block h-6 w-6">
        <path
          d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                C15.952,9,16,9.447,16,10z"
        />
      </svg>
    </button>
  </div>
</template>