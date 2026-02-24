<template>
  <UButton
    v-bind="$attrs"
    :ui="{ base: 'rounded-lg cursor-pointer' }"
  >
    <slot />
  </UButton>
</template>