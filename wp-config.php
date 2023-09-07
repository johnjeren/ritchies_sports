<?php

//Begin Really Simple SSL session cookie settings
@ini_set('session.cookie_httponly', true);
@ini_set('session.cookie_secure', true);
@ini_set('session.use_only_cookies', true);
//END Really Simple SSL cookie settings
 require_once(__DIR__ . '/vendor/autoload.php');

 if (file_exists(ABSPATH.'./.env')) {
     $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
     $dotenv->load();
 }
 


 // upload aws plugin
/*
define('SSU_PROVIDER', 'aws'); // put either aws or wasabi
define('SSU_KEY', $_ENV['SSU_KEY']);
define('SSU_SECRET', $_ENV['SSU_SECRET']);
define('SSU_BUCKET', $_ENV['SSU_BUCKET']);
define('SSU_FOLDER', $_ENV['SSU_FOLDER']); // optional
define('SSU_REGION', $_ENV['SSU_REGION']); // optional
define('SSU_SURL_EXPIRY', 60); // in seconds
define('SSU_CAPABILITY', 'manage_options'); // optional
*/
define('WP_CACHE', true); // WP-Optimize Cache
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */
// ** MySQL settings - You can get this info from your web host ** //

  /** The name of the database for WordPress */
  define('DB_NAME', $_ENV['DB_NAME']);
  /** MySQL database username */
  define('DB_USER',  $_ENV['DB_USER']);
  /** MySQL database password */
  define('DB_PASSWORD',  $_ENV['DB_PASSWORD']);
  /** MySQL hostname */
  define('DB_HOST',  $_ENV['DB_HOST']);


/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');
/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
define('WP_MEMORY_LIMIT', '512M');
set_time_limit(1500);


/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
 define('AUTH_KEY',         'x?E_#+%Jp{Nc1LMS$`h)@e*k6Sz9lb8x[9H<6lIpy=?0sN&U^UKfPkwquT+I(Pb/');
 define('SECURE_AUTH_KEY',  '@L#fTZ[PG8&BRWU|]SgB}|249c^+XC|%k=(W*.(1rg}/F.fvIO=*Leon&j[[+?G7');
 define('LOGGED_IN_KEY',    'I|89QX6tiry0 0=ie&f|2z7g*XU@#&5Uu]+O6&&BFsF6EuP6HqhXJ}FCoI=T5/kj');
 define('NONCE_KEY',        'xp6q fY2Bv{)-8V_B^*1Dn4G^gQ4/$_X3dcP+e0QWSRBH`V[sJivM<k+>RvJf%1$');
 define('AUTH_SALT',        'DEB]s+vH;hfC4&|$L-ac@.N{Fal_lP1j$H:E+:?Ve^;/NIz$TwfWvwuFOSEf0^u:');
 define('SECURE_AUTH_SALT', '#Mhqm+*l|rtMs wiF3i/4<tt?*G:_pi_7`34Ol,#lG3P,p@Xp<f5|[l+Or]yXGKU');
 define('LOGGED_IN_SALT',   'O*X[[*WF/=8eqX5*#QnmcZ)F=r`;/|YZM(2rW[O-i}7g f+|QXt-;,mcMJU4G4]F');
 define('NONCE_SALT',       'q +.C_JZz2:xuD2jj>AEV/BC RZ*X8.7fcYu+*~f+OU;BGUP/=Bu-g-dK-EiIUhQ');
/**#@-*/
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';
/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */

 @ini_set('display_errors', 0);
define('WP_DEBUG', $_ENV['WP_DEBUG']??false);
define('WP_DEBUG_LOG', $_ENV['WP_DEBUG_LOG']??false);
define('WP_DEBUG_DISPLAY', false);

define( 'CF_IMAGES_ACCOUNT_ID', 'f75b11570f374a7132aaef3ef9c622d9' );
define( 'CF_IMAGES_KEY_TOKEN', 'Yv0CKkiZ7HF9ujuszY-u4qXtPAAlkO_t-qCtjL8l' );
/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');


