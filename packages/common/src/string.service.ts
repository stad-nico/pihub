import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StringService {
	public static toKebabCase(input: string) {
		return input
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.replace(/[\s_]+/g, '-')
			.toLowerCase();
	}

	public static toPascalCase(input: string) {
		return StringService.toKebabCase(input)
			.split('-')
			.map((word) => StringService.capitalize(word))
			.join('');
	}

	public static toSpacedPascalCase(input: string) {
		return StringService.toPascalCase(input).replace(/([a-z])([A-Z])/g, '$1 $2');
	}

	public static capitalize(input: string) {
		return input.charAt(0).toUpperCase() + input.slice(1);
	}
}
