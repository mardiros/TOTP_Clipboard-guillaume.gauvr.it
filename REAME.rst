Gnome Shell Extension for 2 Factors logins using TOTP
=====================================================


Installation
------------

::

  $ cd ~/.local/share/gnome-shell/extensions 
  $ git clone https://github.com/mardiros/TOTP_Clipboard-guillaume.gauvr.it.git
 
  $ gsettings get org.gnome.shell enabled-extensions
  ['alternate-tab@gnome-shell-extensions.gcampax.github.com', 'nohotcorner@azuri.free.fr'}
  # Append in the previous output list
  $ gsettings set org.gnome.shell enabled-extensions "['alternate-tab@gnome-shell-extensions.gcampax.github.com', 'nohotcorner@azuri.free.fr', 'TOTP_Clipboard@guillaume.gauvr.it']"
  $ gsettings get org.gnome.shell enabled-extensions
  ['alternate-tab@gnome-shell-extensions.gcampax.github.com', 'nohotcorner@azuri.free.fr', 'TOTP_Clipboard@guillaume.gauvr.it']


Now you have a padlock on the top right of your screen,
click, configure, enjoy...


