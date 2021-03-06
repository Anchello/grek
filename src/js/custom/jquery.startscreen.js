(function( $, g ) {
    var Startscreen = function() {
        this.startscreen = $( '.startscreen' );
        this.wedding = $( '.startscreen__weddings' );
        this.tab = $( '.promo__nav' );
        this.wrapper = $( '.promo__wrapper' );
        this.items = $( '.promo__item' );
        this.index = 0;

        this.defaults = {
            tabs_cls: 'promo__nav--current',
            items_cls: 'promo__item--current'
        };
    };

    Startscreen.prototype = {
        init: function() {
            var context = this,
                defaults = this.defaults,
                offset = g.width(),
                first_tab = $( this.tab[ this.index ] ),
                first_item = $( this.items[ this.index ] );

            if ( this.wedding && this.wedding.length > 0 ) {
                first_tab.addClass( defaults.tabs_cls );
                first_item.addClass( defaults.items_cls );

                this.tab.each(function( index, tab ) {
                    $( tab ).data( 'index', index );
                });

                this.items.each(function( index, item ) {
                    $( item ).data( 'index', index );
                });

                g.on('load', function() {
                    setTimeout(function () {
                            context.render.call(context);
                    }, 300);
                });

                g.on('resize', function() {
                    setTimeout(function () {
                        context.render.call(context);
                    }, 300);
                });

                this.tab.on('click', function( e ) {
                    context.eventChangeTab.call( context, $( this ) );

                    e.preventDefault();

                    return false;
                });
            }
        },

        render: function() {
            var context = this,
                prevoius = true,
                defaults = this.defaults,
                offset = g.width();

            this.items.each(function( index, item ) {
                item = $( item );

                if ( item.hasClass( defaults.items_cls ) ) {
                    prevoius = false;
                } else if ( prevoius ) {
                    context.setTranslateX( item, ( - offset ) );
                } else {
                    context.setTranslateX( item, ( offset * 2 ) );
                }
            });

            this.resizeWrapper();
        },

        resizeWrapper: function() {
            var defaults = this.defaults,
                current_tab = $( '.' + defaults.items_cls );

            this.items.css( 'position', 'absolute' );

            this.wrapper.css( 'height', current_tab.outerHeight() );
        },

        setTranslateX: function( element, value ) {
            element.css({
                '-webkit-transform': 'matrix(1, 0, 0, 1, ' + value + ', 0)',
                '-moz-transform': 'matrix(1, 0, 0, 1, ' + value + ', 0)',
                '-ms-transform': 'matrix(1, 0, 0, 1, ' + value + ', 0)',
                '-o-transform': 'matrix(1, 0, 0, 1, ' + value + ', 0)',
                'transform': 'matrix(1, 0, 0, 1, ' + value + ', 0)'
            });
        },

        animateTranslateX: function( element, start, value ) {
            var context = this;

            $({
                offset: start
            }).stop().animate({
                offset: value
            }, {
                duration: 650,
                step: function( now ) {
                    context.setTranslateX( element, now );
                }
            });
        },

        changeTab: function( index, tab ) {
            var defaults = this.defaults,
                tab_id = Number( tab.data( 'index' ) ),
                current_item = $( '.' + defaults.items_cls ),
                new_item = $( this.items[ tab_id ] ),
                current_tab = $( '.' + defaults.tabs_cls ),
                screen_width = g.width();

            current_tab.removeClass( defaults.tabs_cls );

            tab.addClass( defaults.tabs_cls );

            current_item.removeClass( defaults.items_cls );
            new_item.addClass( defaults.items_cls );

            if ( this.index > index ) {
                this.animateTranslateX( current_item, 0, ( screen_width * 2 ) );
                this.animateTranslateX( new_item, ( - screen_width ), 0 );
            } else {
                this.animateTranslateX( current_item, 1, ( - screen_width ) );
                this.animateTranslateX( new_item, ( screen_width * 2 ), 0 );
            };

            this.index = index;

            this.resizeWrapper();

            if ( this.index === 1 ) {
                this.wedding.css( 'background-image', 'url(img/wedding_bg2.jpg)' );
            } else {
                this.wedding.css( 'background-image', 'url(img/wedding_bg1.jpg)' );
            }
        },

        eventChangeTab: function( tab ) {
            var defaults = this.defaults,
                index = Number( tab.data( 'index' ) );

            if ( !tab.hasClass( defaults.tabs_cls ) ) {
                this.changeTab( index, tab );
            }
        }
    };

    $.startscreen = function() {
        return new Startscreen().init();
    };
}( jQuery, jQuery( window ) ));