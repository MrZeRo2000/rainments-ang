import {NativeDateAdapter} from '@angular/material/core';
import type {MatDateFormats} from '@angular/material/core';

// Marker object for the date-input display format. The adapter compares against
// this exact reference to know when to emit the dotted dd.MM.yyyy form (only the
// text input — the calendar month/year labels use the other formats below).
const DATE_INPUT_FORMAT = {day: '2-digit', month: '2-digit', year: 'numeric'};

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {dateInput: DATE_INPUT_FORMAT},
  display: {
    dateInput: DATE_INPUT_FORMAT,
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  },
};

/**
 * Native date adapter that renders/parses the input as dd.MM.yyyy (the format the
 * app used before the Material migration). The native adapter would otherwise use
 * the locale's separator (`/` for en). Only the text-input format is overridden;
 * calendar labels keep the localized month names.
 */
export class AppDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: object): string {
    if (displayFormat === DATE_INPUT_FORMAT) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${day}.${month}.${date.getFullYear()}`;
    }
    return super.format(date, displayFormat);
  }

  override parse(value: unknown): Date | null {
    if (typeof value === 'string') {
      const parts = value.split('.');
      if (parts.length === 3) {
        const day = Number(parts[0]);
        const month = Number(parts[1]);
        const year = Number(parts[2]);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          return new Date(year, month - 1, day);
        }
      }
    }
    return super.parse(value);
  }
}
