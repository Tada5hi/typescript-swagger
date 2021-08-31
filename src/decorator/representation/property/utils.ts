import {Decorator} from "../../type";

export function extendRepresentationPropertyConfig(property: Decorator.Property): Decorator.Property {
    if (typeof property.type === 'undefined') {
        property.type = 'SIMPLE';
    }

    if (typeof property.declaredAs === 'undefined') {
        property.declaredAs = 'argument';
    }

    if (typeof property.amount === 'undefined') {
        property.amount = 'one';
    }

    if (typeof property.position === 'undefined') {
        property.position = 0;
    }

    return property;
}

export function extractRepresentationPropertyValue(
    decorator: Decorator.Data,
    config: Decorator.Property
): unknown | undefined {
    switch (config.amount) {
        case "all":
            switch (config.declaredAs) {
                case 'typeArgument':
                    return decorator.typeArguments;
                case 'argument':
                    return decorator.arguments;
            }
            break;
        case "one":
            switch (config.declaredAs) {
                case 'typeArgument':
                    if (decorator.typeArguments.length > config.position) {
                        return decorator.typeArguments[config.position];
                    }
                    break;
                case 'argument':
                    if (decorator.arguments.length > config.position) {
                        return decorator.arguments[config.position];
                    }
                    break;
            }
            break;
    }

    return undefined;
}
