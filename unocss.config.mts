// unocss.config.mts
import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(), // required when using attributify mode
    presetUno(), // required
    presetTypography(),
  ],
  transformers: [
    // Usage @apply, @screen and theme()
    // https://unocss.dev/transformers/directives
    transformerDirectives(),
  ],
})
