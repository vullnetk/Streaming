<template>
  <div>
    <div class="product-list">
    <div class="products-container">
      <div class="product">
        <div class="image-container">
          <img src="https://images.ctfassets.net/4cd45et68cgf/5ZVnTR7jyrRs0lePAlVT71/0a7c103de12f7a4c0b6c3b6edd535298/Ads_Plan_Blog_Header_Image.png?w=2000" alt="Product 1" />
        </div>
        <div class="details-container">
          <h1>Product 1</h1>
          <p class="description">Product 1 description</p>
          <p class="price">Price: $9.99</p>
          <router-link to="/subplans">
            <button>Check it out!</button>
          </router-link>
        </div>
      </div>
      <div class="product">
        <div class="image-container">
          <img src="https://images.ctfassets.net/4cd45et68cgf/5ZVnTR7jyrRs0lePAlVT71/0a7c103de12f7a4c0b6c3b6edd535298/Ads_Plan_Blog_Header_Image.png?w=2000" alt="Product 2" />
        </div>
        <div class="details-container">
          <h1>Product 2</h1>
          <p class="description">Product 2 description</p>
          <p class="price">Price: $19.99</p>
          <router-link to="/superplan">
            <button>Check it out!</button>
          </router-link>
        </div>
      </div>
      <div class="product">
        <div class="image-container">
          <img src="https://images.ctfassets.net/4cd45et68cgf/5ZVnTR7jyrRs0lePAlVT71/0a7c103de12f7a4c0b6c3b6edd535298/Ads_Plan_Blog_Header_Image.png?w=2000" alt="Product 3" />
        </div>
        <div class="details-container">
          <h1>Product 3</h1>
          <p class="description">Product 3 description</p>
          <p class="price">Price: $29.99</p>
          <router-link to="/ultraplan">
            <button>Check it out!</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
    
  </div>

</template>


<style scoped>
.product-list {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.products-container {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.product {
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.image-container {
  margin-bottom: 20px;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.description {
  margin-bottom: 20px;
}

.price {
  font-weight: bold;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>