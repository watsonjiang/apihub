Ext.define('ApiHub.store.security.Group', {
    extend: 'Ext.data.Store',

    requires: [
        'ApiHub.model.security.Group'
    ],

    model: 'ApiHub.model.security.Group',

    storeId: 'group',

    autoLoad: true,

    proxy: {
        type: 'rest',
        url: 'group',

        reader: {
            type: 'json',
            root: 'data'
        }
    }
});