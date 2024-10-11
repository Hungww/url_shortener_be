import { urlMappingService } from "../services/urlMapping.service.js";
import { db, Models } from "../models/DatabaseManager.js";
import { hashPassword } from "../utils/hash.js";


//body: {orgUrl: "https://www.google.com", urlPassword: "123456", expired_date: "2024-10-07T06:14:24.000Z"}
const UrlMappingController = {
  createUrl: async (body) => {
    let newUrl = await urlMappingService.createMappingUrl(body);
    let expired_date = new Date(body.expired_date);
    let result = {
        orgUrl: body.orgUrl,
        shortenUrl: newUrl,
        expired_date: expired_date,
        IS_VALID: true,
    }

  if (body.urlPassword) {
        result.urlPassword = hashPassword(body.urlPassword);
  }
  else {
        result.urlPassword = "";
  }
  const newUrlMapping = Models.UrlMapping.build(result);
  await newUrlMapping.save();
    return result;
  },

  getUrl: async (req, res) => {
    console.log("AAAAAAAAAAAAAA"+ req.query.shortenUrl);
    let result = await Models.UrlMapping.findOne({
        where: { shortenUrl: req.query.shortenUrl },
    });

    console.log(result.dataValues);
    console.log(typeof result.dataValues.expired_date);
    let data = result.dataValues;
    if (result==null) {
      res.status(404).json({ error: "Not found", error_code: "NOT_FOUND_URL" });
      return;
    }

    if (data.expired_date < new Date()) {
      res.status(403).json({ error: "Your url is expired", error_code: "EXPIRED_URL" });

      return;
    }

    if (data.urlPassword != "") {
      if (hashPassword(req.query.urlPassword) ==""){
        res.status(401).json({ error: "This url is protected, enter password to continue", error_code: "PROTECTED_URL" });
        return;
      }
      if (data.urlPassword != hashPassword(req.query.urlPassword)) {
        res.status(401).json({ error: "Incorrect password", error_code: "INCORRECT_PASSWORD" });
        return;
      }
    }

    res.status(200).json({ orgUrl: data.orgUrl });
    
    //redirect to original url
    // res.redirect(data.orgUrl);
    return;
  },
};

export { UrlMappingController };