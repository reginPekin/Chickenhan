function convertCase(incomingElement: any, convert: any): any {
  const convertedObject: Record<string, any> = {};

  const convertArray = (array: any[]): any[] => {
    const convertedArray = array.map(element => convertCase(element, convert));

    return convertedArray;
  };

  const checkForObject = (element: any): boolean =>
    typeof element === 'object' && element.length === undefined;

  const checkForArray = (element: any): boolean =>
    typeof element === 'object' && element.length !== undefined;

  if (checkForObject(incomingElement)) {
    for (const property in incomingElement) {
      const snakeKey: string = convert(property);

      if (checkForObject(incomingElement[property])) {
        const convertedValues = convertCase(incomingElement[property], convert);

        convertedObject[snakeKey] = convertedValues;
        continue;
      }

      if (checkForArray(incomingElement[property])) {
        const convertedArray = convertArray(incomingElement[property]);

        convertedObject[snakeKey] = convertedArray;
        continue;
      }

      convertedObject[snakeKey] = incomingElement[property];
    }

    return convertedObject;
  }

  if (checkForArray(incomingElement)) {
    return convertArray(incomingElement);
  }

  return incomingElement;
}

export function camelToSnake(camel: Record<string, any>): Record<string, any> {
  return convertCase(camel, (word: string): string => {
    return word.replace(/([A-Z])/g, '_$1').toLowerCase();
  });
}

export function snakeToCamel(snake: Record<string, any>): Record<string, any> {
  return convertCase(snake, (word: string): string => {
    return word.replace(/(_\w)/g, element => element[1].toUpperCase());
  });
}
