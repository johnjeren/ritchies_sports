<?php 
namespace Ritchies\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class OrderItemMeta extends Model{

    public static function booted(){
       
    }

    public function getTable(){
        return 'woocommerce_order_itemmeta';
    }

    public function order_item(){
        return $this->belongsTo(OrderItem::class, 'order_item_id', 'order_item_id');
    }
    

}