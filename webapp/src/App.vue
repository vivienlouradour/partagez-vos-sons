
<template>
  <div id="app">
    <div class="container">
      <div class="row justify-content-md-center">
        <h2>Partagez vos sons : liste des publications</h2>
      </div>
      <PostTable></PostTable>
    </div>
  </div>
</template>

<script>
import PostTable from "./components/PostTable";

export default {
  name: "app",
  components: {
    PostTable
  }
};
</script>