Ext.define('ApiHub.model.menu.Root', {
    extend: 'Ext.data.Model',

    uses: [
        'ApiHub.model.menu.Item'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'text'
        },
        {
            name: 'icon_cls'
        },
        {
            name: 'id'
        }
    ],

    hasMany: {
        model: 'ApiHub.model.menu.Item',
        foreignKey: 'parent_id',
        name: 'items'
    }
});