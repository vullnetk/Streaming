<template>
    <b-modal @ok="onSubmit" size="lg" ok-title="Save Changes">
          <template v-slot:header>
              <div class="d-flex justify-content-between w-100">
                  <h4>Edit League</h4>
                  <div class="d-flex flex-column text-secondary">
                  </div>
              </div>
          </template>
          <div v-if="showModal" class="insert-form">
              <b-form>
                <b-form-input v-model="newLeague.name" placeholder="League Title" required></b-form-input>
          
          <b-form-input v-model="newLeague.country" placeholder="League country" required></b-form-input>
              </b-form>
          </div>
      </b-modal>
  </template>
  
  <script>
  import { editLeague } from '../../api/leagues'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default {
      props: {
          showModal: {
              type: Boolean,
              default: false,
          },
          newLeague: {
              type: Object,
              default: null,
          }
      },
      methods: {
          async onSubmit() {
              try {
                  await editLeague(this.newLeague.id, this.newLeague.name, this.newLeague.country)
                  toast("League edited successfuly", {
                      autoClose: 1000,
                  });
              } catch {
                  toast("League edit failed", {
                      autoClose: 1000,
                  });
              }
          }
      }
  }
  </script>
  
  <style>
  
  </style>