import { Component, OnInit, Input, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'map-widget',
  templateUrl: './map-widget.component.html',
  styleUrls: ['./map-widget.component.css']
})
export class MapWidgetComponent implements OnInit {
  mapElement: any;
  @Input() adresse: number = null;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platform: Object) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('adresse' in changes) {
      this.refreshMap();
    }
  }

  refreshMap() {
    if (isPlatformBrowser(this.platform)) {//<== means you are client side
      var node = document.createElement('IFRAME');
      node.setAttribute('class', 'mb30');
      node.setAttribute('style', 'height:320px;width:100%;border:0;');
      node.setAttribute('src', 'https://www.google.com/maps/embed/v1/place?q=' + this.adresse + '&key=AIzaSyAig0uKnQIx-WBkpKKFO-438UNC4DW-Jnk');
      this.mapElement = this.sanitizer.bypassSecurityTrustHtml(node.outerHTML);
    }
  }

}
