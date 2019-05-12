Ext.application({
    name: 'ApiHub',
    appFolder: '/static/admin',
    requires: [
        'Ext.util.Cookies',
    ],
    views: [],
    controllers: [
        'Login',
        'TranslationManager',
        'Menu',
        'security.Group',
        'security.User'
    ],
    init: function() {
        Ext.get
        Ext.Ajax.on('beforerequest',function(conn, options){
            var method = options.method;
            if(method === undefined) {
                method = 'POST';
            }
            var isCsrfSafeMethod = (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
            if(!isCsrfSafeMethod) {
                var token = Ext.util.Cookies.get('csrftoken');
                if(token != undefined) {
                    if(options.headers === undefined) {
                        options.headers = {'X-CSRFToken': token};
                    }else{
                        options.headers['X-CSRFToken'] = token;
                    }
                }
            }
        });

        splashscreen = Ext.getBody().mask('Loading application',
           'splashscreen');
        splashscreen.addCls('splashscreen');
        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
            cls: 'x-splash-icon'
        });
    },
    launch: function() {
        var task = new Ext.util.DelayedTask(function() {
            splashscreen.fadeOut({
                duration: 1000,
                remove:true
            });
            splashscreen.next().fadeOut({
                duration: 1000,
                remove:true,
                listeners: {
                    afteranimate: function(el, startTime, eOpts){
                        Ext.Ajax.request({
                            method: 'GET',
                            url: 'login',
                            success: function(conn, response, options, eOpts) {
                                Ext.widget('appviewport');
                            },
                            failure: function(conn, response, options, eOpts) {
                                Ext.widget('login');
                            }
                       });
                   }
               }
           });
        });
        task.delay(2000);
    }
});