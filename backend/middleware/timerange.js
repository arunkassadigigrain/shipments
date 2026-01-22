class TimeRange{
      static getDateRange(range) {
    const nowUTC = new Date();

    let startUTC;
    let endUTC = nowUTC;
    let groupType;

    if (range === "day") {
      startUTC = new Date(nowUTC);
      startUTC.setUTCHours(0, 0, 0, 0);
      groupType = "hour";

    } else if (range === "week") {
      startUTC = new Date(nowUTC);
      startUTC.setUTCDate(startUTC.getUTCDate() - 6);
      startUTC.setUTCHours(0, 0, 0, 0);
      groupType = "day";

    } else if (range === "month") {
      startUTC = new Date(nowUTC);
      startUTC.setUTCDate(startUTC.getUTCDate() - 29);
      startUTC.setUTCHours(0, 0, 0, 0);
      groupType = "day";

    } else if (range === "quaterly") {
      startUTC = new Date(nowUTC);
      startUTC.setUTCMonth(startUTC.getUTCMonth() - 2);
      startUTC.setUTCDate(1);
      startUTC.setUTCHours(0, 0, 0, 0);
      groupType = "month";

    } else {
      throw new Error("Invalid range");
    }
    console.log(startUTC, "startUTC");
    console.log(endUTC, "endUTC");
    return { startDateUTC: startUTC, endDateUTC: endUTC, groupType };
  }
};

export default TimeRange;