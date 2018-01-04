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
        'posComponent',
        'model/appConfig',
        'helper/price',
        'customization/model/checkout/cart/giftcard'
        //'lib/bootstrap/bootstrap-switch'
    ],
    function ($, ko, Component, AppConfig, Helper, GiftCardModel) {
        "use strict";
        return Component.extend({
            defaults: {
                template: 'customization/ui/catalog/giftcard/form'
            },
             optionsArray: ko.observableArray([]),
            coupon_code: ko.pureComputed(function(){
                return GiftCardModel.coupon_code();
            }),
            amount: ko.pureComputed(function(){
                return GiftCardModel.amount();
            }),
            status: ko.pureComputed(function(){
                return GiftCardModel.status();
            }),
            initialize: function(){
                this._super();
                var self = this;
              
                this.optionsArray([{value: 1, text: ('Pending')},
                    {value: 2, text: ('Active')},
                    {value: 3, text: ('Disabled')},
                    {value: 4, text: ('Used')},
                    {value: 5, text: ('Expired')}
                ]);
            },
             addToCart: function(){
                 GiftCardModel.addToCart();
            },
            setCode: function(data,event){
                GiftCardModel.coupon_code(event.target.value);
            },
            setAmount: function(data,event){
                GiftCardModel.amount(event.target.value);
            },
            setStatus: function(data,event){
                GiftCardModel.status(event.target.value);
            }
            
        });
    }
);