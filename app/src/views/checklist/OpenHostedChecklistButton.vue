<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { HostedChecklistRoute } from "../../router";

const router = useRouter();

const showModal = ref(false);
const link = ref("");

function openChecklist() {
  if (link.value !== "")
    router.push({
      name: HostedChecklistRoute.name,
      params: { link: link.value },
    });
}
</script>

<template>
  <div
    v-if="showModal"
    class="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-white p-8"
  >
    <div class="flex w-full max-w-screen-sm flex-col gap-4">
      <p class="text-2xl">Open a hosted checklist</p>

      <input
        class="w-full rounded-lg border border-zinc-200 p-2 focus:outline-none"
        v-model="link"
        placeholder="link to checklist"
        @keydown.enter="openChecklist"
      />

      <div class="flex flex-row gap-4">
        <button
          class="rounded-lg border border-zinc-200 bg-zinc-50 p-2"
          @click="showModal = false"
        >
          cancel
        </button>

        <button
          class="w-full rounded-lg border p-2"
          :class="{
            'border-zinc-200': link === '',
            'border-green-600 text-green-600': link !== '',
          }"
          @click="openChecklist"
          :disabled="link === ''"
        >
          open
        </button>
      </div>
    </div>
  </div>

  <button
    class="fixed bottom-10 right-28 z-30 h-14 w-14 rounded-full border border-zinc-200 bg-white p-0 shadow-lg"
    @click="showModal = true"
  >
    open
  </button>
</template>
