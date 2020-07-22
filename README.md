# al-embed-file
This is a command line tool which will take file, codeunit id, codeunit name, and output file name as parameters and generates a codeunit that is embedded with the file provided in the parameter.

* If you provide json file -  codeunit will be generated with a method 'GetJObject' which will return JsonObject for the file provided.

* If you provide Xml file - codeunit will be generated with a method 'GetXmlDocument' which will return XmlDocument for the file provided.

* If you provide any other file - codeunit will be generated with a method 'GetTextContent' which will return file content as Text.

## Syntax
`npx @msnraju/al-embed-file -f <filename> -i <codeunit id> -n <codeunit name> -o <filename>`

## Example
`npx @msnraju/al-embed-file -f c:\data.json -i 50000 -n "Json Config" -o c:\JsonConfig.Codeunit.al`

## Options
```
Creates a codeunit for demo data with the file embedded.

Options:
  -V, --version                 output the version number
  -f, --file <filename>         Specify the file to embed into codeunit.
  -i, --codeunit-id <number>    Specify the codeunit id.
  -n, --codeunit-name <string>  Specify the codeunit name.
  -o, --output-file <filename>  Specify the AL codeunit output file.
  -h, --help                    display help for command
```

## Report an issue
You can report issue at [GitHub](https://github.com/msnraju/al-embed-file/issues)