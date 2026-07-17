<?php

declare(strict_types=1);

require dirname(__DIR__) . '/vendor/autoload.php';

use Krma\KCFinder\Bootstrap5Theme\ThemePublisher;

$target = sys_get_temp_dir() . '/kcfinder-theme-publisher-' . bin2hex(random_bytes(4));
$result = (new ThemePublisher())->publish($target);
if (
    $result['version'] !== '0.3.1'
    || !is_file($result['path'] . '/manifest.json')
    || !is_file($result['path'] . '/css.php')
) {
    throw new RuntimeException('Published theme verification failed.');
}
echo "Theme publisher check passed.\n";
