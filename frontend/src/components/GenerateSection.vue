<template>
  <!-- Generate button -->
  <NCard style="margin-bottom: 12px">
    <NGrid cols="2" x-gap="24">
      <NGi>
        <NButton
          type="success"
          @click="props.generate"
          :disabled="global.state.generating"
          :loading="global.state.generating"
          style="width: 100%"
          ghost
          >Generate
          <template #icon>
            <NIcon>
              <Play />
            </NIcon>
          </template>
        </NButton>
      </NGi>
      <NGi>
        <NButton
          type="error"
          @click="interrupt"
          style="width: 100%"
          ghost
          :disabled="!global.state.generating"
          >Interrupt
          <template #icon>
            <NIcon>
              <Skull />
            </NIcon>
          </template>
        </NButton>
      </NGi>
    </NGrid>
  </NCard>
</template>

<script lang="ts" setup>
import { serverUrl } from "@/env";
import { useState } from "@/store/state";
import { Play, Skull } from "@vicons/ionicons5";
import { NButton, NCard, NGi, NGrid, NIcon } from "naive-ui";
import type { MaybeArray } from "naive-ui/es/_utils";
import { defineProps, type PropType } from "vue";

const global = useState();

function interrupt() {
  fetch(`${serverUrl}/api/general/interrupt`, {
    method: "POST",
  }).then((res) => {
    if (res.status === 200) {
      global.state.generating = false;
    }
  });
}

const props = defineProps({
  generate: {
    type: Function as unknown as PropType<MaybeArray<(e: MouseEvent) => void>>,
    required: true,
  },
});
</script>
