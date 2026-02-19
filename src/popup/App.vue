<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchAllLikedVideos, type VideoItem } from '@/services/youtube'

const videos = ref<VideoItem[]>([])
const query = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const results = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return videos.value
  return videos.value.filter(x =>
    x.title.toLowerCase().includes(q) ||
    x.description.toLowerCase().includes(q)
  )
})

async function load() {
  loading.value = true
  error.value = null
  try {
    videos.value = await fetchAllLikedVideos()
    console.log('fetched:', videos.value.length, 'videos')
  } catch (e: any) {
    console.error(e)
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="p-4">
    <input v-model="query" placeholder="Search liked videos..." class="w-full p-2 border rounded mb-4" />
    <p v-if="loading">Loading your liked videos...</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <div v-for="result in results" :key="result.id" class="flex gap-2 mb-3">
      <a :href="result.url" target="_blank" class="flex gap-2">
        <img :src="result.thumbnail" class="w-24 h-auto rounded" />
        <span class="text-sm">{{ result.title }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.logo.crx:hover {
  filter: drop-shadow(0 0 2em #f2bae4aa);
}
</style>
