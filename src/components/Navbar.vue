<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const user = computed(() => {
  return store.getters['auth/user'] && store.getters['auth/user'].name ? store.getters['auth/user'].name : null;
});

const signOut = async () => {
  try {
    await store.dispatch('auth/logout')
    router.push('/login')
  } catch (err) {
    console.error(err)
  }
}

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary" v-if="user">
    <div class="container-fluid">
      <router-link to="#" class="navbar-brand">User Frontend</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">Profile</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="#" class="nav-link">{{ user }}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" @click="signOut" class="nav-link">Log Out</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar {
  border-bottom: 1px solid #dee2e6;
}
</style>
