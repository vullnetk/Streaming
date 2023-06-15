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
                      label="Cast Crew Name"
                  >
                      <b-form-input
                          v-model="CastCrew.fullName"
                          placeholder="Cast Crew Name"
                          required
                      ></b-form-input>

                      <b-form-select v-model="CastCrew.roleId" required>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.role }}</option>
          </b-form-select>
                  </b-form-group>
              </b-form>
          </div>
      </b-modal>
  </template>
  
  <script>
  import { editCastCrew } from '../../api/castCrew'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  import { fetchCastCrewRoles } from "../../api/castCrewRoles";


  export default {
    data (){
        return {
            roles: [],
            role: ""
        }
    }
,
      props: {
          showModal: {
              type: Boolean,
              default: false,
          },
          CastCrew: {
              type: Object,
              default: null,
          }
      },

      mounted() {
        this.fetchCastCrewRoles();
      },

      computed: {
        roles() {
            return this.roles
        },

        getRoleName() {
      return (roleId) => {
        const role = this.roles.find((role) => role.id === roleId);
        return role ? role.role : '';
      };
      },
    },
      


      methods: {
          async onSubmit() {
              try {
                  await editCastCrew(this.CastCrew.id, this.CastCrew.fullName, this.CastCrew.roleId)
                  toast("Cast crew edited successfuly", {
                      autoClose: 1000,
                  });
              } catch {
                  toast("Cast crew edit failed", {
                      autoClose: 1000,
                  });
              }
          },

          async fetchCastCrewRoles() {
        const response = await fetchCastCrewRoles()
        console.log(response)
        this.roles = response;
      }
      }
  }
  </script>
  
  <style>
  
  </style>