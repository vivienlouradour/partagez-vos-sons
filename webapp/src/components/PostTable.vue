<template>
  <div>
    <modal name="comments-modal" height="auto" scrollable="true" @before-open="beforeOpenModal">
      <ul class="list-group">
        <li class="list-group-item" v-for="comment in modalComments" :key="comment">{{comment}}</li>
      </ul>
    </modal>
    <div class="row justify-content-md-center">
      <div class="alert alert-success" role="alert">Nombre total de publications : {{posts.length}}</div>
    </div>
    <div class="row justify-content-md-center">
      <nav aria-label="Posts navigation">
        <ul class="pagination">
          <li class="page-item" :class="{disabled: page == 1}">
            <button type="button" class="page-link" @click="page--">Précédent</button>
          </li>
          <li
            v-for="pageNumber in pages.slice(page-3 < 0 ? 0 : page -3, page+5)"
            :key="pageNumber"
            class="page-item"
            :class="{active: pageNumber == page}"
          >
            <button type="button" class="page-link" @click="page = pageNumber">{{pageNumber}}</button>
          </li>
          <li class="page-item" :class="{disabled: page >= pages.length}">
            <button type="button" @click="page++" class="page-link">Next</button>
          </li>
        </ul>
      </nav>
    </div>
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>Message</th>
          <th>Date de création</th>
          <th>URL</th>
          <th>URL description</th>
          <th>Commentaires</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in displayedPosts" :key="p._id">
          <td>{{p.message}}</td>
          <td>{{formatDate(p.dateCreation)}}</td>
          <td>
            <a :href="p.url" class="badge badge-success">Lien</a>
          </td>
          <td>{{p.urlDescription}}</td>
          <td>
            <a href="#" v-if="p.commentaires.length > 0" class="badge badge-pill badge-success" @click="showModal(p.commentaires)">{{p.commentaires.length}}</a>
            <span v-if="p.commentaires.length == 0" class="badge badge-pill badge-dark">{{p.commentaires.length}}</span>
          
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row justify-content-md-center">
      <nav aria-label="Posts navigation">
        <ul class="pagination">
          <li class="page-item" :class="{disabled: page == 1}">
            <button type="button" class="page-link" @click="page--">Précédent</button>
          </li>
          <li
            v-for="pageNumber in pages.slice(page-3 < 0 ? 0 : page -3, page+5)"
            :key="pageNumber"
            class="page-item"
            :class="{active: pageNumber == page}"
          >
            <button type="button" class="page-link" @click="page = pageNumber">{{pageNumber}}</button>
          </li>
          <li class="page-item" :class="{disabled: page >= pages.length}">
            <button type="button" @click="page++" class="page-link">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PostTable",

  data() {
    return {
      posts: [],
      page: 1,
      perPage: 20,
      pages: [],
      modalComments: []
    };
  },
  methods: {
    showModal(comments) {
      this.$modal.show("comments-modal", { comments });
    },
    hideModal() {
      this.$modal.hide("comments-modal");
    },
    beforeOpenModal(event) {
      console.log(event.params.comments);
      this.modalComments = event.params.comments;
    },
    formatDate(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/YYYY HH:mm:ss");
      }
    },
    async getPosts() {
      let currentPage = 1;
      let hasMorePosts = true;
      while (hasMorePosts) {
        let url = `${process.env.VUE_APP_API_URL}/posts?limit=${this.perPage}&page=${currentPage}̀`;
        hasMorePosts = await this.fetchPosts(url);
        currentPage++;
      }
      this.setPages();
    },
    async fetchPosts(url) {
      return fetch(url)
        .then(response => response.json())
        .then(response => {
          response.data.forEach(post => {
            this.posts.push({
              message: post.message,
              dateCreation: post.creationDate,
              url: post.url,
              urlDescription: post.urlDescription,
              commentaires: post.comments
            });
          });
          return response.has_more;
        });
    },
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    }
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    }
  },
  watch: {
    posts() {
      // this.setPages();
    }
  },
  created() {
    this.getPosts();
  }
};
</script>

<style scoped>
button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}
.table {
  border-radius: 5px;
  width: 80%;
  margin: 20px auto;
  float: none;
}
</style>