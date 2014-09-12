const St = imports.gi.St;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Lang = imports.lang;
const Atk = imports.gi.Atk;
const GLib = imports.gi.GLib;
const PanelMenu = imports.ui.panelMenu;
const Shell = imports.gi.Shell;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Totp = Me.imports.totp;
const Seeds = Me.imports.seeds;
const metadata = Me.metadata;

let app;

const TotpAppMenuItem = new Lang.Class({
    Name: 'TotpAppMenuItem',
    Extends: PopupMenu.PopupMenuItem,

    _init: function(entry, on_click) {
        this.entry = entry
        this._on_click = on_click;
        this.parent(this._get_text());
        this.connect('activate', Lang.bind(this, this._on_item_click));
    },
    _get_text: function() {
        return this.entry;
    },

    _on_item_click: function() {
        this._on_click(this);
    },
});


const TrayButton = new Lang.Class({
    Name: 'TrayButton',
    Extends: PanelMenu.Button,

    _init: function() {
        this.is_visible = false;
        this.parent(0.5);
        this._clipboard = St.Clipboard.get_default();

        let icon = new St.Icon({'icon_name': 'channel-secure-symbolic',
                                'style_class': 'system-status-icon' });
        this.actor.add_actor(icon);
    },

    _onButtonPress: function(actor, event) {
        if (!this.is_visible) {
            this._add_menu();
        }
        this.is_visible = !this.is_visible;

        this.menu.toggle();
    },

    _add_menu: function() {
        let item;

        let menu = this.menu.box
        menu.foreach(
            function(child) {
                menu.remove_child(child);
            });

        this.seeds = Seeds.get_seeds();
        for (let seed in this.seeds) {
            item = new TotpAppMenuItem(seed, Lang.bind(this, this._on_seed_click));
            this.menu.addMenuItem(item);
        }
        let _appSys = Shell.AppSystem.get_default();
        let _gsmPrefs = _appSys.lookup_app('gnome-shell-extension-prefs.desktop');

        this.prefItem = new PopupMenu.PopupMenuItem(_('Preferences...'));
        this.prefItem.connect('activate', function () {
            if (_gsmPrefs.get_state() == _gsmPrefs.SHELL_APP_STATE_RUNNING) {
                _gsmPrefs.activate();
            }
            else {
                _gsmPrefs.launch(global.display.get_current_time_roundtrip(),
                                 [metadata.uuid], -1, null);
            }
        });
        this.menu.addMenuItem(this.prefItem);
    },

    _on_seed_click: function(seed_item) {
        let token = Totp.get_token(this.seeds[seed_item.entry])
        this._clipboard.set_text(St.ClipboardType.PRIMARY, token);
        this._clipboard.set_text(St.ClipboardType.CLIPBOARD, token);
    }

});

const TotpApp = new Lang.Class({
    Name: 'TotpApp',

    _init: function() {
        this.tray_icon = new TrayButton();
    },

});

function init() {}

function enable() {
    app = new TotpApp();
    let panel = Main.panel._rightBox;
    Main.panel._addToPanelBox('totp', app.tray_icon, 1, panel);
}

function disable() {
    app.tray_icon.destroy();
    app = null;
}
