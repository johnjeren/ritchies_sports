<?php 
namespace Ritchies\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Product extends Model{

    public static function booted(){
        static::addGlobalScope('post_type', function (Builder $builder) {
            $builder->where('post_type', 'product')->orWhere('post_type', 'product_variation');
        });
    }

    public function getTable(){
        return 'wp_posts';
    }

    public function getMeta($key,$parent = false){
        if($parent){
            return get_post_custom($this->post_parent)[$key][0];
        }
        return get_post_custom($this->ID)[$key][0];
    }

    public function isVariation(){
        return $this->post_type == 'product_variation';
    }

    public function getProductImage(){
        // get image url from id from acf image field
        if(!$this->getMeta('_thumbnail_id')) {
            return wp_get_attachment_image_src($this->getMeta('_thumbnail_id',true),'full')[0];
        }
        return wp_get_attachment_image_src($this->getMeta('_thumbnail_id'), 'full')[0];
    }

    public function getLinkAttribute(){
        if($this->isVariation()){
            return get_permalink($this->post_parent);
        }
        return get_permalink($this->ID);
    }

    
    

}