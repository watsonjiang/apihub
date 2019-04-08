Ext.define('ApiHub.view.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',
    requires: [
        'ApiHub.view.Translation',
    ],
    autoShow: true,
    height: 170,
    width: 360,
    layout: {
        type: 'fit'
    },
    iconCls: 'key',
    title: "Login",
    closeAction: 'hide',
    closable: false,
    items: [
        {
            xtype: 'form',
            frame: false,
            bodyPadding: 15,
            defaults: {
                xtype: 'textfield', // #16
                anchor: '100%',
                labelWidth: 60,
                allowBlank: false,
                vtype: 'alphanum',
                minLength: 3,
                msgTarget: 'under'
            },
            items: [
                {
                    name: 'user',
                    fieldLabel: translations.user
                },
                {
                    inputType: 'password',
                    name: 'password',
                    fieldLabel: translations.password
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                                {
                                    xtype: 'translation'
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'cancel',
                                    iconCls: 'cancel',
                                    text: translations.cancel
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'submit',
                                    formBind: true,
                                    iconCls: 'key-go',
                                    text: translations.submit
                                }
                            ],
                }
            ]
        }
    ],

});