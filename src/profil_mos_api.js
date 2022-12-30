import axios from "axios";

export function getActiveEvents(ok_handler) {
  const endpoint = "https://regs.temocenter.ru/graphql";
  const request_data = {
    operationName: null,
    variables: {
      onlyActual: true,
      pageNumber: 1,
      search: "",
      startDate: "2022-12-30",
      portalIds: [45],
      districtIds: [],
      agentIds: [],
      formeIds: [],
      audienceIds: [],
      subjectIds: [],
      participationTypes: [],
    },
    query:
      "query ($portalIds: [Int!], $startDate: String, $finishDate: String, $agentIds: [Int!], $districtIds: [Int!], $formeIds: [Int!], $audienceIds: [Int!], $subjectIds: [Int!], $search: String, $pageNumber: Int, $onlyActual: Boolean, $orderDays: String, $archive: Boolean, $elasticsearch: Boolean, $participationTypes: [Int!]) {\n  eventsList(portalIds: $portalIds, startDate: $startDate, finishDate: $finishDate, agentIds: $agentIds, districtIds: $districtIds, formeIds: $formeIds, audienceIds: $audienceIds, subjectIds: $subjectIds, search: $search, pageNumber: $pageNumber, onlyActual: $onlyActual, orderDays: $orderDays, archive: $archive, elasticsearch: $elasticsearch, participationTypes: $participationTypes) {\n    pagesCount\n    maxArchiveStartDate\n    maxArchiveFinishDate\n    selectedStartDate\n    selectedFinishDate\n    events {\n      id\n      title\n      seats\n      reservedSeats\n      emptySeats\n      additionalSeats\n      emptySeatsOnline\n      reservedSeatsOnline\n      seatsOnline\n      date\n      startTime\n      finishedTime\n      startRegistration\n      finishedRegistration\n      markEvent\n      audiencesShort\n      participationTypes\n      comments {\n        id\n        reaction {\n          id\n          __typename\n        }\n        __typename\n      }\n      portal {\n        id\n        name\n        logoImage\n        host\n        markEventText\n        markEventImage\n        __typename\n      }\n      audiences {\n        id\n        name\n        __typename\n      }\n      formes {\n        id\n        name\n        __typename\n      }\n      subject {\n        id\n        name\n        __typename\n      }\n      agent {\n        id\n        name\n        logoImage\n        logo {\n          large\n          medium\n          __typename\n        }\n        __typename\n      }\n      house {\n        address\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
  };
  axios
    .post(endpoint, request_data)
    .then((response) => {
      console.log(response);
    })
    .catch((response) => {
      console.log(response);
    });
}
