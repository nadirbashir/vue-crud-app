import { createApp } from 'vue'
import App from './App.vue'

import BaseButton from './components/ui/BaseButton.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseDialog from './components/ui/BaseDialog.vue'
import BaseBadge from './components/ui/BaseBadge.vue'

const app = createApp(App)

app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-dialog', BaseDialog)
app.component('base-badge', BaseBadge)

app.mount('#app')
