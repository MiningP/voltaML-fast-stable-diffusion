<template>
  <div style="margin: 0 12px">
    <!-- Main -->
    <NGrid cols="1 m:2" x-gap="12" responsive="screen">
      <NGi>
        <ImageUpload
          :callback="imageSelectCallback"
          :preview="conf.data.settings.controlnet.image"
          style="margin-bottom: 12px"
          @file-dropped="conf.data.settings.controlnet.image = $event"
        />

        <NCard title="Settings">
          <NSpace vertical class="left-container">
            <!-- Prompt -->
            <NInput
              v-model:value="conf.data.settings.controlnet.prompt"
              type="textarea"
              placeholder="Prompt"
              show-count
            >
              <template #count>{{ promptCount }}</template>
            </NInput>
            <NInput
              v-model:value="conf.data.settings.controlnet.negative_prompt"
              type="textarea"
              placeholder="Negative prompt"
              show-count
            >
              <template #count>{{ negativePromptCount }}</template>
            </NInput>

            <!-- Sampler -->
            <div class="flex-container">
              <NTooltip style="max-width: 600px">
                <template #trigger>
                  <p style="margin-right: 12px; width: 150px">Sampler</p>
                </template>
                The sampler is the method used to generate the image. Your
                result may vary drastically depending on the sampler you choose.
                <b class="highlight"
                  >We recommend using Euler A for the best results (but it also
                  takes more time).
                </b>
                <a
                  target="_blank"
                  href="https://docs.google.com/document/d/1n0YozLAUwLJWZmbsx350UD_bwAx3gZMnRuleIZt_R1w"
                  >Learn more</a
                >
              </NTooltip>

              <NSelect
                :options="conf.scheduler_options"
                v-model:value="conf.data.settings.controlnet.sampler"
                style="flex-grow: 1"
              />
            </div>

            <!-- ControlNet mode -->
            <div class="flex-container">
              <NTooltip style="max-width: 600px">
                <template #trigger>
                  <p style="margin-right: 12px; width: 150px">ControlNet</p>
                </template>
                TODO
              </NTooltip>

              <NSelect
                :options="conf.controlnet_options"
                v-model:value="conf.data.settings.controlnet.controlnet"
                style="flex-grow: 1"
              />
            </div>

            <!-- Dimensions -->
            <div class="flex-container" v-if="conf.data.settings.aitDim.width">
              <p class="slider-label">Width</p>
              <NSlider
                :value="conf.data.settings.aitDim.width"
                :min="128"
                :max="2048"
                :step="8"
                style="margin-right: 12px"
              />
              <NInputNumber
                :value="conf.data.settings.aitDim.width"
                size="small"
                style="min-width: 96px; width: 96px"
                :step="8"
                :min="128"
                :max="2048"
              />
            </div>
            <div class="flex-container" v-else>
              <p class="slider-label">Width</p>
              <NSlider
                v-model:value="conf.data.settings.controlnet.width"
                :min="128"
                :max="2048"
                :step="8"
                style="margin-right: 12px"
              />
              <NInputNumber
                v-model:value="conf.data.settings.controlnet.width"
                size="small"
                style="min-width: 96px; width: 96px"
                :step="8"
                :min="128"
                :max="2048"
              />
            </div>
            <div class="flex-container" v-if="conf.data.settings.aitDim.height">
              <p class="slider-label">Height</p>
              <NSlider
                :value="conf.data.settings.aitDim.height"
                :min="128"
                :max="2048"
                :step="8"
                style="margin-right: 12px"
              />
              <NInputNumber
                :value="conf.data.settings.aitDim.height"
                size="small"
                style="min-width: 96px; width: 96px"
                :step="8"
                :min="128"
                :max="2048"
              />
            </div>
            <div class="flex-container" v-else>
              <p class="slider-label">Height</p>
              <NSlider
                v-model:value="conf.data.settings.controlnet.height"
                :min="128"
                :max="2048"
                :step="8"
                style="margin-right: 12px"
              />
              <NInputNumber
                v-model:value="conf.data.settings.controlnet.height"
                size="small"
                style="min-width: 96px; width: 96px"
                :step="8"
                :min="128"
                :max="2048"
              />
            </div>

            <!-- Steps -->
            <div class="flex-container">
              <NTooltip style="max-width: 600px">
                <template #trigger>
                  <p class="slider-label">Steps</p>
                </template>
                Number of steps to take in the diffusion process. Higher values
                will result in more detailed images but will take longer to
                generate. There is also a point of diminishing returns around
                100 steps.
                <b class="highlight"
                  >We recommend using 20-50 steps for most images.</b
                >
              </NTooltip>
              <NSlider
                v-model:value="conf.data.settings.controlnet.steps"
                :min="5"
                :max="300"
                style="margin-right: 12px"
              />
              <NInputNumber
                v-model:value="conf.data.settings.controlnet.steps"
                size="small"
                style="min-width: 96px; width: 96px"
                :min="5"
                :max="300"
              />
            </div>

            <!-- CFG Scale -->
            <div class="flex-container">
              <NTooltip style="max-width: 600px">
                <template #trigger>
                  <p class="slider-label">CFG Scale</p>
                </template>
                Guidance scale indicates how much should model stay close to the
                prompt. Higher values might be exactly what you want, but
                generated images might have some artefacts. Lower values
                indicates that model can "dream" about this prompt more.
                <b class="highlight"
                  >We recommend using 3-15 for most images.</b
                >
              </NTooltip>
              <NSlider
                v-model:value="conf.data.settings.controlnet.cfg_scale"
                :min="1"
                :max="30"
                :step="0.5"
                style="margin-right: 12px"
              />
              <NInputNumber
                v-model:value="conf.data.settings.controlnet.cfg_scale"
                size="small"
                style="min-width: 96px; width: 96px"
                :min="1"
                :max="30"
                :step="0.5"
              />
            </div>

            <!-- Number of images -->
            <div class="flex-container">
              <NTooltip style="max-width: 600px">
                <template #trigger>
                  <p class="slider-label">Batch Count</p>
                </template>
                Number of images to generate after each other.
              </NTooltip>
              <NSlider
                v-model:value="conf.data.settings.controlnet.batch_count"
                :min="1"
                :max="9"
                style="margin-right: 12px"
              />
              <NInputNumber
                v-model:value="conf.data.settings.controlnet.batch_count"
                size="small"
                style="min-width: 96px; width: 96px"
                :min="1"
                :max="9"
              />
            </div>
            <div class="flex-container">
              <NTooltip style="max-width: 600px">
                <template #trigger>
                  <p class="slider-label">Batch Size</p>
                </template>
                Number of images to generate in paralel.
              </NTooltip>
              <NSlider
                v-model:value="conf.data.settings.controlnet.batch_size"
                :min="1"
                :max="9"
                style="margin-right: 12px"
              />
              <NInputNumber
                v-model:value="conf.data.settings.controlnet.batch_size"
                size="small"
                style="min-width: 96px; width: 96px"
                :min="1"
                :max="9"
              />
            </div>

            <!-- ControlNet Conditioning Scale -->
            <div class="flex-container">
              <NTooltip style="max-width: 600px">
                <template #trigger>
                  <p class="slider-label">ControlNet Conditioning Scale</p>
                </template>
                How much should the ControlNet affect the image.
              </NTooltip>
              <NSlider
                v-model:value="
                  conf.data.settings.controlnet.controlnet_conditioning_scale
                "
                :min="0.1"
                :max="2"
                style="margin-right: 12px"
                :step="0.025"
              />
              <NInputNumber
                v-model:value="
                  conf.data.settings.controlnet.controlnet_conditioning_scale
                "
                size="small"
                style="min-width: 96px; width: 96px"
                :min="0.1"
                :max="2"
                :step="0.025"
              />
            </div>

            <!-- Detection resolution -->
            <div class="flex-container">
              <NTooltip style="max-width: 600px">
                <template #trigger>
                  <p class="slider-label">Detection resolution</p>
                </template>
                What resolution to use for the image processing. This process
                does not affect the final result but can affect the quality of
                the ControlNet processing.
              </NTooltip>
              <NSlider
                v-model:value="
                  conf.data.settings.controlnet.detection_resolution
                "
                :min="128"
                :max="2048"
                style="margin-right: 12px"
                :step="8"
              />
              <NInputNumber
                v-model:value="
                  conf.data.settings.controlnet.detection_resolution
                "
                size="small"
                style="min-width: 96px; width: 96px"
                :min="128"
                :max="2048"
                :step="8"
              />
            </div>

            <!-- Seed -->
            <div class="flex-container">
              <NTooltip style="max-width: 600px">
                <template #trigger>
                  <p class="slider-label">Seed</p>
                </template>
                Seed is a number that represents the starting canvas of your
                image. If you want to create the same image as your friend, you
                can use the same settings and seed to do so.
                <b class="highlight">For random seed use -1.</b>
              </NTooltip>
              <NInputNumber
                v-model:value="conf.data.settings.controlnet.seed"
                size="small"
                :min="-1"
                :max="999_999_999_999"
                style="flex-grow: 1"
              />
            </div>
          </NSpace>
        </NCard>
      </NGi>

      <!-- Split -->

      <!-- Images -->
      <NGi>
        <GenerateSection :generate="generate" />

        <ImageOutput
          :current-image="global.state.controlnet.currentImage"
          :images="global.state.controlnet.images"
          @image-clicked="global.state.controlnet.currentImage = $event"
        />

        <SendOutputTo :output="global.state.controlnet.currentImage" />

        <OutputStats
          style="margin-top: 12px"
          :gen-data="global.state.controlnet.genData"
        />
      </NGi>
    </NGrid>
  </div>
</template>

<script setup lang="ts">
import "@/assets/2img.css";
import GenerateSection from "@/components/GenerateSection.vue";
import ImageOutput from "@/components/ImageOutput.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import OutputStats from "@/components/OutputStats.vue";
import SendOutputTo from "@/components/SendOutputTo.vue";
import { serverUrl } from "@/env";
import { spaceRegex } from "@/functions";
import {
  NCard,
  NGi,
  NGrid,
  NInput,
  NInputNumber,
  NSelect,
  NSlider,
  NSpace,
  NTooltip,
  useMessage,
} from "naive-ui";
import { v4 as uuidv4 } from "uuid";
import { computed } from "vue";
import { useSettings } from "../../store/settings";
import { useState } from "../../store/state";

const global = useState();
const conf = useSettings();
const messageHandler = useMessage();

const promptCount = computed(() => {
  return conf.data.settings.controlnet.prompt.split(spaceRegex).length - 1;
});
const negativePromptCount = computed(() => {
  return (
    conf.data.settings.controlnet.negative_prompt.split(spaceRegex).length - 1
  );
});

const checkSeed = (seed: number) => {
  // If -1 create random seed
  if (seed === -1) {
    seed = Math.floor(Math.random() * 999_999_999_999);
  }

  return seed;
};

const imageSelectCallback = (base64Image: string) => {
  conf.data.settings.controlnet.image = base64Image;
};

const generate = () => {
  if (conf.data.settings.controlnet.seed === null) {
    messageHandler.error("Please set a seed");
    return;
  }
  global.state.generating = true;

  const seed = checkSeed(conf.data.settings.controlnet.seed);

  fetch(`${serverUrl}/api/generate/controlnet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        prompt: conf.data.settings.controlnet.prompt,
        image: conf.data.settings.controlnet.image,
        id: uuidv4(),
        negative_prompt: conf.data.settings.controlnet.negative_prompt,
        width: conf.data.settings.aitDim.width
          ? conf.data.settings.aitDim.width
          : conf.data.settings.img2img.width,
        height: conf.data.settings.aitDim.height
          ? conf.data.settings.aitDim.height
          : conf.data.settings.img2img.height,
        steps: conf.data.settings.controlnet.steps,
        guidance_scale: conf.data.settings.controlnet.cfg_scale,
        seed: seed,
        batch_size: conf.data.settings.controlnet.batch_size,
        batch_count: conf.data.settings.controlnet.batch_count,
        controlnet: conf.data.settings.controlnet.controlnet,
        controlnet_conditioning_scale:
          conf.data.settings.controlnet.controlnet_conditioning_scale,
        detection_resolution:
          conf.data.settings.controlnet.detection_resolution,
        scheduler: conf.data.settings.controlnet.sampler,
        canny_low_threshold: 100,
        canny_high_threshold: 200,
        mlsd_thr_v: 0.1,
        mlsd_thr_d: 0.1,
      },
      model: conf.data.settings.model?.name,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      global.state.generating = false;
      console.log(res);
      res.json().then((data) => {
        global.state.controlnet.images = data.images;
        global.state.progress = 0;
        global.state.total_steps = 0;
        global.state.current_step = 0;

        global.state.controlnet.genData = {
          time_taken: parseFloat(parseFloat(data.time as string).toFixed(4)),
          seed: seed,
        };
      });
    })
    .catch((err) => {
      global.state.generating = false;
      messageHandler.error(err);
      console.log(err);
    });
};
</script>
<style scoped>
.image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
}

.image-container {
  height: 70vh;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
