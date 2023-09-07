<?php
use Illuminate\Database\Capsule\Manager as Capsule;
/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our theme. We will simply require it into the script here so that we
| don't have to worry about manually loading any of our classes later on.
|
*/


if (! file_exists($composer = __DIR__.'/vendor/autoload.php')) {
    wp_die(__('Error locating autoloader. Please run <code>composer install</code>.', 'sage'));
}

require $composer;


/*
|--------------------------------------------------------------------------
| Register The Bootloader
|--------------------------------------------------------------------------
|
| The first thing we will do is schedule a new Acorn application container
| to boot when WordPress is finished loading the theme. The application
| serves as the "glue" for all the components of Laravel and is
| the IoC container for the system binding all of the various parts.
|
*/

if (! function_exists('\Roots\bootloader')) {
    wp_die(
        __('You need to install Acorn to use this theme.', 'sage'),
        '',
        [
            'link_url' => 'https://roots.io/acorn/docs/installation/',
            'link_text' => __('Acorn Docs: Installation', 'sage'),
        ]
    );
}

\Roots\bootloader()->boot();

/*
|--------------------------------------------------------------------------
| Register Sage Theme Files
|--------------------------------------------------------------------------
|
| Out of the box, Sage ships with categorically named theme files
| containing common functionality and setup to be bootstrapped with your
| theme. Simply add (or remove) files from the array below to change what
| is registered alongside Sage.
|
*/


collect(['setup', 'filters'])
    ->each(function ($file) {
        if (! locate_template($file = "app/{$file}.php", true, true)) {
            wp_die(
                /* translators: %s is replaced with the relative file path */
                sprintf(__('Error locating <code>%s</code> for inclusion.', 'sage'), $file)
            );
        }
    });

    add_action('init', 'load_eloquent_capsule');


    function load_eloquent_capsule(){

        //Load Eloquent Capsule
        $capsule = new \Illuminate\Database\Capsule\Manager(new \Illuminate\Container\Container);
        $capsule->addConnection([
            "driver" => "mysql",
            "host" => $_ENV['DB_HOST'] ?? 'localhost',
            "database" => $_ENV['DB_NAME'] ?? 'database',
            "username" =>$_ENV['DB_USER'] ?? 'root',
            "password" => $_ENV['DB_PASSWORD'] ?? '',
            'strict' => FALSE,
            'charset' => 'utf8',
            'collation' => $_ENV['DB_COLLATE'] ?? 'utf8_unicode_ci',
        ]);
    
        //Make this Capsule instance available globally.
        $capsule->setAsGlobal();
    
        // Setup the Eloquent ORM.
        $capsule->bootEloquent();
    
    }

    // if Models are in app/Models folder require them
    foreach (glob(__DIR__ . "/app/Models/*.php") as $filename) {
        require_once $filename;
    }

    // if app/Classes folder require them
    foreach (glob(__DIR__ . "/app/Classes/*.php") as $filename) {
        require_once $filename;
    }

    wp_enqueue_style('glide','https://cdn.jsdelivr.net/npm/@glidejs/glide@3.5.x/dist/css/glide.core.min.css');
wp_enqueue_script('glide-js','https://cdn.jsdelivr.net/npm/@glidejs/glide@3.5.x');


