!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=12)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.stoneType={PLAYER:"player",ENEMY:"enemy",UNKNOWN:"unknown"},t.blockType={BLOCK:"block",TRANSFER_PLAYER:"transferPlayer",TRANSFER_ENEMY:"transferEnemy"},t.layerType={GAME_MAP:0,STAT:1,ENEMY:2,PLAYER:3},t.stateKey={GAME_MAP:"gameMap",STAT:"stat",ENEMY:"enemy",PLAYER:"player"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.defaultTheme={BACKGROUND_COLOR:"#ffce9e",PLAYER_COLOR:"#ffffff",ENEMY_COLOR:"#000000",EDGE_COLOR:"#000000",OBSTACLE_BLOCK_COLOR:"#b5b5b5",TRANSFER_PLAYER_BLOCK_COLOR:"#ffebd3",TRANSFER_ENEMY_BLOCK_COLOR:"#ba985e"},t.defaultConfig={enemyPercentage:.2,blockPercentage:.1,rows:10,columns:10,playerSpeed:.6,enemySpeed:.6}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(9),r=n(14),i=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default=(0,o.createStore)(i.default)},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(t,n){o(this,e),this.row=t,this.column=n}return r(e,[{key:"moveRight",value:function(){this.column+=1}},{key:"moveLeft",value:function(){this.column-=1}},{key:"moveUp",value:function(){this.row-=1}},{key:"moveDown",value:function(){this.row+=1}},{key:"moveTo",value:function(e){this.row=e.row,this.column=e.column}}]),e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=t.GO_TO_LEVEL="GO_TO_LEVEL",r=t.UPDATE_DIRTY="UPDATE_DIRTY",i=t.RIGHT_KEY_DOWN="RIGHT_KEY_DOWN",a=t.LEFT_KEY_DOWN="LEFT_KEY_DOWN",u=t.UP_KEY_DOWN="UP_KEY_DOWN",s=t.DOWN_KEY_DOWN="DOWN_KEY_DOWN",c=t.PLAYER_HIT_ENEMY="PLAYER_HIT_ENEMY",f=t.ENEMY_HIT_ENEMY="ENEMY_HIT_ENEMY",l=t.ENEMY_HIT_BLOCK="ENEMY_HIT_BLOCK",d=t.PLAYER_HIT_BLOCK="PLAYER_HIT_BLOCK",p=t.ENEMY_TO_PLAYER="ENEMY_TO_PLAYER",y=t.PLAYER_TO_ENEMY="PLAYER_TO_ENEMY",h=t.PLAYER_HIT_PLAYER="PLAYER_HIT_PLAYER";t.action={goToLevel:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return{type:o,level:e,gameEnv:t}},updateDirty:function(e,t){return{type:r,stateKey:t,isDirty:e}},rightKeyDown:function(){return{type:i,dirty:!0}},leftKeyDown:function(){return{type:a,dirty:!0}},upKeyDown:function(){return{type:u,dirty:!0}},downKeyDown:function(){return{type:s,dirty:!0}},playerHitEnemy:function(e,t){return{type:c,enemy:e,player:t}},enemyHitEnemy:function(e,t){return{type:f,enemy1:e,enemy2:t}},enemyHitBlock:function(e,t){return{type:l,enemyRenderState:t,block:e}},playerHitBlock:function(e,t){return{type:d,playerRenderState:t,block:e}},enemyToPlayer:function(e){return{type:p,enemyRenderState:e}},playerToEnemy:function(e){return{type:y,playerRenderState:e}},playerHitPlayer:function(e,t){return{type:h,player1:e,player2:t}}}},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),i=n(3),a=function(e){return e&&e.__esModule?e:{default:e}}(i),u=n(1),s=function e(t){o(this,e),this.position=new a.default(t.row,t.column),this.type=r.blockType.BLOCK,this.fillStyle=u.defaultTheme.OBSTACLE_BLOCK_COLOR};t.default=s},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(t){if(o(this,e),!t)throw Error("No game map container defined");this.container=t,this.dirty=!1,this.state={},this._addCanvasElement()}return r(e,[{key:"_addCanvasElement",value:function(){this.element=document.createElement("canvas"),this.context=this.element.getContext("2d"),this.container.appendChild(this.element)}},{key:"update",value:function(){}},{key:"render",value:function(){}}]),e}();t.default=i},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(10),u=function(e){return e&&e.__esModule?e:{default:e}}(a),s=n(0),c=n(1),f=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.type=s.stoneType.ENEMY,n.fillStyle=c.defaultTheme.ENEMY_COLOR,n}return i(t,e),t}(u.default);t.default=f},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(10),u=function(e){return e&&e.__esModule?e:{default:e}}(a),s=n(0),c=n(1),f=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.type=s.stoneType.PLAYER,n.fillStyle=c.defaultTheme.PLAYER_COLOR,n}return i(t,e),t}(u.default);t.default=f},function(e,t,n){"use strict";function o(e){var t=e();return{dispatch:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t=e(t,n)},getState:function(e){return e?t[e]:t}}}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};for(var o in e)t[o]=e[o](t[o],n,t);return t}}Object.defineProperty(t,"__esModule",{value:!0}),t.createStore=o,t.combineReducer=r},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n(3),a=function(e){return e&&e.__esModule?e:{default:e}}(i),u=(n(0),function(){function e(t){o(this,e),this.position=new a.default(t.row,t.column),this.alive=!0,this.moveHistory=[],this.addToMoveHistory(this.position)}return r(e,[{key:"addToMoveHistory",value:function(e){this.moveHistory.push(new a.default(e.row,e.column))}},{key:"moveRight",value:function(){this.position.moveRight(),this.addToMoveHistory(this.position)}},{key:"moveLeft",value:function(){this.position.moveLeft(),this.addToMoveHistory(this.position)}},{key:"moveUp",value:function(){this.position.moveUp(),this.addToMoveHistory(this.position)}},{key:"moveDown",value:function(){this.position.moveDown(),this.addToMoveHistory(this.position)}},{key:"moveTo",value:function(e){this.position.moveTo(e),this.addToMoveHistory(this.position)}},{key:"moveBack",value:function(){this.moveHistory.pop(),this.moveTo(this.moveHistory[this.moveHistory.length-1])}},{key:"die",value:function(){this.alive=!1}}]),e}());t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(1);t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.x,o=t.y,r=t.radius,i=t.startAngle,a=t.endAngle,u=t.anticlockwise,s=t.fillStyle;s&&(e.fillStyle=s),e.beginPath(),e.arc(n,o,r,i,a,u),e.fill()}},function(e,t,n){e.exports=n(13)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){return!(!e.stone.alive||!t.stone.alive)&&Math.pow(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2),.5)<e.radius+t.radius}function i(e,t){var n=(e.length,[]);return e.forEach(function(e){if(e.stone.alive&&t.stone.alive){Math.pow(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2),.5)<e.radius+t.radius&&n.push(e.stone)}}),n}function a(e,t){for(var n=t.blockRenderStates,o=n.length,r=0;r<o;r++){var i=n[r],a=Math.abs(i.x+i.width/2-e.x),u=Math.abs(i.y+i.height/2-e.y),s=a<i.width/2+e.radius,c=u<i.height/2+e.radius;if(s&&c)return i.block}return null}function u(e){if(void 0!==e.touches){var t=e.touches[0];switch(e.type){case"touchstart":case"touchmove":R[e.type].x=t.pageX,R[e.type].y=t.pageY;break;case"touchend":if(R.touchstart.x>-1&&R.touchmove.x>-1){var n=R.touchmove.x-R.touchstart.x,o=R.touchmove.y-R.touchstart.y;Math.abs(n)>Math.abs(o)?n>0?c.default.dispatch(f.action.rightKeyDown()):c.default.dispatch(f.action.leftKeyDown()):o>0?c.default.dispatch(f.action.downKeyDown()):c.default.dispatch(f.action.upKeyDown())}}}}var s=n(2),c=o(s),f=n(4),l=n(18),d=o(l),p=n(19),y=o(p),h=n(20),v=o(h),_=n(21),m=o(_),b=n(22),E=o(b),O=n(0);n(23);var w=document.getElementById("root"),g=[],M={},T=(0,d.default)({fps:60,init:function(){g[O.layerType.GAME_MAP]=new y.default(w),g[O.layerType.STAT]=new v.default(w),g[O.layerType.ENEMY]=new E.default(w),g[O.layerType.PLAYER]=new m.default(w),c.default.dispatch(f.action.goToLevel(1,{width:w.offsetWidth,height:w.offsetHeight}))},update:function(){g.forEach(function(e){e.update()})},render:function(e){g.forEach(function(t){t.render(e)});var t=g[O.layerType.PLAYER].renderState,n=g[O.layerType.GAME_MAP].renderState,o=g[O.layerType.ENEMY].renderState,u=t.length,s=o.length;o.forEach(function(e){i(t,e).forEach(function(t){c.default.dispatch(f.action.playerHitEnemy(e.stone,t))})});for(var l=0;l<s;l++)for(var d=0;d<s;d++)l!==d&&r(o[l],o[d])&&c.default.dispatch(f.action.enemyHitEnemy(o[l].stone,o[d].stone));for(var p=0;p<u;p++)for(var y=0;y<u;y++)p!==y&&r(t[p],t[y])&&c.default.dispatch(f.action.playerHitPlayer(t[p].stone,t[y].stone));o.forEach(function(e){var t=a(e,n);t&&c.default.dispatch(f.action.enemyHitBlock(t,e))}),t.forEach(function(e){var t=a(e,n);t&&c.default.dispatch(f.action.playerHitBlock(t,e))})}});window.onload=window.onresize=function(){c.default.dispatch(f.action.updateDirty(!0))},document.addEventListener("keydown",function(e){M[e.keyCode]=M[e.keyCode]||{keyCode:e.keyCode};var t=M[e.keyCode];if(!t.press)switch(t.press=!0,t.keyCode){case 37:c.default.dispatch(f.action.leftKeyDown());break;case 38:c.default.dispatch(f.action.upKeyDown());break;case 39:c.default.dispatch(f.action.rightKeyDown());break;case 40:c.default.dispatch(f.action.downKeyDown())}}),document.addEventListener("keyup",function(e){M[e.keyCode]=M[e.keyCode]||{keyCode:e.keyCode},M[e.keyCode].press=!1});var R={touchstart:Object.assign({},{x:-1,y:-1}),touchmove:Object.assign({},{x:-1,y:-1})};document.addEventListener("touchstart",u),document.addEventListener("touchmove",u),document.addEventListener("touchend",u),T.start()},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};arguments[2];switch(t.type){case b.GO_TO_LEVEL:var n=p.default.createLevel(t.level),o=n.playerConfig;return Object.assign({},e,{rows:o.rows,columns:o.columns,players:o.players,newRenderStates:[],dirty:!0});case b.UPDATE_DIRTY:return t.stateKey&&t.stateKey!==l.stateKey.PLAYER?e:Object.assign({},e,{dirty:t.isDirty});case b.RIGHT_KEY_DOWN:return e.players.forEach(function(e){return e.moveRight()}),Object.assign({},e,{dirty:!0});case b.DOWN_KEY_DOWN:return e.players.forEach(function(e){return e.moveDown()}),Object.assign({},e,{dirty:!0});case b.LEFT_KEY_DOWN:return e.players.forEach(function(e){return e.moveLeft()}),Object.assign({},e,{dirty:!0});case b.UP_KEY_DOWN:return e.players.forEach(function(e){return e.moveUp()}),Object.assign({},e,{dirty:!0});case b.PLAYER_HIT_ENEMY:return t.player.die(),t.enemy.die(),Object.assign({},e,{dirty:!0});case b.PLAYER_HIT_BLOCK:var r=t.playerRenderState,i=t.block,a=r.stone;a.moveHistory;if(i.type===l.blockType.BLOCK)a.moveBack();else if(i.type===l.blockType.TRANSFER_ENEMY){var u=e.players.indexOf(a);e.players.splice(u,1),c.default.dispatch(b.action.playerToEnemy(r))}return Object.assign({},e,{dirty:!0});case b.PLAYER_HIT_PLAYER:var s=t.player1,f=t.player2;return s.moveBack(),f.moveBack(),Object.assign({},e,{dirty:!0});case b.ENEMY_TO_PLAYER:var d=t.enemyRenderState,y=d.stone,h=new v.default({row:y.position.row,column:y.position.column});return d.stone=h,e.players.push(h),e.newRenderStates.push(d),Object.assign({},e,{dirty:!0});default:return e}}function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments[2];switch(t.type){case b.GO_TO_LEVEL:var o=p.default.createLevel(t.level),r=o.enemyConfig;return Object.assign({},e,{rows:r.rows,columns:r.columns,enemies:r.enemies,newRenderStates:[],dirty:!0});case b.UPDATE_DIRTY:return t.stateKey&&t.stateKey!==l.stateKey.ENEMY?e:Object.assign({},e,{dirty:t.isDirty});case b.RIGHT_KEY_DOWN:n[l.stateKey.GAME_MAP].blocks;return e.enemies.forEach(function(e){e.isCopycat?e.moveRight():e.moveLeft()}),Object.assign({},e,{dirty:!0});case b.DOWN_KEY_DOWN:n[l.stateKey.GAME_MAP].blocks;return e.enemies.forEach(function(e){e.isCopycat?e.moveDown():e.moveUp()}),Object.assign({},e,{dirty:!0});case b.LEFT_KEY_DOWN:n[l.stateKey.GAME_MAP].blocks;return e.enemies.forEach(function(e){e.isCopycat?e.moveLeft():e.moveRight()}),Object.assign({},e,{dirty:!0});case b.UP_KEY_DOWN:n[l.stateKey.GAME_MAP].blocks;return e.enemies.forEach(function(e){e.isCopycat?e.moveUp():e.moveDown()}),Object.assign({},e,{dirty:!0});case b.ENEMY_HIT_ENEMY:var i=t.enemy1,a=t.enemy2;return i.moveBack(),a.moveBack(),Object.assign({},e,{dirty:!0});case b.ENEMY_HIT_BLOCK:var u=t.enemyRenderState,s=t.block,f=u.stone;f.moveHistory;if(s.type===l.blockType.BLOCK)f.moveBack();else if(s.type===l.blockType.TRANSFER_PLAYER){var d=e.enemies.indexOf(f);e.enemies.splice(d,1),c.default.dispatch(b.action.enemyToPlayer(u))}return Object.assign({},e,{dirty:!0});case b.PLAYER_TO_ENEMY:var y=t.playerRenderState,h=y.stone,v=new m.default({row:h.position.row,column:h.position.column});return y.stone=v,e.enemies.push(v),e.newRenderStates.push(y),Object.assign({},e,{dirty:!0});default:return e}}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case b.GO_TO_LEVEL:var n=p.default.createLevel(t.level),o=n.gameMapConfig;return Object.assign({},e,{rows:o.rows,columns:o.columns,blocks:o.blocks,dirty:!0});case b.UPDATE_DIRTY:return t.stateKey&&t.stateKey!==l.stateKey.GAME_MAP?e:Object.assign({},e,{dirty:t.isDirty});default:return e}}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g;return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).type,e}Object.defineProperty(t,"__esModule",{value:!0});var s=n(2),c=o(s),f=n(9),l=n(0),d=n(15),p=o(d),y=n(3),h=(o(y),n(8)),v=o(h),_=n(7),m=o(_),b=n(4),E={},O={},w={},g={},M={};M[l.stateKey.PLAYER]=r,M[l.stateKey.ENEMY]=i,M[l.stateKey.GAME_MAP]=a,M[l.stateKey.STAT]=u,t.default=(0,f.combineReducer)(M)},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(5),i=o(r),a=n(16),u=o(a),s=n(17),c=o(s),f=n(7),l=o(f),d=n(8),p=o(d),y=n(1),h=[];t.default={createLevel:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(h[e]&&!t)return h[e];var n=y.defaultConfig.rows,o=y.defaultConfig.columns,r=y.defaultConfig.blockPercentage,a=y.defaultConfig.enemyPercentage,s=Math.floor(1+Math.random()*(n-2)),f=Math.floor(1+Math.random()*(o-2)),d={players:[new p.default({row:s,column:f,rows:n,columns:o})],rows:n,columns:o},v={blocks:[],rows:n,columns:o},_={enemies:[],rows:n,columns:o},m=void 0,b=void 0;do{m=Math.floor(1+Math.random()*(n-2)),b=Math.floor(1+Math.random()*(o-2))}while(m===s&&b===f);v.blocks.push(new c.default({row:m,column:b,rows:n,columns:o}));var E=void 0,O=void 0;do{E=Math.floor(1+Math.random()*(n-2)),O=Math.floor(1+Math.random()*(o-2))}while(E===s&&O===f||E===m&&O===b);v.blocks.push(new u.default({row:E,column:O,rows:n,columns:o}));for(var w=0;w<n;w++)for(var g=0;g<o;g++)if(0!==w&&0!==g&&w!==n-1&&g!==o-1){if(!(w===s&&g===f||w===m&&g===b||w===E&&g===O)){var M=Math.random();M<r?v.blocks.push(new i.default({row:w,column:g,rows:n,columns:o})):M<r+a&&_.enemies.push(new l.default({row:w,column:g,rows:n,columns:o}))}}else v.blocks.push(new i.default({row:w,column:g,rows:n,columns:o}));return h[e]={gameMapConfig:v,enemyConfig:_,playerConfig:d},h[e]}}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(5),s=o(u),c=n(0),f=n(3),l=(o(f),n(1)),d=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.type=c.blockType.TRANSFER_ENEMY,n.fillStyle=l.defaultTheme.TRANSFER_ENEMY_BLOCK_COLOR,n}return a(t,e),t}(s.default);t.default=d},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(5),s=o(u),c=n(0),f=n(3),l=(o(f),n(1)),d=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.type=c.blockType.TRANSFER_PLAYER,n.fillStyle=l.defaultTheme.TRANSFER_PLAYER_BLOCK_COLOR,n}return a(t,e),t}(s.default);t.default=d},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.fps,n=e.init,o=e.update,r=e.render;n();var i={_animationLoopKey:null,_accumulator:0,_loop:function(e){i._animationLoopKey=window.requestAnimationFrame(function(){var n=Date.now(),a=1e3/t;if(i._accumulator+=n-e,i._accumulator>=a){for(;i._accumulator>=a;)o(),i._accumulator-=a;r(a)}i._loop(n)})},start:function(){i._loop(Date.now())},end:function(){window.cancelAnimationFrame(i.animationLoopKey)}};return i}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(6),c=o(s),f=n(1),l=n(5),d=(o(l),n(2)),p=o(d),y=n(4),h=n(0),v=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.type=h.layerType.GAME_MAP,n.stateKey=h.stateKey.GAME_MAP,n}return a(t,e),u(t,[{key:"update",value:function(){var e=p.default.getState(this.stateKey);if(e.dirty){for(var t=e.columns,n=e.rows,o=e.blocks,r=this.container.offsetWidth,i=this.container.offsetHeight,a=r/t,u=i/n,s=[],c=[],f=void 0,l=0;l<=t;l++)c.push({x:l*a,y0:0,y1:i});for(var d=0;d<=n;d++)s.push({y:d*u,x0:0,x1:r});f=o.map(function(e){return{x:e.position.column*a+1,y:e.position.row*u+1,width:a-2,height:u-2,fillStyle:e.fillStyle,block:e}}),this.finalRenderState={xLines:s,yLines:c,blockRenderStates:f},p.default.dispatch(y.action.updateDirty(!1,this.stateKey)),this.dirty=!0}}},{key:"render",value:function(e){var t=this;if(this.dirty){this.renderState||(this.renderState=Object.assign({},this.finalRenderState)),this.dirty=!1;var n=this.container.offsetWidth,o=this.container.offsetHeight,r=this.renderState,i=r.xLines,a=r.yLines,u=r.blockRenderStates;this.element.width=n,this.element.height=o,this.context.fillStyle=f.defaultTheme.BACKGROUND_COLOR,this.context.fillRect(0,0,n,o),this.context.fillStyle=f.defaultTheme.EDGE_COLOR,this.context.beginPath(),i.forEach(function(e){t.context.moveTo(e.x0,e.y),t.context.lineTo(e.x1,e.y),t.context.stroke()}),a.forEach(function(e){t.context.moveTo(e.x,e.y0),t.context.lineTo(e.x,e.y1),t.context.stroke()}),u.forEach(function(e){t.context.fillStyle=e.fillStyle,t.context.fillRect(e.x,e.y,e.width,e.height)})}}}]),t}(c.default);t.default=v},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(6),u=function(e){return e&&e.__esModule?e:{default:e}}(a),s=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),t}(u.default);t.default=s},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(6),c=o(s),f=n(1),l=n(8),d=(o(l),n(2)),p=o(d),y=n(4),h=n(0),v=n(11),_=o(v),m=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.type=h.layerType.PLAYER,n.stateKey=h.stateKey.PLAYER,n}return a(t,e),u(t,[{key:"update",value:function(){var e=p.default.getState(this.stateKey);if(e.dirty){var t=e.columns,n=e.rows,o=e.players,r=e.newRenderStates,i=this.container.offsetWidth,a=this.container.offsetHeight,u=i/t,s=a/n;for(this.finalRenderState=o.map(function(e){var t=e.position,n=t.row,o=t.column;Math.min(u,s);return{x:o*u+u/2,y:n*s+s/2,radius:.8*Math.min(u,s)/2,stone:e}});r.length>0;)this.renderState.push(r.pop());p.default.dispatch(y.action.updateDirty(!1,this.stateKey)),this.dirty=!0}}},{key:"render",value:function(e){var t=this;if(this.dirty){if(this.renderState){var n=0,o=[];this.renderState.forEach(function(r){var i=t.finalRenderState.filter(function(e){return e.stone===r.stone})[0];if(!i)return void o.push(r);var a=f.defaultConfig.enemySpeed*e,u=i.x-r.x,s=i.y-r.y;0===u&&0===s&&n++,t.dirty=n<t.renderState.length,t.dirty&&(u>0?r.x+=Math.min(a,Math.abs(u)):r.x-=Math.min(a,Math.abs(u)),s>0?r.y+=Math.min(a,Math.abs(s)):r.y-=Math.min(a,Math.abs(s)))}),o.forEach(function(e){var n=t.renderState.indexOf(e);t.renderState.splice(n,1)})}else this.renderState=this.finalRenderState.map(function(e){return Object.assign({},e)});this.element.width=this.container.offsetWidth,this.element.height=this.container.offsetHeight,this.renderState.forEach(function(e){var n=e.stone;n.alive&&(0,_.default)(t.context,{fillStyle:n.fillStyle,x:e.x,y:e.y,radius:e.radius,startAngle:0,endAngle:2*Math.PI})})}}}]),t}(c.default);t.default=m},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(6),c=o(s),f=n(1),l=n(7),d=(o(l),n(2)),p=o(d),y=n(4),h=n(0),v=n(11),_=o(v),m=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.type=h.layerType.ENEMY,n.stateKey=h.stateKey.ENEMY,n.enemies=[],n}return a(t,e),u(t,[{key:"update",value:function(){var e=p.default.getState(this.stateKey);if(e.dirty){var t=e.columns,n=e.rows,o=e.enemies,r=e.newRenderStates,i=this.container.offsetWidth,a=this.container.offsetHeight,u=i/t,s=a/n;for(this.finalRenderState=o.map(function(e){var t=e.position,n=t.row,o=t.column;Math.min(u,s);return{x:o*u+u/2,y:n*s+s/2,radius:.8*Math.min(u,s)/2,stone:e}});r.length>0;)this.renderState.push(r.pop());p.default.dispatch(y.action.updateDirty(!1,this.stateKey)),this.dirty=!0}}},{key:"render",value:function(e){var t=this;if(this.dirty){if(this.renderState){var n=0,o=[];this.renderState.forEach(function(r){var i=t.finalRenderState.filter(function(e){return e.stone===r.stone})[0];if(!i)return void o.push(r);var a=f.defaultConfig.enemySpeed*e,u=i.x-r.x,s=i.y-r.y;0===u&&0===s&&n++,t.dirty=n<t.renderState.length,t.dirty&&(u>0?r.x+=Math.min(a,Math.abs(u)):r.x-=Math.min(a,Math.abs(u)),s>0?r.y+=Math.min(a,Math.abs(s)):r.y-=Math.min(a,Math.abs(s)))}),o.forEach(function(e){var n=t.renderState.indexOf(e);t.renderState.splice(n,1)})}else this.renderState=this.finalRenderState.map(function(e){return Object.assign({},e)});this.element.width=this.container.offsetWidth,this.element.height=this.container.offsetHeight,this.renderState.forEach(function(e){var n=e.stone;n.alive&&(0,_.default)(t.context,{fillStyle:n.fillStyle,x:e.x,y:e.y,radius:e.radius,startAngle:0,endAngle:2*Math.PI})})}}}]),t}(c.default);t.default=m},function(e,t,n){var o=n(24);"string"==typeof o&&(o=[[e.i,o,""]]);var r={};r.transform=void 0;n(26)(o,r);o.locals&&(e.exports=o.locals)},function(e,t,n){t=e.exports=n(25)(void 0),t.push([e.i,"body,\nhtml {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: hidden; }\n\n#root {\n  position: relative;\n  width: 100%;\n  height: 100%; }\n  #root canvas {\n    position: fixed;\n    left: 0;\n    top: 0; }\n",""])},function(e,t){function n(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var i=o(r);return[n].concat(r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"})).concat([i]).join("\n")}return[n].join("\n")}function o(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=n(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<e.length;r++){var a=e[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){function o(e,t){for(var n=0;n<e.length;n++){var o=e[n],r=y[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(f(o.parts[i],t))}else{for(var a=[],i=0;i<o.parts.length;i++)a.push(f(o.parts[i],t));y[o.id]={id:o.id,refs:1,parts:a}}}}function r(e,t){for(var n=[],o={},r=0;r<e.length;r++){var i=e[r],a=t.base?i[0]+t.base:i[0],u=i[1],s=i[2],c=i[3],f={css:u,media:s,sourceMap:c};o[a]?o[a].parts.push(f):n.push(o[a]={id:a,parts:[f]})}return n}function i(e,t){var n=v(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=b[b.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function a(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function u(e){var t=document.createElement("style");return e.attrs.type="text/css",c(t,e.attrs),i(e,t),t}function s(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",c(t,e.attrs),i(e,t),t}function c(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function f(e,t){var n,o,r,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var c=m++;n=_||(_=u(t)),o=l.bind(null,n,c,!1),r=l.bind(null,n,c,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=s(t),o=p.bind(null,n,t),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=u(t),o=d.bind(null,n),r=function(){a(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}function l(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=O(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function d(e,t){var n=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function p(e,t,n){var o=n.css,r=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||i)&&(o=E(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),u=e.href;e.href=URL.createObjectURL(a),u&&URL.revokeObjectURL(u)}var y={},h=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),v=function(e){var t={};return function(n){return void 0===t[n]&&(t[n]=e.call(this,n)),t[n]}}(function(e){return document.querySelector(e)}),_=null,m=0,b=[],E=n(27);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},t.attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=h()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=r(e,t);return o(n,t),function(e){for(var i=[],a=0;a<n.length;a++){var u=n[a],s=y[u.id];s.refs--,i.push(s)}if(e){o(r(e,t),t)}for(var a=0;a<i.length;a++){var s=i[a];if(0===s.refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete y[s.id]}}}};var O=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,o=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(r))return e;var i;return i=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:o+r.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}}]);