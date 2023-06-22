<template>
    <b-modal @ok="onSubmit" size="lg" ok-title="Save Changes">
          <template v-slot:header>
              <div class="d-flex justify-content-between w-100">
                  <h4>Edit Llogari</h4>
                  <div class="d-flex flex-column text-secondary">
                  </div>
              </div>
          </template>
          <div v-if="showModal" class="insert-form">
              <b-form>
                  <b-form-group
                      label="Llogari Name"
                  >
                      <b-form-input
                          v-model="llogari.name"
                          placeholder="Llogari Name"
                          required
                      ></b-form-input>
                  </b-form-group>
              </b-form>
          </div>
      </b-modal>
  </template>
  
  <script>
  import { editLlogari } from '../../api/llogari'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default {
      props: {
          showModal: {
              type: Boolean,
              default: false,
          },
          llogari: {
              type: Object,
              default: null,
          }
      },
      methods: {
          async onSubmit() {
              try {
                  await editLlogari(this.llogari.id, this.llogari.name)
                  toast("Llogari edited successfuly", {
                      autoClose: 1000,
                  });
              } catch {
                  toast("Llogari edit failed", {
                      autoClose: 1000,
                  });
              }
          }
      }
  }
  </script>
  
  <style>
  
  </style>