import { Directive, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";

@Directive()
export abstract class ModalLayoutComponent implements OnDestroy {

    public static Count: number = 0;

    @Input()
    public set visible(value: boolean) {
        this.setVisibleState(value);
    }
    public get visible() {
        return this.visibleState;
    }

    @Input()
    public disabledScroll: boolean = true;
    @Input()
    public hideClose: boolean = false;
    @Input()
    public offOverlayClose: boolean = false;
    @Input()
    public disabledCalculatePosition: boolean = false;

    @Output()
    public visibleChange = new EventEmitter<boolean>();
    @Output()
    public onClose = new EventEmitter<void>();
    @Output()
    public onComplete = new EventEmitter<void>();
    @ViewChild("modal", { static: true })
    public modal: any;

    public visibleContainer: boolean = false;

    protected visibleState: boolean = false;

    private _openned: boolean;
    private _scrollElement: HTMLElement;

    /** там был момент что при выборе элемента из ab-pop-up меню не закрывалась модалка */
    public ngOnDestroy() {
        this.close();
    }

    public clickout(event: Event) {
        event?.stopPropagation();
        this.close(event);
    }

    public close(event?: Event, isOverlay?: boolean) {
        event?.stopPropagation();
        this.visibleContainer = false;
        this.visible = false;
        // this.visibleChange.emit(this.visible);
        this.onClose.emit();
    }

    public modalClickCallback(event: any, isContent?: boolean) {
        if (this.modal && this.modal.nativeElement.contains(event.target)) {
            return;
        }

        if (!isContent) {
            this.close(null, true);
        } else {
            event.stopPropagation();
        }
    }

    public complete() {
        this._openned = this.visible;
        if (this.visibleContainer !== this.visible)
            // ошибка только в дев моде. enableProdMode(); - всё ок. Чтобы пофиксить добавили таймаут
            setTimeout(() => {
                this.visibleContainer = this.visible;
            }, 0);
        if (!this.visible) {
            this.onComplete.emit();
        }
    }

    /**находит body при каждом visible=true */
    protected initScrollElement() {
        // хак сделан для старых версий хрома где скролится body, а не html
        if (this._scrollElement && this._scrollElement.tagName === "BODY") return;
        this._scrollElement = (document.body && document.body.scrollTop >= 0)
            ? document.body
            : document.documentElement;
    }

    private setVisibleState(value: boolean) {
        if (this.visibleState === value || typeof value !== "boolean") return;
        this.visibleState = value;

        this.initScrollElement();

        if (value) {
            if (this.visibleContainer === false)
                // ошибка только в дев моде. enableProdMode(); - всё ок. Чтобы пофиксить добавили таймаут
                setTimeout(() => {
                    this.visibleContainer = true;
                }, 0);
            /**если открывается первая модалка то берём top */
            if (ModalLayoutComponent.Count === 0) {
                this._scrollElement.classList.add("scroll_disabled");
            }
            ModalLayoutComponent.Count++;
        } else {
            window.setTimeout(() => {
                if (this.visibleState) return;
                ModalLayoutComponent.Count--;
                /**Если открыто только 1 модальное окно, то удаляем класс scroll_disabled */
                if (ModalLayoutComponent.Count === 0) {
                    this._scrollElement.classList.remove('scroll_disabled');
                    this._scrollElement.removeAttribute('class');
                }
            }, 50);
        }
    }
}