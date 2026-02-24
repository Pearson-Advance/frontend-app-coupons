const UUID_REGEX: RegExp = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;

/**
 * Regular expression used to validate UUID strings.
 *
 * This pattern:
 * - Validates standard RFC 4122 UUIDs (versions 1–8) in canonical
 *   8-4-4-4-12 hexadecimal format.
 * - Ensures the correct variant (8, 9, a, or b in the 17th hex digit).
 * - Explicitly allows the all-zero UUID
 *   (00000000-0000-0000-0000-000000000000).
 * - Explicitly allows the all-`f` UUID
 *   (ffffffff-ffff-ffff-ffff-ffffffffffff).
 *
 * The `i` flag makes the match case-insensitive.
 *
 * Source:
 * Adapted from uuidjs implementation:
 * https://github.com/uuidjs/uuid/blob/main/src/validate.ts#L3
 */
function validateUuid(uuid: unknown) {
  return typeof uuid === 'string' && UUID_REGEX.test(uuid);
}

export default validateUuid;
