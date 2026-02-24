<template>
  <UFormField
    v-bind="$attrs"
    :ui="{ error: 'text-xs' }"
  >
    <slot />
  </UFormField>
</template>