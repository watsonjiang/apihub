Ext.define('ApiHub.view.Translation', {
    extend: 'Ext.button.Split',
    alias: 'widget.translation',

    menu: Ext.create('Ext.menu.Menu', {
        items: [
            {
                xtype: 'menuitem',
                iconCls: 'en',
                text: 'English'
            },
            {
                xtype: 'menuitem',
                iconCls: 'zh_CN',
                text: '中文'
            }
        ]
    })
});