<template>

  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        temporary
    >
      <v-list-item>
        <v-list-item-title>
          <v-avatar class="pr-3">
            <v-img :src="logo" alt="logo"/>
          </v-avatar>
          DSL Pipeline
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-powershell" v-on:click="page='dsl-sp'; drawer=!drawer">
          <v-list-item-title>{{ titles['dsl-sp'] }}</v-list-item-title>
        </v-list-item>
        <v-list-item prepend-icon="mdi-powershell" v-on:click="page='dsl-pp'; drawer=!drawer">
          <v-list-item-title>{{ titles['dsl-pp'] }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="blue" density="compact">
      <template v-slot:prepend>
        <v-app-bar-nav-icon v-on:click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>{{ titles[page] }}</v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <DSLPipelinePage v-if="page==='dsl-pp'"/>
      <DSLSyntaxPage v-if="page==='dsl-sp'"/>
    </v-main>
    <!--    <FooterComponent/>-->
  </v-app>

</template>

<script>
import DSLSyntaxPage from './components/DSLSyntaxPage'
import DSLPipelinePage from './components/DSLPipelinePage'
// import FooterComponent from "@/components/FooterComponent";

export default {
  name: 'App',

  components: {
    // FooterComponent,
    DSLSyntaxPage,
    DSLPipelinePage,
  },

  data: () => ({
    drawer: null,
    logo: require("./assets/mobigen_logo.svg"),
    page: "dsl-pp",
    titles: {
      'dsl-sp': "DSL Syntax for Version 1",
      'dsl-pp': "DSL Pipeline for Version 1",
    }
  }),
}
</script>
