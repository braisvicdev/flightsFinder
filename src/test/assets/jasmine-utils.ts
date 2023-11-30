import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export const mouseEvents = {
  get enter() {
    const mouseenter = document.createEvent('MouseEvent');
    mouseenter.initEvent('mouseenter', true, true);
    return mouseenter;
  },
  get leave() {
    const mouseleave = document.createEvent('MouseEvent');
    mouseleave.initEvent('mouseleave', true, true);
    return mouseleave;
  },
};

export function findNativeEl<T>(fixture: ComponentFixture<T>, selector: string): HTMLElement | null {
  const nativeElement = fixture.nativeElement.querySelector(selector);
  return nativeElement;
}

export function findDebugEl<T>(fixture: ComponentFixture<T>, selector: string): any | null {
  const debugElement = fixture.debugElement.query(By.css(selector));
  return debugElement.nativeElement;
}

export function findNativeElValue<T>(fixture: ComponentFixture<T>, selector: string): string | null {
  const nativeElement = fixture.debugElement.query(By.css(selector));
  return nativeElement.nativeElement.value;
}

export function getTextContent<T>(fixture: ComponentFixture<T>, selector: string,): string | undefined | null {
  const nativeElement = findNativeEl(fixture, selector);
  return nativeElement ? nativeElement.textContent?.trim() : null;
}

export function setValue<T>(fixture: ComponentFixture<T>, selector: string, value: string): void {
  const nativeElement = findNativeEl(fixture, selector) as HTMLInputElement;
  if (nativeElement) {
    nativeElement.value = value;
    nativeElement.dispatchEvent(new Event('input'));
  }
}


export function keyboardEvent<T>(fixture: ComponentFixture<T>, selector: string, evento: string, key: number): void {
  const nativeElement = findDebugEl(fixture, selector);
  if (nativeElement) {
    const keyEvent = new KeyboardEvent(evento, {
      keyCode: key,
    });
    nativeElement.dispatchEvent(keyEvent);
  }
}

export function updateNgModel<T>(fixture: ComponentFixture<T>, selector: string): void {
  const nativeElement = findNativeEl(fixture, selector) as HTMLInputElement;
  if (nativeElement) {
    nativeElement.dispatchEvent(new Event('ngModelChange'));
  }
}

export function getValue<T>(fixture: ComponentFixture<T>, selector: string): string | null {
  const nativeElement = findNativeEl(fixture, selector) as HTMLInputElement;

  return nativeElement.value;
}

export function queryAll<T>(fixture: ComponentFixture<T>, selector: string): DebugElement[] {
  const nativeElement = fixture.debugElement.queryAll(By.css(selector));
  return nativeElement;
}
