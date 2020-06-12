
<template>
  <div id="app">
       <div class="row justify-content-md-center">
      <h1>Partagez vos sons : liste des publications</h1>
       </div>
    <PostTable></PostTable>
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