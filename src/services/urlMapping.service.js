import { db, Models } from "../models/DatabaseManager.js";
import crypto from "crypto";

const urlMappingService = {
  createMappingUrl: async (body) => {

    return await hashUrl(body.orgUrl);
  },
};

async function hashUrl(orgUrl) {
  try {
    while (true) {
      const dynamicData = orgUrl + Date.now().toString();

      // Create the SHA-256 hash
      const hash = crypto.createHash("sha256");
      hash.update(dynamicData); 
      const hexHash = hash.digest("hex"); 

      const charHash = hexHash.slice(0, 8); 
      let st = await Models.UrlMapping.findOne({
        where: { shortenUrl: charHash },
      });
      console.log(st);
      if (st == null) {
        return charHash;
      }
    }
  } catch (error) {
    throw new Error(`Hashing failed: ${error.message}`);
  }
}

export { urlMappingService };
