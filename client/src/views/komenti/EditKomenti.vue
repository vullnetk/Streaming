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
                          v-model="komenti.comment"
                          placeholder="Cast Crew Name"
                          required
                      ></b-form-input>
                      <b-form-input
                          v-model="komenti.title"
                          placeholder="Cast Crew title"
                          required
                      ></b-form-input>

                      <b-form-select v-model="komenti.artikulliID" required>
            <option v-for="artikulli in artikujt" :key="artikulli.id" :value="artikulli.id">{{ artikulli.artikulli }}</option>
          </b-form-select>
                  </b-form-group>
              </b-form>
          </div>
      </b-modal>
  </template>
  
  <script>
  import { editKomenti } from '../../api/komenti'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css'; 
  import { fetchArtikulli } from "../../api/artikulli";


  export default {
    data (){
        return {
            artikujt: [],
            artikulli: ""
        }
    }
,
      props: {
          showModal: {
              type: Boolean,
              default: false,
          },
          komenti: {
              type: Object,
              default: null,
          }
      },

      mounted() {
        this.fetchArtikulli();
      },

      computed: {
        artikujt() {
            return this.artikujt
        },

        getArtikulli() {
      return (artikulliID) => {
        const artikulli = this.artikujt.find((artikulli) => artikulli.id === artikulliID);
        return artikulli ? artikulli.artikulli : '';
      };
      },
    },
      


      methods: {
          async onSubmit() {
              try {
                  await editKomenti(this.komenti.id, this.komenti.comment, this.komenti.title, this.komenti.artikulliID)
                  toast("Cast crew edited successfuly", {
                      autoClose: 1000,
                  });
              } catch {
                  toast("Cast crew edit failed", {
                      autoClose: 1000,
                  });
              }
          },

          async fetchArtikulli() {
        const response = await fetchArtikulli()
        console.log(response)
        this.artikujt = response;
      }
      }
  }
  </script>
  
  <style>
  
  </style>