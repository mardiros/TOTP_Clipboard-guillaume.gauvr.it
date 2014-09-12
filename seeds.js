
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;


function _get_seed_path() {
    return GLib.build_filenamev([GLib.get_user_config_dir(), 'totp-seeds.json']);
}


function get_seeds() {
    let seeds;
    try {
        seeds = GLib.file_get_contents(_get_seed_path());
        seeds = seeds[1].toString();
    } catch (e) {
        seeds = '{}'
    }
    return JSON.parse(seeds);
}


function save_seeds(new_seeds) {
    let content = JSON.stringify(new_seeds)
    GLib.file_set_contents(_get_seed_path(), content, content.length);
    let f = Gio.file_new_for_path(_get_seed_path());
    f.set_attribute_uint32(Gio.FILE_ATTRIBUTE_UNIX_MODE, parseInt('600', 8),
                           Gio.FileQueryInfoFlags.NONE, null);
}
