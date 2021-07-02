import chai from "chai";
import fs from "fs";
import path from "path";
import https from "https";

import { QlikRepoApi } from "../src/main";
const dotEnvPath = path.resolve("./.env");
require("dotenv").config({ path: dotEnvPath });
const expect = chai.expect;
const cert = fs.readFileSync(`${process.env.TEST_CERT}/client.pem`);
const key = fs.readFileSync(`${process.env.TEST_CERT}/client_key.pem`);

const httpsAgentCert = new https.Agent({
  rejectUnauthorized: false,
  cert: cert,
  key: key,
});

let repoApi = new QlikRepoApi({
  host: process.env.TEST_HOST,
  port: 4242,
  httpsAgent: httpsAgentCert,
  authentication: {
    user_dir: process.env.TEST_USER_DIR,
    user_name: process.env.TEST_USER_ID,
  },
});

describe("Tag operations", function () {
  this.timeout(30000);

  it("Create, Update, Delete", async function () {
    let newTag = await repoApi.tagCreate("Rest API test");
    let updateTag = await repoApi.tagUpdate(newTag.id, "New name");
    let deleteTag = await repoApi.tagRemove(newTag.id);

    expect(newTag.name).to.equal("Rest API Test") &&
      expect(updateTag.name).to.equal("New name") &&
      expect(deleteTag.status).to.equal(204) &&
      expect(deleteTag.id).to.equal(newTag.id);
  });

  it("Get all tags", async function () {
    let allTags = await repoApi.tagGetAll();

    expect(allTags.length).to.be.greaterThan(0);
  });

  it("Get tags filter", async function () {
    let newTag = await repoApi.tagCreate("Rest API test");
    let filterResults = await repoApi.tagGetFilter(`name eq '${newTag.name}'`);
    let deleteTag = await repoApi.tagRemove(newTag.id);

    expect(filterResults.length).to.be.equal(1);
  });
});
