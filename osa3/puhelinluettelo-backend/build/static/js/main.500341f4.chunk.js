(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{18:function(e,n,t){e.exports=t(41)},40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(17),o=t.n(c),u=t(6),i=t(3),l=t(2),s=t.n(l),m=t(7),d="/api/persons";var f={getPersons:function(){return s.a.get(d).then((function(e){return e.data}))},addPerson:function(e,n){return s.a.post(d,{name:e,number:n})},deletePerson:function(e){return s.a.delete("".concat(d,"/").concat(e))},editPerson:function(e,n){return s.a.put("".concat(d,"/").concat(e.id),Object(m.a)(Object(m.a)({},e),{},{number:n})).then((function(e){return e.data}))}};t(40);function b(e){var n=e.person,t=e.remove;return r.a.createElement("p",null,n.name," ",n.number,r.a.createElement("button",{onClick:function(){return t(n)}},"delete"))}function v(e){var n=e.persons,t=e.remove;return n.map((function(e){return r.a.createElement(b,{key:e.name,person:e,remove:t})}))}function p(e){var n=e.text,t=e.value,a=e.onChange;return r.a.createElement("div",null,n," ",r.a.createElement("input",{value:t,onChange:a}))}function h(e){var n=e.notification;return n?r.a.createElement("div",{className:"notification ".concat("success"===n.type?"notification--success":"notification--error")},n.text):null}var E=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),l=Object(i.a)(o,2),s=l[0],m=l[1],d=Object(a.useState)(""),b=Object(i.a)(d,2),E=b[0],j=b[1],O=Object(a.useState)(""),g=Object(i.a)(O,2),w=g[0],P=g[1],y=Object(a.useState)(null),C=Object(i.a)(y,2),k=C[0],x=C[1];function S(e,n){k&&clearTimeout(k.id);var t=setTimeout((function(){return x(null)}),3e3);x({text:e,type:n,id:t})}return Object(a.useEffect)((function(){return f.getPersons().then((function(e){console.log(e),c(e)}))}),[]),r.a.createElement("div",null,r.a.createElement(h,{notification:k}),r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{text:"filter shown with",value:w,onChange:function(e){return P(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement("form",{onSubmit:function(e){var n;e.preventDefault(),(n=t.find((function(e){return e.name===s})))?window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))&&f.editPerson(n,E).then((function(e){var n=t.findIndex((function(e){return e.name===s})),a=Object(u.a)(t);a[n].number=e.number,c(a),S("Updated ".concat(s,"'s number"),"success"),m(""),j("")})):f.addPerson(s,E).then((function(e){c([].concat(Object(u.a)(t),[e.data])),S("Added ".concat(s),"success")})).catch((function(e){return[S(e.response.data.error.message,"error")]})).finally((function(){m(""),j("")}))}},r.a.createElement("div",null,"name:"," ",r.a.createElement("input",{value:s,onChange:function(e){return m(e.target.value)}})),r.a.createElement("div",null,"number:"," ",r.a.createElement("input",{value:E,onChange:function(e){return j(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))),r.a.createElement("h2",null,"Numbers"),r.a.createElement(v,{persons:t.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())})),remove:function(e){window.confirm("Delete ".concat(e.name))&&f.deletePerson(e.id).then((function(n){var a=Object(u.a)(t).filter((function(n){return n.id!==e.id}));c(a),S("Removed ".concat(e.name),"success")})).catch((function(){S("".concat(e.name," is already deleted"),"error")}))}}))};o.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.500341f4.chunk.js.map