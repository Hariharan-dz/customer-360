import { Component, OnInit, Input } from '@angular/core';
import { NotificationUiService } from '../services/notification-ui.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ModalController } from '@ionic/angular';
import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;
import ImageResize from "quill-image-resize-module";

@Component({
  selector: 'app-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss'],
  animations: [
    trigger('myAnimationTrigger', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('0.3s ease-in'))
    ])
  ]
})
export class TemplatePageComponent implements OnInit {

  @Input() preview_channel: any;
  @Input() needTemplateParser: boolean = false;
  @Input() content: any;
  @Input() dynamicTagDetails: any = null;
  @Input() systemTagDetails: any = null;
  @Input() isEmailReadOnly: boolean = false;
  @Input() isViewReason: boolean = false;
  @Input() isPreviewPopup: boolean = false;
  @Input() isFullScreenEditor: boolean = false;

  modules: any = {
    imageResize: {
      handleStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white'
      }
    },
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        // ['blockquote', 'code-block'],
        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],                                         // remove formatting button
        ['link', 'image'/*, 'video'*/],                        // link and image, video
    ]
  };

  preview_isExpand: boolean = false;

  constructor(private notifiService: NotificationUiService, public modalCtrl: ModalController) { }

  ngOnInit() {
    var fontStyle = Quill.import('attributors/style/font');
    var alignStyle = Quill.import('attributors/style/align');
    Quill.register(alignStyle, false);
    Quill.register(fontStyle, false);
    Quill.register('modules/imageResize', ImageResize);

    if (this.needTemplateParser && this.systemTagDetails == null) {
      this.systemTagDetails = {
        "first_name": 'John',
        "last_name": 'Doe',
        "name": 'John Doe',
        "email": 'john_doe@web-3.in',
        "phone_number": '+1-5744566345',
        "gender": 'MALE',
        "date_of_birth": '12-11-1990',
        "language": 'English'
      };
    }
  }

  getPreviewData(message: string = '') {
    var dynamicTagDetails = this.dynamicTagDetails || {}
    if (this.systemTagDetails) {
      dynamicTagDetails.system = this.systemTagDetails;
    }
    if (this.needTemplateParser && Object.keys(dynamicTagDetails).length > 0) {
      return Handlebars.compile(message)(dynamicTagDetails);
    }
    return message;
  }


  getPreviewImageData(key: string, parentKey: string = '') {
    var imageOrIconContent = this.preview_channel == 'IN_APP_MESSAGE' ? this.content[parentKey][key] : this.content[key];
    if (imageOrIconContent) {
      return (imageOrIconContent.source_type === 'FILE' && imageOrIconContent.fileName ?
        (imageOrIconContent.base64Content || (this.notifiService.image_prefix_url + imageOrIconContent.path)) :
        imageOrIconContent.url) || '';
    }
    return '';
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

}
