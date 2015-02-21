2FA Gnome Shell Extension
=========================

TOTP 2 Factor Authentication made simple for
Gnome Shell users.

This extension display a clickable padlock in the topbar,
that display a menu of configured TOTP Seeds.

A click on an item copy the current token for the seed
in the clipboard.


Installation
------------

::

  $ cd ~/.local/share/gnome-shell/extensions
  $ git clone https://github.com/mardiros/TOTP_Clipboard-guillaume.gauvr.it.git TOTP_Clipboard@guillaume.gauvr.it

  $ gsettings get org.gnome.shell enabled-extensions
  ['alternate-tab@gnome-shell-extensions.gcampax.github.com', 'nohotcorner@azuri.free.fr'}
  # Append in the previous output list
  $ gsettings set org.gnome.shell enabled-extensions "['alternate-tab@gnome-shell-extensions.gcampax.github.com', 'nohotcorner@azuri.free.fr', 'TOTP_Clipboard@guillaume.gauvr.it']"
  $ gsettings get org.gnome.shell enabled-extensions
  ['alternate-tab@gnome-shell-extensions.gcampax.github.com', 'nohotcorner@azuri.free.fr', 'TOTP_Clipboard@guillaume.gauvr.it']


Now you have a padlock on the top right of your screen,
click, configure, enjoy...


Configuration
-------------

Configuration is accessible via the menu or via the extensions configuration,
https://extensions.gnome.org/local/

The seeds are stored in your $HOME directory, in a json file,
~/.config/totp-seeds.json accessible in read/write mode only by the user (600).

::

  $ ls -l ~/.config/totp-seeds.json
    -rw------- 1 guillaume users 93 Oct 31 20:48 /home/guillaume/.config/totp-seeds.json


