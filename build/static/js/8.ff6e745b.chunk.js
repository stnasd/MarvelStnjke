(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[8],{115:function(e,t,n){},118:function(e,t,n){"use strict";n.r(t);var r=n(5),a=n(85),c=n(89),s=n(0),i=n(2),o=n(14),u=n(87),l=n(33),p=(n(115),n(3)),h=function(e){var t=e.char,n=t.thumbnail,r=t.name,a=t.description;return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)(u.a,{children:[Object(p.jsx)("meta",{name:"description",content:"".concat(r," char page")}),Object(p.jsx)("title",{children:r})]}),Object(p.jsxs)("div",{className:"single-char",children:[Object(p.jsx)("img",{src:n,alt:r,className:"single-char__img"}),Object(p.jsxs)("div",{className:"single-char__info",children:[Object(p.jsx)("h2",{className:"single-char__name",children:r}),Object(p.jsx)("p",{className:"single-char__descr",children:a})]}),Object(p.jsx)(o.b,{to:"/",className:"single-char__back",style:{color:"#9f0013"},children:"Back to Main"})]})]})};t.default=function(){var e=Object(s.useState)(null),t=Object(r.a)(e,2),n=t[0],o=t[1],u=Object(i.p)().character,b=Object(a.a)(),d=b.error,m=b.loading,f=b.getCharacter,j=b.clearError;Object(s.useEffect)((function(){v()}),[u]);var v=function(){j(),f(u).then(g)},g=function(e){o(e)},x=m||d||!n?null:Object(p.jsx)(h,{char:n});return Object(p.jsxs)(l.motion.div,{initial:{width:0},animate:{width:"100%"},exit:{x:window.innerWidth,transition:{duration:.5}},children:[Object(p.jsx)(c.a,{}),x]})}},85:function(e,t,n){"use strict";var r=n(4),a=n.n(r),c=n(8),s=n(5),i=n(0),o=function(){var e=Object(i.useState)(!1),t=Object(s.a)(e,2),n=t[0],r=t[1],o=Object(i.useState)(null),u=Object(s.a)(o,2),l=u[0],p=u[1],h=Object(i.useState)("waiting"),b=Object(s.a)(h,2),d=b[0],m=b[1];return{request:Object(i.useCallback)(function(){var e=Object(c.a)(a.a.mark((function e(t){var n,c,s,i,o,u=arguments;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:"GET",c=u.length>2&&void 0!==u[2]?u[2]:null,s=u.length>3&&void 0!==u[3]?u[3]:{"Content-Type":"aplication/json"},r(!0),m("loading"),e.prev=5,e.next=8,fetch(t,{method:n,headers:s,body:c});case 8:if((i=e.sent).ok){e.next=11;break}throw new Error("Could not fetch ".concat(t,", status: ").concat(i.status));case 11:return e.next=13,i.json();case 13:return o=e.sent,r(!1),e.abrupt("return",o);case 18:throw e.prev=18,e.t0=e.catch(5),r(!1),p(e.t0.message),m("error"),e.t0;case 24:case"end":return e.stop()}}),e,null,[[5,18]])})));return function(t){return e.apply(this,arguments)}}(),[]),loading:n,error:l,clearError:Object(i.useCallback)((function(){p(null),m("loading")}),[]),process:d,setProcess:m}};t.a=function(){var e=o(),t=e.loading,n=e.request,r=e.error,s=e.clearError,i=e.process,u=e.setProcess,l="https://gateway.marvel.com:443/v1/public/",p="apikey=e3432be01e1b4538a1a106d69d953f2d",h=function(){var e=Object(c.a)(a.a.mark((function e(){var t,r,c=arguments;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.length>0&&void 0!==c[0]?c[0]:200,e.next=3,n("".concat(l,"characters?limit=9&offset=").concat(t,"&").concat(p));case 3:return r=e.sent,s(),e.abrupt("return",r.data.results.map(j));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(c.a)(a.a.mark((function e(t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n("".concat(l,"characters/").concat(t,"?/&").concat(p));case 2:return r=e.sent,s(),e.abrupt("return",j(r.data.results[0]));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(c.a)(a.a.mark((function e(t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n("".concat(l,"characters?name=").concat(t,"&").concat(p));case 2:return r=e.sent,e.abrupt("return",r.data.results.map(j));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=Object(c.a)(a.a.mark((function e(){var t,r,c=arguments;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c.length>0&&void 0!==c[0]?c[0]:300,e.next=3,n("".concat(l,"comics?limit=8&offset=").concat(t,"&").concat(p));case 3:return r=e.sent,s(),e.abrupt("return",r.data.results.map(v));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(c.a)(a.a.mark((function e(t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n("".concat(l,"comics/").concat(t,"?/&").concat(p));case 2:return r=e.sent,s(),e.abrupt("return",v(r.data.results[0]));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j=function(e){return{name:e.name,description:e.description,thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,homepage:e.urls[0].url,wiki:e.urls[1].url,id:e.id,comics:e.comics.items,comicsUrls:e.comics.items.resourceURI}},v=function(e){var t;return{name:e.title,description:e.description||"There is no description",pageCount:e.pageCount?"".concat(e.pageCount," pages"):"No information about the number of pages",language:(null===(t=e.textObjects[0])||void 0===t?void 0:t.language)||"en-us",thumbnail:e.thumbnail.path+"."+e.thumbnail.extension||null,price:e.prices[0].price?"".concat(e.prices[0].price," \u20ac"):"not available",id:e.id}};return{loading:t,error:r,getAllCharacters:h,getCharacter:b,clearError:s,getAllComics:m,getComic:f,getCharacterByName:d,process:i,setProcess:u}}},88:function(e,t,n){},89:function(e,t,n){"use strict";n(88);var r=n.p+"static/media/Avengers.4065c8f9.png",a=n.p+"static/media/Avengers_logo.9eaf2193.png",c=n(3);t.a=function(){return Object(c.jsxs)("div",{className:"app__banner",children:[Object(c.jsx)("img",{src:r,alt:"Avengers"}),Object(c.jsxs)("div",{className:"app__banner-text",children:["New comics every week!",Object(c.jsx)("br",{}),"Stay tuned!"]}),Object(c.jsx)("img",{src:a,alt:"Avengers logo"})]})}}}]);
//# sourceMappingURL=8.ff6e745b.chunk.js.map