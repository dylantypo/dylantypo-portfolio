// src/hooks.client.ts
import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({ error, event }) => {
	console.error('Client error:', error);

	// Type-safe error message checking
	const errorMessage = error instanceof Error ? error.message : String(error);

	// Don't break the app for JSON parsing errors
	if (errorMessage.includes('JSON') || errorMessage.includes('Unexpected token')) {
		return {
			message: 'Page loading error - please refresh',
			code: 'HYDRATION_ERROR'
		};
	}

	return {
		message: 'Something went wrong',
		code: 'UNKNOWN_ERROR'
	};
};
