const axios = require("axios");

let aT = "";

const authenticate = async () => {
  try {
    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/auth",
      {
        email: "mayankpurohit888@gmail.com",
        name: "mayank purohit",
        rollNo: "2219070",
        accessCode: "QAhDUr",
        clientID: "83b33856-91d2-4d5c-ab3e-03aac5acda14",
        clientSecret: "cjrdahFfSvsFYkMx",
      }
    );
    aT = res.data.access_token;
  } catch (err) {}
};

const log = async (stack, level, pkg, message) => {
  if (aT != "") {
    await axios.post("http://20.244.56.144/evaluation-service/logs", {
      stack,
      level,
      package: pkg,
      message,
    });
  }
};

modules.export = { log, authenticate };
