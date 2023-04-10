import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalBaseComponent } from "src/app/services/modals/modal.base.component";

@Component({
    templateUrl: 'join-room-modal.component.html',
    styleUrls: ['styles/join-room-modal.style.scss']
})
export class JoinRoomModalComponent extends ModalBaseComponent implements OnInit {

    public form: FormGroup;

    public ngOnInit(): void {
        this.form = new FormGroup({
            code: new FormControl('', [
                Validators.required,
            ])
        })
    }

    public close(): void {
        this.cancel.next();
    }

    public add(): void {
        this.submit.next(this.form.controls['code']?.value?.toString());
    }
}