Ext.define('ApiHub.view.security.User', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.user',

    requires: [
        'ApiHub.view.security.UserList'
    ],

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'userlist'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    itemId: 'add',
                    iconCls: 'add'
                },
                {
                    xtype: 'button',
                    text: 'Edit',
                    itemId: 'edit',
                    iconCls: 'edit'
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    itemId: 'delete',
                    iconCls: 'delete'
                }
            ]
        }
    ]
});
