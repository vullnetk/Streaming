<template>
    <b-modal @ok="onSubmit" size="lg" ok-title="Save Changes">
          <template v-slot:header>
              <div class="d-flex justify-content-between w-100">
                  <h4>Edit Cast Crew</h4>
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
                          v-model="castCrewRole.role"
                          placeholder="Cast Crew Role Name"
                          required
                      ></b-form-input>
                  </b-form-group>
              </b-form>
          </div>
      </b-modal>
  </template>
  
  <script>
  import { editCastCrewRole } from '../../api/castCrewRoles'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  export default {
      props: {
          showModal: {
              type: Boolean,
              default: false,
          },
          castCrewRole: {
              type: Object,
              default: null,
          }
      },
      methods: {
          async onSubmit() {
              try {
                  await editCastCrewRole(this.castCrewRole.id, this.castCrewRole.role)
                  toast("Cast crew role edited successfuly", {
                      autoClose: 1000,
                  });
              } catch {
                  toast("Cast crew role edit failed", {
                      autoClose: 1000,
                  });
              }
          }
      }
  }
  </script>
  
  <style>
  
  </style>