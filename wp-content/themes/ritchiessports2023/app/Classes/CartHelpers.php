<?php
namespace Ritchies\Classes;
class CartHelpers{
    public $cart;
    
    public function __construct()
    {
        $this->cart = WC()->cart;
    }
    public function getItemsCount(){
        return count($this->getItems());
    }

    public function getItems(){
        return $this->cart->get_cart();
    }

    public function getProducts(){
        // get item ids
        $item_ids = [];
        
        foreach($this->getItems() as $item){
            if($item['variation_id'] != 0){
                $item_ids[] = $item['variation_id'];
            }else{
                $item_ids[] = $item['product_id'];
            }
        }
        // get products
        $products = \Ritchies\Models\Product::whereIn('ID', $item_ids)->get();
        
        return $products;
    }
}
new CartHelpers();