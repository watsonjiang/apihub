Ext.define('ApiHub.store.security.User', {
    extend: 'Ext.data.Store',

    requires: [
        'ApiHub.model.security.User'
    ],

    model: 'ApiHub.model.security.User',

    storeId: 'group',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url: 'user',

        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
