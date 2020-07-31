import fs from 'fs';
import path from 'path';
import { IOption } from './cli';
import { Helper } from './helper';

export class Writer {
  static generateCodeunit(options: IOption) {
    const filePath = path.resolve(options.fileName);
    const buffer = fs.readFileSync(filePath);
    const content = buffer.toString();

    this.toALCode(content);

    let getMethod = '';
    const extname = path.extname(filePath).toLowerCase();
    switch (extname) {
      case '.json':
        getMethod = `    procedure GetJObject(): JsonObject
    var 
        JObject: JsonObject;
    begin
        JObject.ReadFrom(GetText());
        exit(JObject);
    end;`;
        break;
      case '.xml':
        getMethod = `    procedure GetXmlDocument(): XmlDocument
    var 
        XmlDoc: XmlDocument;
    begin        
        XmlDocument.ReadFrom(GetText(), XmlDoc);
        exit(XmlDoc);
    end;`;
        break;
      default:
        getMethod = `    procedure GetTextContent(): Text
    begin        
        exit(GetText());
    end;`;
        break;
    }

    const codeunit = `codeunit ${options.codeunitID} "${options.codeunitName}"
{  
${getMethod}

    procedure GetText(): Text
    var
        builder: TextBuilder;
    begin
${this.toALCode(content).join('\r\n')}

        exit(builder.ToText());
    end;
}`;

    const outFile = path.resolve(options.outputFileName);
    fs.writeFileSync(outFile, codeunit);
    console.log(`'${options.outputFileName}' codeunit generated.`);
  }

  private static toALCode(content: string): Array<string> {
    content = content.replace(/'/g, "''");
    const lines = Helper.splitByLength(content, 100);

    const alCode: Array<string> = [];
    lines.forEach((line) => {      
      alCode.push(`        builder.Append('${line}');`);
    });

    return alCode;
  }
}
