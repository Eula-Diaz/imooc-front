import { defineAsyncComponent } from 'vue'

export default {
  install(app) {
    const components = import.meta.glob('./*/index.vue')
    Object.keys(components).forEach((path) => {
      const name = path.split('/').slice(-2)[0]
      console.log(name)
      app.component(`m-${name}`, defineAsyncComponent(components[path]))
    })
  }
}
