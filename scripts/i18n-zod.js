import YAML from 'js-yaml'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (filename) => path.resolve(__dirname, filename)
const readFileSync = (filename, parse = false) => {
  const content = fs.readFileSync(resolve(filename), { encoding: 'utf-8' })
  if (parse) {
    return JSON.parse(content)
  }
  return content
}

function loadYaml(filename) {
  filename += '.yml'
  return {
    filename,
    data: YAML.load(readFileSync(filename))
  }
}

function saveYaml(filename, data) {
  if (!filename.endsWith('.yml')) {
    filename += '.yml'
  }
  fs.writeFileSync(resolve(filename), YAML.dump(data, { noRefs: true }))
}

const { data } = loadYaml('../src/content/i18n/es')

function createZodSchema(obj, indent = 2) {
  let schemaString = '';

  for (const [key, value] of Object.entries(obj)) {
    schemaString += `${' '.repeat(indent)}${key}: `;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Si es un objeto, llamada recursiva
      schemaString += `z.object({\n${createZodSchema(value, indent + 2)}${' '.repeat(indent)}})`;
    } else if (Array.isArray(value)) {
      // Si es un array, llamada recursiva con el primer elemento del array
      if (value.length > 0) {
        schemaString += `z.array(z.object({\n${createZodSchema(value[0], indent + 2)}${' '.repeat(indent)}}))`;
      } else {
        // Si el array está vacío, asumimos que es un array de strings
        schemaString += `z.array()`;
      }
    } else {
      // Si es un valor simple, determinamos el tipo
      schemaString += typeof value === 'string' ? 'z.string()' : typeof value === 'number' ? 'z.number()' : 'z.unknown()';
    }

    schemaString += ',\n';
  }

  return schemaString;
}

console.log('z.object({\n' + createZodSchema(data) + '})');