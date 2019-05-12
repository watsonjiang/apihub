Ext.define('ApiHub.controller.security.Group', {
    extend: 'Ext.app.Controller',

    requires: [
        'ApiHub.util.Util'
    ],

    views: [
        'security.Group',
        'security.GroupList',
        'security.GroupEdit',
        'security.GroupPermission'
    ],

    stores: [
        'security.Group'
    ],

    refs: [
        {
            ref: 'groupEdit',
            selector: 'groupedit'
        },
        {
            ref: 'groupPermission',
            selector: 'grouppermission'
        },
        {
            ref: 'groupList',
            selector: 'grouplist'
        }
    ],

    init: function(application) {

        this.control({
            "grouplist": {
                viewready: this.onViewReady,
                selectionchange: this.onSelectionChange
            },
            "grouplist button#add": {
                click: this.onButtonClickAdd
            },
            "grouplist button#delete": {
                click: this.onButtonClickDelete
            },
            "grouppermission": {
                checkchange: this.onCheckChange,
                load: this.onTreeLoad
            },
            "groupedit button#save": {
                click: this.onButtonClickSave
            },
            "groupedit button#cancel": {
                click: this.onButtonClickCancel
            }
        });
    },

    onViewReady: function(component, options) {

    	component.getStore().load(function(records, operation, success) {

    		if (records.length > 0){
    			component.getSelectionModel().select(0);
    		}
    	});
    },

    onSelectionChange: function (sm, records, options) {

    	if (records[0]) {
            this.getGroupEdit().getForm().loadRecord(records[0]);

            this.getGroupPermission().getStore().load({
            	params: {
            		group: records[0].get('id')
            	}
            });

            this.getGroupEdit().down('userlist').getStore().load({
                params: {
                    group: records[0].get('id')
                }
            });

            this.getGroupEdit().setDisabled(false);
        }

    },

    onCheckChange: function (node, checked, options) {

        if (node.isLeaf() && checked) {
            node.parentNode.set('checked', checked);
        } else if (!node.isLeaf()) {
            node.cascadeBy(function(n){
                n.set('checked', checked);
            });
        }
    },

    onTreeLoad: function (component, node, records, successful, options) {

        node.cascadeBy(function(n){
            n.set('text', translations[n.get('text')]);
        });
    },

    onButtonClickAdd: function (button, e, options) {

    	var model = Ext.create('ApiHub.model.security.Group', {
    		id: 0,
    		name: null
    	});

    	this.getGroupEdit().getForm().loadRecord(model);

    	this.getGroupPermission().getStore().load();

        this.getGroupEdit().down('userlist').getStore().removeAll();

        this.getGroupEdit().setDisabled(false);

    },

    onButtonClickDelete: function (button, e, options) {

    	var grid = button.up('grouplist'),
        tree = this.getGroupPermission(),
        formPanel = this.getGroupEdit(),
        form = this.getGroupEdit().getForm(),
        usersGrid = formPanel.down('userlist'),
    	record = grid.getSelectionModel().getSelection(),
        store = grid.getStore();

        if (store.getCount() >= 2 && record[0] && usersGrid.getStore().getCount() == 0){

        	Ext.Msg.show({
			     title:'Delete?',
			     msg: 'Are you sure you want to delete?',
			     buttons: Ext.Msg.YESNO,
			     icon: Ext.Msg.QUESTION,
			     fn: function (buttonId){
			     	if (buttonId == 'yes'){
			     		Ext.Ajax.request({
                            url: 'php/security/deleteGroup.php',
                            params: {
                                id: record[0].get('id')
                            },
                            success: function(conn, response, options, eOpts) {

                                var result = ApiHub.util.Util.decodeJSON(conn.responseText);

                                if (result.success) {

                                    ApiHub.util.Alert.msg('Success!', 'Group deleted.');
                                    store.load();
                                    form.reset();
                                    formPanel.setDisabled(true);
                                    usersGrid.getStore().removeAll();
                                    tree.getStore().load();

                                } else {
                                    ApiHub.util.Util.showErrorMsg(conn.responseText);
                                }
                            },
                            failure: function(conn, response, options, eOpts) {

                                ApiHub.util.Util.showErrorMsg(conn.responseText);
                            }
                        });
			     	}
			     }
			});
        } else if (store.getCount() == 1) {
        	Ext.Msg.show({
                title:'Warning',
                msg: 'You cannot delete all the groups from the application.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        } else if (usersGrid.getStore().getCount() > 0){
            Ext.Msg.show({
                title:'Warning',
                msg: 'You cannot delete groups that have users in it.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    resetForm: function(){

        var form = this.getGroupEdit();

        this.getGroupPermission().getStore().load();

        form.down('userlist').getStore().removeAll();

        form.disable();

        form.getForm().reset();
    },

    onButtonClickCancel: function(button, e, options) {
        this.resetForm();
    },

    onButtonClickSave: function (button, e, options) {

        var store = this.getGroupList().getStore(),
        formPanel = button.up('form'),
        records = formPanel.down('treepanel').getView().getChecked(),
        names = [];

        Ext.Array.each(records, function(rec){
            names.push(rec.get('id'));
        });

        if (formPanel.getForm().isValid()){
        	if (names.length == 0){
	        	Ext.Msg.show({
				    title:'Warning',
				    msg: 'You need to select a least one permission for this group.',
				    buttons: Ext.Msg.OK,
				    icon: Ext.Msg.WARNING
				});
	        } else {

	        	var values = formPanel.getValues();

                Ext.get(formPanel.getEl()).mask("Saving... Please wait...", 'loading');

	        	Ext.Ajax.request({
	                url: 'php/security/saveGroup.php',
	                params: {
	                    id: values.id,
	                    name: values.name,
	                    permissions: names.toString()
	                },
	                success: function(conn, response, options, eOpts) {

	                    Ext.get(formPanel.getEl()).unmask();

	                    var result = ApiHub.util.Util.decodeJSON(conn.responseText);

	                    if (result.success) {

	                        ApiHub.util.Alert.msg('Success!', 'Group saved.');
                            store.load();
                            formPanel.setDisabled(true);

	                    } else {
	                        ApiHub.util.Util.showErrorMsg(conn.responseText);
	                    }
	                },
	                failure: function(conn, response, options, eOpts) {

	                    Ext.get(formPanel.getEl()).unmask();

	                    ApiHub.util.Util.showErrorMsg(conn.responseText);
	                }
	            });
	        }
        }
    }
});