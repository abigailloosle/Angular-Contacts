import { Injectable } from '@angular/core';

@Injectable(
)
export class WindRefService {

  constructor() { }

  getNativeWindow() {
    return window;
  }
}
