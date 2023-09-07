<?php 
namespace Ritchies\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class OrderItem extends Model{

    public $appends = ['product_id', 'product_name', 'product_price', 'product_quantity', 'product_total', 'product_variation_id', 'product_variation_name', 'product_variation_price', 'product_variation_quantity', 'product_variation_total'];

    public static function booted(){
        
    }

    public function getTable(){
        return 'woocommerce_order_items';
    }

    public function order(){
        return $this->belongsTo(Order::class, 'order_id', 'ID');
    }

    public function order_item_metas(){
        return $this->hasMany(OrderItemMeta::class, 'order_item_id', 'order_item_id');
    }
    

}