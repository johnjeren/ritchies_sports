<?php 
namespace Ritchies\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Order extends Model{

    public static function booted(){
        static::addGlobalScope('post_type', function (Builder $builder) {
            $builder->where('post_type', 'shop_order');
        });
    }

    public function getTable(){
        return 'posts';
    }

    public function order_items(){
        return $this->hasMany(OrderItem::class, 'order_id', 'ID');
    }
    

}