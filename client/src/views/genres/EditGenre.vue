<template>
    <b-modal @ok="onSubmit" size="lg" ok-title="Save Changes">
          <template v-slot:header>
              <div class="d-flex justify-content-between w-100">
                  <h4>Edit Genre</h4>
                  <div class="d-flex flex-column text-secondary">
                  </div>
              </div>
          </template>
          <div v-if="showModal" class="insert-form">
              <b-form>
                  <b-form-group
                      label="Genre Name"
                  >
                      <b-form-input
                          v-model="Genre.name"
                          placeholder="Genre Name"
                          required
                      ></b-form-input>
                  </b-form-group>
              </b-form>
          </div>
      </b-modal>
  </template>
  
  <script>
  import { editGenre } from '../../api/genres'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default {
      props: {
          showModal: {
              type: Boolean,
              default: false,
          },
          Genre: {
              type: Object,
              default: null,
          }
      },
      methods: {
          async onSubmit() {
              try {
                  await editGenre(this.Genre.id, this.Genre.name)
                  toast("Genre edited successfuly", {
                      autoClose: 1000,
                  });
              } catch {
                  toast("Genre edit failed", {
                      autoClose: 1000,
                  });
              }
          }
      }
  }
  </script>
  
  <style>
  
  </style>