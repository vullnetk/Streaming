<template>
    <div class="form-container">
        <h2>Upload Cast Crew </h2>
        <div class="insert-form">


            <b-form @submit="onSubmit">
                <b-form-group label="Cast Crew Name">
                    <b-form-input v-model="CastCrew.fullName" placeholder="Cast Crew name" required></b-form-input>
                    <b-form-select v-model="CastCrew.castCrewRoleId" placeholder="Select role" required>
                        <option :value="null">Please select an option</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.role }}</option>
                    </b-form-select>
                </b-form-group>
                <div class="d-flex gap-2 justify-content-center">
                    <b-button type="submit" variant="primary">Upload</b-button>
                    <b-button @click="resetForm" variant="danger">Reset</b-button>
                </div>

            </b-form>
        </div>
        
    </div>


</template>

<script>
import { addCastCrew } from '../../api/castCrew'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { fetchCastCrewRoles } from "../../api/castCrewRoles";

export default {
    name: 'AddCastCrew',
    data() {
        return {
            CastCrew: {
                fullName: '',
                castCrewRoleId: null
            },

            roles: []

        }
    },
    async mounted() {
       await this.fetchCastCrewRoles()
    }
    ,
    methods: {

        fetchCastCrewRoles() {
            fetchCastCrewRoles()
                .then(response => {
                    this.roles = response;
                })
                .catch(error => {
                    console.error('Failed to fetch Cast Crew Roles:', error);
                });
        },

        async onSubmit() {

            try {
                await addCastCrew(this.CastCrew.fullName, this.CastCrew.castCrewRoleId)
                this.resetForm()
                toast("Cast uploaded successfuly", {
                    autoClose: 1000,
                });
                this.$router.push('/castCrews');
            } catch {
                toast("Cast upload failed", {
                    autoClose: 1000,
                });
            }
        },

        resetForm() {
            this.CastCrew.fullName = "",
            this.CastCrew.castCrewRoleId= null
        }
    }
}
</script>

<style lang="scss" scoped>
.form-container {
    width: 600px;
    padding: 3% 0;
    margin: 0 auto;
}
</style>