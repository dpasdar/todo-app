import './app.css'
import App from './App.svelte'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// Import Font Awesome Icons
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
const app = new App({
  target: document.getElementById('app')
})

export default app
