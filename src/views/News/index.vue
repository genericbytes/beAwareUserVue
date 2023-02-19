<template>
  <div>
    <div class="card mb-4 rounded">
      <div class="card-body bg-dark">
        <h1 class="text-white mb-0">Add News</h1>
      </div>
    </div>
    <addNews></addNews>
  </div>
</template>

<script>
import addNews from "../../components/News/addNews.vue";

export default {
  components: {
    addNews,
  },
};
</script>
