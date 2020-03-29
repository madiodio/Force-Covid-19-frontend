import { Component, EventEmitter, OnInit, OnChanges, Output, Input, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { FileService } from '../file/file.service';
import { isPlatformBrowser } from '@angular/common';

declare const google: any;
declare const InfoBox: any;
declare const MarkerClusterer: any;
declare const RichMarker: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [FileService]
})
export class MapComponent implements OnInit, OnChanges {
  @Input() listings: any[] = [];
  @Input() listing_id: number = null;
  @Input() isresto: boolean;
  @Output() onListingChange = new EventEmitter<number>();

  markers: any[] = [];
  map: any;
  bound: any;
  zoom = 13;

  constructor(
    private fileService: FileService,
    @Inject(PLATFORM_ID) private platform: Object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platform)) {//<== means you are client side
      this.map = new google.maps.Map(document.getElementById('map-object'), {
        zoom: this.zoom,
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ 'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'color': '#e9e9e9' }, { 'lightness': 17 }] }, { 'featureType': 'landscape', 'elementType': 'geometry', 'stylers': [{ 'color': '#f5f5f5' }, { 'lightness': 20 }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ffffff' }, { 'lightness': 17 }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#ffffff' }, { 'lightness': 29 }, { 'weight': 0.2 }] }, { 'featureType': 'road.arterial', 'elementType': 'geometry', 'stylers': [{ 'color': '#ffffff' }, { 'lightness': 18 }] }, { 'featureType': 'road.local', 'elementType': 'geometry', 'stylers': [{ 'color': '#ffffff' }, { 'lightness': 16 }] }, { 'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{ 'color': '#f5f5f5' }, { 'lightness': 21 }] }, { 'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{ 'color': '#dedede' }, { 'lightness': 21 }] }, { 'elementType': 'labels.text.stroke', 'stylers': [{ 'visibility': 'on' }, { 'color': '#ffffff' }, { 'lightness': 16 }] }, { 'elementType': 'labels.text.fill', 'stylers': [{ 'saturation': 36 }, { 'color': '#333333' }, { 'lightness': 40 }] }, { 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit', 'elementType': 'geometry', 'stylers': [{ 'color': '#f2f2f2' }, { 'lightness': 19 }] }, { 'featureType': 'administrative', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#fefefe' }, { 'lightness': 20 }] }, { 'featureType': 'administrative', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#fefefe' }, { 'lightness': 17 }, { 'weight': 1.2 }] }]
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isPlatformBrowser(this.platform)) {//<== means you are client side
      if ('listing_id' in changes) {
        // console.log(this.listings);
        if (this.listings !== null) {
          this.listings.forEach(listing => {
            if (listing['id'] === this.listing_id) {
              this.map.setCenter(new google.maps.LatLng(listing['latitude'], listing['longitude']));
            }
          });
        }

      }

      if ('listings' in changes) {

        const component = this;
        component.bound = new google.maps.LatLngBounds();
        //console.log(this.listings);
        this.markers.forEach(marker => {
          marker.setMap(null);
        });

        this.markers = [];

        this.listings.forEach(listing => {
          if (listing['latitude'] && listing['longitude']) {
            const markerCenter = new google.maps.LatLng(listing['latitude'], listing['longitude']);

            const markerVerified = listing['is_verified'] ? '<div class="marker-verified"><i class="fa fa-check"></i></div>' : '';

            //const markerPrice = listing['price'] ? '<div class="marker-price">' + listing['name'] + '</div>' : '';
            const markerPrice = listing['name'] ? '<div class="marker-price">' + listing['name'] + '</div>' : '';

            let imageurl = listing['thumbnail'] ? this.fileService.getFileUrl(listing['thumbnail'].name) : null;
            if (!imageurl) {
              if (listing['categoryE']) {
                imageurl = 'assets/img/event/' + (listing['categoryE'].toLowerCase()) + '.jpg';
              } else if (listing['categoryR']) {
                imageurl = 'assets/img/resto/' + (listing['categoryR'].toLowerCase()) + '.jpg';
              } else if (listing['categoryAN']) {
                imageurl = 'assets/img/annonceur/' + (listing['categoryAN'].toLowerCase()) + '.jpg';
              } else if (listing['categoryGP']) {
                imageurl = 'assets/img/samagp/' + (listing['categoryGP'].toLowerCase()) + '.jpg';
              } if (!imageurl) {
                if (this.isresto) {
                  imageurl = 'assets/img/resto/resto.png';
                } else {
                  imageurl = 'assets/img/event/concert.jpg';
                }
              }

            }

            const markerContent =
              '<div class="marker">' +
              '<div class="marker-inner">' +
              '<span class="marker-image" style="background-image: url(' + imageurl + ');"></span>' +
              '</div>' +
              markerVerified +
              markerPrice +
              '</div>';

            const marker = new RichMarker({
              id: listing['id'],
              data: 'Im data',
              flat: true,
              position: markerCenter,
              map: this.map,
              shadow: 0,
              content: markerContent
            });

            marker.addListener('click', () => {
              component.map.setCenter(new google.maps.LatLng(listing['latitude'], listing['longitude']));
              component.changeListing(listing['id']);
            });

            this.markers.push(marker);
            component.bound.extend(new google.maps.LatLng(listing['latitude'], listing['longitude']));
          }
        });

        if ('map' in this) {
          this.map.fitBounds(component.bound);
        }

        new MarkerClusterer(this.map, this.markers, {
          styles: [
            {
              url: 'assets/img/cluster.png',
              height: 36,
              width: 36
            }
          ]
        });
      }
    }
  }

  changeListing(listing_id: number) {
    this.onListingChange.emit(listing_id);
  }

  actionZoomIn() {
    this.map.setZoom(this.map.getZoom() + 1);
  }

  actionZoomOut() {
    this.map.setZoom(this.map.getZoom() - 1);
  }

  actionType(type: string) {
    if (type === 'HYBRID') {
      this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    } else if (type === 'SATELLITE') {
      this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    } else if (type === 'TERRAIN') {
      this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    } else if (type === 'ROADMAP') {
      this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    }
  }
}