Ext.define('ApiHub.store.security.Permission', {
    extend: 'Ext.data.TreeStore',

    clearOnLoad: true,

    proxy: {
        type: 'ajax',
        url: 'permission'
    }
});