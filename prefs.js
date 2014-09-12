const Lang = imports.lang;
const GLib = imports.gi.GLib;
const Gtk = imports.gi.Gtk;
const Gio = imports.gi.Gio;

const ExtensionUtils = imports.misc.extensionUtils;

const Me = ExtensionUtils.getCurrentExtension();
const Seeds = Me.imports.seeds;


function init() {}


const SeedEdit = new Lang.Class({
    Name: 'TotpAppMenuItem',
    Extends: Gtk.HBox,

    _init: function(name, seed, on_delete) {
        this.parent({'border_width': 2});
        this._on_delete = on_delete;
        this.add(new Gtk.Label({label: 'name:'}));
        this.name_entry = new Gtk.Entry({'text': name})
        this.add(this.name_entry);
        this.add(new Gtk.Label({label: 'seed:'}));
        this.seed_entry = new Gtk.Entry({'text': seed})
        this.add(this.seed_entry);
        this._del_btn = new Gtk.Button({'halign': Gtk.Align.END,
                                       'label': 'remove' });
        this._del_btn.connect('clicked', Lang.bind(this, this._on_del_click));
        this.add(this._del_btn);
    },

    register: function(record) {
        record[this.name_entry.get_text()] = this.seed_entry.get_text();
    },

    _on_del_click: function() {
        this._on_delete(this);
    }
});


const App = new Lang.Class({
    Name: 'TOTPSettings',

    _init: function(){
        this.mainbox = new Gtk.VBox({'spacing': 10,
                                     'border_width': 10,
                                     });

        // Create a label for the penguin to talk to you
        this._title = new Gtk.Label ({
            'height_request': 32,
            'width_request': 400,
            'label': 'TOTP Seeds',
            'wrap': true });

        this.mainbox.add(this._title);

        this.seeds_box = new Gtk.VBox();

        let item;
        let seeds = Seeds.get_seeds();;
        for (let seed in seeds) {
            item = new SeedEdit(seed, seeds[seed],
                                Lang.bind(this, this._del_seed));
            this.seeds_box.add(item);
        }
        this.mainbox.add(this.seeds_box);

        // Create a button to send your message to the penguin
        this._add_btn = new Gtk.Button ({
            halign: Gtk.Align.END,
            margin_top: 20,
            label: 'Add seed' });
        this._add_btn.connect('clicked', Lang.bind(this, this._add_seed));


        // Create a button to send your message to the penguin
        this._saveBtn = new Gtk.Button ({
            halign: Gtk.Align.END,
            margin_top: 20,
            label: 'Save' });
        this._saveBtn.connect('clicked', Lang.bind(this, this._save_seeds));

        this.btnBox = new Gtk.HBox();
        this.btnBox.add(this._add_btn);
        this.btnBox.add(this._saveBtn);
        this.mainbox.add(this.btnBox);

        this.mainbox.show_all();
    },

    _add_seed: function() {
        let item = new SeedEdit('', '', Lang.bind(this, this._del_seed));
        this.seeds_box.add(item);
        this.mainbox.show_all();
    },

    _del_seed: function(box) {
        this.seeds_box.remove(box);
        this.mainbox.show_all();
    },

    _save_seeds: function() {

        let new_seeds = {}
        this.seeds_box.foreach(
            function(child) {
                child.register(new_seeds);
            });

        Seeds.save_seeds(new_seeds);
    }

});

function buildPrefsWidget() {
    let app = new App();
    return app.mainbox;
}
