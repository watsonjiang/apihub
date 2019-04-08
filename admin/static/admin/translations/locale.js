var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en';
var file = '/static/admin/translations/' + lang + '.js';
var extjsFile = '/static/extjs-4.2.1/locale/ext-lang-' + lang + '.js';

document.write('<script type="text/javascript" src="' + file + '"></script>');
document.write('<script type="text/javascript" src="' + extjsFile + '"></script>');
