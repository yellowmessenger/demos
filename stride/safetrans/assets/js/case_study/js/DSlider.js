
(function($){
      $.fn.Slider = function(options){
            options = $.extend({
            startSlide: 0,
              item: '.DSlider-item',
              isFlexible: false,
               isShowPage: true,
            isShowTitle: true,
            titleAttr: 'data-title',
            isShowControls: true,
            isAuto: true,
            intervalTime: 5000,
            affectTime: 300,
            mode: 'move',
            direction: 'left',
             },options);

            var methods = {
                  init:function(items){
                        this.$itemWrap =items;
                        this.$item = this.$itemWrap.children(options.item);
                        this.size = this.$item.size();
                        this.curIndex = options.startSlide;
                        methods.setLayout(this.itemWrap);
                        options.isAuto && methods.autoPlay();
                        options.isFlexible && $(window).on('resize',$.proxy(methods['resize'],this));
                  },
                  setLayout:function(){
                        this.$itemWrap.wrap("<div class='DSlider-wrap' />");
                        this.wrap =  this.$itemWrap.parent();
                        if(options.isShowControls){
                              this.$Controls = $("<div class='showControl'><a class='prev1'></a><a class='next1'></a></div>").appendTo(this.wrap);
                              methods.controlsClick(this.$itemWrap);
                        }
                        if(options.isShowTitle){
                              this.$Titles = $("<div class='showTitle' />").appendTo(this.wrap);
                              methods.setTitle(this.$itemWrap);
                        }
                        if(options.isShowPage){
                              this.$pages = $("<ul class='showPage' />");
                              for(var i=1;i<=this.size;i++){
                                    $("<a href='javascript:;'>"+i+"</a>").appendTo(this.$pages);
                              }
                              this.$pages.appendTo(this.wrap);
                              methods.setPage();
                              methods.pagesClick();
                        }
                        if(options.mode=="fade"){
                              methods.setFade();
                        }
                        methods.setCss();
                       
                  },
                 
                  setPage:function(){
                        if(!options.isShowPage || !this.$pages)return;
                        this.$pages.find("a").eq(this.curIndex).addClass("active").siblings().removeClass("active");
                  },
                 
                  setTitle:function(){
                        if(!options.isShowTitle || !this.$Titles)return;
                        var $curItem = this.$item.eq(this.curIndex);
                        $.isFunction(options.titleAttr) ? options.titleAttr.call($curItem,this.curIndex) : this.$Titles.html($curItem.attr(options.titleAttr)); 
                  },
                
                  controlsClick:function(){
                        var self = this;
                        self.$Controls.find(".next1").on('click',function(){
                              if(self.curIndex+1 == self.size){
                                 methods[options.mode](self.$item.eq(0));   
                              }else{
                                 methods[options.mode](self.$item.eq(self.curIndex+1));   
                              }
                              
                        });
                        this.$Controls.find(".prev1").on('click',function(){
                               if(self.curIndex == 0){
                                    methods[options.mode](self.$item.eq(self.size-1));                                                                     
                              }else{
                                    methods[options.mode](self.$item.eq(self.curIndex-1));   
                              }
                        });

                  },
                
                  pagesClick:function(){
                        var self = this; 
                        self.$pages.find("a").on('click',function(){
                              var target = $(this);
                              var next = target.index();
                              if(self.curIndex!=next){
                                    methods[options.mode](target);                                                 
                              }
                        });
                  },
                
                  move:function(target){
                        if(options.mode!="move")return;
                        this.$itemWrap.stop();
                        target = (target.index()>=0) ? target : this.$item.eq(options.startSlide);
                        var targetIndex = target.index();                     
                        if(options.direction =="left"){
                              var liWidth = this.$item.width();
                              this.$itemWrap.animate({left:"-"+liWidth*targetIndex+"px"},options.affectTime);
                        }else if(options.direction =="top"){
                              var liHeight = this.$item.height();
                              this.$itemWrap.animate({top:"-"+liHeight*targetIndex+"px"},options.affectTime);
                        }                    
                        this.curIndex = targetIndex;                  
                        methods.setPage();
                        methods.setTitle();
                  },
                 
                  setFade:function(){
                        this.$item.hide().eq(this.curIndex).show();
                  },
                
                  setCss:function(){
                        if(options.mode!="move" && options.mode!="fade") return;
                        if(!options.isFlexible){
                              this.wrap.width(this.$item.find("img").width());
                        }
                        if(options.mode=="move"){
                              if(options.direction=="left"){
                                    this.$itemWrap.css({"width":this.size*100 + "%","position":"relative"});
                                    this.$item.width(this.wrap.width());
                              }else if(options.direction=="top"){
                                    this.$itemWrap.css({"height":this.size*100+"%","position":"relative"});
                                    this.$item.height(this.wrap.height());
                                    this.$item.css({"clear":"left"});
                              }
                        }else{
                              this.$itemWrap.css("width","100%");
                              this.$item.css("position","absolute");
                        }

                  },
                  
                  fade:function(target){
                        if(options.mode!="fade")return;
                        this.$itemWrap.stop();
                        target = (target.index()>=0) ? target : this.$item.eq(options.startSlide);
                        var targetIndex = target.index();
                        this.$item.fadeOut(options.affectTime).eq(targetIndex).fadeIn(options.affectTime);
                        this.curIndex = targetIndex;                  
                        methods.setPage();
                        methods.setTitle();  
                  },
                 
                  resize:function(){
                        var self = this;
                        var wrapWidth = self.wrap.width();
                      
                       
                                   
                        self.$item.each(function(){                          
                             $(this).width(wrapWidth);
                        });
                  },
                  autoPlay:function(){
                        if(!options.isAuto)return;
                        var self =this;
                        clearInterval(this.playTimer);
                        this.playTimer =setInterval(function(){methods[options.mode](self.$item.eq(self.curIndex+1))},options.intervalTime);
                  }

            }
             return this.each(function(){
                  methods.init($(this));

             });
      }
})(window.jQuery);