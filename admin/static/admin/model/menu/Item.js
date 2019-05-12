Ext.define('ApiHub.model.menu.Item', {
    extend: 'Ext.data.Model',

    uses: [
        'ApiHub.model.menu.Root'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'text'
        },
        {
            name: 'iconCls'
        },
        {
            name: 'className'
        },
        {
            name: 'id'
        },
        {
            name: 'parent_id'
        }
    ],

    belongsTo: {
        model: 'ApiHub.model.menu.Root',
        foreignKey: 'parent_id'
    }
});