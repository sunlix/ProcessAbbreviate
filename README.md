# Abbreviate

## Easily mark up and manage abbreviations

This module helps you to easily mark up all your used abbreviations.
Them will be collected after any page were saved.

Read the **How to use** section for further informations.

## How to install

1. Place the module files in /site/modules/ProcessAbbreviate/
2. In your admin, click Modules > Check for new modules
3. Click "install" for **Abbreviate** (base module)
4. Move the ```plugins/abbr``` folder to ```InputfieldCKEditor``` module in your ```site```
5. Enable the plugin on your CKEditor field and add them to your toolbar
6. Now go to Setup > Abbreviations and start defining your abbreviations!

### Install via composer

```
composer require "zenmotion/process-abbreviate:*"
```

After that, you can follow **How to install** from step 4.

## How to use

Please make sure that you have completed the *How to install* section first. Then in your admin, go to Setup > Abbreviations.

On this setup page you can add or edit all your abbreviations manually. The functions are very common and should be self explained.

After saving any page the base module extract all marked up abbreviations in textarea fields and will add them to database.

------
Copyright 2014-2016 by Sven Schüring
