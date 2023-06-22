<template>
    <b-modal @ok="onSubmit" size="lg" ok-title="Save Changes">
          <template v-slot:header>
              <div class="d-flex justify-content-between w-100">
                  <h4>Edit Transaksion</h4>
                  <div class="d-flex flex-column text-secondary">
                  </div>
              </div>
          </template>
          <div v-if="showModal" class="insert-form">
              <b-form>
                  <b-form-group
                      label="Transaksion Name"
                  >
                      <b-form-input
                          v-model="Transaksion.name"
                          placeholder="Transaksion Name"
                          required
                      ></b-form-input>

                      <b-form-select v-model="Transaksion.llogariaId" required>
            <option v-for="llogari in llogarite" :key="llogari.id" :value="llogari.id">{{ llogari.name }}</option>
          </b-form-select>
                  </b-form-group>
              </b-form>
          </div>
      </b-modal>
  </template>
  
  <script>
  import { editTransaksioni } from '../../api/transaksioni'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  import { fetchLlogari } from "../../api/llogari";


  export default {
    data (){
        return {
            llogarite: [],
            llogari: ""
        }
    }
,
      props: {
          showModal: {
              type: Boolean,
              default: false,
          },
          Transaksion: {
              type: Object,
              default: null,
          }
      },

      mounted() {
        this.fetchLlogari();
      },

      computed: {
        llogarite() {
            return this.llogarite
        },

        getLlogariName() {
      return (llogariaId) => {
        const llogari = this.llogarite.find((llogari) => llogari.id === llogariaId);
        return llogari ? llogari.name : '';
      };
      },
    },
      


      methods: {
          async onSubmit() {
              try {
                  await editTransaksioni(this.Transaksion.id, this.Transaksion.name, this.Transaksion.llogariaId)
                  toast("Llogari edited successfuly", {
                      autoClose: 1000,
                  });
              } catch {
                  toast("Llogari edit failed", {
                      autoClose: 1000,
                  });
              }
          },

          async fetchLlogari() {
        const response = await fetchLlogari()
        console.log(response)
        this.llogarite = response;
      }
      }
  }
  </script>
  
  <style>
  
  </style>