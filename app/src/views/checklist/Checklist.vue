<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";
import { useChecklist, useSettings, useLoader } from "../../store";
import { AllChecklistRoute } from "../../router";
import BackButton from "../components/BackButton.vue";
import type { ChecklistID } from "../../types";

const props = defineProps<{ checklistID: ChecklistID }>();

const router = useRouter();
const checklistStore = useChecklist();
const settings = useSettings();
const loader = useLoader();

const checklist = await checklistStore.get(props.checklistID);

const itemElements = ref<Array<HTMLInputElement>>([]);

const vFocusIfNoItems = {
  mounted(el: HTMLElement) {
    nextTick(() => {
      nextTick(() => {
        if (checklist.items.length === 0 && checklist.name === "untitled") {
          el.focus();
          (el as HTMLInputElement).select();
        }
      });
    });
  },
};

// Hack get rid of focusing on the last items element
onMounted(() =>
  nextTick(() => (document.activeElement as HTMLElement)?.blur())
);

async function deleteChecklist() {
  loader.show();
  await checklistStore.delete(props.checklistID);
  router.push({ name: AllChecklistRoute.name });
  loader.hide();
}

async function createItem(index?: number) {
  if (index !== undefined) {
    checklist.items.splice(index + 1, 0, { title: "", done: false });

    // wait for DOM update to apply for HTML Element reference to be stored into
    // `itemElements` ref, then the newly created item element can be accessed
    // to set focus on it.
    await nextTick();

    itemElements.value[index + 1]?.focus();
  } else {
    checklist.items.push({ title: "", done: false });

    // wait for DOM update to apply for HTML Element reference to be stored into
    // `itemElements` ref, then the newly created item element can be accessed
    // to set focus on it.
    await nextTick();

    itemElements.value[itemElements.value.length - 1]?.focus();
  }
}

/** Delete item if it is empty and user pressed backspace on it */
async function deleteIfEmpty(index: number, $event: Event) {
  if (checklist.items[index]?.title === "") {
    // Prevents newly focused item from getting the backspace key event and
    // getting a character deleted.
    $event.preventDefault();
    checklist.items.splice(index, 1);
    itemElements.value[index - 1]?.focus();
  }
}

async function toggleItem(index: number) {
  const item = checklist.items[index];
  if (item === undefined)
    throw new Error(`Invalid item index to mark as done: ${index}`);

  item.done = !item.done;

  allDone();
}

function resetChecklist() {
  checklist.items.forEach((item) => (item.done = false));
}

function allDone() {
  if (checklist.items.every((item) => item.done))
    if (confirm("All completed! Reset checklist?")) resetChecklist();
}
</script>

<template>
  <div :class="{ 'mx-auto max-w-6xl': !settings.expandFull }">
    <div class="flex flex-row items-center justify-between pb-6">
      <BackButton />

      <input
        v-model="checklist.name"
        onclick="this.select()"
        class="ml-3 flex-grow px-1 text-2xl focus:outline-none"
        v-focus-if-no-items
      />

      <button
        class="rounded-lg border border-red-300 p-2 text-red-600"
        @click="deleteChecklist()"
      >
        delete
      </button>
    </div>

    <div class="flex flex-row items-center justify-between pb-6">
      <p class="text-2xl font-extralight tracking-tighter">
        {{ checklist.items.filter((item) => item.done).length }} /
        {{ checklist.items.length }}
      </p>

      <button
        class="rounded-lg border border-zinc-200 p-2 text-zinc-600"
        @click="resetChecklist()"
      >
        reset
      </button>
    </div>

    <draggable v-model="checklist.items" group="people" item-key="id">
      <template #item="{ element: item, index }">
        <div class="pb-3">
          <div
            class="rounded-lg border border-zinc-200 p-3"
            :class="{
              'cursor-pointer bg-zinc-100 font-light text-zinc-700': item.done,
            }"
            v-on="{ click: item.done ? () => toggleItem(index) : null }"
          >
            <div class="flex flex-row items-center justify-between">
              <span class="pr-2">{{ index + 1 }}.</span>

              <input
                :ref="(el) => (itemElements[index] = el as HTMLInputElement)"
                v-model="item.title"
                class="mr-2 flex-grow bg-inherit text-lg focus:outline-none"
                :class="{ 'cursor-pointer': item.done }"
                @keydown.enter="createItem(index)"
                @keydown.backspace="($event) => deleteIfEmpty(index, $event)"
                :readonly="item.done"
              />
              <button @click.prevent="toggleItem(index)">
                {{ item.done ? "undo" : "done" }}
              </button>
            </div>
          </div>
        </div>
      </template>
    </draggable>

    <!-- To allow scrolling past the FAB -->
    <div class="pt-20"></div>

    <button
      class="fixed bottom-10 right-10 z-30 h-14 w-14 rounded-full border border-zinc-200 bg-white p-0 shadow-lg"
      @click="createItem()"
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
