"use strict";(self.webpackChunkproject_proverka=self.webpackChunkproject_proverka||[]).push([[173],{3173:(w,l,i)=>{i.r(l),i.d(l,{CabinetTeacherModule:()=>U});var a=i(9808),s=i(2930),t=i(5e3),m=i(951);function v(e,r){if(1&e){const o=t.EpF();t.TgZ(0,"div",2)(1,"div",3)(2,"div",4),t.NdJ("click",function(){return t.CHM(o),t.oxw().goToMyRooms()}),t._uU(3,"\u041c\u043e\u0438 \u043a\u043e\u043c\u043d\u0430\u0442\u044b"),t.qZA()(),t.TgZ(4,"div",5)(5,"div",6),t.NdJ("click",function(){return t.CHM(o),t.oxw().exit()}),t._uU(6),t.qZA()()()}if(2&e){const o=r.ngIf;t.xp6(6),t.AsE(" ",o.name.lastName," ",o.name.firstName," ")}}let h=(()=>{class e{constructor(o,n){this._userBaseService=o,this._router=n,this.user$=this._userBaseService.getUser()}exit(){(0,t.X6Q)()&&(console.log("\u0432\u044b\u0445\u043e\u0434 \u0438\u0437 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430"),console.log("cookie cleared"),console.log("localstorage cleared"),console.log("local user removed")),localStorage.clear(),this._userBaseService.logout(),this._userBaseService.setUser(null),this._router.navigate(["login","student"])}goToMyRooms(){this._router.navigate(["rooms","main"])}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(m.J),t.Y36(s.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],decls:4,vars:3,consts:[[2,"background-color","rgba(254, 116, 81, 0.05)","height","100%"],["class","header",4,"ngIf"],[1,"header"],[1,"header__menu"],[1,"header__menu__current",3,"click"],[1,"header__username"],[3,"click"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0),t.YNc(1,v,7,2,"div",1),t.ALo(2,"async"),t._UZ(3,"router-outlet"),t.qZA()),2&o&&(t.xp6(1),t.Q6J("ngIf",t.lcZ(2,1,n.user$)))},directives:[a.O5,s.lC],pipes:[a.Ov],styles:[".header[_ngcontent-%COMP%]{padding-top:60px;position:relative;box-shadow:0 0 15px #0000001a;padding-bottom:60px;z-index:1;background-color:#fff}.header__menu[_ngcontent-%COMP%]{font-size:24px;width:240px;margin:0 auto}.header__menu__current[_ngcontent-%COMP%]{font-weight:700;cursor:pointer}.header__menu[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:first-child{margin-right:35px}.header__menu[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:last-child{margin-left:35px}.header__username[_ngcontent-%COMP%]{position:absolute;font-size:24px;left:10%;top:50%;transform:translate(-50%,-50%)}"],changeDetection:0}),e})();var x=i(9751);let d=(()=>{class e{constructor(o,n){this._userBaseSerice=o,this._router=n}canActivate(){return new x.y(o=>{this._userBaseSerice.getUser().subscribe(n=>{n&&"ROLE_TEACHER"===n.role?o.next(!0):this._router.navigate(["login","teacher"])})})}}return e.\u0275fac=function(o){return new(o||e)(t.LFG(m.J),t.LFG(s.F0))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e})();var g=i(7579),C=i(2722),f=i(1037);let b=(()=>{class e{constructor(){this.studentCount=0}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["room-item"]],inputs:{title:"title",studentCount:"studentCount",roomCount:"roomCount"},decls:9,vars:3,consts:[[1,"room"],[1,"room__id"],[1,"room__title"],[1,"room__count"],[1,"count"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"div",1),t._uU(2),t.qZA(),t.TgZ(3,"div",2),t._uU(4),t.qZA(),t.TgZ(5,"div",3),t._uU(6,"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432 "),t.TgZ(7,"span",4),t._uU(8),t.qZA()()()),2&o&&(t.xp6(2),t.hij("\u041a\u043e\u043c\u043d\u0430\u0442\u0430 ",n.roomCount,""),t.xp6(2),t.Oqu(n.title),t.xp6(4),t.Oqu(n.studentCount))},styles:[".room[_ngcontent-%COMP%]{border-left:10px solid #FE7451;background-color:#fff;padding:50px;box-shadow:0 0 15px #0000001a}.room__id[_ngcontent-%COMP%]{font-size:18px;color:#767676;margin-bottom:18px}.room__title[_ngcontent-%COMP%]{font-size:36px;width:400px;margin-bottom:75px;line-height:30px}.room__count[_ngcontent-%COMP%]{font-size:18px}.count[_ngcontent-%COMP%]{color:#fe7451;font-weight:700}"]}),e})();var _=i(3759);const y=function(e){return{container__last:e}};function M(e,r){if(1&e&&(t.TgZ(0,"div",5)(1,"div",6),t._UZ(2,"room-item",7),t.qZA()()),2&e){const o=r.$implicit,n=r.last;t.xp6(1),t.Q6J("ngClass",t.VKq(4,y,n)),t.xp6(1),t.Q6J("roomCount",o.id)("studentCount",0)("title",o.title)}}function O(e,r){if(1&e){const o=t.EpF();t.TgZ(0,"div")(1,"div",8),t._uU(2," \u0423 \u0412\u0430\u0441 \u0435\u0449\u0435 \u043d\u0435\u0442 \u043d\u0438 \u043e\u0434\u043d\u043e\u0439 \u043a\u043e\u043c\u043d\u0430\u0442\u044b "),t.qZA(),t.TgZ(3,"div",9)(4,"div")(5,"button",10),t.NdJ("click",function(){return t.CHM(o),t.oxw(2).createRoom()}),t._uU(6," \u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043a\u043e\u043c\u043d\u0430\u0442\u0443 "),t.qZA()()()()}}function Z(e,r){if(1&e&&(t.ynx(0),t.TgZ(1,"div",1),t.YNc(2,M,3,6,"div",2),t.qZA(),t.TgZ(3,"div",3)(4,"div",4),t.YNc(5,O,7,0,"div",0),t.qZA()(),t.BQk()),2&e){const o=r.ngIf;t.xp6(2),t.Q6J("ngForOf",o),t.xp6(3),t.Q6J("ngIf",!o.length)}}let T=(()=>{class e{constructor(o,n,c){this._roomService=o,this._userBaseService=n,this._router=c,this._subjectDestroy$=new g.x}createRoom(){this._router.navigate(["rooms","create"])}ngOnInit(){this.allRooms$=this._roomService.getRooms(0,100).pipe((0,C.R)(this._subjectDestroy$))}ngOnDestroy(){this._subjectDestroy$.next()}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(f.X),t.Y36(m.J),t.Y36(s.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],decls:2,vars:3,consts:[[4,"ngIf"],[1,"container"],["class","container__item",4,"ngFor","ngForOf"],[1,"room"],[1,"room__empty"],[1,"container__item"],[3,"ngClass"],[3,"roomCount","studentCount","title"],[1,"room__empty__alert"],[1,"room__empty__container"],["tuiButton","","type","button","appearance","accent",1,"room__empty__button_login",3,"click"]],template:function(o,n){1&o&&(t.YNc(0,Z,6,2,"ng-container",0),t.ALo(1,"async")),2&o&&t.Q6J("ngIf",t.lcZ(1,1,n.allRooms$))},directives:[a.O5,a.sg,a.mk,b,_.v0],pipes:[a.Ov],styles:[".room__empty[_ngcontent-%COMP%]{margin:100px auto;width:47%}.room__empty__alert[_ngcontent-%COMP%]{font-weight:700;font-size:80px;line-height:1}.room__empty__container[_ngcontent-%COMP%]{width:60%;margin:40px auto}.room__empty__code_field[_ngcontent-%COMP%]{border-radius:0;width:100%}.room__empty__button_login[_ngcontent-%COMP%]{border-radius:0;width:100%;margin-top:40px;margin-bottom:25vh}.container[_ngcontent-%COMP%]{width:85%;margin:200px auto 0}.container__item[_ngcontent-%COMP%]{margin-bottom:16px}.container__last[_ngcontent-%COMP%]{padding-bottom:100px}"],changeDetection:0}),e})(),P=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],decls:7,vars:0,consts:[[1,"container"],[1,"container__404"],[1,"container__404__number"],[1,"container__page-not-found"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"div",1),t._uU(2," \u041e\u0448\u0438\u0431\u043a\u0430 "),t.TgZ(3,"span",2),t._uU(4,"404"),t.qZA()(),t.TgZ(5,"div",3),t._uU(6," \u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430 "),t.qZA()())},styles:[".container[_ngcontent-%COMP%]{margin:15% auto;display:block;width:500px;height:auto;line-height:130px}.container__404[_ngcontent-%COMP%]{font-size:80px;text-align:center;font-weight:700}.container__404__number[_ngcontent-%COMP%]{color:#6e57e0}.container__page-not-found[_ngcontent-%COMP%]{font-size:24px;text-align:center}"]}),e})();var u=i(2382),A=i(4970),E=i(2171),p=i(7975),D=i(393);const F=[{path:"",component:h,canActivate:[d],children:[{path:"",pathMatch:"full",redirectTo:"main"},{path:"main",component:T},{path:"create",component:(()=>{class e extends A.L{constructor(o,n,c,R){super(),this._roomService=o,this._userBaseService=n,this._notificationService=c,this._router=R,this._onDestroy$=new g.x}createRoom(){this._userBaseService.getUser().subscribe(o=>{this._roomService.createRoom(this.getFormValue("projectName"),parseFloat(o.id)).pipe((0,C.R)(this._onDestroy$)).subscribe({next:()=>{this._router.navigate(["rooms","main"]),this._notificationService.subject$.next({status:"success",text:"\u041a\u043e\u043c\u043d\u0430\u0442\u0430 \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043e\u0437\u0434\u0430\u043d\u0430"})},error:()=>{this._notificationService.subject$.next({status:"error",text:"\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u0438 \u043a\u043e\u043c\u043d\u0430\u0442\u044b"})}})})}ngOnDestroy(){this._onDestroy$.next()}getControls(){return new u.cw({projectDescription:new u.NI("",[u.kI.required]),projectName:new u.NI("",[u.kI.required])})}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(f.X),t.Y36(m.J),t.Y36(E.j),t.Y36(s.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],features:[t.qOj],decls:14,vars:2,consts:[[1,"room",3,"formGroup"],["formControlName","projectName",1,"room__name_field"],["tuiTextfield","","placeholder","","type","text"],["formControlName","projectDescription",1,"room__description_field"],["tuiButton","","type","button","appearance","accent",1,"room__button",3,"disabled","click"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043a\u043e\u043c\u043d\u0430\u0442\u0443"),t.qZA(),t.TgZ(3,"div")(4,"tui-input",1),t._uU(5," \u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u0430 "),t._UZ(6,"input",2),t.qZA()(),t.TgZ(7,"div")(8,"tui-input",3),t._uU(9," \u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u0430 "),t._UZ(10,"input",2),t.qZA()(),t.TgZ(11,"div")(12,"button",4),t.NdJ("click",function(){return n.createRoom()}),t._uU(13," \u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043a\u043e\u043c\u043d\u0430\u0442\u0443 "),t.qZA()()()),2&o&&(t.Q6J("formGroup",n.controlsGroup),t.xp6(12),t.Q6J("disabled",!n.controlsGroup.valid))},directives:[u.JL,u.sg,p.K3,p.wU,u.JJ,u.u,D.MB,_.v0],styles:[".room[_ngcontent-%COMP%]{width:80%;margin:0 auto}.room[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:80px;margin-bottom:80px;font-size:80px;text-align:left}.room__name_field[_ngcontent-%COMP%], .room__description_field[_ngcontent-%COMP%]{border-radius:0;margin-bottom:16px}.room__button[_ngcontent-%COMP%]{width:100%;border-radius:0;margin-top:100px;margin-bottom:110px}"]}),e})()},{path:"**",pathMatch:"full",component:P}]}];let U=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[d],imports:[[a.ez,s.Bz.forChild(F),u.UX,p.Qf,_.fN]]}),e})()}}]);