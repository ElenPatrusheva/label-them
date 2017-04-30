# LabelThem

[![Code Climate](https://codeclimate.com/github/innosoft-pro/label-them/badges/gpa.svg)](https://codeclimate.com/github/innosoft-pro/label-them)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/735a6f0a94844ce686d680a0d4474789)](https://www.codacy.com/app/LabelThem/label-them?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=innosoft-pro/label-them&amp;utm_campaign=Badge_Grade)

*LabelThem* is an online markup tool aimed at building image datasets for computer vision research, and integrated with 
[Yandex.Toloka crowdsourcing system](https://toloka.yandex.ru/).

#### System Prerequisites

In order to get started, you'll need to install [NodeJS runtime](https://nodejs.org/en/),
[Bower package manager](https://bower.io/#install-bower)
and [Grunt's command line interface (CLI)](https://gruntjs.com/getting-started) globally.
You may need to use `sudo` (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.

#### Important Notice
At the moment *LabelThem* works  only with [Yandex.Toloka crowdsourcing system](https://toloka.yandex.ru/) in 
[Chromium Browser](http://www.chromium.org/Home) and [Chrome](https://www.google.ru/chrome) web browsers.

If an image cannot fit the screen in width. Only left part of the image that fits the screen will be displayed!

#### Building systemGenerating source files for Yandex.Toloka

In order to test the system on the local machine, or to generate source files needed to run the system on 
Yandex Toloka crowdsourcing platform you need to open a directory, which contains *LabelThem* system source code 
in a terminal (command shell on Windows), and execute the following commands:
1) `bower update` // to download libraries used by the system
2) `npm install grunt-contrib-cssmin --save-dev` // to install css minification plugin
3) `npm update` // to install all the pre-defined dependencies (plugins) by going through the package.json file
4) `grunt` // to generate source files needed to run the system on Yandex Toloka crowdsourcing platform
(to build systems minified and concatenated file)

The source files that are needed to run the system on Yandex Toloka crowdsourcing platform are:
1) `/front/main.html`
2) `/build/app.js`
3) `/build/css/concat.min.css`

Instructions on **how to start working with *LabelThem* system on Yandex.Toloka** can be found on 
[the corresponding wiki page](https://github.com/innosoft-pro/label-them/wiki/Getting-started-YandexToloka).

Newest version of *LabelThem* source files, compatible with Yandex.Toloka crowdsourcing platform are located in 
`develop-toloka` branch.