<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGroup, useSettings, useLoader } from "../../store";
import { GroupRoute } from "../../router";
import { useSearch } from "../../composable";
import TopNavbar from "../components/TopNavbar.vue";
import type { GroupID } from "../../types";

const router = useRouter();
const groupStore = useGroup();
const settings = useSettings();
const loader = useLoader();

/** Ref to the DOM element so that it can be cleared by `clearSearchInputHandler` */
const searchField = ref<HTMLInputElement | null>(null);

const { searchInput, results, clearSearchInput } = useSearch(
  ref(groupStore.groupsArray),
  { keys: ["name"], threshold: 0.5, resultLimit: 5 },
  () => searchField.value?.focus()
);

async function create() {
  loader.show();
  const id = await groupStore.create();
  router.push({
    name: GroupRoute.name,
    params: { groupID: id },
  });
  loader.hide();
}

async function deleteGroup(groupID: GroupID) {
  if (!confirm("Delete?")) return;
  loader.show();
  await groupStore.delete(groupID);
  loader.hide();
}
</script>

<template>
  <TopNavbar sideDrawer>Groups</TopNavbar>

  <div :class="{ 'mx-auto max-w-6xl': !settings.expandFull }">
    <div
      v-if="groupStore.groupsArray.length === 0"
      class="flex h-[60vh] flex-col items-center justify-center text-2xl font-thin"
    >
      <p>Click <span class="px-2 text-3xl">+</span> to create a group</p>
    </div>

    <div v-else class="flex flex-col gap-3">
      <div class="w-full max-w-md pb-3">
        <p class="font-thin">Search</p>
        <div class="flex max-w-md flex-row gap-3">
          <input
            ref="searchField"
            v-model.trim="searchInput"
            type="text"
            class="w-full rounded-lg border border-zinc-200 p-2 text-sm focus:outline-none"
            :placeholder="`E.g. ${
              groupStore.groupsArray[0]?.name ?? 'My Group'
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

      <!-- @todo sort by last editted first -->
      <!-- @todo Show how many checklist in each group -->
      <router-link
        v-for="group in results"
        :key="group.id"
        :to="{
          name: GroupRoute.name,
          params: { groupID: group.id },
        }"
      >
        <div class="rounded-lg border border-zinc-200 p-3">
          <div class="flex flex-row items-center justify-between">
            <p class="text-lg">{{ group.name }}</p>
            <button
              class="rounded-lg border border-zinc-200 px-1 font-thin"
              @click.prevent="deleteGroup(group.id)"
            >
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
