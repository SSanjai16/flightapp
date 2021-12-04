import { Pipe, PipeTransform } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

@Pipe({
  name: 'highlightTablesearch'
})
export class HighlightTablesearchPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(valuehighlight: string, search: string): string {
    if (!search) {
      return valuehighlight;
    }
    const valueStr = valuehighlight + ""; // Ensure numeric values are converted to strings
    return valueStr.replace(
      new RegExp(
        "(?![^&;]+;)(?!<[^<>]*)(" + search + ")(?![^<>]*>)(?![^&;]+;)",
        "gi"
      ),
      "<strong>$1</strong>"
    );
  }

}
