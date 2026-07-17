<?php

namespace kcfinder;

$coreRoot = $GLOBALS['KCFINDER_CORE_ROOT'] ?? dirname(__DIR__, 2);
chdir($coreRoot);
require $coreRoot . "/core/autoload.php";
$theme = basename(dirname(__FILE__));
$min = new minifier("css");
$min->minify("cache/theme_$theme.css");
