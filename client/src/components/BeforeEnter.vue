<template>
    <div class="d-flex justify-content-center flex-column align-items-center mt-5 gap-4">
      <h2 class="mt-4">Welcome To Blockbuster</h2>
  
      <h3 style="font-weight: 900; mt-4">
        Unlimited movies, TV shows, and more.
      </h3>
  
      <template v-if="!isAuthenticated">
        <div class="d-flex mt-2 gap-3">
          <b-button variant="primary" to="/Account/Login">Sign In</b-button>
          <b-button variant="primary" to="/Account/Register">Sign Up</b-button>
        </div>
      </template>
  
      <b-collapse id="accordionExample">
        <b-card class="bg-primary text-white" no-body>
          <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button variant="link" block v-b-toggle.collapseOne>
              What is BlockBuster
            </b-button>
          </b-card-header>
          <b-collapse id="collapseOne" visible accordion="accordionExample" role="tabpanel">
            <b-card-body>
              BlockBuster is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
  
              You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!
            </b-card-body>
          </b-collapse>
        </b-card>
  
        <b-card class="bg-primary text-white" no-body>
          <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button variant="link" block v-b-toggle.collapseTwo>
              How much does BlockBuster cost?
            </b-button>
          </b-card-header>
          <b-collapse id="collapseTwo" visible accordion="accordionExample" role="tabpanel">
            <b-card-body>
              Watch BlockBuster on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EUR7.99 to EUR11.99 a month. No extra costs, no contracts.
            </b-card-body>
          </b-collapse>
        </b-card>
  
        <b-card class="bg-primary text-white" no-body>
          <b-card-header header-tag="header" class="p-0" role="tab">
            <b-button variant="link" block v-b-toggle.collapseThree>
              What can I watch on BlockBuster?
            </b-button>
          </b-card-header>
          <b-collapse id="collapseThree" visible accordion="accordionExample" role="tabpanel">
            <b-card-body>
              BlockBuster has an extensive library of feature films, documentaries, TV shows, anime, award-winning BlockBuster originals, and more. Watch as much as you want, anytime you want.
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-collapse>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isAuthenticated: false,
      };
    },
  };
  </script>
  
 
  

  