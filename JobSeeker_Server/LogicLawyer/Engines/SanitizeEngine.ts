import { JSDOM } from "jsdom";
import DOMPurify from 'dompurify';

export class SanitizeEngine {

    /**
     * Convert string to DOM HTML
     * @returns Element
     */
    ConvertToSanitizedHtml(stringHtml: string): Document {
      const window = new JSDOM(`<html>${stringHtml}</html>`).window;
      const document = window.document;
      return document;
    }
}