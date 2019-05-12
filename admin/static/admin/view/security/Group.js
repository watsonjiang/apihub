Ext.define('ApiHub.view.security.Group', {
    extend: 'Ext.container.Container',
    alias: 'widget.group',

    requires: [
        'ApiHub.view.security.GroupList',
        //'ApiHub.view.security.GroupPermission',
        'ApiHub.view.security.GroupEdit'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'grouplist',
            flex: 1
        },
        {
            xtype: 'groupedit',
            flex: 2
        }
    ]

});