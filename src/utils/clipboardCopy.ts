/**Копирование в буфер. Возвращает false в случае ошибки или пустой строчки в аргументе.*/
export function copyToClipboard(data: string): boolean {

    const UA: string = navigator.userAgent;
    // const isIOS = UA.match(/ipad|ipod|iphone/i);
    const isSafari: RegExpMatchArray = UA.match(/^((?!chrome|android).)*safari|ipad|ipod|iphone/gi);

    if (!data)
    {return false;}

    if (isSafari) {
        const selBox: HTMLTextAreaElement = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.width = '10000px';
        selBox.style.height = '10000px';
        selBox.style.zIndex = '10';
        selBox.style.opacity = '0';
        selBox.textContent = data;
        selBox.contentEditable = 'true';
        selBox.readOnly = true;
        document.body.appendChild(selBox);

        const range: Range = document.createRange();
        range.selectNodeContents(selBox);
        const selection: Selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        selBox.setSelectionRange(0, 999999);

        const success: boolean = document.execCommand('copy');
        document.body.removeChild(selBox);

        return success;
    }

    if (!window['clipboardData']) {
        const handler = (e: any): void => {
            const event: any = e;
            event.clipboardData.setData('text/plain', data);
            event.preventDefault();
            window.removeEventListener('copy', handler);
        };
        window.addEventListener('copy', handler);
        const success: boolean = document.execCommand('copy');
        if (!success) {
            window.removeEventListener('copy', handler);
        }

        return success;
    } else {
        return window['clipboardData'].setData('Text', data);
    }

}