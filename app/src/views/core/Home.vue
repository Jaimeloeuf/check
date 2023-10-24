<script setup lang="ts">
import { useRouter } from "vue-router";
import { AllChecklistRoute } from "../../router";

// Since there is nothing in Home page, auto redirect to AllChecklist page.
const router = useRouter();
router.replace({ name: AllChecklistRoute.name });
</script>

<template>
  <div>
    <p class="text-2xl">Check</p>
  </div>
</template>
