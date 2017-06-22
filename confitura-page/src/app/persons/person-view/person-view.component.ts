import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {User} from "../../pages/profile/user.model";
import "./person-view.component.scss";
import {HttpConfiguration} from "../../shared/http-configuration.service";
import {CurrentUser} from "../../security/current-user.service";
import {FileUploader} from "ng2-file-upload";

@Component({
    selector: "jl-person-view",
    templateUrl: "./person-view.component.html"
})
export class PersonViewComponent implements OnInit {


    @Input()
    model: User;
    uploader: FileUploader;
    @Output()
    changed: EventEmitter<any> = new EventEmitter();

    constructor(private config: HttpConfiguration, private currentUser: CurrentUser) {

    }

    ngOnInit(): void {
        this.uploader = new FileUploader({
            authToken: this.currentUser.getToken(),
            url: `${this.config.apiServer}resources/${this.model.id}`,
            autoUpload: true,
        });
        this.uploader.onCompleteAll = () => {
            this.changed.emit(null);
        }
    }

    selectNewPhoto() {
        $("input[type=file]").click();
    }
}
