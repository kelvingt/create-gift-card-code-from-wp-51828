/*
 * Magestore
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Magestore.com license that is
 * available through the world-wide-web at this URL:
 * http://www.magestore.com/license-agreement.html
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 * @category    Magestore
 * @package     Magestore_Webpos
 * @copyright   Copyright (c) 2016 Magestore (http://www.magestore.com/)
 * @license     http://www.magestore.com/license-agreement.html
 */

define(
    [
        'jquery',
        'ko',
        'model/checkout/cart',
        'helper/price',
        'helper/general',
        'model/resource-model/magento-rest/integration/giftcard/gift-card',
        'model/container',
        'model/catalog/product-factory'
    ],
    function ($, ko, CartModel, PriceHelper, Helper, onlineResource, Container, ProductFactory) {
        "use strict";
        var GiftCardModel = {
            coupon_code: ko.observable(),
            amount: ko.observable(),
            status: ko.observable(2),
            initialize: function () {
                var self = this;
                self.initEvents();
                return self;
            },
            initEvents: function(){
                var self = this;
                /*
                Helper.observerEvent('webpos_cart_item_init_data_after', function (event, eventData) {
                    var data = eventData.data;
                    var item = eventData.item;
                    if(item.type_id() == "new_giftcard_product"){
                        item.gift_voucher_amount = ko.observable(data.gift_voucher_amount);
                    }
                });
                Helper.observerEvent('webpos_cart_item_prepare_info_buy_request_after', function (event, eventData) {
                    var buyRequest = eventData.buy_request;
                    var item = eventData.item;
                    if(item.type_id() == "new_giftcard_product"){
                        buyRequest.amount = item.gift_voucher_amount();
                    }
                });
                */
            },
            resetData: function(){
                this.coupon_code("");
                this.amount(0);
            },
            addToCart: function(){
                var self = this;
                
                var params = {};
                params.coupon_code = self.coupon_code();
                params.amount = self.amount();
                params.status = self.status();

                var deferred = $.Deferred();
                onlineResource().setPush(true).setLog(false).createGiftcard(params, deferred);
                 deferred.done(function (response) {
                    
                    response.data.product_id = response.data.entity_id;
                    response.data.unit_price =response.data.gift_value;
                    response.data.product_name = response.data.name;
                    response.data.recipient_ship = true;

                    var Product = ProductFactory.get();
                    Product.setData(response.data);
                    //Product.resetTempAddData();
                    var infoBuyRequest = Product.getInfoBuyRequest(CartModel.customerGroup());
                    

                    CartModel.addProduct(infoBuyRequest);
                    Container.toggleArea('block-product-list');
                 });
                this.resetData();
            }
           

        };
        return GiftCardModel.initialize();
    }
);