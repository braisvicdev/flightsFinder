import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewChild, Renderer2, ElementRef, Inject, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { PrincipalService } from 'src/app/core/services/principal.service';
import { IMenuItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  itemsMenu: IMenuItem[] = [];
  menuAbierto: boolean = false;
  mobileVersion: boolean = false;
  mainHeaderScroll = 0;
  mainHeaderOrigen = 0;
  scrollTop = 0;

  @ViewChild('header') header!: ElementRef<any>;
  @ViewChild('burguerBtn') burguerBtn!: ElementRef<any>;
  @ViewChild('menuBurguerInput') menuBurguerInput!: ElementRef<any>;


  constructor(
    public principalService: PrincipalService,
    public renderer: Renderer2,
    @Inject(DOCUMENT) public document: Document
  ) { }


  ngOnInit() {
    fromEvent(window, 'scroll').subscribe(() => {
      this.stickyHeaderHandler(false);
    });
    fromEvent(window, 'resize').subscribe(() => {
      this.validacionMobile();
    });
    this.subscripcionItemsMenu();
    this.inicioStickyHeader();
  }

  subscripcionItemsMenu() {
    this.principalService.itemsMenu().subscribe(items => {
      this.itemsMenu = items;
    });
  }

  public inicioStickyHeader() {
    this.mainHeaderScroll = 0;
    this.mainHeaderOrigen = 0;
    this.stickyHeaderHandler(true);
  }

  public stickyHeaderHandler(primeraCarga: boolean) {
    const mainHeader: HTMLElement = this.header?.nativeElement;
    this.scrollTop = window.scrollY;


    if (mainHeader) {
      if (this.scrollTop) {
        // Validación Scroll
        const mainHeaderHeight = mainHeader?.offsetHeight;
        if (this.scrollTop > this.mainHeaderScroll) {
          if (primeraCarga) {
            // Header inicial
            this.renderer.removeClass(mainHeader, 'mainHeaderNormal');
            this.renderer.addClass(mainHeader, 'mainHeaderSticky');
          } else if (this.mainHeaderScroll > mainHeaderHeight) {
            // Header oculto
            this.mainHeaderOrigen = 0;
            this.renderer.addClass(mainHeader, 'mainHeaderSticky-off')
          }
        } else if (this.mainHeaderScroll > mainHeaderHeight) {
          // Header sticky
          if (this.mainHeaderOrigen == 0) {
            this.mainHeaderOrigen = this.mainHeaderScroll;
          }
          if (this.mainHeaderOrigen - this.scrollTop > mainHeaderHeight) {
            this.renderer.removeClass(mainHeader, 'mainHeaderNormal');
            this.renderer.addClass(mainHeader, 'mainHeaderSticky');
            this.renderer.removeClass(mainHeader, 'mainHeaderSticky-off');
          }
        }
      } else {
        this.renderer.removeClass(mainHeader, 'mainHeaderSticky');
        this.renderer.removeClass(mainHeader, 'mainHeaderSticky-off');
        this.renderer.addClass(mainHeader, 'mainHeaderNormal');
      }
      this.mainHeaderScroll = this.scrollTop;
    }
  }

  validacionMobile() {
    this.mobileVersion = window.innerWidth <= 768;
  }
  toggleMenu() {
    const element = this.burguerBtn.nativeElement;
    const className = 'menuOpen';
    this.menuAbierto = !this.menuAbierto;
    if (this.menuAbierto) {
      this.renderer.addClass(element, className);
      this.renderer.addClass(this.document.body, 'bodyOpen');
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      this.renderer.removeClass(element, className);
      this.renderer.removeClass(this.document.body, 'bodyOpen');
    }
  }

  clickMenuBurguerItem() {
    this.menuBurguerInput.nativeElement.checked = false;
    this.toggleMenu();
  }

  determinarTargetBlank(item: IMenuItem) {
    let targetBlank;
    item.targetBlank ? targetBlank = true : targetBlank = false;
    return targetBlank;
  }
}



