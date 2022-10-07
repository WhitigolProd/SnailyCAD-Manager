"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let requirements = {
    git: false,
    node: false,
    yarn: false,
    psql: false,
};
const checkRequirements = () => __awaiter(void 0, void 0, void 0, function* () {
    yield commandExists("git", (err, exists) => {
        if (err)
            throw new Error(err);
        if (exists) {
            $(".rqGit")
                .text("PASSED")
                .attr("aria-busy", "false")
                .css("color", "lime");
            log("Requirement GIT Passed", "success");
            return (requirements.git = true);
        }
        $(".rqGit")
            .text("FAILED")
            .attr("aria-busy", "false")
            .css("color", "orange");
        log("Requirement GIT Failed", "warning");
    });
    yield commandExists("node", (err, exists) => {
        if (err)
            throw new Error(err);
        if (exists) {
            $(".rqNode")
                .text("PASSED")
                .attr("aria-busy", "false")
                .css("color", "lime");
            log("Requirement NodeJS Passed", "success");
            return (requirements.node = true);
        }
        $(".rqNode")
            .text("FAILED")
            .attr("aria-busy", "false")
            .css("color", "orange");
        log("Requirement NODE Failed", "warning");
    });
    yield commandExists("yarn", (err, exists) => {
        if (err)
            throw new Error(err);
        if (exists) {
            $(".rqYarn")
                .text("PASSED")
                .attr("aria-busy", "false")
                .css("color", "lime");
            log("Requirement Yarn Passed", "success");
            return (requirements.yarn = true);
        }
        $(".rqYarn")
            .text("FAILED")
            .attr("aria-busy", "false")
            .css("color", "orange");
        log("Requirement YARN Failed", "warning");
    });
    yield findProcess("name", "postgres.exe").then((list) => {
        if (list.length >= 1) {
            $(".rqPsql")
                .text("PASSED")
                .attr("aria-busy", "false")
                .css("color", "lime");
            log("Requirement PostgreSQL Passed", "success");
            return (requirements.psql = true);
        }
        $(".rqPsql")
            .html("FAILED<br>(Make sure the service is running on your system)")
            .attr("aria-busy", "false")
            .css("color", "orange");
        log("Requirement PSQL Failed", "warning");
    });
    log("Requirement Tests Complete — Checking Status", "info");
    if (requirements.git &&
        requirements.node &&
        requirements.psql &&
        requirements.yarn) {
        $(".requirements").hide();
    }
});
