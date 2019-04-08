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
            name: 'icon_cls'
        },
        {
            name: 'class_name'
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