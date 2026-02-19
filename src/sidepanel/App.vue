<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchAllLikedVideos, type VideoItem } from '@/services/youtube'
import { Categories } from '@/config/categories'

const videos = ref<VideoItem[]>([])
const query = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const results = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return videos.value
  return videos.value.filter(v =>
    v.title.toLowerCase().includes(q) ||
    v.description.toLowerCase().includes(q)
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
    <div v-for="v in results" :key="v.id" class="flex gap-2 mb-3">
      <a :href="v.url" target="_blank" class="flex gap-2">
        <img :src="v.thumbnail" class="w-24 h-auto rounded" />
        <span class="text-sm">{{ v.title }}</span>
      </a>
    </div>
  </div>
</template>
