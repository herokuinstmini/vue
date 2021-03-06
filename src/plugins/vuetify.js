import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.blueGrey.darken4,
                secondary: colors.blueGrey.lighten5,
                accent: colors.pink.lighten1,
                error: colors.pink.lighten1,
                background: colors.pink.accent3,
            }
        }
    }
});
