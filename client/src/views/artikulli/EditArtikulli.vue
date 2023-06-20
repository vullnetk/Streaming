<template>
    <b-modal @ok="onSubmit" size="lg" ok-title="Save Changes">
          <template v-slot:header>
              <div class="d-flex justify-content-between w-100">
                  <h4>Edit Artikulli</h4>
                  <div class="d-flex flex-column text-secondary">
                  </div>
              </div>
          </template>
          <div v-if="showModal" class="insert-form">
              <b-form>
                  <b-form-group
                      label="Role Name"
                  >
                      <b-form-input
                          v-model="artikulli.name"
                          placeholder="Artikulli Name"
                          required
                      ></b-form-input>

                      <b-form-input
                          v-model="artikulli.title"
                          placeholder="Artikulli title"
                          required
                      ></b-form-input>

                  </b-form-group>
              </b-form>
          </div>
      </b-modal>
  </template>
  
  <script>
  import { editArtikulli } from '../../api/artikulli'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default {
      props: {
          showModal: {
              type: Boolean,
              default: false,
          },
          artikulli: {
              type: Object,
              default: null,
          }
      },
      methods: {
          async onSubmit() {
              try {
                  await editArtikulli(this.artikulli.id, this.artikulli.name, this.artikulli.title)
                  toast("Artikulli edited successfuly", {
                      autoClose: 1000,
                  });
              } catch {
                  toast("Artikulli edit failed", {
                      autoClose: 1000,
                  });
              }
          }
      }
  }
  </script>
  
  <style>
  
  </style>