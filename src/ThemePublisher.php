<?php

declare(strict_types=1);

namespace Krma\KCFinder\Bootstrap5Theme;

use FilesystemIterator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RuntimeException;

final class ThemePublisher
{
    public function __construct(
        private readonly string $source = __DIR__ . '/../dist/bootstrap5'
    ) {
    }

    /** @return array{path: string, version: string, files: int} */
    public function publish(string $themesDirectory, bool $force = false): array
    {
        $source = realpath($this->source);
        if ($source === false || !is_file($source . '/manifest.json')) {
            throw new RuntimeException('The Bootstrap 5 theme distribution is unavailable.');
        }

        $themesDirectory = rtrim($themesDirectory, "/\\");
        if ($themesDirectory === '') {
            throw new RuntimeException('A target themes directory is required.');
        }
        if (!is_dir($themesDirectory) && !mkdir($themesDirectory, 0775, true) && !is_dir($themesDirectory)) {
            throw new RuntimeException('Unable to create the target themes directory.');
        }

        $target = $themesDirectory . DIRECTORY_SEPARATOR . 'bootstrap5';
        if (file_exists($target) && !$force) {
            throw new RuntimeException('The Bootstrap 5 theme already exists; use force to replace it.');
        }

        $temporary = $themesDirectory . DIRECTORY_SEPARATOR . '.bootstrap5-' . bin2hex(random_bytes(6));
        mkdir($temporary, 0775, true);
        $files = $this->copyDistribution($source, $temporary);

        $backup = null;
        try {
            if (file_exists($target)) {
                $backup = $themesDirectory . DIRECTORY_SEPARATOR . '.bootstrap5-backup-' . bin2hex(random_bytes(6));
                if (!rename($target, $backup)) {
                    throw new RuntimeException('Unable to preserve the currently installed theme.');
                }
            }
            if (!rename($temporary, $target)) {
                throw new RuntimeException('Unable to activate the published theme.');
            }
            if ($backup !== null) {
                $this->removeDirectory($backup);
            }
        } catch (\Throwable $exception) {
            $this->removeDirectory($temporary);
            if ($backup !== null && !file_exists($target)) {
                rename($backup, $target);
            }
            throw $exception;
        }

        $version = trim((string) file_get_contents($target . DIRECTORY_SEPARATOR . 'VERSION'));
        return array('path' => $target, 'version' => $version, 'files' => $files);
    }

    private function copyDistribution(string $source, string $target): int
    {
        $count = 0;
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($source, FilesystemIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );
        foreach ($iterator as $entry) {
            $relative = substr($entry->getPathname(), strlen($source) + 1);
            $destination = $target . DIRECTORY_SEPARATOR . $relative;
            if ($entry->isDir()) {
                if (!is_dir($destination)) {
                    mkdir($destination, 0775, true);
                }
                continue;
            }
            if ($entry->isLink() || !copy($entry->getPathname(), $destination)) {
                throw new RuntimeException('Unable to publish theme file: ' . $relative);
            }
            $count++;
        }
        return $count;
    }

    private function removeDirectory(string $directory): void
    {
        if (!is_dir($directory)) {
            return;
        }
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($directory, FilesystemIterator::SKIP_DOTS),
            RecursiveIteratorIterator::CHILD_FIRST
        );
        foreach ($iterator as $entry) {
            $entry->isDir() ? rmdir($entry->getPathname()) : unlink($entry->getPathname());
        }
        rmdir($directory);
    }
}
