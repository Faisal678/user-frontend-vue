<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from "vue-toastification";

const store = useStore()
const toast = useToast()
const loading = ref(false)

const user = computed(() => {
   return store.getters['auth/user'] && store.getters['auth/user'] ? store.getters['auth/user'] : null;
});
const usersData = computed(() => store.getters['user/getUser'])

const form = ref({
   name: '',
   email: '',
   phone: '',
})

const fetchUserById = async () => {
   loading.value = true
   try {
      await store.dispatch('user/fetchUserById', user.value.id);
      form.value = usersData.value
      loading.value = false
   } catch (err) {
      isLoading.value = false;
      toast.error(err.message)
   }
}

const updateUser = async () => {
   try {
      loading.value = true
      const response = await store.dispatch('user/updateUserById', {
         id: user.value.id,
         userData: form.value
      });
      if (response) {
         loading.value = false
      }
   } catch (err) {
      loading.value = false
      toast.error(err.message)
   }
};

onMounted(() => {
   if (user.value.id) {
      fetchUserById();
   }
});

</script>

<template>
   <div class="container mt-5">
      <div class="row justify-content-center">
         <div class="col-md-8">
            <div class="card">
               <div class="card-header">Profile</div>
               <div v-if="loading" class="text-center mt-5">
                  <div class="spinner-border text-primary" role="status">
                     <span class="visually-hidden">Loading...</span>
                  </div>
               </div>
               <div v-else class="card-body">
                  <form action="#" @submit.prevent="updateUser">
                     <div class="form-group row pt-3">
                        <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                        <div class="col-md-6">
                           <input id="name" type="name" class="form-control" name="name" value required
                              v-model="form.name" />
                        </div>
                     </div>
                     <div class="form-group row pt-3">
                        <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
                        <div class="col-md-6">
                           <input id="email" type="email" class="form-control" name="email" value required
                              v-model="form.email" disabled />
                        </div>
                     </div>
                     <div class="form-group row pt-3">
                        <label for="number" class="col-md-4 col-form-label text-md-right">Phone</label>
                        <div class="col-md-6">
                           <input id="number" type="number" class="form-control" name="phone" value required
                              v-model="form.phone" />
                        </div>
                     </div>
                     <div class="form-group row pt-3 mb-0">
                        <div class="col-md-8 offset-md-4">
                           <button type="submit" class="btn btn-success" :disabled="loading">Update</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
