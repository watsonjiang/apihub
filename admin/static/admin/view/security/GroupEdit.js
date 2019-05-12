Ext.define('ApiHub.view.security.GroupEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.groupedit',

    requires: [
        'ApiHub.util.Util',
        //'ApiHub.view.security.GroupPermission',
        'ApiHub.view.security.UserList'
    ],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    bodyPadding: 10,
    title: 'Edit Selected Group',

    items: [
        {
            xtype: 'fieldset',
            height: 100,
            title: 'Group Information',
            defaults: {
                afterLabelTextTpl: ApiHub.util.Util.required,
                anchor: '100%',
                xtype: 'textfield',
                allowBlank: false,
                msgTarget: 'under'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'Label',
                    name: 'id'
                },
                {
                    fieldLabel: 'Group name',
                    name: 'name',
                    maxLength: 45,
                    minLength: 3
                }
            ]
        },
        //{
        //    xtype: 'grouppermission',
        //    flex: 2
        //},
        {
            xtype: 'userlist',
            emptyText: 'No users in this group.',
            title: 'Users in this Group',
            hideGroup: true,
            flex: 1
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            layout: {
                pack: 'end',
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Cancel',
                    itemId: 'cancel',
                    iconCls: 'cancel'
                },
                {
                    xtype: 'button',
                    text: 'Save',
                    itemId: 'save',
                    iconCls: 'save'
                }
            ]
        }
    ]

});