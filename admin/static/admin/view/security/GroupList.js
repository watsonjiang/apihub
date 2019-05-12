Ext.define('ApiHub.view.security.GroupList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.grouplist',

    title: 'Groups',
    frame: true,

    store: 'security.Group',

    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            flex: 1,
            text: 'Name'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'add',
                    iconCls: 'add',
                    text: 'Add'
                },
                {
                    xtype: 'button',
                    itemId: 'delete',
                    iconCls: 'delete',
                    text: 'Delete'
                }
            ]
        }
    ]
});