<?php
#
# Abbreviate  -  find used abbreviations and mark them with the right title
#
# Copyright (c) 2014 Sven Schüring
# <http://www.zenmotion.de>
#

function abbreviate($text) {

	$text = preg_replace('/ (z\.B\.) /', ' <abbr title="zum Beispiel">$1</abbr> ', $text);

	return $text;
}
