export class ClipboardNumberConverter {

  public static getConverted(event: any): number {
    const clipboardText = event.clipboardData?.getData('text');
    if (!!clipboardText) {
      const convertedText = clipboardText.replace(',', '.');
      return parseFloat(convertedText);
    } else {
      return undefined;
    }
  }
}
