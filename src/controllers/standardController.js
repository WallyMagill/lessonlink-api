// We will keep the standards simple and just serve all to the user.
// there is only around 400 so it seems small enough to allow frontend filtering
/**
 * Standard Controller
 *
 * Handles all standard  operations:
 *
 * Functions:
 * - retrieveStandards: grabs all standards from database
 *
 * Features:
 * - Search
 */
import Standard from '../models/Standard.js';

export async function retrieveStandards() {
  try {
    return await Standard.find();
  } catch (error) {
    throw new Error(`couldn't find standards: ${error.message}`);
  }
}

export default retrieveStandards();
