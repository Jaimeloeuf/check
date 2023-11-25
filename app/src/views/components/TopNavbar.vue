<script setup lang="ts">
import SideDrawerButton from "./SideDrawerButton.vue";
import BackButton from "./BackButton.vue";

defineProps<{
  /**
   * Show side drawer button?
   */
  sideDrawer?: boolean;

  /**
   * Show back button?
   */
  back?: boolean;
}>();
</script>

<template>
  <header
    class="fixed right-0 top-0 z-30 flex w-full flex-row items-center border-b bg-white px-4 pb-2 pt-3"
  >
    <SideDrawerButton v-if="sideDrawer" class="mr-2" />
    <BackButton v-if="back" class="mr-3" />
    <span class="text-xl font-light">
      <slot></slot>
    </span>
  </header>

  <!-- Spacer to allow scroll pass instead of covering content with navbar -->
  <div class="py-5"></div>
</template>
