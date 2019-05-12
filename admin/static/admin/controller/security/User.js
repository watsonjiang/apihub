Ext.define('ApiHub.controller.security.User', {
    extend: 'Ext.app.Controller',

    requires: [
        'ApiHub.util.Util',
    ],

    views: [
        'security.User',
        'security.Profile'
    ],

    stores: [
        'security.User'
    ],

    refs: [
        {
            ref: 'userList',
            selector: 'userlist'
        },
        {
            ref: 'userPicture',
            selector: 'profile image'
        }
    ],

    init: function(application) {

        this.control({
            "userlist": {
                render: this.onRender
            },
            "user button#add": {
                click: this.onButtonClickAdd
            },
            "user button#edit": {
                click: this.onButtonClickEdit
            },
            "user button#delete": {
                click: this.onButtonClickDelete
            },
            "profile button#save": {
                click: this.onButtonClickSave
            },
            "profile button#cancel": {
                click: this.onButtonClickCancel
            },
            "profile filefield": {
                change: this.onFilefieldChange
            }
        });

        if (!Ext.getStore('group')) {
            Ext.create('ApiHub.store.security.Group');
        }    
    },

    onRender: function(component, options) {
        console.log('---reload user store.');
        component.getStore().load();
    },

    onButtonClickAdd: function (button, e, options) {
        console.log('----user add');
        var win = Ext.create('ApiHub.view.security.Profile');
        win.setTitle('Add new User');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {

        var grid = this.getUserList(),
        record = grid.getSelectionModel().getSelection();

        if(record[0]){

            var editWindow = Ext.create('ApiHub.view.security.Profile');

            editWindow.down('form').loadRecord(record[0]);

            if (record[0].get('picture')) {

                var img = editWindow.down('image');
                img.setSrc('resources/profileImages/' + record[0].get('picture'));
            }

            editWindow.setTitle(record[0].get('name'));
            editWindow.show();
        }
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getUserList(),
        record = grid.getSelectionModel().getSelection(), 
        store = grid.getStore();

        if (store.getCount() >= 2 && record[0]){

            Ext.Msg.show({
                 title:'Delete?',
                 msg: 'Are you sure you want to delete?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        Ext.Ajax.request({
                            url: 'php/security/deleteUser.php',
                            params: {
                                id: record[0].get('id')
                            },
                            success: function(conn, response, options, eOpts) {

                                var result = ApiHub.util.Util.decodeJSON(conn.responseText);

                                if (result.success) {

                                    ApiHub.util.Alert.msg('Success!', 'User deleted.');
                                    store.load();
                                  
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
                msg: 'You cannot delete all the users from the application.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },

    onButtonClickSave: function(button, e, options) {
        
        var win = button.up('window'),
        formPanel = win.down('form'),
        store = this.getUserList().getStore();

        if (formPanel.getForm().isValid()) {

            formPanel.getForm().submit({
                clientValidation: true,
                url: 'user',
                success: function(form, action) {

                    var result = action.result;

                    console.log(result);

                    if (result.success) {

                        ApiHub.util.Alert.msg('Success!', 'User saved.');
                        store.load();
                        win.close();
                      
                    } else {
                        ApiHub.util.Util.showErrorMsg(result.msg);
                    }
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Failure', action.result.msg);
                   }
                }
            });
        } 
    },

    onButtonClickCancel: function(button, e, options) {
        button.up('window').close();
    },

    onFilefieldChange: function(filefield, value, options) {
        var file = filefield.fileInputEl.dom.files[0];

        var picture = this.getUserPicture();

        /*
            If the file is an image and the web browser supports FileReader, 
            present a preview in the image component 
        */
        if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
            var reader = new FileReader();
            reader.onload = function(e){
                picture.setSrc(e.target.result);
            };
            reader.readAsDataURL(file); 
        } else if (!(/image/i).test(file.type)){
            Ext.Msg.alert('Warning', 'You can only upload image files!');
            filefield.reset();
        }   
    }
});