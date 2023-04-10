import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, switchMap } from "rxjs";
import { ModalBaseComponent } from "src/app/services/modals";
import { ProjectFileManagerService } from "src/app/services/project-file-manager.service";
import { ITaskResponse } from "src/app/services/room.service";

@Component({
    templateUrl: 'modal-upload-work.component.html',
    styleUrls: ['styles/modal-upload-work.style.scss']
})
export class ModalUploadWorkComponent extends ModalBaseComponent implements OnInit {

    public form: FormGroup;
    public name: string = '';
    public file;
    public taskId: string;
    public title: string;

    constructor(private _fileManager: ProjectFileManagerService) {
        super();
    }

    public override initialize(id: string, title: Observable<ITaskResponse>) {
        this.taskId = id;
        title.subscribe({
            next: (t) => {
                this.title = t.title;
            }
        });
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            projectDescription: new FormControl('', [
                Validators.required,
            ])
        })
    }

    public uploadWork(element): void {
        const fileToUpload = element.files.item(0);
        this.name = fileToUpload.name;
        this.file = fileToUpload;
    }

    public sendForm(): void {
        this._fileManager.uploadStudentWork(this.file)
            .pipe(
                switchMap(data => {
                    return this._fileManager.createProject(this.taskId, data, {
                        title: this.title,
                        description: this.form.controls['projectDescription'].value,
                        attachments: data
                    });
                })
            )
            .subscribe(() => {
                this.submit.next(null);
            });
    }
}