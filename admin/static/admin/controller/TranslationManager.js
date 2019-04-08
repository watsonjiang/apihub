Ext.define('ApiHub.controller.TranslationManager', {
    extend: 'Ext.app.Controller',

    views: [
        'Translation'
    ],

    refs: [
        {
            ref: 'translation',
            selector: 'translation'
        }
    ],

    onMenuitemClick: function(item, e, options) {
        var menu = this.getTranslation();

        menu.setIconCls(item.iconCls);
        menu.setText(item.text);

        localStorage.setItem("user-lang", item.iconCls);

        window.location.reload();
    },

    onSplitbuttonBeforeRender: function(abstractcomponent, options) {
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'zh_CN') : 'zh_CN';
        abstractcomponent.iconCls = lang;

        if (lang == 'en'){
            abstractcomponent.text = 'English';
        } else if (lang == 'zh_CN'){
            abstractcomponent.text = '中文';
        }
    },

    init: function(application) {
        this.control({
            "translation menuitem": {
                click: this.onMenuitemClick
            },
            "translation": {
                beforerender: this.onSplitbuttonBeforeRender
            }
        });
    }
});