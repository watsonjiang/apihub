insert into admin_menu(id, text, icon_cls) values(1, 'menu1', 'menu_admin');
insert into admin_menu(id, text, icon_cls, parent_id, class_name)values(2, 'menu11', 'menu_groups', 1, 'panel'), (3, 'menu12', 'menu_users', 1, 'panel');
insert into admin_menu(id, text, icon_cls, parent_id, class_name)values(4, 'menu13', 'menu_profile', 1, 'panel');
insert into admin_group(name) values('admin');
insert into admin_userprofile(name, username, password, email, group_id, user_id)values('administrator', 'admin', '709e17d2a62751a051fa2072f0976334', 'watson@home.com', 1, 1);
insert into admin_permission(menu_id, group_id)values(1, 1),(2, 1),(3, 1);
insert into admin_permission(menu_id, group_id)values(4,1);
