<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <UModal
    v-model:open="open"
    :ui="{
      overlay: 'bg-black/60 z-30',
      content: 'p-6 rounded-2xl max-w-[400px] z-30'
    }"
  >
    <template #content>
      <div class="flex flex-col w-full">
        <button
          type="button"
          class="self-end p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          @click="open = false"
        >
          <Icon
            icon="lucide:x"
            width="20"
            height="20"
          />
        </button>

        <slot />
      </div>
    </template>
  </UModal>
</template>