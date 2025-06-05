// src/hooks.server.ts
import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = ({ error, event }) => {
	console.error('Server error:', error);

	// Type-safe error message checking
	const errorMessage = error instanceof Error ? error.message : String(error);

	// Handle JSON serialization errors
	if (errorMessage.includes('JSON') || errorMessage.includes('serialize')) {
		return {
			message: 'Data processing error',
			code: 'SERIALIZATION_ERROR'
		};
	}

	return {
		message: 'Internal server error',
		code: 'INTERNAL_ERROR'
	};
};
