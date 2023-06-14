<template>
    <div class="wishlists">
      <vue-good-table
        styleClass="vgt-table condensed"
        :columns="columns"
        :rows="allWishlists"
        theme="polar-bear"
        :sort-options="{ enabled: false }"
        :search-options="{
          enabled: true,
          skipDiacritics: true,
          placeholder: 'Search...',
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 7,
          position: 'bottom',
          perPageDropdown: [3, 7, 9],
          dropdownAllowAll: false,
          nextLabel: 'Next',
          prevLabel: 'Previous',
          rowsPerPageLabel: 'Rows per page',
        }"
        :line-numbers="true"
      >
        <template v-slot:table-row="props">
            <span v-if="props.column.field == 'IsApproved'">
                    <span v-if="props.row.IsApproved == 0">Pending</span>
                    <span v-else-if="props.row.IsApproved == 1">Accepted</span>
                    <span v-else-if="props.row.IsApproved == -1">Rejected</span>
            </span>
          <span v-if="props.column.field == 'Actions'" class="more-options__btn text-right">
            <span v-if="props.row.IsApproved == 0">
                <b-dropdown right no-caret variant="default">
                    <template #button-content>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </template>
                    <b-dropdown-item  @click="approveWishlist(props.row)">Approve</b-dropdown-item>
                    <b-dropdown-item  @click="rejectWishlist(props.row)">Reject</b-dropdown-item>
                </b-dropdown>
            </span>
          </span>
        </template>
      </vue-good-table>
    </div>
    <div>
      {{ wishlists }}
    </div>
  </template>
  
  <script>
  import { fetchWishlists, acceptRequest, rejectRequest } from '../../api/wishlist';
  
  export default {
    data() {
      return {
        wishlists: [],
        columns: [
          {
            label: 'Movie Title',
            field: 'MovieTitle',
          },
          {
            label: 'Movie Year',
            field: 'MovieYear',
          },
          {
            label: 'Movie Country',
            field: 'MovieCountry',
          },
          {
            label: 'Genre',
            field: 'Genre',
          },
          {
            label: 'Description',
            field: 'Description',
          },
          {
            label: 'Is Approved',
            field: 'IsApproved',
          },
          {
            label: 'Actions',
            field: 'Actions',
          },
        ],
      };
    },
    mounted() {
      this.fetchWishlists();
    },
    computed: {
      allWishlists() {
        return this.wishlists;
      },
    },
    methods: {
      async fetchWishlists() {
        try {
          const response = await fetchWishlists();
          this.wishlists = response;
        } catch (error) {
          console.error('Failed to fetch wishlists:', error);
        }
      },
      async approveWishlist(wishlist) {
        try {
          await acceptRequest(wishlist.Id);
          await this.fetchWishlists();
        } catch (error) {
          console.error('Failed to approve wishlist:', error);
        }
      },
      async rejectWishlist(wishlist) {
        try {
          await rejectRequest(wishlist.Id);
          await this.fetchWishlists();
        } catch (error) {
          console.error('Failed to reject wishlist:', error);
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .wishlists {
    width: 900px;
    padding: 3% 0;
    margin: auto;
  }
  
  button {
    margin-right: 5px;
  }
  .more-options__btn{
        .btn-group, .btn{
            background: transparent;
            border: none;
            outline: none;

            :focus {
                border: none;
            }

        }
    }
  </style>
  