<script setup lang="ts">
import { ref } from "vue";

const showModal = ref(false);
</script>

<template>
  <div
    v-if="showModal"
    class="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-white p-8"
    @click="showModal = false"
  >
    <div class="flex flex-col">
      <p class="pb-4 text-2xl">If you have any issues</p>
      <p class="pb-4 text-lg">
        Email me at
        <a class="underline" href="mailto:jaimeloeuf@gmail.com">
          jaimeloeuf@gmail.com
        </a>
        and I will get back to you.
      </p>
      <p class="pb-4 text-lg">
        You can also create a
        <a class="underline" href="https://github.com/Jaimeloeuf/check/issues">
          github issue
        </a>
      </p>
    </div>
  </div>

  <button
    class="flex w-full rounded-lg p-2 text-start text-zinc-800"
    @click="showModal = true"
  >
    <img src="../../assets/SideDrawerIcon/Help.svg" class="h-6 w-6" />
    <span class="ml-3 flex-1">Help me!</span>
  </button>
</template>
