Ext.define('ApiHub.view.security.GroupPermission', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.grouppermission',

    requires: ['ApiHub.store.security.Permission'],

    title: 'Group Permissions',
    rootVisible: false,
    useArrows: true,
    frame: false,
    viewConfig: {
	    markDirty: false
	},

   // store: Ext.create('ApiHub.store.security.Permission')

});