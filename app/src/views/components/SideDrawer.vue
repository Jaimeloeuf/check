<script setup lang="ts">
import { useRoute } from "vue-router";
import { AllChecklistRoute, SettingsRoute } from "../../router";
import { useSidedrawer } from "../../store";

const route = useRoute();
const drawer = useSidedrawer();
</script>

<template>
  <!-- Overlay across screen to simulate click away from side drawer to close. -->
  <div
    v-if="drawer.showDrawer"
    class="fixed left-0 top-0 z-40 h-screen w-screen"
    @click="drawer.hide"
  ></div>

  <nav
    class="fixed left-0 top-0 z-40 h-screen max-w-xs -translate-x-full transition-transform"
    :class="{ 'w-5/6 translate-x-0 shadow-2xl': drawer.showDrawer }"
  >
    <div class="flex h-full flex-col items-start justify-between bg-white p-4">
      <button class="w-full border-b border-zinc-200 py-4" @click="drawer.hide">
        <span class="text-2xl">Check</span>
      </button>

      <div class="w-full pt-2">
        <router-link
          :to="{ name: AllChecklistRoute.name }"
          class="group flex w-full rounded-lg p-2 text-zinc-900"
          :class="{
            'border border-zinc-200 bg-zinc-50':
              route.name === AllChecklistRoute.name,
          }"
          @click="drawer.hide"
        >
          <img
            src="../../assets/SideDrawerIcon/Checklist.svg"
            class="h-6 w-6"
          />
          <span class="ml-3 flex-1 text-left">Checklists</span>
        </router-link>
      </div>

      <!-- Spacer divider that takes up all the space in the middle -->
      <div class="grow"></div>

      <router-link
        :to="{ name: SettingsRoute.name }"
        class="flex w-full rounded-lg p-2 text-start text-zinc-900"
        :class="{
          'border border-zinc-200 bg-zinc-50':
            route.name === SettingsRoute.name,
        }"
        @click="drawer.hide"
      >
        <img src="../../assets/SideDrawerIcon/Settings.svg" class="h-6 w-6" />
        <span class="ml-3 flex-1">Settings</span>
      </router-link>

      <!-- @todo Create link -->
      <a
        class="flex w-full rounded-lg p-2 text-start text-zinc-800"
        target="_blank"
        @click="drawer.hide"
      >
        <img src="../../assets/SideDrawerIcon/Help.svg" class="h-6 w-6" />
        <span class="ml-3 flex-1">Help me!</span>
      </a>
    </div>
  </nav>
</template>