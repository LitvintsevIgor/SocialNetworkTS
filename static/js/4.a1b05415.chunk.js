(this["webpackJsonpsocial-network2"]=this["webpackJsonpsocial-network2"]||[]).push([[4],{384:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__1rZ3k",dialogsItems:"Dialogs_dialogsItems__2cvy3",dialog:"Dialogs_dialog__3uLyt",messagesItems:"Dialogs_messagesItems__1yMkL",message:"Dialogs_message__2QPe0",active:"Dialogs_active__2jYYF"}},389:function(e,s,a){"use strict";a.r(s);var i=a(200),t=a(2),n=(a(0),a(384)),c=a.n(n),o=a(37);function d(e){var s="/dialogs/"+e.id;return Object(t.jsx)("div",{className:c.a.dialog+" "+c.a.active,children:Object(t.jsx)(o.c,{to:s,children:e.name})})}function l(e){return Object(t.jsx)("div",{className:c.a.message,children:e.message})}var r=a(113),g=a(160),m=a(201),j=a(52),u=Object(r.a)(20),b=Object(m.a)({form:"dialogAddMessageForm"})((function(e){return Object(t.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(t.jsx)(g.a,{placeholder:"Enter your message",name:"newMessageBody",component:j.b,validate:[r.b,u]}),Object(t.jsx)("div",{children:Object(t.jsx)("button",{children:"Sent message"})})]})}));var O=a(26),_=a(19),v=a(166);s.default=Object(_.d)(Object(O.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{sendMessage:function(s){e(Object(i.a)(s))}}})),v.a)((function(e){var s=e.dialogsPage,a=s.dialogs.map((function(e){return Object(t.jsx)(d,{id:e.id,name:e.name},e.id)})),i=s.messages.map((function(e){return Object(t.jsx)(l,{id:e.id,message:e.message},e.id)}));return Object(t.jsxs)("div",{className:c.a.dialogs,children:[Object(t.jsx)("div",{className:c.a.dialogsItems,children:a}),Object(t.jsxs)("div",{className:c.a.messagesItems,children:[i,Object(t.jsx)(b,{onSubmit:function(s){e.sendMessage(s.newMessageBody)}})]})]})}))}}]);
//# sourceMappingURL=4.a1b05415.chunk.js.map