<?php 
namespace Ritchies\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Staff extends Model{

    public static function booted(){
        static::addGlobalScope('post_type', function (Builder $builder) {
            $builder->where('post_type', 'staff');
        });
    }

    public function getTable(){
        return 'wp_posts';
    }

    public function getMeta($key){
        return get_post_custom($this->ID)[$key][0];
    }

    public function getImageAttribute(){
        // get image url from id from acf image field
        if(!$this->getMeta('image')) return get_stylesheet_directory_uri() . '/resources/images/person-icon.png';
        return wp_get_attachment_image_src($this->getMeta('image'), 'full')[0];
    }
    
    public function getFirstNameAttribute(){
        // explode name and return first name
        return explode(' ', $this->post_title)[0];
    }

}